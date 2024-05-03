![Logo Docker](https://wallpapercave.com/wp/wp8114614.png)

# Contêineres com Docker

> Status: Finalizado ✅

### 💡 **Dica:** Utilize o VS Code.

## Passos para criar os containers e imagens no Docker:

- Entre no diretório `containers` onde há o arquivo `docker-compose.yml`, se caso não estiver, com o comando `$ cd containers` você conseguirá entrar no diretório (dependendo de onde estiver, obedeça a hierarquia de arquivos).

- Abra o terminal com `Ctrl + J`.

- Digite o seguinte comando `$ docker compose up` e aguarde.

- Após finalizar, abra um novo terminal com `Ctrl + Shift + 5` e verifique se os containers estão sendo executados com o comando `$ docker ps`

- Verificando se está tudo certo, vamos ceder permissão ao nosso usuário criado para o banco de dados, para não ocorrer problema quando dermos uma migration.

## Passos para dar privilégios ao usuário criado:

- Começamos digitando esse comando: `$ docker exec -it livros_db mysql -uroot -plivroswa123 -P3306 livros`

- Logo após, podemos verificar o usuário criado pelo docker pelo seguinte comando: `mysql> SELECT user, host FROM mysql.user`

- Podemos observar que o usuário que queremos é o `livrosdb`

- Dessa forma, vamos digitar o seguinte comando `mysql> GRANT ALL PRIVILEGES ON *.* TO 'livrosdb'@'%' WITH GRANT OPTION;`, dar um `Enter` e digitar esse próximo comando `mysql> FLUSH PRIVILEGES;` e finalizar com um `Enter`, recebendo essa mensagem `Query OK, 0 rows affected (0.00 sec)`, quer dizer que tudo ocorreu bem, podendo dar um `mysql> exit`.

- Após isso, só falta criar o banco de dados para nossa aplicação ser completamente utilizada.

## Passos para criar o banco de dados:

- Primeiramente executamos esse comando `$ docker exec livros_backend npx prisma migrate dev --name create-database`, esse comando serve para criarmos nosso banco de dados `Livros`, declarado no arquivo `schema.prisma`

- Para checar que o banco foi criado realmente, é só acessar o `localhost:8080` para entrar no `PHPMyAdmin` e gerenciar da forma que quiser o banco de dados.

- Perfeito, chegamos no final, com o banco de dados criado podemos usar a aplicação por completo, parabéns por ter chegado aqui!

## Considerações finais:

- Muito bem, agora que nossa aplicação está no ar com Docker, caso queira encerrar o compose é só dar um `Ctrl + C`, caso queira iniciar é só dar um `$ docker compose up` devendo estar no diretório onde possui o `docker-compose.yml`, e somente lembrando algumas portas:
  - `Back-End - localhost:4444` (Não acessível)
  - `Front-End - localhost:8000`
  - `MySQL - localhost:3306` (Não acessível)
  - `PHPMyAdmin - localhost:8080`
