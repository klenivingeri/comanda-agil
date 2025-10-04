"use client";
import { useState, useEffect } from "react";

import { IconDotMenu } from "../../../../public/icons/DotMenu";
import { MenuMobile } from "../../../components/menu/lateral/MenuMobile";

import { Container } from "../../../components/layout/Container";
import { Content } from "../../../components/layout/Content";
import { Header, HeaderGrid } from "../../../components/layout/Header";
import { FormComponent } from "./FormComponent";

export default function CadastrarFuncionario({ employeeUUID }) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [employee, setEmployee] = useState({});

  const [openMenuMobile, setOpenMenuMobile] = useState(false);

  const handleOpenMenuMobile = () => {
    setOpenMenuMobile(!openMenuMobile);
  };

  const fetchCreateEmployee = async () => {
    setIsLoading(true);
    try {
      const resp = await fetch(`/api/user?id=${employeeUUID}`, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formDetails),
      });
      const result = await resp.json();
      setEmployee(result.records);
    } catch (error) {
      toast.error("Ocorreu um erro ao cadastrar o funcionario.");
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
      <Header h="h-[40px]">
        <HeaderGrid>
          <div className="col-span-2 flex" onClick={handleOpenMenuMobile}>
            <IconDotMenu size="h-[32px] w-[32px]" />
          </div>

          <div className="col-span-8 flex items-center">
            <div className="w-full flex justify-center">
              <span className="text-md font-bold">Cadastrar Funcionario</span>
            </div>
          </div>
          <div className="col-span-2"></div>
        </HeaderGrid>
      </Header>
      <div className="mt-[50px] mb-[50px] flex-1 flex flex-col">
        <Content isLoading={isLoading} error={error}>
          <FormComponent employee={employee} />
        </Content>
      </div>
      <MenuMobile
        handleOpenModal={handleOpenMenuMobile}
        openModal={openMenuMobile}
      />
    </Container>
  );
}
