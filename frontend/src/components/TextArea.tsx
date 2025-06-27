export default function TextArea(props: {
  className?: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLTextAreaElement>;
  name?: string;
  required?: boolean;
  label: string;
  placeholder: string;
}) {
  const { className, value, onChange, name, required, label, placeholder } =
    props;

  return (
    <div className={className}>
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <textarea
        id={name}
        className="min-h-fit block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={onChange}
      ></textarea>
    </div>
  );
}
