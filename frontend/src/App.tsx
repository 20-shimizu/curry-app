import Chat from "./Chat"
import Menu from "./Menu"
import Recipes from "./Recipes"
import { useState } from "react";
import {Switch, Route} from "react-router-dom"
import "./App.css"

function App() {
  const [response, setResponse] = useState<string>("");
  return (
    <div>
      <Switch>
        <Route exact path="/">{
          <div>
            <Menu setResponse={setResponse} />
            <Chat response={response} />
          </div>}
        </Route>
        <Route exact path="/database">{
          <div>
            <Recipes />
          </div>}
        </Route>
      </Switch>
    </div>
    // <div>
    //   <Menu setResponse={setResponse} />
    //   {/* <div className="container"> */}
    //     <Chat response={response} />
    //     {/* <Recipes /> */}
    //   {/* </div> */}
    // </div>
  );
};

export default App;
