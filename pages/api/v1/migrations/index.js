import { runner as migrationRunner } from "node-pg-migrate";
import { join } from "node:path";
import database from "infra/database.js";

// ≈ um @RestController que dispara o Flyway via HTTP.
// Um único arquivo trata todos os métodos (GET/POST) com `if`.
export default async function migrations(request, response) {
  // O runner precisa de uma conexão aberta (por isso getNewClient).
  const dbClient = await database.getNewClient();

  const defaultMigrationOptions = {
    dbClient,
    // dryRun: true = simula; calcula o que seria aplicado sem
    // alterar o banco. É o "flyway info".
    dryRun: true,
    // Pasta com os arquivos de migration (infra/migrations).
    dir: join("infra", "migrations"),
    // "up" aplica; "down" desfaz.
    direction: "up",
    verbose: true,
    // Tabela onde o runner anota o que já foi aplicado
    // (≈ flyway_schema_history).
    migrationsTable: "pgmigrations",
  };

  // GET: só lista as migrations pendentes (não altera o banco).
  if (request.method === "GET") {
    const pendingMigrations = await migrationRunner(defaultMigrationOptions);
    await dbClient.end();
    return response.status(200).json(pendingMigrations);
  }

  // POST: aplica de verdade (dryRun: false).
  if (request.method === "POST") {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationOptions,
      dryRun: false,
    });

    await dbClient.end();

    // 201 = algo novo foi criado/aplicado; 200 = nada a fazer.
    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  }

  // Qualquer outro método não é suportado.
  await dbClient.end();
  return response.status(405).end();
}
