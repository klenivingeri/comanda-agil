import { currency } from "../../app/utils/currency";
import { useState } from "react";

export const InputComponent = ({
  label = "Input",
  value,
  setValue = () => {},
  id,
  required = false,
  isCurrency = false,
}) => {
  const [error, setError] = useState("");

  const handleBlur = () => {
    if (required && !String(value).trim()) {
      setError(`O campo "${label}" é obrigatório`);
    } else {
      setError("");
    }
  };

  const handleSetValue = (id, value) => {
    if (isCurrency) {
      const onlyNumbers = value.replace(/\D/g, "");
      const numericValue = Number(onlyNumbers) / 100;

      setValue(id, numericValue);
    } else {
      setValue(id, value);
    }
  };

  const displayValue = isCurrency ? currency(value) : value;

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
          onChange={(e) => handleSetValue(id, e.target.value)}
          onBlur={handleBlur}
          type={isCurrency ? "tel" : "text"}
          id={id}
          className={`block w-full p-3 ps-5 text-sm text-gray-900 border rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
            ${
              error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-600"
            }
          `}
          placeholder={label}
          value={displayValue}
        />
        {error && <p className="mt-1 text-sm text-red-500">{error}</p>}
      </div>
    </div>
  );
};
