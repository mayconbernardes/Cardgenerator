import React from 'react';
import { CARD_PAGE_THEMES, ThemeKey } from '../lib/cardThemes';

interface ThemeSelectorProps {
  selectedTheme: ThemeKey;
  onThemeChange: (theme: ThemeKey) => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({ selectedTheme, onThemeChange }) => {
  const themes = Object.entries(CARD_PAGE_THEMES).map(([key]) => key as ThemeKey);

  return (
    <div className="w-full mb-8 p-6 bg-slate-900/50 backdrop-blur-sm border border-slate-700 rounded-xl">
      <h3 className="text-white text-sm font-semibold mb-4 uppercase tracking-wide">🎨 Escolha seu Tema (23 Estilos)</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
        {themes.map((theme) => (
          <button
            key={theme}
            onClick={() => onThemeChange(theme)}
            className={`
              py-3 px-2 rounded-lg text-xs font-medium transition-all duration-200 flex flex-col items-center gap-2
              ${
                selectedTheme === theme
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-lg shadow-purple-500/50 scale-105 border-2 border-purple-400'
                  : 'bg-slate-700/50 text-slate-300 hover:bg-slate-600/70 hover:text-white border-2 border-transparent'
              }
            `}
            title={CARD_PAGE_THEMES[theme].name}
          >
            <div className="w-8 h-8 rounded-full border-2 border-white shadow-sm"></div>
            <span className="truncate w-full text-center">{CARD_PAGE_THEMES[theme].name}</span>
          </button>
        ))}
      </div>
      <p className="text-xs text-slate-400 mt-3">Total: {themes.length} temas disponíveis</p>
    </div>
  );
};
