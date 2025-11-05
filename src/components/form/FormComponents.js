import React, { useEffect, useState, useRef } from "react";
import { ButtonContainer } from "../button";
import { Loading } from "../loading/Loading";
import { currency } from "../../app/utils/currency";

export const Input = ({
  name,
  id,
  setValue,
  placeholder,
  value,
  error,
  isValid = false,
  isCurrency = false,
  type = "text",
  onFocus = () => {},
  autoFocus = false
}) => {

  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && autoFocus) {
      inputRef.current.focus();
    }
  }, []);

  const handleSetValue = (_value) => {
    if (isCurrency) {
      const onlyNumbers = _value.replace(/\D/g, "");
      const numericValue = Number(onlyNumbers) / 100;

      setValue(numericValue);
    } else {
      setValue(_value);
    }
  };

  const displayValue = isCurrency ? currency(value) : value;

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium ">
        {name}
      </label>
      <input
        onChange={(e) => handleSetValue(e.target.value)}
        id={id}
        ref={inputRef}
        value={displayValue}
        name={id}
        onFocus={onFocus}
        type={type}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        spellcheck="false"
        className={`w-full pl-5 pr-10 py-2 h-12 ring-1 ring-[var(--button-default)] rounded-lg focus:ring-2 focus:ring-[var(--button-default)] focus:border-[var(--button-focus)] outline-none bg-[var(--input-default)] text-black
            ${
              isValid && error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-600"
            }
          `}
        placeholder={placeholder}
      />
      {isValid && error && (
        <p className="mt-1 text-sm text-red-500">{`O campo "${placeholder}" é obrigatório`}</p>
      )}
    </div>
  );
};

export const InputImagem = ({ name, id, images, setImage, placeholder }) => {
  const [img, setImg] = useState("");

  const handleSaveImagem = () => {
    if (img.trim() === "") return;
    const updatedImages = images;
    updatedImages.push(img);
    setImage(updatedImages);
    setImg("");
  };

  const handleDeleteImage = (url) => {
    const newArray = images.filter((image, i) => image !== url);
    setImage(newArray);
  };

  return (
    <div>
      {!!images.length && (
        <div className="border rounded-sm p-1 flex-wrap flex flex-row gap-2">
          {images.map((url, i) => (
            <div
              key={i}
              className="shadow-sm "
              onClick={() => handleDeleteImage(url)}
            >
              <BgImage image={url} size={"w-16 h-16"} showIcon />
            </div>
          ))}
        </div>
      )}
      <label htmlFor={id} className="block text-sm font-medium text-gray-700">
        {name}
      </label>
      <div className="flex flex-row items-center gap-2">
        <input
          onChange={(e) => setImg(e.target.value)}
          value={img || ""}
          type="text"
          id={id}
          name={id}
          className="mt-1 block w-full border pl-1 h-[35px] rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
          placeholder={placeholder}
        />
        {images.length <= 2 && (
          <a
            onClick={handleSaveImagem}
            className="bg-blue-600 h-[35px] flex items-center mt-1 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            save
          </a>
        )}
      </div>
    </div>
  );
};

export const Textarea = ({
  name,
  id,
  setValue,
  placeholder,
  value,
  isValid,
  error,
}) => {
  return (
    <div>
      <label
        htmlFor="message"
        className="block text-sm font-medium text-gray-700"
      >
        {name}
      </label>
      <textarea
        onChange={(e) => setValue(e.target.value)}
        id={id}
        name={id}
        value={value}
        rows="4"
        className="w-full  pl-5 pr-10 py-2 h-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[var(--button-default)] focus:border-[var(--button-focus)] outline-none bg-[var(--input-default)] text-black"
        placeholder={placeholder}
      ></textarea>
      {isValid && error && (
        <p className="mt-1 text-sm text-red-500">{`O campo "${placeholder}" é obrigatório`}</p>
      )}
    </div>
  );
};

export const Select = ({
  name,
  setValue,
  value,
  options,
  isValid,
  error,
  placeholder,
}) => {
  return (
    <div className="">
      <label
        htmlFor="message"
        className="block text-sm font-medium text-gray-700"
      >
        {name}
        <div className="flex flex-row items-center gap-2 ">
          <select
            onChange={(e) => setValue(e.target.value)}
            value={value}
            className="w-full pl-5 pr-10 py-2 h-12 ring-1 ring-[var(--button-default)] rounded-lg focus:ring-2 focus:ring-[var(--button-default)] focus:border-[var(--button-focus)] outline-none bg-[var(--input-default)] text-black"
          >
            {placeholder && <option value="">{placeholder}</option>}
            {options.map((op, i) => (
              <option key={i} value={op._id}>
                {op.name}
              </option>
            ))}
          </select>
        </div>
      </label>
      {isValid && error && (
        <p className="mt-1 text-sm text-red-500">{`O campo "${name}" é obrigatório`}</p>
      )}
    </div>
  );
};

export const Form = ({ children, create, isLoading }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    create();
  };
  return (
    <form
      method="POST"
      className="max-w-md mx-auto p-6 bg-white shadow-md rounded-lg space-y-4"
    >
      {children}
      <ButtonContainer onClick={handleSubmit}>
        {!isLoading ? (
          "Cadastrar Categoria"
        ) : (
          <Loading
            isLoading={isLoading}
            style="style5"
            color="white"
            size="10"
            speed="0.4"
          />
        )}
      </ButtonContainer>
    </form>
  );
};
