import { useState } from "react";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import Dessert from "./components/dessert/Dessert";
import Cart from "./components/cart/Cart";
import { default as dessertData } from "./dessert-data.json";
import "./styles.css";
import { formatCurrency, getCartTotalAndCount } from "./helpers";
import { CartItem } from "./custom-types";

function App() {
  const [cartContents, setCartContents] = useState({} as CartItem);

  const [open, setModalOpen] = useState(false);
  const handleCloseModal = () => {
    setModalOpen(false);
    setCartContents({});
  };

  const listConfirmedOrder = () => {
    return (
      <ul>
        {Object.keys(cartContents).map((dessertName) => (
          <li key={dessertName}>
            <img src={cartContents[dessertName].thumbnail} alt={dessertName} />
            <div>
              <p>{dessertName}</p>
              <p>
                {cartContents[dessertName].quantity}x{" "}
                <span>@{formatCurrency(cartContents[dessertName].price)}</span>
              </p>
            </div>
            <p className='line-item-total'>
              {formatCurrency(
                cartContents[dessertName].price *
                  cartContents[dessertName].quantity
              )}
            </p>
          </li>
        ))}
        <li>
          <p>Order Total</p>
          <h2>{formatCurrency(getCartTotalAndCount(cartContents).total)}</h2>
        </li>
      </ul>
    );
  };

  return (
    <div className='app-wrapper'>
      <div className='outer-grid'>
        <section className='product-grid'>
          <h1>Dessert Anyone? 🤤</h1>
          {dessertData.map((dessert) => (
            <Dessert
              key={dessert.name}
              data={dessert}
              setCartContents={setCartContents}
              cartContents={cartContents}
            />
          ))}
        </section>
        <Cart
          cartContents={cartContents}
          setCartContents={setCartContents}
          setModalOpen={setModalOpen}
        />
      </div>

      <Modal
        open={open}
        showCloseIcon={false}
        closeOnOverlayClick={false}
        closeOnEsc={false}
        classNames={{ modal: "modal-window" }}
        onClose={handleCloseModal}
        center
      >
        <div>
          <div className='order-confirmed-title'>
            <h1>Order Confirmed</h1>
            <img src='/svg/icon-order-confirmed.svg' alt='Order Complete' />
          </div>
          <small>We hope you enjoyed your food!</small>
        </div>
        <div className='order-summary'>{listConfirmedOrder()}</div>
        <button className='large-button' onClick={handleCloseModal}>
          Start New Order
        </button>
      </Modal>
    </div>
  );
}

export default App;
