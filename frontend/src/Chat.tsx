import React from "react";
import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { injectGlobal } from "@emotion/css";
import "./Chat.css"

type ChatProps = {
  selectedIngredients: string[];
}
type DataType = {
  title: string;
  ingredients: string;
  how_to_make: string;
  point: string;
}

interface Part {
  text: string;
}

const Chat: React.FC<ChatProps> = ({selectedIngredients}) => {
  const [input, setInput] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const errorMessage = "食材を選択してください";

  const sendMessage = async () => {
    if (selectedIngredients.length == 0) {
      setMessage(errorMessage);
    } else {
      let order = "以下の食材を全て使ったカレーのレシピを1つ作成し、考えてください。\n";
      let output_order = "ただし、出力の際には、まず特徴的でカレーを含むタイトルをそのタイトルだけで表示し、続けて材料を箇条書きで示し、作り方を示し、ポイントを箇条書きで述べよ。"
      selectedIngredients.map((ing) => {
        order = order + ing + "\n";
      })
      order = order + output_order + "\n";
      setInput(order);
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

        setMessage(responseParts);

        setIsLoading(false);
      } catch (error) {
        console.error("Google API error:", error);

      }
    }
  };

  //messageを**\nによって分割する
  const message_list = message.split("\n**");
  //message_listの各要素の先頭に**を追加する
  message_list.forEach((value, index) => {
    if (index != 0) message_list[index] = "**" + value;
  });

  //title: タイトル, ingredients: 材料, how_to_make: 作り方, point: ポイント
  const [title, ingredients, how_to_make, point] = message_list;

  const addRecipe = async () => {
    const data: DataType = {
      title: title,
      ingredients: ingredients,
      how_to_make: how_to_make,
      point: point
    };
    try {
      await axios.post('/recipes/add', data);
      console.log("addbutton");
    } catch (error) {
      console.error('エラー:', error);
    }
  };


  return (
    <div>
      <button onClick={sendMessage} className="icon-button"><span className="icon">&#128269;</span></button>
      <div className="chat-container">
      <div className="chat-content">{isLoading ? "レシピを考え中..." : <ReactMarkdown>{message}</ReactMarkdown>}</div>
      </div>
    </div>
  )
};

export default Chat;
