import { useState } from "react";
import { InputComponent } from "../../../components/form/InputComponent";
import { InputFileComponent } from "../../../components/form/InputFileComponent";
import { TextareaComponent } from "../../../components/form/TextareaComponent";
import { SelectComponent } from "../../../components/form/SelectComponent";
import { Loading } from "../../../components/loading/Loading";
import { Button } from "../../../components/button/Button";

const fetchCreateItem = async (formDetails) => {
  const resp = await fetch(`/api/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formDetails),
  });
  const result = await resp.json();
};

export const FormComponent = ({ typeItems }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [formDetails, setFormDetails] = useState({});

  const handleFormDetails = (id, value) => {
    setFormDetails({ ...formDetails, [id]: value });
  };

  const handleSend = async () => {
    const allFilled = Object.values(formDetails).every((value) => {
      if (value.name) {
        return value.name && value.name !== "seleted";
      }
      return value && value !== "seleted";
    });

    if (!allFilled) {
      setIsLoading(true);
      await fetchCreateItem(formDetails);
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }

  return (
    <div className="w-full max-w-[500px] mx-auto">
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
          <Button onClick={handleSend} text="Cadastrar Produto" />
        </div>
      </div>
    </div>
  );
};
