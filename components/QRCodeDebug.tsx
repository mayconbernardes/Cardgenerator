import React, { useState } from 'react';
import { Copy, Check } from 'lucide-react';
import { CardData } from '../types';

interface QRCodeDebugProps {
  data: CardData;
  userId: string;
}

const QRCodeDebug: React.FC<QRCodeDebugProps> = ({ data, userId }) => {
  const [copied, setCopied] = useState(false);

  // Gera a URL do perfil
  const baseUrl = typeof window !== 'undefined' 
    ? `${window.location.origin}/card/${userId}`
    : `https://seu-dominio.vercel.app/card/${userId}`;

  const params = new URLSearchParams({
    name: data.fullName,
    company: data.companyCity,
    message: data.welcomeMessage,
    photo: data.photoUrl,
  });

  data.links.forEach((link, index) => {
    params.append(`link_${index}_type`, link.type);
    params.append(`link_${index}_label`, link.label);
    params.append(`link_${index}_value`, link.value);
  });

  const fullUrl = `${baseUrl}?${params.toString()}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(fullUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs z-50 hidden md:block">
      <div className="text-sm font-semibold mb-2 text-gray-800">QR Code Debug Info</div>
      <div className="text-xs text-gray-600 mb-3 max-h-24 overflow-y-auto break-all">
        <strong>User ID:</strong> {userId}
        <br />
        <strong>URL Length:</strong> {fullUrl.length} chars
        <br />
        <strong>Links:</strong> {data.links.length}
      </div>
      <button
        onClick={handleCopy}
        className="w-full flex items-center justify-center gap-2 px-3 py-2 bg-blue-500 text-white rounded text-xs font-medium hover:bg-blue-600 transition"
      >
        {copied ? (
          <>
            <Check size={14} />
            Copied!
          </>
        ) : (
          <>
            <Copy size={14} />
            Copy URL
          </>
        )}
      </button>
    </div>
  );
};

export default QRCodeDebug;
