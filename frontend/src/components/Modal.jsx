import React, { useState, useRef, useEffect } from "react";
import { generateFashionAnswer } from "../lib/gemini";
import ReactMarkdown from "react-markdown";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Modal = ({ onClose }) => {
  // 1. State & Refs (The Logic)
  const [messages, setMessages] = useState([
    { role: "model", parts: [{ text: "Hey! I'm your DripTrack stylist. Ask me anything about your outfit! ✨" }] }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // 2. Auto-scroll Effect
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // 3. Handle Send Message (With the Gemini Fix)
  const handleSendMessage = async () => {
    if (!input.trim()) return;

    // Add User Message to UI
    const newHistory = [...messages, { role: "user", parts: [{ text: input }] }];
    setMessages(newHistory);
    setInput("");
    setLoading(true);

    try {
      // Prepare History for API (Remove greeting to fix 400 error)
      const historyForApi = newHistory.slice(1).map(msg => ({
        role: msg.role === "model" ? "model" : "user",
        parts: [{ text: msg.parts[0].text }]
      }));

      // Call API
      const responseText = await generateFashionAnswer(historyForApi);
      
      setMessages(prev => [...prev, { role: "model", parts: [{ text: responseText }] }]);
    } catch (error) {
      setMessages(prev => [...prev, { role: "model", parts: [{ text: "I'm having trouble connecting. Check your internet or API Key!" }] }]);
    } finally {
      setLoading(false);
    }
  };

  // 4. Enter Key Handler
  const handleKeyPress = (e) => {
    if (e.key === "Enter") handleSendMessage();
  };

  // 5. The Render (Your Original UI)
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-custom-pink max-h-[90vh] w-11/12 md:w-1/2 rounded-xl p-6 flex flex-col border-black border border-b-4 border-r-4">
        
        {/* Header */}
        <h2 className="text-2xl font-shrikhand mb-4 text-white text-center" style={{ textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }}>
          Fashion Friend  <span className="ml-2 rounded-full border-black border border-b-4 border-r-4 bg-custom-purple py-1 px-2"> <i className="fas fa-robot"></i></span>
        </h2>

        {/* Chat Area */}
        <div className="flex-1 overflow-y-auto rounded-md p-4 mb-4 bg-white/10"> {/* Added slight bg for contrast */}
          {messages.map((msg, index) => {
            const isUser = msg.role === "user";
            return (
              <div key={index} className={`mb-3 flex ${isUser ? "justify-end" : "justify-start"}`}>
                <div className="flex items-center space-x-2">
                  {/* Robot Icon for Model */}
                  {!isUser && (
                    <span className="rounded-full border-black border border-b-4 border-r-4 bg-custom-purple py-1 px-2 text-xs text-white">
                      <i className="fas fa-robot"></i>
                    </span>
                  )}
                  
                  {/* Message Bubble */}
                  <div className={`px-4 py-2 font-bold border-black border border-b-4 border-r-4 rounded-2xl shadow-md text-sm ${isUser ? "bg-gray-200 text-black" : "bg-custom-purple text-white"}`}>
                    <ReactMarkdown>{msg.parts[0].text}</ReactMarkdown>
                  </div>
                </div>
              </div>
            );
          })}
          
          {/* Loading Indicator */}
          {loading && (
            <div className="mb-3 flex justify-start">
               <div className="flex items-center space-x-2">
                  <span className="rounded-full border-black border border-b-4 border-r-4 bg-custom-purple py-1 px-2 text-xs text-white">
                      <i className="fas fa-robot"></i>
                  </span>
                  <div className="px-4 py-2 font-bold border-black border border-b-4 border-r-4 rounded-2xl shadow-md text-sm bg-custom-purple text-white animate-pulse">
                    Thinking... 👗
                  </div>
               </div>
            </div>
          )}
          
          {/* Auto-scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="mt-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Ask a fashion-related question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 w-3/4 px-4 py-2 rounded-full border-black border border-b-4 border-r-4 font-shrikhand focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              onClick={handleSendMessage}
              disabled={loading}
              className={`p-2 w-1/4 border-black border border-b-2 border-r-2 hover:border-b-4 hover:border-r-4 rounded-full font-bold text-black ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-custom-blue"}`}
            >
              {loading ? "..." : "Send"}
            </button>
          </div>

          <button
            onClick={onClose}
            className="bg-custom-red text-white px-4 py-2 rounded-full font-bold border-black border border-r-2 border-b-2 hover:border-b-4 hover:border-r-4 transition-all duration-75 mt-4 w-full md:w-auto"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;