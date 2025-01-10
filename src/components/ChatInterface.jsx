import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

const ChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      setMessages([...messages, { type: 'user', content: input }]);
      setInput('');
      // OpenAI integration will go here
    }
  };

  return (
    <div className="absolute left-8 top-1/2 -translate-y-1/2 w-80 h-2/3 bg-black/30 backdrop-blur-md border border-purple-500/30">
      {/* Header */}
      <div className="p-3 border-b border-purple-500/30 bg-purple-900/20">
        <div className="flex items-center gap-2">
          <Sparkles className="w-4 h-4 text-purple-400" />
          <h2 className="text-base font-semibold text-white">Book of AI Oracle</h2>
        </div>
      </div>

      {/* Messages Container */}
      <div className="h-[calc(100%-7rem)] overflow-y-auto p-3 space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.type === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] p-2 ${
                message.type === 'user'
                  ? 'bg-purple-600/40 text-white'
                  : 'bg-purple-800/40 text-purple-100'
              }`}
            >
              {message.content}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <form onSubmit={handleSubmit} className="absolute bottom-0 left-0 right-0 p-3 bg-purple-900/20">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 bg-black/40 text-white border border-purple-500/30 px-3 py-1.5 focus:outline-none focus:border-purple-400 placeholder-purple-300/50 text-sm"
            placeholder="Ask the ancient wisdom..."
          />
          <button
            type="submit"
            className="bg-purple-600 hover:bg-purple-700 text-white p-1.5 transition-colors"
          >
            <Send className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;