import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TaskList from "./pages/TaskList";
import TaskItem from "./pages/TaskItem";
import TaskForm from "./pages/TaskForm";
import NotFoundPage from "./pages/NotFoundPage";
import TasksContextProvider from "./contexts/TasksContext";

const router = createBrowserRouter([
  { path: "/", element: <TaskList /> },
  { path: "/item/:id", element: <TaskItem /> },
  { path: "/form", element: <TaskForm /> },
  { path: "/form/:id", element: <TaskForm /> },
  { path: "*", element: <NotFoundPage /> },
]);

function App() {

  return (
    <TasksContextProvider>
      <RouterProvider router={router} />
    </TasksContextProvider>
  );
}

export default App;
