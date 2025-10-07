// Dados dos treinos - carregados do arquivo workout-data.js
let workoutData = {};
let completedExercises = JSON.parse(localStorage.getItem('completedExercises')) || {};
let currentDay = 1;
let timerInterval;

// Carregar dados dos treinos
function loadWorkoutData() {
    // Usar dados embutidos do arquivo workout-data.js
    workoutData = WORKOUT_DATA;
    
    // Inicializar app após carregar dados
    showDay(1);
    updateProgress();
    
    console.log('✅ Dados dos treinos carregados com sucesso!');
}

// Registrar Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js');
}

function showDay(day) {
    currentDay = day;
    
    // Adicionar efeito de loading
    const container = document.getElementById('workout-container');
    container.style.opacity = '0.5';
    container.style.transform = 'translateY(20px)';
    
    document.querySelectorAll('.workout-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[onclick="showDay(${day})"]`).classList.add('active');
    
    // Simular loading e depois mostrar conteúdo
    setTimeout(() => {
        renderExercises(day);
        updateProgress();
        
        // Animar entrada do conteúdo
        container.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        container.style.opacity = '1';
        container.style.transform = 'translateY(0)';
    }, 150);
}

// Função para obter ícone baseado no nome do exercício
function getExerciseIcon(exerciseName) {
    const name = exerciseName.toLowerCase();
    
    if (name.includes('agachamento') || name.includes('squat')) return '🏋️‍♂️';
    if (name.includes('supino') || name.includes('peito') || name.includes('chest')) return '💪';
    if (name.includes('rosca') || name.includes('bíceps') || name.includes('curl')) return '💪';
    if (name.includes('tríceps') || name.includes('tricep')) return '🔥';
    if (name.includes('ombro') || name.includes('shoulder') || name.includes('elevação')) return '🤸‍♂️';
    if (name.includes('costas') || name.includes('puxada') || name.includes('remada')) return '🏃‍♂️';
    if (name.includes('leg press') || name.includes('press')) return '🦵';
    if (name.includes('extensora') || name.includes('flexora')) return '🦵';
    if (name.includes('panturrilha') || name.includes('calf')) return '🦵';
    if (name.includes('abdômen') || name.includes('abdominal') || name.includes('prancha')) return '🔥';
    if (name.includes('mobilidade') || name.includes('alongamento')) return '🧘‍♂️';
    if (name.includes('cadeira') || name.includes('máquina')) return '⚙️';
    if (name.includes('barra') || name.includes('halteres')) return '🏋️';
    if (name.includes('cardio') || name.includes('esteira') || name.includes('bike')) return '🏃‍♂️';
    
    return '💪'; // ícone padrão
}

function renderExercises(day) {
    const container = document.getElementById('workout-container');
    const workout = workoutData[day];
    
    container.innerHTML = `<h2>${workout.name}</h2>`;
    
    workout.exercises.forEach((exercise, index) => {
        const exerciseId = `${day}-${index}`;
        const isCompleted = completedExercises[exerciseId] || false;
        const exerciseIcon = getExerciseIcon(exercise.name);
        
        const exerciseCard = document.createElement('div');
        exerciseCard.className = `exercise-card ${isCompleted ? 'completed' : ''}`;
        
        // Formatar séries e repetições
        const formatSets = (sets) => {
            if (!sets) return '';
            // Corrigir formatação: substituir 'xx' e 'x' por '×' e limpar espaços
            return sets
                .replace(/xx/gi, '×')
                .replace(/x/gi, '×')
                .replace(/\s*×\s*/g, '× ')
                .replace(/\s+/g, ' ')
                .trim();
        };
        
        exerciseCard.innerHTML = `
            <div class="exercise-header" onclick="toggleCard(this)">
                <div class="exercise-name">
                    <span class="exercise-icon">${exerciseIcon}</span>
                    ${exercise.name}
                </div>
                <div class="card-controls">
                    <span class="expand-icon">▼</span>
                    <div class="check-btn ${isCompleted ? 'checked' : ''}" onclick="event.stopPropagation(); toggleExercise('${exerciseId}')">
                        ${isCompleted ? '✓' : ''}
                    </div>
                </div>
            </div>
            <div class="exercise-summary">
                <span class="sets-preview">${formatSets(exercise.sets)}</span>
                <span class="rest-preview">${exercise.rest}</span>
            </div>
            <div class="exercise-details collapsed">
                <div class="detail-row">
                    <strong>Séries:</strong> ${formatSets(exercise.sets)}
                </div>
                <div class="detail-row">
                    <strong>Pausa:</strong> ${exercise.rest}
                </div>
                <div class="detail-row">
                    <strong>Observações:</strong> ${exercise.details || 'Progressão de carga.'}
                </div>
                <div class="exercise-actions">
                    ${exercise.video ? `<button class="video-link" onclick="openVideo('${exercise.video}')">Ver Vídeo</button>` : ''}
                    ${exercise.rest !== '-' && exercise.rest !== '' ? `<button class="timer-btn" onclick="startTimer('${exercise.rest}')">Cronômetro</button>` : ''}
                </div>
            </div>
        `;
        
        container.appendChild(exerciseCard);
    });
}

function toggleExercise(exerciseId) {
    const wasCompleted = completedExercises[exerciseId] || false;
    
    completedExercises[exerciseId] = !completedExercises[exerciseId];
    localStorage.setItem('completedExercises', JSON.stringify(completedExercises));
    
    renderExercises(currentDay);
    updateProgress();
    
    // Se o exercício foi marcado como completo (não estava antes)
    if (!wasCompleted && completedExercises[exerciseId]) {
        createConfetti();
        
        // Vibração no celular se disponível
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
    }
}

function toggleCard(header) {
    const card = header.parentElement;
    const details = card.querySelector('.exercise-details');
    const icon = card.querySelector('.expand-icon');
    
    details.classList.toggle('collapsed');
    icon.textContent = details.classList.contains('collapsed') ? '▼' : '▲';
}

function updateProgress() {
    const workout = workoutData[currentDay];
    const totalExercises = workout.exercises.length;
    let completedCount = 0;
    
    workout.exercises.forEach((exercise, index) => {
        const exerciseId = `${currentDay}-${index}`;
        if (completedExercises[exerciseId]) {
            completedCount++;
        }
    });
    
    const percentage = (completedCount / totalExercises) * 100;
    
    document.getElementById('progress').style.width = percentage + '%';
    document.getElementById('progress-count').textContent = completedCount;
    document.getElementById('total-count').textContent = totalExercises;
}

function startTimer(restTime) {
    const timeInSeconds = parseRestTime(restTime);
    if (timeInSeconds <= 0) return;
    
    // Remover cronômetro existente se houver
    const existing = document.getElementById('floating-timer');
    if (existing) existing.remove();
    
    // Criar cronômetro flutuante
    const timer = document.createElement('div');
    timer.id = 'floating-timer';
    timer.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 150px;
        height: 100px;
        background: rgba(0, 0, 0, 0.9);
        color: white;
        border-radius: 15px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        z-index: 1000;
        box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        font-family: Arial, sans-serif;
    `;
    
    timer.innerHTML = `
        <div style="font-size: 24px; font-weight: bold; color: #4CAF50;">${formatTime(timeInSeconds)}</div>
        <div style="font-size: 12px; opacity: 0.8; margin-top: 5px;">Descanso</div>
        <button onclick="this.parentElement.remove(); clearInterval(timerInterval);" style="
            position: absolute;
            top: 5px;
            right: 8px;
            background: none;
            border: none;
            color: white;
            font-size: 16px;
            cursor: pointer;
        ">×</button>
    `;
    
    document.body.appendChild(timer);
    
    let remainingTime = timeInSeconds;
    
    timerInterval = setInterval(() => {
        remainingTime--;
        const display = timer.querySelector('div');
        if (display) {
            display.textContent = formatTime(remainingTime);
        }
        
        if (remainingTime <= 0) {
            clearInterval(timerInterval);
            timer.remove();
            showNotification('Tempo de descanso acabou! 💪');
        }
    }, 1000);
}

function formatTime(seconds) {
    if (seconds <= 0) return '00:00';
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
}

function closeTimer() {
    clearInterval(timerInterval);
    const timer = document.getElementById('floating-timer');
    if (timer) timer.remove();
}

function showNotification(message) {
    // Criar notificação toast
    const toast = document.createElement('div');
    toast.style.cssText = `
        position: fixed;
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        background: linear-gradient(135deg, #4CAF50, #45a049);
        color: white;
        padding: 15px 25px;
        border-radius: 10px;
        z-index: 1001;
        font-weight: 600;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
        animation: slideDown 0.3s ease;
    `;
    toast.textContent = message;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
        toast.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

function parseRestTime(restTime) {
    const match = restTime.match(/(\d+)/);
    return match ? parseInt(match[1]) : 60;
}

function openVideo(url) {
    let embedUrl = url;
    
    if (url.includes('youtube.com/watch')) {
        const videoId = url.split('v=')[1]?.split('&')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('youtube.com/shorts')) {
        const videoId = url.split('/shorts/')[1]?.split('?')[0];
        embedUrl = `https://www.youtube.com/embed/${videoId}`;
    } else if (url.includes('drive.google.com')) {
        const fileId = url.split('/d/')[1]?.split('/')[0];
        embedUrl = `https://drive.google.com/file/d/${fileId}/preview`;
    }
    
    document.getElementById('video-frame').src = embedUrl;
    document.getElementById('video-modal').classList.remove('hidden');
}

function closeVideo() {
    document.getElementById('video-frame').src = '';
    document.getElementById('video-modal').classList.add('hidden');
}



// Efeito de confete quando completar exercício
function createConfetti() {
    const colors = ['#667eea', '#764ba2', '#4CAF50', '#FF6B6B', '#FFD93D'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'fixed';
        confetti.style.width = '10px';
        confetti.style.height = '10px';
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + 'vw';
        confetti.style.top = '-10px';
        confetti.style.zIndex = '9999';
        confetti.style.borderRadius = '50%';
        confetti.style.pointerEvents = 'none';
        
        document.body.appendChild(confetti);
        
        const animation = confetti.animate([
            { transform: 'translateY(0) rotate(0deg)', opacity: 1 },
            { transform: `translateY(100vh) rotate(${Math.random() * 360}deg)`, opacity: 0 }
        ], {
            duration: Math.random() * 2000 + 1000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        });
        
        animation.onfinish = () => confetti.remove();
    }
}

// Adicionar efeito de ondas ao clicar nos botões
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('top-nav-btn') || 
        e.target.classList.contains('video-link') || 
        e.target.classList.contains('timer-btn') ||
        e.target.classList.contains('check-btn')) {
        
        const ripple = document.createElement('span');
        const rect = e.target.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.style.position = 'absolute';
        ripple.style.borderRadius = '50%';
        ripple.style.background = 'rgba(255, 255, 255, 0.6)';
        ripple.style.transform = 'scale(0)';
        ripple.style.animation = 'ripple 0.6s linear';
        ripple.style.pointerEvents = 'none';
        
        e.target.style.position = 'relative';
        e.target.style.overflow = 'hidden';
        e.target.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    }
});

