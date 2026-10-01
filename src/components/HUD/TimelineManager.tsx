import React, { useState } from 'react';
import { GitFork, Plus, Check, ArrowRight } from 'lucide-react';
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
          title="PENGELOLA GARIS WAKTU PARALEL"
          subtitle="Simulasikan percabangan keputusan dan pantau divergensi kausalitas pada struktur pemikiran."
          icon={<GitFork size={18} strokeWidth={2} />}
          onClose={onClose}
          variant="sky"
          className="overflow-y-auto"
        >
          {/* Active Timeline Switcher Grid */}
          <div className="space-y-3 mb-5">
            <span className="text-xs font-mono text-slate-400 font-medium uppercase tracking-wider block">
              Garis Waktu Terdeteksi ({timelines.length})
            </span>

            <div className="grid grid-cols-1 gap-2.5">
              {timelines.map(t => {
                const isActive = t.id === activeTimelineId;
                return (
                  <div
                    key={t.id}
                    onClick={() => handleSelect(t.id)}
                    className={`p-3.5 rounded-xl border transition-all duration-150 cursor-pointer flex items-center justify-between active:scale-[0.98] ${
                      isActive
                        ? 'bg-sky-500/10 border-sky-500/40 text-slate-100'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 hover:bg-slate-900/80 text-slate-300'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      <div
                        className="w-3.5 h-3.5 rounded-full mt-1 shrink-0 shadow-sm"
                        style={{ backgroundColor: t.color }}
                      />
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-semibold text-sm text-slate-100">{t.name}</h4>
                          {isActive && (
                            <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-sky-500/20 text-sky-300 border border-sky-500/30">
                              AKTIF
                            </span>
                          )}
                        </div>
                        {t.description && (
                          <p className="text-xs text-slate-400 mt-1 leading-relaxed">{t.description}</p>
                        )}
                        <div className="flex items-center space-x-4 mt-2 text-[10px] font-mono text-slate-500">
                          <span>Divergensi: {(t.divergenceFactor * 100).toFixed(0)}%</span>
                          {t.parentTimelineId && <span>Bercabang dari: {t.parentTimelineId}</span>}
                        </div>
                      </div>
                    </div>

                    <div className="pl-3">
                      {isActive ? (
                        <div className="w-7 h-7 rounded-lg bg-sky-500/20 text-sky-400 flex items-center justify-center border border-sky-500/30">
                          <Check size={14} strokeWidth={2} />
                        </div>
                      ) : (
                        <span className="text-xs font-mono text-slate-500 hover:text-sky-300 flex items-center space-x-1 transition-colors">
                          <span>Beralih</span>
                          <ArrowRight size={13} strokeWidth={2} />
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
            <form onSubmit={handleCreate} className="bg-slate-950/80 p-4 rounded-xl border border-sky-500/30 space-y-3">
              <span className="text-xs font-mono text-sky-400 font-semibold uppercase tracking-wider block">
                Buat Percabangan Realitas Baru
              </span>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">Nama Garis Waktu:</label>
                <input
                  type="text"
                  placeholder="Misal: Timeline Delta (Eksperimen Sistem Terdistribusi)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-lg px-3 py-2 text-xs text-white focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-slate-400 block mb-1">Deskripsi Kondisi Awal:</label>
                <textarea
                  placeholder="Keputusan kunci yang membedakan garis waktu ini dari garis waktu utama..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={2}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-sky-500 focus:ring-1 focus:ring-sky-500 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none transition-colors resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                    <span>Divergensi Kausalitas:</span>
                    <span className="text-sky-400 font-semibold">{(divergence * 100).toFixed(0)}%</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="1.0"
                    step="0.05"
                    value={divergence}
                    onChange={(e) => setDivergence(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer accent-sky-500"
                  />
                </div>

                <div>
                  <label className="text-[11px] font-mono text-slate-400 block mb-1">Spektrum Warna:</label>
                  <div className="flex space-x-2">
                    {['#38bdf8', '#10b981', '#a855f7', '#f43f5e', '#fbbf24', '#06b6d4'].map(c => (
                      <button
                        type="button"
                        key={c}
                        onClick={() => setColor(c)}
                        className={`w-6 h-6 rounded-full transition-transform active:scale-95 ${color === c ? 'scale-110 ring-2 ring-sky-400' : 'opacity-70 hover:opacity-100'}`}
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
                  className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300 transition-all duration-150 active:scale-[0.98]"
                >
                  Batal
                </button>
                <button
                  type="submit"
                  className="px-4 py-1.5 rounded-lg bg-sky-600 hover:bg-sky-500 text-xs font-mono font-medium text-white transition-all duration-150 active:scale-[0.98]"
                >
                  Buka Cabang Realitas
                </button>
              </div>
            </form>
          ) : (
            <button
              onClick={() => setIsCreating(true)}
              className="w-full py-2.5 rounded-xl border border-dashed border-sky-500/30 hover:border-sky-500/60 text-sky-400 hover:text-sky-300 font-mono text-xs flex items-center justify-center space-x-2 transition-all duration-150 hover:bg-sky-500/5 active:scale-[0.98]"
            >
              <Plus size={15} strokeWidth={2} />
              <span>Bercabang ke Garis Waktu Baru</span>
            </button>
          )}
        </GlassPanel>
      </div>
    </div>
  );
};
