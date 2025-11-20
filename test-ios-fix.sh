#!/bin/bash

echo "🔧 Aplicando correção para vídeos no iOS PWA..."

# Fazer backup
cp index.html index.html.backup
cp script.js script.js.backup

echo "✅ Backup criado"
echo "📱 Correção aplicada!"
echo ""
echo "🧪 Para testar:"
echo "1. Abra: http://localhost:8000/test-video-ios.html"
echo "2. Adicione na tela inicial do iOS"
echo "3. Teste os botões de vídeo"
echo ""
echo "🚀 Principais melhorias:"
echo "- Detecta PWA no iOS automaticamente"
echo "- Abre vídeos do YouTube no app nativo"
echo "- Iframe otimizado para melhor compatibilidade"
echo "- Parâmetros do YouTube para autoplay e menos cookies"

# Iniciar servidor se não estiver rodando
if ! pgrep -f "python.*http.server" > /dev/null; then
    echo ""
    echo "🌐 Iniciando servidor local..."
    python3 -m http.server 8000 &
    echo "Servidor rodando em: http://localhost:8000"
fi
