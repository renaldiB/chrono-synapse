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
            <div className="bg-slate-900/90 px-3 py-2 rounded-xl flex items-center gap-2.5 border border-slate-800 shadow-lg">
              <div className="flex items-center justify-center w-7 h-7 rounded-lg bg-sky-500/10 border border-sky-500/20 text-sky-400 shrink-0">
                <Sparkles size={15} strokeWidth={2} />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h1 className="font-semibold text-xs sm:text-sm tracking-tight text-slate-100">
                    <span className="sm:hidden">CHRONO</span>
                    <span className="hidden sm:inline">Chrono-Synapse</span>
                  </h1>
                  <span className="hidden xl:inline-block text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 border border-slate-700">
                    v1.0
                  </span>
                </div>
                <p className="hidden md:block text-[10px] text-slate-400 font-normal">
                  Sistem Pemikiran Kosmik Dialektika
                </p>
              </div>
            </div>

            {/* Timeline Selector Pill */}
            <div className="bg-slate-900/90 px-2.5 py-1.5 rounded-xl flex items-center gap-2 border border-slate-800 shadow-lg">
              <GitFork size={14} strokeWidth={2} className="text-slate-400 shrink-0 hidden sm:block" />
              <CosmicSelect
                options={timelines.map(t => ({
                  value: t.id,
                  label: t.name,
                  color: t.color,
                }))}
                value={activeTimelineId}
                onChange={onSelectTimeline}
                className="w-28 sm:w-44 lg:w-48 text-[11px]"
              />
              <button
                onClick={onOpenTimelineManager}
                className="hidden sm:inline-flex text-[11px] font-medium px-2.5 py-1 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700/80 transition-all duration-150 active:scale-[0.98] shrink-0"
                title="Kelola Percabangan Multiverse"
              >
                Multiverse
              </button>
            </div>
          </div>

          {/* =========================================
              CLUSTER 2: PRIMARY ACTION CHAMBERS (DESKTOP & LAPTOP)
             ========================================= */}
          <div className="hidden lg:flex items-center gap-1.5 pointer-events-auto bg-slate-900/90 p-1.5 rounded-xl border border-slate-800 shadow-lg">
            {/* Thought Collider */}
            <button
              onClick={onOpenCollider}
              className="px-3 py-1.5 rounded-lg flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-slate-100 transition-all duration-150 active:scale-[0.98]"
              title="Akselerasikan dan tabrakkan 2 ide"
            >
              <Zap size={14} strokeWidth={2} className="text-sky-400" />
              <div className="text-left">
                <span className="block text-xs font-medium text-slate-200">
                  Collider
                </span>
              </div>
            </button>

            {/* Singularity Horizon */}
            <button
              onClick={onOpenSingularity}
              className="px-3 py-1.5 rounded-lg flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-slate-100 transition-all duration-150 active:scale-[0.98]"
              title="Purifikasi beban mental di lubang hitam"
            >
              <CircleDot size={14} strokeWidth={2} className="text-rose-400" />
              <div className="text-left">
                <span className="block text-xs font-medium text-slate-200">
                  Singularity
                </span>
              </div>
            </button>

            {/* Key Focal Point CTA: Add New Entity */}
            <button
              onClick={onOpenCreateNode}
              className="px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 bg-sky-500 hover:bg-sky-400 text-white font-medium transition-all duration-150 active:scale-[0.98] shadow-sm ml-1"
              title="Tambahkan bintang, planet, atau asteroid baru"
            >
              <Plus size={15} strokeWidth={2} />
              <span className="text-xs">
                Entitas Baru
              </span>
            </button>
          </div>

          {/* =========================================
              CLUSTER 3: TELEMETRY, UTILITIES & GUIDE
             ========================================= */}
          <div className="flex items-center gap-1.5 sm:gap-2 pointer-events-auto shrink-0">
            {/* Stardust Stash */}
            <div className="bg-slate-900/90 px-3 py-1.5 rounded-xl flex items-center gap-1.5 border border-slate-800 shadow-lg">
              <Sparkles size={13} strokeWidth={2} className="text-amber-400" />
              <div className="text-xs flex items-center gap-1">
                <span className="font-semibold text-slate-200">{stardustTotal}</span>
                <span className="text-[10px] text-slate-500 font-normal">Stardust</span>
              </div>
            </div>

            {/* Audio Toggle (Desktop & Tablet) */}
            <button
              onClick={onToggleAudio}
              className={`hidden md:flex bg-slate-900/90 p-2 sm:p-2.5 rounded-xl border transition-all duration-150 items-center justify-center active:scale-[0.98] ${
                isAudioMuted 
                  ? 'border-slate-800 text-slate-500 hover:text-slate-300' 
                  : 'border-sky-500/50 text-sky-400 bg-sky-500/10'
              }`}
              title={isAudioMuted ? 'Nyalakan Audio Prosedural' : 'Matikan Audio'}
            >
              {isAudioMuted ? <VolumeX size={15} strokeWidth={2} /> : <Volume2 size={15} strokeWidth={2} />}
            </button>

            {/* Physics Pause Toggle */}
            <button
              onClick={onTogglePhysics}
              className={`hidden md:flex bg-slate-900/90 p-2.5 rounded-xl border transition-all duration-150 items-center justify-center active:scale-[0.98] ${
                isPhysicsPaused 
                  ? 'border-amber-500/50 text-amber-400 bg-amber-500/10' 
                  : 'border-slate-800 text-slate-400 hover:text-slate-200'
              }`}
              title={isPhysicsPaused ? 'Lanjutkan Gravitasi (Spasi)' : 'Jeda Gravitasi (Spasi)'}
            >
              {isPhysicsPaused ? <Play size={15} strokeWidth={2} /> : <Pause size={15} strokeWidth={2} />}
            </button>

            {/* Export / Backup */}
            <button
              onClick={onOpenExport}
              className="hidden md:flex bg-slate-900/90 p-2.5 rounded-xl border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 transition-all duration-150 active:scale-[0.98] items-center justify-center"
              title="Ekspor Semesta / Simpan Peta"
            >
              <Download size={15} strokeWidth={2} />
            </button>

            {/* Guide & Codex Button (Desktop & Tablet) */}
            <button
              onClick={onOpenHelp}
              className="hidden md:flex bg-slate-900/90 px-3 py-2 rounded-xl border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-slate-100 transition-all duration-150 items-center gap-1.5 active:scale-[0.98]"
              title="Panduan, Fungsi & Contoh Nyata Aplikasi"
            >
              <HelpCircle size={15} strokeWidth={2} className="text-slate-400" />
              <span className="text-xs font-medium">Panduan</span>
            </button>

            {/* Reset Button (Desktop & Tablet) */}
            <button
              onClick={onOpenReset}
              className="hidden md:flex bg-slate-900/90 px-2.5 py-2 rounded-xl border border-slate-800 hover:border-rose-500/40 text-slate-400 hover:text-rose-400 transition-all duration-150 items-center gap-1.5 active:scale-[0.98]"
              title="Reset Semesta (Hapus Semua Data)"
            >
              <RotateCcw size={14} strokeWidth={2} />
              <span className="text-xs font-medium hidden xl:inline">Reset</span>
            </button>

            {/* Mobile / Tablet Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden bg-slate-900/90 p-2 rounded-xl border border-slate-800 text-slate-300 hover:text-white transition-all duration-150 flex items-center justify-center active:scale-[0.98]"
              title="Menu Alat Tambahan"
            >
              {isMobileMenuOpen ? <X size={16} strokeWidth={2} /> : <Menu size={16} strokeWidth={2} />}
            </button>
          </div>
        </div>

        {/* MOBILE / TABLET EXPANDED OVERFLOW PANEL */}
        {isMobileMenuOpen && (
          <div className="lg:hidden mt-2 p-3.5 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl pointer-events-auto max-w-sm ml-auto animate-fadeIn">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between pb-2 border-b border-slate-800 text-xs">
                <span className="text-slate-400 font-normal">Total Stardust:</span>
                <span className="text-amber-400 font-semibold">{stardustTotal}</span>
              </div>

              {/* Mobile Quick Action Buttons */}
              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onOpenCollider();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all duration-150"
                >
                  <Zap size={14} strokeWidth={2} className="text-sky-400" />
                  <span>Collider</span>
                </button>

                <button
                  onClick={() => {
                    onOpenSingularity();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 hover:text-white text-xs font-medium flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all duration-150"
                >
                  <CircleDot size={14} strokeWidth={2} className="text-rose-400" />
                  <span>Singularity</span>
                </button>
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={() => {
                    onTogglePhysics();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 text-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all duration-150"
                >
                  {isPhysicsPaused ? <Play size={14} strokeWidth={2} /> : <Pause size={14} strokeWidth={2} />}
                  <span>{isPhysicsPaused ? 'Play Fisika' : 'Pause Fisika'}</span>
                </button>

                <button
                  onClick={() => {
                    onOpenExport();
                    setIsMobileMenuOpen(false);
                  }}
                  className="px-2.5 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-400 text-xs flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all duration-150"
                >
                  <Download size={14} strokeWidth={2} />
                  <span>Ekspor Data</span>
                </button>
              </div>

              <button
                onClick={() => {
                  onOpenTimelineManager();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full px-3 py-2 rounded-lg bg-slate-950 border border-slate-800 text-slate-300 text-xs font-medium flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all duration-150"
              >
                <GitFork size={14} strokeWidth={2} className="text-slate-400" />
                <span>Kelola Multiverse</span>
              </button>

              <button
                onClick={() => {
                  onOpenReset();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full px-3 py-2 rounded-lg bg-rose-500/10 border border-rose-500/20 hover:bg-rose-500/20 text-rose-400 text-xs font-medium flex items-center justify-center gap-1.5 active:scale-[0.98] transition-all duration-150"
              >
                <RotateCcw size={14} strokeWidth={2} />
                <span>Reset Semesta</span>
              </button>
            </div>
          </div>
        )}
      </header>

      {/* =========================================
          MOBILE FLOATING ACTION DOCK (THUMB-FRIENDLY ON PHONES < 768px)
         ========================================= */}
      <nav className="md:hidden fixed bottom-3 left-3 right-3 z-30 pointer-events-auto">
        <div className="bg-slate-900/95 px-4 py-2 rounded-2xl border border-slate-800 shadow-2xl flex items-center justify-around max-w-md mx-auto">
          {/* Collider */}
          <button
            onClick={onOpenCollider}
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-200 p-1.5 active:scale-[0.95] transition-all duration-150"
            title="Thought Collider"
          >
            <Zap size={18} strokeWidth={2} />
            <span className="text-[10px] font-normal">Collider</span>
          </button>

          {/* Singularity */}
          <button
            onClick={onOpenSingularity}
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-rose-400 p-1.5 active:scale-[0.95] transition-all duration-150"
            title="Singularity"
          >
            <CircleDot size={18} strokeWidth={2} />
            <span className="text-[10px] font-normal">Horizon</span>
          </button>

          {/* Key Focal Point CTA: Add Entity */}
          <button
            onClick={onOpenCreateNode}
            className="w-11 h-11 rounded-xl bg-sky-500 hover:bg-sky-400 text-white flex items-center justify-center shadow-lg active:scale-[0.95] transition-all duration-150 -mt-5 border-2 border-slate-950"
            title="Tambah Entitas"
          >
            <Plus size={20} strokeWidth={2.2} />
          </button>

          {/* Audio */}
          <button
            onClick={onToggleAudio}
            className={`flex flex-col items-center gap-1 p-1.5 active:scale-[0.95] transition-all duration-150 ${isAudioMuted ? 'text-slate-500' : 'text-sky-400'}`}
            title="Audio"
          >
            {isAudioMuted ? <VolumeX size={18} strokeWidth={2} /> : <Volume2 size={18} strokeWidth={2} />}
            <span className="text-[10px] font-normal">Audio</span>
          </button>

          {/* Guide */}
          <button
            onClick={onOpenHelp}
            className="flex flex-col items-center gap-1 text-slate-400 hover:text-slate-200 p-1.5 active:scale-[0.95] transition-all duration-150"
            title="Panduan"
          >
            <HelpCircle size={18} strokeWidth={2} />
            <span className="text-[10px] font-normal">Panduan</span>
          </button>
        </div>
      </nav>
    </>
  );
};
