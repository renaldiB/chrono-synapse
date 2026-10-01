import React, { useState } from 'react';
import { 
  HelpCircle, 
  Zap, 
  CircleDot, 
  GitFork, 
  Keyboard, 
  Target, 
  BookOpen, 
  Sparkles, 
  Compass, 
  Lightbulb,
  ArrowRight,
  Disc,
  Moon,
  Radio
} from 'lucide-react';
import { GlassPanel } from '../Common/GlassPanel';

interface HelpModalProps {
  onClose: () => void;
}

export const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => {
  const [activeTab, setActiveTab] = useState<'purpose' | 'examples' | 'quickstart' | 'controls'>('purpose');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 animate-fadeIn">
      <div className="w-full max-w-3xl max-h-[90vh] flex flex-col">
        <GlassPanel
          title="PANDUAN & FILOSOFI SEMESTA"
          subtitle="Fungsi, tujuan, dan metode operasional laboratorium pemikiran spasial."
          icon={<HelpCircle size={18} strokeWidth={2} />}
          onClose={onClose}
          variant="sky"
          className="overflow-y-auto"
        >
          {/* Tab Navigation */}
          <div className="flex space-x-2 border-b border-slate-800 pb-3 mb-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('purpose')}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-medium transition-all duration-150 active:scale-[0.98] flex items-center space-x-1.5 shrink-0 ${
                activeTab === 'purpose'
                  ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Target size={14} strokeWidth={2} />
              <span>1. Fungsi & Tujuan</span>
            </button>

            <button
              onClick={() => setActiveTab('examples')}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-medium transition-all duration-150 active:scale-[0.98] flex items-center space-x-1.5 shrink-0 ${
                activeTab === 'examples'
                  ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Lightbulb size={14} strokeWidth={2} />
              <span>2. Contoh Penggunaan</span>
            </button>

            <button
              onClick={() => setActiveTab('quickstart')}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-medium transition-all duration-150 active:scale-[0.98] flex items-center space-x-1.5 shrink-0 ${
                activeTab === 'quickstart'
                  ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <BookOpen size={14} strokeWidth={2} />
              <span>3. Langkah Kerja</span>
            </button>

            <button
              onClick={() => setActiveTab('controls')}
              className={`px-3 py-1.5 rounded-lg font-mono text-xs font-medium transition-all duration-150 active:scale-[0.98] flex items-center space-x-1.5 shrink-0 ${
                activeTab === 'controls'
                  ? 'bg-sky-500/10 text-sky-400 border border-sky-500/30'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Keyboard size={14} strokeWidth={2} />
              <span>4. Navigasi & Pintasan</span>
            </button>
          </div>

          {/* TAB 1: PURPOSE & PHILOSOPHY */}
          {activeTab === 'purpose' && (
            <div className="space-y-4 text-xs text-slate-300 font-sans leading-relaxed">
              {/* Core Problem vs Solution */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800">
                <h4 className="font-semibold text-slate-100 text-sm font-mono flex items-center space-x-2 text-sky-400">
                  <Sparkles size={16} strokeWidth={2} />
                  <span>Mengapa CHRONO-SYNAPSE Diciptakan?</span>
                </h4>
                <p className="mt-2 text-slate-300">
                  Aplikasi catatan konvensional memperlakukan pikiran secara statis, kaku, dan linear. Padahal dalam realitas kognitif:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
                  <li>Pikiran saling memiliki gravitasi dan keterkaitan psikologis.</li>
                  <li>Kita sering mengalami dilema atau polaritas ide (misal: ambisi vs ketenangan batin). Di aplikasi biasa, kedua ide hanya menjadi catatan terpisah tanpa resolusi dialektika.</li>
                  <li>Kecemasan dan bias overthinking memerlukan proses katarsis pembuangan terarah, bukan sekadar penumpukan arsip.</li>
                </ul>
              </div>

              {/* 3 Main Purposes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center mb-2 border border-sky-500/20">
                    <Zap size={14} strokeWidth={2} />
                  </div>
                  <h5 className="font-semibold font-mono text-slate-200 text-xs">Menabrakkan Ide</h5>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Bukan hanya mencatat, tetapi menabrakkan dua ide polar di Thought Collider untuk melahirkan sintesis baru.
                  </p>
                </div>

                <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-rose-500/10 text-rose-400 flex items-center justify-center mb-2 border border-rose-500/20">
                    <CircleDot size={14} strokeWidth={2} />
                  </div>
                  <h5 className="font-semibold font-mono text-slate-200 text-xs">Katarsis Mental</h5>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Melepaskan overthinking dan friksi mental ke horizon peristiwa Singularitas untuk memperoleh stardust.
                  </p>
                </div>

                <div className="bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
                  <div className="w-7 h-7 rounded-lg bg-sky-500/10 text-sky-400 flex items-center justify-center mb-2 border border-sky-500/20">
                    <GitFork size={14} strokeWidth={2} />
                  </div>
                  <h5 className="font-semibold font-mono text-slate-200 text-xs">Simulasi Multiverse</h5>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Memetakan skenario keputusan pada cabang garis waktu paralel tanpa merusak realitas utama.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-slate-900/60 rounded-xl border border-slate-800 text-[11px] text-slate-300 flex items-center space-x-2">
                <Compass size={15} strokeWidth={2} className="shrink-0 text-sky-400" />
                <span>
                  <strong>Inti Filosofi:</strong> Pikiran adalah semesta spasial yang dinamis. CHRONO-SYNAPSE adalah observatorium untuk mengorganisasi dan mengharmonisasi konstelasi tersebut.
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: PRACTICAL EXAMPLES & USE CASES */}
          {activeTab === 'examples' && (
            <div className="space-y-4 text-xs text-slate-300 font-sans leading-relaxed">
              {/* Example 1 */}
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-semibold text-slate-200 uppercase tracking-wider flex items-center space-x-1">
                    <Zap size={13} strokeWidth={2} className="mr-1 text-sky-400" />
                    Studi Kasus 1: Mengatasi Dilema "Ambisi" vs "Ketenangan Batin"
                  </span>
                  <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 font-mono text-[10px]">
                    Thought Collider
                  </span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  <strong>Skenario:</strong> Keraguan antara ritme kerja intensif dengan kebutuhan pemulihan emosional.
                </p>
                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-[11px] space-y-1.5">
                  <div className="text-slate-300 flex items-center gap-1.5 flex-wrap">
                    <span>Thought Collider</span>
                    <ArrowRight size={11} className="text-slate-500" />
                    <span>Pilih Ide A & Ide B</span>
                    <ArrowRight size={11} className="text-slate-500" />
                    <span className="text-sky-300 font-medium">Picu Tabrakan Dialektika</span>
                  </div>
                  <div className="text-sky-300 pt-1 border-t border-slate-800">
                    <strong>Hasil Sintesis:</strong> Lahir konsep <em>Dynamic Stillness</em> (fokus mendalam 90 menit tanpa distraksi, diikuti dekompresi total).
                  </div>
                  <div className="text-slate-400 text-[10px] font-mono">
                    Gunakan "Manifestasikan sebagai Bintang Baru" untuk menyematkannya sebagai prinsip permanen.
                  </div>
                </div>
              </div>

              {/* Example 2 */}
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-semibold text-slate-200 uppercase tracking-wider flex items-center space-x-1">
                    <CircleDot size={13} strokeWidth={2} className="mr-1 text-rose-400" />
                    Studi Kasus 2: Melepaskan Beban Overthinking
                  </span>
                  <span className="px-2 py-0.5 rounded bg-rose-500/10 text-rose-300 border border-rose-500/20 font-mono text-[10px]">
                    Singularity Purifier
                  </span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  <strong>Skenario:</strong> Pikiran dipenuhi friksi mental atau kecemasan performa sebelum agenda penting.
                </p>
                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-[11px] space-y-1.5">
                  <div className="text-slate-300 flex items-center gap-1.5 flex-wrap">
                    <span>Buat Simpul Asteroid</span>
                    <ArrowRight size={11} className="text-slate-500" />
                    <span>Seret ke Pusat Singularitas (0, 0)</span>
                    <ArrowRight size={11} className="text-slate-500" />
                    <span className="text-rose-300 font-medium">Lepaskan untuk Purifikasi</span>
                  </div>
                  <div className="text-slate-400 pt-1 border-t border-slate-800">
                    <strong>Hasil Katarsis:</strong> Simpul terdisolusi dengan resonansi audio 528 Hz. Friksi terkonversi menjadi stardust.
                  </div>
                </div>
              </div>

              {/* Example 3 */}
              <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-semibold text-slate-200 uppercase tracking-wider flex items-center space-x-1">
                    <GitFork size={13} strokeWidth={2} className="mr-1 text-sky-400" />
                    Studi Kasus 3: Eksplorasi Keputusan Paralel
                  </span>
                  <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-300 border border-sky-500/20 font-mono text-[10px]">
                    Multiverse
                  </span>
                </div>
                <p className="text-slate-400 text-[11px]">
                  <strong>Skenario:</strong> Membandingkan arah karier atau arsitektur sistem baru tanpa mengubah peta saat ini.
                </p>
                <div className="bg-slate-900/80 p-3 rounded-lg border border-slate-800 text-[11px] space-y-1.5">
                  <div className="text-slate-300 flex items-center gap-1.5 flex-wrap">
                    <span>Buka Multiverse</span>
                    <ArrowRight size={11} className="text-slate-500" />
                    <span>Buat Percabangan Baru</span>
                    <ArrowRight size={11} className="text-slate-500" />
                    <span className="text-sky-300 font-medium">Eksplorasi Hipotesis</span>
                  </div>
                  <div className="text-slate-400 pt-1 border-t border-slate-800">
                    <strong>Keuntungan:</strong> Percabangan terisolasi aman tanpa mengacaukan struktur simpul pada garis waktu utama.
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: STEP-BY-STEP QUICK START */}
          {activeTab === 'quickstart' && (
            <div className="space-y-3 text-xs text-slate-300 font-sans leading-relaxed">
              <div className="flex items-start space-x-3 bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
                <div className="w-6 h-6 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center font-mono font-medium shrink-0 text-xs">
                  1
                </div>
                <div>
                  <h5 className="font-semibold text-slate-100 font-mono text-xs">Navigasi Ruang Spasial</h5>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Klik dan geser kanvas untuk panning kamera. Gunakan roda mouse untuk zoom in dan zoom out secara bertahap.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
                <div className="w-6 h-6 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center font-mono font-medium shrink-0 text-xs">
                  2
                </div>
                <div>
                  <h5 className="font-semibold text-slate-100 font-mono text-xs">Buat Simpul Pemikiran (+ Entitas Baru)</h5>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Pilih tipe astronomis sesuai fungsi kognitif:
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-2 font-mono text-[10px]">
                    <span className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-900 text-amber-300 border border-slate-800">
                      <Sparkles size={12} strokeWidth={2} />
                      <span>Bintang: Nilai Inti</span>
                    </span>
                    <span className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-900 text-sky-300 border border-slate-800">
                      <Disc size={12} strokeWidth={2} />
                      <span>Planet: Proyek / Topik</span>
                    </span>
                    <span className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-900 text-purple-300 border border-slate-800">
                      <Moon size={12} strokeWidth={2} />
                      <span>Bulan: Aksi & Kebiasaan</span>
                    </span>
                    <span className="flex items-center gap-1.5 p-1.5 rounded-lg bg-slate-900 text-rose-300 border border-slate-800">
                      <Radio size={12} strokeWidth={2} />
                      <span>Pulsar: Pengingat Waktu</span>
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
                <div className="w-6 h-6 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center font-mono font-medium shrink-0 text-xs">
                  3
                </div>
                <div>
                  <h5 className="font-semibold text-slate-100 font-mono text-xs">Tabrakan Dialektika di Thought Collider</h5>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Pilih dua ide yang berlawanan atau komplementer. Jalankan akselerasi untuk mengekstraksi resolusi dan aksi nyata.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
                <div className="w-6 h-6 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center font-mono font-medium shrink-0 text-xs">
                  4
                </div>
                <div>
                  <h5 className="font-semibold text-slate-100 font-mono text-xs">Purifikasi di Horizon Singularitas</h5>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Seret ide atau friksi mental ke lubang hitam di pusat koordinat untuk memurnikannya menjadi stardust.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
                <div className="w-6 h-6 rounded-lg bg-sky-500/10 text-sky-400 border border-sky-500/20 flex items-center justify-center font-mono font-medium shrink-0 text-xs">
                  5
                </div>
                <div>
                  <h5 className="font-semibold text-slate-100 font-mono text-xs">Resonansi Audio Harmonik</h5>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Aktifkan generator drone frekuensi theta di bilah atas untuk mendukung fokus dan ketenangan saat bernavigasi.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CONTROLS & SHORTCUTS */}
          {activeTab === 'controls' && (
            <div className="space-y-3 text-xs text-slate-300 font-sans leading-relaxed">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2.5">
                <h5 className="font-semibold text-slate-100 font-mono text-xs text-sky-400">Pintasan Keyboard:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-slate-400">Jeda / Lanjutkan Fisika:</span>
                    <span className="px-2 py-0.5 bg-slate-800 text-sky-300 rounded font-semibold border border-slate-700">[ Space ]</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-slate-400">Tutup Modal:</span>
                    <span className="px-2 py-0.5 bg-slate-800 text-sky-300 rounded font-semibold border border-slate-700">[ Esc ]</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <h5 className="font-semibold text-slate-100 font-mono text-xs text-sky-400">Interaksi Mouse & Sentuh:</h5>
                <ul className="space-y-1.5 text-[11px] text-slate-400">
                  <li>• <strong className="text-slate-300">Klik Kiri Simpul:</strong> Membuka inspektor untuk mengubah catatan, massa, frekuensi, atau relasi.</li>
                  <li>• <strong className="text-slate-300">Drag Simpul:</strong> Mengatur ulang posisi atau melontarkannya dengan momentum fisika.</li>
                  <li>• <strong className="text-slate-300">Drag ke Pusat (0, 0):</strong> Memasukkan simpul ke horizon peristiwa Singularitas.</li>
                  <li>• <strong className="text-slate-300">Scroll Mouse:</strong> Zoom in dan zoom out bertahap ke posisi kursor.</li>
                </ul>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1">
                <h5 className="font-semibold text-slate-100 font-mono text-xs text-slate-300">Penyimpanan & Privasi:</h5>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Data konstelasi tersimpan lokal di peramban (LocalStorage). Anda dapat mengekspor semesta ke format JSON atau Markdown kapan saja melalui menu Ekspor di navigasi atas.
                </p>
              </div>
            </div>
          )}
        </GlassPanel>
      </div>
    </div>
  );
};
