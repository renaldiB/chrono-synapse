import React from 'react';
import { AlertTriangle, Trash2, RotateCcw } from 'lucide-react';
import { GlassPanel } from '../Common/GlassPanel';

interface ResetConfirmModalProps {
  onClose: () => void;
  onConfirmWipeAll: () => void;
  onRestoreDemo: () => void;
}

export const ResetConfirmModal: React.FC<ResetConfirmModalProps> = ({
  onClose,
  onConfirmWipeAll,
  onRestoreDemo,
}) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 animate-fadeIn">
      <div className="w-full max-w-md flex flex-col">
        <GlassPanel
          title="KONFIRMASI RESET DATA"
          subtitle="Pilih jenis pembersihan data semesta pemikiran"
          icon={<AlertTriangle size={18} strokeWidth={2} className="text-rose-400" />}
          onClose={onClose}
          variant="rose"
        >
          <div className="space-y-4 my-2 text-xs text-slate-300 font-sans">
            <div className="p-3 bg-rose-950/30 rounded-xl border border-rose-500/30 text-rose-200 leading-relaxed">
              <p className="font-semibold text-rose-300 flex items-center gap-1.5 mb-1 font-mono text-xs">
                <AlertTriangle size={14} strokeWidth={2} className="shrink-0" />
                Peringatan Tindakan Permanen
              </p>
              Tindakan ini akan menghapus semua simpul ide, kaitan entanglement, riwayat tabrakan, dan stardust yang tersimpan di browsermu.
            </div>

            <div className="space-y-2.5 pt-1">
              {/* Option 1: Primary Requested Action - Wipe All Including Dummy */}
              <button
                onClick={() => {
                  onConfirmWipeAll();
                  onClose();
                }}
                className="w-full p-3 rounded-xl bg-rose-600 hover:bg-rose-500 text-white font-mono font-medium text-xs tracking-wide transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2 group"
              >
                <Trash2 size={15} strokeWidth={2} />
                <span>Hapus Semua Data (Termasuk Dummy)</span>
              </button>
              <p className="text-[11px] text-slate-400 text-center italic">
                Semesta akan menjadi kosong bersih tanpa satu pun simpul contoh bawaan.
              </p>

              {/* Divider */}
              <div className="relative py-2 flex items-center justify-center">
                <div className="border-t border-slate-800 w-full"></div>
                <span className="bg-slate-900 px-2 text-[10px] font-mono text-slate-500 absolute">
                  ATAU
                </span>
              </div>

              {/* Option 2: Reset to sample demo data */}
              <button
                onClick={() => {
                  onRestoreDemo();
                  onClose();
                }}
                className="w-full p-2.5 rounded-xl bg-slate-900/80 hover:bg-slate-800 border border-slate-800 hover:border-slate-700 text-slate-300 font-mono text-xs transition-all duration-150 active:scale-[0.98] flex items-center justify-center gap-2"
              >
                <RotateCcw size={14} strokeWidth={2} />
                <span>Kembalikan ke Preset Awal (Demo Galaxy)</span>
              </button>
            </div>

            {/* Cancel Button */}
            <div className="pt-2 text-center">
              <button
                onClick={onClose}
                className="text-xs font-mono text-slate-400 hover:text-slate-200 transition-colors"
              >
                Batalkan
              </button>
            </div>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
};
