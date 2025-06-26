import { Link, useNavigate } from "react-router-dom";
import type { Task } from "../models/Task.model";
import { getDate, getTime } from "../utils/dates";
import CompleteBadge from "./CompleteBadge";
import { Button } from "./Button";

export default function TaskContent(props: { task: Task }) {
  const { id, title, description, completed, createdAt } = props.task;
  const navigate = useNavigate();

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-10">
        <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
          {title}
        </h5>
        <CompleteBadge isCompleted={completed} />
      </div>
      <p className="mb-10 font-normal text-lg text-gray-900 dark:text-white">{description}</p>
      <div className="flex items-center justify-between">
        <Button text="Volver" onCLick={() => navigate('/')}/>
        <span className="text-gray-900 dark:text-gray-400 text-sm self-end">
          Creado el {getDate(createdAt)} a las {getTime(createdAt)}
        </span>
        <Link to={`/form/${id}`}>
          <Button text="Editar">
            <svg
              className="inline ms-2 w-6 h-6 text-gray-800 text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="currentColor"
              viewBox="0 0 27 27"
            >
              <path
                fillRule="evenodd"
                d="M11.32 6.176H5c-1.105 0-2 .949-2 2.118v10.588C3 20.052 3.895 21 5 21h11c1.105 0 2-.948 2-2.118v-7.75l-3.914 4.144A2.46 2.46 0 0 1 12.81 16l-2.681.568c-1.75.37-3.292-1.263-2.942-3.115l.536-2.839c.097-.512.335-.983.684-1.352l2.914-3.086Z"
                clipRule="evenodd"
              />
              <path
                fillRule="evenodd"
                d="M19.846 4.318a2.148 2.148 0 0 0-.437-.692 2.014 2.014 0 0 0-.654-.463 1.92 1.92 0 0 0-1.544 0 2.014 2.014 0 0 0-.654.463l-.546.578 2.852 3.02.546-.579a2.14 2.14 0 0 0 .437-.692 2.244 2.244 0 0 0 0-1.635ZM17.45 8.721 14.597 5.7 9.82 10.76a.54.54 0 0 0-.137.27l-.536 2.84c-.07.37.239.696.588.622l2.682-.567a.492.492 0 0 0 .255-.145l4.778-5.06Z"
                clipRule="evenodd"
              />
            </svg>
          </Button>
        </Link>
      </div>
    </div>
  );
}
