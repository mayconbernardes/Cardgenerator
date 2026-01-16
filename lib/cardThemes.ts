export type ThemeKey = 
  | 'modern' 
  | 'dark-neon' 
  | 'fire-dragon' 
  | 'ocean-wave' 
  | 'forest-green' 
  | 'sunset-orange' 
  | 'cyberpunk' 
  | 'minimal-clean' 
  | 'aurora-glow' 
  | 'gold-luxury' 
  | 'red-velvet' 
  | 'vivid-neon' 
  | 'ice-mint'
  | 'corporate-modern'
  | 'luxury-minimal'
  | 'tech-vibrant'
  | 'wellness-nature'
  | 'premium-dark'
  | 'elegant-light'
  | 'bold-creative'
  | 'studio-pro'
  | 'geo-luxury'
  | 'modern-gradient';

export interface CardTheme {
  name: string;
  background: string;
  card: string;
  cardHover: string;
  button: string;
  text: string;
  accent: string;
  image: string;
}

export const CARD_PAGE_THEMES: Record<ThemeKey, CardTheme> = {
  // 13 Original Themes
  modern: {
    name: 'Modern',
    background: 'bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900',
    card: 'bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg',
    cardHover: 'hover:bg-slate-800/70 hover:border-purple-500/50',
    button: 'bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white',
    text: 'text-white',
    accent: 'text-purple-400',
    image: 'rounded-lg'
  },
  'dark-neon': {
    name: 'Dark Neon',
    background: 'bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950',
    card: 'bg-slate-900/70 backdrop-blur-md border border-purple-600/30 rounded-lg shadow-lg shadow-purple-600/20',
    cardHover: 'hover:bg-slate-900/80 hover:shadow-lg hover:shadow-purple-600/40',
    button: 'bg-gradient-to-r from-purple-700 to-pink-600 hover:from-purple-800 hover:to-pink-700 text-white shadow-lg shadow-purple-600/50',
    text: 'text-purple-50',
    accent: 'text-purple-400',
    image: 'rounded-lg'
  },
  'fire-dragon': {
    name: 'Fire Dragon',
    background: 'bg-gradient-to-br from-orange-950 via-red-900 to-yellow-900',
    card: 'bg-orange-900/40 backdrop-blur-sm border border-orange-600/50 rounded-lg',
    cardHover: 'hover:bg-orange-900/60 hover:border-orange-500/70 hover:shadow-lg hover:shadow-orange-600/40',
    button: 'bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg shadow-orange-600/50',
    text: 'text-orange-50',
    accent: 'text-orange-400',
    image: 'rounded-lg'
  },
  'ocean-wave': {
    name: 'Ocean Wave',
    background: 'bg-gradient-to-br from-blue-950 via-cyan-900 to-teal-900',
    card: 'bg-blue-900/40 backdrop-blur-sm border border-cyan-500/40 rounded-lg',
    cardHover: 'hover:bg-blue-900/60 hover:border-cyan-500/60',
    button: 'bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white',
    text: 'text-cyan-50',
    accent: 'text-cyan-400',
    image: 'rounded-lg'
  },
  'forest-green': {
    name: 'Forest Green',
    background: 'bg-gradient-to-br from-green-950 via-emerald-900 to-teal-900',
    card: 'bg-green-900/40 backdrop-blur-sm border border-emerald-600/40 rounded-lg',
    cardHover: 'hover:bg-green-900/60 hover:border-emerald-600/60',
    button: 'bg-gradient-to-r from-emerald-600 to-green-600 hover:from-emerald-700 hover:to-green-700 text-white',
    text: 'text-emerald-50',
    accent: 'text-emerald-400',
    image: 'rounded-lg'
  },
  'sunset-orange': {
    name: 'Sunset Orange',
    background: 'bg-gradient-to-br from-orange-900 via-pink-800 to-purple-900',
    card: 'bg-orange-800/40 backdrop-blur-sm border border-pink-500/40 rounded-lg',
    cardHover: 'hover:bg-orange-800/60 hover:border-pink-500/60',
    button: 'bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 text-white',
    text: 'text-orange-50',
    accent: 'text-pink-400',
    image: 'rounded-lg'
  },
  cyberpunk: {
    name: 'Cyberpunk',
    background: 'bg-gradient-to-br from-slate-950 via-purple-950 to-pink-950',
    card: 'bg-slate-900/80 backdrop-blur-lg border-2 border-pink-600/60 rounded-lg shadow-lg shadow-pink-600/30',
    cardHover: 'hover:bg-slate-900/90 hover:shadow-lg hover:shadow-pink-600/50',
    button: 'bg-gradient-to-r from-pink-600 to-cyan-600 hover:from-pink-700 hover:to-cyan-700 text-white shadow-lg shadow-cyan-600/50',
    text: 'text-pink-100',
    accent: 'text-cyan-400',
    image: 'rounded-lg'
  },
  'minimal-clean': {
    name: 'Minimal Clean',
    background: 'bg-gradient-to-br from-gray-100 to-gray-200',
    card: 'bg-white/80 backdrop-blur-sm border border-gray-300/60 rounded-lg',
    cardHover: 'hover:bg-white/90 hover:border-gray-400/80',
    button: 'bg-gradient-to-r from-gray-800 to-gray-600 hover:from-gray-900 hover:to-gray-700 text-white',
    text: 'text-gray-900',
    accent: 'text-gray-700',
    image: 'rounded-lg'
  },
  'aurora-glow': {
    name: 'Aurora Glow',
    background: 'bg-gradient-to-br from-purple-900 via-blue-900 to-green-900',
    card: 'bg-blue-900/50 backdrop-blur-md border border-cyan-400/40 rounded-lg shadow-lg shadow-green-500/20',
    cardHover: 'hover:bg-blue-900/70 hover:shadow-lg hover:shadow-green-500/40',
    button: 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white shadow-lg shadow-green-500/50',
    text: 'text-blue-50',
    accent: 'text-green-400',
    image: 'rounded-lg'
  },
  'gold-luxury': {
    name: 'Gold Luxury',
    background: 'bg-gradient-to-br from-gray-900 via-amber-950 to-gray-950',
    card: 'bg-gray-900/60 backdrop-blur-sm border border-amber-600/50 rounded-lg',
    cardHover: 'hover:bg-gray-900/80 hover:border-amber-500/70',
    button: 'bg-gradient-to-r from-amber-600 to-yellow-500 hover:from-amber-700 hover:to-yellow-600 text-white',
    text: 'text-amber-50',
    accent: 'text-amber-400',
    image: 'rounded-lg'
  },
  'red-velvet': {
    name: 'Red Velvet',
    background: 'bg-gradient-to-br from-red-950 via-purple-950 to-slate-950',
    card: 'bg-red-950/50 backdrop-blur-sm border border-rose-600/50 rounded-lg',
    cardHover: 'hover:bg-red-950/70 hover:border-rose-500/70',
    button: 'bg-gradient-to-r from-rose-700 to-red-600 hover:from-rose-800 hover:to-red-700 text-white',
    text: 'text-rose-50',
    accent: 'text-rose-400',
    image: 'rounded-lg'
  },
  'vivid-neon': {
    name: 'Vivid Neon',
    background: 'bg-gradient-to-br from-slate-950 via-fuchsia-950 to-slate-950',
    card: 'bg-slate-900/60 backdrop-blur-lg border-2 border-lime-400/50 rounded-lg shadow-lg shadow-lime-400/30',
    cardHover: 'hover:bg-slate-900/80 hover:shadow-lg hover:shadow-lime-400/50',
    button: 'bg-gradient-to-r from-fuchsia-600 to-lime-500 hover:from-fuchsia-700 hover:to-lime-600 text-white shadow-lg shadow-lime-400/50',
    text: 'text-lime-50',
    accent: 'text-lime-400',
    image: 'rounded-lg'
  },
  'ice-mint': {
    name: 'Ice Mint',
    background: 'bg-gradient-to-br from-slate-800 via-cyan-900 to-teal-900',
    card: 'bg-cyan-900/30 backdrop-blur-md border border-teal-400/40 rounded-lg',
    cardHover: 'hover:bg-cyan-900/50 hover:border-teal-400/60',
    button: 'bg-gradient-to-r from-cyan-500 to-teal-500 hover:from-cyan-600 hover:to-teal-600 text-white',
    text: 'text-cyan-50',
    accent: 'text-cyan-300',
    image: 'rounded-lg'
  },

  // 10 Unique Professional Styles - Different Structures & High Contrast
  'corporate-modern': {
    name: 'Corporate Modern',
    background: 'bg-gradient-to-b from-slate-100 to-slate-200',
    card: 'bg-white border-l-4 border-blue-600 rounded-lg shadow-md hover:shadow-xl hover:border-l-8',
    cardHover: 'hover:shadow-xl hover:border-l-8',
    button: 'bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-md shadow-lg hover:shadow-xl',
    text: 'text-slate-900',
    accent: 'text-blue-600',
    image: 'rounded-lg'
  },
  'luxury-minimal': {
    name: 'Luxury Minimal',
    background: 'bg-white',
    card: 'bg-white border-2 border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:border-yellow-500',
    cardHover: 'hover:shadow-lg hover:border-yellow-500',
    button: 'bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold rounded-lg shadow-md hover:shadow-lg',
    text: 'text-gray-900',
    accent: 'text-yellow-500',
    image: 'rounded-xl'
  },
  'tech-vibrant': {
    name: 'Tech Vibrant',
    background: 'bg-gradient-to-br from-gray-950 via-blue-950 to-gray-950',
    card: 'bg-gray-900 border-2 border-cyan-400 rounded-lg shadow-lg shadow-cyan-500/20 hover:shadow-xl hover:shadow-cyan-500/40 hover:border-cyan-300',
    cardHover: 'hover:shadow-xl hover:shadow-cyan-500/40 hover:border-cyan-300',
    button: 'bg-cyan-400 hover:bg-cyan-300 text-gray-900 font-bold rounded-lg shadow-lg hover:shadow-xl',
    text: 'text-cyan-100',
    accent: 'text-cyan-400',
    image: 'rounded-lg'
  },
  'wellness-nature': {
    name: 'Wellness Nature',
    background: 'bg-gradient-to-br from-emerald-50 via-green-50 to-teal-50',
    card: 'bg-white/80 border border-emerald-300 rounded-3xl shadow-md hover:shadow-lg hover:border-emerald-500',
    cardHover: 'hover:shadow-lg hover:border-emerald-500',
    button: 'bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-full shadow-md hover:shadow-lg',
    text: 'text-emerald-900',
    accent: 'text-emerald-600',
    image: 'rounded-3xl'
  },
  'premium-dark': {
    name: 'Premium Dark',
    background: 'bg-black',
    card: 'bg-gray-900 border border-gray-800 rounded-xl shadow-2xl hover:shadow-2xl hover:bg-gray-800 hover:border-amber-500/50',
    cardHover: 'hover:shadow-2xl hover:bg-gray-800 hover:border-amber-500/50',
    button: 'bg-amber-500 hover:bg-amber-600 text-black font-bold rounded-lg shadow-xl hover:shadow-2xl',
    text: 'text-gray-100',
    accent: 'text-amber-400',
    image: 'rounded-xl'
  },
  'elegant-light': {
    name: 'Elegant Light',
    background: 'bg-gradient-to-br from-rose-50 to-pink-50',
    card: 'bg-white rounded-2xl shadow-lg hover:shadow-2xl border-t-4 border-rose-400 hover:border-t-rose-500',
    cardHover: 'hover:shadow-2xl hover:border-t-rose-500',
    button: 'bg-rose-500 hover:bg-rose-600 text-white font-bold rounded-lg shadow-md hover:shadow-lg',
    text: 'text-rose-950',
    accent: 'text-rose-500',
    image: 'rounded-2xl'
  },
  'bold-creative': {
    name: 'Bold Creative',
    background: 'bg-gradient-to-br from-purple-600 via-fuchsia-600 to-orange-500',
    card: 'bg-white rounded-2xl shadow-2xl hover:shadow-2xl transform hover:scale-105 transition-transform',
    cardHover: 'hover:shadow-2xl hover:scale-105',
    button: 'bg-purple-700 hover:bg-purple-800 text-white font-bold rounded-lg shadow-lg hover:shadow-xl',
    text: 'text-gray-900',
    accent: 'text-purple-700',
    image: 'rounded-2xl'
  },
  'studio-pro': {
    name: 'Studio Professional',
    background: 'bg-gradient-to-r from-indigo-900 to-slate-900',
    card: 'bg-slate-800/60 backdrop-blur-sm border-2 border-indigo-400/40 rounded-lg shadow-lg hover:shadow-xl hover:border-indigo-400/60',
    cardHover: 'hover:shadow-xl hover:border-indigo-400/60',
    button: 'bg-indigo-500 hover:bg-indigo-600 text-white font-bold rounded-md shadow-lg hover:shadow-xl',
    text: 'text-indigo-50',
    accent: 'text-indigo-300',
    image: 'rounded-lg'
  },
  'geo-luxury': {
    name: 'Geo Luxury',
    background: 'bg-gradient-to-br from-gray-900 via-cyan-900 to-gray-900',
    card: 'bg-gray-950 rounded-2xl shadow-xl hover:shadow-2xl border border-cyan-600/30 hover:border-cyan-400/60 relative overflow-hidden',
    cardHover: 'hover:shadow-2xl hover:border-cyan-400/60',
    button: 'bg-cyan-500 hover:bg-cyan-600 text-black font-bold rounded-lg shadow-lg hover:shadow-xl',
    text: 'text-cyan-100',
    accent: 'text-cyan-400',
    image: 'rounded-2xl'
  },
  'modern-gradient': {
    name: 'Modern Gradient',
    background: 'bg-gradient-to-br from-red-500 via-yellow-400 to-green-500',
    card: 'bg-white rounded-xl shadow-2xl hover:shadow-2xl border border-gray-300 hover:border-gray-500',
    cardHover: 'hover:shadow-2xl hover:border-gray-500',
    button: 'bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg shadow-lg hover:shadow-xl',
    text: 'text-gray-900',
    accent: 'text-red-600',
    image: 'rounded-xl'
  }
};

export function getThemeClasses(themeKey: ThemeKey) {
  return CARD_PAGE_THEMES[themeKey];
}

export function getAllThemes(): Array<{ key: ThemeKey; name: string }> {
  return Object.entries(CARD_PAGE_THEMES).map(([key, theme]) => ({
    key: key as ThemeKey,
    name: theme.name
  }));
}
