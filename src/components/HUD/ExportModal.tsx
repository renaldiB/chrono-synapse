import React, { useRef } from 'react';
import { Download, Upload, FileText, RotateCcw, Check, Sparkles, Trash2 } from 'lucide-react';
import { CelestialNode, CosmicLink, Timeline, CollisionSynthesis, SingularityPurification } from '../../types/cosmos';
import { GlassPanel } from '../Common/GlassPanel';

interface ExportModalProps {
  nodes: CelestialNode[];
  links: CosmicLink[];
  timelines: Timeline[];
  syntheses: CollisionSynthesis[];
  purifications: SingularityPurification[];
  stardustTotal: number;
  onImportUniverse: (data: {
    nodes: CelestialNode[];
    links: CosmicLink[];
    timelines: Timeline[];
    syntheses?: CollisionSynthesis[];
    purifications?: SingularityPurification[];
  }) => void;
  onResetToDefault: () => void;
  onWipeAll: () => void;
  onClose: () => void;
}

export const ExportModal: React.FC<ExportModalProps> = ({
  nodes,
  links,
  timelines,
  syntheses,
  purifications,
  stardustTotal,
  onImportUniverse,
  onResetToDefault,
  onWipeAll,
  onClose,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleExportJSON = () => {
    const data = {
      exportedAt: new Date().toISOString(),
      appName: 'CHRONO-SYNAPSE',
      version: '1.0',
      stardustTotal,
      timelines,
      nodes,
      links,
      syntheses,
      purifications,
    };

    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chrono-synapse-cosmos-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportMarkdown = () => {
    let md = `# 🌌 CHRONO-SYNAPSE // PETA PENGETAHUAN KOSMIK\n`;
    md += `*Diekspor pada: ${new Date().toLocaleString('id-ID')}*\n\n`;
    md += `**Total Entitas Kosmik**: ${nodes.length} | **Total Relasi Entanglement**: ${links.length} | **Stardust**: ${stardustTotal} ✧\n\n`;
    md += `---\n\n`;

    // Group by Type
    const types = ['star', 'planet', 'moon', 'asteroid', 'pulsar'] as const;
    types.forEach(t => {
      const group = nodes.filter(n => n.type === t);
      if (group.length > 0) {
        md += `## 🌟 ${t.toUpperCase()}S (${group.length})\n\n`;
        group.forEach(n => {
          md += `### ${n.title}\n`;
          md += `- **Tipe**: \`${n.type}\` | **Massa**: \`${n.mass} M☉\` | **Frekuensi**: \`${n.frequency} Hz\`\n`;
          if (n.tags.length > 0) {
            md += `- **Tags**: ${n.tags.map(tag => `\`#${tag}\``).join(' ')}\n`;
          }
          md += `\n${n.content}\n\n`;
        });
      }
    });

    if (syntheses.length > 0) {
      md += `## ⚡ HASIL TABRAKAN THOUGHT COLLIDER\n\n`;
      syntheses.forEach(s => {
        md += `### ${s.synthesisTitle}\n`;
        md += `*Tabrakan antara "${s.nodeA.title}" dan "${s.nodeB.title}"*\n\n`;
        md += `> ${s.coreSynthesis}\n\n`;
        md += `**Resolusi Paradoks**: ${s.dialecticalResolution}\n\n`;
        md += `**Langkah Aksi**: ${s.quantumActionStep}\n\n`;
        md += `*${s.paradoxQuote}*\n\n`;
      });
    }

    const blob = new Blob([md], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `chrono-synapse-knowledge-${Date.now()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const json = JSON.parse(event.target?.result as string);
        if (json.nodes && json.links) {
          onImportUniverse({
            nodes: json.nodes,
            links: json.links,
            timelines: json.timelines || timelines,
            syntheses: json.syntheses || [],
            purifications: json.purifications || [],
          });
          onClose();
        } else {
          alert('Format semesta JSON tidak valid.');
        }
      } catch (err) {
        alert('Gagal membaca file JSON.');
      }
    };
    reader.readAsText(file);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 animate-fadeIn">
      <div className="w-full max-w-lg max-h-[90vh] flex flex-col">
        <GlassPanel
          title="EKSPOR & ARSIP SEMESTA KOSMIK"
          subtitle="Simpan peta pemikiran dalam format Markdown atau JSON lengkap, dan pulihkan kapan saja."
          icon={<Download size={20} />}
          onClose={onClose}
          variant="cyan"
        >
          <div className="space-y-3 my-2">
            {/* Export JSON */}
            <button
              onClick={handleExportJSON}
              className="w-full p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-cyan-500/30 hover:border-cyan-400 text-left transition-all flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-cyan-500/10 text-cyan-400 flex items-center justify-center">
                  <Download size={18} />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold text-slate-100 group-hover:text-cyan-300">
                    Ekspor Semesta Penuh (JSON)
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Mencakup semua simpul, koordinat fisika, timeline, dan riwayat tabrakan.
                  </p>
                </div>
              </div>
            </button>

            {/* Export Markdown */}
            <button
              onClick={handleExportMarkdown}
              className="w-full p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-purple-500/30 hover:border-purple-400 text-left transition-all flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-purple-500/10 text-purple-400 flex items-center justify-center">
                  <FileText size={18} />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold text-slate-100 group-hover:text-purple-300">
                    Ekspor Catatan Pengetahuan (Markdown)
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Format rapi untuk diimpor ke Obsidian, Notion, Logseq, atau jurnal pribadi.
                  </p>
                </div>
              </div>
            </button>

            {/* Import JSON */}
            <button
              onClick={() => fileInputRef.current?.click()}
              className="w-full p-3.5 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-700 hover:border-slate-500 text-left transition-all flex items-center justify-between group"
            >
              <div className="flex items-center space-x-3">
                <div className="w-9 h-9 rounded-lg bg-emerald-500/10 text-emerald-400 flex items-center justify-center">
                  <Upload size={18} />
                </div>
                <div>
                  <h4 className="font-mono text-xs font-bold text-slate-100 group-hover:text-emerald-300">
                    Impor Semesta Cadangan (JSON)
                  </h4>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Pulihkan seluruh konstelasi pemikiran dari file sebelumnya.
                  </p>
                </div>
              </div>
            </button>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileUpload}
              accept=".json"
              className="hidden"
            />

            {/* Danger Zone: Wipe or Restore */}
            <div className="pt-3 border-t border-slate-800 space-y-2">
              <button
                onClick={() => {
                  if (confirm('PERINGATAN: Ini akan MENGHAPUS SEMUA DATA termasuk data dummy/contoh bawaan secara permanen. Kanvas akan kosong bersih. Lanjutkan?')) {
                    onWipeAll();
                    onClose();
                  }
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-gradient-to-r from-rose-600 to-red-700 hover:from-rose-500 hover:to-red-600 text-white font-mono text-xs font-bold flex items-center justify-center space-x-2 transition-all shadow-md active:scale-98"
              >
                <Trash2 size={14} />
                <span>Reset Total (Hapus Semua Termasuk Data Dummy)</span>
              </button>

              <button
                onClick={() => {
                  if (confirm('Mereset ke Preset Galaksi Awal akan memulihkan data contoh/dummy bawaan. Lanjutkan?')) {
                    onResetToDefault();
                    onClose();
                  }
                }}
                className="w-full py-2 px-4 rounded-xl border border-slate-700 hover:border-slate-500 bg-slate-900/60 hover:bg-slate-800 text-slate-300 font-mono text-xs flex items-center justify-center space-x-2 transition-all"
              >
                <RotateCcw size={13} />
                <span>Pulihkan Galaksi Contoh Awal (Demo Galaxy)</span>
              </button>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
};
