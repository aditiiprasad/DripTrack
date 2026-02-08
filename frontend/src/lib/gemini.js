import { GoogleGenerativeAI } from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

if (!API_KEY) {
  console.error("❌ Missing Gemini API Key. Please check your .env file.");
}

const genAI = new GoogleGenerativeAI(API_KEY);

// Using the standard free model.
const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-flash",
    // We set a system instruction to enforce the persona globally
    systemInstruction: "You are a fashion expert. Answer the user's question in a casual friendly way. Keep the answers short, preferably 2-3 lines, ensuring it is strictly related to fashion. Provide the answer in Markdown format."
});

export const generateFashionAnswer = async (history) => {
  try {
    // 1. Separate history from the latest message
    const historyContext = history.slice(0, -1);
    const lastUserMessageText = history[history.length - 1].parts[0].text;

    // 2. Start the chat with context
    const chat = model.startChat({
      history: historyContext,
      generationConfig: { maxOutputTokens: 200 },
    });

    // 3. Send the message using your specific prompt format
    const formattedPrompt = `Query: "${lastUserMessageText}"`;

    const result = await chat.sendMessage(formattedPrompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Oops! My fashion sense is tingling... but I couldn't connect. Please try again later! 👗";
  }
};