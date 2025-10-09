export const getCurrentDay = () => {
  const now = new Date(); // horário do servidor (UTC)
  const dateBRT = new Date(now.getTime() - 3 * 60 * 60 * 1000);
  const dateOnly = new Date(
    dateBRT.getFullYear(),
    dateBRT.getMonth(),
    dateBRT.getDate(),
    0,
    0,
    0,
    0
  );
  return dateOnly;
};
