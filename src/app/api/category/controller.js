import { esperar } from "../utils/esperar";

const type = [
  {
    name: "Fritos",
    type: "frito",
  },
  {
    name: "Crus",
    type: "crus",
  },
  {
    name: "Assados",
    type: "assados",
  },
  {
    name: "Refrigerantes",
    type: "refrigerantes",
  },
  {
    name: "Sucos",
    type: "sucos",
  },
  {
    name: "Vitaminas",
    type: "vitaminas",
  },
];

export const getTypeItens = async (request) => {
  try {
    esperar(3000);

    return Response.json({ records: type });
  } catch {
    return Response.json({ message: "Rotas de menu" }, { status: 500 });
  }
};
