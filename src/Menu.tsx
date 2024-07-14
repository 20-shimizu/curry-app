import React, { useState } from "react"
import "./Menu.css"
import Select from "react-select";

type MenuProps = {
  setSelectedIngredients: React.Dispatch<React.SetStateAction<string[]>>;
}
type Ingredient = {
  value: string;
  label: string;
}

const Menu: React.FC<MenuProps> = ({setSelectedIngredients}) => {
  const [options, setOptions] = useState<Ingredient[]>([
    { value: "鶏肉", label: "鶏肉"},
    { value: "にんじん", label: "にんじん"},
    { value: "じゃがいも", label: "じゃがいも"},
    { value: "玉ねぎ", label: "玉ねぎ"},
    { value: "いちご", label: "いちご"}]);
  const [inputText, setInputText] = useState("");

  const handleChange = (ingredients: any) => {
    const selectedIngredients = ingredients ? ingredients.map((ing: any) => ing.value) : [];
    setSelectedIngredients(selectedIngredients);
  }

  const addOptions = () => {
    const newIngredient = { value: inputText, label: inputText};
    const newOptions = [...options, newIngredient];
    setOptions(newOptions);
    setInputText("");
  }

  return (
    <div className="container">
      <Select className="select"
        isMulti
        options={options}
        onChange={handleChange}
      />
      <div className="inputContainer">
        <input
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
        />
        <button onClick={addOptions}>追加</button>
      </div>
    </div>
  );
};

export default Menu;
