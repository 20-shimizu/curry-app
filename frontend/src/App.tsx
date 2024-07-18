import Chat from "./Chat"
import Menu from "./Menu"
import Recipes from "./Recipes"
import { useState } from "react";

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  return (
    <div>
      <Menu setSelectedIngredients={setSelectedIngredients} />
      <Chat selectedIngredients={selectedIngredients} />
      <Recipes />
    </div>
  );
};

export default App;
