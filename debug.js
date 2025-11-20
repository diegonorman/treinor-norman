// Debug script
console.log('=== DEBUG TREINO APP ===');

// Verificar se WORKOUT_DATA existe
if (typeof WORKOUT_DATA !== 'undefined') {
    console.log('✅ WORKOUT_DATA existe');
    console.log('Chaves disponíveis:', Object.keys(WORKOUT_DATA));
    
    // Verificar cada dia
    for (let i = 1; i <= 5; i++) {
        if (WORKOUT_DATA[i]) {
            console.log(`✅ Dia ${i}: ${WORKOUT_DATA[i].name} - ${WORKOUT_DATA[i].exercises.length} exercícios`);
        } else {
            console.log(`❌ Dia ${i}: não encontrado`);
        }
    }
} else {
    console.log('❌ WORKOUT_DATA não existe');
}

// Verificar elementos DOM
document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('workout-container');
    if (container) {
        console.log('✅ Container encontrado');
    } else {
        console.log('❌ Container não encontrado');
    }
});
