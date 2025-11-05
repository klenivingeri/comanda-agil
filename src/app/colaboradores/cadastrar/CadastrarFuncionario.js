"use client";
import { useState, useEffect } from "react";
import { Container } from "../../../components/layout/Container";
import { Content } from "../../../components/layout/Content";
import { Header } from "../../../components/layout/Header";
import { FormComponent } from "./FormComponent";
import { useToast } from "../../../hooks/useToast";

export default function CadastrarFuncionario({ employeeUUID }) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [employee, setEmployee] = useState({});

  const toast = useToast();

  const fetchCreateEmployee = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch(`/api/user?_id=${employeeUUID}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      const result = await resp.json();
      setEmployee(result.records);
    } catch (_) {
      toast.error("Ocorreu um erro ao buscar cadastro funcionario.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (employeeUUID !== "create") {
      fetchCreateEmployee();
    }
  }, []);

  return (
    <Container>
      <Header divider title="Cadastro de funcionario" />
      <Content isLoading={isLoading} error={error}>
        <FormComponent employee={employee[0]} />
      </Content>
    </Container>
  );
}
