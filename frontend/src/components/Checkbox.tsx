export default function Checkbox(props: {
  children?: React.ReactNode
  name?: string;
  required?: boolean;
  label: string;
  checked: boolean;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}) {
  const { children, name, required, label, checked, onChange } = props;

  return (
    <div className="flex items-center h-11 mt-6.75 ps-4 border rounded-lg border-gray-200 dark:border-gray-700">
      <input
        id={name}
        type="checkbox"
        checked={checked}
        name={name}
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        required={required}
        onChange={onChange}      
      />
      <label
        htmlFor={name}
        className="w-full ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
      >
        {label}{children}
      </label>
    </div>
  );
}
