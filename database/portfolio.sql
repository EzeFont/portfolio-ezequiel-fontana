IF DB_ID(N'portfolio') IS NULL
BEGIN
    CREATE DATABASE portfolio;
END;
GO

USE portfolio;
GO

IF OBJECT_ID(N'dbo.Proyectos', N'U') IS NULL
BEGIN
    CREATE TABLE dbo.Proyectos (
        Id INT IDENTITY(1,1) PRIMARY KEY,
        Nombre NVARCHAR(100) NOT NULL,
        Descripcion NVARCHAR(500) NOT NULL,
        Tecnologias NVARCHAR(200) NULL,
        ImagenUrl NVARCHAR(300) NULL,
        Estado NVARCHAR(20) NOT NULL
            CONSTRAINT CK_Proyectos_Estado CHECK (Estado IN (N'publicado', N'borrador')),
        FechaCreacion DATETIME NOT NULL
            CONSTRAINT DF_Proyectos_FechaCreacion DEFAULT GETDATE()
    );
END;
GO

IF NOT EXISTS (SELECT 1 FROM dbo.Proyectos WHERE Nombre = N'Registro de balanza para yerbatera')
BEGIN
    INSERT INTO dbo.Proyectos (Nombre, Descripcion, Tecnologias, ImagenUrl, Estado)
    VALUES (
        N'Registro de balanza para yerbatera',
        N'Sistema que registra el pesaje de camiones de productores de yerba mate: fecha, número de cupón, productor, peso bruto, tara, descuento por palo o condición de la yerba, peso neto y remito. Imprime el cupón en dos copias: una para el proveedor y otra para la yerbatera.',
        N'Java, SQL Server',
        N'img/proyecto-yerbatera.png',
        N'publicado'
    );
END;
GO

IF NOT EXISTS (SELECT 1 FROM dbo.Proyectos WHERE Nombre = N'VitalHome')
BEGIN
    INSERT INTO dbo.Proyectos (Nombre, Descripcion, Tecnologias, ImagenUrl, Estado)
    VALUES (
        N'VitalHome',
        N'App móvil de domótica para el cuidado de adultos mayores, con inicio de sesión como adulto mayor o como cuidador/familiar. El adulto mayor puede usar el botón SOS, recibir alertas de caída, fuego, pulso y apertura de puerta, y consultar recordatorios de medicamentos. El cuidador asigna medicamentos y recibe notificaciones de caídas y horarios de medicación.',
        N'Java, Firebase, Android',
        N'img/proyecto-vitalhome.png',
        N'publicado'
    );
END;
GO
