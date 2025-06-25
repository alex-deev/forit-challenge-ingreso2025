export default function CompleteBadge(props: { isCompleted: boolean }) {
  const { isCompleted } = props;
  const className = `${
    isCompleted
      ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
  } text-sm font-medium px-2.5 py-0.5 rounded-sm`;

  return (
    <span className={className}>
      { isCompleted ? 'Completada' : 'Pendiente' }
    </span>
  );
}
