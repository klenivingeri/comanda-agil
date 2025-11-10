import { useState, useEffect } from "react";
import { Form, Input } from "../../../components/form/FormComponents";
import { useToast } from "../../../hooks/useToast";
import { ToggleSwitch } from "src/components/ToggleSwitch";
import { IconCategory } from "public/icons/Category";

export const FormComponent = ({ category, title }) => {
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
    if (!category?._id) {
      setName("");
    }
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
          icon={<IconCategory size="h-[20px] w-[20px]" />}
        />
        <div
          className={`flex bg-white px-3 items-center justify-between mb-4 w-full pl-10 h-12 shadow-sm rounded-lg  ${
            enable ? "text-black" : "text-gray-300"
          }`}
        >
          <p className="">Categoria {enable ? "habilitada" : "desabilitada"}</p>
          <ToggleSwitch initialChecked={enable} onChange={setEnable} />
        </div>
      </Form>
    </div>
  );
};
