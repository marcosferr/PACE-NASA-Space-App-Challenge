import axios from "axios";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

export interface Reference {
  label: string;
  url: string;
}

interface ChatBotResponse {
  response: string;
  img_url?: string[];
  references?: Reference[];
  followup_questions?: string[];
}

class ChatbotService {
  async sendMessage(message: string): Promise<ChatBotResponse> {
    try {
      const response = await axios.post(
        `${VITE_BACKEND_URL}/api/v1/messages/`,
        { message }
      );
      return response.data;
    } catch (error) {
      console.error("Error sending message:", error);
      throw new Error("Failed to send message");
    }
  }

  async getSpeech(message: string): Promise<ArrayBuffer> {
    try {
      const response = await axios.post(
        `${VITE_BACKEND_URL}/api/v1/tts`,
        { message },
        { responseType: "arraybuffer" }
      );
      return response.data;
    } catch (error) {
      console.error("Error generating speech:", error);
      throw new Error("Failed to generate speech");
    }
  }
}

export default new ChatbotService();
