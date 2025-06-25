// Estructura de datos de una Tarea
export interface Task {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  createdAt: Date;
}

/**
 * Checkea si el objecto recibido por parámetro es una Task o no. Si lo es, devuelve el objecto tipado, de lo contrario devuelve undefined.
 */
export function toTask(obj: any): Task | undefined {
  // Verifica las popeidades id, title, description:
  if (
    !obj || // si no existe
    typeof obj.id === 'undefined' || // si no tiene id
    typeof obj.title !== 'string' || // si no tiene un titulo :string
    typeof obj.description !== 'string' // si no tiene una descrición :string
  ) {
    console.warn('toTask: el objeto no tiene las propiedades {id, title, description, ...}');
    return undefined;
  }

  // Verifica la propiedad createdAt: (manejar errores de formato)
  let createdAtDate: Date;
  createdAtDate = new Date(obj.createdAt);
  if (isNaN(createdAtDate.getTime())) {
    console.warn('toTask: el objeto no tiene un {createdAt...} válido');
    return undefined;
  }

  const verifiedTask: Task = {
    id: obj.id,
    title: obj.title,
    description: obj.description,
    completed: String(obj.completed).toLowerCase() === 'true',
    createdAt: createdAtDate
  } 
  return verifiedTask;
}

/**
 * Intenta convertir un arreglo de objetos en un arreglo tipado Task[]. Si no lo logra devuelve undefined.
 */
export function toArrayOfTask(objs: any[]): Task[] | undefined {
  if (!Array.isArray(objs)) {
    return undefined;
  }

  const tasks: Task[] = [];
  let unconsistand = false;
  objs.forEach((obj) => {
    const task = toTask(obj);
    if (task) tasks.push(task);
    else unconsistand = true;
  })

  if (unconsistand) {
    return undefined;
  }
  return tasks;
}