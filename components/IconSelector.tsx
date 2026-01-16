import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Wifi, Phone, Mail, MapPin, Globe, Instagram, Linkedin, 
  Twitter, Facebook, Github, Youtube, Music, Coffee, 
  Calendar, Briefcase, Home, User, Star, MessageCircle, 
  Send, Video, Ghost, Gamepad2, Twitch, DollarSign, 
  Bitcoin, Camera, Car, Heart, ShoppingBag, X, ChevronDown,
  Slack, Trello, Figma, Palette, Gamepad, Headphones, Mic, 
  FileText, Store, LifeBuoy, Download, FolderOpen, Image as ImageIcon, 
  Film, GraduationCap, Utensils, Plane, Dumbbell, Activity, Code,
  Monitor, Smartphone, Cloud, HardDrive, Printer, Book, Rocket, 
  Zap, Target, Trophy, Crown, Key, Lock, Bell, Megaphone, Gift, 
  Watch, Sun, Moon, Search
} from 'lucide-react';
import { LinkItem } from '../types';

interface IconSelectorProps {
  selected: LinkItem['type'];
  onSelect: (type: LinkItem['type']) => void;
}

const icons = [
  // Social & Communication
  { type: 'whatsapp', icon: MessageCircle, label: 'WhatsApp' },
  { type: 'telegram', icon: Send, label: 'Telegram' },
  { type: 'instagram', icon: Instagram, label: 'Instagram' },
  { type: 'facebook', icon: Facebook, label: 'Facebook' },
  { type: 'twitter', icon: Twitter, label: 'Twitter' },
  { type: 'linkedin', icon: Linkedin, label: 'LinkedIn' },
  { type: 'tiktok', icon: Video, label: 'TikTok' },
  { type: 'snapchat', icon: Ghost, label: 'Snapchat' },
  { type: 'discord', icon: Gamepad2, label: 'Discord' },
  { type: 'twitch', icon: Twitch, label: 'Twitch' },
  { type: 'youtube', icon: Youtube, label: 'YouTube' },
  { type: 'github', icon: Github, label: 'GitHub' },
  { type: 'slack', icon: Slack, label: 'Slack' },
  
  // Work & Productivity
  { type: 'trello', icon: Trello, label: 'Trello' },
  { type: 'figma', icon: Figma, label: 'Figma' },
  { type: 'palette', icon: Palette, label: 'Design' },
  { type: 'file-text', icon: FileText, label: 'Blog/Resume' },
  { type: 'folder-open', icon: FolderOpen, label: 'Portfolio' },
  { type: 'download', icon: Download, label: 'Download' },
  { type: 'code', icon: Code, label: 'Code' },
  { type: 'monitor', icon: Monitor, label: 'Desktop' },
  { type: 'smartphone', icon: Smartphone, label: 'Mobile' },
  { type: 'cloud', icon: Cloud, label: 'Cloud' },
  { type: 'hard-drive', icon: HardDrive, label: 'Drive' },
  { type: 'printer', icon: Printer, label: 'Print' },
  
  // Contact & Info
  { type: 'phone', icon: Phone, label: 'Phone' },
  { type: 'email', icon: Mail, label: 'Email' },
  { type: 'website', icon: Globe, label: 'Website' },
  { type: 'map', icon: MapPin, label: 'Location' },
  { type: 'wifi', icon: Wifi, label: 'WiFi' },
  { type: 'life-buoy', icon: LifeBuoy, label: 'Support' },
  
  // Lifestyle & Misc
  { type: 'paypal', icon: DollarSign, label: 'PayPal' },
  { type: 'bitcoin', icon: Bitcoin, label: 'Crypto' },
  { type: 'music', icon: Music, label: 'Music' },
  { type: 'headphones', icon: Headphones, label: 'Audio' },
  { type: 'mic', icon: Mic, label: 'Podcast' },
  { type: 'film', icon: Film, label: 'Movie/Video' },
  { type: 'coffee', icon: Coffee, label: 'Coffee' },
  { type: 'calendar', icon: Calendar, label: 'Calendar' },
  { type: 'work', icon: Briefcase, label: 'Work' },
  { type: 'home', icon: Home, label: 'Home' },
  { type: 'user', icon: User, label: 'User' },
  { type: 'camera', icon: Camera, label: 'Photo' },
  { type: 'image', icon: ImageIcon, label: 'Gallery' },
  { type: 'car', icon: Car, label: 'Car' },
  { type: 'plane', icon: Plane, label: 'Travel' },
  { type: 'heart', icon: Heart, label: 'Love' },
  { type: 'shopping', icon: ShoppingBag, label: 'Shop' },
  { type: 'store', icon: Store, label: 'Store' },
  { type: 'gamepad', icon: Gamepad, label: 'Gaming' },
  { type: 'graduation-cap', icon: GraduationCap, label: 'Education' },
  { type: 'utensils', icon: Utensils, label: 'Food' },
  { type: 'dumbbell', icon: Dumbbell, label: 'Fitness' },
  { type: 'activity', icon: Activity, label: 'Health' },
  
  // New Additions
  { type: 'book', icon: Book, label: 'Book' },
  { type: 'rocket', icon: Rocket, label: 'Startup' },
  { type: 'zap', icon: Zap, label: 'Energy' },
  { type: 'target', icon: Target, label: 'Goal' },
  { type: 'trophy', icon: Trophy, label: 'Award' },
  { type: 'crown', icon: Crown, label: 'VIP' },
  { type: 'key', icon: Key, label: 'Access' },
  { type: 'lock', icon: Lock, label: 'Private' },
  { type: 'bell', icon: Bell, label: 'Notify' },
  { type: 'megaphone', icon: Megaphone, label: 'Promo' },
  { type: 'gift', icon: Gift, label: 'Gift' },
  { type: 'watch', icon: Watch, label: 'Time' },
  { type: 'sun', icon: Sun, label: 'Day' },
  { type: 'moon', icon: Moon, label: 'Night' },
  
  { type: 'custom', icon: Star, label: 'Custom' },
] as const;

