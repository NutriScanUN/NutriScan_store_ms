FROM node:16-alpine

# Crear y establecer el directorio de trabajo
WORKDIR /usr/src/app

# Copiar package.json y package-lock.json
COPY package*.json ./

# Instalar dependencias
RUN npm install

# Copiar todo el código al contenedor
COPY . .

RUN npm run build

# Exponer el puerto
EXPOSE 3005

# Comando para iniciar la aplicación
CMD ["node", "built/app.js"]