import React, { useState } from 'react';
import { Plus, Volume2, Sparkles, Orbit, Radio, Disc, Moon, Asterisk } from 'lucide-react';
import { CelestialNode, NodeType } from '../../types/cosmos';
import { GlassPanel } from '../Common/GlassPanel';
import { CosmicSelect } from '../Common/CosmicSelect';
import { soundEngine } from '../../engine/SoundEngine';

interface CreateNodeModalProps {
  existingNodes: CelestialNode[];
  activeTimelineId: string;
  onClose: () => void;
  onCreateNode: (node: CelestialNode) => void;
}

export const CreateNodeModal: React.FC<CreateNodeModalProps> = ({
  existingNodes,
  activeTimelineId,
  onClose,
  onCreateNode,
}) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [type, setType] = useState<NodeType>('planet');
  const [mass, setMass] = useState<number>(85);
  const [frequency, setFrequency] = useState<number>(528);
  const [polarity, setPolarity] = useState<number>(0.2);
  const [tagsInput, setTagsInput] = useState('');
  const [parentId, setParentId] = useState<string>('');

  const typeConfig: Record<NodeType, { label: string; icon: React.ReactNode; color: string; defaultMass: number; desc: string }> = {
    star: {
      label: 'Bintang (Star)',
      icon: <Sparkles size={16} />,
      color: '#fbbf24',
      defaultMass: 150,
      desc: 'Tema Hidup Inti / Aksioma Sentral dengan gravitasi sangat besar.'
    },
    planet: {
      label: 'Planet (Planet)',
      icon: <Disc size={16} />,
      color: '#38bdf8',
      defaultMass: 85,
      desc: 'Proyek Utama / Filosofi / Domain Hidup yang mengorbit tema sentral.'
    },
    moon: {
      label: 'Bulan (Moon)',
      icon: <Moon size={16} />,
      color: '#a78bfa',
      defaultMass: 30,
      desc: 'Tugas Praktis / Kebiasaan / Hipotesis yang mengitari sebuah planet.'
    },
    asteroid: {
      label: 'Asteroid (Spark)',
      icon: <Asterisk size={16} />,
      color: '#e2e8f0',
      defaultMass: 18,
      desc: 'Pikiran Sekilas / Ide Spontan yang melayang bebas dengan kecepatan tinggi.'
    },
    pulsar: {
      label: 'Pulsar (Anchor)',
      icon: <Radio size={16} />,
      color: '#f43f5e',
      defaultMass: 110,
      desc: 'Pengingat Berkala / Sinyal Waktu Kritis yang memancarkan gelombang berulang.'
    }
  };

  const handleTypeSelect = (selectedType: NodeType) => {
    setType(selectedType);
    setMass(typeConfig[selectedType].defaultMass);
  };

  const handleTestChime = () => {
    soundEngine.playNodeResonance(frequency, type);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const tags = tagsInput
      .split(',')
      .map(t => t.trim().toLowerCase())
      .filter(Boolean);

    // Random initial spawn near viewport center with gentle drift
    const angle = Math.random() * Math.PI * 2;
    const spawnDist = Math.random() * 200 + 80;
    const x = Math.cos(angle) * spawnDist;
    const y = Math.sin(angle) * spawnDist;

    const currentConfig = typeConfig[type];

    const newNode: CelestialNode = {
      id: `node-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
      title,
      content,
      type,
      x,
      y,
      vx: (Math.random() - 0.5) * 0.4,
      vy: (Math.random() - 0.5) * 0.4,
      mass,
      radius: Math.max(12, Math.min(48, Math.round(mass * 0.22 + 6))),
      color: currentConfig.color,
      glowColor: `${currentConfig.color}66`,
      frequency,
      polarity,
      tags,
      timelineId: activeTimelineId,
      parentId: parentId || undefined,
      orbitRadius: parentId ? Math.random() * 80 + 100 : undefined,
      orbitSpeed: parentId ? 0.006 + Math.random() * 0.008 : undefined,
      orbitAngle: Math.random() * Math.PI * 2,
      createdAt: Date.now(),
      updatedAt: Date.now(),
      entropy: Math.round(Math.random() * 30 + 10),
    };

    onCreateNode(newNode);
    soundEngine.playNodeResonance(frequency, type);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 animate-fadeIn">
      <div className="w-full max-w-xl max-h-[90vh] flex flex-col">
        <GlassPanel
          title="KELAHIRAN ENTITAS KOSMIK BARU"
          subtitle="Tanamkan pemikiran, proyek, atau memori ke dalam kanvas gravitasi semesta."
          icon={<Plus size={20} />}
          onClose={onClose}
          variant="cyan"
          className="overflow-y-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Entity Type Selection Carousel */}
            <div>
              <label className="text-[11px] font-mono text-slate-300 font-bold uppercase tracking-wider block mb-2">
                Pilih Tipe Entitas Astronomis:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                {(Object.keys(typeConfig) as NodeType[]).map(t => {
                  const cfg = typeConfig[t];
                  const isSelected = type === t;
                  return (
                    <button
                      type="button"
                      key={t}
                      onClick={() => handleTypeSelect(t)}
                      className={`p-2.5 rounded-xl border text-left transition-all flex flex-col justify-between ${
                        isSelected
                          ? 'bg-cyan-950/50 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.4)]'
                          : 'bg-slate-900/40 border-slate-800 hover:border-slate-700'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span style={{ color: cfg.color }}>{cfg.icon}</span>
                        <span className="font-bold text-xs font-mono text-slate-200">{cfg.label.split(' ')[0]}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 mt-1 line-clamp-1">{cfg.desc}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Title */}
            <div>
              <label className="text-[11px] font-mono text-slate-300 block mb-1">Judul Pemikiran / Entitas:</label>
              <input
                type="text"
                placeholder="Misal: Sintesis AI Kognitif, Ketenangan Batin, Habit Membaca..."
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white font-semibold focus:outline-none focus:border-cyan-400"
                required
              />
            </div>

            {/* Content */}
            <div>
              <label className="text-[11px] font-mono text-slate-300 block mb-1">Eksplorasi / Catatan Lengkap:</label>
              <textarea
                placeholder="Uraikan detail pemikiran, paradoks, atau tujuan dari simpul ini..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={3}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2.5 text-xs text-slate-200 focus:outline-none focus:border-cyan-400 resize-none"
              />
            </div>

            {/* Mass & Audio Frequency Tuning */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-slate-950/50 p-3 rounded-xl border border-slate-800/80">
              <div>
                <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                  <span>Massa Gravitasi:</span>
                  <span className="text-cyan-400 font-bold">{mass} M☉</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="250"
                  value={mass}
                  onChange={(e) => setMass(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                  <span>Frekuensi Resonansi:</span>
                  <div className="flex items-center space-x-1">
                    <span className="text-purple-400 font-bold">{frequency} Hz</span>
                    <button
                      type="button"
                      onClick={handleTestChime}
                      className="text-cyan-400 hover:text-cyan-300 ml-1"
                      title="Tes Frekuensi"
                    >
                      <Volume2 size={12} />
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="120"
                  max="963"
                  value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Optional Parent Orbit */}
            {existingNodes.length > 0 && (
              <div>
                <label className="text-[11px] font-mono text-slate-300 block mb-1">
                  Orbitkan di Sekitar Entitas Induk (Opsional):
                </label>
                <CosmicSelect
                  options={[
                    { value: '', label: 'Melayang Bebas di Ruang Hampa (Bebas Orbit)' },
                    ...existingNodes.map(n => ({
                      value: n.id,
                      label: `Mengorbit: ${n.title} (${n.type.toUpperCase()})`,
                      color: n.color,
                    }))
                  ]}
                  value={parentId}
                  onChange={setParentId}
                  variant="cyan"
                />
              </div>
            )}

            {/* Tags */}
            <div>
              <label className="text-[11px] font-mono text-slate-300 block mb-1">
                Tag Konseptual (Pisahkan dengan koma):
              </label>
              <input
                type="text"
                placeholder="filosofi, coding, habit, masa-depan"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-cyan-400"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-mono text-slate-300"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-6 py-2 rounded-xl bg-gradient-to-r from-cyan-600 to-indigo-600 hover:from-cyan-500 hover:to-indigo-500 text-xs font-mono font-bold text-white shadow-[0_0_20px_rgba(6,182,212,0.4)]"
              >
                Lahirkan ke Semesta
              </button>
            </div>
          </form>
        </GlassPanel>
      </div>
    </div>
  );
};
