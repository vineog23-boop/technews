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
    `try`, `throw error` no `catch` e log das credenciais.
  - `GET /api/v1/status` retornando `updated_at`, versão do Postgres,
    `max_connections` e `opened_connections`.
  - Teste de integração do endpoint de status em
    `test/integration/api/v1/status/get.test.js`.
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
- **Calculadora:** ainda existe aqui; no commit `02d4cb5` do
  professor não encontrei `models/calculadora.js` (não confirmado).

## Refatorar depois

Itens para atacar **só depois** de terminar o curso (ou o módulo):

- Pasta `test/` vs `tests/` do curso (decidir padrão).
- Tratamento de erro em `infra/database.js` (hoje loga e relança).
- Avaliar migração Pages Router → App Router.
- Atualizações de Next/React além do que o curso usa.
- Texto provisório do `<h1>` da home.
- Remover o `console.log` das credenciais (inclui a senha) do
  `infra/database.js` quando o professor remover.
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
