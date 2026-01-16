export type Language = 'en' | 'pt' | 'fr' | 'es';

export interface LinkItem {
  id: string;
  type: 'wifi' | 'phone' | 'email' | 'map' | 'website' | 'instagram' | 'linkedin' | 'twitter' | 'facebook' | 'github' | 'youtube' | 'music' | 'coffee' | 'calendar' | 'work' | 'home' | 'user' | 'whatsapp' | 'telegram' | 'tiktok' | 'snapchat' | 'discord' | 'twitch' | 'paypal' | 'bitcoin' | 'camera' | 'car' | 'heart' | 'shopping' | 'slack' | 'trello' | 'figma' | 'palette' | 'gamepad' | 'headphones' | 'mic' | 'file-text' | 'store' | 'life-buoy' | 'download' | 'folder-open' | 'image' | 'film' | 'graduation-cap' | 'utensils' | 'plane' | 'dumbbell' | 'activity' | 'code' | 'monitor' | 'smartphone' | 'cloud' | 'hard-drive' | 'printer' | 'book' | 'rocket' | 'zap' | 'target' | 'trophy' | 'crown' | 'key' | 'lock' | 'bell' | 'megaphone' | 'gift' | 'watch' | 'sun' | 'moon' | 'custom';
  label: string;
  value: string;
  icon?: string;
}

export interface CardData {
  fullName: string;
  companyCity: string;
  welcomeMessage: string;
  photoUrl: string;
  backgroundImageUrl?: string;
  links: LinkItem[];
  layout: 'single' | 'double';
  showQrCode: boolean;
}

export interface Theme {
  id: string;
  name: string;
  category: 'modern' | 'minimal' | 'elegant' | 'futuristic' | 'fantasy' | 'creative' | 'nature';
  containerClasses: string;
  cardClasses: string;
  textClasses: string;
  accentTextClasses: string;
  buttonClasses: string;
  fontFamily: string;
  iconColor: string;
  specialEffect?: 'glow' | 'fire' | 'neon' | 'none';
}

export interface Translation {
  title: string;
  subtitle: string;
  fullName: string;
  cityCompany: string;
  welcomeText: string;
  photoUrl: string;
  layout: string;
  singleColumn: string;
  doubleColumn: string;
  links: string;
  addLink: string;
  theme: string;
  downloadImage: string;
  downloadPdf: string;
  preview: string;
  editor: string;
  selectLanguage: string;
  uploadPhoto: string;
  backgroundImage: string;
  uploadBackground: string;
  showQrCode: string;
  downloadVCard: string;
}