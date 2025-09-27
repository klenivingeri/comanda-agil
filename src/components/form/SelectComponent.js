import { useState } from "react";

export const SelectComponent = ({
  label,
  value = "seleted",
  setValue = () => {},
  id,
  required = false,
  options = [],
  itemDefault = "Selecione a categoria",
}) => {
  const [error, setError] = useState("");
  const [isFocus, setIsFocus] = useState(false);

  const handleBlur = () => {
    setIsFocus(false);
    if (required && (value === "seleted" || !value)) {
      setError(`O campo "${label}" é obrigatório`);
    } else {
      setError("");
    }
  };

  const handleFocus = () => {
    setIsFocus(true);
  };

  const handleSetValue = (id, value) => {
    const obj = options.find((op) => op.type === value);
    setValue(id, obj);
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
        value={value.type}
        onChange={(e) => handleSetValue(id, e.target.value)}
        onBlur={handleBlur}
        onFocus={handleFocus}
        placeholder={itemDefault.name}
        id={id}
        className={`block w-full pl-5 py-3 text-base text-gray-900 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
          ${
            error
              ? "border-red-500 focus:border-red-500 focus:ring-red-500"
              : "border-gray-300 dark:border-gray-600"
          }`}
      >
        {!isFocus && (
          <option value={itemDefault.type}>{itemDefault.name}</option>
        )}
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
