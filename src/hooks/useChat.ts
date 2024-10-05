import { useState } from "react";
import ChatbotService from "../services/chatbotService";

type MessageType = "computer" | "user" | "image";

interface Message {
  type: MessageType;
  message: string;
  url?: string;
}

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const sendMessage = async (message: string) => {
    const userMessage: Message = { type: "user", message };
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const responseMessage = await ChatbotService.sendMessage(message);
      const computerMessage: Message = {
        type: "computer",
        message: responseMessage,
      };
      setMessages((prevMessages) => [...prevMessages, computerMessage]);
    } catch (error) {
      console.error("Failed to send message:", error);
      const errorMessage: Message = {
        type: "computer",
        message:
          "I am sorry, right now I am not able to address your question :c",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    }
  };

  return { messages, sendMessage };
};

export default useChat;
