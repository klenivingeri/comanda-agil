import { useState } from "react";
import { InputComponent } from "../../../components/form/InputComponent";
import { InputFileComponent } from "../../../components/form/InputFileComponent";
import { TextareaComponent } from "../../../components/form/TextareaComponent";
import { SelectComponent } from "../../../components/form/SelectComponent";

export const FormComponent = () => {
  const [formDetails, setFormDetails] = useState({});
  const [send, setSend] = useState({});

  const handleFormDetails = (id, value) => {
    setFormDetails({ ...formDetails, [id]: value });
  };

  const handleSend = () => {
    console.log(formDetails);
    const allFilled = Object.values(formDetails).every(
      (value) => value && value !== "seleted"
    );

    if (allFilled) {
      console.log("✅ Todos os campos preenchidos");
    } else {
      console.log("❌ Existem campos vazios");
    }
  };

  return (
    <form className=" w-full max-w-[500px] mx-auto p-3">
      <InputFileComponent id="file" setValue={handleFormDetails} />
      <InputComponent
        id="codigo"
        value={formDetails?.codigo || ""}
        setValue={handleFormDetails}
        label="Código do produto"
        required
      />
      <InputComponent
        id="name"
        value={formDetails?.name || ""}
        setValue={handleFormDetails}
        label="Nome do produto"
        send={send}
        required
      />
      <InputComponent
        id="price"
        value={formDetails?.price || ""}
        setValue={handleFormDetails}
        isCurrency
        label="Preço do produto"
        send={send}
        required
      />
      <TextareaComponent
        id="description"
        value={formDetails?.description || ""}
        setValue={handleFormDetails}
        label="Descrição do produto"
        send={send}
      />
      <SelectComponent
        id="category"
        value={formDetails?.category}
        setValue={handleFormDetails}
        label="Categoria do produto"
        required
      />

      <div className="flex justify-center items-center w-full">
        <div className="relative w-full flex justify-center items-center">
          <button
            onClick={handleSend}
            className="text-white shadow-sm font-bold py-3 px-4 rounded-3xl w-full m-2 bg-[var(--button)] hover:bg-[var(--buttonHover)]"
          >
            <span className="">Cadastrar Produto</span>
          </button>
        </div>
      </div>
    </form>
  );
};
