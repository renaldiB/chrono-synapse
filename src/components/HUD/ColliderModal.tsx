import React, { useState, useEffect } from 'react';
import { Zap, Sparkles, Plus, RefreshCw, Compass, Lightbulb, Quote, ChevronRight } from 'lucide-react';
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
}

export const ColliderModal: React.FC<ColliderModalProps> = ({
  nodes,
  initialNodeA,
  initialNodeB,
  onClose,
  onManifestSynthesis,
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
        // Collision Impact!
        soundEngine.playColliderImpact();

        // Confetti cosmic particle burst
        try {
          confetti({
            particleCount: 80,
            spread: 100,
            origin: { y: 0.5 },
            colors: ['#38bdf8', '#c084fc', '#f43f5e', '#fbbf24', '#ffffff'],
          });
        } catch (_) {}

        const result = collideThoughts(nodeA, nodeB);
        setCurrentSynthesis(result);
        setIsAccelerating(false);
      }
    }, 40);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 animate-fadeIn">
      <div className="w-full max-w-2xl max-h-[90vh] flex flex-col">
        <GlassPanel
          title="THE THOUGHT COLLIDER // PARTICLE ACCELERATOR FOR IDEAS"
          subtitle="Tabrakkan dua pemikiran atau paradoks dengan kecepatan relativistik untuk memicu sintesis dialektika hegelian baru."
          icon={<Zap size={20} />}
          onClose={onClose}
          variant="purple"
          className="overflow-y-auto"
        >
          {/* Accelerator Chamber Selection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-2">
            {/* Thought Chamber A */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-purple-500/30 relative">
              <span className="text-[10px] font-mono text-purple-400 font-bold uppercase tracking-wider block mb-2">
                Partikel Ide Alpha
              </span>
              <CosmicSelect
                options={nodes.filter(n => n.id !== selectedIdB).map(n => ({
                  value: n.id,
                  label: `${n.title} (${n.type.toUpperCase()})`,
                  color: n.color,
                }))}
                value={selectedIdA}
                onChange={(val) => {
                  setSelectedIdA(val);
                  setCurrentSynthesis(null);
                }}
                variant="purple"
              />

              {nodeA && (
                <div className="mt-3 text-xs text-slate-300 font-mono space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Massa Relativistik:</span>
                    <span className="text-purple-300 font-bold">{nodeA.mass} M☉</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Frekuensi:</span>
                    <span className="text-purple-300 font-bold">{nodeA.frequency} Hz</span>
                  </div>
                </div>
              )}
            </div>

            {/* Thought Chamber B */}
            <div className="bg-slate-950/60 p-4 rounded-xl border border-cyan-500/30 relative">
              <span className="text-[10px] font-mono text-cyan-400 font-bold uppercase tracking-wider block mb-2">
                Partikel Ide Beta
              </span>
              <CosmicSelect
                options={nodes.filter(n => n.id !== selectedIdA).map(n => ({
                  value: n.id,
                  label: `${n.title} (${n.type.toUpperCase()})`,
                  color: n.color,
                }))}
                value={selectedIdB}
                onChange={(val) => {
                  setSelectedIdB(val);
                  setCurrentSynthesis(null);
                }}
                variant="cyan"
              />

              {nodeB && (
                <div className="mt-3 text-xs text-slate-300 font-mono space-y-1">
                  <div className="flex justify-between">
                    <span className="text-slate-500">Massa Relativistik:</span>
                    <span className="text-cyan-300 font-bold">{nodeB.mass} M☉</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-500">Frekuensi:</span>
                    <span className="text-cyan-300 font-bold">{nodeB.frequency} Hz</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Collision Accelerator Animation / Progress */}
          {isAccelerating && (
            <div className="my-5 p-4 rounded-xl bg-slate-950/80 border border-purple-500/50 text-center font-mono">
              <div className="flex items-center justify-between text-xs text-purple-300 mb-2">
                <span className="animate-pulse">AKSELERASI PARTIKEL KOGNITIF: {accelerationProgress}% c</span>
                <span>STATUS: RELATIVISTIK TINGGI</span>
              </div>
              <div className="w-full bg-slate-900 h-3 rounded-full overflow-hidden p-0.5 border border-purple-500/40">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 via-cyan-400 to-rose-500 rounded-full transition-all duration-75"
                  style={{ width: `${accelerationProgress}%` }}
                />
              </div>
              <p className="text-[11px] text-slate-400 mt-2 italic">
                Mempersempit ruang hampa antara kedua konsep... Menyentuh horizon tabrakan...
              </p>
            </div>
          )}

          {/* Trigger Collision Button */}
          {!currentSynthesis && !isAccelerating && (
            <div className="mt-4 flex justify-center">
              <button
                onClick={handleStartCollision}
                disabled={!nodeA || !nodeB || nodeA.id === nodeB.id}
                className="w-full py-3.5 px-6 rounded-xl bg-gradient-to-r from-purple-600 via-indigo-600 to-cyan-500 hover:from-purple-500 hover:to-cyan-400 text-white font-mono font-bold text-sm tracking-wider shadow-[0_0_30px_rgba(168,85,247,0.5)] disabled:opacity-40 transition-all flex items-center justify-center space-x-2 active:scale-98"
              >
                <Zap size={18} className="animate-pulse" />
                <span>PICU TABRAKAN DIALEKTIKA (COLLIDE)</span>
              </button>
            </div>
          )}

          {/* Synthesized Output Result */}
          {currentSynthesis && (
            <div className="mt-5 space-y-4 bg-slate-950/80 p-5 rounded-2xl border border-purple-400/50 shadow-[0_0_30px_rgba(168,85,247,0.3)] animate-scaleIn">
              <div className="flex items-center justify-between border-b border-purple-500/30 pb-3">
                <div className="flex items-center space-x-2">
                  <Sparkles size={18} className="text-purple-400" />
                  <span className="font-mono text-xs font-bold uppercase text-purple-300 tracking-wider">
                    HASIL SINTESIS EMERGENSI
                  </span>
                </div>
                <span className="font-mono text-xs text-cyan-400">
                  Resonansi: {currentSynthesis.resonanceFrequency} Hz
                </span>
              </div>

              <div>
                <h4 className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-cyan-200 to-amber-200">
                  {currentSynthesis.synthesisTitle}
                </h4>
                <p className="text-xs text-slate-300 mt-1 leading-relaxed">
                  {currentSynthesis.coreSynthesis}
                </p>
              </div>

              {/* Dialectical Resolution */}
              <div className="bg-purple-950/20 p-3 rounded-xl border border-purple-500/30 space-y-1">
                <span className="text-[10px] font-mono text-purple-300 font-bold uppercase flex items-center space-x-1">
                  <Compass size={12} className="mr-1" />
                  Resolusi Paradoks (Meta-Kebenaran)
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {currentSynthesis.dialecticalResolution}
                </p>
              </div>

              {/* Practical Action */}
              <div className="bg-cyan-950/20 p-3 rounded-xl border border-cyan-500/30 space-y-1">
                <span className="text-[10px] font-mono text-cyan-300 font-bold uppercase flex items-center space-x-1">
                  <Lightbulb size={12} className="mr-1" />
                  Langkah Aksi Kuantum (Eksperimen Nyata)
                </span>
                <p className="text-xs text-slate-200 leading-relaxed">
                  {currentSynthesis.quantumActionStep}
                </p>
              </div>

              {/* Quote */}
              <div className="italic text-xs text-slate-400 flex items-start space-x-2 pl-2 border-l-2 border-amber-400/60">
                <Quote size={14} className="text-amber-400 shrink-0 mt-0.5" />
                <p>{currentSynthesis.paradoxQuote}</p>
              </div>

              {/* Action: Manifest in Universe */}
              <div className="pt-2 flex items-center space-x-3">
                <button
                  onClick={() => {
                    onManifestSynthesis(currentSynthesis);
                    onClose();
                  }}
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white font-mono font-bold text-xs tracking-wider shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all flex items-center justify-center space-x-2"
                >
                  <Plus size={16} />
                  <span>MANIFESTASIKAN SEBAGAI BINTANG BARU DI SEMESTA</span>
                </button>

                <button
                  onClick={handleStartCollision}
                  className="p-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-all"
                  title="Tabrakkan Ulang"
                >
                  <RefreshCw size={16} />
                </button>
              </div>
            </div>
          )}
        </GlassPanel>
      </div>
    </div>
  );
};
