export interface Estudiante {
  id: number;
  nombre: string;
  email: string;
  fechaNacimiento: string;
  cursosInscritos?: number[]; // IDs de cursos, si quieres relacionar
}