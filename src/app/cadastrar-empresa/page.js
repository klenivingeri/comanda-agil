"use client";
import { IconChecked } from "public/icons/Checked";
import React, { useEffect, useRef, useState } from "react";
import { ButtonContainer } from "src/components/button";
import { Form } from "src/components/form/FormComponents";
import { Container } from "src/components/layout/Container";
import { Content } from "src/components/layout/Content";
import { Loading } from "src/components/loading/Loading";
import { CenterTop } from "src/components/modal/ModalTop";
import { useToast } from "src/hooks/useToast";

export const Input = ({
  name,
  id,
  setValue,
  placeholder,
  value,
  error,
  isValid = false,
  type = "text",
  onFocus = () => {},
  autoFocus = false,
  errorMessage = "",
}) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && autoFocus) {
      inputRef.current.focus();
    }
  }, []);

  const handleSetValue = (_value) => {
    setValue(_value);
  };

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium ">
        {name}
      </label>
      <input
        onChange={(e) => handleSetValue(e.target.value)}
        id={id}
        ref={inputRef}
        value={value}
        name={id}
        onFocus={onFocus}
        type={type}
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="none"
        spellCheck="false"
        className={`w-full pl-5 pr-10 py-2 h-12 ring-1 ring-[var(--button-default)] rounded-lg focus:ring-2 focus:ring-[var(--button-default)] focus:border-[var(--button-focus)] outline-none bg-[var(--input-default)] text-black
            ${
              isValid && error
                ? "border-red-500 focus:border-red-500 focus:ring-red-500"
                : "border-gray-300 dark:border-gray-600"
            }
          `}
        placeholder={placeholder}
      />
      {isValid && error && (
        <p className="mt-1 text-sm text-red-500">
          {errorMessage.length > 0
            ? errorMessage
            : `O campo "${placeholder}" é obrigatório`}
        </p>
      )}
    </div>
  );
};

export default function Page() {
  const [isValid, setIsValid] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [enterprise, setEnterprise] = useState("");
  const toast = useToast();
  const fetchCreateUpdateEmployee = async (payload) => {
    try {
      const resp = await fetch(`/api/user/enterprise`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const result = await resp.json();

      if (resp.ok) {
        setOpenModal(true);
      } else {
        toast.error(result.message);
      }
    } catch (_) {
      toast.error(
        "Ocorreu um erro ao cadastrar a empresa, por favor tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (
      !name ||
      !email ||
      !password ||
      !passwordConfirm ||
      !setEnterprise ||
      password !== passwordConfirm
    ) {
      setIsValid(true);
      return;
    }
    setIsValid(false);

    setIsLoading(true);
    fetchCreateUpdateEmployee({
      name,
      enterprise,
      email,
      password,
      passwordConfirm,
      setEnterprise,
    });
  };

  return (
    <Container>
      <header className="bg-white shadow-md sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold tracking-tight">
              <span className="text-gray-900">Comanda</span>
              <span className="text-[var(--button-orange-default)]">Go</span>
              <p className="text-xs font-normal text-gray-500 mt-1">
                Gestão de Pedidos Simplificada
              </p>
            </div>
          </div>
        </div>
      </header>
      <Content>
        <div className="w-full max-w-[500px] mx-auto text-gray-700">
          <Form
            method="POST"
            create={handleSend}
            isLoading={isLoading}
            style="buttonOrange"
          >
            <Input
              name="Proprietário"
              id="name"
              setValue={setName}
              placeholder="Digite o nome"
              isValid={isValid}
              error={name.trim() === ""}
              value={name}
            />
            <Input
              name="Nome da empresa"
              id="name"
              setValue={setEnterprise}
              placeholder="Digite o nome da empresa"
              isValid={isValid}
              error={enterprise.trim() === ""}
              value={enterprise}
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
              setValue={setPassword}
              placeholder="Digite a senha"
              isValid={isValid}
              error={!password || password !== passwordConfirm}
              value={password}
              errorMessage="As senhas digitadas não coincidem. Por favor, verifique."
            />
            <Input
              type="password"
              name="Confirmar senha"
              id="price"
              setValue={setPasswordConfirm}
              placeholder="Digite a senha"
              isValid={isValid}
              error={!passwordConfirm || password !== passwordConfirm}
              value={passwordConfirm}
              errorMessage="As senhas digitadas não coincidem. Por favor, verifique."
            />
          </Form>
        </div>
      </Content>
      <CenterTop
        notCloseBg
        showX
        isOpen={openModal}
        onClose={() => setOpenModal(false)}
      >
        <div className="p-4 pt-8 flex flex-col items-center text-center">
          {!isLoading ? (
            <>
              <div className="flex justify-center mb-8 items-center h-14 w-14 text-[var(--button-orange-default)] rounded-2xl bg-[var(--button-disabled)]/50 ">
                <IconChecked size="h-[40px] w-[40px]" />
              </div>
              <span className="text-2xl font-extrabold  mb-2 text-[var(--button-orange-default)]">
                Cadastro Finalizado com Sucesso!
              </span>
              <div className="flex flex-col sm:flex-row w-full gap-3 mt-6">
                <ButtonContainer
                  href="/login"
                  text="Ir para pagina de login"
                  style="buttonOrange"
                />
              </div>
            </>
          ) : (
            <Loading isLoading={isLoading} style="style3" />
          )}
        </div>
      </CenterTop>
    </Container>
  );
}
