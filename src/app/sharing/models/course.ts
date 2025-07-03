export interface Curso {
  _id: number;
  nombre: string;
  descripcion: string;
  fechaInicio: Date | null; // <== en lugar de string
  duracionSemanas: number;
  activo: boolean;
}
