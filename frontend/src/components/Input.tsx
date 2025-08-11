export default function Input(props: {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  name?: string;
  required?: boolean;
  label: string;
  placeholder: string;
  maxLength?: number;
}) {
  const { className, value, onChange, name, required, label, placeholder, maxLength } =
    props;

  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <input
        type="text"
        name={name}
        id={name}
        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
        maxLength={maxLength}
      />
    </div>
  );
}
