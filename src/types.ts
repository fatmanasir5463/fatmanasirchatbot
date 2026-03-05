import { GoogleGenAI } from "@google/genai";

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export const getBotResponse = async (input: string): Promise<string> => {
  const text = input.toLowerCase().trim();

  // 1. Local Overrides (Specific requirements from prompt)
  
  // Greetings
  if (/^(hello|hi|hey|greetings|hola)/.test(text)) {
    return "Hi there! How can I help you today? 👋";
  }

  // Time
  if (text.includes('time')) {
    return `The current time is ${new Date().toLocaleTimeString()}. 🕒`;
  }

  // Date
  if (text.includes('date') || text.includes('today')) {
    return `Today is ${new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}. 📅`;
  }

  // Weather
  if (text.includes('weather')) {
    return "You can check your local weather using Google or a weather app. I don't have access to your live location sensors yet! ☀️";
  }

  // Help
  if (text.includes('help') || text.includes('what can you do')) {
    return "You can ask me general questions, and I'll do my best to help. Try asking about history, science, or for some advice! 💡";
  }

  // Small Talk
  if (text.includes('how are you')) {
    return "I'm doing great, thank you for asking! Just here and ready to help. How are you doing? 😊";
  }

  // 2. Gemini AI for General Knowledge (The "Brain")
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: input,
      config: {
        systemInstruction: "You are Nova, a helpful and friendly AI assistant. Keep your responses concise, professional, and helpful. Use emojis occasionally to stay friendly.",
      }
    });

    if (response.text) {
      return response.text;
    }
  } catch (error) {
    console.error("Gemini API Error:", error);
  }

  // 3. Fallback (If Gemini fails or is unavailable)
  return "I'm not sure about that yet, but I'm learning more every day! Feel free to ask me something else. 🚀";
};
