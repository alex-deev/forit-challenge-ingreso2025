export function Button(props: {
  children?: React.ReactNode;
  text: string;
  color?: "red" | "blue" | "green";
  type?: "submit" | "reset" | "button" | undefined;
  onCLick?: React.MouseEventHandler<HTMLButtonElement>;
}) {
  const { children, text, color, type, onCLick } = props;

  let className =
    "inline-flex items-center px-3 py-2 text-sm font-medium text-center rounded-lg text-white cursor-pointer ";
  switch (color) {
    case "green":
      className +=
        "focus:outline-none bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800";
      break;
    case "red":
      className +=
        "focus:outline-none bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900";
      break;
    case "blue":
    default:
      className +=
        "bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800";
      break;
  }

  return (
    <>
      <button
        type={type}
        className={className}
        onClick={onCLick}
      >
        {text}
        {children}
      </button>
    </>
  );
}
