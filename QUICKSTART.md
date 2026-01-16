# 🎯 Quick Start - QR Code Feature

## 📱 30 segundos para começar

### 1️⃣ Inicie o app
```bash
npm run dev
```

### 2️⃣ Preencha os dados
- Nome
- Empresa/Cidade
- Mensagem de boas-vindas
- Foto (URL)
- Adicione links (email, telefone, redes sociais)

### 3️⃣ Ative QR Code
- Encontre o toggle "Show QR Code" no editor
- Marque ✅

### 4️⃣ Veja na preview
- QR Code aparece automaticamente no cartão
- Veja a URL em cinza pequeno abaixo do QR

### 5️⃣ Teste o QR Code
**Opção A - No celular:**
- Escaneie o QR Code com a câmera
- Cartão aparece em nova aba

**Opção B - No navegador:**
- Clique no botão de debug (canto inferior direito)
- Clique "Copy URL"
- Cole em nova aba
- Veja seu cartão carregado dinamicamente

---

## 🚀 Deploy no Vercel (3 minutos)

```bash
# 1. Commit das mudanças
git add .
git commit -m "Add QR Code feature"
git push

# 2. Acesse vercel.com
# 3. Clique "New Project"
# 4. Selecione seu repositório
# 5. Clique "Deploy"
# 6. Aguarde 2-3 minutos
# 7. Copie a URL do seu projeto
```

---

## 📋 Checklist Rápido

- [ ] `npm install` executado (já feito!)
- [ ] `npm run dev` funciona
- [ ] Dados preenchidos no editor
- [ ] "Show QR Code" ativado
- [ ] QR Code aparece na preview
- [ ] URL copiada do debug
- [ ] Testado no navegador
- [ ] Pronto para deploy!

---

## ❓ Dúvidas Frequentes

**P: Onde está o QR Code?**
R: No editor, procure por "Show QR Code" e marque ✅

**P: O QR Code não funciona?**
R: Certifique-se de que:
- QR Code está habilitado
- Você tem internet
- O navegador suporta roteamento (testado no Chrome)

**P: Como compartilho o cartão?**
R: Existem 3 formas:
1. Gere o QR Code e compartilhe a imagem
2. Compartilhe a URL da página dinâmica
3. Baixe a imagem PNG/PDF do cartão

**P: Posso customizar o QR Code?**
R: Sim! Veja `IMPLEMENTATION_GUIDE.md` para:
- Mudar tamanho
- Integrar com banco de dados
- Adicionar logos

---

## 🎨 Exemplo Completo

**Dados do Cartão:**
- Nome: João Silva
- Empresa: Tech Company
- Mensagem: "Let's connect!"
- Email: joao@company.com
- Telefone: +55 11 9999-9999
- LinkedIn: https://linkedin.com/in/joao

**URL Gerada:**
```
https://seu-projeto.vercel.app/card/joao-silva
?name=Joao+Silva
&company=Tech+Company
&message=Let's+connect!
&photo=https://example.com/photo.jpg
&link_0_type=email
&link_0_label=Email
&link_0_value=joao@company.com
&link_1_type=phone
&link_1_label=Telefone
&link_1_value=%2B55119999-9999
&link_2_type=linkedin
&link_2_label=LinkedIn
&link_2_value=https://linkedin.com/in/joao
```

**QR Code aponta para:** Essa URL completa

**Quando escaneado:** Cartão é renderizado com todos os dados

---

## 🔧 Precisa de Ajuda?

1. **Erro de build:** 
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   npm run build
   ```

2. **Erro em dev:**
   ```bash
   npm run dev
   # Abra F12 > Console para ver erros
   ```

3. **QR Code não funciona:**
   - Teste a URL manualmente no navegador
   - Verifique se todos os dados foram preenchidos
   - Reduza o número de links

4. **Deploy no Vercel falha:**
   - Veja os logs em Vercel Dashboard
   - Certifique-se de que `npm run build` funciona
   - Tente fazer push novamente

---

## 📚 Documentação Completa

- **QR_CODE_GUIDE.md** - Guia detalhado
- **IMPLEMENTATION_GUIDE.md** - Implementação técnica
- **QR_CODE_SUMMARY.md** - Resumo do que foi feito
- **QUICKSTART.md** - Este arquivo

---

## 🎉 Você está pronto!

```bash
npm run dev
# Abra http://localhost:5173
# Comece a criar cartões incríveis! 🚀
```

---

**Divirta-se criando cartões com QR Code!** 📱✨
