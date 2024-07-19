import Chat from "./Chat"
import Menu from "./Menu"
import Recipes from "./Recipes"
import { useState } from "react";
import "./App.css"

function App() {
  const [response, setResponse] = useState<string>("");
  return (
    <div>
      <Menu setResponse={setResponse} />
      {/* <div className="container"> */}
        <Chat response={response} />
        {/* <Recipes /> */}
      {/* </div> */}
    </div>
  );
};

export default App;
