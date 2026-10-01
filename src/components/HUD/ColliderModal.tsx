import React, { useState } from 'react';
import { Zap, Sparkles, Plus, RefreshCw, Compass, Lightbulb, Quote } from 'lucide-react';
import { CelestialNode, CollisionSynthesis } from '../../types/cosmos';
import { GlassPanel } from '../Common/GlassPanel';
import { collideThoughts } from '../../engine/DialecticCollider';
import { soundEngine } from '../../engine/SoundEngine';
import confetti from 'canvas-confetti';
import { CosmicSelect } from '../Common/CosmicSelect';

interface ColliderModalProps {
  nodes: CelestialNode[];
  initialNodeA?: CelestialNode | null;
  initialNodeB?: CelestialNode | null;
  onClose: () => void;
  onManifestSynthesis: (synthesis: CollisionSynthesis) => void;
  onOpenCreateNode?: () => void;
}

export const ColliderModal: React.FC<ColliderModalProps> = ({
  nodes,
  initialNodeA,
  initialNodeB,
  onClose,
  onManifestSynthesis,
  onOpenCreateNode,
}) => {
  const [selectedIdA, setSelectedIdA] = useState<string>(initialNodeA?.id || (nodes[0]?.id ?? ''));
  const [selectedIdB, setSelectedIdB] = useState<string>(
    initialNodeB?.id || (nodes[1]?.id !== nodes[0]?.id ? nodes[1]?.id ?? '' : '')
  );

  const [isAccelerating, setIsAccelerating] = useState(false);
  const [accelerationProgress, setAccelerationProgress] = useState(0);
  const [currentSynthesis, setCurrentSynthesis] = useState<CollisionSynthesis | null>(null);

  const nodeA = nodes.find(n => n.id === selectedIdA);
  const nodeB = nodes.find(n => n.id === selectedIdB);

  const handleStartCollision = () => {
    if (!nodeA || !nodeB || nodeA.id === nodeB.id || isAccelerating) return;

    setIsAccelerating(true);
    setAccelerationProgress(0);
    setCurrentSynthesis(null);

    // Play rising acoustic particle sweep
    soundEngine.playColliderCharge(2200);

    const startTime = Date.now();
    const duration = 2200;

    const interval = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(100, Math.round((elapsed / duration) * 100));
      setAccelerationProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        // Collision Impact
        soundEngine.playColliderImpact();

        try {
          confetti({
            particleCount: 70,
            spread: 90,
            origin: { y: 0.5 },
            colors: ['#0284c7', '#38bdf8', '#f8fafc', '#94a3b8'],
          });
        } catch (_) {}

        const result = collideThoughts(nodeA, nodeB);
        setCurrentSynthesis(result);
        setIsAccelerating(false);
      }
    }, 40);
  };

  const hasEnoughNodes = nodes.length >= 2;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-fadeIn">
      <div className="w-full max-w-2xl max-h-[90vh] flex flex-col">
        <GlassPanel
          title="Thought Collider"
          subtitle="Tabrakkan dua pemikiran atau paradoks untuk melahirkan sintesis dialektika baru."
          icon={<Zap size={18} strokeWidth={2} />}
          onClose={onClose}
          className="overflow-y-auto"
        >
          {/* Informative Empty State when less than 2 nodes exist */}
          {!hasEnoughNodes ? (
            <div className="py-10 px-4 text-center space-y-4">
              <div className="w-12 h-12 rounded-xl bg-slate-800/80 border border-slate-700/80 flex items-center justify-center text-slate-400 mx-auto">
                <Zap size={22} strokeWidth={2} />
              </div>
              <div className="max-w-md mx-auto">
                <h4 className="text-sm font-semibold text-slate-200">
                  Dibutuhkan Minimal 2 Simpul Pemikiran
                </h4>
                <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                  Thought Collider memerlukan dua konsep untuk diakselerasikan menjadi sintesis baru. Tambahkan setidaknya dua simpul ide di semesta Anda terlebih dahulu.
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
          ) : (
            <>
              {/* Accelerator Chamber Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5 my-2">
                {/* Thought Chamber A */}
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 relative">
                  <span className="text-[11px] text-slate-400 font-medium block mb-2">
                    Partikel Ide Alpha
                  </span>
                  <CosmicSelect
                    options={nodes.filter(n => n.id !== selectedIdB).map(n => ({
                      value: n.id,
                      label: `${n.title} (${n.type})`,
                      color: n.color,
                    }))}
                    value={selectedIdA}
                    onChange={(val) => {
                      setSelectedIdA(val);
                      setCurrentSynthesis(null);
                    }}
                  />

                  {nodeA && (
                    <div className="mt-3 text-xs text-slate-400 font-mono space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-normal">Massa:</span>
                        <span className="text-slate-300 font-medium">{nodeA.mass} M☉</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-normal">Frekuensi:</span>
                        <span className="text-slate-300 font-medium">{nodeA.frequency} Hz</span>
                      </div>
                    </div>
                  )}
                </div>

                {/* Thought Chamber B */}
                <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 relative">
                  <span className="text-[11px] text-slate-400 font-medium block mb-2">
                    Partikel Ide Beta
                  </span>
                  <CosmicSelect
                    options={nodes.filter(n => n.id !== selectedIdA).map(n => ({
                      value: n.id,
                      label: `${n.title} (${n.type})`,
                      color: n.color,
                    }))}
                    value={selectedIdB}
                    onChange={(val) => {
                      setSelectedIdB(val);
                      setCurrentSynthesis(null);
                    }}
                  />

                  {nodeB && (
                    <div className="mt-3 text-xs text-slate-400 font-mono space-y-1">
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-normal">Massa:</span>
                        <span className="text-slate-300 font-medium">{nodeB.mass} M☉</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-500 font-normal">Frekuensi:</span>
                        <span className="text-slate-300 font-medium">{nodeB.frequency} Hz</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Collision Accelerator Animation / Progress */}
              {isAccelerating && (
                <div className="my-4 p-4 rounded-xl bg-slate-900/90 border border-slate-800 text-center font-mono">
                  <div className="flex items-center justify-between text-xs text-slate-300 mb-2">
                    <span className="font-medium text-sky-400">Akselerasi Partikel: {accelerationProgress}%</span>
                    <span className="text-slate-500 font-normal">Status: Sinkronisasi Relativistik</span>
                  </div>
                  <div className="w-full bg-slate-950 h-2.5 rounded-full overflow-hidden p-0.5 border border-slate-800">
                    <div
                      className="h-full bg-sky-500 rounded-full transition-all duration-75"
                      style={{ width: `${accelerationProgress}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-slate-400 mt-2 font-sans">
                    Mempersempit ruang hampa antara kedua konsep pemikiran...
                  </p>
                </div>
              )}

              {/* Trigger Collision Button */}
              {!currentSynthesis && !isAccelerating && (
                <div className="mt-4 flex justify-center">
                  <button
                    onClick={handleStartCollision}
                    disabled={!nodeA || !nodeB || nodeA.id === nodeB.id}
                    className="w-full py-3 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 disabled:bg-slate-800 disabled:text-slate-500 text-white font-medium text-xs flex items-center justify-center space-x-2 transition-all duration-150 active:scale-[0.98]"
                  >
                    <Zap size={16} strokeWidth={2} />
                    <span>Picu Tabrakan Dialektika</span>
                  </button>
                </div>
              )}

              {/* Synthesized Output Result */}
              {currentSynthesis && (
                <div className="mt-4 space-y-3.5 bg-slate-900/90 p-4 rounded-xl border border-slate-800 shadow-lg animate-fadeIn">
                  <div className="flex items-center justify-between border-b border-slate-800 pb-2.5">
                    <div className="flex items-center space-x-2">
                      <Sparkles size={16} strokeWidth={2} className="text-sky-400" />
                      <span className="text-xs font-semibold text-slate-200">
                        Hasil Sintesis Emergensi
                      </span>
                    </div>
                    <span className="font-mono text-[11px] text-slate-500">
                      Resonansi: {currentSynthesis.resonanceFrequency} Hz
                    </span>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold text-slate-100">
                      {currentSynthesis.synthesisTitle}
                    </h4>
                    <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                      {currentSynthesis.coreSynthesis}
                    </p>
                  </div>

                  {/* Dialectical Resolution */}
                  <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800/80 space-y-1">
                    <span className="text-[11px] text-slate-400 font-medium flex items-center space-x-1.5">
                      <Compass size={13} strokeWidth={2} className="text-sky-400" />
                      <span>Resolusi Paradoks</span>
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {currentSynthesis.dialecticalResolution}
                    </p>
                  </div>

                  {/* Practical Action */}
                  <div className="bg-slate-950/80 p-3 rounded-lg border border-slate-800/80 space-y-1">
                    <span className="text-[11px] text-slate-400 font-medium flex items-center space-x-1.5">
                      <Lightbulb size={13} strokeWidth={2} className="text-amber-400" />
                      <span>Langkah Aksi Nyata</span>
                    </span>
                    <p className="text-xs text-slate-300 leading-relaxed font-normal">
                      {currentSynthesis.quantumActionStep}
                    </p>
                  </div>

                  {/* Quote */}
                  <div className="text-xs text-slate-400 flex items-start space-x-2 pl-2 border-l-2 border-slate-700 italic">
                    <Quote size={13} strokeWidth={2} className="text-slate-500 shrink-0 mt-0.5" />
                    <p>{currentSynthesis.paradoxQuote}</p>
                  </div>

                  {/* Action: Manifest in Universe */}
                  <div className="pt-2 flex items-center space-x-2">
                    <button
                      onClick={() => {
                        onManifestSynthesis(currentSynthesis);
                        onClose();
                      }}
                      className="flex-1 py-2.5 px-4 rounded-xl bg-sky-500 hover:bg-sky-400 text-white font-medium text-xs flex items-center justify-center space-x-1.5 transition-all duration-150 active:scale-[0.98]"
                    >
                      <Plus size={15} strokeWidth={2} />
                      <span>Manifestasikan sebagai Bintang Baru</span>
                    </button>

                    <button
                      onClick={handleStartCollision}
                      className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700/80 transition-all duration-150 active:scale-[0.98]"
                      title="Tabrakkan Ulang"
                    >
                      <RefreshCw size={15} strokeWidth={2} />
                    </button>
                  </div>
                </div>
              )}
            </>
          )}
        </GlassPanel>
      </div>
    </div>
  );
};
