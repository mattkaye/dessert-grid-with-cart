import { Dispatch, ReactNode, SetStateAction } from "react";
import useSound from "use-sound";
import { formatCurrency } from "../../helpers";
import orderCompleteSFX from "./order-complete.mp3";
import { CartItem } from "../../custom-types";
import "./styles.css";

const Cart = ({
  cartContents,
  setCartContents,
}: {
  setCartContents: Dispatch<SetStateAction<CartItem[]>>;
}) => {
  const [play] = useSound(orderCompleteSFX, { volume: 0.3 });

  const getCartTotalAndCount = () => {
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

  const handleRemoveItem = (dessertName: string) => {
    setCartContents((prev) => {
      const newCartContents = {
        ...prev,
        [dessertName]: {
          price: prev[dessertName].price,
          quantity: 0,
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

  const makeCartList = () => {
    const cartList: ReactNode[] = [];
    for (const [dessertName, itemName] of Object.entries(cartContents)) {
      cartList.push(
        <li key={dessertName}>
          <h2>{dessertName}</h2>
          <div className='details'>
            <p>{itemName.quantity}x</p>
            <p>@ {formatCurrency(itemName.price)}</p>
            <p>{formatCurrency(itemName.price * itemName.quantity)}</p>
            <button
              className='remove-item'
              onClick={() => handleRemoveItem(dessertName)}
            >
              <svg
                xmlns='http://www.w3.org/2000/svg'
                width='10'
                height='10'
                fill='none'
                viewBox='0 0 10 10'
              >
                <path
                  fill='currentColor'
                  d='M8.375 9.375 5 6 1.625 9.375l-1-1L4 5 .625 1.625l1-1L5 4 8.375.625l1 1L6 5l3.375 3.375-1 1Z'
                />
              </svg>
            </button>
          </div>
        </li>
      );
    }
    return cartList;
  };

  return (
    <aside className='shopping-cart'>
      <h1>Your Cart ({getCartTotalAndCount().count})</h1>
      {getCartTotalAndCount().count === 0 ? (
        <div className='empty-cart'>
          <img src='/svg/illustration-empty-cart.svg' alt='Empty Cart' />
          <small>Your added items will appear here</small>
        </div>
      ) : (
        <div className='active-cart'>
          <ul>{makeCartList()}</ul>
          <div className='total'>
            <p>Order Total</p>
            <h3>{formatCurrency(getCartTotalAndCount().total)}</h3>
          </div>
          <div className='carbon-neutral'>
            <p>
              This is a <strong>carbon neutral</strong> order
            </p>
          </div>
          <button className='checkout-button' onClick={() => play()}>
            Confirm Order
          </button>
        </div>
      )}
    </aside>
  );
};

export default Cart;
