import { useState } from "react";
import ChatbotService, { Reference } from "../services/chatbotService";

type MessageType = "computer" | "user" | "image";

interface Message {
  type: MessageType;
  message: string;
  urls?: string[];
  references?: Reference[];
  followup_questions?: string[];
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
        references: responseMessage?.references,
        followup_questions: responseMessage?.followup_questions,
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

  const playTTS = async () => {
    if (messages.length === 0) return;

    const lastMessage = messages[messages.length - 1];
    if (lastMessage.type !== "computer") return;

    try {
      const audioBuffer = await ChatbotService.getSpeech(lastMessage.message);
      const audioContext = new window.AudioContext();
      const source = audioContext.createBufferSource();
      audioContext.decodeAudioData(audioBuffer, (buffer) => {
        source.buffer = buffer;
        source.connect(audioContext.destination);
        source.start(0);
      });
    } catch (error) {
      console.error("Failed to play TTS:", error);
    }
  };

  return { messages, sendMessage, loading, playTTS };
};

export default useChat;
