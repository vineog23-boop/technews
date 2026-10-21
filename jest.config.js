const dotenv = require("dotenv");
dotenv.config({
  path: ".env.development",
});

const nextJest = require("next/jest");

const createJestConfig = nextJest({
  dir: ".",
});
const jestConfig = createJestConfig({
  // Permite `import database from "infra/database.js"` nos testes
  // (mesmo efeito do baseUrl do jsconfig.json).
  moduleDirectories: ["node_modules", "<rootDir>"],
});

module.exports = jestConfig;
