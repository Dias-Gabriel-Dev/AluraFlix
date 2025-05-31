# 🎬 AluraFlix API

API RESTful para gerenciamento de vídeos, categorias e usuários (admin, docente, aluno).

[![Documentação Swagger](https://img.shields.io/badge/documentação-swagger-blue)](http://localhost:3000/api-docs)
[![Coleção Postman](https://img.shields.io/badge/postman-collection-orange)](#postman)

---

## 🚀 Tecnologias

- Node.js + Express
- MongoDB (Mongoose)
- JWT para autenticação
- express-validator para validação
- Swagger/OpenAPI e Postman para documentação/testes

---

## 📦 Como rodar localmente

1. Clone o repositório
2. Instale as dependências:
   npm install

text 3. Crie um arquivo `.env` na raiz com:
DB_connection_STRING=mongodb://127.0.0.1:27017/aluraflix
JWT_SECRET=sua_chave_secreta

text 4. Inicie o servidor:
npm start

text 5. Acesse:

- [Documentação Swagger](http://localhost:3000/api-docs)
- Importe a [Coleção Postman](#colecao-postman) para testar

---

## 🔑 Principais Endpoints

### Usuários

- `POST /cadastro` — Cadastro público (cria aluno)
- `POST /login` — Login e obtenção do token JWT
- `POST /usuarios/avancado` — Cria admin/docente (apenas admin)
- `GET /usuarios?ativo=true|false` — Lista usuários (apenas admin, filtro ativo/inativo)
- `PUT /usuarios/:id` — Atualiza usuário (próprio ou admin)
- `PATCH /usuarios/:id/inativar` — Inativa usuário (soft delete, próprio ou admin)
- `PATCH /usuarios/:id/reativar` — Reativa usuário (somente admin)

### Categorias

- `POST /categorias` — Cria categoria (admin/docente)
- `GET /categorias` — Lista categorias (paginado)
- `GET /categorias/:id` — Detalha categoria por ID
- `GET /categorias/busca?nome=...` — Busca por nome (sem acento)
- `PUT /categorias/:id` — Atualiza categoria (admin/docente)
- `DELETE /categorias/:id` — Deleta categoria (apenas admin)

### Vídeos

- `POST /videos` — Cria vídeo (admin/docente)
- `GET /videos` — Lista vídeos (paginado)
- `GET /videos/gratis` — Lista vídeos gratuitos (público, paginado)
- `GET /videos/:id` — Detalha vídeo por ID
- `GET /videos/busca?titulo=...` — Busca por título (sem acento)
- `GET /videos/categorias/id/:id` — Lista vídeos por categoria (ID)
- `GET /videos/categorias/nome/:categoria` — Lista vídeos por categoria (nome)
- `PUT /videos/:id` — Atualiza vídeo (admin/docente)
- `DELETE /videos/:id` — Deleta vídeo (apenas admin)

---

## 📝 Exemplos de payload

### Cadastro de usuário (aluno)

{
"username": "aluno1",
"senha": "senha123"
}

text

### Login

{
"username": "aluno1",
"senha": "senha123"
}

text

### Cadastro de usuário avançado (admin/docente)

{
"username": "professor1",
"senha": "senhaprof",
"role": "docente"
}

text

### Criação de vídeo

{
"titulo": "API REST com Node.js",
"descricao": "Aprenda a criar APIs RESTful usando Node.js.",
"url": "https://meusvideos.com/backend1",
"categoria": "ID_DA_CATEGORIA ou NOME_DA_CATEGORIA (se ficar em branco será atribuído 'Livre')",
"tags": ["gratuito"]
}

text

### Atualização de usuário (trocar senha)

{
"senhaAtual": "senhaantiga",
"novaSenha": "senhanova"
}

text

---

## 🔍 Filtros e paginação

- Todos os GETs de listagem aceitam `?page=1&limit=5`
- Filtro de usuários ativos/inativos: `GET /usuarios?ativo=true` ou `?ativo=false`
- Busca por nome/título: não diferencia acentuação

---

## 🔒 Autenticação

- Use o token JWT retornado no login no header:
  Authorization: Bearer SEU_TOKEN_AQUI

text

---

## 📑 Documentação

- [Swagger/OpenAPI](swagger.yaml) — acesse `/api-docs` localmente
- [Coleção Postman](AluraFlix.postman_collection.json) — pronta para importar

---

## 🤝 Contato

- [Seu LinkedIn](https://www.linkedin.com/in/gabriel-henrique-dos-santos-dias-7b5b61346/)
- Email: <gabriel.henrique.dias@outlook.com>

---

## 🧑‍💻 Contribua

Pull requests são bem-vindos! Para sugestões, abra uma issue.

---

## 🏷️ Licença

[MIT](LICENSE)
