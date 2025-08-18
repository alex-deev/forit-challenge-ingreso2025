import DatabaseConstructor, { Database } from 'better-sqlite3';
import { Task } from '../models/Task.model';

const DB_LOCATION = './database.db';
console.log(`express: server is setting up SQLite database in path '${DB_LOCATION}'`);

// Si el archivo no existe, lo creará automáticamente
const db: Database = new DatabaseConstructor(DB_LOCATION);
db.pragma('journal_mode = WAL');

/** Crea la tabla para almacenar los registros de tareas */
export function createTasksTable() {
  const sql = `
    CREATE TABLE IF NOT EXISTS tasks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      description TEXT NOT NULL,
      completed BOOLEAN NOT NULL,
      created_at DATETIME NOT NULL
    )
  `;
  db.prepare(sql).run();
}

/** Inserta una tarea en la tabla de tareas */
export function insertTask(task: Task) {
  const sql = `
    INSERT INTO tasks (title, description, completed, created_at)
    VALUES (@title, @description, @completed, @createdAt);
  `;
  const plainTask = flattenTask(task);
  db.prepare(sql).run(plainTask);
}

/** Actualiza una tarea dentro de la tabla de tareas */
export function updateTask(task: Task) {
  const sql = `
    UPDATE tasks SET 
      title = @title,
      description = @description,
      completed = @completed
    WHERE id = @targetId;
  `;
  const plainTask = flattenTask(task);
  const targetId = task.id;
  db.prepare(sql).run({...plainTask, targetId});
}

/** Elimina una tarea específica de la tabla de tareas */
export function deleteTask(id: string) {
  const sql = `
  DELETE FROM tasks
  WHERE id=?
  `;
  db.prepare(sql).run(id);
}

/** Obtiene una tarea específica de la tabla de tareas */
export function getTask(id: string) {
  const sql = `
    SELECT * FROM tasks
    WHERE id=?
  `;
  const res = db.prepare(sql).get(id);
  return res as Task;
}

/** Obtiene todas las tareas de la tabla de tareas */
export function getTasks() {
  const sql = `
    SELECT id, title, description, completed, created_at as createdAt FROM tasks
  `;
  const rows = db.prepare(sql).all();
  return rows as Task[];
}

/** Devuelve un objeto simplificado a parit de una tarea. Asegura que todos sus campos sean de tipo string (necesario para SQLite) */
function flattenTask(task: Task) {
  const { title, description, completed, createdAt } = task;
  return {
    title,
    description,
    completed: String(completed),
    createdAt: String(createdAt),
  };
}