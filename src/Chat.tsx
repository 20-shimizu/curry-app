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
      let order = "以下の食材を使ったカレーのレシピを考えてください。\n";
      selectedIngredients.map((ing) => {
        order = order + ing + "\n";
      })
      setInput(order);
      setIsLoading(true);
      try {
        const response = await axios.post(
          `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${process.env.REACT_APP_GOOGLE_API_KEY}`,
          {
            contents: [{ parts: [{text: input}]}],
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        const botResponse = response.data;
        let botMessageContent = "";

        if (
          botResponse &&
          botResponse.candidates &&
          botResponse.candidates.length > 0
        ) {
          const firstCandidate = botResponse.candidates[0].content;
          if (
            firstCandidate &&
            firstCandidate.parts &&
            firstCandidate.parts.length > 0
          ) {
            botMessageContent = firstCandidate.parts.map((part: Part) => part.text).join("\n");
          }
        }

        setMessage(botMessageContent);
        setIsLoading(false);
      } catch (error) {
        console.error("Google API error:", error);
      }
    }
  };

  const renderChatMessage = (message: string) => {
    return <ReactMarkdown>{message}</ReactMarkdown>;
  };

  return (
    <div>
      <button onClick={sendMessage}>Send</button>
      <div>{isLoading ? "レシピを考え中..." : ""}</div>
      <div>{renderChatMessage(message)}</div>
    </div>
  )
};

export default Chat;
