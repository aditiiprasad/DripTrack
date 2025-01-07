import React, { useState } from "react";
import { generateFashionAnswer } from "../lib/gemini";
import ReactMarkdown from "react-markdown";
import '@fortawesome/fontawesome-free/css/all.min.css';

const Modal = ({ onClose }) => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSendMessage = async () => {
    if (input.trim()) {
      setMessages([...messages, { user: true, text: input }]);
      setInput("");

      setLoading(true);
      try {
        const answer = await generateFashionAnswer(input);
        setMessages((prevMessages) => [
          ...prevMessages,
          { user: false, text: answer },
        ]);
      } catch (error) {
        setMessages((prevMessages) => [
          ...prevMessages,
          { user: false, text: "Error fetching the answer. Please try again." },
        ]);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-custom-pink max-h-[90vh] w-11/12 md:w-1/2 rounded-xl p-6 flex flex-col border-black border border-b-4 border-r-4">
        <h2 className="text-2xl font-shrikhand mb-4 text-white text-center" style={{ textShadow: "-1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000, 1px 1px 0 #000" }}>
          Fashion Friend  <span className="ml-2 rounded-full border-black border border-b-4 border-r-4 bg-custom-purple py-1 px-2"> <i className="fas fa-robot"></i></span>
        </h2>

   
        <div className="flex-1 overflow-y-auto rounded-md p-4 mb-4">
          {messages.map((message, index) => (
            <div key={index} className={`mb-3 flex ${message.user ? "justify-end" : "justify-start"}`}>
              <div className="flex items-center space-x-2">
                {!message.user && (
                  <span className="rounded-full border-black border border-b-4 border-r-4 bg-custom-purple py-1 px-2 text-xs text-white">
                    <i className="fas fa-robot"></i>
                  </span>
                )}
                <span className={`px-4 py-2 font-bold border-black border border-b-4 border-r-4 rounded-2xl shadow-md text-sm ${message.user ? "bg-gray-200 text-black" : "bg-custom-purple text-white"}`}>
                 
                  {message.user ? (
                    message.text
                  ) : (
                    <ReactMarkdown children={message.text} />
                  )}
                </span>
              </div>
            </div>
          ))}
        </div>

       
        <div className="mt-4">
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Ask a fashion-related question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 w-3/4 px-4 py-2 rounded-full border-black border border-b-4 border-r-4 font-shrikhand focus:outline-none focus:ring-2 focus:ring-black"
            />
            <button
              onClick={handleSendMessage}
              disabled={loading}
              className={`p-2 w-1/4 border-black border border-b-2 border-r-2 hover:border-b-4 hover:border-r-4 rounded-full font-bold text-black ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-custom-blue"}`}
            >
              {loading ? "Loading..." : "Send"}
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
