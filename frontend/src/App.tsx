import { createBrowserRouter, RouterProvider } from "react-router-dom";
import TaskList from "./pages/TaskList";
import TaskItem from "./pages/TaskItem";
import TaskData from "./pages/TaskData";
import NotFoundPage from "./pages/NotFoundPage";
import TasksContextProvider from "./contexts/TasksContext";
import { Footer } from "./components/Footer";

const router = createBrowserRouter([
  { path: "/", element: <TaskList /> },
  { path: "/item/:id", element: <TaskItem /> },
  { path: "/form", element: <TaskData /> },
  { path: "/form/:id", element: <TaskData /> },
  { path: "*", element: <NotFoundPage /> },
]);

function App() {

  return (
    <TasksContextProvider>
      <RouterProvider router={router} />
      <Footer />
    </TasksContextProvider>
  );
}

export default App;
