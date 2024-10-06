import { useState } from "react";
import ChatbotService from "../services/chatbotService";

type MessageType = "computer" | "user" | "image";

interface Message {
  type: MessageType;
  message: string;
  urls?: string[];
}

const useChat = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const sendMessage = async (message: string) => {
    const userMessage: Message = { type: "user", message };
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setLoading(true);

    try {
      const responseMessage = await ChatbotService.sendMessage(message);
      const computerMessage: Message = {
        type: "computer",
        message: responseMessage.response,
        urls: responseMessage?.img_url,
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
    } finally {
      setLoading(false);
    }
  };

  return { messages, sendMessage, loading };
};

export default useChat;
