import { business } from "./business";

export const getMenu = async ({ xTenant }) => {
  try {
    const menu = business({ xTenant });

    return Response.json({ records: menu });
  } catch {
    return Response.json({ message: "Rotas de menu" }, { status: 500 });
  }
};
