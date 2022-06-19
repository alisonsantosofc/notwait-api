# Recuperação de Senha

**Requesitos Funcionais**

- O usuário deve poder recuperar sua senha informando seu email.
- O usuráio deve receber um email com instruções para recuperação de senha.
- O usuário deve poder resetar sua senha.

**Requesitos Não Funcionais**

- Utilizar Mailtrap para testar envios em ambiente de desenvolvimento.
- Utilizar Amazon SES para envios em ambiente de produção.
- O envio de emails deve acontecer em segundo plano. (  background job )

**Regras de Negócios**

- O link enviado por email para recuperar a senha, deve expirar em 2 horas.
- O usuário precisa confirmar a nova senha ao resetar sua senha.

# Atualização do Perfil

**Requesitos Funcionais**

- O usuário deve poder atualizar seu nome, email e senha.

**Regras de Negócios**

- O usuário não pode alterar seu email para um email já utilizado.
- Para atualizar sua senha, o usuário deve informar a senha antiga.
- Para atualizar sua senha, o usuário precisa confirmar a nova senha.

# Painel do Prestador de Serviços

**Requesitos Funcionais**

- O usuário deve poder listar seus agendamentos de um dia específico.
- O prestador de serviços deve receber uma notificação sempre que houver um novo agendamento.
- O prestador de serviços deve poder visualizar as notificações não visualizadas.

**Requesitos Não Funcionais**

- Os agendamentos de um prestador de serviços devem ser armazenados em cache.
- As notificações do prestador de serviços devem ser armazenadas no MongoDB.
- As notificações do prestador de serviços devem ser enviadas em tempo real utilizando Socket.io.

**Regras de Negócios**

- Cada notificação deve ter um status de 'visualizada' ou 'não visualizada'.

# Agendamentos de Serviços

**Requesitos Funcionais**

- O usuário deve poder listar todos os prestadores de serviços cadastrados.
- O usuário deve poder listar os dias de um mês com pelo menos um horário disponível de um prestador de serviços.
- O usuário deve poder listar horários disponíveis em um dia específico de um prestador de serviços.
- O usuário deve poder realizar um novo agendamento com um prestador de serviços.

**Requesitos Não Funcionais**

- A listagem de prestadores de serviços deve ser armazenada em cache.

**Regras de Negócios**

- Cada agendamento deve durar 1h exatamente.
- Os agendamentos devem estar disponíveis entre 8h ás 18h (Primeiro ás 8h, último ás 17h).
- O usuário não pode agendar em um hórario já ocupado.
- O usuário não pode agendar em um hórario que já passou.
