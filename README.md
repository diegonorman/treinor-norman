# 💪 App de Treino - Diego Norman

Sistema responsivo para mobile para acompanhar seus treinos de academia.

## 🚀 Funcionalidades

- ✅ **Interface Mobile-First**: Otimizado para smartphones
- ✅ **3 Treinos Diferentes**: A, B e C com exercícios específicos
- ✅ **Progresso Visual**: Barra de progresso e contador
- ✅ **Persistência**: Salva seu progresso no navegador
- ✅ **Links para Vídeos**: Acesso rápido aos vídeos explicativos
- ✅ **Design Moderno**: Interface limpa e intuitiva

## 📱 Como Usar

1. Abra o arquivo `index.html` no seu navegador mobile
2. Navegue entre os treinos A, B e C
3. Marque os exercícios conforme os completa
4. Acompanhe seu progresso na barra superior
5. Clique nos links de vídeo para ver a execução correta

## 🔧 Personalização

### Modificar Exercícios
Edite o arquivo `script.js` na seção `workoutData` para:
- Adicionar/remover exercícios
- Alterar séries e repetições
- Modificar links dos vídeos
- Personalizar descrições

### Exemplo de Exercício:
```javascript
{
    name: "Nome do Exercício",
    sets: "4x8-12",
    details: "Descrição da execução",
    video: "https://youtube.com/watch?v=seu-video"
}
```

### Adicionar Mais Treinos
Para adicionar treino D, E, etc:
1. Adicione nova entrada em `workoutData`
2. Adicione botão correspondente no HTML
3. Atualize a função `showDay()`

## 📊 Funcionalidades Extras

- **Reset de Progresso**: Clique no título "💪 Meu Treino" para resetar
- **Armazenamento Local**: Progresso salvo automaticamente
- **Responsivo**: Funciona em qualquer tamanho de tela

## 🎨 Cores e Tema

O app usa um gradiente azul/roxo moderno. Para personalizar:
- Edite as variáveis CSS em `style.css`
- Modifique as cores do gradiente
- Ajuste cores dos botões e cards

## 📱 Instalação como PWA (Opcional)

Para usar como app nativo, adicione ao `index.html`:
```html
<link rel="manifest" href="manifest.json">
```

E crie um arquivo `manifest.json` para instalação na tela inicial.

## 🔄 Backup dos Dados

Os dados ficam salvos no navegador. Para backup:
1. Abra as ferramentas do desenvolvedor (F12)
2. Vá em Application > Local Storage
3. Copie o valor de 'completedExercises'

---

**Desenvolvido para Diego Norman Morais Barros do Nascimento**
*Sistema simples e eficaz para acompanhamento de treinos* 💪
# treinor-norman
