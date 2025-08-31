import React, { Suspense, use } from "react";
import { ProdutoCadastrar } from "../CadastrarProduto";

export default function Page({ params }) {
  const { uuid } = use(params);
  return (
    <Suspense>
      <ProdutoCadastrar productUUID={uuid} />
    </Suspense>
  );
}
