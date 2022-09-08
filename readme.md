# API REST com conexão à banco MYSQL/MARIADB

### API REST criada com NODE JS + EXPRESS JS + NODEMON + MYSQL + BODYPARSER + MORGAN

REST API criada para gerenciamento de usuários do neoscan.com.br

MODELO DE BANCO DE DADOS UTILIZADO:


```
db USERS 
 table MEMBERS
  fields: username,password,email,verified,cidade
```
Para utilizar a API clone o projeto e siga os passos a seguir:

- Para instalar as dependências
``` npm install```

- Para configurar o acesso ao seu banco de dados:

```cp nodemon.example nodemon.json```

E faça a atribuição dos valores do seu banco de dados.

- Para rodar o servidor da API:

```npm start```



