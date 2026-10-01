import React, { useRef, useEffect, useCallback } from 'react';
import { Sparkles, Plus } from 'lucide-react';
import { CelestialNode, CosmicLink } from '../../types/cosmos';
import { PhysicsEngine } from '../../engine/PhysicsEngine';
import { soundEngine } from '../../engine/SoundEngine';

interface CelestialCanvasProps {
  nodes: CelestialNode[];
  links: CosmicLink[];
  selectedNodeId: string | null;
  focusTargetNodeId?: string | null;
  onSelectNode: (node: CelestialNode | null) => void;
  onNodeDragEnd?: (id: string, x: number, y: number) => void;
  onDropIntoSingularity: (node: CelestialNode) => void;
  onOpenCreateNode?: () => void;
  physicsEngine: PhysicsEngine;
  isPhysicsPaused: boolean;
  activeTimelineColor: string;
}

export const CelestialCanvas: React.FC<CelestialCanvasProps> = ({
  nodes,
  links,
  selectedNodeId,
  focusTargetNodeId,
  onSelectNode,
  onNodeDragEnd,
  onDropIntoSingularity,
  onOpenCreateNode,
  physicsEngine,
  isPhysicsPaused,
  activeTimelineColor,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const hudInfoRef = useRef<HTMLSpanElement | null>(null);
  const fpsInfoRef = useRef<HTMLSpanElement | null>(null);

  // Initial responsive zoom check (0.72x on mobile for wider cosmic view)
  const isMobileInitial = typeof window !== 'undefined' && window.innerWidth < 768;
  const initialZoom = isMobileInitial ? 0.72 : 1.0;

  // High-performance smooth camera with target interpolation
  const cameraRef = useRef({
    x: 0,
    y: isMobileInitial ? 30 : 0,
    zoom: initialZoom,
    targetX: 0,
    targetY: isMobileInitial ? 30 : 0,
    targetZoom: initialZoom,
  });

  // Internal mutable simulation state
  const simNodesRef = useRef<CelestialNode[]>([]);
  const linksRef = useRef<CosmicLink[]>(links);
  linksRef.current = links;

  // Interaction refs
  const isDraggingCanvas = useRef(false);
  const isDraggingNode = useRef(false);
  const draggedNodeId = useRef<string | null>(null);
  const dragStartPos = useRef({ x: 0, y: 0 });
  const mouseCanvasPos = useRef({ x: 0, y: 0 });
  const lastHoveredNodeId = useRef<string | null>(null);

  // Mobile pinch-to-zoom refs
  const pinchStartDist = useRef<number | null>(null);
  const pinchStartZoom = useRef<number>(1.0);

  // Pre-rendered offscreen background starfield canvas
  const offscreenStarsRef = useRef<HTMLCanvasElement | null>(null);

  // Sync external nodes prop to simNodesRef
  useEffect(() => {
    const currentSim = simNodesRef.current;
    const currentMap = new Map(currentSim.map(n => [n.id, n]));

    simNodesRef.current = nodes.map(n => {
      const existing = currentMap.get(n.id);
      if (existing) {
        return {
          ...n,
          x: existing.x,
          y: existing.y,
          vx: existing.vx,
          vy: existing.vy,
        };
      }
      return { ...n };
    });
  }, [nodes]);

  // Smooth camera fly-to when focusTargetNodeId changes
  useEffect(() => {
    if (!focusTargetNodeId) return;
    const targetNode = simNodesRef.current.find(n => n.id === focusTargetNodeId) 
      || nodes.find(n => n.id === focusTargetNodeId);
    if (targetNode) {
      const cam = cameraRef.current;
      cam.targetX = -targetNode.x;
      cam.targetY = -targetNode.y;
      cam.targetZoom = 1.05;
    }
  }, [focusTargetNodeId, nodes]);

  // Generate cached starfield once
  useEffect(() => {
    const offscreen = document.createElement('canvas');
    offscreen.width = 3000;
    offscreen.height = 3000;
    const octx = offscreen.getContext('2d');
    if (octx) {
      octx.clearRect(0, 0, 3000, 3000);
      for (let i = 0; i < 350; i++) {
        const x = Math.random() * 3000;
        const y = Math.random() * 3000;
        const size = Math.random() * 1.8 + 0.4;
        const alpha = Math.random() * 0.7 + 0.2;

        octx.fillStyle = `rgba(226, 232, 240, ${alpha})`;
        octx.beginPath();
        octx.arc(x, y, size, 0, Math.PI * 2);
        octx.fill();
      }
    }
    offscreenStarsRef.current = offscreen;
  }, []);

  // Screen to World coordinates
  const screenToWorld = useCallback((screenX: number, screenY: number) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const width = canvas.width / dpr;
    const height = canvas.height / dpr;
    const cam = cameraRef.current;

    return {
      x: (screenX - width / 2) / cam.zoom - cam.x,
      y: (screenY - height / 2) / cam.zoom - cam.y,
    };
  }, []);

  // Node hit test
  const getNodeAt = useCallback((worldX: number, worldY: number): CelestialNode | null => {
    const currentNodes = simNodesRef.current;
    for (let i = currentNodes.length - 1; i >= 0; i--) {
      const node = currentNodes[i];
      const dx = worldX - node.x;
      const dy = worldY - node.y;
      const hitRadius = Math.max(node.radius, 24);
      if (dx * dx + dy * dy <= hitRadius * hitRadius) {
        return node;
      }
    }
    return null;
  }, []);

  // Native Wheel Listener
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleNativeWheel = (e: WheelEvent) => {
      e.preventDefault();
      const cam = cameraRef.current;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const zoomFactor = Math.exp(-e.deltaY * 0.002);
      const newZoom = Math.min(Math.max(cam.targetZoom * zoomFactor, 0.25), 2.5);

      const worldMouseX = (mouseX - width / 2) / cam.targetZoom - cam.targetX;
      const worldMouseY = (mouseY - height / 2) / cam.targetZoom - cam.targetY;

      cam.targetZoom = newZoom;
      cam.targetX = (mouseX - width / 2) / newZoom - worldMouseX;
      cam.targetY = (mouseY - height / 2) / newZoom - worldMouseY;
    };

    canvas.addEventListener('wheel', handleNativeWheel, { passive: false });
    return () => canvas.removeEventListener('wheel', handleNativeWheel);
  }, []);

  // Main 60-120 FPS Render Loop
  useEffect(() => {
    let animationFrameId: number;
    let time = 0;
    let frameCount = 0;
    let lastFpsTime = performance.now();

    const render = () => {
      time += 0.016;
      frameCount++;

      const now = performance.now();
      if (now - lastFpsTime >= 1000) {
        if (fpsInfoRef.current) {
          fpsInfoRef.current.innerText = `${frameCount} FPS`;
          fpsInfoRef.current.className = frameCount >= 55 ? 'font-bold text-emerald-400' : 'font-bold text-amber-400';
        }
        frameCount = 0;
        lastFpsTime = now;
      }

      // Smooth Camera Lerp
      const cam = cameraRef.current;
      cam.zoom += (cam.targetZoom - cam.zoom) * 0.16;
      cam.x += (cam.targetX - cam.x) * 0.22;
      cam.y += (cam.targetY - cam.y) * 0.22;

      // Direct DOM update for HUD
      if (hudInfoRef.current) {
        hudInfoRef.current.innerText = `POS: [${Math.round(cam.x)}, ${Math.round(cam.y)}] | ZOOM: ${(cam.zoom * 100).toFixed(0)}%`;
      }

      const canvas = canvasRef.current;
      if (!canvas) return;
      const ctx = canvas.getContext('2d', { alpha: false });
      if (!ctx) return;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = canvas.width / dpr;
      const height = canvas.height / dpr;

      // 1. Clear background
      ctx.fillStyle = '#03050c';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      ctx.save();
      ctx.scale(dpr, dpr);
      ctx.translate(width / 2, height / 2);
      ctx.scale(cam.zoom, cam.zoom);
      ctx.translate(cam.x, cam.y);

      // 2. Cached Starfield
      if (offscreenStarsRef.current) {
        ctx.drawImage(offscreenStarsRef.current, -1500, -1500);
      }

      // 3. Central Singularity
      const singularityRadius = 42;

      // Accretion disk
      ctx.save();
      ctx.rotate(time * 0.15);
      const accretionGrad = ctx.createRadialGradient(0, 0, singularityRadius * 0.8, 0, 0, singularityRadius * 3.2);
      accretionGrad.addColorStop(0, 'rgba(255, 255, 255, 0.85)');
      accretionGrad.addColorStop(0.25, 'rgba(244, 63, 94, 0.55)');
      accretionGrad.addColorStop(0.6, 'rgba(139, 92, 246, 0.25)');
      accretionGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = accretionGrad;
      ctx.beginPath();
      ctx.ellipse(0, 0, singularityRadius * 3.2, singularityRadius * 1.5, Math.PI / 4, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();

      // Photon sphere ring
      ctx.beginPath();
      ctx.arc(0, 0, singularityRadius * 1.25, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(56, 189, 248, 0.6)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Core
      ctx.beginPath();
      ctx.arc(0, 0, singularityRadius, 0, Math.PI * 2);
      ctx.fillStyle = '#000000';
      ctx.fill();
      ctx.strokeStyle = '#0e1726';
      ctx.lineWidth = 2.5;
      ctx.stroke();

      const activeSimNodes = simNodesRef.current;
      const activeLinks = linksRef.current;

      // Only draw singularity label if no node is directly hovering near the center (prevents label collision)
      const hasNodeNearCenter = activeSimNodes.some(n => Math.sqrt(n.x * n.x + n.y * n.y) < 65);
      if (cam.zoom > 0.6 && !hasNodeNearCenter) {
        ctx.font = '500 10px "JetBrains Mono", monospace';
        ctx.fillStyle = 'rgba(244, 63, 94, 0.75)';
        ctx.textAlign = 'center';
        ctx.fillText('◈ SINGULARITY HORIZON', 0, singularityRadius + 22);
      }

      // 4. Cosmic Links
      const activeLinksLen = activeLinks.length;
      for (let i = 0; i < activeLinksLen; i++) {
        const link = activeLinks[i];
        let source: CelestialNode | null = null;
        let target: CelestialNode | null = null;

        for (let j = 0; j < activeSimNodes.length; j++) {
          if (activeSimNodes[j].id === link.sourceId) source = activeSimNodes[j];
          else if (activeSimNodes[j].id === link.targetId) target = activeSimNodes[j];
          if (source && target) break;
        }

        if (!source || !target) continue;

        ctx.beginPath();
        ctx.moveTo(source.x, source.y);
        ctx.lineTo(target.x, target.y);

        if (link.type === 'quantum_entanglement') {
          ctx.setLineDash([5, 5]);
          ctx.lineDashOffset = -time * 20;
          ctx.strokeStyle = 'rgba(192, 132, 252, 0.6)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.setLineDash([]);
        } else if (link.type === 'dialectical_tension') {
          ctx.strokeStyle = 'rgba(244, 63, 94, 0.65)';
          ctx.lineWidth = 1.8;
          ctx.stroke();
        } else {
          ctx.strokeStyle = 'rgba(56, 189, 248, 0.3)';
          ctx.lineWidth = 1.2;
          ctx.stroke();
        }

        const pulseProgress = (time * 0.5 + i * 0.25) % 1;
        const px = source.x + (target.x - source.x) * pulseProgress;
        const py = source.y + (target.y - source.y) * pulseProgress;
        ctx.beginPath();
        ctx.arc(px, py, 2, 0, Math.PI * 2);
        ctx.fillStyle = '#ffffff';
        ctx.fill();

        if (link.label && cam.zoom > 0.9) {
          ctx.font = '10px "JetBrains Mono", monospace';
          ctx.fillStyle = 'rgba(148, 163, 184, 0.7)';
          ctx.textAlign = 'center';
          ctx.fillText(link.label, (source.x + target.x) / 2, (source.y + target.y) / 2 - 6);
        }
      }

      // 5. Celestial Nodes
      const nodeLen = activeSimNodes.length;
      for (let i = 0; i < nodeLen; i++) {
        const node = activeSimNodes[i];
        const isSelected = node.id === selectedNodeId;

        if (node.type === 'pulsar') {
          const pulseR = ((time * 25 + node.mass) % 80) + node.radius;
          const pulseAlpha = Math.max(0, 1 - pulseR / (node.radius + 80));
          ctx.beginPath();
          ctx.arc(node.x, node.y, pulseR, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(225, 29, 72, ${pulseAlpha * 0.6})`;
          ctx.lineWidth = 1.5;
          ctx.stroke();
        }

        if (node.type === 'star') {
          // Radiant dynamic rotating solar corona rays
          ctx.save();
          ctx.translate(node.x, node.y);
          ctx.rotate(time * 0.35);

          const rayCount = 8;
          const outerR = node.radius * 2.2;
          const innerR = node.radius * 1.05;
          ctx.beginPath();
          for (let r = 0; r < rayCount * 2; r++) {
            const angle = (r * Math.PI) / rayCount;
            const dist = r % 2 === 0 ? outerR : innerR;
            const rx = Math.cos(angle) * dist;
            const ry = Math.sin(angle) * dist;
            if (r === 0) ctx.moveTo(rx, ry);
            else ctx.lineTo(rx, ry);
          }
          ctx.closePath();
          ctx.fillStyle = node.glowColor || 'rgba(251, 191, 36, 0.28)';
          ctx.fill();

          // Brilliant diffraction spikes (cross)
          ctx.beginPath();
          const spikeLen = node.radius * 2.6;
          ctx.moveTo(-spikeLen, 0);
          ctx.lineTo(spikeLen, 0);
          ctx.moveTo(0, -spikeLen);
          ctx.lineTo(0, spikeLen);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.45)';
          ctx.lineWidth = 1.4;
          ctx.stroke();

          ctx.restore();
        }

        // Glow ring
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = node.glowColor;
        ctx.fill();

        // Sphere
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        const bodyGrad = ctx.createRadialGradient(
          node.x - node.radius * 0.35, 
          node.y - node.radius * 0.35, 
          node.radius * 0.1, 
          node.x, 
          node.y, 
          node.radius
        );
        bodyGrad.addColorStop(0, '#ffffff');
        bodyGrad.addColorStop(0.35, node.color);
        bodyGrad.addColorStop(1, '#050711');
        ctx.fillStyle = bodyGrad;
        ctx.fill();

        ctx.strokeStyle = isSelected ? '#38bdf8' : 'rgba(255, 255, 255, 0.4)';
        ctx.lineWidth = isSelected ? 2.5 : 1.2;
        ctx.stroke();

        if (node.type === 'planet' && node.mass >= 80) {
          ctx.save();
          ctx.translate(node.x, node.y);
          ctx.rotate(Math.PI / 6);
          ctx.beginPath();
          ctx.ellipse(0, 0, node.radius * 1.8, node.radius * 0.45, 0, 0, Math.PI * 2);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
          ctx.lineWidth = 1.5;
          ctx.stroke();
          ctx.restore();
        }

        if (isSelected) {
          ctx.save();
          ctx.translate(node.x, node.y);
          ctx.rotate(time * 0.7);
          ctx.strokeStyle = '#38bdf8';
          ctx.lineWidth = 1.8;
          ctx.setLineDash([6, 10]);
          ctx.beginPath();
          ctx.arc(0, 0, node.radius + 12, 0, Math.PI * 2);
          ctx.stroke();
          ctx.restore();
        }

        // Node Title with Translucent Backdrop Pill (Zero Text Collision)
        if (cam.zoom > 0.45) {
          ctx.font = '600 11px "Plus Jakarta Sans", sans-serif';
          const titleWidth = ctx.measureText(node.title).width;

          // Background pill
          ctx.fillStyle = 'rgba(3, 5, 12, 0.78)';
          ctx.beginPath();
          const pillX = node.x - titleWidth / 2 - 6;
          const pillY = node.y + node.radius + 6;
          const pillW = titleWidth + 12;
          const pillH = 18;
          if (ctx.roundRect) {
            ctx.roundRect(pillX, pillY, pillW, pillH, 4);
          } else {
            ctx.rect(pillX, pillY, pillW, pillH);
          }
          ctx.fill();

          ctx.fillStyle = '#f8fafc';
          ctx.textAlign = 'center';
          ctx.fillText(node.title, node.x, node.y + node.radius + 19);

          if (cam.zoom > 0.7) {
            ctx.font = '9px "JetBrains Mono", monospace';
            ctx.fillStyle = 'rgba(148, 163, 184, 0.85)';
            ctx.fillText(`${node.type.toUpperCase()} • ${node.frequency}Hz`, node.x, node.y + node.radius + 36);
          }
        }
      }

      // Drag proximity indicator
      if (isDraggingNode.current && draggedNodeId.current) {
        const dNode = activeSimNodes.find(n => n.id === draggedNodeId.current);
        if (dNode) {
          const distToHole = Math.sqrt(dNode.x * dNode.x + dNode.y * dNode.y);
          if (distToHole < 180) {
            ctx.beginPath();
            ctx.moveTo(dNode.x, dNode.y);
            ctx.lineTo(0, 0);
            ctx.strokeStyle = 'rgba(244, 63, 94, 0.8)';
            ctx.lineWidth = 2.5;
            ctx.setLineDash([4, 4]);
            ctx.stroke();
            ctx.setLineDash([]);

            ctx.font = 'bold 11px "JetBrains Mono", monospace';
            ctx.fillStyle = '#f43f5e';
            ctx.textAlign = 'center';
            ctx.fillText('LEPASKAN UNTUK PURIFIKASI', dNode.x / 2, dNode.y / 2 - 10);
          }
        }
      }

      ctx.restore();

      // In-place physics step
      if (!isPhysicsPaused) {
        physicsEngine.stepInPlace(activeSimNodes, activeLinks, draggedNodeId.current);
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [selectedNodeId, isPhysicsPaused, physicsEngine]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Mouse Handlers
  const handleMouseDown = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const worldPos = screenToWorld(e.clientX, e.clientY);
    const clickedNode = getNodeAt(worldPos.x, worldPos.y);

    if (clickedNode) {
      isDraggingNode.current = true;
      draggedNodeId.current = clickedNode.id;
      dragStartPos.current = { x: worldPos.x - clickedNode.x, y: worldPos.y - clickedNode.y };
      onSelectNode(clickedNode);
      soundEngine.playNodeResonance(clickedNode.frequency, clickedNode.type);
    } else {
      isDraggingCanvas.current = true;
      dragStartPos.current = { x: e.clientX, y: e.clientY };
      onSelectNode(null);
    }
  };

  const handleMouseMove = (e: React.MouseEvent<HTMLCanvasElement>) => {
    const worldPos = screenToWorld(e.clientX, e.clientY);
    mouseCanvasPos.current = worldPos;

    const hoveredNode = getNodeAt(worldPos.x, worldPos.y);
    if (hoveredNode && hoveredNode.id !== lastHoveredNodeId.current) {
      soundEngine.playNodeResonance(hoveredNode.frequency, hoveredNode.type);
      lastHoveredNodeId.current = hoveredNode.id;
    } else if (!hoveredNode) {
      lastHoveredNodeId.current = null;
    }

    if (isDraggingNode.current && draggedNodeId.current) {
      const dNode = simNodesRef.current.find(n => n.id === draggedNodeId.current);
      if (dNode) {
        dNode.x = worldPos.x - dragStartPos.current.x;
        dNode.y = worldPos.y - dragStartPos.current.y;
        dNode.vx = 0;
        dNode.vy = 0;
      }
      return;
    }

    if (isDraggingCanvas.current) {
      const cam = cameraRef.current;
      const dx = (e.clientX - dragStartPos.current.x) / cam.zoom;
      const dy = (e.clientY - dragStartPos.current.y) / cam.zoom;

      cam.targetX += dx;
      cam.targetY += dy;
      cam.x += dx;
      cam.y += dy;

      dragStartPos.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handleMouseUp = () => {
    if (isDraggingNode.current && draggedNodeId.current) {
      const dNode = simNodesRef.current.find(n => n.id === draggedNodeId.current);
      if (dNode) {
        const distToSingularity = Math.sqrt(dNode.x * dNode.x + dNode.y * dNode.y);
        if (distToSingularity < 70) {
          onDropIntoSingularity(dNode);
        } else if (onNodeDragEnd) {
          onNodeDragEnd(dNode.id, dNode.x, dNode.y);
        }
      }
    }

    isDraggingCanvas.current = false;
    isDraggingNode.current = false;
    draggedNodeId.current = null;
  };

  // Mobile Touch Handlers (1-finger Pan/Drag + 2-finger Pinch-to-Zoom)
  const handleTouchStart = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const worldPos = screenToWorld(touch.clientX, touch.clientY);
      const clickedNode = getNodeAt(worldPos.x, worldPos.y);

      if (clickedNode) {
        isDraggingNode.current = true;
        draggedNodeId.current = clickedNode.id;
        dragStartPos.current = { x: worldPos.x - clickedNode.x, y: worldPos.y - clickedNode.y };
        onSelectNode(clickedNode);
        soundEngine.playNodeResonance(clickedNode.frequency, clickedNode.type);
      } else {
        isDraggingCanvas.current = true;
        dragStartPos.current = { x: touch.clientX, y: touch.clientY };
      }
    } else if (e.touches.length === 2) {
      // 2-finger pinch start
      isDraggingCanvas.current = false;
      isDraggingNode.current = false;
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      pinchStartDist.current = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      pinchStartZoom.current = cameraRef.current.targetZoom;
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLCanvasElement>) => {
    if (e.touches.length === 1) {
      const touch = e.touches[0];
      const worldPos = screenToWorld(touch.clientX, touch.clientY);

      if (isDraggingNode.current && draggedNodeId.current) {
        const dNode = simNodesRef.current.find(n => n.id === draggedNodeId.current);
        if (dNode) {
          dNode.x = worldPos.x - dragStartPos.current.x;
          dNode.y = worldPos.y - dragStartPos.current.y;
          dNode.vx = 0;
          dNode.vy = 0;
        }
        return;
      }

      if (isDraggingCanvas.current) {
        const cam = cameraRef.current;
        const dx = (touch.clientX - dragStartPos.current.x) / cam.zoom;
        const dy = (touch.clientY - dragStartPos.current.y) / cam.zoom;

        cam.targetX += dx;
        cam.targetY += dy;
        cam.x += dx;
        cam.y += dy;

        dragStartPos.current = { x: touch.clientX, y: touch.clientY };
      }
    } else if (e.touches.length === 2 && pinchStartDist.current !== null) {
      // 2-finger pinch zoom
      const t1 = e.touches[0];
      const t2 = e.touches[1];
      const newDist = Math.hypot(t1.clientX - t2.clientX, t1.clientY - t2.clientY);
      const ratio = newDist / pinchStartDist.current;
      const cam = cameraRef.current;
      cam.targetZoom = Math.min(Math.max(pinchStartZoom.current * ratio, 0.25), 2.5);
    }
  };

  const handleTouchEnd = () => {
    pinchStartDist.current = null;
    handleMouseUp();
  };

  return (
    <div ref={containerRef} className="relative w-full h-full overflow-hidden select-none touch-none">
      <canvas
        ref={canvasRef}
        className="w-full h-full block cursor-grab active:cursor-grabbing will-change-transform transform-gpu"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      />

      {/* Empty State Overlay when no nodes exist */}
      {nodes.length === 0 && (
        <div className="absolute inset-0 pointer-events-none flex items-center justify-center p-4 z-20 animate-fadeIn">
          <div className="bg-slate-950/90 p-6 sm:p-8 rounded-2xl border border-slate-800 text-center max-w-md pointer-events-auto backdrop-blur-md shadow-2xl">
            <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center text-sky-400">
              <Sparkles size={24} strokeWidth={2} />
            </div>
            <h3 className="font-mono font-semibold text-slate-100 text-sm tracking-wide mb-1.5">
              SEMESTA KOSONG
            </h3>
            <p className="text-slate-400 text-xs leading-relaxed mb-5">
              Semua data telah dibersihkan. Mulai konstelasi baru dengan menciptakan simpul pemikiran pertama.
            </p>
            {onOpenCreateNode && (
              <button
                onClick={onOpenCreateNode}
                className="px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-500 text-white font-mono text-xs font-medium transition-all duration-150 active:scale-[0.98] inline-flex items-center gap-2 cursor-pointer"
              >
                <Plus size={15} strokeWidth={2} />
                <span>Buat Simpul Pertama</span>
              </button>
            )}
          </div>
        </div>
      )}

      {/* Floating HUD Telemetry (Positioned above dock on mobile, bottom-left on desktop) */}
      <div className="absolute top-16 sm:top-auto sm:bottom-6 left-2.5 sm:left-6 z-20 pointer-events-none flex items-center space-x-2 sm:space-x-2.5 text-[10px] sm:text-xs font-mono text-slate-400 bg-slate-950/85 px-2.5 sm:px-3.5 py-1 sm:py-1.5 rounded-full border border-slate-800/80 shadow-xl">
        <span className="w-2 h-2 rounded-full" style={{ backgroundColor: activeTimelineColor }}></span>
        <span ref={hudInfoRef} className="font-bold text-slate-300">
          POS: [0, 0] | ZOOM: 100%
        </span>
        <span className="text-slate-600">|</span>
        <span ref={fpsInfoRef} className="font-bold text-emerald-400">
          60 FPS
        </span>
      </div>
    </div>
  );
};
