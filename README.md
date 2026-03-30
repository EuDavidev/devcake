# DevCake

Projeto full stack em evolucao para portfolio, com foco em vitrine de confeitaria e fluxo real de pedidos.

## Estado atual

- Aplicacao Next.js com landing page de portfolio da DevCake.
- Secoes de hero, produtos, sobre e contato.
- Componentes reutilizaveis de UI e estrutura inicial para carrinho no cliente.
- API publica de pedidos implementada com validacao no servidor.
- Base de autenticacao admin implementada com sessao HttpOnly e rate limiting inicial.

## Roadmap ativo (M1..M5)

- M1: Credibilidade do projeto (README honesto, lint e limpeza de legado).
- M2: Fundacao backend (MongoDB, contrato de ambiente e APIs iniciais).
- M3: Painel administrativo autenticado para gestao de produtos e pedidos.
- M4: Evolucao UX/UI e acessibilidade avancada.
- M5: Cobertura de testes, hardening e deploy de portfolio.

## Status das milestones

- [x] M1: Credibilidade do projeto.
- [x] M2: Fundacao backend.
- [ ] M3: Painel administrativo autenticado.
- [ ] M4: Evolucao UX/UI e acessibilidade avancada.
- [ ] M5: Cobertura de testes, hardening e deploy.

## Como rodar localmente

1. Instale as dependencias:

   npm install

2. Inicie o ambiente de desenvolvimento:

   npm run dev

3. Acesse no navegador:

   http://localhost:3000

## Variaveis de ambiente

Use um arquivo `.env.local` com as seguintes chaves (necessarias para as fases de backend):

- MONGODB_URI=
- ADMIN_SEED_EMAIL=
- ADMIN_SEED_PASSWORD=
