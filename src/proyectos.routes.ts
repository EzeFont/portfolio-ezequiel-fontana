import { Router, type Request, type Response } from "express";
import sql from "mssql";
import { getPool } from "./db.js";
import type { DatosProyecto, EstadoProyecto, Proyecto } from "./proyecto.js";

const router = Router();

function convertirProyecto(row: {
  Id: number;
  Nombre: string;
  Descripcion: string;
  Tecnologias: string | null;
  ImagenUrl: string | null;
  Estado: EstadoProyecto;
  FechaCreacion: Date;
}): Proyecto {
  return {
    id: row.Id,
    nombre: row.Nombre,
    descripcion: row.Descripcion,
    tecnologias: row.Tecnologias,
    imagenUrl: row.ImagenUrl,
    estado: row.Estado,
    fechaCreacion: row.FechaCreacion
  };
}

function validarDatos(body: unknown): { datos?: DatosProyecto; error?: string } {
  if (typeof body !== "object" || body === null || Array.isArray(body)) {
    return { error: "El cuerpo de la solicitud debe ser un objeto JSON." };
  }

  const values = body as Record<string, unknown>;
  const nombre = typeof values.nombre === "string" ? values.nombre.trim() : "";
  const descripcion = typeof values.descripcion === "string" ? values.descripcion.trim() : "";
  const tecnologias = values.tecnologias === undefined || values.tecnologias === null
    ? null
    : typeof values.tecnologias === "string" ? values.tecnologias.trim() : undefined;
  const imagenUrl = values.imagenUrl === undefined || values.imagenUrl === null
    ? null
    : typeof values.imagenUrl === "string" ? values.imagenUrl.trim() : undefined;
  const estado = values.estado;

  if (!nombre || nombre.length > 100) {
    return { error: "El nombre es obligatorio y no puede superar los 100 caracteres." };
  }

  if (!descripcion || descripcion.length > 500) {
    return { error: "La descripción es obligatoria y no puede superar los 500 caracteres." };
  }

  if (tecnologias === undefined || (tecnologias !== null && tecnologias.length > 200)) {
    return { error: "Las tecnologías deben ser texto de hasta 200 caracteres." };
  }

  if (imagenUrl === undefined || (imagenUrl !== null && imagenUrl.length > 300)) {
    return { error: "La URL de imagen debe ser texto de hasta 300 caracteres." };
  }

  if (estado !== "publicado" && estado !== "borrador") {
    return { error: "El estado debe ser 'publicado' o 'borrador'." };
  }

  return {
    datos: {
      nombre,
      descripcion,
      tecnologias,
      imagenUrl,
      estado
    }
  };
}

function validarId(value: string): number | null {
  const id = Number(value);
  return Number.isInteger(id) && id > 0 ? id : null;
}

function responderError(res: Response, error: unknown): void {
  console.error("Error en /api/proyectos:", error);
  res.status(500).json({ error: "Ocurrió un error interno al procesar los proyectos." });
}

router.get("/", async (_request: Request, response: Response) => {
  try {
    const pool = await getPool();
    const result = await pool.request().query("SELECT * FROM Proyectos ORDER BY FechaCreacion DESC, Id DESC");
    response.status(200).json(result.recordset.map(convertirProyecto));
  } catch (error) {
    responderError(response, error);
  }
});

router.get("/:id", async (request: Request, response: Response) => {
  const id = validarId(request.params.id);
  if (id === null) {
    response.status(400).json({ error: "El id debe ser un número entero positivo." });
    return;
  }

  try {
    const pool = await getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .query("SELECT * FROM Proyectos WHERE Id = @id");

    if (!result.recordset[0]) {
      response.status(404).json({ error: "No se encontró el proyecto solicitado." });
      return;
    }

    response.status(200).json(convertirProyecto(result.recordset[0]));
  } catch (error) {
    responderError(response, error);
  }
});

router.post("/", async (request: Request, response: Response) => {
  const validation = validarDatos(request.body);
  if (!validation.datos) {
    response.status(400).json({ error: validation.error });
    return;
  }

  try {
    const pool = await getPool();
    const result = await pool.request()
      .input("nombre", sql.NVarChar(100), validation.datos.nombre)
      .input("descripcion", sql.NVarChar(500), validation.datos.descripcion)
      .input("tecnologias", sql.NVarChar(200), validation.datos.tecnologias)
      .input("imagenUrl", sql.NVarChar(300), validation.datos.imagenUrl)
      .input("estado", sql.NVarChar(20), validation.datos.estado)
      .query(`
        INSERT INTO Proyectos (Nombre, Descripcion, Tecnologias, ImagenUrl, Estado)
        OUTPUT INSERTED.*
        VALUES (@nombre, @descripcion, @tecnologias, @imagenUrl, @estado)
      `);

    response.status(201).json(convertirProyecto(result.recordset[0]));
  } catch (error) {
    responderError(response, error);
  }
});

router.put("/:id", async (request: Request, response: Response) => {
  const id = validarId(request.params.id);
  if (id === null) {
    response.status(400).json({ error: "El id debe ser un número entero positivo." });
    return;
  }

  const validation = validarDatos(request.body);
  if (!validation.datos) {
    response.status(400).json({ error: validation.error });
    return;
  }

  try {
    const pool = await getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .input("nombre", sql.NVarChar(100), validation.datos.nombre)
      .input("descripcion", sql.NVarChar(500), validation.datos.descripcion)
      .input("tecnologias", sql.NVarChar(200), validation.datos.tecnologias)
      .input("imagenUrl", sql.NVarChar(300), validation.datos.imagenUrl)
      .input("estado", sql.NVarChar(20), validation.datos.estado)
      .query(`
        UPDATE Proyectos
        SET Nombre = @nombre,
            Descripcion = @descripcion,
            Tecnologias = @tecnologias,
            ImagenUrl = @imagenUrl,
            Estado = @estado
        OUTPUT INSERTED.*
        WHERE Id = @id
      `);

    if (!result.recordset[0]) {
      response.status(404).json({ error: "No se encontró el proyecto solicitado." });
      return;
    }

    response.status(200).json(convertirProyecto(result.recordset[0]));
  } catch (error) {
    responderError(response, error);
  }
});

router.delete("/:id", async (request: Request, response: Response) => {
  const id = validarId(request.params.id);
  if (id === null) {
    response.status(400).json({ error: "El id debe ser un número entero positivo." });
    return;
  }

  try {
    const pool = await getPool();
    const result = await pool.request()
      .input("id", sql.Int, id)
      .query("DELETE FROM Proyectos OUTPUT DELETED.Id WHERE Id = @id");

    if (!result.recordset[0]) {
      response.status(404).json({ error: "No se encontró el proyecto solicitado." });
      return;
    }

    response.status(200).json({ mensaje: "Proyecto eliminado.", id });
  } catch (error) {
    responderError(response, error);
  }
});

export default router;
