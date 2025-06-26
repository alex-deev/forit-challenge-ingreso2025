import { Link } from "react-router-dom";
import { getDnT } from "../utils/dates";
import type { Task } from "../models/Task.model";
import CompleteBadge from "./CompleteBadge";
import { Button } from "./Button";

export default function TaskRow(props: { task: Task }) {
  const { id, title, description, completed, createdAt } = props.task;
  return (
    <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-gray-600">
      <th
        scope="row"
        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
      >
        {title}
      </th>
      <td className="px-6 py-4">{description}</td>
      <td className="px-6 py-4">
        <CompleteBadge isCompleted={completed} />
      </td>
      <td className="px-6 py-4">{getDnT(createdAt)}</td>
      <td className="px-6 py-4 text-right">
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
