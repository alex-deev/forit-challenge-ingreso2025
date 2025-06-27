import { Link } from "react-router-dom";
import { Button } from "../components/Button";

export default function NotFoundPage() {
  return (
    <>
      <h2 className="mb-6 text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
        Oops... Aquí no hay nada!
      </h2>
      <Link to={'/'}>
        <Button text="Ir a Inicio"/>
      </Link>
    </>
  );
}
