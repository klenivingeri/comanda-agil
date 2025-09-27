import React, { Suspense, use } from "react";
import { Chat } from "../chat";

export default function Page({ params }) {
  const { id } = use(params);
  return (
    <Suspense>
      <Atendimento idComanda={id} />
    </Suspense>
  );
}
