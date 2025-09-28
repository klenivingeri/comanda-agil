import { esperar } from "../utils/esperar";
import { isEmpty } from "../../utils/empty";
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

const createType = (_str) => {
  let str = _str
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/\s+/g, "-")
    .toLowerCase();

  return str;
};

export const getCagetories = async (connectToDatabase, product, id) => {
  try {
    await connectToDatabase();
    let response;

    if (id) {
      response = await product
        .findOne({ _id: new ObjectId(id) })
        .populate("tenantId");
    } else {
      response = await product.find({});
    }

    if (!isEmpty(response)) {
      return Response.json(
        {
          records: type,
        },
        { status: 200 }
      );
    }

    return Response.json(
      { message: "Nenhum item encontrado" },
      { status: 404 }
    );
  } catch {
    return Response.json(
      { message: "Erro ao processar os itens" },
      { status: 500 }
    );
  }
};

export const postCagetories = async ({
  connectToDatabase,
  category,
  xTenant,
  body,
}) => {
  try {
    await connectToDatabase();
    const { name } = body;
    const type = createType(name);
    const payload = {
      name,
      type,
      tenantId: xTenant.id,
    };

    await category.create(payload);

    return Response.json({ message: "Sucesso" }, { status: 200 });
  } catch (e) {
    console.log(e);
    return Response.json(
      { message: "Ocorreu um erro ao Fazer o cadastro do item" },
      { status: 500 }
    );
  }
};
