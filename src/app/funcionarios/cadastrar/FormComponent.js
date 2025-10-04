import { useEffect, useState } from "react";
import { InputFileComponent } from "../../../components/form/InputFileComponent";
import { useToast } from "../../../hooks/useToast";

import { Form, Input, Select } from "../../../components/form/FormComponents";

export const FormComponent = ({ employee }) => {
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, sePassword] = useState("");
  const [role, setRole] = useState("");
  const [branch, setBranch] = useState("");
  const toast = useToast();

  const fetchCreateUpdateEmployee = async (id, payload) => {
    try {
      const resp = await fetch(`/api/user?id=${id}`, {
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
    fetchCreateUpdateEmployee(employee?._id, {
      name,
      email,
      password,
      role,
      branch,
    });

    setName("");
    setEmail("");
    sePassword("");
    setRole("");
    setBranch("");
  };

  useEffect(() => {
    if (employee?._id) {
      setName(employee.name);
      setEmail(employee.email);
      sePassword(employee.password);
      setRole(employee.role);
      setBranch(employee.branch);
    }
  }, [employee]);

  return (
    <div className="w-full max-w-[500px] mx-auto">
      <Form method="POST" create={handleSend} isLoading={isLoading}>
        <InputFileComponent id="file" setValue={() => {}} />
        <Input
          name="Nome"
          id="name"
          setValue={setName}
          placeholder="Digite o nome"
          isValid={isValid}
          error={name.trim() === ""}
          value={name}
        />
        <Input
          name="Email"
          id="code"
          setValue={setEmail}
          placeholder="Digite o email"
          isValid={isValid}
          error={email.trim() === ""}
          value={email}
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
        />
        <Select
          name="Filial"
          id="branch"
          value={branch}
          placeholder="Selecione o numero da loja"
          setValue={setBranch}
          options={[
            { name: "1", _id: "1" },
            { name: "2", _id: "2" },
            { name: "3", _id: "3" },
          ]}
          isValid={isValid}
          error={branch.trim() === ""}
        />
        <Select
          name="Nivel de acesso (Registri opções no menu)"
          id="role"
          placeholder="Selecione o nivel de acesso"
          value={role}
          setValue={setRole}
          options={[
            {
              name: "Acesso de leitura - Pode criar e adicionar items na comanda, porem apenas a visualização de todos os dados e itens.",
              _id: "VIEWER",
            },
            {
              name: "Possui todas as permissões de Leitura, além de poder ativar e desativar itens/registros existentes.",
              _id: "MODERATOR",
            },
            {
              name: "Possui todas as permissões do GM, além de poder cadastrar novos itens e editar os itens existentes.",
              _id: "EDITOR",
            },
            {
              name: "Possui todas as permissões do ADM, com a autoridade máxima de deletar permanentemente itens/registros.",
              _id: "ADMIN",
            },
          ]}
          isValid={isValid}
          error={role.trim() === ""}
        />
      </Form>
    </div>
  );
};
