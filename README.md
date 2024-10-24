# IDE Collaboratif avec exécution de code en temps réel

Ce projet est une application web d'IDE collaboratif permettant aux utilisateurs d'écrire, d'exécuter et de partager du code en temps réel. Il utilise Socket.io pour la communication en temps réel entre les utilisateurs.

## Fonctionnalités

- **Éditeur de code** : Écrire du code dans plusieurs langages (Python, C++, C, Java).
- **Exécution en temps réel** : Exécutez le code et obtenez les résultats instantanément.
- **Collaboration** : Les utilisateurs peuvent voir et modifier le code des autres en temps réel.
- **Interface utilisateur** : Interface simple et conviviale avec des styles modernes.

## Technologies utilisées

- **Frontend** : HTML, CSS, JavaScript, [Socket.io](https://socket.io/)
- **Backend** : Node.js, Express
- **Docker** : Conteneurisation de l'application pour une meilleure modularité et portabilité.

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

- [Node.js](https://nodejs.org/) (version 14 ou supérieure)
- [Docker](https://www.docker.com/) et [Docker Compose](https://docs.docker.com/compose/)

## Installation

1. Clonez le dépôt :

   ```bash
   git clone https://github.com/imeneamel/docker_ide
   cd DOCKER_IDE

2. Démarrez l'application:

    ```bash
   docker-compose up --build

3. Accédez à l'application via votre navigateur à l'adresse suivante :

 http://localhost:3000
 

4. Utilisation

- Sélectionnez le langage de programmation souhaité dans le menu déroulant.
- Écrivez votre code dans l'éditeur.
- Cliquez sur le bouton "Exécuter" pour exécuter le code.
- Le résultat s'affichera sous l'éditeur.