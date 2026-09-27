import React, { useState } from 'react';
import { 
  Volume2, 
  Trash2, 
  Anchor, 
  Zap, 
  CircleDot, 
  Link as LinkIcon, 
  Tag, 
  Activity,
  Maximize2
} from 'lucide-react';
import { CelestialNode, CosmicLink } from '../../types/cosmos';
import { GlassPanel } from '../Common/GlassPanel';
import { CosmicSelect } from '../Common/CosmicSelect';
import { soundEngine } from '../../engine/SoundEngine';

interface ThoughtInspectorProps {
  node: CelestialNode;
  allNodes: CelestialNode[];
  links: CosmicLink[];
  onClose: () => void;
  onUpdateNode: (updated: CelestialNode) => void;
  onDeleteNode: (id: string) => void;
  onSendToCollider: (node: CelestialNode) => void;
  onSacrificeToSingularity: (node: CelestialNode) => void;
  onCreateLink: (sourceId: string, targetId: string) => void;
  onDeleteLink: (linkId: string) => void;
}

export const ThoughtInspector: React.FC<ThoughtInspectorProps> = ({
  node,
  allNodes,
  links,
  onClose,
  onUpdateNode,
  onDeleteNode,
  onSendToCollider,
  onSacrificeToSingularity,
  onCreateLink,
  onDeleteLink,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(node.title);
  const [content, setContent] = useState(node.content);
  const [targetLinkId, setTargetLinkId] = useState<string>('');

  // Node's existing connections
  const connectedLinks = links.filter(l => l.sourceId === node.id || l.targetId === node.id);

  const handleSave = () => {
    onUpdateNode({
      ...node,
      title,
      content,
      updatedAt: Date.now(),
    });
    setIsEditing(false);
  };

  const handleMassChange = (newMass: number) => {
    onUpdateNode({
      ...node,
      mass: newMass,
      radius: Math.max(12, Math.min(50, Math.round(newMass * 0.22 + 6))),
      updatedAt: Date.now(),
    });
  };

  const handleFreqChange = (newFreq: number) => {
    onUpdateNode({
      ...node,
      frequency: newFreq,
      updatedAt: Date.now(),
    });
    soundEngine.playNodeResonance(newFreq, node.type);
  };

  const handleTogglePin = () => {
    onUpdateNode({
      ...node,
      isPinned: !node.isPinned,
      vx: 0,
      vy: 0,
    });
  };

  const handleAddLink = () => {
    if (targetLinkId && targetLinkId !== node.id) {
      onCreateLink(node.id, targetLinkId);
      setTargetLinkId('');
    }
  };

  return (
    <div className="fixed sm:absolute top-16 sm:top-20 right-3 sm:right-6 left-3 sm:left-auto sm:w-96 max-h-[80vh] sm:max-h-[85vh] z-40 flex flex-col pointer-events-auto animate-fadeIn">
      <GlassPanel
        title="INSPEKTOR SIMPUL KOSMIK"
        subtitle={`ID: ${node.id.substring(0, 12)}`}
        onClose={onClose}
        variant={node.type === 'star' ? 'amber' : node.type === 'pulsar' ? 'rose' : 'cyan'}
        className="overflow-y-auto"
      >
        <div className="space-y-4">
          {/* Header Info */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span
                className="w-3.5 h-3.5 rounded-full shadow-lg"
                style={{ backgroundColor: node.color, boxShadow: `0 0 12px ${node.glowColor}` }}
              />
              <span className="font-mono text-xs font-bold uppercase tracking-wider text-slate-200">
                {node.type}
              </span>
            </div>

            <button
              onClick={() => soundEngine.playNodeResonance(node.frequency, node.type)}
              className="flex items-center space-x-1 px-2.5 py-1 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-xs font-mono transition-colors"
              title="Dengarkan Frekuensi Harmonik"
            >
              <Volume2 size={13} />
              <span>{node.frequency} Hz</span>
            </button>
          </div>

          {/* Title & Content */}
          {isEditing ? (
            <div className="space-y-2">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-900/80 border border-cyan-500/40 rounded-lg px-3 py-2 text-sm text-white font-semibold focus:outline-none"
              />
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={4}
                className="w-full bg-slate-900/80 border border-cyan-500/40 rounded-lg p-3 text-xs text-slate-200 focus:outline-none resize-none"
              />
              <div className="flex justify-end space-x-2">
                <button
                  onClick={() => setIsEditing(false)}
                  className="px-3 py-1 rounded bg-slate-800 text-xs text-slate-400 hover:text-white font-mono"
                >
                  Batal
                </button>
                <button
                  onClick={handleSave}
                  className="px-3 py-1 rounded bg-cyan-600 hover:bg-cyan-500 text-xs text-white font-mono font-bold"
                >
                  Simpan Perubahan
                </button>
              </div>
            </div>
          ) : (
            <div className="group relative bg-slate-900/40 rounded-xl p-3 border border-slate-800/80 hover:border-slate-700 transition-all">
              <h4 className="font-bold text-base text-slate-100 leading-snug">{node.title}</h4>
              <p className="text-xs text-slate-300 mt-2 leading-relaxed whitespace-pre-wrap">{node.content}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="mt-2 text-[11px] font-mono text-cyan-400 hover:underline"
              >
                [ Edit Catatan ]
              </button>
            </div>
          )}

          {/* Sliders: Mass (Gravity) & Harmonic Pitch */}
          <div className="space-y-3 bg-slate-950/40 p-3 rounded-xl border border-slate-800/60 font-mono text-xs">
            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Massa Gravitasi:</span>
                <span className="text-cyan-400 font-bold">{node.mass} M☉</span>
              </div>
              <input
                type="range"
                min="10"
                max="250"
                value={node.mass}
                onChange={(e) => handleMassChange(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Frekuensi Audio:</span>
                <span className="text-purple-400 font-bold">{node.frequency} Hz</span>
              </div>
              <input
                type="range"
                min="100"
                max="963"
                value={node.frequency}
                onChange={(e) => handleFreqChange(Number(e.target.value))}
                className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer"
              />
            </div>

            <div>
              <div className="flex justify-between text-slate-300 mb-1">
                <span>Entropi Kognitif:</span>
                <span className={`font-bold ${node.entropy > 50 ? 'text-rose-400' : 'text-emerald-400'}`}>
                  {node.entropy}%
                </span>
              </div>
              <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
                <div
                  className={`h-full transition-all ${node.entropy > 50 ? 'bg-rose-500' : 'bg-emerald-500'}`}
                  style={{ width: `${node.entropy}%` }}
                />
              </div>
            </div>
          </div>

          {/* Tags */}
          {node.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 items-center">
              <Tag size={12} className="text-slate-400 mr-1" />
              {node.tags.map(t => (
                <span key={t} className="text-[10px] font-mono px-2 py-0.5 rounded-md bg-slate-800 text-slate-300 border border-slate-700">
                  #{t}
                </span>
              ))}
            </div>
          )}

          {/* Connected Cosmic Links */}
          <div className="space-y-2 border-t border-slate-800/80 pt-3">
            <div className="flex items-center justify-between text-xs font-mono text-slate-400">
              <span className="flex items-center space-x-1">
                <LinkIcon size={12} />
                <span>Koneksi Entanglement ({connectedLinks.length})</span>
              </span>
            </div>

            {connectedLinks.length > 0 && (
              <div className="max-h-24 overflow-y-auto space-y-1">
                {connectedLinks.map(link => {
                  const otherNodeId = link.sourceId === node.id ? link.targetId : link.sourceId;
                  const otherNode = allNodes.find(n => n.id === otherNodeId);
                  return (
                    <div key={link.id} className="flex items-center justify-between text-[11px] font-mono bg-slate-900/60 px-2 py-1 rounded border border-slate-800">
                      <span className="text-slate-300 truncate max-w-[190px]">
                        ↔ {otherNode ? otherNode.title : otherNodeId}
                      </span>
                      <button
                        onClick={() => onDeleteLink(link.id)}
                        className="text-slate-500 hover:text-rose-400 ml-1"
                        title="Putuskan Relasi"
                      >
                        ✕
                      </button>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Quick Add Link dropdown */}
            <div className="flex space-x-1.5 mt-1.5 items-center">
              <div className="flex-1">
                <CosmicSelect
                  options={allNodes
                    .filter(n => n.id !== node.id && !connectedLinks.some(l => l.sourceId === n.id || l.targetId === n.id))
                    .map(n => ({
                      value: n.id,
                      label: n.title,
                      color: n.color,
                    }))}
                  value={targetLinkId}
                  onChange={setTargetLinkId}
                  placeholder="Pilih simpul untuk dikaitkan..."
                  variant="cyan"
                />
              </div>
              <button
                onClick={handleAddLink}
                disabled={!targetLinkId}
                className="px-3 py-2 bg-cyan-600/30 hover:bg-cyan-600/60 text-cyan-300 border border-cyan-500/40 rounded-lg text-xs font-mono font-bold disabled:opacity-40 transition-all shrink-0"
              >
                Kaitkan
              </button>
            </div>
          </div>

          {/* Primary Action Buttons */}
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800/80">
            <button
              onClick={() => onSendToCollider(node)}
              className="px-3 py-2 rounded-xl bg-purple-600/20 hover:bg-purple-600/40 text-purple-300 border border-purple-500/40 font-mono text-xs font-bold flex items-center justify-center space-x-1.5 transition-all shadow-[0_0_15px_-3px_rgba(168,85,247,0.3)]"
            >
              <Zap size={14} />
              <span>Akselerasikan</span>
            </button>

            <button
              onClick={() => onSacrificeToSingularity(node)}
              className="px-3 py-2 rounded-xl bg-rose-600/20 hover:bg-rose-600/40 text-rose-300 border border-rose-500/40 font-mono text-xs font-bold flex items-center justify-center space-x-1.5 transition-all shadow-[0_0_15px_-3px_rgba(244,63,94,0.3)]"
            >
              <CircleDot size={14} />
              <span>Singularitas</span>
            </button>
          </div>

          {/* Secondary Utilities: Pin & Delete */}
          <div className="flex items-center justify-between pt-2 text-xs font-mono text-slate-400">
            <button
              onClick={handleTogglePin}
              className={`flex items-center space-x-1.5 px-2.5 py-1.5 rounded-lg border transition-all ${
                node.isPinned
                  ? 'border-amber-500/50 text-amber-300 bg-amber-500/10'
                  : 'border-slate-800 hover:border-slate-700 text-slate-400'
              }`}
            >
              <Anchor size={13} />
              <span>{node.isPinned ? 'Terpancang di Spacetime' : 'Pancangkan Posisi'}</span>
            </button>

            <button
              onClick={() => onDeleteNode(node.id)}
              className="flex items-center space-x-1 px-2.5 py-1.5 rounded-lg text-rose-400 hover:bg-rose-500/10 border border-transparent hover:border-rose-500/30 transition-all"
              title="Hapus Simpul dari Semesta"
            >
              <Trash2 size={13} />
              <span>Hapus</span>
            </button>
          </div>
        </div>
      </GlassPanel>
    </div>
  );
};
