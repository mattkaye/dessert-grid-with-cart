export type CartItem = {
  [name: string]: {
    price: number;
    quantity: number;
  };
};

export type DessertItem = {
  image: {
    thumbnail: string;
    mobile: string;
    tablet: string;
    desktop: string;
  };
  name: string;
  category: string;
  price: number;
};
