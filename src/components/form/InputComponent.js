import { useState } from "react";

export const InputComponent = ({
  label = "Input",
  value,
  setValue = () => {},
  id,
  required = false,
}) => {
  const [error, setError] = useState("");

  const handleBlur = () => {
    if (required && !value.trim()) {
      setError(`O campo "${label}" é obrigatório`);
    } else {
      setError("");
    }
  };

  return (
    <div className="mb-5">
      <label
        htmlFor={id}
        className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="relative">
        <input
          onChange={(e) => setValue(id, e.target.value)}
          onBlur={handleBlur}
          type="text"
          id={id}
          className={`block w-full p-4 ps-10 text-sm text-gray-900 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-600"
            }
          `}
          placeholder={label}
          value={value}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};
