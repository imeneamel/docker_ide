# Dockerfile pour le backend
FROM node:14

# Répertoire de travail
WORKDIR /app

# Copier les fichiers de package
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Exposer le port
EXPOSE 4000

# Démarrer le serveur
CMD ["node", "server.js"] 
