import DatabaseConstructor, { Database } from 'better-sqlite3';
import { Task } from '../models/Task.model';

const dbLocation = './src/database/database.db';

// Si el archivo no existe, lo creará automáticamente
const db: Database = new DatabaseConstructor(dbLocation);
db.pragma('journal_mode = WAL');

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

export function insertTask(task: Task) {
  const sql = `
    INSERT INTO tasks (title, description, completed, created_at)
    VALUES (@title, @description, @completed, @createdAt);
  `;
  const plainTask = flattenTask(task);
  db.prepare(sql).run(plainTask);
}

export function updateTask(task: Task) {
  const sql = `
    UPDATE tasks SET 
      title = @title,
      description = @description,
      completed = @completed,
      created_at = @createdAt 
    WHERE id = @targetId;
  `;
  const plainTask = flattenTask(task);
  const targetId = task.id;
  db.prepare(sql).run({...plainTask, targetId});
}

export function deleteTask(id: string) {
  const sql = `
  DELETE FROM tasks
  WHERE id=?
  `;
  db.prepare(sql).run(id);
}

export function getTask(id: string) {
  const sql = `
    SELECT * FROM tasks
    WHERE id=?
  `;
  const res = db.prepare(sql).get(id);
  return res as Task;
}

export function getTasks() {
  const sql = `
    SELECT id, title, description, completed, created_at as createdAt FROM tasks
  `;
  const rows = db.prepare(sql).all();
  return rows as Task[];
}


function flattenTask(task: Task) {
  const { title, description, completed, createdAt } = task;
  return {
    title,
    description,
    completed: String(completed),
    createdAt: String(createdAt),
  };
}