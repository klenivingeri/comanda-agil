import { useState, useRef } from "react";

import { IconImageEmpty } from "../../../public/icons/ImageEmpty";

const InputFileComponent = ({ label = "InputFile" }) => {
  const [preview, setPreview] = useState(null);
  const [saveFile, setSaveFile] = useState(null);
  const contentRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSaveFile(saveFile);
      const imageUrl = URL.createObjectURL(file);
      setPreview(imageUrl);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mb-5 h-40 ">
      <input
        type="file"
        id={label}
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
        ref={contentRef}
      />

      {preview ? (
        <div
          onClick={() => {
            contentRef.current?.click();
          }}
          className={`w-full h-40 bg-cover bg-top rounded-t-2xl`}
          style={{ backgroundImage: `url(${preview})` }}
        ></div>
      ) : (
        <label
          htmlFor={label}
          className="flex items-center justify-center w-20 h-20 border-2 border-gray-400 p-4 rounded-2xl cursor-pointer transition overflow-hidden"
        >
          <IconImageEmpty className="w-8 h-8 text-gray-400" />
        </label>
      )}
    </div>
  );
};

const InputComponent = ({ label = "Input", value = "" }) => {
  const [valor, setValor] = useState(value);
  return (
    <>
      <label
        htmlFor={label}
        className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="relative">
        <input
          onChange={(e) => setValor(e.target.value)}
          type="text"
          id={label}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={label}
          value={valor}
          required
        />
      </div>
    </>
  );
};

const TextareaComponent = ({ label = "Textarea", value = "" }) => {
  const [valor, setValor] = useState(value);
  return (
    <>
      <label
        htmlFor={label}
        className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        {label}
      </label>
      <div className="relative">
        <textarea
          onChange={(e) => setValor(e.target.value)}
          type="text"
          id={label}
          className="block w-full p-4 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
          placeholder={label}
          value={valor}
          required
        />
      </div>
    </>
  );
};

const SelectComponent = ({ seleted = "seleted" }) => {
  const [valor, setValor] = useState(seleted);
  return (
    <div className="mb-6">
      <label
        htmlFor="large"
        className="mb-2 text-sm font-medium text-gray-900 dark:text-white"
      >
        Categoria do produto
      </label>
      <select
        value={valor}
        onChange={(e) => setValor(e.target.value)}
        id="large"
        className="block w-full pl-8 py-3 text-base text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      >
        <option value="seleted">Selecione a categoria</option>
        <option value="US">United States</option>
        <option value="CA">Canada</option>
        <option value="FR">France</option>
        <option value="DE">Germany</option>
      </select>
    </div>
  );
};

export const FormComponent = () => {
  return (
    <form className=" w-full max-w-[500px] mx-auto p-3">
      <InputFileComponent />
      <InputComponent label="Código do produto" />
      <InputComponent label="Nome do produto" />
      <InputComponent label="Preço do produto" />
      <TextareaComponent label="Descrição do produto" />
      <SelectComponent />

      <div className="flex justify-center items-center w-full">
        <div className="relative w-full flex justify-center items-center">
          <button className="text-white shadow-sm font-bold py-3 px-4 rounded-3xl w-full m-2 bg-[var(--button)] hover:bg-[var(--buttonHover)]">
            <span className="">Cadastrar Produto</span>
          </button>
        </div>
      </div>
    </form>
  );
};
