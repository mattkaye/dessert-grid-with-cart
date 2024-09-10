import { useState } from "react";
import Dessert from "./components/dessert/Dessert";
import Cart from "./components/cart/Cart";
import { default as dessertData } from "./dessert-data.json";
import "./styles.css";

function App() {
  const [cartContents, setCartContents] = useState({});

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
        <Cart cartContents={cartContents} setCartContents={setCartContents} />
      </div>
    </div>
  );
}

export default App;
