import { Dispatch, ReactNode, SetStateAction } from "react";
import useSound from "use-sound";
import { formatCurrency, getCartTotalAndCount } from "../../helpers";
import orderCompleteSFX from "./order-complete.mp3";
import { CartItem } from "../../custom-types";
import "./styles.css";

const Cart = ({
  cartContents,
  setCartContents,
  setModalOpen,
}: {
  setCartContents: Dispatch<SetStateAction<CartItem>>;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  cartContents: CartItem;
}) => {
  const [play] = useSound(orderCompleteSFX, { volume: 0.3 });

  const handleRemoveItem = (dessertName: string) => {
    setCartContents((prev) => {
      const newCartContents = {
        ...prev,
        [dessertName]: {
          price: prev[dessertName].price,
          quantity: 0,
          thumbnail: prev[dessertName].thumbnail,
        },
      };
      return Object.entries(newCartContents).reduce((acc, [key, value]) => {
        if (value.quantity > 0) {
          acc[key] = value;
        }
        return acc;
      }, {} as CartItem);
    });
  };

  const emptyCart = () => {
    setCartContents({});
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

  const handleOrderPlaced = () => {
    play();
    setModalOpen(true);
  };

  const cartIsEmpty = getCartTotalAndCount(cartContents).count === 0;

  return (
    <aside className='shopping-cart'>
      <div>
        <h1>Your Cart ({getCartTotalAndCount(cartContents).count})</h1>
        {!cartIsEmpty && (
          <button className='empty-the-cart' onClick={emptyCart}>
            Empty Cart
          </button>
        )}
      </div>
      {cartIsEmpty ? (
        <div className='empty-cart'>
          <img src='/svg/illustration-empty-cart.svg' alt='Empty Cart' />
          <small>Your added items will appear here</small>
        </div>
      ) : (
        <div className='active-cart'>
          <ul>{makeCartList()}</ul>
          <div className='total'>
            <p>Order Total</p>
            <h3>{formatCurrency(getCartTotalAndCount(cartContents).total)}</h3>
          </div>
          <div className='carbon-neutral'>
            <p>
              This is a <strong>carbon neutral</strong> order
            </p>
          </div>
          <button className='large-button' onClick={handleOrderPlaced}>
            Confirm Order
          </button>
        </div>
      )}
    </aside>
  );
};

export default Cart;
