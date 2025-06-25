import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <>
      <h1>Aquí no hay nada!</h1>
      <Link to={'/'}>
        <button>Ir a Inicio</button>
      </Link>
    </>
  );
}
