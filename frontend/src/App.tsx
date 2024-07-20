import Chat from "./Chat"
import Menu from "./Menu"
import Recipes from "./Recipes"
import RecipeDetail from "./RecipeDetail";
import { useState } from "react";
import {Switch, Route} from "react-router-dom"
import "./App.css"
import { setSelectionRange } from "@testing-library/user-event/dist/utils";

type DataType = {
  id: number;
  title: string;
  ingredients: string;
  how_to_make: string;
  point: string;
  image_path: string;
}

function App() {
  const [response, setResponse] = useState<string>("");
  const [selectedRecipe, SetSelectedRecipe] = useState<DataType>({
    id: 10000,
    title: "",
    ingredients: "",
    how_to_make: "",
    point: "",
    image_path: ""
  });

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
            <Recipes setSelectedRecipe={SetSelectedRecipe}/>
          </div>}
        </Route>
        <Route exact path="/recipe">{
          <div>
            <RecipeDetail selectedRecipe={selectedRecipe} />
          </div>}
        </Route>
      </Switch>
    </div>
  );
};

export default App;
