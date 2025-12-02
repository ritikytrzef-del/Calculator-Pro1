import React, { useState } from 'react';
import { Send, Sparkles } from 'lucide-react';

interface AIInputProps {
  onSolve: (query: string) => void;
  isThinking: boolean;
}

const AIInput: React.FC<AIInputProps> = ({ onSolve, isThinking }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() && !isThinking) {
      onSolve(input);
      // We don't clear input immediately so user can reference what they asked, 
      // but maybe clearing is better UX for calculator? Let's clear.
      setInput(''); 
    }
  };

  return (
    <div className="w-full animate-in fade-in slide-in-from-bottom-4 duration-500">
      <form onSubmit={handleSubmit} className="relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-primary-500 to-purple-600 rounded-xl blur opacity-20 group-hover:opacity-40 transition duration-500"></div>
        <div className="relative flex items-center bg-gray-900 rounded-xl border border-gray-800 p-1.5 focus-within:border-primary-500/50 focus-within:ring-1 focus-within:ring-primary-500/50 transition-all">
          <div className="pl-3 text-gray-500">
            <Sparkles className="w-5 h-5" />
          </div>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type a math problem (e.g., 'Derivative of x^2')..."
            className="w-full bg-transparent border-none focus:ring-0 text-white placeholder-gray-500 px-3 py-3 text-lg"
            disabled={isThinking}
          />
          <button
            type="submit"
            disabled={!input.trim() || isThinking}
            className={`p-3 rounded-lg transition-all duration-200 ${
              input.trim() && !isThinking
                ? 'bg-primary-600 text-white hover:bg-primary-500 shadow-lg shadow-primary-500/20' 
                : 'bg-gray-800 text-gray-500 cursor-not-allowed'
            }`}
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </form>
      <div className="mt-2 text-xs text-gray-500 text-center">
        Powered by Gemini 3.0 Pro. Can solve complex algebra, calculus, and physics problems.
      </div>
    </div>
  );
};

export default AIInput;