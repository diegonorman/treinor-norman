// Dados dos treinos - serão carregados do JSON
let workoutData = {};
let completedExercises = JSON.parse(localStorage.getItem('completedExercises')) || {};
let currentDay = 1;
let timerInterval;

// Carregar dados do JSON
async function loadWorkoutData() {
    try {
        const response = await fetch('workout_data.json');
        if (!response.ok) {
            throw new Error('Erro ao carregar dados dos treinos');
        }
        workoutData = await response.json();
        
        // Inicializar app após carregar dados
        showDay(1);
        updateProgress();
        
        console.log('✅ Dados dos treinos carregados com sucesso!');
    } catch (error) {
        console.error('❌ Erro ao carregar dados:', error);
        
        // Fallback para dados básicos se não conseguir carregar
        workoutData = {
            1: {
                name: "Carregando...",
                exercises: [{
                    name: "Erro ao carregar dados do Excel",
                    sets: "Verifique se o arquivo workout_data.json existe",
                    rest: "",
                    details: "Recarregue a página ou execute o script convert_excel.py",
                    video: ""
                }]
            }
        };
        
        showDay(1);
        updateProgress();
    }
}

// Inicializar quando a página carregar
document.addEventListener('DOMContentLoaded', function() {
    loadWorkoutData();
});
        exercises: [
            {
                name: "ALONGAMENTO PEITORAL MENOR",
                sets: "1x20 seg",
                rest: "-",
                details: "",
                video: "https://www.youtube.com/shorts/1yElQu1suCg?feature=share"
            },
            {
                name: "ABDOMINAL BANCO DECLINADO",
                sets: "4x15",
                rest: "60 seg",
                details: "Usar anilha no peito.",
                video: "https://drive.google.com/file/d/1Kec-G4bbX8nUbpB4rm-RzrI5A1Y94bdn/view?usp=drive_link"
            },
            {
                name: "ABDOMINAL ELEVAÇÃO DE PERNAS NA BARRA",
                sets: "4x15",
                rest: "60 seg",
                details: "Usar halter entre os pés.",
                video: "https://grandeatleta.com.br/wp-content/uploads/2018/06/Abdominal-infra-na-barra-fixa.gif"
            },
            {
                name: "CRUCIFIXO INCLINADO NO CROSS",
                sets: "4x15",
                rest: "60 seg",
                details: "1 seg de isometria no pico. Progressão de carga.",
                video: "https://drive.google.com/file/d/1pF3qRnE1XVj66opbcRmGagNtzup-08Bo/view?usp=drive_link"
            },
            {
                name: "SUPINO INCLINADO (Máquina ou Guiada)",
                sets: "4x15-20/10-15/8-12/6-10",
                rest: "60 seg",
                details: "Pirâmide. Progressão de carga.",
                video: "https://drive.google.com/file/d/17qu6Web_4SsNLLXa-A5oysDG1Jol3kbd/view?usp=drive_link"
            },
            {
                name: "VOADOR",
                sets: "4x8-12",
                rest: "60 seg",
                details: "1 seg de isometria no pico. Progressão de carga.",
                video: "https://drive.google.com/file/d/18RxXp_n6gc05h6BKvr3o8TC7WgGG9mUa/view?usp=drive_link"
            },
            {
                name: "CROSSOVER",
                sets: "4x8-12",
                rest: "60 seg",
                details: "1 seg de isometria no pico. Progressão de carga.",
                video: "https://drive.google.com/file/d/16kQayKcudGSUQJKNcTvm5LH3_rodjJMa/view?usp=drive_link"
            }
        ]
    },
    3: {
        name: "DIA 3 - Costas/Bíceps",
        exercises: [
            {
                name: "ALONGAMENTO ESCÁPULA/OMBRO",
                sets: "2x15 seg",
                rest: "15 seg",
                details: "",
                video: "https://www.youtube.com/shorts/AwA7fzu8ajE?feature=share"
            },
            {
                name: "REMADA LIVRE PRONADA",
                sets: "4x15-20/10-15/8-12/6-10",
                rest: "60 seg",
                details: "Pirâmide. Progressão de carga.",
                video: "https://drive.google.com/file/d/1lGyP8xFPyMcHUghCRIVhsINioBuUI-id/view?usp=drive_link"
            },
            {
                name: "REMADA TRIÂNGULO NA MÁQUINA",
                sets: "4x10-15",
                rest: "60 seg",
                details: "Progressão de carga.",
                video: ""
            },
            {
                name: "PUXADA ALTA PRONADA",
                sets: "4x8-12 (até a falha)",
                rest: "60 seg",
                details: "Após falhar, fazer +5 repetições 'roubadas' (com balanço).",
                video: "https://drive.google.com/file/d/1qPfDgL8lDNDl2IC5EsHHSbaHE1OODK0p/view?usp=drive_link"
            },
            {
                name: "PULLDOWN COM CORDA",
                sets: "4x8-12",
                rest: "60 seg",
                details: "1 seg de isometria no pico. Progressão de carga.",
                video: "https://drive.google.com/file/d/1iJDC_64ANTqetf3GK-hd1qQPQlMNrAYU/view?usp=drive_link"
            },
            {
                name: "MEIO TERRA",
                sets: "4x15-20/10-15/8-12/6-10",
                rest: "60 seg",
                details: "Pirâmide. Progressão de carga.",
                video: "https://drive.google.com/file/d/1-GRvZLsDLQo-rgrLQyeXyZgldpwh_GZa/view?usp=drive_link"
            },
            {
                name: "ROSCA DIRETA CROSS PEGADA ABERTA",
                sets: "4x15-20/10-15/8-12/6-10",
                rest: "60 seg",
                details: "Pirâmide. Na última série, fazer +2 drops de 6 reps.",
                video: "https://drive.google.com/file/d/1t-3UE-WN-HnD-hESwFkUw5HWplBVSWVM/view?usp=drive_link"
            },
            {
                name: "ROSCA DIRETA NA PUXADA ALTA",
                sets: "4x8-12",
                rest: "60 seg",
                details: "1 seg de isometria no pico. Progressão de carga.",
                video: "https://drive.google.com/file/d/1S4DZr0UmCl6Qj0h6DOo1-x3BIuLMoMfg/view?usp=drive_link"
            }
        ]
    },
    4: {
        name: "DIA 4 - Posterior/Glúteo",
        exercises: [
            {
                name: "ALONGAMENTO GLÚTEO",
                sets: "2x30 seg",
                rest: "15 seg",
                details: "",
                video: "https://www.youtube.com/shorts/zByNfWpvlOI?feature=share"
            },
            {
                name: "ALONGAMENTO POSTERIOR",
                sets: "2x15 seg",
                rest: "15 seg",
                details: "",
                video: "https://www.youtube.com/shorts/MOb1N4IDl3Q?feature=share"
            },
            {
                name: "MESA FLEXORA",
                sets: "4x15-20/10-15/8-12/6-10",
                rest: "60 seg",
                details: "Pirâmide. Tronco levantado. Progressão de carga.",
                video: "https://drive.google.com/file/d/1MjRTM3Du2dKSi11VlMt6zii7xpbs5ign/view?usp=drive_link"
            },
            {
                name: "CADEIRA FLEXORA",
                sets: "4x8-12",
                rest: "60 seg",
                details: "3 seg de isometria no pico. Progressão de carga.",
                video: "https://drive.google.com/file/d/1uXTVSWfkAXfw5UoKuw1Cn-nbBYF5roxg/view?usp=drive_link"
            },
            {
                name: "STIFF COM BARRA",
                sets: "4x8-12",
                rest: "60 seg",
                details: "Focar na amplitude. Progressão de carga.",
                video: "https://drive.google.com/file/d/10JhCI1PEQV3oTtNjPcZ3lnXRDpPmUN_i/view?usp=drive_link"
            },
            {
                name: "FLEXOR DEITADO COM HALTER",
                sets: "4x12-15",
                rest: "60 seg",
                details: "1 seg de isometria no pico.",
                video: "https://drive.google.com/file/d/1evImvQ8vSG8CfjahJIsDL6IHKOvR8uxq/view?usp=drive_link"
            },
            {
                name: "CADEIRA ABDUTORA",
                sets: "4x8-12",
                rest: "60 seg",
                details: "1 seg de isometria no pico. Progressão de carga.",
                video: "https://drive.google.com/file/d/1ebbyK2hgtynVITTnDWwo_dorwmtNlT8n/view?usp=drive_link"
            },
            {
                name: "ELEVAÇÃO PÉLVICA",
                sets: "4x6-10",
                rest: "60 seg",
                details: "Fase negativa (descida) de 5 segundos. Progressão de carga.",
                video: "https://drive.google.com/file/d/12Dit2g3NPfTTPwV-DbVygifMtkrA0piC/view?usp=drive_link"
            }
        ]
    },
    5: {
        name: "DIA 5 - Ombros/Tríceps/Panturrilha",
        exercises: [
            {
                name: "ALONGAMENTO ESCÁPULA/OMBRO",
                sets: "2x15 seg",
                rest: "15 seg",
                details: "",
                video: "https://www.youtube.com/shorts/AwA7fzu8ajE?feature=share"
            },
            {
                name: "PANTURRILHA EM PÉ",
                sets: "4x15-20",
                rest: "60 seg",
                details: "Máxima amplitude. Progressão de carga.",
                video: "https://drive.google.com/file/d/1Bwd3QzvLUK7Ax7LABhKzsoA8O8LsFjkg/view?usp=drive_link"
            },
            {
                name: "DESENVOLVIMENTO (Máquina ou Guiada)",
                sets: "4x15-20/10-15/8-12/6-10",
                rest: "60 seg",
                details: "Pirâmide. Progressão de carga.",
                video: "https://drive.google.com/file/d/1V3ggri0GrchEAvD2LXiNj2wFQHbV-ipR/view?usp=drive_link"
            },
            {
                name: "ELEVAÇÃO LATERAL EM PÉ",
                sets: "4x12-15",
                rest: "60 seg",
                details: "Progressão de carga.",
                video: "https://drive.google.com/file/d/1nXdJ7O4nJsp1295Lw6s6oNHl3ehmAaHM/view?usp=drive_link"
            },
            {
                name: "ELEVAÇÃO LATERAL PARCIAL NO CROSS",
                sets: "4x12-15",
                rest: "60 seg",
                details: "Progressão de carga.",
                video: "https://drive.google.com/file/d/19mQxNpqBqERFg8DNSptsMndzwPyZqhzy/view?usp=drive_link"
            },
            {
                name: "CRUCIFIXO INVERTIDO NO VOADOR",
                sets: "4x12-15",
                rest: "60 seg",
                details: "Progressão de carga.",
                video: "https://drive.google.com/file/d/18RxXp_n6gc05h6BKvr3o8TC7WgGG9mUa/view?usp=drive_link"
            },
            {
                name: "ELEVAÇÃO FRONTAL NO CROSS COM CORDA",
                sets: "4x12-15",
                rest: "60 seg",
                details: "Progressão de carga.",
                video: "https://drive.google.com/file/d/1oLAvzfdiKrUqa-y1BzetP79VRxrjrTPR/view?usp=drive_link"
            },
            {
                name: "TRÍCEPS TESTA CORDA BANCO INCLINADO",
                sets: "4x15-20/10-15/8-12/6-10",
                rest: "60 seg",
                details: "Pirâmide. Progressão de carga.",
                video: "https://drive.google.com/file/d/1Pfd0v-Bdc4_aKiPVfjmyf9F57z48jKgd/view?usp=drive_link"
            },
            {
                name: "TRÍCEPS COM BARRA NO CROSS",
                sets: "4x12-15",
                rest: "60 seg",
                details: "Progressão de carga.",
                video: "https://drive.google.com/file/d/135z_bY-JxYk5Jjld7x5gXpghoBQOEnae/view?usp=drive_link"
            }
        ]
    }
};

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
    
    document.querySelectorAll('.nav-btn').forEach(btn => {
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
        
        exerciseCard.innerHTML = `
            <div class="exercise-header">
                <div class="exercise-name">
                    <span class="exercise-icon">${exerciseIcon}</span>
                    ${exercise.name}
                </div>
                <div class="check-btn ${isCompleted ? 'checked' : ''}" onclick="toggleExercise('${exerciseId}')">
                    ${isCompleted ? '✓' : ''}
                </div>
            </div>
            <div class="exercise-details">
                <div class="sets-info">${exercise.sets}</div>
                <div class="rest-info">Pausa: ${exercise.rest}</div>
                <div>${exercise.details}</div>
                ${exercise.video ? `<button class="video-link" onclick="openVideo('${exercise.video}')">Ver Vídeo</button>` : ''}
                ${exercise.rest !== '-' && exercise.rest !== '' ? `<button class="timer-btn" onclick="startTimer('${exercise.rest}')">Cronômetro</button>` : ''}
            </div>
        `;
        
        container.appendChild(exerciseCard);
    });
}

