import numeral from "numeral";
import "numeral/locales/pt-br";

numeral.locale("pt-br");

export const currency = (value) => {
  return numeral(value).format("$ 0,0.00");
};

export const total = (items) => {
  const totalPrice = items.reduce((acc, current) => acc + current.price, 0);
  return totalPrice;
};

export const subTotal = (items = [], orderItems = []) => {
  const totalPriceItems = items.reduce(
    (acc, current) => acc + current.price * current.quant,
    0
  );

  const totalPriceOrderItems = orderItems.reduce(
    (acc, current) => acc + current.price * current.quant,
    0
  );

  return totalPriceOrderItems + totalPriceItems;
};
