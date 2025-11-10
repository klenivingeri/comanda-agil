"use client";

import React, { Suspense, use, useCallback, useEffect, useState } from "react";
import { useCommand } from "../../context/CommandContext";
import { Atendimento } from "../Atendimento";
import { useDB } from "src/app/context/DBProvider";
import { getOneIndexdbOrApi } from "src/db/getIndexdbOrApi";

const state = { all: [], error: false, isLoading: true }

export default function Page({ params }) {
  const { isDBReady } = useDB();
  const { id } = use(params);
  const [itemSave, setItemSave] = useState(state);
  const [caregorySave, setCategorySave] = useState(state);
  const { _command } = useCommand();
  
  const getItems = useCallback(() => getOneIndexdbOrApi("/api/items", "catalog_products", setItemSave), []);
  const getCategory = useCallback(() => getOneIndexdbOrApi("/api/category", "catalog_categories", setCategorySave), []);

  useEffect(() => {
    if(!isDBReady) return 
      getItems()
      getCategory()
  }, [isDBReady])

  return (
    <Suspense>
      {(!caregorySave.isLoading && !itemSave.isLoading) && ( 
        <Atendimento idComanda={id} _command={_command} _item={itemSave} _category={caregorySave} />
      )}
    </Suspense>
  );
}
