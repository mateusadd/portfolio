-- Exemplo de script SQL (populate.sql)

USE salao;

INSERT INTO clientes (cliente_nome, cliente_contato, funcionario) VALUES ('cliente1', '8888-8888', 0);
INSERT INTO clientes (cliente_nome, cliente_contato, funcionario) VALUES ('cliente2', '9999-9999', 0);
INSERT INTO servicos (servico_nome, servico_preco, servico_comissao) VALUES ('servico1', '25', 40);
INSERT INTO servicos (servico_nome, servico_preco, servico_comissao) VALUES ('servico2', '25', 50);
INSERT INTO funcionarios (funcionario_nome, funcionario_contato) VALUES ('funcionario1', '8888-8888');
INSERT INTO funcionarios (funcionario_nome, funcionario_contato) VALUES ('funcionario2', '9999-9999');
-- Outros comandos SQL para popular o banco de dados...
