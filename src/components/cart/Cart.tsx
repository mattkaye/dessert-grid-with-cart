import { useState } from "react";
import useSound from "use-sound";
import orderCompleteSFX from "./order-complete.mp3";
import "./styles.css";

const Cart = () => {
  const [play] = useSound(orderCompleteSFX, { volume: 0.3 });
  return (
    <aside className='shopping-cart'>
      <h1>Your Cart (0)</h1>
      {/* <div className='empty-cart'>
        <img src='/svg/illustration-empty-cart.svg' alt='Empty Cart' />
        <small>Your added items will appear here</small>
      </div> */}
      <div className='active-cart'>
        <ul>
          <li>
            <h2>Vanilla Bean Crème Brûlée</h2>
            <div className='details'>
              <p>1x</p>
              <p>@ $100</p>
              <p>$100</p>
              <button className='remove-item'>
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
          <li>
            <h2>Vanilla Bean Crème Brûlée</h2>
            <div className='details'>
              <p>1x</p>
              <p>@ $100</p>
              <p>$100</p>
              <button className='remove-item'>
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
        </ul>
        <div className='total'>
          <p>Order Total</p>
          <h3>$100</h3>
        </div>
        <div className='carbon-neutral'>
          <p>
            This is a <strong>carbon neutral</strong> order
          </p>
        </div>
        <button className='checkout-button' onClick={play}>
          Confirm Order
        </button>
      </div>
    </aside>
  );
};

export default Cart;
