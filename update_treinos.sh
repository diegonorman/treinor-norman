#!/bin/bash

echo "🔄 Atualizando treinos do Excel..."

# Converter Excel para JSON
python3 convert_excel.py

if [ $? -eq 0 ]; then
    echo "✅ Treinos atualizados com sucesso!"
    echo "📱 Recarregue o app no navegador para ver as mudanças"
    
    # Se estiver no Git, fazer commit automático
    if [ -d ".git" ]; then
        echo "📝 Fazendo commit das mudanças..."
        git add workout_data.json
        git commit -m "Atualizar treinos do Excel - $(date '+%d/%m/%Y %H:%M')"
        echo "🚀 Pronto para push no GitHub!"
    fi
else
    echo "❌ Erro ao converter Excel. Verifique o arquivo treinor.xlsx"
fi
