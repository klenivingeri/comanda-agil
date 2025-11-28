import { useEffect, useState } from "react";
import { InputFileComponent } from "../../../components/form/InputFileComponent";
import { useToast } from "../../../hooks/useToast";

import {
  Form,
  Input,
  Select,
  Textarea,
} from "../../../components/form/FormComponents";
import { IconProduct } from "public/icons/Product";
import { IconMoney } from "public/icons/Money";
import { IconCode } from "public/icons/Codes";
import { IconCategory } from "public/icons/Category";
import { ToggleSwitch } from "src/components/ToggleSwitch";
import { ButtonContainer } from "src/components/button";
import { CenterTop } from "src/components/modal/ModalTop";
import { FormComponentCategory } from "src/app/categoria/cadastrar/FormComponentCategory";

export const FormComponent = ({ categories, product, getCategories }) => {
  const [openModal, setOpenModal] = useState(false);
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [code, setCode] = useState("");
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [enable, setEnable] = useState(true);
  const toast = useToast();

  const handleSetOpenModal = (e) => {
    e.preventDefault();
    setOpenModal(true);
  };

  const handleGetCategories = () => {
    getCategories()
    setOpenModal(false);
  };

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
      enable,
    });

    if (product?._id) return;

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
      setCategory(product.category);
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
          icon={<IconCode size="h-[20px] w-[20px]" />}
        />
        <Input
          name="Nome do produto"
          id="name"
          setValue={setName}
          placeholder="Nome do produto"
          isValid={isValid}
          error={name.trim() === ""}
          value={name}
          icon={<IconProduct size="h-[20px] w-[20px]" />}
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
          icon={<IconMoney size="h-[20px] w-[20px]" />}
        />
        <div className="flex w-full justify-between items-end">
          <Select
            name="Categoria"
            id="select"
            value={category}
            placeholder="Selecione a categoria"
            setValue={setCategory}
            options={categories}
            isValid={isValid}
            error={category?.trim() === ""}
            icon={<IconCategory size="h-[20px] w-[20px]" />}
          />
          <ButtonContainer
            text="Criar"
            margin="ml-2"
            wFull="w-20"
            onClick={handleSetOpenModal}
          />
        </div>
        <div
          className={`flex bg-white px-3 items-center justify-between mb-4 w-full pl-10 h-12 shadow-sm rounded-lg  ${
            enable ? "text-black" : "text-gray-300"
          }`}
        >
          <p className="">Categoria {enable ? "habilitada" : "desabilitada"}</p>
          <ToggleSwitch initialChecked={enable} onChange={setEnable} />
        </div>
        <Textarea
          id="description"
          setValue={setDescription}
          placeholder="Descrição do produto"
          isValid={isValid}
          error={description.trim() === ""}
          value={description}
        />
      </Form>
      <CenterTop
        notCloseBg
        showX
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      >
        <FormComponentCategory handleOnClick={handleGetCategories} />
      </CenterTop>
    </div>
  );
};
