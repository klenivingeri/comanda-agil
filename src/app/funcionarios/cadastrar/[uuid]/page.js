import React, { Suspense, use } from "react";
import CadastrarFuncionario from "../CadastrarFuncionario";

export default function Page({ params }) {
  const { uuid } = use(params);
  return (
    <Suspense>
      <CadastrarFuncionario employeeUUID={uuid} />
    </Suspense>
  );
}
