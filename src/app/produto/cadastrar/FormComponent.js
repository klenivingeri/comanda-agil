import { useState } from "react";
import { InputComponent } from "../../../components/form/InputComponent";
import { InputFileComponent } from "../../../components/form/InputFileComponent";
import { TextareaComponent } from "../../../components/form/TextareaComponent";
import { SelectComponent } from "../../../components/form/SelectComponent";
import { Loading } from "../../../components/loading/Loading";
import { SideModal } from "../../../components/modal/SideModal";

const fetchCreateItem = async (formDetails) => {
  const [open, setOpen] = useState(false);
  const resp = await fetch(`/api/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formDetails),
  });
  const result = await resp.json();
};

export const FormComponent = ({ typeItems }) => {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({});

  const handleFormDetails = (id, value) => {
    console.log({ [id]: value });
    setFormDetails({ ...formDetails, [id]: value });
  };

  const handleSend = async () => {
    const allFilled = Object.values(formDetails).every((value) => {
      if (value.name) {
        return value.name && value.name !== "seleted";
      }
      return value && value !== "seleted";
    });

    if (allFilled) {
      setIsLoading(true);
      await fetchCreateItem(formDetails);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }
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
            className="text-white shadow-sm font-bold py-3 px-4 rounded-3xl w-full m-2 bg-[var(--button-default)] hover:bg-[var(--button-hover)]"
          >
            <span className="">Cadastrar Produto</span>
          </button>
        </div>
      </div>

      <button
        onClick={() => setOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Abrir Modal
      </button>

      <SideModal isOpen={open} onClose={() => setOpen(false)}>
        <h2 className="text-lg font-bold">Título do Modal</h2>
        <p className="mt-2 text-gray-600">Aqui vai o conteúdo do modal.</p>
        <button
          onClick={() => setOpen(false)}
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
        >
          Fechar
        </button>
      </SideModal>
    </div>
  );
};
