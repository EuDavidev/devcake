# DevCake

Projeto full stack para portfolio com foco em experiencia de compra, fluxo real de pedidos e painel administrativo.

## Objetivo do projeto

O DevCake foi evoluido para demonstrar capacidade junior/pleno em frontend, backend e integracao de produto:

- Landing page com catalogo e carrinho.
- Criacao de pedidos com validacao no servidor.
- Area administrativa protegida para gestao de pedidos.
- UX refinada com estados de carregamento, erro e sucesso.

## Funcionalidades implementadas

### Publico

- Home com secoes de hero, produtos, sobre e contato.
- Catalogo com filtros por categoria.
- Carrinho no cliente e fluxo de envio de pedido.
- Endpoint de criacao de pedido: POST /api/orders.

### Administrativo

- Login admin com validacao e rate limiting basico.
- Sessao via cookie HttpOnly.
- Dashboard de pedidos com:
  - filtro por status
  - busca por nome e e-mail
  - atualizacao de status em tempo real
- Endpoints:
  - POST /api/admin/login
  - POST /api/admin/logout
  - GET /api/admin/orders
  - PATCH /api/admin/orders/:id/status

## Arquitetura

- Frontend: Next.js App Router + componentes reutilizaveis
- Backend: API Routes no mesmo projeto
- Banco: MongoDB (Atlas)
- Validacao: Zod
- Estado client-side: Zustand
- Testes: Vitest

## Qualidade e engenharia

- Lint configurado com padrao Next core web vitals.
- Build de producao validado.
- Testes unitarios para dominio e rotas de API criticas.
- Remocao de codigo legado paralelo para reduzir ruido do repositrio.

## Status das milestones

- [x] M1: Credibilidade do projeto
- [x] M2: Fundacao backend
- [x] M3: Painel administrativo autenticado
- [x] M4: UX/UI e acessibilidade do admin
- [x] M5: Testes de API + documentacao de deploy

## Como rodar localmente

1. Instale as dependencias.

   npm install

2. Configure o arquivo .env.local.

   MONGODB_URI=
   ADMIN_SEED_EMAIL=
   ADMIN_SEED_PASSWORD=

3. Inicie o ambiente de desenvolvimento.

   npm run dev

4. Abra no navegador.

   http://localhost:3000

## Comandos principais

- npm run dev
- npm run lint:strict
- npm run test:unit
- npm run build

## Deploy

Guia completo em docs/DEPLOYMENT.md.
