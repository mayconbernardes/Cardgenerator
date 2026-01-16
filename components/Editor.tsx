import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Upload, Columns, CreditCard, Image as ImageIcon, X, ChevronDown, Palette, QrCode } from 'lucide-react';
import { CardData, LinkItem, Translation } from '../types';
import IconSelector from './IconSelector';
import { THEMES } from '../constants';

interface EditorProps {
  data: CardData;
  onChange: (data: CardData) => void;
  currentThemeId: string;
  onThemeChange: (id: string) => void;
  t: Translation;
}

const Editor: React.FC<EditorProps> = ({ data, onChange, currentThemeId, onThemeChange, t }) => {
  const [isThemeOpen, setIsThemeOpen] = useState(false);

  const handleChange = (field: keyof CardData, value: any) => {
    onChange({ ...data, [field]: value });
  };

  const handleLinkChange = (id: string, field: keyof LinkItem, value: any) => {
    const newLinks = data.links.map((link) =>
      link.id === id ? { ...link, [field]: value } : link
    );
    handleChange('links', newLinks);
  };

  const addLink = () => {
    const newLink: LinkItem = {
      id: Date.now().toString(),
      type: 'website',
      label: 'New Link',
      value: '',
    };
    handleChange('links', [...data.links, newLink]);
  };

  const removeLink = (id: string) => {
    handleChange('links', data.links.filter((l) => l.id !== id));
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('photoUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBackgroundUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        handleChange('backgroundImageUrl', reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6 pb-10">
      {/* Profile Section */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
          <Upload size={20} className="text-blue-600" />
          {t.uploadPhoto} & Info
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-6 mb-6 items-center">
            <div className="relative group cursor-pointer w-24 h-24 flex-shrink-0">
                <img 
                    src={data.photoUrl} 
                    alt="Profile" 
                    className="w-full h-full rounded-full object-cover border-4 border-slate-100 shadow-inner" 
                />
                <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                   <Upload className="text-white" size={24} />
                </div>
                <input 
                    type="file" 
                    accept="image/*" 
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handlePhotoUpload}
                />
            </div>
            <div className="w-full space-y-3">
                <div>
                    <label className="block text-sm font-medium text-slate-500 mb-1">{t.fullName}</label>
                    <input
                    type="text"
                    value={data.fullName}
                    onChange={(e) => handleChange('fullName', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                    placeholder="e.g. John Doe"
                    />
                </div>
                 <div>
                    <label className="block text-sm font-medium text-slate-500 mb-1">{t.cityCompany}</label>
                    <input
                    type="text"
                    value={data.companyCity}
                    onChange={(e) => handleChange('companyCity', e.target.value)}
                    className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none"
                    />
                </div>
            </div>
        </div>
        
        <div>
            <label className="block text-sm font-medium text-slate-500 mb-1">{t.welcomeText}</label>
            <textarea
                value={data.welcomeMessage}
                onChange={(e) => handleChange('welcomeMessage', e.target.value)}
                className="w-full px-4 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all outline-none h-20 resize-none"
            />
        </div>
      </section>

      {/* Visual Settings Section */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <ImageIcon size={20} className="text-emerald-600" />
            Configurações Visuais
        </h2>

        {/* Custom Background Input */}
        <div className="mb-6 p-4 bg-slate-50 rounded-xl border border-dashed border-slate-200">
             <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium text-slate-700 flex items-center gap-2">
                  <ImageIcon size={16} /> {t.backgroundImage}
                </label>
                {data.backgroundImageUrl && (
                  <button 
                    onClick={() => handleChange('backgroundImageUrl', '')}
                    className="text-xs text-red-500 hover:underline flex items-center gap-1"
                  >
                    <X size={12} /> Clear
                  </button>
                )}
             </div>
             
             {data.backgroundImageUrl ? (
               <div className="relative h-24 w-full rounded-lg overflow-hidden bg-slate-200 mb-2 group">
                 <img src={data.backgroundImageUrl} alt="Background" className="w-full h-full object-cover" />
                 <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="text-white text-xs font-medium bg-black/50 px-3 py-1 rounded-full pointer-events-none">Change Image</button>
                 </div>
                 <input 
                    type="file" 
                    accept="image/*" 
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={handleBackgroundUpload}
                />
               </div>
             ) : (
                <div className="relative w-full border-2 border-dashed border-slate-300 rounded-lg p-4 flex flex-col items-center justify-center hover:bg-white hover:border-blue-400 transition-colors group cursor-pointer">
                    <Upload className="text-slate-400 group-hover:text-blue-500 mb-2" size={24} />
                    <span className="text-xs text-slate-500 font-medium group-hover:text-blue-600">{t.uploadBackground}</span>
                    <input 
                        type="file" 
                        accept="image/*" 
                        className="absolute inset-0 opacity-0 cursor-pointer"
                        onChange={handleBackgroundUpload}
                    />
                </div>
             )}
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
                <h3 className="text-sm font-medium text-slate-500 mb-2">{t.layout}</h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => handleChange('layout', 'single')}
                        className={`flex-1 py-2 px-3 rounded-lg border flex items-center justify-center gap-2 transition-all text-sm ${
                            data.layout === 'single'
                            ? 'bg-slate-800 text-white border-slate-800'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                    >
                        <CreditCard size={16} /> {t.singleColumn}
                    </button>
                    <button
                        onClick={() => handleChange('layout', 'double')}
                        className={`flex-1 py-2 px-3 rounded-lg border flex items-center justify-center gap-2 transition-all text-sm ${
                            data.layout === 'double'
                            ? 'bg-slate-800 text-white border-slate-800'
                            : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                        }`}
                    >
                        <Columns size={16} /> {t.doubleColumn}
                    </button>
                </div>
            </div>

            <div>
                <h3 className="text-sm font-medium text-slate-500 mb-2">QR Code</h3>
                <button
                    onClick={() => handleChange('showQrCode', !data.showQrCode)}
                    className={`w-full py-2 px-4 rounded-lg border flex items-center justify-center gap-2 transition-all text-sm ${
                        data.showQrCode
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}
                >
                    <QrCode size={16} /> {t.showQrCode}
                </button>
            </div>
        </div>
      </section>

      {/* Theme Selection Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        <button 
            onClick={() => setIsThemeOpen(!isThemeOpen)}
            className="w-full p-6 flex items-center justify-between hover:bg-slate-50 transition-colors group"
        >
            <div className="flex items-center gap-2">
                <Palette size={20} className="text-purple-600 group-hover:rotate-12 transition-transform" />
                <h2 className="text-xl font-bold text-slate-800">{t.theme}</h2>
                <span className="ml-2 text-xs font-medium px-2 py-0.5 bg-slate-100 rounded-full text-slate-500">
                    {THEMES.find(th => th.id === currentThemeId)?.name}
                </span>
            </div>
            <motion.div
              animate={{ rotate: isThemeOpen ? 180 : 0 }}
              transition={{ duration: 0.3 }}
            >
              <ChevronDown size={20} className="text-slate-400" />
            </motion.div>
        </button>
        
        <AnimatePresence>
          {isThemeOpen && (
              <motion.div 
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="overflow-hidden"
              >
                <div className="p-6 pt-0">
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                        {THEMES.map(theme => (
                            <button
                                key={theme.id}
                                onClick={() => onThemeChange(theme.id)}
                                className={`p-2 rounded-xl text-xs font-medium border-2 transition-all text-center flex flex-col items-center gap-2 ${
                                    currentThemeId === theme.id 
                                    ? 'border-blue-600 bg-blue-50 text-blue-700 shadow-md transform scale-105' 
                                    : 'border-transparent bg-slate-50 text-slate-600 hover:bg-slate-100 hover:border-slate-200'
                                }`}
                            >
                                <div className={`w-10 h-10 rounded-full ${theme.containerClasses} border-2 border-white shadow-sm ring-1 ring-slate-200`}></div>
                                <span className="truncate w-full">{theme.name}</span>
                            </button>
                        ))}
                    </div>
                </div>
              </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Links Editor Section */}
      <section className="bg-white p-6 rounded-2xl shadow-sm border border-slate-100">
        <h2 className="text-xl font-bold text-slate-800 mb-4 flex items-center gap-2">
            <Plus size={20} className="text-green-600" />
            {t.links}
        </h2>
        
        <div className="space-y-4">
            {data.links.map((link) => (
                <div key={link.id} className="p-4 bg-slate-50 rounded-xl border border-slate-200 relative group transition-all hover:shadow-md">
                    <button 
                        onClick={() => removeLink(link.id)}
                        className="absolute top-2 right-2 p-1.5 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-colors"
                    >
                        <Trash2 size={16} />
                    </button>
                    
                    <div className="mb-3">
                        <label className="text-xs font-semibold text-slate-400 uppercase mb-2 block">Icon Type</label>
                        <IconSelector 
                            selected={link.type} 
                            onSelect={(type) => handleLinkChange(link.id, 'type', type)} 
                        />
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <input
                            type="text"
                            value={link.label}
                            onChange={(e) => handleLinkChange(link.id, 'label', e.target.value)}
                            className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:border-blue-500 outline-none text-sm"
                            placeholder="Label (e.g. Website)"
                        />
                        <input
                            type="text"
                            value={link.value}
                            onChange={(e) => handleLinkChange(link.id, 'value', e.target.value)}
                            className="px-3 py-2 rounded-lg border border-slate-200 bg-white text-slate-900 focus:border-blue-500 outline-none text-sm"
                            placeholder="URL or Phone number"
                        />
                    </div>
                </div>
            ))}
            
            <button
                onClick={addLink}
                className="w-full py-3 rounded-xl border-2 border-dashed border-slate-300 text-slate-500 hover:border-blue-500 hover:text-blue-600 hover:bg-blue-50 transition-all font-medium flex items-center justify-center gap-2"
            >
                <Plus size={20} /> {t.addLink}
            </button>
        </div>
      </section>
    </div>
  );
};

export default Editor;