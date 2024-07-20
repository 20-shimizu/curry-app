import React from "react";
import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { injectGlobal } from "@emotion/css";
import "./Chat.css"

type ChatProps = {
  response: string;
}
type DataType = {
  title: string;
  ingredients: string;
  how_to_make: string;
  point: string;
}

const Chat: React.FC<ChatProps> = ({response}) => {
  const [message, setMessage] = useState<string>("");

  //messageを**\nによって分割する
  const message_list = response.split("\n**");
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
      <button onClick={addRecipe}>レシピ保存</button>
      <div className="chat-container">
      <div className="chat-content">{response[0] == '*' ? <ReactMarkdown>{response}</ReactMarkdown> : response}</div>
      </div>
    </div>
  )
};

export default Chat;
