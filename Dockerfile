FROM mysql:latest

# Copiar o script SQL para dentro do contêiner
COPY populate.sql /docker-entrypoint-initdb.d/

# Comando para executar o script na inicialização do contêiner
CMD ["--init-file", "/docker-entrypoint-initdb.d/populate.sql"]
