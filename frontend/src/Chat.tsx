import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import "./Chat.css"
type ChatProps = {
  response: string;
  img_url: string;
}
type DataType = {
  title: string;
  ingredients: string;
  how_to_make: string;
  point: string;
}

const Chat: React.FC<ChatProps> = ({response,img_url}) => {
  const [message, setMessage] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(false);

  //messageを**\nによって分割する
  const message_list = response.split("\n**");
  //message_listの各要素の先頭に**を追加する
  message_list.forEach((value, index) => {
    if (index !== 0) message_list[index] = "**" + value;
  });

  //title: タイトル, ingredients: 材料, how_to_make: 作り方, point: ポイント
  const [title, ingredients, how_to_make, point] = message_list;


const toggleSaveRecipe = async () => {
    const data: DataType = {
      title: title,
      ingredients: ingredients,
      how_to_make: how_to_make,
      point: point
    };
    if (response[0] == "*") {
      try {
        if (isSaved) {
          await axios.delete('/recipes/delete', {data: {id:0}}); // Endpoint to remove the recipe
          setIsSaved(false);
          console.log("Recipe removed");
        } else {
          // download_image();
          // await axios.post('/recipes/add', data);
          setIsSaved(true);
          console.log("Recipe added");
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const download_image = async () => {
    try {
      await axios.post("recipes/download", {img_url: img_url});
    }catch (error) {
      console.error('エラー:', error);
    }
  };

  useEffect(() => {
    setIsSaved(false);
  }, [response]);

  

  console.log(img_url)

  return (
    <div>
      
      <div className="chat-container">
      {/* <button className={`heart-button ${isSaved ? 'saved' : ''}`} onClick={toggleSaveRecipe}>❤️</button> */}
      <div className="button-container">
      <button className={isSaved?"red-heart":"white-heart"} onClick={toggleSaveRecipe}/>
      </div>
      <div className="chat-content">
        <img src={img_url} alt="recipe" width="1000" height="700"/>
        {response[0] === '*' ? <ReactMarkdown>{response}</ReactMarkdown> : response}
      </div>
      </div>
    </div>
  )
};

export default Chat;
