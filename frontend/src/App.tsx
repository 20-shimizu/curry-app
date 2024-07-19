import Chat from "./Chat"
import Menu from "./Menu"
import Recipes from "./Recipes"
import { useState } from "react";
import "./App.css"

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  return (
    <div>
      <Menu setSelectedIngredients={setSelectedIngredients} />
      {/* <div className="container"> */}
        <Chat selectedIngredients={selectedIngredients} />
        {/* <Recipes /> */}
      {/* </div> */}
    </div>
  );
};

export default App;
