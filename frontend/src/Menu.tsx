import React, { useState } from "react"
import "./Menu.css"
import Select, { components, OptionProps } from "react-select";
import axios from "axios";

type MenuProps = {
  setResponse: React.Dispatch<React.SetStateAction<string>>;
}
type OptionType = {
  value: string;
  label: string;
}
interface Part {
  text: string;
}

const Menu: React.FC<MenuProps> = ({setResponse}) => {
  const [options, setOptions] = useState<OptionType[]>([
    { value: "鶏肉", label: "鶏肉"},
    { value: "にんじん", label: "にんじん"},
    { value: "じゃがいも", label: "じゃがいも"},
    { value: "玉ねぎ", label: "玉ねぎ"},
    { value: "いちご", label: "いちご"}]);
  const [inputText, setInputText] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const errorMessage = "食材を選択してください";

  const handleChange = (ingredients: any) => {
    const selectedIngredients = ingredients ? ingredients.map((ing: any) => ing.value) : [];
    setSelectedIngredients(selectedIngredients);
  }

  const sendMessage = async () => {
    if (selectedIngredients.length == 0) {
      setResponse(errorMessage);
    } else {
      let order = "以下の食材を全て使ったカレーのレシピを1つ作成し、考えてください。\n";
      let output_order = "ただし、出力の際には、まず特徴的でカレーを含むタイトルをそのタイトルだけで表示し、続けて材料を箇条書きで示し、作り方を示し、ポイントを箇条書きで述べよ。"
      selectedIngredients.map((ing) => {
        order = order + ing + "\n";
      })
      order = order + output_order + "\n";
      setResponse("レシピを考え中...");
      setIsLoading(true);
      try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
          {
            contents: [{ parts: [{text: order}]}],
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            timeout: 100000
          }
        );

        const responseContent = response.data.candidates[0].content;
        const responseParts = responseContent.parts.map((part: Part) => part.text).join("\n");

        setResponse(responseParts);

        setIsLoading(false);
      } catch (error) {
        console.error("Google API error:", error);

      }
    }
  };

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
      <button className="recipe-button">レシピを検索</button>
      <Select className="select"
        isMulti
        options={options}
        onChange={handleChange}
        components={{ Option: customOption }}
      />
      <button onClick={sendMessage} className="icon-button"><span className="icon">&#128269;</span></button>
      <div className="add-input">
        <input
          value={inputText}
          onChange={(event) => setInputText(event.target.value)}
          style={{padding:'10px'}}
        />
      </div>
      <button onClick={addOptions} className="add-button">追加</button>
    </div>
  );
};

export default Menu;
