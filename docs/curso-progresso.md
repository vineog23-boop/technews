# Progresso do curso.dev — TechNews

Arquivo vivo. Atualizar ao fim de cada aula/módulo.

## Onde estamos

- **Módulo atual:** Banco de dados (Postgres + Docker + endpoint
  `/api/v1/status`).
- **Já existe:**
  - Projeto Next (Pages Router) com Prettier, EditorConfig e Jest.
  - Testes unitários da `calculadora` (aula introdutória de testes).
  - Postgres 16 via `infra/compose.yaml` e `.env.development`
    (versionado, valores `local_*`, como no professor).
  - `infra/database.js` com `query()` (client `pg`, abre/fecha a cada
    chamada). Alinhado ao commit `02d4cb5`: `connect()` dentro do
    `try`, `throw error` no `catch` e log das credenciais. SSL ligado
    só fora de `development` (commit `73bead6`).
  - `GET /api/v1/status` retornando `updated_at`, versão do Postgres,
    `max_connections` e `opened_connections`.
  - Teste de integração do endpoint de status em
    `test/integration/api/v1/status/get.test.js`.
  - Banco de produção na nuvem (Neon, plano free) e deploy na Vercel.
    As credenciais ficam no `.env.production` (fora do git) e nas
    Environment Variables da Vercel.
- **Próximos passos prováveis:** confirmar com o aluno qual aula vem
  agora (não assumir).

## Divergências curso × versão atual

Formato:

- **Aula X:** o professor faz A; hoje faço B porque C.

- **Versões:** professor usa Next 13, React 18 e Prettier 2; aqui
  Next 16, React 19 e Prettier 3. O Prettier 3 usa vírgula final
  `all` (também em argumentos de função), então o código formatado
  pode diferir levemente do dele.
- **Node:** professor usa `.nvmrc` (provável `lts/hydrogen`); aqui
  Node 22, sem `.nvmrc`.
- **Pasta de testes:** professor usa `tests/`; aqui `test/`. A
  estrutura interna espelha a rota
  (`integration/api/v1/status/get.test.js`).
- **package.json:** nome `technews`, `description` e `author`
  personalizados, sem `license`; scripts `build` e `start` extras.
- **Env:** `.env.development` versionado com valores `local_*`
  (como no professor); o `.gitignore` abre exceção para ele.
- **Banco de produção:** o professor usa o ElephantSQL (encerrado);
  aqui usei o Neon (free). O Neon entrega uma `DATABASE_URL`; separei
  nas cinco variáveis `POSTGRES_*` que o código já lê.
- **Env de produção:** `.env.production` fica fora do git (regra
  `.env*`) e os mesmos valores são cadastrados na Vercel; variável
  nova só vale após novo deploy.
- **Calculadora:** ainda existe aqui; no commit `02d4cb5` do
  professor não encontrei `models/calculadora.js` (não confirmado).
- **Migrations (node-pg-migrate):** professor usa v6 com `exports.up`
  (CJS); aqui está instalada a v9, que gera ESM (`export const up`)
  e exige `export const shorthands`. `--envPath` continua existindo.
- **Migrations ainda não criadas:** o commit `578b6d9` do Felipe
  ("adds migration scripts") só traz scripts e `DATABASE_URL`, sem
  arquivo de migration. Criei `create-users` por antecipação e já
  reverti (tabela e arquivo removidos). A primeira migration real
  deve vir da aula.
- **`DATABASE_URL`:** o `node-pg-migrate` lê essa variável. Em
  `.env.development` (local, versionado) ficou a URL local. As
  credenciais do Neon **não** vão nesse arquivo; ficam só no
  `.env.production` e na Vercel.
- **Versões instaladas:** `node-pg-migrate` 9.0.0 (curso: 6.x) e
  `dotenv` 18.0.5 (curso: 16.4.4). Next/React já listados acima.

## Refatorar depois

Itens para atacar **só depois** de terminar o curso (ou o módulo):

- Pasta `test/` vs `tests/` do curso (decidir padrão).
- Tratamento de erro em `infra/database.js` (hoje loga e relança).
- Avaliar migração Pages Router → App Router.
- Atualizações de Next/React além do que o curso usa.
- Texto provisório do `<h1>` da home.
- Remover o `console.log` das credenciais (inclui a senha) do
  `infra/database.js` quando o professor remover. Depois, trocar a
  senha do Neon (ela apareceu em logs e no chat).
- Pool de conexões (hoje abre/fecha uma conexão por `query()`).
- Decidir se cria `README.md`, `.nvmrc` e `.prettierignore` como o
  professor.

## Glossário JS ↔ Java (para consulta rápida)

- `package.json` ≈ `pom.xml` / `build.gradle`
- `npm install` ≈ `mvn dependency:resolve`
- `node_modules` ≈ `~/.m2` (mas local ao projeto)
- `pages/api/*` ≈ `@RestController` + `@GetMapping`
- `infra/database.js` ≈ `DataSource` / Repository
- `.env.*` ≈ `application.properties` por profile
- Jest ≈ JUnit + AssertJ
- `import/export` (ESM) ≈ `import` + visibilidade `public`
- `async/await` ≈ `CompletableFuture` com sintaxe sequencial
