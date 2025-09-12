import React, { Suspense, use } from "react";
import Login from "../Login";

export default function Page({ params }) {
  const { store } = use(params);
  return (
    <Suspense>
      <Login store={store} />
    </Suspense>
  );
}
