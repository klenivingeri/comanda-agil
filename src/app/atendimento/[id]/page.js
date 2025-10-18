"use client";

import React, { Suspense, use } from "react";
import { useItem } from "../../context/ItemContext";
import { useCommand } from "../../context/CommandContext";
import { Atendimento } from "../Atendimento";

export default function Page({ params }) {
  const { _item } = useItem();
  const { _command } = useCommand();
  const { id } = use(params);

  return (
    <Suspense>
      <Atendimento idComanda={id} _item={_item} _command={_command} />
    </Suspense>
  );
}
