import sql from "mssql";

let poolPromise: Promise<sql.ConnectionPool> | null = null;

function getDatabaseConfig(): sql.config {
  const serverValue = process.env.DB_SERVER?.trim();
  const database = process.env.DB_NAME?.trim();
  const user = process.env.DB_USER?.trim();
  const password = process.env.DB_PASSWORD;
  const port = Number(process.env.DB_PORT || 1433);

  if (!serverValue || !database || !user || !password) {
    throw new Error("Faltan DB_SERVER, DB_NAME, DB_USER o DB_PASSWORD en el archivo .env.");
  }

  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error("DB_PORT debe ser un puerto válido entre 1 y 65535.");
  }

  const [server, instanceName] = serverValue.split("\\", 2);

  if (!server || serverValue.split("\\").length > 2) {
    throw new Error("DB_SERVER debe ser un host o un host\\instancia, por ejemplo localhost\\SQLEXPRESS.");
  }

  return {
    server,
    database,
    user,
    password,
    ...(instanceName ? {} : { port }),
    options: {
      encrypt: process.env.DB_ENCRYPT === "true",
      trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === "true",
      ...(instanceName ? { instanceName } : {})
    },
    pool: {
      max: 10,
      min: 0,
      idleTimeoutMillis: 30000
    }
  };
}

export function getPool(): Promise<sql.ConnectionPool> {
  if (!poolPromise) {
    const pool = new sql.ConnectionPool(getDatabaseConfig());
    poolPromise = pool.connect().catch((error: unknown) => {
      poolPromise = null;
      throw error;
    });
  }

  return poolPromise;
}
