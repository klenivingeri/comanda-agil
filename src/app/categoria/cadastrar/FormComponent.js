import { useState } from "react";
import { Form, Input } from "../../../components/form/Form";
import { Loading } from "../../../components/loading/Loading";

export const FormComponent = ({ category }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [name, setName] = useState("");

  if (isLoading) {
    return <Loading isLoading={isLoading} />;
  }

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

  const handleSend = async () => {
    if (!name) {
      setIsValid(true);
      return;
    }
    setIsValid(false);
    fetchCreateItem({ name });
  };

  return (
    <div className="w-full max-w-[500px] mx-auto">
      <Form method="POST" create={handleSend}>
        <Input
          name="Nome da categoria"
          id="category"
          setText={setName}
          placeholder="Nome da categoria"
          isValid={isValid}
          error={name.trim() === ""}
          value={name}
        />
        {<Loading isLoading={isLoading} />}
      </Form>
    </div>
  );
};
