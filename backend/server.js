const express = require('express');
const http = require('http');
const fs = require('fs');
const path = require('path');
const port = 3000;
const { exec } = require('child_process');
const { Server } = require('socket.io');  // Ajouter cette ligne

require('dotenv').config();

const app = express();
const server = http.createServer(app);
const io = new Server(server);  // Initialiser Socket.io
const wsIdeNamespace = io.of('/ws-ide-ns');  // Créer un namespace pour l'IDE

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');  
});



// Gestion des connexions WebSocket
wsIdeNamespace.on('connection', (socket) => {
    console.log('Un utilisateur est connecté au namespace ws-ide');

    // Écouter les changements de code
    socket.on('codeChange', (code) => {
        console.log('Changement de code reçu :', code);
        socket.broadcast.emit('codeChange', code); // Émettre à tous les autres utilisateurs
    });

    // Exécuter le code
socket.on('executeCode', ({ code, language }) => {
    console.log('Exécution du code');
    let command;
    let tempFile;

    switch (language) {
        case 'python':
            tempFile = 'temp_code.py';
            fs.writeFileSync(tempFile, code);
            command = `python3 ${tempFile}`;
            break;
        case 'cpp':
            tempFile = 'temp_code.cpp';
            fs.writeFileSync(tempFile, code);
            command = `g++ ${tempFile} -o temp_code && ./temp_code`;
            break;
        case 'c':
            tempFile = 'temp_code.c';
            fs.writeFileSync(tempFile, code);
            command = `gcc ${tempFile} -o temp_code && ./temp_code`;
            break;
        case 'java':
            tempFile = 'TempCode.java';
            fs.writeFileSync(tempFile, code);
            command = `javac ${tempFile} && java TempCode`;
            break;
        default:
            command = `echo "Langage non supporté"`;
            break;
    }

    exec(command, (error, stdout, stderr) => {
        let result;
        if (error) {
            result = `Erreur d'exécution : ${stderr || error.message}`;
        } else {
            result = stdout || 'Aucun résultat';
        }
        console.log(result);
        
        // Émettre le résultat à tous les utilisateurs, y compris celui qui a exécuté le code
        socket.emit('executionResult', result);
        socket.broadcast.emit('executionResult', result);

        // Nettoyage des fichiers temporaires
        if (tempFile && fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
        if (language === 'cpp' || language === 'c') {
            if (fs.existsSync('temp_code')) fs.unlinkSync('temp_code');
        }
        if (language === 'java') {
            if (fs.existsSync('TempCode.class')) fs.unlinkSync('TempCode.class');
        }
    });
});

});


server.listen(port, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${port}`);
});
