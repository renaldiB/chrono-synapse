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
  variant?: 'cyan' | 'purple' | 'rose' | 'slate' | 'sky';
}

export const CosmicSelect: React.FC<CosmicSelectProps> = ({
  options,
  value,
  onChange,
  placeholder = 'Pilih entitas kognitif...',
  className = '',
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

  return (
    <div ref={containerRef} className={`relative select-none text-xs ${className}`}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-200 transition-all duration-150 active:scale-[0.98] focus:outline-none focus:border-sky-500"
      >
        <span className="truncate pr-2 font-normal text-slate-200">
          {selectedOption ? selectedOption.label : <span className="text-slate-500">{placeholder}</span>}
        </span>
        <ChevronDown
          size={14}
          strokeWidth={2}
          className={`text-slate-400 transition-transform duration-200 shrink-0 ${isOpen ? 'rotate-180 text-sky-400' : ''}`}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-1 z-50 max-h-56 overflow-y-auto rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-1 will-change-transform animate-fadeIn">
          {options.length === 0 ? (
            <div className="p-3 text-center text-xs text-slate-500">
              Tidak ada pilihan tersedia
            </div>
          ) : (
            options.map((option, idx) => {
              const isSelected = option.value === value;
              return (
                <div
                  key={option.value}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  className={`flex items-center justify-between px-3 py-2 rounded-lg cursor-pointer transition-all duration-150 active:scale-[0.99] stagger-${Math.min(5, (idx % 5) + 1)} ${
                    isSelected
                      ? 'bg-sky-500/10 text-sky-400 font-medium'
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
                      <div className="truncate text-xs">{option.label}</div>
                      {option.subtitle && (
                        <div className="text-[11px] text-slate-500 truncate font-normal">{option.subtitle}</div>
                      )}
                    </div>
                  </div>

                  {isSelected && <Check size={14} strokeWidth={2} className="text-sky-400 shrink-0 ml-2" />}
                </div>
              );
            })
          )}
        </div>
      )}
    </div>
  );
};
