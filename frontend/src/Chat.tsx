import React from "react";
import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";

type ChatProps = {
  selectedIngredients: string[];
}

interface Part {
  text: string;
}

const Chat: React.FC<ChatProps> = ({selectedIngredients}) => {
  const [input, setInput] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (selectedIngredients.length == 0) {
      setMessage("食材を選択してください");
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

  return (
    <div>
      <button onClick={sendMessage}>Send</button>
      <div>{isLoading ? "レシピを考え中..." : <ReactMarkdown>{message}</ReactMarkdown>}</div>
    </div>
  )
};

export default Chat;
