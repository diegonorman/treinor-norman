# 🔐 Configurar Autenticação Google Drive

## 1. Criar Projeto no Google Console

1. Acesse: https://console.developers.google.com/
2. Clique em "Criar Projeto"
3. Nome: "Treino App PWA"
4. Clique "Criar"

## 2. Ativar Google Drive API

1. No menu lateral: "APIs e Serviços" > "Biblioteca"
2. Pesquise: "Google Drive API"
3. Clique e depois "Ativar"

## 3. Criar Credenciais OAuth

1. "APIs e Serviços" > "Credenciais"
2. "Criar Credenciais" > "ID do cliente OAuth 2.0"
3. Tipo: "Aplicativo da Web"
4. Nome: "Treino App"
5. **URIs de redirecionamento autorizados:**
   - http://localhost:8000
   - https://seu-usuario.github.io (se usar GitHub Pages)
6. Clique "Criar"

## 4. Copiar Client ID

1. Copie o "ID do cliente" gerado
2. No arquivo `script.js`, substitua:
   ```javascript
   const GOOGLE_CLIENT_ID = 'SEU_CLIENT_ID_AQUI';
   ```
   Por:
   ```javascript
   const GOOGLE_CLIENT_ID = 'seu-client-id-real.apps.googleusercontent.com';
   ```

## 5. Como Funciona

- **Primeira vez**: App pede login no Google
- **Vídeos privados**: Acessa com sua conta automaticamente
- **Token salvo**: Não precisa logar toda vez
- **Dentro do PWA**: Tudo funciona sem sair do app

## 🚀 Resultado

Agora você pode ver vídeos privados do Google Drive dentro do PWA, usando sua conta Google!
