# 🚀 Implementação de QR Code - CardGenius Pro

## ✅ O que foi feito

### 1. **Instalação de Dependências**
```bash
npm install qrcode.react react-router-dom
```

### 2. **Componentes Criados**

#### `QRCodeGenerator.tsx`
- Gera QR codes dinâmicos com a biblioteca `qrcode.react`
- Cria URLs únicas baseadas no nome do usuário
- Suporta codificação de todos os dados do cartão na URL (Query String)
- Exibe a URL no debug (texto pequeno abaixo do QR)

#### `QRCodeDebug.tsx`
- Componente flutuante (canto inferior direito) com informações de debug
- Mostra ID do usuário, tamanho da URL, número de links
- Botão para copiar a URL completa do QR Code

#### `CardPage.tsx` (em `/pages`)
- Página dinâmica que recebe dados via URL
- Decodifica parâmetros e reconstrói o cartão
- Renderiza o cartão com a mesma visualização do editor

### 3. **Roteamento**
- `index.tsx` atualizado com React Router
- Rota principal: `/` (editor)
- Rota dinâmica: `/card/:userId?...params` (visualização)

### 4. **Configuração Vercel**
- `vercel.json` com reescritas e headers de cache
- Configurado para SPA (Single Page Application)
- URLs limpas sem extensões

## 📋 Checklist de Uso

### No Editor (Página Principal)
- [ ] Preencha os dados do cartão (nome, empresa, mensagem, foto)
- [ ] Adicione links (telefone, email, redes sociais, etc)
- [ ] Marque "Show QR Code" para ativar
- [ ] Clique em "Download Image" ou "Download PDF" para salvar

### Para Testar o QR Code Localmente
1. Abra o DevTools (F12)
2. Vá à aba do componente QRCodeDebug
3. Clique em "Copy URL"
4. Cole em uma nova aba: `http://localhost:5173/card/seu-usuario...`
5. O cartão deve aparecer com todos os dados decodificados

### Para Deploy no Vercel
1. Faça commit de todos os arquivos:
```bash
git add .
git commit -m "feat: add QR Code functionality with dynamic routing"
git push
```

2. No Vercel:
   - Conecte seu repositório GitHub
   - Vercel detectará automaticamente Vite
   - Clique "Deploy"
   - Aguarde o build terminar

3. Copie a URL do seu projeto Vercel
4. Atualize o domínio em: `.env` ou na variável `VITE_APP_URL`

## 🔧 Configurações Avançadas

### Customizar Tamanho do QR Code
Em `QRCodeGenerator.tsx`, mude o parâmetro `size`:
```tsx
<QRCode
  value={profileUrl}
  size={200}  // Aumenta o tamanho
  level="H"
  ...
/>
```

### Ativar Componente de Debug
Para remover o debug em produção, edite `App.tsx`:
```tsx
import QRCodeDebug from './components/QRCodeDebug';

// No return do App:
{process.env.NODE_ENV === 'development' && (
  <QRCodeDebug data={data} userId={userId} />
)}
```

### Integrar com Banco de Dados (Futura)
1. Instale SDK (ex: Supabase):
```bash
npm install @supabase/supabase-js
```

2. Em `QRCodeGenerator.tsx`, salve os dados:
```tsx
const saveCardData = async () => {
  const { data, error } = await supabase
    .from('cards')
    .insert([{ user_id: userId, data }]);
};
```

3. Em `CardPage.tsx`, busque os dados:
```tsx
const { data } = await supabase
  .from('cards')
  .select()
  .eq('user_id', userId);
```

## 📊 Estrutura Final de Arquivos

```
cardgenius-pro/
├── src/
│   ├── components/
│   │   ├── Editor.tsx
│   │   ├── Preview.tsx
│   │   ├── QRCodeGenerator.tsx      ✨ NOVO
│   │   ├── QRCodeDebug.tsx          ✨ NOVO
│   │   └── ui/
│   ├── pages/
│   │   └── CardPage.tsx             ✨ NOVO
│   ├── App.tsx
│   ├── index.tsx                    ✏️ ATUALIZADO
│   ├── types.ts
│   ├── constants.ts
│   └── ...
├── vercel.json                      ✨ NOVO (atualizado)
├── .env.example                     ✨ NOVO
├── QR_CODE_GUIDE.md                ✨ NOVO (este arquivo)
└── package.json                     ✏️ ATUALIZADO
```

## 🐛 Troubleshooting

### "Cannot find module 'react-router-dom'"
```bash
npm install react-router-dom
```

### QR Code muito grande na URL
- Reduza o número de links
- Ou implemente a opção com banco de dados

### Deploy no Vercel falha
Verifique:
- [ ] `npm run build` funciona localmente?
- [ ] Todos os imports estão corretos?
- [ ] Variáveis de ambiente configuradas?

### QR Code não funciona após scan
1. Teste a URL no navegador manualmente
2. Verifique se os parâmetros estão corretos
3. Abra DevTools na página dinâmica para debugar

## 💡 Dicas Importantes

### Performance
- QR codes são renderizados no cliente (no navegador)
- URLs codificadas não requerem requisições de API
- Cache configurado por 1 hora no Vercel

### Segurança
- ⚠️ Dados são visíveis na URL (não usar para dados sensíveis)
- URLs podem ser compartilhadas apenas com pessoas autorizadas
- Para dados sensíveis, use um banco de dados com autenticação

### Próximas Melhorias
- [ ] Analytics para rastrear escanneações
- [ ] Temas dinâmicos via URL
- [ ] Banco de dados com histórico
- [ ] Gerador de miniatura/preview
- [ ] Integração com ferramentas de contato (vCard)

## 🎯 Exemplo de URL Completa

```
https://seu-projeto.vercel.app/card/joao-silva
?name=Jo%C3%A3o%20Silva
&company=Tech%20Company
&message=Let's%20connect!
&photo=https%3A%2F%2Fexample.com%2Fphoto.jpg
&link_0_type=email
&link_0_label=Email
&link_0_value=joao%40company.com
&link_1_type=phone
&link_1_label=Phone
&link_1_value=%2B55%2011999999999
&link_2_type=linkedin
&link_2_label=LinkedIn
&link_2_value=https%3A%2F%2Flinkedin.com%2Fin%2Fjoao
```

## 🚀 Próximos Passos

1. **Teste Localmente**
   ```bash
   npm run dev
   ```

2. **Teste o QR Code**
   - Preencha os dados
   - Ative "Show QR Code"
   - Escaneie com seu celular

3. **Deploy no Vercel**
   - Push para GitHub
   - Conecte no Vercel
   - Aguarde deployment

4. **Compartilhe**
   - Gere um QR Code
   - Escaneie em outro dispositivo
   - Verifique se tudo funciona

---

**Desenvolvido com ❤️ para CardGenius Pro**
**Última atualização: 16 de janeiro de 2026**
