# Dockerfile du backend
FROM node:lts-alpine

# Créer un répertoire temporaire
RUN mkdir -p /app/temp && chown -R node:node /app/temp && chmod -R 777 /app/temp

WORKDIR /app
COPY . .

RUN npm install

EXPOSE 3000

# Démarrer le serveur
USER node 
CMD ["node", "server.js"]
