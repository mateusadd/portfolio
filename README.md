# Portfolio
Este repositório contém o código fonte de um sistema para gestão de salão de beleza desenvolvido para apresentação do Portfolio, 8º Semestre do curso de Eng. Software da CatolicaSC Joinville.

O sistema permite agendar atendimentos com informações como cliente atendido, serviço realizado e profissional responsável, organizando os cards de atendimento em uma UI de calendário intuitiva e de fácil visualização. Além disso, é possível registrar os valores e métodos de pagamento utilizados pelos clientes.    

Tmabém é possível gerar relatórios quanto as comissões a serem recebidas por um funcionário pelos serviços realizados em um determinado período de tempo, além de controlar o valor total recebido através de determinado método de pagamento em um intervalo de tempo. Finalmente, também é possível gerenciar clientes, funcionários e catálogo de serviços.

# Motivação do Projeto
Ajudar um estabelecimento que mantém seus processos de histórico de agendamento, cálculo de comissões e controle de faturamento em papel e caneta, acarretando perda dos registros de atendimento, erros na distribuição das comissões e multas por conta do limite de faturamento da MEI.

# Organização das Tarefas
Utilização do método FDD(Feature Driven Development)
**https://trello.com/invite/b/097zIW16/ATTI8622f07b55f3a3ed291b4fec72dca709E4B80A10/portfolio**

# Instalação e execução  
Após clonar o repositório, execute os seguintes comandos:
```
cd backend
npm i  
npm run dev 
```
```
cd calendar
npm i  
npm start  
```

# Utilização
Após executar o projeto, basta acessá-lo localmente no endereço http://localhost:3000.  
O sistema também está disponível publicamente no endereço https://portfolio-production-691c.up.railway.app  

## Licença
Este projeto é licenciado sob a [Licença MIT](LICENSE). Consulte o arquivo [LICENSE](LICENSE) para obter detalhes.

# Autor  
Mateus Andrade

# Arquitetura do Projeto
![image](https://github.com/mateusadd/portfolio/assets/81190849/1a4f4f98-745b-42e5-9bb5-eb37b389fd2d)  
*Mais informações sobre a arquitetura do projeto podem ser encontradas na Wiki*

# Requisitos do projeto
## Requisitos Funcionais
1 - O usuário deve cadastrar novos clientes detalhando nome e telefone​

2 - Ao cadastrar um cliente, deve ser possível marcá-lo como funcionário​

3 - O usuário deve cadastrar os funcionários detalhando nome e telefone​

4 - O usuário deve cadastrar os serviços prestados, detalhando nome, preço e comissão aplicada (%)​

5 - O usuário deve criar agendamentos de acordo com a demanda dos clientes​

6 - Ao registrar um agendamento, caso o cliente correspondente for um funcionário, o sistema deve aplicar um desconto de 30% ao serviço realizado​

7 - Os agendamentos devem incluir data, horário, cliente, serviço e funcionário responsável​

8 - O sistema deve permitir que o atendente registre o método de pagamento usado para cada serviço prestado.​

9 - Os métodos de pagamento devem incluir dinheiro, cartão de crédito, cartão de débito e pix​

10 - O sistema deve fornecer a capacidade de gerar relatórios de atendimentos com base em um período específico.​

11 - Os relatórios de atendimento devem incluir detalhes como data, cliente, serviço, funcionário responsável e método de pagamento.​

12 - Deve ser possível gerar relatórios de comissões com base no período desejado e no profissional. Os relatórios de comissões devem mostrar o valor de comissão para cada serviço realizado, bem como o valor total das comissões no período​

13 - O sistema deve permitir que o usuário selecione um período e um método de pagamento específicos para gerar relatórios de pagamentos.​

14 - Os relatórios de pagamentos devem mostrar uma lista de transações correspondentes ao período e método selecionados.​

## Requisitos Não Funcionais
A interface do sistema deve ser fácil de usar, tendo atualizações dinâmicas conforme as informações são alteradas, sendo intuitiva para o usuário​

O sistema deve estar sempre disponível, para que agendamentos possam ser registrados a qualquer momento. Essencialmente durante o período de atendimento, para registrar os pagamentos.​

Deve haver backup regular para proteger os dados contra perda ou corrupção.

# Ferramentas, dependências e configurações  
Uma relação das principais ferramentas e dependências utilizadas no desenvolvimento:  
## Backend  
[Express](https://www.npmjs.com/package/express)  
[Nodemon](https://www.npmjs.com/package/nodemon)  
[Mysql2](https://www.npmjs.com/package/mysql2)  
[Sequelize](https://www.npmjs.com/package/sequelize)  
[Jest](https://www.npmjs.com/package/jest)  

## Frontend  
[Axios](https://www.npmjs.com/package/axios)  
[Calendar](https://www.npmjs.com/package/react-big-calendar)  
[Icons](https://www.npmjs.com/package/react-icons)  
