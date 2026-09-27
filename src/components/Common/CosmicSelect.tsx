import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export interface OptionItem {
  value: string;
  label: string;
  subtitle?: string;
  badge?: string;
  color?: string;
}

interface CosmicSelectProps {
  options: OptionItem[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
  variant?: 'cyan' | 'purple' | 'rose' | 'slate';
}

export const CosmicSelect: React.FC<CosmicSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Pilih...',
  className = '',
  variant = 'cyan',
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const selectedOption = options.find(o => o.value === value);

  // Close when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const borderColors = {
    cyan: 'border-cyan-500/30 hover:border-cyan-400 focus:border-cyan-400',
    purple: 'border-purple-500/30 hover:border-purple-400 focus:border-purple-400',
    rose: 'border-rose-500/30 hover:border-rose-400 focus:border-rose-400',
    slate: 'border-slate-700/60 hover:border-slate-500 focus:border-slate-500',
  };

  return (
    <div ref={containerRef} className={`relative select-none text-xs font-mono ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className={`w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-900/90 border ${borderColors[variant]} text-slate-200 transition-all focus:outline-none`}
      >
        <span className="truncate pr-2 font-medium">
          {selectedOption ? selectedOption.label : placeholder}
        </span>
        <ChevronDown
          size={14}
          className={`text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-cyan-300' : ''}`}
        />
      </button>

      {/* Dropdown Menu (Inline GPU composited, zero OS-level flicker) */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 max-h-56 overflow-y-auto rounded-xl bg-[#0b1226] border border-slate-700 shadow-2xl p-1 will-change-transform animate-fadeIn">
          {options.map(option => {
            const isSelected = option.value === value;
            return (
              <div
                key={option.value}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                  isSelected
                    ? 'bg-cyan-500/20 text-cyan-200 font-bold'
                    : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
                }`}
              >
                <div className="flex items-center space-x-2 truncate">
                  {option.color && (
                    <span
                      className="w-2 h-2 rounded-full shrink-0"
                      style={{ backgroundColor: option.color }}
                    />
                  )}
                  <div className="truncate">
                    <div className="truncate">{option.label}</div>
                    {option.subtitle && (
                      <div className="text-[10px] text-slate-500 truncate">{option.subtitle}</div>
                    )}
                  </div>
                </div>

                {isSelected && <Check size={14} className="text-cyan-400 shrink-0 ml-2" />}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};
