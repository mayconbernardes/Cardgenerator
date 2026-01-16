# 🏗️ Arquitetura da Funcionalidade QR Code

## 📐 Diagrama de Componentes

```
App.tsx (Página Principal)
├── Editor.tsx (Edita os dados)
│   └── Input fields (nome, empresa, links, etc)
│
├── Preview.tsx (Mostra o cartão)
│   ├── Dados do usuário
│   ├── Links renderizados
│   └── QRCodeGenerator.tsx ✨ NOVO
│       ├── Gera ID do usuário
│       ├── Cria URL com query params
│       ├── Renderiza QRCodeSVG
│       └── Exibe URL de debug
│
└── QRCodeDebug.tsx ✨ NOVO
    ├── Mostra info de debug
    ├── Botão "Copy URL"
    └── Display flutuante (mobile hidden)

Router (index.tsx) ✨ ATUALIZADO
├── / → App.tsx (editor)
└── /card/:userId → CardPage.tsx ✨ NOVO
    ├── Decodifica Query String
    ├── Reconstrói CardData
    └── Renderiza Preview com dados decodificados
```

---

## 🔄 Fluxo de Dados

### Fase 1: Criação do QR Code

```
┌──────────────┐
│ User Input   │
│ (nome, etc)  │
└──────┬───────┘
       │
       ▼
┌──────────────────────┐
│ CardData (state)     │
│ {fullName, links...} │
└──────┬───────────────┘
       │
       ▼
┌──────────────────────────────┐
│ QRCodeGenerator.tsx          │
│ 1. Cria userId (slug)        │
│ 2. Monta base URL            │
│ 3. Adiciona query params     │
│ 4. Renderiza QRCodeSVG       │
└──────┬───────────────────────┘
       │
       ▼
┌────────────────────────────────────────┐
│ QR Code SVG (visual)                   │
│ Codifica:                              │
│ /card/joao-silva                       │
│ ?name=...&company=...&link_0_type=...│
└────────────────────────────────────────┘
```

### Fase 2: Scanning do QR Code

```
┌──────────────────┐
│ User scans       │
│ QR Code          │
└────────┬─────────┘
         │
         ▼
┌──────────────────────────────────────┐
│ Browser opens URL:                   │
│ /card/joao-silva                     │
│ ?name=...&company=...&link_0_type=...│
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ React Router                 │
│ Matches /card/:userId route  │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ CardPage.tsx                 │
│ 1. Extrai useSearchParams()  │
│ 2. Decodifica cada param     │
│ 3. Reconstrói links array    │
│ 4. Cria CardData object      │
└────────┬─────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Preview.tsx                  │
│ Renderiza cartão com dados   │
└──────────────────────────────┘
```

---

## 🎨 Estrutura de Componentes

### QRCodeGenerator.tsx

```tsx
interface QRCodeGeneratorProps {
  data: CardData        // Todos os dados do cartão
  size?: number         // Tamanho (default: 150px)
  useQueryString?: bool // Estratégia (default: true)
}

function QRCodeGenerator({ data, size, useQueryString }) {
  // 1. Gera userId
  const userId = slugify(data.fullName)
  // "João Silva" → "joao-silva"
  
  // 2. Monta URL base
  const baseUrl = `${origin}/card/${userId}`
  // "http://localhost:5173/card/joao-silva"
  
  // 3. Adiciona query params
  const params = {
    name: data.fullName,
    company: data.companyCity,
    message: data.welcomeMessage,
    photo: data.photoUrl,
    link_0_type: data.links[0].type,
    link_0_label: data.links[0].label,
    link_0_value: data.links[0].value,
    // ... etc
  }
  
  // 4. Monta URL completa
  const profileUrl = `${baseUrl}?${URLSearchParams(params)}`
  
  // 5. Renderiza QRCodeSVG
  return <QRCodeSVG value={profileUrl} ... />
}
```

### CardPage.tsx

