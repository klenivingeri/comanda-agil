import { isEmpty } from "../../utils/empty";

export const getProducts = async (connectToDatabase, product, id) => {
  try {
    await connectToDatabase();
    let response;

    if (id) {
      response = await product.findOne({ _id: new ObjectId(id) });
    } else {
      response = await product.find({});
    }

    if (!isEmpty(response)) {
      return Response.json(
        {
          records: response,
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

export const postProducts = async (connectToDatabase, product, body) => {
  try {
    await connectToDatabase();
    await product.create(body);
    console.log(body);
    return Response.json({ message: "Sucesso" }, { status: 200 });
  } catch (e) {
    return Response.json(
      { message: "Ocorreu um erro ao Fazer o cadastro do item" },
      { status: 500 }
    );
  }
};
