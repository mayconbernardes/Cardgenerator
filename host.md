# 🚀 Guia Completo: Deploy CardGenius Pro no Vercel

## 📋 Pré-requisitos

- ✅ Conta no GitHub (crie em https://github.com/signup)
- ✅ Conta no Vercel (crie em https://vercel.com/signup)
- ✅ Node.js instalado (v16+)
- ✅ Git instalado
- ✅ Projeto CardGenius Pro em um repositório GitHub

---

## 🔧 Passo 1: Preparar o Repositório GitHub

### 1.1 Criar Repositório no GitHub

1. Acesse https://github.com/new
2. Nome do repositório: `cardgenius-pro`
3. Descrição: `Professional Digital Business Card Generator`
4. Escolha `Public` ou `Private`
5. **NÃO** inicialize com README (vamos fazer isso localmente)
6. Clique em **"Create repository"**

### 1.2 Enviar Projeto para GitHub

No terminal, dentro da pasta `cardgenius-pro`:

```bash
# Inicializar git (se ainda não estiver)
git init

# Adicionar remote
git remote add origin https://github.com/SEU_USUARIO/cardgenius-pro.git

# Adicionar todos os arquivos
git add .

# Commit inicial
git commit -m "Initial commit: CardGenius Pro v1.0"

# Enviar para GitHub
git branch -M main
git push -u origin main
```

**Resultado esperado:**
```
 * [new branch]      main -> main
Branch 'main' set up to track remote branch 'main' from 'origin'.
```

---

## 🌐 Passo 2: Conectar Vercel com GitHub

### 2.1 Acessar Vercel

1. Acesse https://vercel.com/dashboard
2. Faça login com GitHub (recomendado)
3. Clique em **"+ New Project"** ou **"Create"**

### 2.2 Selecionar Repositório

1. Clique em **"Select a Git Repository"**
2. Se não aparecer `cardgenius-pro`, clique em **"Configure Git Integration"**
3. Selecione seu repositório `cardgenius-pro`
4. Clique em **"Import"**

---

## ⚙️ Passo 3: Configurar o Projeto

### 3.1 Configurações do Build

A Vercel deve detectar automaticamente que é um projeto Vite. Confirme:

**Framework Preset:** `Vite`

**Build Command:**
```bash
npm run build
```

**Output Directory:**
```
dist
```

**Install Command:**
```bash
npm install
```

### 3.2 Environment Variables (Opcional)

Se tiver variáveis de ambiente, adicione aqui. Para CardGenius Pro, geralmente não é necessário.

**Deixe em branco** ou adicione apenas se precisar.

---

## ✅ Passo 4: Deploy

### 4.1 Confirmar e Deploy

1. Revise todas as configurações
2. Clique em **"Deploy"**
3. Aguarde 2-5 minutos...

**Você verá:**
- Build em progresso
- Verificações de qualidade
- Link do seu site!

### 4.2 Resultado Final

Quando o deploy terminar, você receberá um link como:

```
https://cardgenius-pro-abcd1234.vercel.app
```

---

## 🎯 Passo 5: Domínio Customizado (Opcional)

### 5.1 Adicionar Domínio Próprio

1. No painel Vercel, vá para **Settings** > **Domains**
2. Clique em **"Add"**
3. Digite seu domínio (ex: `cardgenius.com.br`)
4. Siga as instruções para configurar DNS

### 5.2 Configurar DNS no seu Provedor

Adicione os registros de DNS fornecidos pela Vercel:

Exemplo (pode variar):
```
CNAME: www.cardgenius.com.br → cname.vercel-dns.com
```

---

## 🔄 Passo 6: Deploy Automático

Depois da primeira configuração, **todo push para GitHub dispara um novo deploy automaticamente!**

```bash
# Fazer uma alteração
git add .
git commit -m "Update: Nova feature X"
git push origin main

# Vercel deteta e faz deploy automaticamente
```

---

## 📊 Passo 7: Monitorar o Projeto

### 7.1 Dashboard Vercel

- **Deployments:** Veja histórico de deploys
- **Analytics:** Visualizações e performance
- **Logs:** Erros e informações de build
- **Settings:** Configurações gerais

### 7.2 Verificar Status

```bash
# Ver URL do projeto
vercel inspect cardgenius-pro

# Ver logs do último deploy
vercel logs
```

---

## 🐛 Troubleshooting

### Problema: Build falha

**Solução:**
```bash
# Verificar se build funciona localmente
npm run build

# Se der erro, ver qual é o problema
npm run build 2>&1

# Depois fazer push
git push origin main
```

### Problema: Página em branco

**Solução:**
1. Abra Console do Navegador (F12)
2. Veja se há erros
3. Se houver erro de importação, verifique:
   - Nomes de arquivos (case-sensitive!)
   - Caminhos relativos em componentes

### Problema: Assets não carregam

**Solução:**
Adicione `vite.config.ts`:
```typescript
export default defineConfig({
  plugins: [react()],
  base: '/', // Confirmar que está '/'
})
```

### Problema: Variáveis de ambiente não funcionam

**Solução:**
1. Rename `.env.local` para `.env` (se usar)
2. Adicione em Vercel → Settings → Environment Variables
3. Prefixe com `VITE_` para o frontend:
   ```
   VITE_API_URL=https://api.example.com
   ```

---

## 📱 Passo 8: Testar após Deploy

### 8.1 Verificações Essenciais

- [ ] Acesse o link do Vercel (não localhost!)
- [ ] Teste tema selector ("Escolher Estilo")
- [ ] Teste download de imagem
- [ ] Teste responsividade (mobile, tablet, desktop)
- [ ] Teste em navegadores diferentes (Chrome, Firefox, Safari)

### 8.2 Performance

Vercel fornece:
- **Lighthouse Score:** Veja em Analytics
- **Web Vitals:** Core Web Vitals
- **CDN Global:** Automático para todos os usuários

---

## 🎓 Passo 9: Atualizações Futuras

### 9.1 Fazer Alterações

```bash
# Clonar repositório em outro lugar
git clone https://github.com/SEU_USUARIO/cardgenius-pro.git

# Fazer alterações
code .

# Commit e push
git add .
git commit -m "Descrição das mudanças"
git push origin main

# Vercel faz deploy automaticamente!
```

### 9.2 Ver Histórico

No dashboard Vercel → **Deployments** → Veja todos os deploys

---

## 🔐 Boas Práticas

### 1. Proteger Dados Sensíveis

❌ **NÃO faça commit de:**
- `.env.local`
- Senhas
- Chaves de API

✅ **Faça:**
```
# .gitignore
.env
.env.local
.env.*.local
node_modules/
dist/
```

### 2. Usar Branches

```bash
# Criar branch para desenvolvimento
git checkout -b feature/nova-funcionalidade

# Depois fazer PR para main
# (Pull Request no GitHub)
```

### 3. Monitorar Performance

- Use Vercel Analytics
- Veja Web Vitals mensalmente
- Otimize imagens grandes
- Use lazy loading para imagens

---

## 📞 Links Úteis

- **Dashboard Vercel:** https://vercel.com/dashboard
- **Documentação Vercel:** https://vercel.com/docs
- **Vercel CLI:** https://vercel.com/docs/cli
- **GitHub:** https://github.com
- **Vite Docs:** https://vitejs.dev

---

## 🎉 Sucesso!

Após seguir estes passos, seu CardGenius Pro estará **online e pronto para o mundo!**

**URL Final:**
```
https://seu-dominio.com
ou
https://cardgenius-pro-xxx.vercel.app
```

---

## 💡 Dicas Extras

### Usar Vercel CLI (Avançado)

```bash
# Instalar
npm install -g vercel

# Fazer login
vercel login

# Deploy local (testa antes)
vercel dev

# Deploy para produção
vercel --prod

# Verificar URL
vercel ls
```

### Configurar Redirects (se precisar)

Crie `vercel.json`:
```json
{
  "redirects": [
    {
      "source": "/card",
      "destination": "/card/",
      "permanent": false
    }
  ]
}
```

### Custom Domain com Email

Vercel oferece emails customizados em domínios paid.

---

**Última atualização:** Janeiro 2026  
**Versão:** CardGenius Pro v1.0
