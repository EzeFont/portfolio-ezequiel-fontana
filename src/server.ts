import cors from "cors";
import dotenv from "dotenv";
import express, { type ErrorRequestHandler } from "express";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { getPool } from "./db.js";
import proyectosRouter from "./proyectos.routes.js";

dotenv.config();

const app = express();
const port = Number(process.env.PORT || 3000);
const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

app.use(cors({ origin: process.env.CORS_ORIGIN || "*" }));
app.use(express.json({ limit: "20kb" }));
app.use("/api/proyectos", proyectosRouter);
app.use("/css", express.static(path.join(projectRoot, "css")));
app.use("/js", express.static(path.join(projectRoot, "js")));
app.use("/img", express.static(path.join(projectRoot, "img")));
app.get("/", (_request, response) => response.sendFile(path.join(projectRoot, "index.html")));
app.use("/api", (_request, response) => {
  response.status(404).json({ error: "La ruta de API solicitada no existe." });
});
app.use((_request, response) => {
  response.status(404).json({ error: "No se encontró el recurso solicitado." });
});
const manejarErrores: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof SyntaxError) {
    response.status(400).json({ error: "El cuerpo de la solicitud no contiene JSON válido." });
    return;
  }

  console.error("Error interno del servidor:", error);
  response.status(500).json({ error: "Ocurrió un error interno del servidor." });
};
app.use(manejarErrores);

async function iniciarServidor(): Promise<void> {
  await getPool();
  app.listen(port, () => {
    console.log(`Portfolio disponible en http://localhost:${port}`);
  });
}

iniciarServidor().catch((error: unknown) => {
  console.error("No se pudo iniciar el servidor o conectar con SQL Server.", error);
  console.error("Revisá la configuración de .env, TCP/IP, SQL Server Browser y el puerto de SQL Server.");
  process.exitCode = 1;
});
