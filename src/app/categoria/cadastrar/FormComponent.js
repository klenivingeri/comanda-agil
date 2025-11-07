import { useState, useEffect } from "react";
import { Form, Input } from "../../../components/form/FormComponents";
import { useToast } from "../../../hooks/useToast";
import { ToggleSwitch } from "src/components/ToggleSwitch";

export const FormComponent = ({ category }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [name, setName] = useState(category?.name || "");
  const [enable, setEnable] = useState(true);
  const toast = useToast();

  useEffect(() => {
    if (category?.name) {
      setName(category.name);
      setEnable(category.enable);
    }
    console.log(category)
  }, [category]);

  const fetchCreateIUpdatetem = async (formDetails) => {
    setIsLoading(true);
    try {
      const resp = await fetch(`/api/category`, {
        method: formDetails?._id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDetails),
      });
      const result = await resp.json();

      toast.success("Categoria cadastrada com sucesso!");
    } catch (error) {
      toast.error("Ocorreu um erro ao cadastrar a categoria.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!name) {
      setIsValid(true);
      return;
    }
    setIsValid(false);

    fetchCreateIUpdatetem({ _id: category?._id, name, enable });
    if(!category?._id){setName("");}
    
  };

  return (
    <div className="w-full max-w-[500px] mx-auto text-gray-700">
      <Form method="POST" create={handleSend} isLoading={isLoading}>
        <Input
          name="Nome da categoria"
          id="category"
          setValue={setName}
          placeholder="Nome da categoria"
          isValid={isValid}
          error={name.trim() === ""}
          value={name}
        />
        <div className=" flex">
          <ToggleSwitch initialChecked={enable} onChange={setEnable} />{" "}
          <p className="ml-4">
            Categoria {enable ? "habilitada" : "desabilitada"}
          </p>
        </div>
      </Form>
    </div>
  );
};
