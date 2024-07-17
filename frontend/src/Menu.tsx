import React, { useState } from "react"
import "./Menu.css"
import Select, { components, OptionProps } from "react-select";

type MenuProps = {
  setSelectedIngredients: React.Dispatch<React.SetStateAction<string[]>>;
}
type OptionType = {
  value: string;
  label: string;
}

const Menu: React.FC<MenuProps> = ({setSelectedIngredients}) => {
  const [options, setOptions] = useState<OptionType[]>([
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
    setOptions((prevOptions) => [...prevOptions, newIngredient]);
    setInputText("");
  }

  const deleteOptions = (optionToDelete: OptionType) => {
    setOptions((prevOptions) => prevOptions.filter((option) => option.value !== optionToDelete.value));
  }

  const customOption = (props: OptionProps<OptionType>) => {
    return (
      <components.Option {...props}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span>{props.data.label}</span>
          <button onClick={(e) => {
            e.stopPropagation();
            deleteOptions(props.data);
          }}>
            削除
          </button>
        </div>
      </components.Option>
    )
  }

  return (
    <div className="container">
      <Select className="select"
        isMulti
        options={options}
        onChange={handleChange}
        components={{ Option: customOption }}
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
