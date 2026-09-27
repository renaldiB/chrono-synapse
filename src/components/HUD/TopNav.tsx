import React, { useState } from 'react';
import { 
  Zap, 
  CircleDot, 
  Plus, 
  Volume2, 
  VolumeX, 
  Play, 
  Pause, 
  GitFork, 
  Download, 
  HelpCircle,
  Sparkles,
  Menu,
  X,
  RotateCcw
} from 'lucide-react';
import { Timeline } from '../../types/cosmos';
import { CosmicSelect } from '../Common/CosmicSelect';

interface TopNavProps {
  timelines: Timeline[];
  activeTimelineId: string;
  onSelectTimeline: (id: string) => void;
  onOpenTimelineManager: () => void;
  onOpenCollider: () => void;
  onOpenSingularity: () => void;
  onOpenCreateNode: () => void;
  onOpenExport: () => void;
  onOpenHelp: () => void;
  onOpenReset: () => void;
  isAudioMuted: boolean;
  onToggleAudio: () => void;
  isPhysicsPaused: boolean;
  onTogglePhysics: () => void;
  stardustTotal: number;
}

export const TopNav: React.FC<TopNavProps> = ({
  timelines,
  activeTimelineId,
  onSelectTimeline,
  onOpenTimelineManager,
  onOpenCollider,
  onOpenSingularity,
  onOpenCreateNode,
  onOpenExport,
  onOpenHelp,
  onOpenReset,
  isAudioMuted,
  onToggleAudio,
  isPhysicsPaused,
  onTogglePhysics,
  stardustTotal,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* TOP HEADER BAR */}
      <header className="absolute top-2.5 sm:top-4 left-2.5 sm:left-4 right-2.5 sm:right-4 z-30 pointer-events-none">
        <div className="w-full max-w-[1750px] mx-auto flex items-center justify-between gap-3">
          
          {/* =========================================
              CLUSTER 1: BRAND IDENTITY & TIMELINE
             ========================================= */}
          <div className="flex items-center gap-1.5 sm:gap-3 pointer-events-auto shrink-0">
            {/* Logo Card */}
            <div className="cosmic-glass px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-2xl flex items-center gap-2 border border-cyan-500/25 shadow-lg">
              <div className="relative flex items-center justify-center w-6 h-6 sm:w-8 sm:h-8 rounded-xl bg-gradient-to-tr from-cyan-600 via-indigo-600 to-fuchsia-500 shadow-md shrink-0">
                <Sparkles size={14} className="text-white" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="font-extrabold text-xs sm:text-sm tracking-wider font-mono bg-gradient-to-r from-cyan-300 via-sky-200 to-indigo-300 bg-clip-text text-transparent">
                    <span className="sm:hidden">CHRONO</span>
                    <span className="hidden sm:inline">CHRONO-SYNAPSE</span>
                  </h1>
                  <span className="hidden xl:inline-block text-[9px] font-mono px-1.5 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30">
                    v1.0
                  </span>
                </div>
                <p className="hidden md:block text-[9px] sm:text-[10px] text-slate-400 font-medium">
                  The Anti-Gravity Thought Collider
                </p>
              </div>
            </div>

            {/* Timeline Selector Pill */}
            <div className="cosmic-glass px-2 sm:px-2.5 py-1.5 rounded-2xl flex items-center gap-1.5 border border-slate-700/60 shadow-lg">
              <GitFork size={13} className="text-emerald-400 shrink-0 hidden sm:block" />
              <CosmicSelect
                options={timelines.map(t => ({
                  value: t.id,
                  label: t.name,
                  color: t.color,
                }))}
                value={activeTimelineId}
                onChange={onSelectTimeline}
                className="w-28 sm:w-44 lg:w-48 text-[11px]"
                variant="cyan"
              />
              <button
                onClick={onOpenTimelineManager}
                className="hidden sm:inline-flex text-[10px] sm:text-[11px] font-mono px-2 py-1 rounded-lg bg-emerald-500/10 hover:bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 transition-all shrink-0"
                title="Kelola Percabangan Multiverse"
              >
                Multiverse
              </button>
            </div>
          </div>

          {/* =========================================
              CLUSTER 2: PRIMARY ACTION CHAMBERS (DESKTOP & LAPTOP)
             ========================================= */}
          <div className="hidden lg:flex items-center gap-2 pointer-events-auto bg-slate-950/70 p-1.5 rounded-2xl border border-slate-800/80 shadow-xl backdrop-blur-md">
            {/* Thought Collider */}
            <button
              onClick={onOpenCollider}
              className="group px-3 py-1.5 rounded-xl flex items-center gap-2 bg-purple-950/30 hover:bg-purple-900/40 border border-purple-500/35 hover:border-purple-400 text-purple-200 transition-all active:scale-95 shadow-sm"
              title="Akselerasikan dan tabrakkan 2 ide"
            >
              <div className="w-6 h-6 rounded-lg bg-purple-500/20 flex items-center justify-center text-purple-300 group-hover:scale-110 transition-transform">
                <Zap size={14} />
              </div>
              <div className="text-left">
                <span className="block text-[11px] font-bold font-mono tracking-wider text-purple-200">
                  COLLIDER
                </span>
                <span className="hidden xl:block text-[9px] text-purple-300/70 font-mono">Tabrakkan Ide</span>
              </div>
            </button>

            {/* Singularity Horizon */}
            <button
              onClick={onOpenSingularity}
              className="group px-3 py-1.5 rounded-xl flex items-center gap-2 bg-rose-950/30 hover:bg-rose-900/40 border border-rose-500/35 hover:border-rose-400 text-rose-200 transition-all active:scale-95 shadow-sm"
              title="Purifikasi beban mental di lubang hitam"
            >
              <div className="w-6 h-6 rounded-lg bg-rose-500/20 flex items-center justify-center text-rose-400 group-hover:scale-110 transition-transform">
                <CircleDot size={14} />
              </div>
              <div className="text-left">
                <span className="block text-[11px] font-bold font-mono tracking-wider text-rose-200">
                  SINGULARITY
                </span>
                <span className="hidden xl:block text-[9px] text-rose-300/70 font-mono">Purifikasi</span>
              </div>
            </button>

            {/* Add New Entity */}
            <button
              onClick={onOpenCreateNode}
              className="group px-3.5 py-1.5 rounded-xl flex items-center gap-1.5 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/40 hover:border-cyan-400 text-cyan-200 transition-all active:scale-95 shadow-sm"
              title="Tambahkan bintang, planet, atau asteroid baru"
            >
              <Plus size={15} className="text-cyan-300 group-hover:rotate-90 transition-transform duration-300" />
              <span className="text-[11px] font-bold font-mono tracking-wide text-cyan-200">
                + Entitas Baru
              </span>
            </button>
          </div>

          {/* =========================================
              CLUSTER 3: TELEMETRY, UTILITIES & GUIDE
             ========================================= */}
          <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto shrink-0">
            {/* Stardust Stash */}
            <div className="cosmic-glass px-2.5 sm:px-3 py-1 sm:py-1.5 rounded-2xl flex items-center gap-1 border border-amber-500/30">
              <Sparkles size={13} className="text-amber-400" />
              <div className="font-mono text-[11px] sm:text-xs">
                <span className="font-bold text-amber-300">{stardustTotal}</span>
                <span className="text-[9px] text-amber-400/70 ml-0.5">✧</span>
              </div>
            </div>

            {/* Audio Toggle (Desktop & Tablet) */}
            <button
              onClick={onToggleAudio}
              className={`hidden md:flex cosmic-glass p-2 sm:p-2.5 rounded-2xl border transition-all items-center justify-center ${
                isAudioMuted 
                  ? 'border-slate-700 text-slate-400 hover:text-slate-200' 
                  : 'border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(6,182,212,0.4)]'
              }`}
              title={isAudioMuted ? 'Nyalakan Audio Kosmik Prosedural' : 'Matikan Audio'}
            >
              {isAudioMuted ? (
                <VolumeX size={15} />
              ) : (
                <div className="flex items-center space-x-1">
                  <Volume2 size={15} />
                  <span className="flex space-x-0.5 items-end h-2.5 w-2.5">
                    <span className="w-0.5 bg-cyan-400 h-full animate-pulse"></span>
                    <span className="w-0.5 bg-cyan-400 h-2/3 animate-pulse"></span>
                  </span>
                </div>
              )}
            </button>

            {/* Physics Pause Toggle */}
            <button
              onClick={onTogglePhysics}
              className={`hidden md:flex cosmic-glass p-2.5 rounded-2xl border transition-all items-center justify-center ${
                isPhysicsPaused 
                  ? 'border-amber-400 text-amber-300 shadow-[0_0_12px_rgba(245,158,11,0.4)]' 
                  : 'border-slate-700 text-slate-300 hover:text-white'
              }`}
              title={isPhysicsPaused ? 'Lanjutkan Gravitasi (Spasi)' : 'Jeda Gravitasi (Spasi)'}
            >
              {isPhysicsPaused ? <Play size={15} /> : <Pause size={15} />}
            </button>

            {/* Export / Backup */}
            <button
              onClick={onOpenExport}
              className="hidden md:flex cosmic-glass p-2.5 rounded-2xl border border-slate-700 hover:border-slate-500 text-slate-300 hover:text-white transition-all items-center justify-center"
              title="Ekspor Semesta / Simpan Peta"
            >
              <Download size={15} />
            </button>

            {/* Guide & Codex Button (Desktop & Tablet) */}
            <button
              onClick={onOpenHelp}
              className="hidden md:flex cosmic-glass px-3 py-2 rounded-2xl border border-cyan-500/40 hover:border-cyan-400 text-cyan-300 hover:text-white transition-all items-center gap-1.5 shadow-md active:scale-95"
              title="Panduan, Fungsi & Contoh Nyata Aplikasi"
            >
              <HelpCircle size={15} className="text-cyan-400 shrink-0" />
              <span className="text-xs font-mono font-bold tracking-wide">Panduan</span>
            </button>

            {/* Reset Button (Desktop & Tablet) */}
            <button
              onClick={onOpenReset}
              className="hidden md:flex cosmic-glass px-2.5 py-2 rounded-2xl border border-rose-500/30 hover:border-rose-400 text-rose-400 hover:text-white transition-all items-center gap-1.5 shadow-md active:scale-95"
              title="Reset Semesta (Hapus Semua Data Termasuk Dummy)"
            >
              <RotateCcw size={14} className="shrink-0" />
              <span className="text-xs font-mono font-bold tracking-wide hidden xl:inline">Reset</span>
            </button>

            {/* Mobile / Tablet Menu Button (For Extra Tools on small screens) */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden cosmic-glass p-2 rounded-2xl border border-slate-700 text-slate-200 hover:text-white transition-all flex items-center justify-center"
              title="Menu Alat Tambahan"
            >
              {isMobileMenuOpen ? <X size={15} /> : <Menu size={15} />}
            </button>
          </div>
        </div>

        {/* MOBILE / TABLET EXPANDED OVERFLOW PANEL */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-2 p-3 rounded-2xl bg-slate-950/95 border border-slate-800 shadow-2xl backdrop-blur-xl pointer-events-auto max-w-sm ml-auto animate-fadeIn">
            <div className="space-y-2">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs font-mono">
                <span className="text-slate-400">Total Stardust:</span>
                <span className="text-amber-400 font-bold">{stardustTotal} ✧</span>
              </div>

              {/* Action Buttons for Mobile/Tablet in Menu */}
              <button
                onClick={() => {
                  onOpenCollider();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full px-3 py-2 rounded-xl flex items-center gap-2.5 bg-purple-950/40 border border-purple-500/40 text-purple-200 text-xs font-mono font-bold"
              >
                <Zap size={15} className="text-purple-400" />
                <span>The Thought Collider</span>
              </button>

              <button
                onClick={() => {
                  onOpenSingularity();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full px-3 py-2 rounded-xl flex items-center gap-2.5 bg-rose-950/40 border border-rose-500/40 text-rose-200 text-xs font-mono font-bold"
              >
                <CircleDot size={15} className="text-rose-400" />
                <span>Singularity Horizon</span>
              </button>

              <button
                onClick={() => {
                  onOpenCreateNode();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full px-3 py-2 rounded-xl flex items-center gap-2.5 bg-cyan-950/40 border border-cyan-500/40 text-cyan-200 text-xs font-mono font-bold"
              >
                <Plus size={15} className="text-cyan-400" />
                <span>+ Buat Entitas Baru</span>
              </button>

              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800">
                <button
                  onClick={() => {
                    onTogglePhysics();
                  }}
                  className="px-2.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono flex items-center justify-center gap-1.5"
                >
                  {isPhysicsPaused ? <Play size={14} /> : <Pause size={14} />}
                  <span>{isPhysicsPaused ? 'Play Fisika' : 'Pause Fisika'}</span>
                </button>

                <button
                  onClick={() => {
                    onOpenExport();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 text-xs font-mono flex items-center justify-center gap-1.5"
                >
                  <Download size={14} />
                  <span>Ekspor Data</span>
                </button>
              </div>

              <button
                onClick={() => {
                  onOpenTimelineManager();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-emerald-500/30 text-emerald-300 text-xs font-mono flex items-center justify-center gap-1.5"
              >
                <GitFork size={14} />
                <span>Kelola Percabangan Multiverse</span>
              </button>

              <button
                onClick={() => {
                  onOpenReset();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full px-3 py-2 rounded-xl bg-rose-950/40 border border-rose-500/40 hover:bg-rose-900/40 text-rose-300 text-xs font-mono font-bold flex items-center justify-center gap-1.5 transition-colors"
              >
                <RotateCcw size={14} />
                <span>Reset Semesta (Hapus Semua Data)</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =========================================
          MOBILE FLOATING ACTION DOCK (THUMB-FRIENDLY ON PHONES < 768px)
         ========================================= */}
      <nav className="md:hidden fixed bottom-3 left-3 right-3 z-30 pointer-events-auto">
        <div className="cosmic-glass px-4 py-2 rounded-2xl border border-slate-700/80 shadow-2xl flex items-center justify-around max-w-md mx-auto">
          {/* Collider */}
          <button
            onClick={onOpenCollider}
            className="flex flex-col items-center gap-1 text-purple-400 p-1.5 active:scale-90 transition-transform"
            title="Thought Collider"
          >
            <Zap size={18} />
            <span className="text-[9px] font-mono font-semibold">Collider</span>
          </button>

          {/* Singularity */}
          <button
            onClick={onOpenSingularity}
            className="flex flex-col items-center gap-1 text-rose-400 p-1.5 active:scale-90 transition-transform"
            title="Singularity"
          >
            <CircleDot size={18} />
            <span className="text-[9px] font-mono font-semibold">Horizon</span>
          </button>

          {/* Central Hero Add Button */}
          <button
            onClick={onOpenCreateNode}
            className="w-11 h-11 rounded-full bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white flex items-center justify-center shadow-[0_0_15px_rgba(6,182,212,0.5)] active:scale-90 transition-transform -mt-4 border-2 border-[#03050c]"
            title="Tambah Entitas"
          >
            <Plus size={22} />
          </button>

          {/* Audio */}
          <button
            onClick={onToggleAudio}
            className={`flex flex-col items-center gap-1 p-1.5 active:scale-90 transition-transform ${isAudioMuted ? 'text-slate-400' : 'text-cyan-300'}`}
            title="Audio"
          >
            {isAudioMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
            <span className="text-[9px] font-mono font-semibold">Audio</span>
          </button>

          {/* Guide */}
          <button
            onClick={onOpenHelp}
            className="flex flex-col items-center gap-1 text-cyan-400 p-1.5 active:scale-90 transition-transform"
            title="Panduan"
          >
            <HelpCircle size={18} />
            <span className="text-[9px] font-mono font-semibold">Panduan</span>
          </button>
        </div>
      </nav>
    </>
  );
};