// Adicionar CSS para animação de ondas
const rippleCSS = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;

const style = document.createElement('style');
style.textContent = rippleCSS;
document.head.appendChild(style);

// Gerenciamento de seções
let currentSection = 'workout';
let alarms = JSON.parse(localStorage.getItem('alarms')) || [];

function showSection(section) {
    // Esconder todas as seções
    document.querySelectorAll('.section').forEach(s => s.classList.remove('active'));
    document.querySelectorAll('.top-nav-btn').forEach(btn => btn.classList.remove('active'));
    
    // Mostrar seção selecionada
    document.getElementById(section + '-section').classList.add('active');
    document.querySelector(`[onclick="showSection('${section}')"]`).classList.add('active');
    
    currentSection = section;
    
    if (section === 'schedule') {
        renderAlarms();
    }
}

// Gerenciamento de alarmes
function showAlarmModal() {
    document.getElementById('alarm-modal').classList.remove('hidden');
}

function closeAlarmModal() {
    document.getElementById('alarm-modal').classList.add('hidden');
    document.getElementById('alarm-time').value = '';
    document.getElementById('alarm-description').value = '';
    document.getElementById('alarm-repeat').value = 'daily';
}

function saveAlarm() {
    const time = document.getElementById('alarm-time').value;
    const description = document.getElementById('alarm-description').value;
    const repeat = document.getElementById('alarm-repeat').value;
    
    if (!time || !description) {
        alert('Preencha todos os campos!');
        return;
    }
    
    const alarm = {
        id: Date.now(),
        time: time,
        description: description,
        repeat: repeat,
        active: true
    };
    
    alarms.push(alarm);
    localStorage.setItem('alarms', JSON.stringify(alarms));
    
    // Configurar notificação
    scheduleNotification(alarm);
    
    renderAlarms();
    closeAlarmModal();
    
    createConfetti();
    alert('Alarme criado com sucesso! 🎉');
}

