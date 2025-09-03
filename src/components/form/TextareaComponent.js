export const TextareaComponent = ({
  label = "Textarea",
  value,
  setValue = () => {},
  id,
}) => {
  return (
    <div className="mb-5">
      <label
        htmlFor={label}
        className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="relative">
        <textarea
          onChange={(e) => setValue(id, e.target.value)}
          type="text"
          id={label}
          className="block w-full p-4 ps-5 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={label}
          value={value}
          required
        />
      </div>
    </div>
  );
};
