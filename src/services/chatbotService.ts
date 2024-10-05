import axios from "axios";

const VITE_BACKEND_URL = import.meta.env.VITE_BACKEND_URL;

class ChatbotService {
  async sendMessage(message: string): Promise<string> {
    try {
      const response = await axios.post(
        `${VITE_BACKEND_URL}/api/v1/messages/`,
        { message }
      );
      return response.data.response;
    } catch (error) {
      console.error("Error sending message:", error);
      throw new Error("Failed to send message");
    }
  }
}

export default new ChatbotService();
