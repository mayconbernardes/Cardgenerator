# 📱 Guia de Funcionalidade QR Code - CardGenius Pro

## Overview

A funcionalidade de QR Code foi implementada com a biblioteca `qrcode.react`, permitindo que cada cartão digital tenha um código QR único que aponta para um URL específico do usuário.

## Como Funciona

### 1. **Geração de QR Code**
- O componente `QRCodeGenerator.tsx` gera um QR code com base nos dados do cartão
- Cada QR Code é codificado com a URL do perfil: `https://seu-dominio.vercel.app/card/{usuario-id}`
- O ID do usuário é gerado automaticamente a partir do nome (convertido para slug)

### 2. **Armazenamento de Dados**
Existem duas estratégias:

#### **Opção A: Query String (Recomendada para Vercel)**
- Todos os dados do cartão são codificados na URL como parâmetros
- **Vantagem**: Não precisa de banco de dados
- **Desvantagem**: URL fica mais longa
- **URL Exemplo**:
```
https://seu-dominio.vercel.app/card/joao-silva?name=Joao%20Silva&company=Tech%20Company&...
```

#### **Opção B: Banco de Dados**
- Dados armazenados em um banco (Firebase, Supabase, etc)
- ID único aponta para o registro no banco
- **Vantagem**: URL mais curta e limpa
- **Desvantagem**: Requer backend/banco de dados

## Estrutura de Arquivos

```
/components
  ├── QRCodeGenerator.tsx     ← Componente de geração de QR Code
  ├── Preview.tsx             ← Integrado com o gerador
  └── ...

/pages
  └── CardPage.tsx            ← Página dinâmica que recebe dados via URL

/vercel.json                  ← Configuração para Vercel
.env.example                  ← Variáveis de ambiente
index.tsx                     ← Roteamento (React Router)
```

## Como Usar

### 1. **Ativar QR Code no Cartão**
No editor, marque a opção "Show QR Code" para incluir o QR code no cartão.

### 2. **Gerar QR Code**
Quando ativado, o QR Code é gerado automaticamente com base nos dados do cartão.

### 3. **Acessar via QR Code**
Quando alguém escaneia o QR Code, é levado à página dinâmica que reconstrói o cartão com os dados codificados na URL.

## Deployment no Vercel

### Pré-requisitos
```bash
npm install
```

### Setup Automático
1. Faça push do seu repositório para GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "New Project" e selecione seu repositório
4. Vercel detectará automaticamente a configuração Vite
5. Defina a variável de ambiente (opcional):
   - `VITE_APP_URL`: sua URL do Vercel

### Setup Manual
```bash
# Instalar Vercel CLI
npm i -g vercel

# Deploy
vercel
```

## Variáveis de Ambiente

Configure em `Settings > Environment Variables` no Vercel:

```
VITE_APP_URL=https://seu-projeto.vercel.app
```

## Tecnologias Utilizadas

- **qrcode.react**: Geração de QR Code
- **react-router-dom**: Roteamento dinâmico
- **Vite**: Build tool
- **TypeScript**: Type safety

## Limitações e Considerações

### Query String (Estratégia Atual)
- ✅ Funciona em hospedagem estática
- ✅ Sem necessidade de banco de dados
- ⚠️ URLs podem ficar longas (principalmente com muitos links)
- ⚠️ Dados visíveis na URL (não é seguro para dados sensíveis)

### Tamanho máximo de URL
- Navegadores suportam URLs de até 2000-8000 caracteres
- A maioria dos QR Codes consegue codificar sem problemas

## Futura Melhoria: Integração com Banco de Dados

Para usar um banco de dados (ex: Supabase, Firebase):

1. Instale SDK do banco:
```bash
npm install @supabase/supabase-js
```

2. Atualize `QRCodeGenerator.tsx`:
```tsx
const profileUrl = `${baseUrl}?id=${userId}`;
// Salve os dados no banco associado ao userId
```

3. Atualize `CardPage.tsx`:
```tsx
// Busque dados do banco usando o userId
const data = await fetchCardDataFromDB(userId);
```

## Exemplos de URLs Geradas

### Com Query String
```
https://cardgenius.vercel.app/card/joao-silva?name=Joao%20Silva&company=Tech%20Company&message=Hello%21&photo=...&link_0_type=email&link_0_label=Email&link_0_value=joao%40company.com&link_1_type=phone&link_1_label=Phone&link_1_value=%2B55%2011999999999
```

### Com Banco de Dados (Futura)
```
https://cardgenius.vercel.app/card/joao-silva?id=uuid-1234-5678
```

## Troubleshooting

### QR Code não aparece
- Verifique se "Show QR Code" está ativado no editor
- Verifique o console do navegador para erros

### Links não funcionam no cartão dinâmico
- Verifique se os dados foram codificados corretamente na URL
- Teste com um QR code simplificado (poucos links)

### Vercel deployment falha
- Certifique-se de que todos os packages estão instalados
- Verifique se `npm run build` funciona localmente
- Veja os logs de build no painel do Vercel

## Suporte e Contribuições

Para reportar problemas ou sugerir melhorias, abra uma issue no repositório.

---

**Desenvolvido com ❤️ para CardGenius Pro**
