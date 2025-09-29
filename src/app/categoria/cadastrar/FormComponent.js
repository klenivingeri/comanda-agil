import { useState, useEffect } from "react";
import { Form, Input } from "../../../components/form/FormComponents";
import { Loading } from "../../../components/loading/Loading";

export const FormComponent = ({ category }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [name, setName] = useState(category?.name || "");

  useEffect(() => {
    if (category?.name) {
      setName(category.name);
    }
  }, [category]);

  const fetchCreateItem = async (formDetails) => {
    setIsLoading(true);
    const resp = await fetch(`/api/category`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDetails),
    });

    const result = await resp.json();
    setIsLoading(false);
  };

  const fetchUpdateItem = async (formDetails) => {
    setIsLoading(true);
    const resp = await fetch(`/api/category`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formDetails),
    });

    // const result = await resp.json();
    setIsLoading(false);
  };

  const handleSend = async () => {
    if (!name) {
      setIsValid(true);
      return;
    }
    setIsValid(false);

    if (category._id) {
      fetchUpdateItem({ name, _id: category._id });
    } else {
      fetchCreateItem({ name });
    }
    setName("");
  };

  return (
    <div className="w-full max-w-[500px] mx-auto">
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
      </Form>
    </div>
  );
};
