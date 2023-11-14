# Use a imagem oficial do Node.js como base
FROM node:14

RUN npm set strict-ssl false

# Crie e defina o diretório de trabalho na imagem
WORKDIR /app/backend

# Copie o arquivo de dependências e o arquivo de configuração
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie todo o código-fonte para o diretório de trabalho na imagem
COPY . .

# Exponha a porta em que o aplicativo estará em execução
EXPOSE 3001

# Comando para iniciar o aplicativo
CMD ["npm", "start"]
