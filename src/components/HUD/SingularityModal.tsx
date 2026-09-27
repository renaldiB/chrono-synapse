import React, { useState } from 'react';
import { CircleDot, Sparkles, Check, Flame, History, Award } from 'lucide-react';
import { CelestialNode, SingularityPurification } from '../../types/cosmos';
import { GlassPanel } from '../Common/GlassPanel';
import { purifyThoughtInSingularity } from '../../engine/DialecticCollider';
import { soundEngine } from '../../engine/SoundEngine';

import { CosmicSelect } from '../Common/CosmicSelect';

interface SingularityModalProps {
  nodes: CelestialNode[];
  initialNode?: CelestialNode | null;
  purifications: SingularityPurification[];
  onClose: () => void;
  onPurifyNode: (nodeId: string, purification: SingularityPurification) => void;
}

export const SingularityModal: React.FC<SingularityModalProps> = ({
  nodes,
  initialNode,
  purifications,
  onClose,
  onPurifyNode,
}) => {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(initialNode?.id || (nodes[0]?.id ?? ''));
  const [isSacrificing, setIsSacrificing] = useState(false);
  const [latestPurification, setLatestPurification] = useState<SingularityPurification | null>(null);

  const targetNode = nodes.find(n => n.id === selectedNodeId);

  const handleSacrifice = () => {
    if (!targetNode || isSacrificing) return;

    setIsSacrificing(true);
    soundEngine.playSingularitySacrifice();

    const { wisdom, stardust } = purifyThoughtInSingularity(targetNode);

    setTimeout(() => {
      const purification: SingularityPurification = {
        id: `purify-${Date.now()}`,
        originalTitle: targetNode.title,
        purifiedWisdom: wisdom,
        stardustCount: stardust,
        timestamp: Date.now(),
      };

      setLatestPurification(purification);
      onPurifyNode(targetNode.id, purification);
      setIsSacrificing(false);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 animate-fadeIn">
      <div className="w-full max-w-xl max-h-[90vh] flex flex-col">
        <GlassPanel
          title="SINGULARITY HORIZON // PURIFIKASI BEBAN KOGNITIF"
          subtitle="Lepaskan overthinking, rasa cemas, atau beban mental ke pusat lubang hitam untuk ditransformasikan menjadi energi stardust murni."
          icon={<CircleDot size={20} />}
          onClose={onClose}
          variant="rose"
          className="overflow-y-auto"
        >
          {/* Active Ritual / Form */}
          {!latestPurification ? (
            <div className="space-y-4">
              <div className="bg-slate-950/70 p-4 rounded-xl border border-rose-500/30">
                <label className="text-[11px] font-mono text-rose-300 font-bold uppercase tracking-wider block mb-2">
                  Pilih Pikiran yang Ingin Dilepaskan:
                </label>
                <CosmicSelect
                  options={nodes.map(n => ({
                    value: n.id,
                    label: `${n.title} (Massa: ${n.mass} M☉)`,
                    color: n.color,
                  }))}
                  value={selectedNodeId}
                  onChange={setSelectedNodeId}
                  variant="rose"
                />

                {targetNode && (
                  <div className="mt-3 p-3 bg-slate-900/50 rounded-lg border border-slate-800 text-xs text-slate-300">
                    <p className="font-semibold text-rose-300">{targetNode.title}</p>
                    <p className="text-[11px] text-slate-400 mt-1 italic line-clamp-2">{targetNode.content}</p>
                  </div>
                )}
              </div>

              {/* Event Horizon Vortex Visual */}
              <div className="relative py-8 flex flex-col items-center justify-center">
                <div className={`w-32 h-32 rounded-full border-4 border-rose-500/40 bg-black flex items-center justify-center relative ${isSacrificing ? 'animate-spin' : ''}`}>
                  <div className="absolute inset-0 rounded-full bg-rose-600/20 blur-xl animate-pulse"></div>
                  <div className="w-16 h-16 rounded-full bg-black border-2 border-white/60 shadow-[0_0_30px_rgba(244,63,94,0.8)] flex items-center justify-center">
                    <Flame size={20} className="text-rose-400 animate-bounce" />
                  </div>
                </div>
                <span className="text-[11px] font-mono text-slate-400 mt-3">
                  {isSacrificing ? 'Spaghettification & Transmutasi Relativistik...' : 'Gravitasi Singularitas: 100% Siap'}
                </span>
              </div>

              {/* Confirm Sacrifice Button */}
              <button
                onClick={handleSacrifice}
                disabled={!targetNode || isSacrificing}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-rose-600 to-amber-600 hover:from-rose-500 hover:to-amber-500 text-white font-mono font-bold text-sm tracking-wider shadow-[0_0_25px_rgba(244,63,94,0.4)] disabled:opacity-40 transition-all flex items-center justify-center space-x-2"
              >
                <Flame size={18} />
                <span>LEPASKAN KE DALAM HORIZON PERISTIWA</span>
              </button>
            </div>
          ) : (
            /* Purification Success Result */
            <div className="space-y-4 bg-slate-950/80 p-5 rounded-2xl border border-amber-500/40 animate-scaleIn text-center">
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-500/20 text-amber-400 flex items-center justify-center border border-amber-500/40 shadow-[0_0_20px_rgba(245,158,11,0.5)]">
                <Sparkles size={24} />
              </div>

              <h4 className="text-lg font-bold text-slate-100 font-mono">
                KATARSIS SELESAI
              </h4>

              <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto italic">
                "{latestPurification.purifiedWisdom}"
              </p>

              <div className="inline-flex items-center space-x-2 bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/30">
                <Award size={16} className="text-amber-400" />
                <span className="font-mono text-xs text-amber-300 font-bold">
                  +{latestPurification.stardustCount} STARDUST DIPEROLEH
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setLatestPurification(null);
                    onClose();
                  }}
                  className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-mono text-xs font-bold transition-colors"
                >
                  Kembali ke Semesta
                </button>
              </div>
            </div>
          )}

          {/* Purifications History */}
          {purifications.length > 0 && (
            <div className="mt-5 pt-4 border-t border-slate-800">
              <div className="flex items-center space-x-1.5 text-xs font-mono text-slate-400 mb-2.5">
                <History size={13} />
                <span>Arsip Katarsis Semesta ({purifications.length})</span>
              </div>
              <div className="max-h-32 overflow-y-auto space-y-1.5">
                {purifications.slice(-5).reverse().map(p => (
                  <div key={p.id} className="bg-slate-900/60 p-2.5 rounded-lg border border-slate-800 text-xs">
                    <div className="flex justify-between font-mono text-[10px] text-slate-400">
                      <span className="text-rose-400 font-semibold">{p.originalTitle}</span>
                      <span className="text-amber-400">+{p.stardustCount} ✧</span>
                    </div>
                    <p className="text-[11px] text-slate-300 mt-1 line-clamp-2 italic">
                      "{p.purifiedWisdom}"
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </GlassPanel>
      </div>
    </div>
  );
};
