# Usa una imagen base oficial de Node.js
FROM node:18-slim

# Establece el directorio de trabajo
WORKDIR /usr/src

# Copia los archivos de definición de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente de la aplicación
COPY . .

# Expone el puerto en el que corre tu app (ajústalo si es necesario)
EXPOSE 8080

# Comando para iniciar el servidor
CMD [ "npm", "start" ]