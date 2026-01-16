import React, { useState, useRef, useCallback, useEffect } from 'react';
import { toPng } from 'html-to-image';
import { jsPDF } from 'jspdf';
import { Download, Share2, Globe, Sparkles, UserPlus, QrCode } from 'lucide-react';
import { CardData, Language } from './types';
import { INITIAL_DATA, TRANSLATIONS, THEMES } from './constants';
import Editor from './components/Editor';
import Preview from './components/Preview';
import { GradientBackground } from './components/ui/gradient-background';

const STORAGE_KEY = 'card_genius_data_v1';

const App: React.FC = () => {
  const [data, setData] = useState<CardData>(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        return { ...INITIAL_DATA, ...JSON.parse(saved) };
      } catch (e) {
        return INITIAL_DATA;
      }
    }
    return INITIAL_DATA;
  });

  const [themeId, setThemeId] = useState<string>(() => {
    return localStorage.getItem('card_theme_id') || 'modern-blue';
  });

  const [language, setLanguage] = useState<Language>('pt');
  const previewRef = useRef<HTMLDivElement>(null);

  const t = TRANSLATIONS[language];
  const currentTheme = THEMES.find((t) => t.id === themeId) || THEMES[0];

  // Auto-save progress
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    localStorage.setItem('card_theme_id', themeId);
  }, [data, themeId]);

  const handleDownloadImage = useCallback(async () => {
    if (previewRef.current) {
      try {
        const width = previewRef.current.scrollWidth;
        const height = previewRef.current.scrollHeight;

        const dataUrl = await toPng(previewRef.current, { 
          cacheBust: true, 
          pixelRatio: 3,
          width: width,
          height: height,
          style: {
            margin: '0', 
            transform: 'none',
          } 
        });
        
        const link = document.createElement('a');
        link.download = `${data.fullName.replace(/\s+/g, '_')}_card.png`;
        link.href = dataUrl;
        link.click();
      } catch (err) {
        console.error('Failed to generate image', err);
      }
    }
  }, [data.fullName]);

  const handleDownloadPdf = useCallback(async () => {
    if (previewRef.current) {
      try {
        const width = previewRef.current.scrollWidth;
        const height = previewRef.current.scrollHeight;
        
        const dataUrl = await toPng(previewRef.current, { 
          cacheBust: true, 
          pixelRatio: 2,
          width: width,
          height: height,
          style: {
            margin: '0',
            transform: 'none',
          }
        });
        
        const pdf = new jsPDF({
            orientation: width > height ? 'landscape' : 'portrait',
            unit: 'px',
            format: [width, height]
        });
        
        pdf.addImage(dataUrl, 'PNG', 0, 0, width, height);

        const containerRect = previewRef.current.getBoundingClientRect();
        const linkElements = previewRef.current.querySelectorAll('.card-link');
        const scaleX = width / containerRect.width;
        const scaleY = height / containerRect.height;

        linkElements.forEach((element) => {
          const anchor = element as HTMLAnchorElement;
          const href = anchor.href;
          if (href) {
            const rect = anchor.getBoundingClientRect();
            const x = (rect.left - containerRect.left) * scaleX;
            const y = (rect.top - containerRect.top) * scaleY;
            const w = rect.width * scaleX;
            const h = rect.height * scaleY;
            pdf.link(x, y, w, h, { url: href });
          }
        });

        pdf.save(`${data.fullName.replace(/\s+/g, '_')}_card.pdf`);
      } catch (err) {
         console.error('Failed to generate PDF', err);
      }
    }
  }, [data.fullName]);

  const handleDownloadVCard = useCallback(() => {
    const phone = data.links.find(l => l.type === 'phone')?.value || '';
    const email = data.links.find(l => l.type === 'email')?.value || '';
    const website = data.links.find(l => l.type === 'website')?.value || '';

    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:${data.fullName}
ORG:${data.companyCity}
TEL;TYPE=CELL:${phone}
EMAIL:${email}
URL:${website}
NOTE:${data.welcomeMessage}
END:VCARD`;

    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `${data.fullName.replace(/\s+/g, '_')}.vcf`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [data]);

  const handleGenerateQRCodePDF = useCallback(async () => {
    // Gera um ID único baseado no nome do usuário
    const userId = data.fullName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');

    // Usar URL de produção (Vercel) ou localhost
    const appUrl = import.meta.env.VITE_APP_URL || 
      (typeof window !== 'undefined' ? window.location.origin : 'https://cardgenerator.vercel.app');
    
    const baseUrl = `${appUrl}/card/${userId}`;

    // Adicionar parâmetros da query
    const params = new URLSearchParams({
      name: data.fullName,
      company: data.companyCity,
      message: data.welcomeMessage,
      photo: data.photoUrl,
      layout: data.layout,
      showQrCode: data.showQrCode.toString(),
      'view-only': 'true',
    });

    data.links.forEach((link, index) => {
      params.append(`link_${index}_type`, link.type);
      params.append(`link_${index}_label`, link.label);
      params.append(`link_${index}_value`, link.value);
    });

    const fullUrl = `${baseUrl}?${params.toString()}`;

    try {
      // Importar a biblioteca qrcode dinamicamente
      const QRCode = await import('qrcode');
      
      // Gerar QR code como data URL
      const qrDataUrl = await QRCode.toDataURL(fullUrl, { 
        width: 300, 
        margin: 1, 
        color: { dark: '#000000', light: '#ffffff' }
      });

      // Criar PDF com o QR Code
      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      });

      const pageWidth = pdf.internal.pageSize.getWidth();
      const pageHeight = pdf.internal.pageSize.getHeight();
      const margin = 20;

      // Título
      pdf.setFontSize(20);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Seu Cartão Digital', pageWidth / 2, margin + 10, { align: 'center' });

      // Informações do usuário
      pdf.setFontSize(14);
      pdf.setFont('helvetica', 'normal');
      pdf.text(`${data.fullName}`, pageWidth / 2, margin + 25, { align: 'center' });
      pdf.setFontSize(12);
      pdf.text(`${data.companyCity}`, pageWidth / 2, margin + 35, { align: 'center' });

      // QR Code
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.text('Escaneie para ver seu cartão:', pageWidth / 2, margin + 50, { align: 'center' });

      // Adicionar imagem QR Code
      const qrSize = 100;
      const qrX = (pageWidth - qrSize) / 2;
      const qrY = margin + 60;
      pdf.addImage(qrDataUrl, 'PNG', qrX, qrY, qrSize, qrSize);

      // URL do card
      pdf.setFontSize(8);
      pdf.setTextColor(100, 100, 100);
      pdf.setFont('helvetica', 'normal');
      pdf.text(fullUrl, pageWidth / 2, qrY + qrSize + 15, { align: 'center', maxWidth: pageWidth - 40 });

      // Mensagem de boas-vindas
      pdf.setFontSize(10);
      pdf.setTextColor(80, 80, 80);
      pdf.text(`"${data.welcomeMessage}"`, pageWidth / 2, qrY + qrSize + 30, { align: 'center', maxWidth: pageWidth - 40 });

      // Links do card
      if (data.links.length > 0) {
        pdf.setFontSize(11);
        pdf.setFont('helvetica', 'bold');
        pdf.setTextColor(0, 0, 0);
        pdf.text('Contatos:', pageWidth / 2, pageHeight - 80, { align: 'center' });

        pdf.setFontSize(9);
        pdf.setFont('helvetica', 'normal');
        let linksY = pageHeight - 70;
        data.links.forEach((link) => {
          pdf.text(`${link.label}: ${link.value}`, pageWidth / 2, linksY, { align: 'center', maxWidth: pageWidth - 40 });
          linksY += 7;
        });
      }

      // Rodapé
      pdf.setFontSize(8);
      pdf.setTextColor(150, 150, 150);
      pdf.text('Criado com CardGenius Pro', pageWidth / 2, pageHeight - 10, { align: 'center' });

      pdf.save(`${data.fullName.replace(/\s+/g, '_')}_QR_Code.pdf`);
    } catch (err) {
      console.error('Failed to generate QR Code PDF', err);
      alert(`Escaneie este link com seu celular:\n${fullUrl}`);
    }
  }, [data]);

  return (
    <GradientBackground className="min-h-screen" animationDuration={20} overlay overlayOpacity={0.03}>
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <Sparkles size={20} />
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600">
              {t.title}
            </h1>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-sm text-slate-600 bg-white/50 rounded-full px-3 py-1 border border-white/20 shadow-sm">
              <Globe size={16} />
              <select 
                value={language} 
                onChange={(e) => setLanguage(e.target.value as Language)}
                className="bg-transparent border-none focus:ring-0 cursor-pointer outline-none font-medium"
              >
                <option value="en">English</option>
                <option value="pt">Português</option>
                <option value="fr">Français</option>
                <option value="es">Español</option>
              </select>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-4 sm:p-6 lg:p-8 flex flex-col lg:flex-row gap-8 relative z-10">
        
        <div className="flex-1 order-2 lg:order-1 lg:max-w-xl">
          <div className="mb-6">
            <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-sm">{t.editor}</h2>
            <p className="text-white/80 drop-shadow-sm">{t.subtitle}</p>
          </div>
          <Editor 
            data={data} 
            onChange={setData} 
            currentThemeId={themeId}
            onThemeChange={setThemeId}
            t={t}
          />
        </div>

        <div className="flex-1 order-1 lg:order-2">
          <div className="lg:sticky lg:top-24 space-y-6">
            <div className="bg-white/10 backdrop-blur-sm p-4 rounded-3xl border border-white/20 flex justify-center items-center overflow-x-auto shadow-2xl">
                <Preview 
                    ref={previewRef} 
                    data={data} 
                    theme={currentTheme} 
                />
            </div>

            <div className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <button 
                  onClick={handleDownloadImage}
                  className="flex items-center justify-center gap-2 bg-slate-900 text-white py-3 px-4 rounded-xl font-medium hover:bg-slate-800 transition-all shadow-lg active:scale-95 text-sm"
                >
                  <Download size={18} />
                  {t.downloadImage}
                </button>
                <button 
                  onClick={handleDownloadPdf}
                  className="flex items-center justify-center gap-2 bg-white text-slate-900 border border-slate-200 py-3 px-4 rounded-xl font-medium hover:bg-slate-50 transition-all shadow-sm active:scale-95 text-sm"
                >
                  <Share2 size={18} />
                  {t.downloadPdf}
                </button>
              </div>
              
              <button 
                onClick={handleDownloadVCard}
                className="w-full flex items-center justify-center gap-2 bg-blue-600 text-white py-3 px-6 rounded-xl font-bold hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20 active:scale-95"
              >
                <UserPlus size={20} />
                {t.downloadVCard}
              </button>

              <button 
                onClick={handleGenerateQRCodePDF}
                className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 text-white py-3 px-6 rounded-xl font-bold hover:from-purple-700 hover:to-pink-700 transition-all shadow-lg shadow-purple-600/20 active:scale-95"
              >
                <QrCode size={20} />
                Gerar QR Code PDF
              </button>
            </div>
          </div>
        </div>
      </main>
    </GradientBackground>
  );
};

export default App;