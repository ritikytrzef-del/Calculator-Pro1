import React from 'react';
import { CalculationHistoryItem } from '../types';
import { Sparkles, Calculator, Trash2 } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface HistoryPanelProps {
  history: CalculationHistoryItem[];
  onSelect: (item: CalculationHistoryItem) => void;
  onClear: () => void;
}

const HistoryPanel: React.FC<HistoryPanelProps> = ({ history, onSelect, onClear }) => {
  if (history.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center text-gray-500 p-8 text-center">
        <Calculator className="w-12 h-12 mb-4 opacity-20" />
        <p>No history yet.</p>
        <p className="text-sm mt-2 opacity-60">Calculations will appear here.</p>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto pb-20 p-4 space-y-3">
      {history.map((item) => (
        <button
          key={item.id}
          onClick={() => onSelect(item)}
          className="w-full text-left bg-gray-800/50 hover:bg-gray-800 border border-gray-700/50 rounded-xl p-4 transition-all duration-200 group relative overflow-hidden"
        >
            <div className={`absolute top-0 right-0 p-1.5 opacity-20 group-hover:opacity-100 transition-opacity ${item.type === 'ai' ? 'text-indigo-400' : 'text-primary-400'}`}>
                {item.type === 'ai' ? <Sparkles size={12} /> : <Calculator size={12} />}
            </div>
          <div className="text-sm text-gray-400 font-mono mb-1 truncate pr-6">{item.expression}</div>
          <div className={`text-lg font-semibold truncate ${item.type === 'ai' ? 'text-indigo-200' : 'text-white'}`}>
            {item.type === 'ai' ? (
                 <span className="text-xs italic opacity-70 line-clamp-2">Click to view answer</span>
            ) : (
                item.result
            )}
          </div>
        </button>
      ))}
    </div>
  );
};

export default HistoryPanel;