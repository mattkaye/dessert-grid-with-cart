import { useState, Dispatch, SetStateAction, useEffect } from "react";
import { CartItem, DessertItem } from "../../custom-types";
import useSound from "use-sound";
import addItemSFX from "./add-item.mp3";
import { formatCurrency } from "../../helpers";
import "./styles.css";

const Dessert = ({
  data,
  cartContents,
  setCartContents,
}: {
  data: DessertItem;
  cartContents;
  setCartContents: Dispatch<SetStateAction<CartItem[]>>;
}) => {
  const [productCount, setProductCount] = useState(0);
  const [play] = useSound(addItemSFX, { volume: 0.3 });

  const itemInCart = cartContents[data.name] !== undefined;

  const incrementCount = () => {
    setProductCount((prev) => {
      if (prev === 0) {
        play();
      }
      return prev + 1;
    });
    setCartContents((prev) => {
      return {
        ...prev,
        [data.name]: {
          price: data.price,
          quantity: productCount + 1,
        },
      };
    });
  };
  useEffect(() => {
    !itemInCart && setProductCount(0);
  }, [itemInCart]);

  const decrementCount = () => {
    setProductCount((prev) => prev - 1);

    setCartContents((prev) => {
      const newCartContents = {
        ...prev,
        [data.name]: {
          price: data.price,
          quantity: productCount - 1,
        },
      };
      return Object.entries(newCartContents).reduce((acc, [key, value]) => {
        if (value.quantity > 0) {
          acc[key] = value;
        }
        return acc;
      }, {});
    });
  };

  return (
    <article className='dessert-card'>
      <img
        src={data.image.mobile}
        alt={data.name}
        className={itemInCart ? "added-to-cart" : ""}
      />
      {!itemInCart ? (
        <button className='add-to-cart' onClick={incrementCount}>
          Add to Cart
        </button>
      ) : (
        <div className='adjust-quantity'>
          <button onClick={decrementCount}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='30'
              height='30'
              fill='currentColor'
            >
              <path d='M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M21,16H9c-0.552,0-1-0.447-1-1s0.448-1,1-1h12c0.552,0,1,0.447,1,1S21.552,16,21,16z'></path>
            </svg>
          </button>
          <span>{productCount}</span>
          <button onClick={incrementCount}>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              width='30'
              height='30'
              fill='currentColor'
            >
              <path d='M15,3C8.373,3,3,8.373,3,15c0,6.627,5.373,12,12,12s12-5.373,12-12C27,8.373,21.627,3,15,3z M21,16h-5v5 c0,0.553-0.448,1-1,1s-1-0.447-1-1v-5H9c-0.552,0-1-0.447-1-1s0.448-1,1-1h5V9c0-0.553,0.448-1,1-1s1,0.447,1,1v5h5 c0.552,0,1,0.447,1,1S21.552,16,21,16z'></path>
            </svg>
          </button>
        </div>
      )}
      <div className='product-details'>
        <p>{data.category}</p>
        <p>{data.name}</p>
        <p>{formatCurrency(data.price)}</p>
      </div>
    </article>
  );
};

export default Dessert;
