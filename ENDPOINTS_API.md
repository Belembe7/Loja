# Lista de Rotas

## Saúde

GET /: status da API

GET /api: status da API

GET /api/status: status da API

## Autenticação

POST /api/login: login

POST /api/logout: logout

GET /api/check-auth: verifica autenticação

## Produtos

GET /api/produtos: lista produtos

GET /api/produtos/:id: busca produto

POST /api/produtos: cria produto

PUT /api/produtos/:id: atualiza produto

DELETE /api/produtos/:id: remove produto

## Categorias

GET /api/categorias: lista categorias

POST /api/categorias: cria categoria

GET /api/categorias/:id/produtos: produtos por categoria

## Upload

POST /api/upload: upload de imagem

GET /api/uploads/:filename: serve imagem

## Interface Web

GET /login.html: página de login

GET /admin.html: página admin
