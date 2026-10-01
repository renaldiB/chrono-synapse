import React, { useState } from 'react';
import { Sparkles, Plus, Volume2, Disc, Moon, Asterisk, Radio } from 'lucide-react';
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
      label: 'Bintang',
      icon: <Sparkles size={15} strokeWidth={2} />,
      color: '#fbbf24',
      defaultMass: 150,
      desc: 'Tema Hidup Inti / Aksioma Sentral dengan gravitasi sangat besar.'
    },
    planet: {
      label: 'Planet',
      icon: <Disc size={15} strokeWidth={2} />,
      color: '#0284c7',
      defaultMass: 85,
      desc: 'Proyek Utama / Filosofi / Domain Hidup yang mengorbit tema sentral.'
    },
    moon: {
      label: 'Bulan',
      icon: <Moon size={15} strokeWidth={2} />,
      color: '#94a3b8',
      defaultMass: 30,
      desc: 'Tugas Praktis / Kebiasaan / Hipotesis yang mengitari sebuah planet.'
    },
    asteroid: {
      label: 'Asteroid',
      icon: <Asterisk size={15} strokeWidth={2} />,
      color: '#cbd5e1',
      defaultMass: 18,
      desc: 'Pikiran Sekilas / Ide Spontan yang melayang bebas dengan kecepatan tinggi.'
    },
    pulsar: {
      label: 'Pulsar',
      icon: <Radio size={15} strokeWidth={2} />,
      color: '#e11d48',
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

    // Random initial spawn near viewport center with safe distance
    const angle = Math.random() * Math.PI * 2;
    const spawnDist = Math.random() * 180 + 200;
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
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
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
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 animate-fadeIn">
      <div className="w-full max-w-xl max-h-[90vh] flex flex-col">
        <GlassPanel
          title="Kelahiran Entitas Kosmik Baru"
          subtitle="Tanamkan pemikiran, proyek, atau memori ke dalam kanvas gravitasi semesta."
          icon={<Plus size={18} strokeWidth={2} />}
          onClose={onClose}
          className="overflow-y-auto"
        >
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Entity Type Selection Carousel */}
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-2">
                Tipe Entitas:
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                {(Object.keys(typeConfig) as NodeType[]).map(t => {
                  const cfg = typeConfig[t];
                  const isSelected = type === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => handleTypeSelect(t)}
                      className={`p-2.5 rounded-xl border text-left flex flex-col items-center justify-center space-y-1.5 transition-all duration-150 active:scale-[0.98] ${
                        isSelected
                          ? 'border-sky-500 bg-sky-500/10 text-white shadow-sm'
                          : 'border-slate-800 bg-slate-900/60 text-slate-400 hover:border-slate-700 hover:text-slate-200'
                      }`}
                    >
                      <div style={{ color: cfg.color }}>{cfg.icon}</div>
                      <span className="text-[11px] font-medium">{cfg.label}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-[11px] text-slate-400 mt-2 font-normal leading-relaxed">
                {typeConfig[type].desc}
              </p>
            </div>

            {/* Title & Core Meaning */}
            <div className="space-y-3">
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  Nama Simpul Pemikiran:
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Arsitektur Kognitif Berbasis Komposabilitas"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-sky-500 rounded-lg px-3 py-2 text-xs text-slate-100 placeholder:text-slate-600 focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  Eksplorasi Konseptual:
                </label>
                <textarea
                  rows={3}
                  placeholder="Tuliskan aksioma, relasi kausal, atau pemikiran sistemik secara mendalam..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 focus:border-sky-500 rounded-lg p-3 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none transition-colors resize-none leading-relaxed"
                />
              </div>
            </div>

            {/* Sliders: Mass (Gravity) & Acoustic Resonance */}
            <div className="bg-slate-900/80 p-3.5 rounded-xl border border-slate-800 space-y-3">
              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span className="text-slate-400 font-medium">Massa Gravitasi (Daya Tarik Ide):</span>
                  <span className="text-sky-400 font-mono font-medium">{mass} M☉</span>
                </div>
                <input
                  type="range"
                  min="10"
                  max="220"
                  value={mass}
                  onChange={(e) => setMass(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between items-center text-xs text-slate-300 mb-1">
                  <span className="text-slate-400 font-medium">Resonansi Frekuensi Audio:</span>
                  <div className="flex items-center space-x-2">
                    <span className="text-slate-300 font-mono">{frequency} Hz</span>
                    <button
                      type="button"
                      onClick={handleTestChime}
                      className="p-1 hover:bg-slate-800 rounded text-slate-400 hover:text-sky-400 transition-colors"
                      title="Uji Suara"
                    >
                      <Volume2 size={13} strokeWidth={2} />
                    </button>
                  </div>
                </div>
                <input
                  type="range"
                  min="174"
                  max="963"
                  value={frequency}
                  onChange={(e) => setFrequency(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>

              <div>
                <div className="flex justify-between text-xs text-slate-300 mb-1">
                  <span className="text-slate-400 font-medium">Polaritas Kognitif:</span>
                  <span className="text-slate-300 font-mono">
                    {polarity < -0.2 ? 'Analitikal / Kritis' : polarity > 0.2 ? 'Intuitif / Eksploratif' : 'Seimbang'}
                  </span>
                </div>
                <input
                  type="range"
                  min="-1"
                  max="1"
                  step="0.1"
                  value={polarity}
                  onChange={(e) => setPolarity(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-800 rounded-lg cursor-pointer"
                />
              </div>
            </div>

            {/* Orbital Parent (Optional Hierarchy) */}
            {existingNodes.length > 0 && type !== 'star' && (
              <div>
                <label className="text-xs text-slate-300 font-medium block mb-1">
                  Orbitkan di Sekitar Entitas Induk (Opsional):
                </label>
                <CosmicSelect
                  options={[
                    { value: '', label: 'Melayang Bebas di Ruang Hampa (Bebas Orbit)' },
                    ...existingNodes.map(n => ({
                      value: n.id,
                      label: `Mengorbit: ${n.title} (${n.type})`,
                      color: n.color,
                    }))
                  ]}
                  value={parentId}
                  onChange={setParentId}
                />
              </div>
            )}

            {/* Tags */}
            <div>
              <label className="text-xs text-slate-300 font-medium block mb-1">
                Tag Konseptual (Pisahkan dengan koma):
              </label>
              <input
                type="text"
                placeholder="epistemologi, sistem-komputasi, heuristik"
                value={tagsInput}
                onChange={(e) => setTagsInput(e.target.value)}
                className="w-full bg-slate-900 border border-slate-800 focus:border-sky-500 rounded-lg px-3 py-2 text-xs text-slate-200 placeholder:text-slate-600 focus:outline-none transition-colors"
              />
            </div>

            {/* Submit */}
            <div className="flex justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-medium text-slate-300 transition-all duration-150 active:scale-[0.98]"
              >
                Batal
              </button>
              <button
                type="submit"
                className="px-5 py-2 rounded-xl bg-sky-500 hover:bg-sky-400 text-xs font-medium text-white shadow-sm transition-all duration-150 active:scale-[0.98]"
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
