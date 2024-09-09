import Dessert from "./components/dessert/Dessert";
import Cart from "./components/cart/Cart";
import { default as dessertData } from "./dessert-data.json";
import "./styles.css";

function App() {
  return (
    <div className='app-wrapper'>
      <div className='outer-grid'>
        <section className='product-grid'>
          <h1>Desserts 🤤</h1>
          {dessertData.map((dessert) => (
            <Dessert key={dessert.name} data={dessert} />
          ))}
        </section>
        <Cart />
      </div>
    </div>
  );
}

export default App;
