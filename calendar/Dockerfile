# Use a imagem oficial do Node.js como base
FROM node:14

RUN npm set strict-ssl false

# Crie e defina o diretório de trabalho na imagem
WORKDIR /app/calendar

# Copie o arquivo de dependências e o arquivo de configuração
COPY package*.json ./

# Instale as dependências
RUN npm install --ignore-scripts

# Copie todo o código-fonte para o diretório de trabalho na imagem
COPY calendar/ app/calendar/

# Construa o aplicativo React
RUN npm run build

# Instale o pacote 'serve' globalmente
RUN npm install --ignore-scripts -g serve

# Exponha a porta em que o aplicativo estará em execução
EXPOSE 3000

# Comando para iniciar o servidor de produção usando 'serve'
CMD ["serve", "-s", "build", "-l", "3000"]