// Estructura de datos de una Tarea
export interface Task {
    id: string;
    title: string;
    description: string;
    completed: boolean;
    createdAt: Date;
}