```tsx
function CardPage() {
  const [searchParams] = useSearchParams()
  
  // 1. Extrai parâmetros
  const name = searchParams.get('name')
  const company = searchParams.get('company')
  // ... etc
  
  // 2. Reconstrói links
  const links = []
  let i = 0
  while (searchParams.has(`link_${i}_type`)) {
    links.push({
      type: searchParams.get(`link_${i}_type`),
      label: searchParams.get(`link_${i}_label`),
      value: searchParams.get(`link_${i}_value`),
    })
    i++
  }
  
  // 3. Cria CardData
  const cardData = {
    fullName: name,
    companyCity: company,
    links: links,
    // ... etc
  }
  
  // 4. Renderiza com Preview
  return <Preview data={cardData} theme={theme} />
}
```

---

## 📊 Estrutura de Dados

### CardData (compartilhada)

```typescript
interface CardData {
  fullName: string              // "João Silva"
  companyCity: string           // "Tech Company"
  welcomeMessage: string        // "Let's connect!"
  photoUrl: string              // "https://..."
  backgroundImageUrl?: string   // Optional
  links: LinkItem[]             // Array de links
  layout: 'single' | 'double'   // Layout
  showQrCode: boolean           // Mostrar QR Code
}

interface LinkItem {
  id: string                    // "link-0"
  type: 'email' | 'phone' | ... // Tipo
  label: string                 // "Email"
  value: string                 // "user@company.com"
}
```

### URL Codificada

```
/card/joao-silva
  ?name=Joao%20Silva
  &company=Tech%20Company
  &message=Let%27s%20connect%21
  &photo=https%3A%2F%2Fexample.com%2Fphoto.jpg
  &link_0_type=email
  &link_0_label=Email
  &link_0_value=joao%40company.com
  &link_1_type=phone
  &link_1_label=Telefone
  &link_1_value=%2B55%2011999999999
```

---

## 🔌 Integração com Vercel

### Fluxo de Deploy

```
Local Repository
├── npm run dev     → Vercel Dev
├── npm run build   → Vercel Build
└── git push        → Vercel Deploy
                         ├── Build output → /dist
                         ├── Deploy to CDN
                         └── https://seu-projeto.vercel.app ✅
```

### Roteamento no Vercel

```
vercel.json
├── rewrites: [
│   {
│     source: "/card/:path*"
│     destination: "/"        → SPA routing
│   }
│ ]
└── headers: [
    {
      source: "/card/:path*"
      Cache-Control: "1 hour"  → Performance
    }
  ]
```

---

## 📈 Performance

### Tamanho de Bundle

```
dist/assets/
├── index.es-xxxxx.js        → ~150KB (QR Code + App)
├── html2canvas.esm-xxxxx.js → ~200KB (Download feature)
└── index-xxxxx.js           → ~775KB (Total)

Gzip: ~250KB
```

### Otimizações Aplicadas

✅ QR Code renderizado no cliente (sem API)
✅ Query String mantém dados localmente
✅ Cache de 1 hora no Vercel
✅ SVG ao invés de imagem (tamanho menor)

### Recomendações de Melhoria

💡 Implementar code-splitting para componentes pesados
💡 Lazy load do CardPage
💡 Compressão de imagens

---

## 🔐 Segurança

### Dados na URL

⚠️ **Não é seguro para dados sensíveis:**
- Dados visíveis no navegador e histórico
- Pode ser interceptado em HTTPS
- Visible em logs de servidor

✅ **Seguro para:**
- Nomes e contatos públicos
- Links de redes sociais
- URLs públicas

### Estratégia Alternativa (Banco de Dados)

```
Mais seguro:
/card/uuid-abc123  → Backend busca dados privados
                     → Renderia com segurança
```

---

## 🚀 Próximas Melhorias

### Curto Prazo
- [ ] Analytics de scans
- [ ] Validação de URLs
- [ ] Fallback se URL muito grande

### Médio Prazo
- [ ] Integração com banco de dados
- [ ] Autenticação de usuário
- [ ] Edição de cartões salvos

### Longo Prazo
- [ ] Integração com vCard
- [ ] Mobile app
- [ ] Marketplace de temas

---

## 📖 Referências

- [React Router Docs](https://reactrouter.com/)
- [qrcode.react Docs](https://www.npmjs.com/package/qrcode.react)
- [Vercel Docs](https://vercel.com/docs)
- [URLSearchParams API](https://developer.mozilla.org/en-US/docs/Web/API/URLSearchParams)

---

**Arquitetura versão: 1.0**
**Data: 16 de janeiro de 2026**
