# DevCake

Case full stack de portfolio: vitrine de confeitaria com fluxo real de pedidos e painel admin autenticado.

## TL;DR

Este projeto foi construido para demonstrar capacidade de entrega ponta a ponta:

- frontend com foco em conversao e experiencia
- backend com regras de negocio e validacao no servidor
- autenticacao admin com sessao e protecao de rotas
- testes automatizados para endpoints criticos

## Problema

Grande parte dos projetos de portfolio para vagas junior mostra apenas UI.
O DevCake foi desenhado para ir alem da interface e provar habilidade real de produto:

- capturar pedido no fluxo publico
- persistir e validar no backend
- gerir ciclo do pedido em painel administrativo

## Solucao implementada

### Experiencia publica

- landing page com secoes de hero, produtos, sobre e contato
- catalogo com filtros por categoria
- carrinho no cliente
- criacao de pedido via API

### Experiencia administrativa

- login admin com validacao e rate limiting basico
- sessao com cookie HttpOnly
- painel de pedidos com busca, filtro por status e atualizacao de status

## Arquitetura e stack

- Next.js App Router (frontend + APIs)
- MongoDB Atlas (persistencia)
- Zod (validacao de payload)
- Zustand (estado client-side)
- Vitest (testes)

## Endpoints principais

- POST /api/orders
- POST /api/admin/login
- POST /api/admin/logout
- GET /api/admin/orders
- PATCH /api/admin/orders/:id/status

## Evidencias de engenharia

- lint estrito habilitado
- build de producao validado
- testes cobrindo fluxos principais de API (sucesso e falha)
- limpeza de codigo legado para reduzir ruido arquitetural

## Status de evolucao

- [x] M1: Credibilidade do projeto
- [x] M2: Fundacao backend
- [x] M3: Painel admin autenticado
- [x] M4: UX/UI e acessibilidade do admin
- [x] M5: Testes de API e documentacao de deploy

## Como executar localmente

1. Instalar dependencias:

   npm install

2. Criar .env.local com:

   MONGODB_URI=
   ADMIN_SEED_EMAIL=
   ADMIN_SEED_PASSWORD=

3. Rodar ambiente de desenvolvimento:

   npm run dev

4. Abrir no navegador:

   http://localhost:3000

## Comandos de verificacao

- npm run lint:strict
- npm run test:unit
- npm run build

## Deploy

Guia detalhado: docs/DEPLOYMENT.md
