// Se connecter au namespace WebSocket
const socket = io('/ws-ide-ns');

// Écouter les changements de code des autres utilisateurs
socket.on('codeChange', (code) => {
    document.getElementById('editor').value = code; // Mettre à jour l'éditeur
});

// Écouter les résultats d'exécution du code
socket.on('executionResult', (result) => {
    document.getElementById('output').textContent = result; // Afficher le résultat
});

// Surveiller les changements dans le champ de texte de l'éditeur
document.getElementById('editor').addEventListener('input', () => {
    const code = document.getElementById('editor').value;
    
    // Émettre le changement de code aux autres utilisateurs
    socket.emit('codeChange', code);
});

// Gérer l'exécution du code
document.getElementById('executeBtn').addEventListener('click', () => {
    const code = document.getElementById('editor').value;
    const language = document.getElementById('languageSelect').value;

    // Émettre le code et le langage au serveur
    socket.emit('executeCode', { code, language });
});


