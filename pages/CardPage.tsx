import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { CardData } from '../types';
import Preview from '../components/Preview';
import { THEMES } from '../constants';
import { ThemeSelector } from '../components/ThemeSelector';
import { CARD_PAGE_THEMES, ThemeKey } from '../lib/cardThemes';
import { ArrowLeft, Copy, Download } from 'lucide-react';

// Exemplos pré-configurados de cartões
const DEMO_CARDS = [
  {
    name: 'Sofia Martinez',
    company: 'Creative Design Studio | Madrid',
    message: 'Bringing ideas to life through design',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    links: [
      { type: 'email', label: 'Email', value: 'sofia@designstudio.com' },
      { type: 'phone', label: '+34 91 234 5678', value: '+34912345678' },
      { type: 'instagram', label: 'Instagram', value: 'https://instagram.com/sofiam' },
      { type: 'portfolio', label: 'Portfolio', value: 'https://sofiaportfolio.com' },
    ]
  },
  {
    name: 'James Chen',
    company: 'Tech Innovation Labs | San Francisco',
    message: 'Building the future with code',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    links: [
      { type: 'email', label: 'Email', value: 'james@techlab.io' },
      { type: 'phone', label: '+1 (415) 555-0123', value: '+14155550123' },
      { type: 'linkedin', label: 'LinkedIn', value: 'https://linkedin.com/in/jameschen' },
      { type: 'github', label: 'GitHub', value: 'https://github.com/jameschen' },
    ]
  },
  {
    name: 'Maria Santos',
    company: 'Global Marketing Agency | São Paulo',
    message: 'Connecting brands with people',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    links: [
      { type: 'email', label: 'Email', value: 'maria@marketingagency.br' },
      { type: 'phone', label: '+55 11 98765 4321', value: '+5511987654321' },
      { type: 'instagram', label: 'Instagram', value: 'https://instagram.com/maria_santos' },
      { type: 'website', label: 'Website', value: 'https://mariaconsulting.com.br' },
    ]
  },
  {
    name: 'David Kumar',
    company: 'Digital Solutions | Mumbai',
    message: 'Technology that transforms businesses',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    links: [
      { type: 'email', label: 'Email', value: 'david@digitalsolutions.in' },
      { type: 'phone', label: '+91 98765 43210', value: '+919876543210' },
      { type: 'linkedin', label: 'LinkedIn', value: 'https://linkedin.com/in/davidkumar' },
      { type: 'website', label: 'Website', value: 'https://digitalsolutions.in' },
    ]
  },
  {
    name: 'Emma Johnson',
    company: 'Wellness & Health | London',
    message: 'Helping you achieve optimal health',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    links: [
      { type: 'email', label: 'Email', value: 'emma@wellnesscenter.co.uk' },
      { type: 'phone', label: '+44 (0)20 7946 0000', value: '+442079460000' },
      { type: 'instagram', label: 'Instagram', value: 'https://instagram.com/emmawellness' },
      { type: 'website', label: 'Clinic', value: 'https://wellnesscenter.co.uk' },
    ]
  },
  {
    name: 'Lucas Ferreira',
    company: 'Fashion & Luxury Boutique | Rio de Janeiro',
    message: 'Style is a statement of individuality',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    links: [
      { type: 'email', label: 'Email', value: 'lucas@luxureboutique.com.br' },
      { type: 'phone', label: '+55 21 3333 4444', value: '+552133334444' },
      { type: 'instagram', label: 'Instagram', value: 'https://instagram.com/fashionlucas' },
      { type: 'website', label: 'Shop', value: 'https://luxureboutique.com.br' },
    ]
  },
  {
    name: 'Sophia Rossi',
    company: 'Architectural Design | Milan',
    message: 'Creating spaces that inspire',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    links: [
      { type: 'email', label: 'Email', value: 'sophia@archdesign.it' },
      { type: 'phone', label: '+39 02 1234 5678', value: '+390212345678' },
      { type: 'portfolio', label: 'Portfolio', value: 'https://sophiarossi.it' },
      { type: 'instagram', label: 'Instagram', value: 'https://instagram.com/sophiarossi' },
    ]
  },
  {
    name: 'Michael Zhang',
    company: 'E-Commerce Solutions | Shanghai',
    message: 'Scaling your online business',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    links: [
      { type: 'email', label: 'Email', value: 'michael@ecommerce.cn' },
      { type: 'phone', label: '+86 21 5555 5555', value: '+862155555555' },
      { type: 'linkedin', label: 'LinkedIn', value: 'https://linkedin.com/in/michaelzhang' },
      { type: 'wechat', label: 'WeChat', value: 'michaelzhang123' },
    ]
  },
  {
    name: 'Clara Gonzalez',
    company: 'Event Planning & Productions | Barcelona',
    message: 'Making moments unforgettable',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    links: [
      { type: 'email', label: 'Email', value: 'clara@eventspro.es' },
      { type: 'phone', label: '+34 93 123 4567', value: '+34931234567' },
      { type: 'instagram', label: 'Instagram', value: 'https://instagram.com/claraevents' },
      { type: 'website', label: 'Website', value: 'https://eventspro.es' },
    ]
  },
  {
    name: 'Rajesh Patel',
    company: 'IT Consulting & Development | Delhi',
    message: 'Your digital transformation partner',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    links: [
      { type: 'email', label: 'Email', value: 'rajesh@itconsult.in' },
      { type: 'phone', label: '+91 11 9876 5432', value: '+911198765432' },
      { type: 'linkedin', label: 'LinkedIn', value: 'https://linkedin.com/in/rajeshpatel' },
      { type: 'github', label: 'GitHub', value: 'https://github.com/rajeshpatel' },
    ]
  },
  {
    name: 'Natasha Volkov',
    company: 'Fine Arts Gallery | Moscow',
    message: 'Curating exceptional artistic experiences',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop',
    links: [
      { type: 'email', label: 'Email', value: 'natasha@artgallery.ru' },
      { type: 'phone', label: '+7 495 123 4567', value: '+74951234567' },
      { type: 'website', label: 'Gallery', value: 'https://artgallery.ru' },
      { type: 'instagram', label: 'Instagram', value: 'https://instagram.com/artgallerynatasha' },
    ]
  },
  {
    name: 'Yuki Tanaka',
    company: 'Sustainable Fashion | Tokyo',
    message: 'Beauty with responsibility',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop',
    links: [
      { type: 'email', label: 'Email', value: 'yuki@sustainablefashion.jp' },
      { type: 'phone', label: '+81 3 1234 5678', value: '+81312345678' },
      { type: 'instagram', label: 'Instagram', value: 'https://instagram.com/yukisustainable' },
      { type: 'website', label: 'Shop', value: 'https://sustainablefashion.jp' },
    ]
  },
  {
    name: 'Antoine Dupont',
    company: 'Culinary Ventures | Paris',
    message: 'Redefining the gastronomic experience',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop',
    links: [
      { type: 'email', label: 'Email', value: 'antoine@culinaryventures.fr' },
      { type: 'phone', label: '+33 1 2345 6789', value: '+33123456789' },
      { type: 'instagram', label: 'Instagram', value: 'https://instagram.com/chefantoine' },
      { type: 'website', label: 'Restaurant', value: 'https://culinaryventures.fr' },
    ]
  },
  {
    name: 'Chen Wei',
    company: 'Fintech Innovation | Singapore',
    message: 'Revolutionizing financial services',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    links: [
      { type: 'email', label: 'Email', value: 'chen.wei@fintech-sg.com' },
      { type: 'phone', label: '+65 6234 5678', value: '+6562345678' },
      { type: 'linkedin', label: 'LinkedIn', value: 'https://linkedin.com/in/chenwei' },
      { type: 'website', label: 'Platform', value: 'https://fintech-sg.com' },
    ]
  },
  {
    name: 'Robert Chen',
    company: 'Venture Capital Fund | Singapore',
    message: 'Investing in the future of innovation',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop',
    links: [
      { type: 'email', label: 'Email', value: 'robert@venturesg.com' },
      { type: 'phone', label: '+65 6234 5678', value: '+6562345678' },
      { type: 'linkedin', label: 'LinkedIn', value: 'https://linkedin.com/in/robertchen' },
      { type: 'website', label: 'Portfolio', value: 'https://venturerg.com' },
    ]
  },
];

const CardPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const [cardData, setCardData] = useState<CardData | null>(null);
  const [loading, setLoading] = useState(true);
  const [showExamples, setShowExamples] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState<ThemeKey>('modern');
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar se há parâmetros na URL
    const hasParams = Array.from(searchParams.keys()).length > 0;
    
    if (!hasParams) {
      setShowExamples(true);
      setLoading(false);
      return;
    }

    // Decodificar dados da URL
    const name = searchParams.get('name') || 'User';
    const company = searchParams.get('company') || 'Company';
    const message = searchParams.get('message') || 'Welcome!';
    const photo = searchParams.get('photo') || 'https://picsum.photos/200/200';
    
    // Reconstruir links
    const links = [];
    let linkIndex = 0;
    
    while (searchParams.has(`link_${linkIndex}_type`)) {
      const linkType = searchParams.get(`link_${linkIndex}_type`);
      const linkLabel = searchParams.get(`link_${linkIndex}_label`);
      const linkValue = searchParams.get(`link_${linkIndex}_value`);
      
      if (linkType && linkLabel && linkValue) {
        links.push({
          id: `link-${linkIndex}`,
          type: linkType as any,
          label: linkLabel,
          value: linkValue,
        });
      }
      
      linkIndex++;
    }

    const data: CardData = {
      fullName: name,
      companyCity: company,
      welcomeMessage: message,
      photoUrl: photo,
      links,
      layout: 'single',
      showQrCode: true,
    };

    setCardData(data);
    setLoading(false);
  }, [searchParams]);

  const handleLoadExample = (example: any) => {
    const params = new URLSearchParams();
    params.append('name', example.name);
    params.append('company', example.company);
    params.append('message', example.message);
    params.append('photo', example.photo);
    
    example.links.forEach((link: any, index: number) => {
      params.append(`link_${index}_type`, link.type);
      params.append(`link_${index}_label`, link.label);
      params.append(`link_${index}_value`, link.value);
    });

    navigate(`/card?${params.toString()}`);
  };

  const handleCopyUrl = () => {
    navigator.clipboard.writeText(window.location.href);
    alert('URL copied to clipboard!');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-center space-y-4">
          <div className="animate-spin rounded-full h-16 w-16 border-4 border-slate-700 border-t-purple-400 mx-auto"></div>
          <p className="text-lg font-semibold">Loading...</p>
        </div>
      </div>
    );
  }

  // Exemplo grid com estilos do tema selecionado
  if (showExamples) {
    const theme = CARD_PAGE_THEMES[selectedTheme];
    
    return (
      <div className={`min-h-screen ${theme.background} p-4 md:p-8`}>
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-10 md:mb-16 text-center space-y-4">
            <h1 className={`text-3xl md:text-5xl font-bold ${theme.text}`}>
              CardGenius Pro
            </h1>
            <p className={`text-lg md:text-xl opacity-80 ${theme.text}`}>
              Create stunning business cards with QR codes
            </p>
          </div>

          {/* Theme Selector */}
          <ThemeSelector selectedTheme={selectedTheme} onThemeChange={setSelectedTheme} />

          {/* CTA Button */}
          <div className="text-center mb-12">
            <button
              onClick={() => navigate('/')}
              className={`flex items-center gap-2 mx-auto px-6 py-3 ${theme.button} ${theme.text} rounded-lg font-semibold transition-all duration-300 transform hover:scale-105`}
            >
              <ArrowLeft size={20} />
              Create Your Card
            </button>
          </div>

          {/* Examples Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {DEMO_CARDS.map((example, index) => (
              <div
                key={index}
                className={`group ${theme.card} ${theme.cardHover} rounded-xl p-6 md:p-8 transition-all duration-300`}
              >
                {/* Profile Section */}
                <div className="flex items-center gap-4 mb-6">
                  <img
                    src={example.photo}
                    alt={example.name}
                    className={`w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 ${theme.image}`}
                  />
                  <div className="flex-1 min-w-0">
                    <h3 className={`text-lg md:text-xl font-bold ${theme.text} truncate`}>
                      {example.name}
                    </h3>
                    <p className={`text-xs md:text-sm opacity-70 line-clamp-2 ${theme.text}`}>
                      {example.company}
                    </p>
                  </div>
                </div>

                {/* Message */}
                <p className={`text-sm italic mb-6 px-4 py-3 rounded-lg border-l-2 ${theme.accent} opacity-80 ${theme.text}`}>
                  "{example.message}"
                </p>

                {/* Links Preview */}
                <div className="space-y-2 mb-6">
                  {example.links.slice(0, 3).map((link: any, linkIndex: number) => (
                    <div
                      key={linkIndex}
                      className={`flex items-center gap-2 text-xs md:text-sm opacity-75 ${theme.text}`}
                    >
                      <div className={`w-1.5 h-1.5 rounded-full ${theme.accent}`}></div>
                      <span className="truncate">{link.label}</span>
                    </div>
                  ))}
                  {example.links.length > 3 && (
                    <div className={`text-xs opacity-50 px-3 py-1 ${theme.text}`}>
                      +{example.links.length - 3} more contact(s)
                    </div>
                  )}
                </div>

                {/* Action Button */}
                <button
                  onClick={() => handleLoadExample(example)}
                  className={`w-full px-4 py-3 md:py-4 ${theme.button} ${theme.text} rounded-lg font-semibold transition-all duration-300 transform group-hover:translate-y-[-2px] group-hover:shadow-lg`}
                >
                  View Card
                </button>

                {/* Theme Badge */}
                <div className={`mt-4 pt-4 border-t border-opacity-30 ${theme.accent}`}>
                  <p className={`text-xs opacity-60 text-center ${theme.text}`}>
                    Theme: {theme.name}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Footer */}
          <div className={`text-center mt-12 md:mt-16 pt-8 border-t border-opacity-20 ${theme.accent}`}>
            <p className={`${theme.text} text-sm md:text-base opacity-70`}>
              Created with ❤️ using CardGenius Pro
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (!cardData) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-white text-center space-y-4">
          <p className="text-xl font-semibold">Card not found</p>
          <button
            onClick={() => navigate('/card')}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all duration-300"
          >
            View Examples
          </button>
        </div>
      </div>
    );
  }

  const defaultTheme = THEMES[0];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex flex-col items-center justify-center p-4 md:p-8">
      {/* Top Navigation */}
      <div className="w-full flex items-center justify-between mb-8 md:mb-12">
        <button
          onClick={() => navigate('/')}
          className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 text-white hover:bg-slate-700/50 rounded-lg transition-all duration-300"
        >
          <ArrowLeft size={20} />
          <span className="hidden md:inline">Back</span>
        </button>
        <div className="flex gap-3">
          <button
            onClick={handleCopyUrl}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all duration-300"
            title="Copy card URL"
          >
            <Copy size={20} />
            <span className="hidden md:inline">Copy</span>
          </button>
          <button
            onClick={() => window.print()}
            className="flex items-center gap-2 px-4 md:px-6 py-2 md:py-3 bg-slate-700/50 hover:bg-slate-700 text-white rounded-lg transition-all duration-300"
            title="Print card"
          >
            <Download size={20} />
            <span className="hidden md:inline">Print</span>
          </button>
        </div>
      </div>

      {/* Card Preview */}
      <div className="w-full max-w-2xl">
        <Preview data={cardData} theme={defaultTheme} />
      </div>

      {/* Footer Info */}
      <div className="mt-12 text-center text-slate-400 text-sm md:text-base space-y-2">
        <p>Share this card using the QR code or URL above</p>
        <p className="text-xs md:text-sm">Created with CardGenius Pro ✨</p>
      </div>
    </div>
  );
};

export default CardPage;
