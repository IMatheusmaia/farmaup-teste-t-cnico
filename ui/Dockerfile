# Etapa 1: Build do projeto Node.js
FROM node:20-alpine AS builder

WORKDIR /app

# Copiar package files e instalar dependências
COPY package*.json ./
RUN npm ci

# Copiar o restante do projeto
COPY . .

ENV PUBLIC_API_URL=api/

# Fazer o build do projeto Astro
RUN npm run build

# Etapa 2: Web server nginx
FROM nginx:alpine

# Copiar os arquivos da pasta dist para o nginx
COPY --from=builder /app/dist /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

# Expor a porta 80
EXPOSE 80

# Iniciar o nginx
CMD ["nginx", "-g", "daemon off;"]