function toggleExercise(exerciseId) {
    completedExercises[exerciseId] = !completedExercises[exerciseId];
    localStorage.setItem('completedExercises', JSON.stringify(completedExercises));
    
    renderExercises(currentDay);
    updateProgress();
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
    
    const progressPercent = (completedCount / totalExercises) * 100;
    
    document.getElementById('progress').style.width = progressPercent + '%';
    document.getElementById('progress-count').textContent = completedCount;
    document.getElementById('total-count').textContent = totalExercises;
}

function startTimer(restTime) {
    const seconds = parseInt(restTime.replace(/[^0-9]/g, '')) || 60;
    let timeLeft = seconds;
    
    document.getElementById('timer-display').textContent = timeLeft;
    document.getElementById('timer-modal').classList.remove('hidden');
    
    timerInterval = setInterval(() => {
        timeLeft--;
        document.getElementById('timer-display').textContent = timeLeft;
        
        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            document.getElementById('timer-display').textContent = "FIM!";
            setTimeout(() => {
                closeTimer();
            }, 2000);
        }
    }, 1000);
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

function closeTimer() {
    clearInterval(timerInterval);
    document.getElementById('timer-modal').classList.add('hidden');
}

document.querySelector('h1').addEventListener('click', function() {
    if (confirm('Deseja resetar todo o progresso?')) {
        completedExercises = {};
        localStorage.removeItem('completedExercises');
        renderExercises(currentDay);
        updateProgress();
    }
});

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

// Atualizar a função toggleExercise para incluir confete
const originalToggleExercise = toggleExercise;
function toggleExercise(exerciseId) {
    const wasCompleted = completedExercises[exerciseId] || false;
    
    originalToggleExercise(exerciseId);
    
    // Se o exercício foi marcado como completo (não estava antes)
    if (!wasCompleted && completedExercises[exerciseId]) {
        createConfetti();
        
        // Vibração no celular se disponível
        if (navigator.vibrate) {
            navigator.vibrate([100, 50, 100]);
        }
    }
}

// Adicionar efeito de ondas ao clicar nos botões
document.addEventListener('click', function(e) {
    if (e.target.classList.contains('nav-btn') || 
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
