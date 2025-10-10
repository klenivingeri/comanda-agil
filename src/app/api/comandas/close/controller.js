export const closeCommand = ({ commands, users, xTenant, _id }) => {
  console.log({ _id });
  let response;
  try {
    if (_id) {
      return Response.json({ records: [] }, { status: 200 });
    }

    if (response && (Array.isArray(response) ? response.length > 0 : true)) {
      return Response.json({ records: response }, { status: 200 });
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
