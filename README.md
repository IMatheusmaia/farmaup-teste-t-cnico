# API de Clientes

API REST Serverless para gerenciamento de clientes com Node.js e Fastify  + AWS Lambda Adapter.

## 📋 Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 🚀 Como Executar

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd <nome-do-projeto>
```
2. Entre no diretório da API Serverless e faça o empacotamento para .zip

```bash

cd lambda/
npm run package #já tem um script preparado para empacotar a aplicação

```

3. Build e inicie os containers:
```bash
docker compose up --build
```

3. A aplicação pode ser testada pela interface gráfica em: `http://localhost:8080`

## 📡 Endpoints

### Listar todos os clientes
```http
GET /clientes
```

### Buscar cliente por ID
```http
GET /clientes/:id
```

### Criar novo cliente
```http
POST /clientes
Content-Type: application/json

{
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "11999999999",
    "city": "São Paulo"
}
```

### Atualizar cliente
```http
PUT /clientes/:id
Content-Type: application/json

{
    "name": "João Silva",
    "email": "joao@email.com",
    "phone": "11999999999",
    "city": "São Paulo"
}
```
*Todos os campos são opcionais*

### Deletar cliente
```http
DELETE /clientes/:id
```

## 🛑 Parar a Aplicação

```bash
docker compose down
```

---