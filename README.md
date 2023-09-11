# Portfolio
Sistema de Gestão Salão de Beleza

# Execução
npm start
Acesso em http://localhost:3001/

## Licença
Este projeto é licenciado sob a [Licença MIT](LICENSE). Consulte o arquivo [LICENSE](LICENSE) para obter detalhes.

# Contato
m.andrade@catolicasc.edu.br


# Motivação do Projeto
Ajudar um estabelecimento que mantém seus processos de histórico de agendamento, cálculo de comissões e controle de faturamento em papel e caneta, acarretando perda dos registros de atendimento, erros na distribuição das comissões e multas por conta do limite de faturamento da MEI

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
"cookie-parser": "~1.4.4"\n
"debug": "~2.6.9"\n
"ejs": "^3.1.8"\n
"express": "^4.18.2"\n
"http-errors": "~1.6.3"\n
"morgan": "~1.9.1"\n
"mysql2": "^2.3.3"

# Instruções para Novos Desenvolvedores
git clone https://github.com/mateusadd/portfolio/edit/main
npm start

# Organização das Tarefas
Utilização do método FDD(Feature Driven Development)
**https://trello.com/invite/b/097zIW16/ATTI8622f07b55f3a3ed291b4fec72dca709E4B80A10/portfolio**
