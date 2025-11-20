import { useEffect, useState } from "react";
import { InputFileComponent } from "../../../components/form/InputFileComponent";
import { useToast } from "../../../hooks/useToast";

import { Form, Input, Select } from "../../../components/form/FormComponents";
import { IconPassword } from "public/icons/Password";
import { ToggleSwitch } from "src/components/ToggleSwitch";
import { IconUser } from "public/icons/User";
import { IconEmail } from "public/icons/Email";
import { IconCompanyLine } from "public/icons/Company";
import { IconCredential } from "public/icons/Credential";

export const FormComponent = ({ employee }) => {
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, sePassword] = useState("");
  const [role, setRole] = useState("");
  const [branch, setBranch] = useState("");
  const [enable, setEnable] = useState(true);
  const [image, setImage] = useState(null);
  const [url, setUrl] = useState('');
  const toast = useToast();

  const fetchCreateUpdateEmployee = async (id, payload) => {
    try {
      const resp = await fetch(`/api/user?_id=${id}`, {
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
    if (!name || !email || !password || !role || !branch) {
      setIsValid(true);
      return;
    }
    setIsValid(false);
    setIsLoading(true);

    let imageUrl = null;

    if (image) {
      try {
        const formData = new FormData();
        formData.append("file", image);

        const uploadResponse = await fetch(`/api/image?urlFile=${url}`, {
          method: "POST",
          body: formData,
        });

        if (!uploadResponse.ok) {
          throw new Error("Falha no upload da imagem.");
        }

        const result = await uploadResponse.json();
        imageUrl = result.url;
      } catch (error) {
        console.error(error);
        toast.error("Ocorreu um erro ao enviar a imagem.");
        setIsLoading(false);
        return;
      }
    }

    const payload = { name, email, password, role, branch, enable, image: imageUrl };
    fetchCreateUpdateEmployee(employee?._id, payload);

    if (employee?._id) return;
  };

  useEffect(() => {
    if (employee?._id) {
      setName(employee.name);
      setEmail(employee.email);
      setRole(employee.role);
      setBranch(employee.branch);
      setUrl(employee.image);
    }
  }, [employee]);

  return (
    <div className="w-full max-w-[500px] mx-auto text-gray-700">
      <Form method="POST" create={handleSend} isLoading={isLoading}>
        <InputFileComponent id="file" value={url} setValue={setImage} />
        <Input
          name="Nome"
          id="name"
          setValue={setName}
          placeholder="Digite o nome"
          isValid={isValid}
          error={name.trim() === ""}
          value={name}
          icon={<IconUser size="h-[20px] w-[20px]" />}
        />
        <Input
          name="Email"
          id="code"
          setValue={setEmail}
          placeholder="Digite o email"
          isValid={isValid}
          error={email.trim() === ""}
          value={email}
          icon={<IconEmail size="h-[20px] w-[20px]" />}
        />
        <Input
          type="password"
          name="Senha"
          id="price"
          setValue={sePassword}
          placeholder="Digite a senha"
          isValid={isValid}
          error={!password}
          value={password}
          icon={<IconPassword size="h-[20px] w-[20px]" />}
        />
        <Select
          name="Filial"
          id="branch"
          placeholder="Selecione a quantidade de filiais"
          value={branch}
          setValue={setBranch}
          options={[
            { name: "1", _id: "1" },
            { name: "2", _id: "2" },
            { name: "3", _id: "3" },
          ]}
          isValid={isValid}
          error={branch.trim() === ""}
          icon={<IconCompanyLine size="h-[20px] w-[20px]" />}
        />
        <Select
          name="Nivel de acesso (Restringe opções no menu)"
          id="role"
          placeholder="Selecione o nivel de acesso"
          value={role}
          setValue={setRole}
          options={[
            {
              name: "Leitor - Pode criar e adicionar items na comanda, porem apenas a visualização de todos os dados e itens.",
              _id: "VIEWER",
            },
            {
              name: "Moderador - Possui todas as permissões de Leitor, além de ter acesso ao caixa e poder ativar e desativar itens/registros existentes.",
              _id: "MODERATOR",
            },
            {
              name: "Editor - Possui todas as permissões do Moderador, além poder cadastrar novos itens e editar os itens existentes.",
              _id: "EDITOR",
            },
            {
              name: "Administrador - Possui todas as permissões, com a autoridade máxima de deletar permanentemente itens/registros.",
              _id: "ADMIN",
            },
          ]}
          isValid={isValid}
          error={role.trim() === ""}
          icon={<IconCredential size="h-[20px] w-[20px]" />}
        />
        <div
          className={`flex bg-white px-3 items-center justify-between mb-4 w-full pl-10 h-12 shadow-sm rounded-lg  ${
            enable ? "text-black" : "text-gray-300"
          }`}
        >
          <p className="">Colaborador {enable ? "habilitado" : "desabilitado"}</p>
          <ToggleSwitch initialChecked={enable} onChange={setEnable} />
        </div>
      </Form>
    </div>
  );
};
