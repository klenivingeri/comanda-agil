import { useState } from "react";
import { InputComponent } from "../../../components/form/InputComponent";
import { InputFileComponent } from "../../../components/form/InputFileComponent";
import { TextareaComponent } from "../../../components/form/TextareaComponent";
import { SelectComponent } from "../../../components/form/SelectComponent";

const fetchData = async (formDetails) => {
  const resp = await fetch(`/api/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formDetails),
  });
  const result = await resp.json();

  console.log(result);
};

export const FormComponent = ({ typeItems }) => {
  const [formDetails, setFormDetails] = useState({});

  const handleFormDetails = (id, value) => {
    console.log({ [id]: value });
    setFormDetails({ ...formDetails, [id]: value });
  };

  const handleSend = () => {
    const allFilled = Object.values(formDetails).every((value) => {
      if (value.name) {
        return value.name && value.name !== "seleted";
      }
      return value && value !== "seleted";
    });

    if (allFilled) {
      fetchData(formDetails);
    } else {
      console.log("❌ Existem campos vazios");
    }
  };

  return (
    <div className=" w-full max-w-[500px] mx-auto px-3">
      <InputFileComponent id="file" setValue={handleFormDetails} />
      <InputComponent
        id="code"
        value={formDetails?.code || ""}
        setValue={handleFormDetails}
        label="Código do produto"
        required
      />
      <InputComponent
        id="name"
        value={formDetails?.name || ""}
        setValue={handleFormDetails}
        label="Nome do produto"
        required
      />
      <InputComponent
        id="price"
        value={formDetails?.price || ""}
        setValue={handleFormDetails}
        isCurrency
        label="Preço do produto"
        required
      />
      <TextareaComponent
        id="description"
        value={formDetails?.description || ""}
        setValue={handleFormDetails}
        label="Descrição do produto"
      />
      <SelectComponent
        id="category"
        value={formDetails?.category}
        setValue={handleFormDetails}
        label="Categoria do produto"
        required
        options={typeItems}
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
    </div>
  );
};
