# --- Etapa 1: Build ---
FROM node:18-slim AS build

# Establece el directorio de trabajo
WORKDIR /src

# Copia los archivos de definición de dependencias
COPY package*.json ./

# Instala las dependencias
RUN npm install

# Copia el resto del código fuente del cliente
COPY . .

# Argumentos de build que se pasarán desde Cloud Build
ARG VITE_API_KEY
ARG VITE_AUTH_DOMAIN
ARG VITE_PROJECT_ID

# Asigna los ARGs a ENVs para que Vite los pueda leer
ENV VITE_API_KEY=$VITE_API_KEY
ENV VITE_AUTH_DOMAIN=$VITE_AUTH_DOMAIN
ENV VITE_PROJECT_ID=$VITE_PROJECT_ID

# Construye la aplicación para producción
RUN npm run build

# --- Etapa 2: Serve ---
FROM nginx:1.25-alpine

# Copia la configuración de Nginx
# Necesitarás crear este archivo 'nginx.conf' en tu directorio 'client'
COPY nginx.conf /etc/nginx/nginx.conf

# Copia los archivos estáticos construidos desde la etapa anterior
COPY --from=build /app/dist /usr/share/nginx/html

# Expone el puerto 8080
EXPOSE 8080