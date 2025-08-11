import { Link } from "react-router-dom";
import { getDate } from "../utils/common";
import type { Task } from "../models/Task.model";
import CompleteBadge from "./CompleteBadge";
import { Button } from "./Button";

export default function TaskRow(props: { task: Task }) {
  const { id, title, description, completed, createdAt } = props.task;
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white max-w-50 overflow-hidden"
      >
        {title}
      </th>
      <td className="px-6 py-4">
        <p className="line-clamp-3 whitespace-pre break-words max-w-170">{description}</p>
      </td>
      <td className="px-6 py-4">
        <CompleteBadge isCompleted={completed} />
      </td>
      <td className="px-6 py-4">{getDate(createdAt)}</td>
      <td className="px-6 py-4 text-center">
        <Link
          className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
          to={`/item/${id}`}
        >
          <Button text="Ver más" />
        </Link>
      </td>
    </tr>
  );
}
