import { use, useEffect, useState } from "react";
import { InputFileComponent } from "../../../components/form/InputFileComponent";
import { Loading } from "../../../components/loading/Loading";
import {
  Form,
  Input,
  InputImagem,
  Select,
  Textarea,
} from "../../../components/form/FormComponents";

const fetchCreateProduct = async (payload) => {
  const resp = await fetch(`/api/items`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await resp.json();
};

const fetchUpdateProduct = async (id, payload) => {
  const resp = await fetch(`/api/items?id=${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });
  const result = await resp.json();
};

export const FormComponent = ({ categories, product }) => {
  console.log(product);
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");

  const handleSend = async () => {
    if (!code || !name || !price || !description || !category) {
      setIsValid(true);
      return;
    }
    setIsValid(false);

    if (product?._id) {
      setIsLoading(true);
      fetchUpdateProduct(product._id, {
        code,
        name,
        price,
        description,
        category,
      });
    } else {
      setIsLoading(true);
      fetchCreateProduct({ code, name, price, description, category });
    }

    setCode("");
    setName("");
    setPrice("");
    setDescription("");
    setCategory("");
    setIsLoading(false);
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
    <div className="w-full max-w-[500px] mx-auto">
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
          name="Selecione a categoria"
          id="select"
          value={category}
          setValue={setCategory}
          options={categories}
          isValid={isValid}
          error={category.trim() === ""}
        />
      </Form>
    </div>
  );
};
