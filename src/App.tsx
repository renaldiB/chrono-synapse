import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { CelestialCanvas } from './components/Canvas/CelestialCanvas';
import { TopNav } from './components/HUD/TopNav';
import { ThoughtInspector } from './components/HUD/ThoughtInspector';
import { ColliderModal } from './components/HUD/ColliderModal';
import { SingularityModal } from './components/HUD/SingularityModal';
import { TimelineManager } from './components/HUD/TimelineManager';
import { CreateNodeModal } from './components/HUD/CreateNodeModal';
import { ExportModal } from './components/HUD/ExportModal';
import { HelpModal } from './components/HUD/HelpModal';
import { ResetConfirmModal } from './components/HUD/ResetConfirmModal';
import confetti from 'canvas-confetti';
import { Sparkles } from 'lucide-react';

import { CelestialNode, CosmicLink, Timeline, CollisionSynthesis, SingularityPurification } from './types/cosmos';
import { INITIAL_NODES, INITIAL_LINKS, INITIAL_TIMELINES } from './data/presetGalaxies';
import { physicsEngine } from './engine/PhysicsEngine';
import { soundEngine } from './engine/SoundEngine';

const STORAGE_KEY = 'CHRONO_SYNAPSE_COSMOS_V1';

export function App() {
  // Load initial cosmos from local storage or presets
  const [nodes, setNodes] = useState<CelestialNode[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_NODES`);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return INITIAL_NODES;
  });

  const [links, setLinks] = useState<CosmicLink[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_LINKS`);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return INITIAL_LINKS;
  });

  const [timelines, setTimelines] = useState<Timeline[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_TIMELINES`);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return INITIAL_TIMELINES;
  });

  const [activeTimelineId, setActiveTimelineId] = useState<string>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_ACTIVE_TIMELINE`);
      if (saved) return saved;
    } catch (_) {}
    return 'timeline-alpha';
  });

  const [syntheses, setSyntheses] = useState<CollisionSynthesis[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_SYNTHESES`);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [];
  });

  const [purifications, setPurifications] = useState<SingularityPurification[]>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_PURIFICATIONS`);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return [];
  });

  const [stardustTotal, setStardustTotal] = useState<number>(() => {
    try {
      const saved = localStorage.getItem(`${STORAGE_KEY}_STARDUST`);
      if (saved) return JSON.parse(saved);
    } catch (_) {}
    return 120;
  });

  // UI state
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const [isAudioMuted, setIsAudioMuted] = useState<boolean>(true);
  const [isPhysicsPaused, setIsPhysicsPaused] = useState<boolean>(false);

  // Modals
  const [isColliderOpen, setIsColliderOpen] = useState(false);
  const [colliderNodeA, setColliderNodeA] = useState<CelestialNode | null>(null);
  const [colliderNodeB, setColliderNodeB] = useState<CelestialNode | null>(null);

  const [isSingularityOpen, setIsSingularityOpen] = useState(false);
  const [singularityTargetNode, setSingularityTargetNode] = useState<CelestialNode | null>(null);

  const [isTimelineManagerOpen, setIsTimelineManagerOpen] = useState(false);
  const [isCreateNodeOpen, setIsCreateNodeOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [isHelpOpen, setIsHelpOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);
  const [focusTargetNodeId, setFocusTargetNodeId] = useState<string | null>(null);
  const [starBirthToast, setStarBirthToast] = useState<{ id: string; title: string } | null>(null);

  // Debounced Save to LocalStorage
  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        localStorage.setItem(`${STORAGE_KEY}_NODES`, JSON.stringify(nodes));
        localStorage.setItem(`${STORAGE_KEY}_LINKS`, JSON.stringify(links));
        localStorage.setItem(`${STORAGE_KEY}_TIMELINES`, JSON.stringify(timelines));
        localStorage.setItem(`${STORAGE_KEY}_ACTIVE_TIMELINE`, activeTimelineId);
        localStorage.setItem(`${STORAGE_KEY}_SYNTHESES`, JSON.stringify(syntheses));
        localStorage.setItem(`${STORAGE_KEY}_PURIFICATIONS`, JSON.stringify(purifications));
        localStorage.setItem(`${STORAGE_KEY}_STARDUST`, JSON.stringify(stardustTotal));
      } catch (_) {}
    }, 1500);

    return () => clearTimeout(timer);
  }, [nodes, links, timelines, activeTimelineId, syntheses, purifications, stardustTotal]);

  // Guaranteed Immediate Save when closing or refreshing tab
  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        localStorage.setItem(`${STORAGE_KEY}_NODES`, JSON.stringify(nodes));
        localStorage.setItem(`${STORAGE_KEY}_LINKS`, JSON.stringify(links));
        localStorage.setItem(`${STORAGE_KEY}_TIMELINES`, JSON.stringify(timelines));
        localStorage.setItem(`${STORAGE_KEY}_ACTIVE_TIMELINE`, activeTimelineId);
        localStorage.setItem(`${STORAGE_KEY}_SYNTHESES`, JSON.stringify(syntheses));
        localStorage.setItem(`${STORAGE_KEY}_PURIFICATIONS`, JSON.stringify(purifications));
        localStorage.setItem(`${STORAGE_KEY}_STARDUST`, JSON.stringify(stardustTotal));
      } catch (_) {}
    };

    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => window.removeEventListener('beforeunload', handleBeforeUnload);
  }, [nodes, links, timelines, activeTimelineId, syntheses, purifications, stardustTotal]);

  // Keyboard shortcuts (Space = pause physics, Esc = close modals)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement || e.target instanceof HTMLSelectElement) {
        return;
      }
      if (e.code === 'Space') {
        e.preventDefault();
        setIsPhysicsPaused(prev => !prev);
      } else if (e.code === 'Escape') {
        setSelectedNodeId(null);
        setIsColliderOpen(false);
        setIsSingularityOpen(false);
        setIsTimelineManagerOpen(false);
        setIsCreateNodeOpen(false);
        setIsExportOpen(false);
        setIsHelpOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Update node position only when dragging finishes (1 single state update instead of 600/sec)
  const handleNodeDragEnd = useCallback((id: string, x: number, y: number) => {
    setNodes(prevNodes =>
      prevNodes.map(node =>
        node.id === id ? { ...node, x, y, vx: 0, vy: 0 } : node
      )
    );
  }, []);

  // Filter nodes for active timeline
  const visibleNodes = useMemo(() => {
    return nodes.filter(
      n => !n.timelineId || n.timelineId === activeTimelineId || n.timelineId === 'timeline-alpha'
    );
  }, [nodes, activeTimelineId]);

  const activeTimeline = timelines.find(t => t.id === activeTimelineId) || timelines[0];
  const selectedNode = nodes.find(n => n.id === selectedNodeId) || null;

  // Sound toggle
  const handleToggleAudio = () => {
    const muted = soundEngine.toggleMute();
    setIsAudioMuted(muted);
  };

  // Node modifications
  const handleUpdateNode = useCallback((updated: CelestialNode) => {
    setNodes(prev => prev.map(n => n.id === updated.id ? updated : n));
  }, []);

  const handleDeleteNode = useCallback((id: string) => {
    setNodes(prev => prev.filter(n => n.id !== id));
    setLinks(prev => prev.filter(l => l.sourceId !== id && l.targetId !== id));
    setSelectedNodeId(prev => prev === id ? null : prev);
  }, []);

  const handleCreateLink = useCallback((sourceId: string, targetId: string) => {
    const newLink: CosmicLink = {
      id: `link-${Date.now()}`,
      sourceId,
      targetId,
      strength: 0.6,
      type: 'quantum_entanglement',
      label: 'Entanglement Kuantum',
    };
    setLinks(prev => [...prev, newLink]);
  }, []);

  const handleDeleteLink = useCallback((linkId: string) => {
    setLinks(prev => prev.filter(l => l.id !== linkId));
  }, []);

  // Accelerator & Collider Triggers
  const handleOpenColliderWithNode = (node: CelestialNode) => {
    setColliderNodeA(node);
    const otherNode = nodes.find(n => n.id !== node.id) || null;
    setColliderNodeB(otherNode);
    setIsColliderOpen(true);
  };

  const handleManifestSynthesis = (synth: CollisionSynthesis) => {
    const parentA = nodes.find(n => n.id === synth.nodeA.id);
    const parentB = nodes.find(n => n.id === synth.nodeB.id);

    let spawnX = 0;
    let spawnY = 0;

    if (parentA && parentB) {
      // Spawn at midpoint between Parent A and Parent B with safe perpendicular offset
      const midX = (parentA.x + parentB.x) / 2;
      const midY = (parentA.y + parentB.y) / 2;
      const dx = parentB.x - parentA.x;
      const dy = parentB.y - parentA.y;
      const dist = Math.hypot(dx, dy) || 1;
      const perpX = -dy / dist;
      const perpY = dx / dist;
      // Offset perpendicular by 85px to create a triangular constellation
      spawnX = midX + perpX * 85;
      spawnY = midY + perpY * 85;

      // Keep safe distance from singularity center (0,0) so it doesn't get swallowed
      const distToCenter = Math.hypot(spawnX, spawnY);
      if (distToCenter < 180) {
        const factor = 220 / (distToCenter || 1);
        spawnX *= factor;
        spawnY *= factor;
      }
    } else if (parentA) {
      spawnX = parentA.x + 130;
      spawnY = parentA.y + 60;
    } else {
      const angle = Math.random() * Math.PI * 2;
      const dist = 320 + Math.random() * 80;
      spawnX = Math.cos(angle) * dist;
      spawnY = Math.sin(angle) * dist;
    }

    const newStarId = `node-synth-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`;
    const newNode: CelestialNode = {
      id: newStarId,
      title: synth.synthesisTitle,
      content: `${synth.coreSynthesis}\n\n◈ Resolusi Paradoks:\n${synth.dialecticalResolution}\n\n◈ Tindakan Nyata:\n${synth.quantumActionStep}\n\n◈ Aforisme Paradoks:\n${synth.paradoxQuote}`,
      type: 'star', // ALWAYS a radiant Star as promised by the UI!
      x: spawnX,
      y: spawnY,
      vx: (Math.random() - 0.5) * 0.1,
      vy: (Math.random() - 0.5) * 0.1,
      mass: 160,
      radius: 36,
      color: '#fbbf24', // Radiant golden starlight
      glowColor: 'rgba(251, 191, 36, 0.65)',
      frequency: synth.resonanceFrequency,
      polarity: 0.1,
      tags: ['bintang-sintesis', 'dialektika', 'emergensi'],
      timelineId: activeTimelineId,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      entropy: 5,
    };

    const linkA: CosmicLink = {
      id: `link-synth-A-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      sourceId: newNode.id,
      targetId: synth.nodeA.id,
      strength: 0.75,
      type: 'quantum_entanglement',
      label: `Sintesis: ${parentA?.title ? parentA.title.substring(0, 16) : 'Induk A'}`,
    };

    const linkB: CosmicLink = {
      id: `link-synth-B-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`,
      sourceId: newNode.id,
      targetId: synth.nodeB.id,
      strength: 0.75,
      type: 'quantum_entanglement',
      label: `Sintesis: ${parentB?.title ? parentB.title.substring(0, 16) : 'Induk B'}`,
    };

    setNodes(prev => [newNode, ...prev]);
    setLinks(prev => [...prev, linkA, linkB]);
    setSyntheses(prev => [synth, ...prev]);
    setFocusTargetNodeId(newNode.id);
    setSelectedNodeId(null);
    setStarBirthToast({
      id: newNode.id,
      title: newNode.title,
    });

    // Star birth audio resonance & celebratory particle burst
    soundEngine.playNodeResonance(synth.resonanceFrequency, 'star');
    try {
      confetti({
        particleCount: 90,
        spread: 120,
        origin: { y: 0.6 },
        colors: ['#fbbf24', '#f59e0b', '#38bdf8', '#c084fc', '#ffffff'],
      });
    } catch (_) {}
  };

  // Singularity Triggers
  const handleOpenSingularityWithNode = (node: CelestialNode) => {
    setSingularityTargetNode(node);
    setIsSingularityOpen(true);
  };

  const handleDropIntoSingularity = (node: CelestialNode) => {
    setSingularityTargetNode(node);
    setIsSingularityOpen(true);
  };

  const handlePurifyNode = (nodeId: string, purification: SingularityPurification) => {
    setNodes(prev => prev.filter(n => n.id !== nodeId));
    setLinks(prev => prev.filter(l => l.sourceId !== nodeId && l.targetId !== nodeId));
    setPurifications(prev => [purification, ...prev]);
    setStardustTotal(prev => prev + purification.stardustCount);
    setSelectedNodeId(prev => prev === nodeId ? null : prev);
  };

  // Universe import & reset
  const handleImportUniverse = (data: {
    nodes: CelestialNode[];
    links: CosmicLink[];
    timelines: Timeline[];
    syntheses?: CollisionSynthesis[];
    purifications?: SingularityPurification[];
  }) => {
    setNodes(data.nodes);
    setLinks(data.links);
    setTimelines(data.timelines);
    if (data.syntheses) setSyntheses(data.syntheses);
    if (data.purifications) setPurifications(data.purifications);
    setSelectedNodeId(null);
  };

  const handleClearAllData = () => {
    const primeTimeline: Timeline = {
      id: 'timeline-alpha',
      name: 'Timeline Prime (Semesta Baru)',
      divergenceFactor: 0.0,
      color: '#38bdf8',
      createdAt: Date.now(),
      description: 'Garis waktu utama setelah pembersihan semesta.'
    };
    setNodes([]);
    setLinks([]);
    setTimelines([primeTimeline]);
    setActiveTimelineId('timeline-alpha');
    setSyntheses([]);
    setPurifications([]);
    setStardustTotal(0);
    setSelectedNodeId(null);
    try {
      localStorage.setItem(`${STORAGE_KEY}_NODES`, JSON.stringify([]));
      localStorage.setItem(`${STORAGE_KEY}_LINKS`, JSON.stringify([]));
      localStorage.setItem(`${STORAGE_KEY}_TIMELINES`, JSON.stringify([primeTimeline]));
      localStorage.setItem(`${STORAGE_KEY}_ACTIVE_TIMELINE`, 'timeline-alpha');
      localStorage.setItem(`${STORAGE_KEY}_SYNTHESES`, JSON.stringify([]));
      localStorage.setItem(`${STORAGE_KEY}_PURIFICATIONS`, JSON.stringify([]));
      localStorage.setItem(`${STORAGE_KEY}_STARDUST`, JSON.stringify(0));
    } catch (_) {}
  };

  const handleRestoreDemoData = () => {
    setNodes(INITIAL_NODES);
    setLinks(INITIAL_LINKS);
    setTimelines(INITIAL_TIMELINES);
    setActiveTimelineId('timeline-alpha');
    setSyntheses([]);
    setPurifications([]);
    setStardustTotal(120);
    setSelectedNodeId(null);
    try {
      localStorage.setItem(`${STORAGE_KEY}_NODES`, JSON.stringify(INITIAL_NODES));
      localStorage.setItem(`${STORAGE_KEY}_LINKS`, JSON.stringify(INITIAL_LINKS));
      localStorage.setItem(`${STORAGE_KEY}_TIMELINES`, JSON.stringify(INITIAL_TIMELINES));
      localStorage.setItem(`${STORAGE_KEY}_ACTIVE_TIMELINE`, 'timeline-alpha');
      localStorage.setItem(`${STORAGE_KEY}_SYNTHESES`, JSON.stringify([]));
      localStorage.setItem(`${STORAGE_KEY}_PURIFICATIONS`, JSON.stringify([]));
      localStorage.setItem(`${STORAGE_KEY}_STARDUST`, JSON.stringify(120));
    } catch (_) {}
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-[#03050c]">
      {/* Optimized Scanline overlay with CSS will-change */}
      <div className="absolute inset-0 scanline-grid pointer-events-none z-10 opacity-50" />

      {/* Top Futuristic Navigation HUD */}
      <TopNav
        timelines={timelines}
        activeTimelineId={activeTimelineId}
        onSelectTimeline={setActiveTimelineId}
        onOpenTimelineManager={() => setIsTimelineManagerOpen(true)}
        onOpenCollider={() => {
          setColliderNodeA(visibleNodes[0] || null);
          setColliderNodeB(visibleNodes[1] || null);
          setIsColliderOpen(true);
        }}
        onOpenSingularity={() => {
          setSingularityTargetNode(visibleNodes[0] || null);
          setIsSingularityOpen(true);
        }}
        onOpenCreateNode={() => setIsCreateNodeOpen(true)}
        onOpenExport={() => setIsExportOpen(true)}
        onOpenHelp={() => setIsHelpOpen(true)}
        onOpenReset={() => setIsResetConfirmOpen(true)}
        isAudioMuted={isAudioMuted}
        onToggleAudio={handleToggleAudio}
        isPhysicsPaused={isPhysicsPaused}
        onTogglePhysics={() => setIsPhysicsPaused(p => !p)}
        stardustTotal={stardustTotal}
      />

      {/* 60-120 FPS High-Performance Celestial Canvas */}
      <CelestialCanvas
        nodes={visibleNodes}
        links={links}
        selectedNodeId={selectedNodeId}
        focusTargetNodeId={focusTargetNodeId}
        onSelectNode={(node) => {
          setSelectedNodeId(node ? node.id : null);
          if (node) setFocusTargetNodeId(null);
        }}
        onNodeDragEnd={handleNodeDragEnd}
        onDropIntoSingularity={handleDropIntoSingularity}
        onOpenCreateNode={() => setIsCreateNodeOpen(true)}
        physicsEngine={physicsEngine}
        isPhysicsPaused={isPhysicsPaused}
        activeTimelineColor={activeTimeline.color}
      />

      {/* Selected Node Inspector HUD */}
      {selectedNode && (
        <ThoughtInspector
          node={selectedNode}
          allNodes={visibleNodes}
          links={links}
          onClose={() => setSelectedNodeId(null)}
          onUpdateNode={handleUpdateNode}
          onDeleteNode={handleDeleteNode}
          onSendToCollider={handleOpenColliderWithNode}
          onSacrificeToSingularity={handleOpenSingularityWithNode}
          onCreateLink={handleCreateLink}
          onDeleteLink={handleDeleteLink}
        />
      )}

      {/* Modals rendered on-demand */}
      {isColliderOpen && (
        <ColliderModal
          nodes={visibleNodes}
          initialNodeA={colliderNodeA}
          initialNodeB={colliderNodeB}
          onClose={() => setIsColliderOpen(false)}
          onManifestSynthesis={handleManifestSynthesis}
        />
      )}

      {isSingularityOpen && (
        <SingularityModal
          nodes={visibleNodes}
          initialNode={singularityTargetNode}
          purifications={purifications}
          onClose={() => setIsSingularityOpen(false)}
          onPurifyNode={handlePurifyNode}
        />
      )}

      {isTimelineManagerOpen && (
        <TimelineManager
          timelines={timelines}
          activeTimelineId={activeTimelineId}
          onSelectTimeline={(id) => {
            setActiveTimelineId(id);
            setIsTimelineManagerOpen(false);
          }}
          onCreateTimeline={(newT) => {
            setTimelines(prev => [...prev, newT]);
            setActiveTimelineId(newT.id);
            setIsTimelineManagerOpen(false);
          }}
          onClose={() => setIsTimelineManagerOpen(false)}
        />
      )}

      {isCreateNodeOpen && (
        <CreateNodeModal
          existingNodes={visibleNodes}
          activeTimelineId={activeTimelineId}
          onClose={() => setIsCreateNodeOpen(false)}
          onCreateNode={(newNode) => {
            setNodes(prev => [newNode, ...prev]);
            setSelectedNodeId(newNode.id);
            setFocusTargetNodeId(newNode.id);
          }}
        />
      )}

      {isExportOpen && (
        <ExportModal
          nodes={nodes}
          links={links}
          timelines={timelines}
          syntheses={syntheses}
          purifications={purifications}
          stardustTotal={stardustTotal}
          onImportUniverse={handleImportUniverse}
          onResetToDefault={handleRestoreDemoData}
          onWipeAll={handleClearAllData}
          onClose={() => setIsExportOpen(false)}
        />
      )}

      {isResetConfirmOpen && (
        <ResetConfirmModal
          onClose={() => setIsResetConfirmOpen(false)}
          onConfirmWipeAll={handleClearAllData}
          onRestoreDemo={handleRestoreDemoData}
        />
      )}

      {isHelpOpen && (
        <HelpModal onClose={() => setIsHelpOpen(false)} />
      )}

      {/* Celebratory Star Birth Toast Banner */}
      {starBirthToast && (
        <div className="fixed top-18 sm:top-20 left-1/2 -translate-x-1/2 z-40 cosmic-glass px-4 py-3 rounded-2xl border border-amber-400/50 shadow-[0_0_30px_rgba(251,191,36,0.4)] flex items-center gap-3 animate-slideDown pointer-events-auto">
          <div className="w-8 h-8 rounded-xl bg-amber-500/25 border border-amber-400/60 flex items-center justify-center text-amber-300 shrink-0">
            <Sparkles size={16} />
          </div>
          <div>
            <div className="text-[10px] font-mono text-amber-300 font-bold uppercase tracking-wider flex items-center gap-1.5">
              <span>✨ Bintang Baru Terlahir di Semesta!</span>
            </div>
            <div className="text-xs text-white font-semibold line-clamp-1 max-w-[200px] sm:max-w-xs">
              {starBirthToast.title}
            </div>
          </div>
          <button
            onClick={() => {
              setSelectedNodeId(starBirthToast.id);
              setStarBirthToast(null);
            }}
            className="ml-2 px-3 py-1.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/40 border border-amber-400/60 text-amber-200 text-xs font-mono font-bold transition-all shrink-0 cursor-pointer"
          >
            Inspeksi
          </button>
          <button
            onClick={() => setStarBirthToast(null)}
            className="text-slate-400 hover:text-white text-xs px-1.5 py-1 cursor-pointer"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
}

export default App;
