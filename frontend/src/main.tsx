import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import TaskList from './pages/TaskList.tsx'
import TaskItem from './pages/TaskItem.tsx'
import TaskForm from './pages/TaskForm.tsx'
import NotFoundPage from './pages/NotFoundPage.tsx'

const router = createBrowserRouter([
  { path: '/', element: <App /> },
  { path: '/list', element: <TaskList /> },
  { path: '/item/:id', element: <TaskItem /> },
  { path: '/form', element: <TaskForm /> },
  { path: '/form/:id', element: <TaskForm /> },
  { path: '*', element: <NotFoundPage /> }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
