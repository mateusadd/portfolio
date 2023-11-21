# Use a imagem oficial do Node.js como base
FROM node:14

# Crie um usuário não privilegiado
RUN addgroup --system appgroup && adduser --system --ingroup appgroup appuser

# Crie e defina o diretório de trabalho na imagem
WORKDIR /app/calendar
RUN chown -R appuser:appgroup /app/calendar

# Troque para o novo usuário
USER appuser

RUN npm set strict-ssl false

# Copie o arquivo de dependências e o arquivo de configuração
COPY package*.json ./

# Instale as dependências
RUN npm install --ignore-scripts

# Copie todo o código-fonte para o diretório de trabalho na imagem
COPY src/ ./src/
COPY public/ ./public/

# Construa o aplicativo React
RUN npm run build

# Instale o pacote 'serve' globalmente
RUN npm install --ignore-scripts serve

# Exponha a porta em que o aplicativo estará em execução
EXPOSE 3000

# Comando para iniciar o servidor de produção usando 'serve'
CMD ["npx", "serve", "-s", "build", "-l", "3000"]