function deleteAlarm(id) {
    if (confirm('Deseja excluir este alarme?')) {
        alarms = alarms.filter(alarm => alarm.id !== id);
        localStorage.setItem('alarms', JSON.stringify(alarms));
        renderAlarms();
    }
}

function renderAlarms() {
    const container = document.getElementById('alarm-list');
    
    if (alarms.length === 0) {
        container.innerHTML = '<p style="text-align: center; color: #666; font-style: italic;">Nenhum alarme configurado</p>';
        return;
    }
    
    container.innerHTML = alarms.map(alarm => `
        <div class="alarm-item">
            <div>
                <div class="alarm-time">${alarm.time}</div>
                <div class="alarm-desc">${alarm.description}</div>
                <div style="font-size: 12px; color: #999;">${getRepeatText(alarm.repeat)}</div>
            </div>
            <button class="alarm-delete" onclick="deleteAlarm(${alarm.id})">×</button>
        </div>
    `).join('');
}

function getRepeatText(repeat) {
    const texts = {
        'daily': 'Todos os dias',
        'weekdays': 'Dias úteis',
        'weekends': 'Fins de semana',
        'once': 'Uma vez'
    };
    return texts[repeat] || repeat;
}

// Sistema de notificações
function requestNotificationPermission() {
    if ('Notification' in window && Notification.permission === 'default') {
        Notification.requestPermission().then(permission => {
            if (permission === 'granted') {
                console.log('Notificações permitidas!');
            }
        });
    }
}

