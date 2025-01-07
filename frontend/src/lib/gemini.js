import { GoogleGenerativeAI } from "@google/generative-ai";


const genAI = new GoogleGenerativeAI("AIzaSyDvNG5SNBYzEQiwdqb60J91cSFSNc-IG0Q");
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

export const generateFashionAnswer = async (query) => {
  try {
    const prompt = `
      You are a fashion expert. Answer the user's question in casual friendy way , keep the answers short , preferably 2-3 lines, ensuring it is strictly related to fashion.
      Query: "${query}"
      
      Provide the answer in Markdown format.
    `;

    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error answering fashion query:", error);
    return "Sorry, I couldn't answer that question. Please ensure it is fashion-related.";
  }
};
