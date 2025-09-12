import React, { Suspense, use } from "react";
import CadastrarPromocao from "../CadastrarPromocao";

export default function Page({ params }) {
  const { uuid } = use(params);
  return (
    <Suspense>
      <CadastrarPromocao promotionUUID={uuid} />
    </Suspense>
  );
}
