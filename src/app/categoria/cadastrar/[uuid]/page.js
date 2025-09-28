import React, { Suspense, use } from "react";
import { CategoriaCadastrar } from "../CadastrarCategoria";

export default function Page({ params }) {
  const { uuid } = use(params);
  return (
    <Suspense>
      <CategoriaCadastrar productUUID={uuid} />
    </Suspense>
  );
}
