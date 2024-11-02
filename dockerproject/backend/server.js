const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const axios = require('axios');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: { origin: "http://localhost:8080", methods: ["GET", "POST"] }
});

io.on('connection', (socket) => {
    console.log('Utilisateur connecté.');

    socket.on("codeUpdate", (code) => {
        socket.broadcast.emit("codeUpdate", code);
    });

    socket.on('execute_code', async ({ language, code }) => {
        console.log(`Code reçu pour exécution dans ${language}`);
        const urlMap = {
            'python': 'http://python_executor:5001/execute',
            'cpp': 'http://cpp_executor:5002/execute',
            'java': 'http://java_executor:5003/execute'
        };

        if (!urlMap[language]) {
            socket.emit('execution_result', { error: 'Langage non supporté' });
            return;
        }

        try {
            const response = await axios.post(urlMap[language], { code });
            console.log(`Réponse de l'exécuteur ${language}:`, response.data);
            socket.emit('execution_result', response.data); // Envoie les résultats au client
        } catch (error) {
            console.error('Erreur lors de l\'exécution du code:', error.message);
            socket.emit('execution_result', { error: 'Erreur lors de l\'exécution du code' });
        }
    });
});

server.listen(3000, () => {
    console.log('Serveur backend démarré sur http://backend:3000');
});