function scheduleNotification(alarm) {
    if ('Notification' in window && Notification.permission === 'granted') {
        const now = new Date();
        const [hours, minutes] = alarm.time.split(':');
        const alarmTime = new Date();
        alarmTime.setHours(parseInt(hours), parseInt(minutes), 0, 0);
        
        // Se o horário já passou hoje, agendar para amanhã
        if (alarmTime <= now) {
            alarmTime.setDate(alarmTime.getDate() + 1);
        }
        
        const timeUntilAlarm = alarmTime.getTime() - now.getTime();
        
        setTimeout(() => {
            showNotification(alarm);
            
            // Reagendar se for recorrente
            if (alarm.repeat !== 'once') {
                scheduleNextAlarm(alarm);
            }
        }, timeUntilAlarm);
    }
}

function showNotification(alarm) {
    if ('Notification' in window && Notification.permission === 'granted') {
        const notification = new Notification('🔔 GH Personal - Lembrete', {
            body: alarm.description,
            icon: 'icon-192.png',
            badge: 'icon-192.png',
            tag: 'alarm-' + alarm.id,
            requireInteraction: true
        });
        
        // Vibrar se disponível
        if (navigator.vibrate) {
            navigator.vibrate([200, 100, 200, 100, 200]);
        }
        
        // Fechar após 10 segundos
        setTimeout(() => notification.close(), 10000);
    }
}

function scheduleNextAlarm(alarm) {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    const dayOfWeek = tomorrow.getDay(); // 0 = domingo, 6 = sábado
    
    let shouldSchedule = false;
    
    switch (alarm.repeat) {
        case 'daily':
            shouldSchedule = true;
            break;
        case 'weekdays':
            shouldSchedule = dayOfWeek >= 1 && dayOfWeek <= 5;
            break;
        case 'weekends':
            shouldSchedule = dayOfWeek === 0 || dayOfWeek === 6;
            break;
    }
    
    if (shouldSchedule) {
        scheduleNotification(alarm);
    }
}

