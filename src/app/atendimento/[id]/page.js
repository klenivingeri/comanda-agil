"use client";

import React, { Suspense, use } from "react";
import { Atendimento } from "../Atendimento";

export default function Page({ params }) {
  const { id } = use(params);
  return (
    <Suspense>
      <Atendimento idComanda={id} />
    </Suspense>
  );
}
