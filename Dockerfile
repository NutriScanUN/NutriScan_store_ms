FROM node:22-alpine

# Crear y establecer el directorio de trabajo
WORKDIR /usr/app

# Copiar todo el código al contenedor
COPY . .

# Instalar dependencias
RUN npm install
RUN npm run build

# Exponer el puerto
EXPOSE 3005

# Comando para iniciar la aplicación
CMD ["node", "built/app.js"]