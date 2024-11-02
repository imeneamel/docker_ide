const socket = io("http://localhost:3000");

const codeEditor = document.getElementById("code-editor");
const languageSelector = document.getElementById("languageSelector");
const output = document.getElementById("output");

codeEditor.addEventListener("input", () => {
    const code = codeEditor.value;
    socket.emit("codeUpdate", code);
});

socket.on("codeUpdate", (code) => {
    codeEditor.value = code;
});

document.getElementById('executeButton').addEventListener('click', () => {
    const code = codeEditor.value;
    const language = languageSelector.value;
    console.log(`Bouton Exécuter cliqué avec le code en ${language}:`, code);

    // Émet l'événement d'exécution au backend
    socket.emit('execute_code', { language, code });
});

socket.on('execution_result', (result) => {
    if (result.error) {
        output.innerText = `Erreur: ${result.error}`;
        console.error('Erreur:', result.error);
    } else {
        const outputText = `Résultat:\n${result.stdout}\n`;
        output.innerText = outputText;
        console.log('Résultat:', result);
    }
});

function insertExample(language) {
    const examples = {
        'python': 'print("Hello, Python!")',
        'cpp': `#include <iostream>
using namespace std;
int main() {
    cout << "Hello, C++!" << endl;
    return 0;
}`,
        'java': `public class Main {
    public static void main(String[] args) {
        System.out.println("Hello, Java!");
    }
}`
    };

    const codeEditor = document.getElementById("code-editor");
    const executeButton = document.getElementById("executeButton");

    // Met à jour le code dans l'éditeur
    codeEditor.value = examples[language];

    socket.emit('execute_code', { language, code: examples[language] });

    console.log(`Exemple de code ${language} inséré et prêt à l'exécution.`);
}

