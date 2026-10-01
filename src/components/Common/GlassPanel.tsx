import React from 'react';
import { X } from 'lucide-react';

interface GlassPanelProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'cyan' | 'purple' | 'rose' | 'amber' | 'sky';
}

export const GlassPanel: React.FC<GlassPanelProps> = ({
  title,
  subtitle,
  icon,
  onClose,
  children,
  className = '',
  variant = 'cyan',
}) => {
  const isDanger = variant === 'rose';

  return (
    <div
      className={`rounded-2xl p-5 border bg-slate-900/95 shadow-xl transition-all duration-150 ${
        isDanger ? 'border-rose-500/30' : 'border-slate-800'
      } ${className}`}
    >
      {(title || onClose) && (
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800/80">
          <div className="flex items-center space-x-3">
            {icon && (
              <div
                className={`flex items-center justify-center p-2 rounded-xl border ${
                  isDanger
                    ? 'bg-rose-500/10 border-rose-500/20 text-rose-400'
                    : 'bg-sky-500/10 border-sky-500/20 text-sky-400'
                }`}
              >
                {icon}
              </div>
            )}
            <div>
              {title && (
                <h3 className="font-semibold text-sm tracking-normal text-slate-100 font-sans">
                  {title}
                </h3>
              )}
              {subtitle && (
                <p className="text-xs font-normal text-slate-400 mt-0.5 leading-relaxed">
                  {subtitle}
                </p>
              )}
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-slate-200 p-1.5 rounded-lg hover:bg-slate-800/60 active:scale-95 transition-all duration-150"
              title="Tutup"
            >
              <X size={16} strokeWidth={2} />
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
