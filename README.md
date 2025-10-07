# 💪 App de Treino - Diego Norman

Sistema responsivo para mobile que lê treinos diretamente do Excel para acompanhar seus treinos de academia.

## 🚀 Funcionalidades

- ✅ **Lê dados do Excel**: Carrega treinos do arquivo `treinor.xlsx`
- ✅ **Interface Mobile-First**: Otimizado para smartphones
- ✅ **5 Treinos Diferentes**: Carregados automaticamente do Excel
- ✅ **Progresso Visual**: Barra de progresso e contador com animações
- ✅ **Persistência**: Salva seu progresso no navegador
- ✅ **Links para Vídeos**: Acesso rápido aos vídeos explicativos
- ✅ **Design Moderno**: Interface com glassmorphism e animações
- ✅ **Efeitos Especiais**: Confete ao completar exercícios! 🎊

## 📊 Como Funciona

O app lê os dados do arquivo **`treinor.xlsx`** e converte automaticamente para JSON. 
A estrutura do Excel deve ter as colunas:
- **DIA**: "DIA 1", "DIA 2", etc.
- **EXERCÍCIO**: Nome do exercício
- **SÉRIES**: Número de séries
- **REPETIÇÕES**: Número de repetições
- **PAUSA**: Tempo de descanso
- **OBSERVAÇÕES / DICAS**: Detalhes do exercício
- **LINK**: URL do vídeo explicativo

## 🔧 Como Usar

### 1. Primeira Configuração
```bash
# Converter Excel para JSON
python3 convert_excel.py

# Ou usar o script automático
./update_treinos.sh
```

### 2. Executar o App
```bash
# Iniciar servidor local
python3 -m http.server 8000

# Abrir no navegador
# http://localhost:8000
```

### 3. Atualizar Treinos
Sempre que modificar o `treinor.xlsx`:
```bash
./update_treinos.sh
```

## 📱 GitHub Pages

Para usar no GitHub Pages:

1. **Fazer upload dos arquivos**:
   ```bash
   git add .
   git commit -m "App de treino com dados do Excel"
   git push origin main
   ```

2. **Ativar GitHub Pages**:
   - Vá em Settings > Pages
   - Source: Deploy from a branch
   - Branch: main
   - Folder: / (root)

3. **Acessar**: `https://seu-usuario.github.io/nome-do-repo`

## 📱 Instalar no iOS

1. Abra o app no Safari
2. Toque no botão de compartilhar
3. Selecione "Adicionar à Tela de Início"
4. Agora você tem o app instalado como PWA! 📱

## 🎨 Recursos Visuais

- **Glassmorphism**: Efeito de vidro moderno
- **Gradientes animados**: Background que muda de cor
- **Confete**: Animação ao completar exercícios
- **Efeitos de ondas**: Feedback visual nos botões
- **Ícones automáticos**: Cada exercício ganha emoji baseado no tipo
- **Transições suaves**: Animações em todas as interações

## 🔄 Fluxo de Trabalho

1. **Editar treinos**: Modifique `treinor.xlsx`
2. **Converter**: Execute `./update_treinos.sh`
3. **Testar**: Recarregue o app no navegador
4. **Publicar**: Faça push para GitHub
5. **Usar**: Acesse via GitHub Pages no celular

## 📁 Estrutura de Arquivos

```
treino-app/
├── index.html          # Interface principal
├── style.css           # Estilos modernos
├── script.js           # Lógica do app
├── treinor.xlsx        # 📊 Seus dados de treino
├── workout_data.json   # Dados convertidos
├── convert_excel.py    # Conversor Excel → JSON
├── update_treinos.sh   # Script de atualização
├── manifest.json       # PWA config
└── sw.js              # Service Worker
```

## 🎯 Vantagens

- **📊 Excel como banco de dados**: Fácil de editar
- **🌐 Funciona offline**: PWA com cache
- **📱 App nativo**: Instala no iOS/Android
- **🔄 Fácil atualização**: Script automatizado
- **🎨 Visual moderno**: Interface profissional
- **⚡ Rápido**: Carregamento instantâneo

---

**Desenvolvido para Diego Norman Morais Barros do Nascimento**
*Sistema que lê Excel e vira app de treino profissional* 💪✨
