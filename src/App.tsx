import Dessert from "./components/Dessert";
import { default as dessertData } from "./dessert-data.json";
import "./styles.css";

function App() {
  console.log(dessertData);
  return (
    <div className='app-wrapper'>
      <div className='outer-grid'>
        <div className='product-grid'>
          <h1>Desserts 🤤</h1>
          <div>
            <Dessert /> 1
          </div>
          <div>
            <Dessert /> 2
          </div>
          <div>
            <Dessert /> 3
          </div>
          <div>
            <Dessert /> 4
          </div>
          <div>
            <Dessert /> 5
          </div>
          <div>
            <Dessert /> 6
          </div>
          <div>
            <Dessert /> 7
          </div>
          <div>
            <Dessert /> 8
          </div>
          <div>
            <Dessert /> 9
          </div>
        </div>
        <aside className='shopping-cart'>Shopping Cart</aside>
      </div>
    </div>
  );
}

export default App;
