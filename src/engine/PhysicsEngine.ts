import { CelestialNode, CosmicLink } from '../types/cosmos';

export interface PhysicsConfig {
  gravityConstant: number;
  damping: number;
  timeDilation: number;
  singularityActive: boolean;
  singularityX: number;
  singularityY: number;
  singularityMass: number;
}

export const DEFAULT_PHYSICS_CONFIG: PhysicsConfig = {
  gravityConstant: 0.18,
  damping: 0.982,
  timeDilation: 1.0,
  singularityActive: true,
  singularityX: 0,
  singularityY: 0,
  singularityMass: 450,
};

export class PhysicsEngine {
  private config: PhysicsConfig;

  constructor(config: Partial<PhysicsConfig> = {}) {
    this.config = { ...DEFAULT_PHYSICS_CONFIG, ...config };
  }

  public updateConfig(newConfig: Partial<PhysicsConfig>) {
    this.config = { ...this.config, ...newConfig };
  }

  public getConfig(): PhysicsConfig {
    return this.config;
  }

  /**
   * Run in-place physics step on node array without allocations (Zero Garbage Collection)
   */
  public stepInPlace(nodes: CelestialNode[], links: CosmicLink[], draggedNodeId: string | null = null) {
    if (this.config.timeDilation <= 0) return;

    const dt = this.config.timeDilation;
    const G = this.config.gravityConstant;
    const len = nodes.length;

    // Fast map for parent lookups
    let parentMap: Record<string, CelestialNode> | null = null;

    // 1. Orbital parent-child constraints
    for (let i = 0; i < len; i++) {
      const node = nodes[i];
      if (node.parentId && !node.isPinned && node.id !== draggedNodeId) {
        if (!parentMap) {
          parentMap = {};
          for (let p = 0; p < len; p++) parentMap[nodes[p].id] = nodes[p];
        }
        const parent = parentMap[node.parentId];
        if (parent) {
          const orbitRadius = node.orbitRadius || 120;
          const orbitSpeed = node.orbitSpeed || 0.008;
          node.orbitAngle = (node.orbitAngle || 0) + orbitSpeed * dt;

          const targetX = parent.x + Math.cos(node.orbitAngle) * orbitRadius;
          const targetY = parent.y + Math.sin(node.orbitAngle) * orbitRadius;

          node.vx += (targetX - node.x) * 0.08;
          node.vy += (targetY - node.y) * 0.08;
        }
      }
    }

    // 2. Pairwise N-body interactions (Gravity + Polarity)
    for (let i = 0; i < len; i++) {
      const nodeA = nodes[i];
      if (nodeA.isPinned || nodeA.id === draggedNodeId) continue;

      let fx = 0;
      let fy = 0;

      for (let j = 0; j < len; j++) {
        if (i === j) continue;
        const nodeB = nodes[j];

        const dx = nodeB.x - nodeA.x;
        const dy = nodeB.y - nodeA.y;
        const distSq = dx * dx + dy * dy;
        const dist = Math.sqrt(distSq) || 1;

        const minDist = (nodeA.radius + nodeB.radius) * 1.5;

        if (dist < minDist) {
          const repelFactor = (minDist - dist) / minDist;
          fx -= (dx / dist) * repelFactor * 1.8;
          fy -= (dy / dist) * repelFactor * 1.8;
        } else {
          const gravityForce = (G * nodeA.mass * nodeB.mass) / (distSq > 1000 ? distSq : 1000);
          const polarityMod = 1 - (nodeA.polarity * nodeB.polarity) * 0.4;
          const totalForce = gravityForce * polarityMod;

          const clampedForce = totalForce > 2.5 ? 2.5 : totalForce;
          fx += (dx / dist) * clampedForce;
          fy += (dy / dist) * clampedForce;
        }
      }

      // 3. Central Singularity Pull
      if (this.config.singularityActive) {
        const sDx = this.config.singularityX - nodeA.x;
        const sDy = this.config.singularityY - nodeA.y;
        const sDistSq = sDx * sDx + sDy * sDy;
        const sDist = Math.sqrt(sDistSq) || 1;

        const sForce = (G * nodeA.mass * this.config.singularityMass) / (sDistSq > 8000 ? sDistSq : 8000);
        const clampedSForce = sForce > 1.2 ? 1.2 : sForce;
        fx += (sDx / sDist) * clampedSForce;
        fy += (sDy / sDist) * clampedSForce;
      }

      // a = F / m
      nodeA.vx = (nodeA.vx + (fx / nodeA.mass) * dt) * this.config.damping;
      nodeA.vy = (nodeA.vy + (fy / nodeA.mass) * dt) * this.config.damping;
    }

    // 4. Spring forces from Cosmic Links
    const linkLen = links.length;
    for (let k = 0; k < linkLen; k++) {
      const link = links[k];
      let source: CelestialNode | null = null;
      let target: CelestialNode | null = null;

      for (let m = 0; m < len; m++) {
        if (nodes[m].id === link.sourceId) source = nodes[m];
        else if (nodes[m].id === link.targetId) target = nodes[m];
        if (source && target) break;
      }

      if (!source || !target) continue;

      const dx = target.x - source.x;
      const dy = target.y - source.y;
      const dist = Math.sqrt(dx * dx + dy * dy) || 1;
      const targetDist = 180 / (link.strength || 0.5);

      const delta = dist - targetDist;
      const springF = delta * 0.003 * link.strength;

      if (!source.isPinned && source.id !== draggedNodeId) {
        source.vx += (dx / dist) * springF;
        source.vy += (dy / dist) * springF;
      }
      if (!target.isPinned && target.id !== draggedNodeId) {
        target.vx -= (dx / dist) * springF;
        target.vy -= (dy / dist) * springF;
      }
    }

    // 5. Integrate positions in place
    for (let i = 0; i < len; i++) {
      const node = nodes[i];
      if (node.isPinned || node.id === draggedNodeId) continue;

      node.x += node.vx * dt;
      node.y += node.vy * dt;
    }
  }
}

export const physicsEngine = new PhysicsEngine();
