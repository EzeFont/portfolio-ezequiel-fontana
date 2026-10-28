export type EstadoProyecto = "publicado" | "borrador";

export interface Proyecto {
  id: number;
  nombre: string;
  descripcion: string;
  tecnologias: string | null;
  imagenUrl: string | null;
  estado: EstadoProyecto;
  fechaCreacion: Date;
}

export type DatosProyecto = Pick<
  Proyecto,
  "nombre" | "descripcion" | "tecnologias" | "imagenUrl" | "estado"
>;
