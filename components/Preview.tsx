import { forwardRef } from 'react';
import { CardData, Theme } from '../types';
import { getIconComponent } from './IconSelector';
import QRCodeGenerator from './QRCodeGenerator';

interface PreviewProps {
  data: CardData;
  theme: Theme;
}

const Preview = forwardRef<HTMLDivElement, PreviewProps>(({ data, theme }, ref) => {
  const isDragon = theme.specialEffect === 'fire';
  const isGlow = theme.specialEffect === 'glow' || theme.specialEffect === 'neon';
  const hasBgImage = !!data.backgroundImageUrl;

  return (
    <div 
      ref={ref}
      className={`w-full max-w-md mx-auto p-8 min-h-[600px] flex flex-col justify-center transition-all duration-500 overflow-hidden relative ${!hasBgImage ? theme.containerClasses : ''}`}
      style={hasBgImage ? {
        backgroundImage: `url(${data.backgroundImageUrl})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      } : undefined}
    >
      {hasBgImage && <div className="absolute inset-0 bg-black/40 pointer-events-none"></div>}

      {!hasBgImage && isDragon && (
        <>
          <div className="absolute top-0 left-0 w-full h-full bg-[url('https://www.transparenttextures.com/patterns/black-scales.png')] opacity-30 pointer-events-none"></div>
          <div className="absolute bottom-0 right-0 w-64 h-64 bg-orange-500 blur-[100px] opacity-20 animate-pulse-slow"></div>
        </>
      )}
      {!hasBgImage && isGlow && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-tr from-transparent via-current to-transparent opacity-5 pointer-events-none"></div>
      )}

      <div className={`relative z-10 w-full p-6 md:p-8 transition-all duration-300 ${theme.cardClasses} ${isDragon ? 'hover:scale-[1.01] hover:shadow-[0_0_40px_rgba(234,88,12,0.3)]' : ''}`}>
        
        <div className="flex flex-col items-center text-center mb-8">
          <div className={`relative group mb-4 rounded-full p-1 ${isDragon ? 'bg-gradient-to-b from-orange-400 to-red-900' : 'bg-transparent'}`}>
            <img 
              src={data.photoUrl || 'https://picsum.photos/200/200'} 
              alt="Profile" 
              className={`w-24 h-24 md:w-32 md:h-32 rounded-full object-cover transition-transform duration-500 group-hover:scale-105 ${isDragon ? 'border-4 border-black' : ''}`}
            />
             {isDragon && <div className="absolute -bottom-2 -right-2 text-3xl animate-bounce">🔥</div>}
          </div>

          <h1 className={`text-2xl md:text-3xl font-bold mb-1 ${theme.fontFamily} ${theme.textClasses}`}>
            {data.fullName}
          </h1>
          <p className={`text-sm md:text-base font-medium opacity-80 uppercase tracking-wide mb-3 ${theme.fontFamily} ${theme.accentTextClasses}`}>
            {data.companyCity}
          </p>
          <div className={`w-12 h-1 rounded mb-4 opacity-50 ${isDragon ? 'bg-orange-500' : 'bg-current'} ${theme.textClasses}`}></div>
          <p className={`text-sm italic opacity-90 px-4 ${theme.fontFamily} ${theme.textClasses}`}>
            "{data.welcomeMessage}"
          </p>
        </div>

        <div className={`grid gap-4 ${data.layout === 'double' ? 'grid-cols-2' : 'grid-cols-1'}`}>
          {data.links.map((link) => {
            const Icon = getIconComponent(link.type);
            return (
              <a
                key={link.id}
                href={link.type === 'email' ? `mailto:${link.value}` : link.type === 'phone' ? `tel:${link.value}` : link.value}
                target="_blank"
                rel="noreferrer"
                className={`card-link group relative flex items-center justify-center p-3 md:p-4 rounded-lg transition-all duration-300 transform active:scale-95 cursor-pointer overflow-hidden ${theme.buttonClasses}`}
              >
                <div className="absolute top-0 -inset-full h-full w-1/2 z-5 block transform -skew-x-12 bg-gradient-to-r from-transparent to-white opacity-20 group-hover:animate-shine" />
                <div className={`mr-3 transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6`}>
                   <Icon size={20} className="w-5 h-5" style={{ color: 'currentColor' }} />
                </div>
                <span className={`font-medium z-10 ${theme.fontFamily}`}>{link.label}</span>
              </a>
            );
          })}
        </div>

        {data.showQrCode && (
          <div className="mt-8 flex flex-col items-center">
            <QRCodeGenerator data={data} size={128} useQueryString={true} />
          </div>
        )}
      </div>

      <div className={`text-center mt-6 text-xs opacity-50 hover:opacity-100 transition-opacity ${theme.textClasses} ${hasBgImage ? 'text-white font-semibold shadow-black drop-shadow-md' : ''}`}>
        created by <a href="https://www.instagram.com/crea_ktif/" target="_blank" rel="noopener noreferrer" className="card-link font-bold hover:underline">@crea_ktif</a>
      </div>
    </div>
  );
});

Preview.displayName = 'Preview';

export default Preview;