import React from "react"
import Select from "react-select";

type MenuProps = {
  setSelectedIngredients: React.Dispatch<React.SetStateAction<string[]>>;
}

const options = [
  { value: "鶏肉", label: "鶏肉"},
  { value: "にんじん", label: "にんじん"},
  { value: "じゃがいも", label: "じゃがいも"},
  { value: "玉ねぎ", label: "玉ねぎ"},
  { value: "いちご", label: "いちご"}
]

const Menu: React.FC<MenuProps> = ({setSelectedIngredients}) => {
  const handleChange = (ingredients: any) => {
    const selectedIngredients = ingredients ? ingredients.map((ing: any) => ing.value) : [];
    setSelectedIngredients(selectedIngredients);
  }
  return (
    <Select
      isMulti
      options={options}
      onChange={handleChange}
    />
  );
};

export default Menu;
