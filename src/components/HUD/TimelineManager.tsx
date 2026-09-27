import React, { useState } from 'react';
import { GitFork, Plus, Check, ArrowRight, ShieldAlert, Sparkles, Activity } from 'lucide-react';
import { Timeline } from '../../types/cosmos';
import { GlassPanel } from '../Common/GlassPanel';
import { soundEngine } from '../../engine/SoundEngine';

interface TimelineManagerProps {
  timelines: Timeline[];
  activeTimelineId: string;
  onSelectTimeline: (id: string) => void;
  onCreateTimeline: (newTimeline: Timeline) => void;
  onClose: () => void;
}

export const TimelineManager: React.FC<TimelineManagerProps> = ({
  timelines,
  activeTimelineId,
  onSelectTimeline,
  onCreateTimeline,
  onClose,
}) => {
  const [isCreating, setIsCreating] = useState(false);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [divergence, setDivergence] = useState(0.5);
  const [color, setColor] = useState('#38bdf8');

  const handleSelect = (id: string) => {
    if (id !== activeTimelineId) {
      soundEngine.playTimelineShift();
      onSelectTimeline(id);
    }
  };

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;

    const newTimeline: Timeline = {
      id: `timeline-${Date.now()}`,
      name,
      description,
      parentTimelineId: activeTimelineId,
      divergenceFactor: divergence,
      color,
      createdAt: Date.now(),
    };

    onCreateTimeline(newTimeline);
    soundEngine.playTimelineShift();
    setIsCreating(false);
    setName('');
    setDescription('');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 animate-fadeIn">
      <div className="w-full max-w-2xl max-h-[90vh] flex flex-col">
        <GlassPanel
          title="MULTIVERSE CAUSALITY // PENGELOLA GARIS WAKTU PARALEL"
          subtitle="Simulasikan percabangan keputusan dan amati bagaimana efek kupu-kupu (butterfly effect) mendistorsi realitas pemikiranmu."
          icon={<GitFork size={20} />}
          onClose={onClose}
          variant="cyan"
          className="overflow-y-auto"
        >
          {/* Active Timeline Switcher Grid */}
          <div className="space-y-3 mb-5">
            <span className="text-xs font-mono text-cyan-400 font-bold uppercase tracking-wider block">
              Garis Waktu Terdeteksi di Multiverse:
            </span>

            <div className="grid grid-cols-1 gap-2.5">
              {timelines.map(t => {
                const isActive = t.id === activeTimelineId;
                return (
                  <div
                    key={t.id}
                    onClick={() => handleSelect(t.id)}
                    className={`p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between ${
                      isActive
                        ? 'bg-cyan-950/40 border-cyan-400 shadow-[0_0_20px_-3px_rgba(6,182,212,0.4)]'
                        : 'bg-slate-900/40 border-slate-800 hover:border-slate-700 hover:bg-slate-900/70'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className="w-3.5 h-3.5 rounded-full mt-1 shrink-0"
                        style={{ backgroundColor: t.color, boxShadow: `0 0 10px ${t.color}` }}
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-sm text-slate-100">{t.name}</h4>
                          {isActive && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                              AKTIF
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-400 mt-1 leading-relaxed">{t.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-[10px] font-mono text-slate-500">
                          <span>Faktor Divergensi: {(t.divergenceFactor * 100).toFixed(0)}%</span>
                          {t.parentTimelineId && <span>Bercabang dari: {t.parentTimelineId}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="pl-3">
                      {isActive ? (
                        <div className="w-8 h-8 rounded-full bg-cyan-500/20 text-cyan-400 flex items-center justify-center border border-cyan-500/40">
                          <Check size={16} />
                        </div>
                      ) : (
                        <span className="text-xs font-mono text-slate-500 hover:text-cyan-300 flex items-center space-x-1">
                          <span>Beralih</span>
                          <ArrowRight size={13} />
                        </span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Create Branch Timeline Form */}
          {isCreating ? (
            <form onSubmit={handleCreate} className="bg-slate-950/80 p-4 rounded-xl border border-cyan-500/40 space-y-3">
              <span className="text-xs font-mono text-cyan-300 font-bold uppercase tracking-wider block">
                Buat Percabangan Realitas Baru (Branch Reality)
              </span>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">Nama Garis Waktu:</label>
                <input
                  type="text"
                  placeholder="Misal: Timeline Delta (Eksperimen Nomad 100%)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-cyan-400"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">Deskripsi Paradigma / Kondisi Awal:</label>
                <textarea
                  placeholder="Apa keputusan kunci yang membedakan garis waktu ini dari garis waktu utama?"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                    <span>Divergensi Kausalitas:</span>
                    <span className="text-cyan-400 font-bold">{(divergence * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={divergence}
                    onChange={(e) => setDivergence(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">Warna Spektrum Kosmik:</label>
                  <div className="flex space-x-2">
                    {['#38bdf8', '#10b981', '#c084fc', '#f43f5e', '#fbbf24', '#06b6d4'].map(c => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setColor(c)}
                        className={`w-6 h-6 rounded-full transition-transform ${color === c ? 'scale-125 ring-2 ring-white' : 'opacity-70 hover:opacity-100'}`}
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setIsCreating(false)}
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-cyan-600 hover:bg-cyan-500 text-xs font-mono font-bold text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                >
                  Buka Cabang Realitas
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsCreating(true)}
              className="w-full py-3 rounded-xl border border-dashed border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-cyan-200 font-mono text-xs flex items-center justify-center space-x-2 transition-all hover:bg-cyan-500/5"
            >
              <Plus size={16} />
              <span>Bercabang ke Garis Waktu Baru (Branch Reality)</span>
            </button>
          )}
        </GlassPanel>
      </div>
    </div>
  );
};