// Inicializar alarmes existentes
function initializeAlarms() {
    requestNotificationPermission();
    
    alarms.forEach(alarm => {
        if (alarm.active) {
            scheduleNotification(alarm);
        }
    });
}

// Alarmes pré-definidos
function addDefaultAlarms() {
    const defaultAlarms = [
        { time: '07:00', description: '🌅 Suplementos ao acordar', repeat: 'daily' },
        { time: '08:30', description: '🍳 1ª Refeição - Manhã', repeat: 'daily' },
        { time: '10:00', description: '🍌 2ª Refeição - Lanche', repeat: 'daily' },
        { time: '12:30', description: '🍽️ 3ª Refeição - Almoço + Enzimas', repeat: 'daily' },
        { time: '15:30', description: '🥤 4ª Refeição - Lanche', repeat: 'daily' },
        { time: '19:00', description: '🌙 5ª Refeição - Jantar', repeat: 'daily' },
        { time: '21:00', description: '💊 Suplementos pós-janta', repeat: 'daily' },
        { time: '08:00', description: '💉 Aplicação - Segunda', repeat: 'once' },
        { time: '08:00', description: '💉 Aplicação - Quinta', repeat: 'once' }
    ];
    
    if (alarms.length === 0) {
        defaultAlarms.forEach((alarm, index) => {
            alarms.push({
                id: Date.now() + index,
                ...alarm,
                active: true
            });
        });
        
        localStorage.setItem('alarms', JSON.stringify(alarms));
        renderAlarms();
        
        alert('Alarmes padrão adicionados! 🎉\nVocê pode editá-los ou adicionar novos.');
    }
}

function resetWorkout() {
    if (confirm('Deseja reiniciar o treino atual? Todos os exercícios serão desmarcados.')) {
        // Limpar apenas os exercícios do dia atual
        const workout = workoutData[currentDay];
        workout.exercises.forEach((exercise, index) => {
            const exerciseId = `${currentDay}-${index}`;
            delete completedExercises[exerciseId];
        });
        
        localStorage.setItem('completedExercises', JSON.stringify(completedExercises));
        
        // Atualizar a tela
        renderExercises(currentDay);
        updateProgress();
        
        // Mostrar feedback
        createConfetti();
        showNotification('Treino reiniciado! 🔄');
    }
}
document.addEventListener('DOMContentLoaded', function() {
    loadWorkoutData();
    initializeAlarms();
    
    // Adicionar botão para alarmes padrão
    setTimeout(() => {
        if (alarms.length === 0) {
            if (confirm('Deseja adicionar os alarmes padrão do plano alimentar?')) {
                addDefaultAlarms();
            }
        }
    }, 2000);
});
// Instruções para iOS
function showIOSInstructions() {
    const instructions = `📱 COMO CONFIGURAR ALARMES REAIS NO iOS:

1️⃣ ALARMES NATIVOS (RECOMENDADO):
• Abra: Relógio → Alarme
• Toque: + (adicionar)
• Configure cada horário:

🌅 07:00 - Suplementos ao acordar
🍳 08:30 - 1ª Refeição - Manhã  
🍌 10:00 - 2ª Refeição - Lanche
🍽️ 12:30 - Almoço + Enzimas
🥤 15:30 - 4ª Refeição - Lanche
🌙 19:00 - Jantar
💊 21:00 - Suplementos pós-janta
💉 08:00 - Aplicação (Seg/Qui)

2️⃣ LEMBRETES:
• App Lembretes → Nova Lista
• Nome: "GH Personal"
• Adicionar com horário específico

3️⃣ SIRI (MAIS RÁPIDO):
• "Ei Siri, me lembre de tomar suplementos às 7 da manhã todos os dias"
• "Ei Siri, me lembre do almoço às 12h30"

✅ ASSIM FUNCIONARÁ SEMPRE, mesmo com app fechado!

💡 Use este app como checklist do seu plano.`;
    
    alert(instructions);
}
