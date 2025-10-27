import mongoose from "mongoose";
export const aggregateCategories = ({xTenant, periodo}) =>([
    {
      $match: {
        tenant: new mongoose.Types.ObjectId(xTenant.id),
        createdAt: { $gte: periodo.inicio, $lte: periodo.fim },
      },
    },

    // 2. DESAGRUPA: Transforma cada subOrder em um documento separado
    { $unwind: "$subOrders" },

    // 3. FILTRO ADICIONAL: Se você realmente precisa filtrar por um userId dentro da subOrder
    // Mantenho este passo conforme seu código, mas verifique se ele é necessário.
    { $match: { "subOrders.userId": xTenant.userId } },

    // 4. JUNÇÃO (LOOKUP) COM PRODUTOS: Traz os detalhes do produto
    {
      $lookup: {
        from: "products",
        localField: "subOrders.product",
        foreignField: "_id",
        as: "productDetails", // Array que contém o produto
      },
    },

    // 5. DESAGRUPA: Transforma o array productDetails em um objeto
    // Isto é opcional, mas facilita o próximo lookup
    { $unwind: "$productDetails" },

    // 6. JUNÇÃO (LOOKUP) COM CATEGORIAS: Traz os detalhes da categoria
    {
      $lookup: {
        from: "categories", // Coleção de categorias
        localField: "productDetails.category", // O ID da categoria está no produto
        foreignField: "_id",
        as: "categoryDetails", // Array que contém a categoria
      },
    },

    // 7. PROJETO: Seleciona e formata a saída final (Quantidade e Categoria)
    {
      $project: {
        _id: 0, // Oculta o ID do comando
        quantity: "$subOrders.quantity",
        // Usa $arrayElemAt para pegar o objeto dentro do array categoryDetails
        category: { $arrayElemAt: ["$categoryDetails", 0] },
      },
    },

    // 8. AGRUPAMENTO (CONSOLIDAÇÃO): Soma as quantidades por categoria
    {
      $group: {
        _id: "$category._id", // Agrupa pelo ID da categoria
        name: { $first: "$category.name" },
        type: { $first: "$category.type" },
        totalQuantity: { $sum: "$quantity" }, // Soma as quantidades
        // Opcional: Adicionar total de receita
        // totalRevenue: { $sum: { $multiply: ["$quantity", "$productDetails.price"] } }
      },
    },

    // 9. PROJETO FINAL: Limpa os campos para o relatório
    {
      $project: {
        _id: 1, // ID da Categoria
        name: 1,
        type: 1,
        totalQuantity: 1,
        // totalRevenue: 1
      },
    },
  ]);