# Portfolio personal — Ezequiel Fontana

Portfolio web con frontend en HTML, CSS y JavaScript, y backend en Node.js, Express y TypeScript. Los proyectos se guardan en Microsoft SQL Server.

## Requisitos

- Node.js 20 o superior y npm.
- SQL Server instalado y en ejecución. SSMS 22 se usa para administrar el servidor y ejecutar el script.
- Una instancia local, por ejemplo `localhost\SQLEXPRESS`.

## Instalación y base de datos

1. Instalá las dependencias desde la carpeta del proyecto:

   ```powershell
   npm.cmd install
   ```

2. Abrí SQL Server Management Studio, conectate a tu instancia y abrí `database\portfolio.sql`.
3. Ejecutá el script. Crea la base `portfolio` si no existe, crea `dbo.Proyectos` y agrega dos proyectos de ejemplo. Si se ejecuta más de una vez, no duplica la tabla ni esos ejemplos.

La tabla tiene los campos `Id`, `Nombre`, `Descripcion`, `Tecnologias`, `ImagenUrl`, `Estado` y `FechaCreacion`. El `CHECK` de SQL Server solo acepta los estados `publicado` y `borrador`.

## Configuración de la conexión

Copiá el archivo de ejemplo y editá los valores locales:

```powershell
Copy-Item .env.example .env
```

La configuración inicial usa autenticación de SQL Server con usuario y contraseña. Como la opción de autenticación no quedó especificada, este README asume ese modo; reemplazá `DB_USER` y `DB_PASSWORD` por las credenciales creadas en tu instancia. No guardes el archivo `.env` en Git: ya está incluido en `.gitignore`.

Variables disponibles:

| Variable | Uso |
|---|---|
| `DB_SERVER` | Servidor o instancia, por ejemplo `localhost\SQLEXPRESS`. |
| `DB_NAME` | Nombre de la base; en este proyecto es `portfolio`. |
| `DB_USER` / `DB_PASSWORD` | Credenciales de autenticación de SQL Server. |
| `DB_PORT` | Puerto TCP; normalmente `1433`. En una instancia nombrada, SQL Server Browser puede resolver el puerto asignado a `SQLEXPRESS`. |
| `DB_ENCRYPT` | Habilita cifrado. |
| `DB_TRUST_SERVER_CERTIFICATE` | Para desarrollo local con certificado propio, puede ser `true`. |
| `PORT` | Puerto HTTP del backend; por defecto `3000`. |
| `CORS_ORIGIN` | Origen permitido por CORS; `*` facilita el uso local. En producción, restringilo al dominio del frontend. |

Si tu instancia usa un puerto TCP fijo, configurá `DB_SERVER` con el nombre del host (sin `\instancia`) y `DB_PORT` con ese puerto. No uses credenciales reales en `.env.example`.

## Ejecutar frontend y backend

El backend también sirve los archivos del frontend, por lo que ambos se ejecutan juntos:

```powershell
npm.cmd run dev
```

Abrí `http://localhost:3000`. Para compilar y ejecutar la versión compilada:

```powershell
npm.cmd run build
npm.cmd start
```

La conexión a SQL Server se establece al iniciar. El pool de `mssql` se reutiliza para las consultas y los cambios se guardan en la base de datos, por lo que persisten al reiniciar el servidor.

## API de proyectos

Todas las rutas usan el prefijo `/api/proyectos`:

| Método | Ruta | Acción |
|---|---|---|
| `GET` | `/api/proyectos` | Lista los proyectos. |
| `GET` | `/api/proyectos/:id` | Devuelve un proyecto. |
| `POST` | `/api/proyectos` | Crea y devuelve el proyecto (`201`). |
| `PUT` | `/api/proyectos/:id` | Actualiza un proyecto. |
| `DELETE` | `/api/proyectos/:id` | Elimina un proyecto. |

Los datos requeridos al crear o actualizar son `nombre`, `descripcion` y `estado`. `tecnologias` e `imagenUrl` pueden ser texto o `null`; el estado solo admite `publicado` o `borrador`. Las consultas parametrizan sus valores con tipos de `mssql`.

La sección de proyectos obtiene los datos desde la API y muestra los publicados. El botón **Administrar proyectos** permite crear, editar y eliminar desde el frontend, sin reemplazar el diseño de las tarjetas. El CRUD no implementa autenticación ni autorización: sirve para el trabajo local de la facultad y no debe exponerse públicamente sin protegerlo.

El sitio publicado en GitHub Pages continúa siendo una versión estática y no tendrá acceso a SQL Server. Para probar la carga y administración de proyectos, iniciá este backend y abrí `http://localhost:3000`.

## Diagnóstico de conexión

Si el servidor no logra conectarse:

1. Confirmá que el servicio de SQL Server correspondiente a la instancia esté iniciado y que `DB_SERVER` coincida con el nombre del servidor/instancia.
2. En **SQL Server Configuration Manager**, habilitá **TCP/IP** para la instancia y reiniciá el servicio de SQL Server después del cambio.
3. Para `localhost\SQLEXPRESS`, verificá que **SQL Server Browser** esté iniciado si la instancia usa un puerto dinámico. Como alternativa, asigná un puerto TCP fijo y usá ese puerto en `DB_PORT`.
4. Si usás usuario y contraseña de SQL Server, habilitá el **modo de autenticación mixto** (SQL Server y Windows) en las propiedades de seguridad del servidor y reinicialo. Verificá también que el usuario esté habilitado y tenga acceso a `portfolio`.
5. Si configuraste el puerto fijo habitual, confirmá que sea `1433` y que el firewall permita la conexión local.
6. Para desarrollo local con certificado no confiable, revisá `DB_TRUST_SERVER_CERTIFICATE=true`. No uses esa opción como sustituto de una configuración TLS segura en producción.
7. Comprobá que la base y la tabla existan ejecutando `database\portfolio.sql` en SSMS, y revisá el mensaje de error del backend y los valores del `.env`.

## Tecnologías

- Frontend: HTML, CSS y JavaScript.
- Backend: Node.js, Express y TypeScript.
- Base de datos: Microsoft SQL Server.
- Conector: paquete `mssql`.

## Sitio publicado

Versión estática anterior: <https://ezefont.github.io/portfolio-ezequiel-fontana/>.
