export const last7days = (allSuborders) => {
  const dateCurrent = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(dateCurrent.getDate() - 7);

  return allSuborders.filter(item => {
    const data = new Date(item.createdAt);
    return data >= lastWeek && data <= dateCurrent;
  });
}