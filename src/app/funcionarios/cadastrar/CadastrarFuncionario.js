"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { IconDotMenu } from "../../../../public/icons/DotMenu";
import { MenuMobile } from "../../../components/menu/lateral/MenuMobile";

import { Container } from "../../../components/layout/Container";
import { Content } from "../../../components/layout/Content";
import { Header, HeaderGrid } from "../../../components/layout/Header";
import { FormComponent } from "./FormComponent";
import { useToast } from "../../../hooks/useToast";
import { IconBack } from "public/icons/ArrowBack";

export default function CadastrarFuncionario({ employeeUUID }) {
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [employee, setEmployee] = useState({});
  const [openMenuMobile, setOpenMenuMobile] = useState(false);
  const router = useRouter();
  const toast = useToast();

  const goBack = () => {
    router.back();
  };
  const handleOpenMenuMobile = () => {
    setOpenMenuMobile(!openMenuMobile);
  };

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
      <Header h="h-[30px]">
        <HeaderGrid>
          <div className="col-span-2 flex" onClick={goBack}>
            <IconBack size="h-[26px] w-[26px]" />
          </div>

          <div className="col-span-8 mt-1">
            <div className="w-full flex justify-center">
              <span className="text-xs font-bold">CADASTRAR FUNCIONARIO</span>
            </div>
          </div>
          <div className="col-span-2"></div>
        </HeaderGrid>
      </Header>
      <div className="mt-[30px] mb-[50px] flex-1 flex flex-col">
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
