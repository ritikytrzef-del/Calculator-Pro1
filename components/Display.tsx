import React, { useEffect, useRef } from 'react';
import ReactMarkdown from 'react-markdown';

interface DisplayProps {
  expression: string;
  result: string;
  mode: 'standard' | 'ai';
  isThinking: boolean;
}

const Display: React.FC<DisplayProps> = ({ expression, result, mode, isThinking }) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [expression, result, isThinking]);

  return (
    <div className="bg-gray-900 rounded-2xl p-6 shadow-inner border border-gray-800 flex flex-col justify-end min-h-[180px] md:min-h-[220px] relative overflow-hidden transition-all duration-300">
      {/* Background Gradient Effect */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-primary-600/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none"></div>

      {/* Input / Expression */}
      <div className="text-right w-full mb-2 z-10">
        <div className={`text-gray-400 font-mono tracking-wider break-all ${mode === 'ai' ? 'text-lg' : 'text-xl'}`}>
          {expression || (mode === 'ai' ? 'Ask me anything math related...' : '0')}
        </div>
      </div>

      {/* Output / Result */}
      <div 
        ref={scrollRef}
        className={`text-right w-full z-10 overflow-y-auto max-h-[300px] ${mode === 'ai' ? 'text-left' : 'text-right'}`}
      >
        {isThinking ? (
            <div className="flex justify-end items-center gap-2 text-primary-400 animate-pulse">
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-2 h-2 bg-primary-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
            </div>
        ) : (
            <div className={`font-medium tracking-tight break-words ${mode === 'ai' ? 'text-base md:text-lg text-gray-200' : 'text-4xl md:text-6xl text-white'}`}>
                {mode === 'ai' && result ? (
                    <div className="markdown-body prose prose-invert prose-sm max-w-none">
                        <ReactMarkdown>{result}</ReactMarkdown>
                    </div>
                ) : (
                    result || (expression ? '' : '')
                )}
            </div>
        )}
      </div>
    </div>
  );
};

export default Display;