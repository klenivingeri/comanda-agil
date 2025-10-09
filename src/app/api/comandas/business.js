export const getInfoPainelUser = (
  allCommandItemsByUserUuid,
  totalCommandByUserUuid
) => {
  const groupedItems = Object.values(
    allCommandItemsByUserUuid.reduce((acc, item) => {
      const id = item.product._id.toString(); // transforma ObjectId em string
      if (!acc[id]) {
        acc[id] = { ...item }; // cria se não existir
      } else {
        acc[id].quantity += item.quantity; // soma a quantidade
      }
      return acc;
    }, {})
  ).sort((a, b) => b.quantity - a.quantity);

  const totalQuantity = groupedItems.reduce(
    (acc, item) => acc + item.quantity,
    0
  );

  return {
    userStatistics: {
      totalQuantityOfOpenCommands: totalCommandByUserUuid,
      totalQuantity,
      bestSeller: {
        ...groupedItems[0],
      },
    },
  };
};
