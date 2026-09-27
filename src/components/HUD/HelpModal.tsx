import React, { useState } from 'react';
import { 
  HelpCircle, 
  Zap, 
  CircleDot, 
  Volume2, 
  Move, 
  GitFork, 
  Keyboard, 
  Target, 
  BookOpen, 
  CheckCircle2, 
  Sparkles, 
  Flame, 
  Compass, 
  Lightbulb,
  ArrowRight
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
          title="PANDUAN & FILOSOFI SEMESTA // CHRONO-SYNAPSE"
          subtitle="Pelajari fungsi, tujuan revolusioner, dan contoh nyata penggunaan laboratorium pemikiran kuantum ini."
          icon={<HelpCircle size={20} />}
          onClose={onClose}
          variant="cyan"
          className="overflow-y-auto"
        >
          {/* Tab Navigation */}
          <div className="flex space-x-2 border-b border-slate-800/80 pb-3 mb-4 overflow-x-auto">
            <button
              onClick={() => setActiveTab('purpose')}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
                activeTab === 'purpose'
                  ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Target size={14} />
              <span>1. Fungsi & Tujuan</span>
            </button>

            <button
              onClick={() => setActiveTab('examples')}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
                activeTab === 'examples'
                  ? 'bg-purple-500/20 text-purple-300 border border-purple-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Lightbulb size={14} />
              <span>2. Contoh Penggunaan</span>
            </button>

            <button
              onClick={() => setActiveTab('quickstart')}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
                activeTab === 'quickstart'
                  ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <BookOpen size={14} />
              <span>3. Cara Pakai (Step-by-Step)</span>
            </button>

            <button
              onClick={() => setActiveTab('controls')}
              className={`px-3.5 py-1.5 rounded-xl font-mono text-xs font-bold transition-all flex items-center space-x-1.5 shrink-0 ${
                activeTab === 'controls'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 shadow-sm'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
              }`}
            >
              <Keyboard size={14} />
              <span>4. Navigasi & Pintasan</span>
            </button>
          </div>

          {/* TAB 1: PURPOSE & PHILOSOPHY */}
          {activeTab === 'purpose' && (
            <div className="space-y-4 text-xs text-slate-300 font-sans leading-relaxed">
              {/* Core Problem vs Solution */}
              <div className="bg-slate-950/60 p-4 rounded-xl border border-cyan-500/30">
                <h4 className="font-bold text-slate-100 text-sm font-mono flex items-center space-x-2 text-cyan-300">
                  <Sparkles size={16} />
                  <span>Mengapa CHRONO-SYNAPSE Diciptakan?</span>
                </h4>
                <p className="mt-2 text-slate-300">
                  Aplikasi catatan biasa (seperti Notion, Apple Notes, atau To-Do list) memperlakukan pikiran manusia secara <strong>statis, kaku, dan linear</strong>. Padahal di dunia nyata:
                </p>
                <ul className="list-disc list-inside mt-2 space-y-1 text-slate-400">
                  <li>Pikiran kita saling tarik-menarik dan memiliki gravitasi psikologisnya sendiri.</li>
                  <li>Kita sering mengalami <strong>konflik batin atau dilema</strong> (misal: ingin ambisi sukses vs ingin hidup santai & tenang). Di aplikasi biasa, kedua ide ini hanya bertumpuk jadi catatan mati tanpa solusi.</li>
                  <li>Kita sering menyimpan <strong>overthinking dan kecemasan</strong> yang seharusnya dibersihkan, bukan sekadar diarsip.</li>
                </ul>
              </div>

              {/* 3 Main Purposes */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="bg-slate-950/50 p-3.5 rounded-xl border border-purple-500/30">
                  <div className="w-7 h-7 rounded-lg bg-purple-500/20 text-purple-400 flex items-center justify-center mb-2">
                    <Zap size={15} />
                  </div>
                  <h5 className="font-bold font-mono text-purple-300 text-xs uppercase">Menabrakkan Ide</h5>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Bukan hanya mencatat, tetapi menabrakkan dua ide berlawanan di <em>Thought Collider</em> untuk melahirkan solusi jalan tengah (sintesis dialektika).
                  </p>
                </div>

                <div className="bg-slate-950/50 p-3.5 rounded-xl border border-rose-500/30">
                  <div className="w-7 h-7 rounded-lg bg-rose-500/20 text-rose-400 flex items-center justify-center mb-2">
                    <CircleDot size={15} />
                  </div>
                  <h5 className="font-bold font-mono text-rose-300 text-xs uppercase">Katarsis Mental</h5>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Membuang overthinking, keraguan, dan ketakutan ke dalam <em>Lubang Hitam</em> sebagai ritual pelepasan emosi yang menenangkan.
                  </p>
                </div>

                <div className="bg-slate-950/50 p-3.5 rounded-xl border border-emerald-500/30">
                  <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center mb-2">
                    <GitFork size={15} />
                  </div>
                  <h5 className="font-bold font-mono text-emerald-300 text-xs uppercase">Simulasi Multiverse</h5>
                  <p className="text-[11px] text-slate-400 mt-1">
                    Mencoba berbagai skenario keputusan hidup di garis waktu paralel (Timeline Alpha, Beta, Gamma) tanpa takut salah langkah.
                  </p>
                </div>
              </div>

              <div className="p-3 bg-cyan-950/20 rounded-xl border border-cyan-500/20 text-[11px] text-cyan-200 flex items-center space-x-2">
                <Compass size={16} className="shrink-0 text-cyan-400" />
                <span>
                  <strong>Inti Filosofi:</strong> Pikiranmu adalah sebuah semesta kosmik dinamis. CHRONO-SYNAPSE adalah teleskop dan laboratorium untuk meneliti serta mengharmonisasikannya.
                </span>
              </div>
            </div>
          )}

          {/* TAB 2: PRACTICAL EXAMPLES & USE CASES */}
          {activeTab === 'examples' && (
            <div className="space-y-4 text-xs text-slate-300 font-sans leading-relaxed">
              {/* Example 1 */}
              <div className="bg-slate-950/70 p-4 rounded-xl border border-purple-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-purple-400 uppercase tracking-wider flex items-center space-x-1">
                    <Zap size={14} className="mr-1" />
                    Studi Kasus 1: Mengatasi Dilema "Ambisi Karir" vs "Ketenangan Batin"
                  </span>
                  <span className="px-2 py-0.5 rounded bg-purple-500/20 text-purple-300 font-mono text-[10px]">
                    Thought Collider
                  </span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  <strong>Skenario:</strong> Kamu merasa serba salah: jika kerja terlalu keras kamu merasa stres dan kehilangan waktu, tetapi jika terlalu santai kamu takut tertinggal dan gagal.
                </p>
                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-[11px] space-y-1.5">
                  <div className="text-slate-200">
                    <strong>Cara Pakai:</strong> Buka <em>Thought Collider</em> ➔ Pilih Ide A: <code>Deep Work & Kecepatan</code> dan Ide B: <code>Zen Stoicism</code> ➔ Klik <strong>Picu Tabrakan Dialektika</strong>.
                  </div>
                  <div className="text-purple-300 pt-1 border-t border-slate-800">
                    <strong>Hasil Sintesis:</strong> Lahir konsep <em>"Dynamic Stillness"</em> (Wu Wei Produktif): Bekerja dengan fokus murni 90 menit tanpa distraksi dan tanpa rasa cemas, lalu dekompresi total tanpa layar.
                  </div>
                  <div className="text-emerald-400 text-[10px] font-mono">
                    ✔ Tekan "Manifestasikan sebagai Bintang Baru" untuk menjadikannya prinsip hidup permanen di semestamu!
                  </div>
                </div>
              </div>

              {/* Example 2 */}
              <div className="bg-slate-950/70 p-4 rounded-xl border border-rose-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-rose-400 uppercase tracking-wider flex items-center space-x-1">
                    <CircleDot size={14} className="mr-1" />
                    Studi Kasus 2: Melepaskan Beban Overthinking & Rasa Cemas
                  </span>
                  <span className="px-2 py-0.5 rounded bg-rose-500/20 text-rose-300 font-mono text-[10px]">
                    Singularity Purifier
                  </span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  <strong>Skenario:</strong> Pikiranmu dipenuhi kecemasan seperti <em>"Bagaimana kalau saya gagal interview besok?"</em> atau penyesalan masa lalu yang terus menghantui.
                </p>
                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-[11px] space-y-1.5">
                  <div className="text-slate-200">
                    <strong>Cara Pakai:</strong> Buat entitas baru (tipe Asteroid/Bulan) berisi kecemasan tersebut ➔ Klik & seret simpul tersebut langsung ke <strong>Pusat Lubang Hitam (0, 0)</strong> di tengah layar ➔ Lepaskan!
                  </div>
                  <div className="text-rose-300 pt-1 border-t border-slate-800">
                    <strong>Hasil Katarsis:</strong> Simpul tersedot ke horizon peristiwa dengan suara hisapan kosmik, diikuti alunan nada katarsis 528 Hz (frekuensi ketenangan batin). Beban terhapus dan kamu dihadiahi <em>Stardust</em>.
                  </div>
                </div>
              </div>

              {/* Example 3 */}
              <div className="bg-slate-950/70 p-4 rounded-xl border border-cyan-500/30 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] font-bold text-cyan-400 uppercase tracking-wider flex items-center space-x-1">
                    <GitFork size={14} className="mr-1" />
                    Studi Kasus 3: Memetakan Pilihan Hidup (Multiverse Sandbox)
                  </span>
                  <span className="px-2 py-0.5 rounded bg-cyan-500/20 text-cyan-300 font-mono text-[10px]">
                    Multiverse
                  </span>
                </div>
                <p className="text-slate-300 text-[11px]">
                  <strong>Skenario:</strong> Kamu bingung antara tetap bekerja di kantor saat ini atau beralih 100% menjadi Digital Nomad / Kreator Independen.
                </p>
                <div className="bg-slate-900/60 p-3 rounded-lg border border-slate-800 text-[11px] space-y-1.5">
                  <div className="text-slate-200">
                    <strong>Cara Pakai:</strong> Buka tombol <strong>Multiverse</strong> ➔ Buat cabang baru: <em>"Timeline Beta: Full Digital Nomad"</em>.
                  </div>
                  <div className="text-cyan-300 pt-1 border-t border-slate-800">
                    <strong>Keuntungan:</strong> Kamu bisa memetakan ide-ide proyek dan rencana di Timeline Beta tanpa mengacaukan susunan pikiran di Timeline Utama (Prime Reality).
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: STEP-BY-STEP QUICK START */}
          {activeTab === 'quickstart' && (
            <div className="space-y-3.5 text-xs text-slate-300 font-sans leading-relaxed">
              <div className="flex items-start space-x-3 bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-mono font-bold shrink-0 text-xs">
                  1
                </div>
                <div>
                  <h5 className="font-bold text-slate-100 font-mono">Jelajahi Ruang Semesta</h5>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Klik dan geser (drag) latar belakang untuk menggerakkan kamera. Putar roda mouse (scroll) untuk zoom in / zoom out secara mulus.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-mono font-bold shrink-0 text-xs">
                  2
                </div>
                <div>
                  <h5 className="font-bold text-slate-100 font-mono">Buat Entitas Pemikiran Baru (+ Entitas Baru)</h5>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Pilih tipe astronomis yang sesuai:
                  </p>
                  <div className="grid grid-cols-2 gap-2 mt-2 font-mono text-[10px]">
                    <span className="p-1.5 rounded bg-slate-900 text-amber-300 border border-amber-500/20">⭐ Bintang = Nilai Inti Hidup</span>
                    <span className="p-1.5 rounded bg-slate-900 text-cyan-300 border border-cyan-500/20">🪐 Planet = Proyek / Topik Besar</span>
                    <span className="p-1.5 rounded bg-slate-900 text-purple-300 border border-purple-500/20">🌙 Bulan = Kebiasaan / Aksi Harian</span>
                    <span className="p-1.5 rounded bg-slate-900 text-rose-300 border border-rose-500/20">🚨 Pulsar = Pengingat Waktu Krusial</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-mono font-bold shrink-0 text-xs">
                  3
                </div>
                <div>
                  <h5 className="font-bold text-slate-100 font-mono">Buka Thought Collider & Tabrakkan Ide</h5>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Klik tombol ungu <strong>Thought Collider</strong> di atas. Pilih dua ide yang bertentangan atau unik. Klik tombol akselerasi dan amati sintesis inovasi baru yang lahir!
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-mono font-bold shrink-0 text-xs">
                  4
                </div>
                <div>
                  <h5 className="font-bold text-slate-100 font-mono">Purifikasi di Pusat Singularitas</h5>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Tarik pikiran beracun atau overthinking langsung ke lubang hitam di koordinat `[0, 0]` untuk dibakar menjadi energi stardust bersih.
                  </p>
                </div>
              </div>

              <div className="flex items-start space-x-3 bg-slate-950/50 p-3.5 rounded-xl border border-slate-800">
                <div className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 flex items-center justify-center font-mono font-bold shrink-0 text-xs">
                  5
                </div>
                <div>
                  <h5 className="font-bold text-slate-100 font-mono">Aktifkan Audio Kosmik (Ikon Speaker)</h5>
                  <p className="text-slate-400 text-[11px] mt-0.5">
                    Nyalakan suara di pojok kanan atas untuk mendengarkan alunan musik *theta binaural drone* yang menenangkan pikiranmu saat bekerja atau berkontemplasi.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: CONTROLS & SHORTCUTS */}
          {activeTab === 'controls' && (
            <div className="space-y-3.5 text-xs text-slate-300 font-sans leading-relaxed">
              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2.5">
                <h5 className="font-bold text-slate-100 font-mono text-sm text-cyan-300">Pintasan Keyboard:</h5>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px] font-mono">
                  <div className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-slate-400">Jeda / Lanjutkan Gravitasi:</span>
                    <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded font-bold">[ Space ]</span>
                  </div>
                  <div className="flex justify-between items-center bg-slate-900/80 p-2.5 rounded-lg border border-slate-800">
                    <span className="text-slate-400">Tutup Modal / Batal:</span>
                    <span className="px-2 py-0.5 bg-cyan-500/20 text-cyan-300 rounded font-bold">[ Esc ]</span>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-2">
                <h5 className="font-bold text-slate-100 font-mono text-sm text-purple-300">Interaksi Mouse & Sentuh:</h5>
                <ul className="space-y-1.5 text-[11px] text-slate-400">
                  <li>• <strong>Klik Kiri Simpul:</strong> Membuka panel detail (Inspektor) untuk mengedit isi, massa gravitasi, frekuensi suara, atau membuat kaitan.</li>
                  <li>• <strong>Klik & Tahan (Drag) Simpul:</strong> Memindahkan posisi atau melemparnya dengan momentum fisik.</li>
                  <li>• <strong>Drag ke Titik Tengah:</strong> Memasukkan simpul ke lubang hitam singularitas.</li>
                  <li>• <strong>Scroll Mouse:</strong> Melakukan zoom in dan zoom out yang mulus ke arah kursor.</li>
                </ul>
              </div>

              <div className="bg-slate-950/60 p-4 rounded-xl border border-slate-800 space-y-1">
                <h5 className="font-bold text-slate-100 font-mono text-sm text-amber-300">Penyimpanan & Privasi:</h5>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  Semua data pikiran dan konstelasi tersimpan 100% aman dan privat di perambanmu (LocalStorage). Kamu dapat mengekspor seluruh semesta ke format <strong>JSON</strong> atau <strong>Markdown</strong> kapan saja lewat tombol Unduh di navigasi atas.
                </p>
              </div>
            </div>
          )}
        </GlassPanel>
      </div>
    </div>
  );
};
