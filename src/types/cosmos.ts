export type NodeType = 'star' | 'planet' | 'moon' | 'asteroid' | 'pulsar';

export type LinkType = 
  | 'quantum_entanglement' 
  | 'gravitational_orbit' 
  | 'dialectical_tension' 
  | 'causal_ripple';

export interface CelestialNode {
  id: string;
  title: string;
  content: string;
  type: NodeType;
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;         // 10 to 200
  radius: number;       // Visual radius
  color: string;        // Hex code
  glowColor: string;    // Glow RGBA
  frequency: number;    // Audio Hz (100 - 1000 Hz)
  polarity: number;     // -1 (Analytical/Cold) to +1 (Intuitive/Warm)
  tags: string[];
  timelineId: string;
  parentId?: string;    // For orbital hierarchy
  orbitRadius?: number;
  orbitSpeed?: number;
  orbitAngle?: number;
  isPinned?: boolean;
  createdAt: number;
  updatedAt: number;
  entropy: number;      // 0-100 cognitive tension
}

export interface CosmicLink {
  id: string;
  sourceId: string;
  targetId: string;
  strength: number;      // 0.1 to 1.0
  type: LinkType;
  label?: string;
}

export interface Timeline {
  id: string;
  name: string;
  description: string;
  parentTimelineId?: string;
  color: string;
  divergenceFactor: number; // 0 to 1.0
  createdAt: number;
}

export interface CollisionSynthesis {
  id: string;
  timestamp: number;
  nodeA: { id: string; title: string; type: NodeType };
  nodeB: { id: string; title: string; type: NodeType };
  synthesisTitle: string;
  coreSynthesis: string;
  dialecticalResolution: string;
  quantumActionStep: string;
  paradoxQuote: string;
  suggestedType: NodeType;
  resonanceFrequency: number;
}

export interface SingularityPurification {
  id: string;
  originalTitle: string;
  purifiedWisdom: string;
  stardustCount: number;
  timestamp: number;
}

export interface UniverseState {
  nodes: CelestialNode[];
  links: CosmicLink[];
  timelines: Timeline[];
  activeTimelineId: string;
  syntheses: CollisionSynthesis[];
  purifications: SingularityPurification[];
  isAudioMuted: boolean;
  isPhysicsPaused: boolean;
  gravityConstant: number;
  timeDilation: number; // 0.1 to 2.0
}
