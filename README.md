# API de Clientes

API REST para gerenciamento de clientes com Node.js e Fastify Framework.

## 📋 Pré-requisitos

- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

## 🚀 Como Executar

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd <nome-do-projeto>
```

2. Build e inicie os containers:
```bash
docker compose up --build
```

3. A API estará disponível em: `http://localhost:3030`

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

## 🧪 Testando a API

Utilize ferramentas como:
- [Postman](https://www.postman.com/)
- [Insomnia](https://insomnia.rest/)
- [Thunder Client](https://www.thunderclient.com/) (extensão VS Code)

## 🛑 Parar a Aplicação

```bash
docker compose down
```

---