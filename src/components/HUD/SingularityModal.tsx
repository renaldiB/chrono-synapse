import React, { useState } from 'react';
import { CircleDot, Sparkles, Flame, History, Award, Plus } from 'lucide-react';
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
  onOpenCreateNode?: () => void;
}

export const SingularityModal: React.FC<SingularityModalProps> = ({
  nodes,
  initialNode,
  purifications,
  onClose,
  onPurifyNode,
  onOpenCreateNode,
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

  const hasNodes = nodes.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-fadeIn">
      <div className="w-full max-w-xl max-h-[90vh] flex flex-col">
        <GlassPanel
          title="Horizon Singularitas"
          subtitle="Lepaskan beban kognitif atau bias pikiran ke gravitasi singularitas untuk ditransformasikan menjadi energi stardust murni."
          icon={<CircleDot size={18} strokeWidth={2} />}
          onClose={onClose}
          variant="rose"
          className="overflow-y-auto"
        >
          {/* Informative Empty State */}
          {!hasNodes ? (
            <div className="py-10 px-4 text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-slate-400 mx-auto">
                <CircleDot size={22} strokeWidth={2} />
              </div>
              <div className="max-w-md mx-auto">
                <h4 className="text-sm font-semibold text-slate-200">
                  Tidak Ada Simpul untuk Dipurifikasi
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Semesta saat ini kosong bersih. Singularitas siap menerima pemikiran apa pun yang ingin Anda transformasikan begitu Anda membuat simpul baru.
                </p>
              </div>
              {onOpenCreateNode && (
                <button
                  onClick={() => {
                    onClose();
                    onOpenCreateNode();
                  }}
                  className="px-4 py-2.5 rounded-xl bg-sky-500 hover:bg-sky-400 text-white text-xs font-medium inline-flex items-center space-x-2 transition-all duration-150 active:scale-[0.98]"
                >
                  <Plus size={14} strokeWidth={2} />
                  <span>Buat Simpul Pemikiran Baru</span>
                </button>
              )}
            </div>
          ) : !latestPurification ? (
            /* Active Ritual / Form */
            <div className="space-y-4">
              <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800">
                <label className="text-xs text-slate-300 font-medium block mb-2">
                  Pilih Pemikiran yang Ingin Dilepaskan:
                </label>
                <CosmicSelect
                  options={nodes.map(n => ({
                    value: n.id,
                    label: `${n.title} (Massa: ${n.mass} M☉)`,
                    color: n.color,
                  }))}
                  value={selectedNodeId}
                  onChange={setSelectedNodeId}
                />

                {targetNode && (
                  <div className="mt-3 p-3 bg-slate-950/80 rounded-lg border border-slate-800 text-xs text-slate-300">
                    <p className="font-medium text-slate-200">{targetNode.title}</p>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                      {targetNode.content}
                    </p>
                  </div>
                )}
              </div>

              {/* Event Horizon Vortex Visual */}
              <div className="relative py-6 flex flex-col items-center justify-center">
                <div className={`w-28 h-28 rounded-full border-2 border-slate-700 bg-slate-950 flex items-center justify-center relative ${isSacrificing ? 'animate-spin' : ''}`}>
                  <div className="w-14 h-14 rounded-full bg-slate-900 border border-slate-700 flex items-center justify-center">
                    <Flame size={18} strokeWidth={2} className="text-rose-400" />
                  </div>
                </div>
                <span className="text-xs text-slate-400 mt-3 font-normal">
                  {isSacrificing ? 'Mendekomposisi struktur kognitif...' : 'Gravitasi Singularitas Siap'}
                </span>
              </div>

              {/* Confirm Sacrifice Button */}
              <button
                onClick={handleSacrifice}
                disabled={!targetNode || isSacrificing}
                className="w-full py-3 px-4 rounded-xl bg-rose-600 hover:bg-rose-500 disabled:bg-slate-800 disabled:text-slate-500 text-white font-medium text-xs flex items-center justify-center space-x-2 transition-all duration-150 active:scale-[0.98]"
              >
                <Flame size={16} strokeWidth={2} />
                <span>Lepaskan ke Horizon Peristiwa</span>
              </button>
            </div>
          ) : (
            /* Purification Success Result */
            <div className="space-y-4 bg-slate-900/90 p-5 rounded-xl border border-slate-800 text-center animate-fadeIn">
              <div className="w-12 h-12 mx-auto rounded-xl bg-amber-500/10 text-amber-400 flex items-center justify-center border border-amber-500/20">
                <Sparkles size={20} strokeWidth={2} />
              </div>

              <div>
                <h4 className="text-sm font-semibold text-slate-100">
                  Katarsis Selesai
                </h4>
                <p className="text-xs text-slate-300 leading-relaxed max-w-md mx-auto mt-2 italic">
                  "{latestPurification.purifiedWisdom}"
                </p>
              </div>

              <div className="inline-flex items-center space-x-2 bg-slate-950 px-3.5 py-1.5 rounded-lg border border-slate-800">
                <Award size={15} strokeWidth={2} className="text-amber-400" />
                <span className="text-xs text-slate-200 font-medium">
                  +{latestPurification.stardustCount} Stardust Diperoleh
                </span>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setLatestPurification(null);
                    onClose();
                  }}
                  className="px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-medium transition-all duration-150 active:scale-[0.98]"
                >
                  Kembali ke Semesta
                </button>
              </div>
            </div>
          )}

          {/* Purifications History */}
          {purifications.length > 0 && (
            <div className="mt-4 pt-3.5 border-t border-slate-800">
              <div className="flex items-center space-x-1.5 text-xs text-slate-400 mb-2">
                <History size={13} strokeWidth={2} />
                <span>Arsip Katarsis Semesta ({purifications.length})</span>
              </div>
              <div className="max-h-32 overflow-y-auto space-y-1.5">
                {purifications.slice(-5).reverse().map((p, idx) => (
                  <div key={p.id} className={`bg-slate-950/80 p-2.5 rounded-lg border border-slate-800/80 text-xs stagger-${Math.min(5, idx + 1)}`}>
                    <div className="flex justify-between text-[11px] text-slate-400">
                      <span className="text-slate-200 font-medium">{p.originalTitle}</span>
                      <span className="text-amber-400 flex items-center gap-1 font-mono">
                        <Sparkles size={10} strokeWidth={2} /> +{p.stardustCount}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 italic leading-relaxed">
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
