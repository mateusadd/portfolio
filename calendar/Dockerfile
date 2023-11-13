# Use a imagem oficial do Node.js como base
FROM node:14

# Crie e defina o diretório de trabalho na imagem
WORKDIR /app/calendar

# Copie o arquivo de dependências e o arquivo de configuração
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o código-fonte para o diretório de trabalho na imagem
COPY . .

# Construa o aplicativo React
RUN npm run build

# Exponha a porta em que o aplicativo estará em execução
EXPOSE 3000

# Comando para iniciar o servidor de produção
CMD ["npm", "start"]