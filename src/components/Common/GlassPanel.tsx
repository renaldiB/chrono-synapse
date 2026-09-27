import React from 'react';
import { X } from 'lucide-react';

interface GlassPanelProps {
  title?: string;
  subtitle?: string;
  icon?: React.ReactNode;
  onClose?: () => void;
  children: React.ReactNode;
  className?: string;
  variant?: 'cyan' | 'purple' | 'rose' | 'amber';
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
  const borderVariants = {
    cyan: 'border-cyan-500/30 shadow-[0_0_25px_-5px_rgba(6,182,212,0.25)]',
    purple: 'border-purple-500/30 shadow-[0_0_25px_-5px_rgba(168,85,247,0.25)]',
    rose: 'border-rose-500/30 shadow-[0_0_25px_-5px_rgba(244,63,94,0.25)]',
    amber: 'border-amber-500/30 shadow-[0_0_25px_-5px_rgba(245,158,11,0.25)]',
  };

  const headerColors = {
    cyan: 'text-cyan-400',
    purple: 'text-purple-400',
    rose: 'text-rose-400',
    amber: 'text-amber-400',
  };

  return (
    <div className={`cosmic-glass rounded-2xl p-5 border ${borderVariants[variant]} ${className}`}>
      {(title || onClose) && (
        <div className="flex items-center justify-between pb-3.5 mb-4 border-b border-slate-800/80">
          <div className="flex items-center space-x-3">
            {icon && <div className={`${headerColors[variant]} flex items-center justify-center`}>{icon}</div>}
            <div>
              {title && <h3 className="font-bold text-sm tracking-wider uppercase text-slate-100 font-mono">{title}</h3>}
              {subtitle && <p className="text-xs text-slate-400 mt-0.5">{subtitle}</p>}
            </div>
          </div>
          {onClose && (
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800/60 transition-colors"
              title="Tutup"
            >
              <X size={18} />
            </button>
          )}
        </div>
      )}
      {children}
    </div>
  );
};
