import React, { useMemo } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { CardData } from '../types';

interface QRCodeGeneratorProps {
  data: CardData;
  size?: number;
  useQueryString?: boolean;
}

const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ 
  data, 
  size = 150,
  useQueryString = true 
}) => {
  // Gera um ID único baseado no nome do usuário (sanitizado)
  const userId = useMemo(() => {
    return data.fullName
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^\w-]/g, '');
  }, [data.fullName]);

  // Gera a URL do perfil
  const profileUrl = useMemo(() => {
    const baseUrl = typeof window !== 'undefined' 
      ? `${window.location.origin}/card/${userId}`
      : `https://seu-dominio.vercel.app/card/${userId}`;

    if (useQueryString) {
      // Opção: Codificar dados na URL para não precisar de banco de dados
      const params = new URLSearchParams({
        name: data.fullName,
        company: data.companyCity,
        message: data.welcomeMessage,
        photo: data.photoUrl,
        'view-only': 'true',
      });

      // Adicionar links
      data.links.forEach((link, index) => {
        params.append(`link_${index}_type`, link.type);
        params.append(`link_${index}_label`, link.label);
        params.append(`link_${index}_value`, link.value);
      });

      return `${baseUrl}?${params.toString()}`;
    }

    return baseUrl;
  }, [data, userId, useQueryString]);

  return (
    <div className="flex flex-col items-center animate-in fade-in zoom-in duration-500">
      <div className="p-2 bg-white rounded-xl shadow-inner mb-2 border border-slate-100">
        <QRCodeSVG
          value={profileUrl}
          size={size}
          level="H"
          includeMargin={true}
          bgColor="#ffffff"
          fgColor="#000000"
        />
      </div>
      <p className="text-[10px] uppercase tracking-widest opacity-40 font-bold">
        Scan to Connect
      </p>
      <p className="text-[8px] opacity-30 mt-1 text-center max-w-xs break-all">
        {profileUrl}
      </p>
    </div>
  );
};

export default QRCodeGenerator;
