# Usa una imagen base para Node.js
FROM node:18

# Configura el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos del proyecto
COPY package*.json ./
RUN npm install

COPY . .

# Expone el puerto que usa tu backend
EXPOSE 5002

# Comando para iniciar el backend
CMD ["npm", "start"]
