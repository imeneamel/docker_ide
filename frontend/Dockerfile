# Dockerfile pour le frontend
FROM node:14

# Définir le répertoire de travail
WORKDIR /app

# Copier les fichiers de package et installer les dépendances
COPY package*.json ./
RUN npm install

# Copier le reste des fichiers de l'application
COPY . .

# Construire l'application
RUN npm run build  

# Exposer le port que l'application utilise
EXPOSE 3000

# Démarrer l'application
CMD ["npm", "start"]  
