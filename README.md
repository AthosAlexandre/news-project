# 🚀 econect – SohtaNews

Aplicação full-stack de notícias (CRUD) composta por:

- **Backend**: Node.js + Express + TypeScript, Prisma (PostgreSQL), Zod (validação), Multer (upload de imagens).  
- **Frontend**: Next.js (App Router) + TypeScript + Tailwind CSS.  
- **Banco**: PostgreSQL (via Docker).

---

## 📦 Pré-requisitos
- Node.js **≥ 18** e npm **≥ 9**  
- Docker Desktop (Windows/macOS) ou Docker Engine (Linux)  
- Git

---

## 📂 Estrutura do repositório
```
news-project/
├─ news-api/   # Backend
└─ news-web/   # Frontend
```

---

## ⚙️ Variáveis de ambiente

**news-api/.env**
```env
DATABASE_URL="postgresql://postgres:postgres@localhost:5432/newsdb?schema=public"
PORT=4000
UPLOAD_DIR=uploads
```

**news-web/.env.local**
```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
NEXT_PUBLIC_API_ORIGIN=http://localhost:4000
```

> Obs.: se rodar o backend **dentro de container** e o frontend fora, ajuste `DATABASE_URL` para `host.docker.internal`.

---

## 🐳 Subindo o Postgres com Docker

### Criar o container
```bash
docker run --name pg-news   -e POSTGRES_PASSWORD=postgres   -e POSTGRES_DB=newsdb   -p 5432:5432   -d postgres:16
```

Isso cria o DB `newsdb` com usuário `postgres/postgres`.

### Comandos úteis
```bash
docker ps                         # listar containers
docker logs -f pg-news            # ver logs do Postgres
docker exec -it pg-news psql -U postgres -d newsdb   # abrir psql
docker stop pg-news && docker rm pg-news             # parar/remover
```

---

## 🔧 Rodando o backend (news-api)
```bash
cd news-api
npm install
npx prisma generate
npx prisma migrate dev --name init   # cria as tabelas
npm run dev
```

- API: http://localhost:4000/api  
- Uploads: http://localhost:4000/uploads/...

---

## 🎨 Rodando o frontend (news-web)
```bash
cd news-web
npm install
npm run dev
```

- App: http://localhost:3000

---

## 📑 Documentação da API

**Base URL:** `http://localhost:4000/api`

- `GET /news` → lista notícias  
- `GET /news/:id` → notícia por id  
- `POST /news` (multipart) → cria notícia  
  - Campos: `title`, `summary`, `body`, `image?`  
- `PUT /news/:id` (multipart) → atualiza notícia  
  - Campos opcionais: `title`, `summary`, `body`, `published`, `image`

Exemplo (com imagem):
```bash
curl -X POST http://localhost:4000/api/news   -F "title=Notícia com imagem"   -F "summary=Resumo com mais de 10 caracteres"   -F "body=Um corpo com pelo menos 20 caracteres de conteúdo"   -F "image=@./foto.jpg"
```

---

## 🛠️ Decisões técnicas principais
- **TypeScript** em toda stack para tipos fortes.  
- **Prisma** facilita migrações e consultas no Postgres.  
- **Zod** validações no backend.  
- **Multer** para upload local de imagens.  
- **Next.js (App Router)** no frontend.  
- **Tailwind CSS** para estilização rápida e consistente.  

---

## 🚧 Possíveis melhorias
- Paginação no `GET /news`  
- Exclusão de notícias e imagens  
- Autenticação/Autorização  
- Upload para S3/CDN  
- Testes automatizados  
