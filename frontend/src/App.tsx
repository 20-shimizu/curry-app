import Chat from "./Chat"
import Menu from "./Menu"
import DBTest from "./DBTest"
import { useState } from "react";

function App() {
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  return (
    <div>
      <Menu setSelectedIngredients={setSelectedIngredients} />
      <Chat selectedIngredients={selectedIngredients} />
      {/* <DBTest /> */}
    </div>
  );
};

export default App;
