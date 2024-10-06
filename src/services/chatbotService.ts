import axios from "axios";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
interface ChatBotResponse {
  response: string;
  img_url?: string[];
  references?: string[];
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
}

export default new ChatbotService();
