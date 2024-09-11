import { CartItem } from "./custom-types";

export const formatCurrency = (value: number) => {
  const USDollar = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });
  return USDollar.format(value);
};

export const getCartTotalAndCount = (cartContents: CartItem) => {
  return Object.keys(cartContents).reduce(
    (acc, itemName) => {
      return {
        total:
          acc.total +
          cartContents[itemName].price * cartContents[itemName].quantity,
        count: acc.count + cartContents[itemName].quantity,
      };
    },
    { total: 0, count: 0 }
  );
};
