import { useState } from "react";

export const SelectComponent = ({
  label,
  value = "seleted",
  setValue = () => {},
  id,
  required = false,
  options = [],
}) => {
  const [error, setError] = useState("");

  const handleBlur = () => {
    if (required && (value === "seleted" || !value)) {
      setError(`O campo "${label}" é obrigatório`);
    } else {
      setError("");
    }
  };

  return (
    <div className="mb-6">
      <label
        htmlFor={id}
        className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <select
        value={value}
        onChange={(e) => setValue(id, e.target.value)}
        onBlur={handleBlur}
        id={id}
        className={`block w-full pl-5 py-3 text-base text-gray-900 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-600"
          }`}
      >
        {" "}
        <option value="seleted">Selecione a categoria</option>
        {options.map((op) => (
          <option key={op.type} value={op.type}>
            {op.name}
          </option>
        ))}
      </select>
      {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
    </div>
  );
};
