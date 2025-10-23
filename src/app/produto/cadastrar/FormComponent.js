import { useEffect, useState } from "react";
import { InputFileComponent } from "../../../components/form/InputFileComponent";
import { useToast } from "../../../hooks/useToast";

import {
  Form,
  Input,
  InputImagem,
  Select,
  Textarea,
} from "../../../components/form/FormComponents";

export const FormComponent = ({ categories, product }) => {
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const toast = useToast();

  const fetchCreateUpdateProduct = async (id, payload) => {
    try {
      const resp = await fetch(`/api/items?id=${id}`, {
        method: id ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await resp.json();

      toast.success("Produto cadastrada com sucesso!");
    } catch (_) {
      toast.error("Ocorreu um erro ao cadastrar a Produto.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!code || !name || !price || !description || !category) {
      setIsValid(true);
      return;
    }
    setIsValid(false);

    setIsLoading(true);
    fetchCreateUpdateProduct(product?._id, {
      code,
      name,
      price,
      description,
      category,
    });

    setCode("");
    setName("");
    setPrice("");
    setDescription("");
    setCategory("");
  };

  useEffect(() => {
    if (product?._id) {
      setCode(product.code);
      setName(product.name);
      setPrice(product.price);
      setDescription(product.description);
      setCategory(product.category?._id);
    }
  }, [product]);

  return (
    <div className="w-full max-w-[500px] mx-auto text-gray-700">
      <Form method="POST" create={handleSend} isLoading={isLoading}>
        <InputFileComponent id="file" setValue={() => {}} />
        <Input
          name="Código do produto"
          id="code"
          setValue={setCode}
          placeholder="Código do produto"
          isValid={isValid}
          error={code.trim() === ""}
          value={code}
        />
        <Input
          name="Nome do produto"
          id="name"
          setValue={setName}
          placeholder="Nome do produto"
          isValid={isValid}
          error={name.trim() === ""}
          value={name}
        />
        <Input
          name="Preço do produto"
          id="price"
          setValue={setPrice}
          placeholder="Preço do produto"
          isValid={isValid}
          error={!price}
          value={price}
          type="tel"
          isCurrency
        />
        <Textarea
          name="Descrição do produto"
          id="description"
          setValue={setDescription}
          placeholder="Descrição do produto"
          isValid={isValid}
          error={description.trim() === ""}
          value={description}
        />
        <Select
          name="Categoria"
          id="select"
          value={category}
          placeholder="Selecione a categoria"
          setValue={setCategory}
          options={categories}
          isValid={isValid}
          error={category.trim() === ""}
        />
      </Form>
    </div>
  );
};
