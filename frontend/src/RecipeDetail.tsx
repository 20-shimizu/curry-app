import React from "react";
import "./RecipeDetail.css"
import ReactMarkdown from "react-markdown";
import "./Chat.css"
import { Link } from "react-router-dom";

type DataType = {
  id: number;
  title: string;
  ingredients: string;
  how_to_make: string;
  point: string;
  image_path: string;
}
type RecipeProps = {
  selectedRecipe: DataType
}

const RecipeDetail: React.FC<RecipeProps> = ({selectedRecipe}) => {
  const recipe = selectedRecipe.title + "\n" + selectedRecipe.ingredients + "\n" + selectedRecipe.how_to_make + "\n" + selectedRecipe.point;
  return (
    <div>
      <Link to="/database"><button>戻る</button></Link>
      <img src={`${process.env.PUBLIC_URL}/vbk.png`} alt="カレー" className="recipe-image" />
      <ReactMarkdown>{recipe}</ReactMarkdown>
    </div>
  )
};

export default RecipeDetail;
