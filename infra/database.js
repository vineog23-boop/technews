import { Client } from "pg";

// Caminho "curto": abre uma conexão, roda UMA query e fecha.
// Usado pelo /status. (≈ JdbcTemplate.query(...))
async function query(queryObject) {
  let client;

  try {
    client = await getNewClient();
    const result = await client.query(queryObject);
    return result;
  } catch (error) {
    console.error(error);
    throw error;
  } finally {
    // `client` pode ser undefined se getNewClient() falhou
    await client?.end();
  }
}

// Caminho "longo": devolve um client já conectado e deixa quem chamou
// decidir quando fechar (client.end()). Necessário para o
// node-pg-migrate, que precisa de UMA conexão para várias operações.
// (≈ dataSource.getConnection())
async function getNewClient() {
  const client = new Client({
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    user: process.env.POSTGRES_USER,
    database: process.env.POSTGRES_DB,
    password: process.env.POSTGRES_PASSWORD,
    // SSL só em produção (Neon exige). No Jest o NODE_ENV é "test",
    // por isso não dá para usar "!== development".
    ssl: process.env.NODE_ENV === "production" ? true : false,
  });

  await client.connect();
  return client;
}

export default {
  query,
  getNewClient,
};
