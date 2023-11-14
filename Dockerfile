# Use a imagem oficial do Node.js como base
FROM node:14 as backend

RUN npm set strict-ssl false

# Crie e defina o diretório de trabalho na imagem
WORKDIR /app/backend

# Copie o arquivo de dependências e o arquivo de configuração
COPY backend/package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o código-fonte para o diretório de trabalho na imagem
COPY backend/ .

# Exponha a porta em que o aplicativo estará em execução
EXPOSE 3001

# Comando para iniciar o aplicativo
CMD ["npm", "start"]


# Use a imagem oficial do Node.js como base
FROM node:14 as frontend

# Crie e defina o diretório de trabalho na imagem
WORKDIR /app/calendar

# Copie o arquivo de dependências e o arquivo de configuração
COPY calendar/package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o código-fonte para o diretório de trabalho na imagem
COPY calendar/ .

# Construa o aplicativo React
RUN npm run build

# Exponha a porta em que o aplicativo estará em execução
EXPOSE 3000

# Comando para iniciar o servidor de produção
CMD ["npm", "start"]


# Crie a imagem final, utilizando o backend e o frontend
FROM node:14

# Crie e defina o diretório de trabalho na imagem
WORKDIR /app

# Copie os arquivos do backend e do frontend
COPY --from=backend /app/backend /app/backend
COPY --from=frontend /app/calendar /app/calendar

# Exponha as portas do backend e do frontend
EXPOSE 3001
EXPOSE 3000

# Comando para iniciar ambos os aplicativos
CMD ["npm", "run", "start:both"]