export const getIconComponent = (type: string) => {
  const found = icons.find(i => i.type === type);
  return found ? found.icon : Star;
};

const IconSelector: React.FC<IconSelectorProps> = ({ selected, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const SelectedIcon = getIconComponent(selected);

  // Focus input when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
        setTimeout(() => {
            inputRef.current?.focus();
        }, 100);
    }
  }, [isOpen]);

  // Reset search when closed
  useEffect(() => {
    if (!isOpen) {
        setSearchQuery('');
    }
  }, [isOpen]);

  const filteredIcons = useMemo(() => {
    if (!searchQuery.trim()) return icons;
    const lowerQuery = searchQuery.toLowerCase();
    return icons.filter(item => 
        item.label.toLowerCase().includes(lowerQuery) || 
        item.type.toLowerCase().includes(lowerQuery)
    );
  }, [searchQuery]);

  return (
    <>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-blue-500 hover:ring-2 hover:ring-blue-100 transition-all w-full md:w-auto justify-between group"
      >
        <div className="flex items-center gap-2">
            <span className="p-1.5 bg-slate-100 rounded-md text-slate-600 group-hover:text-blue-600">
                <SelectedIcon size={18} />
            </span>
            <span className="text-sm font-medium text-slate-700 capitalize">{selected}</span>
        </div>
        <ChevronDown size={16} className="text-slate-400" />
      </button>

      {/* Modal / Popover */}
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[80vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-200">
            
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-100">
              <h3 className="font-bold text-slate-800">Select Icon</h3>
              <button 
                onClick={() => setIsOpen(false)}
                className="p-1 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>

            {/* Search Bar */}
            <div className="p-4 pb-2">
                <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search icons (e.g. 'instagram', 'work')..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white transition-all"
                    />
                </div>
            </div>

            {/* Grid */}
            <div className="p-4 overflow-y-auto grid grid-cols-4 sm:grid-cols-6 gap-3">
              {filteredIcons.length > 0 ? (
                  filteredIcons.map((item) => {
                    const Icon = item.icon;
                    const isSelected = selected === item.type;
                    return (
                      <button
                        key={item.type}
                        onClick={() => {
                          onSelect(item.type as LinkItem['type']);
                          setIsOpen(false);
                        }}
                        className={`flex flex-col items-center justify-center gap-2 p-3 rounded-xl border transition-all ${
                          isSelected
                            ? 'bg-blue-600 text-white border-blue-600 shadow-md'
                            : 'bg-slate-50 text-slate-600 border-slate-100 hover:bg-white hover:border-blue-200 hover:shadow-md'
                        }`}
                        title={item.label}
                      >
                        <Icon size={24} />
                        <span className="text-[10px] font-medium text-center truncate w-full">{item.label}</span>
                      </button>
                    );
                  })
              ) : (
                  <div className="col-span-full py-8 text-center text-slate-400 flex flex-col items-center gap-2">
                      <Search size={32} className="opacity-20" />
                      <p className="text-sm">No icons found for "{searchQuery}"</p>
                  </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default IconSelector;