import React from 'react';
import { KeyConfig } from '../types';

interface CalculatorKeypadProps {
  onKeyPress: (key: string) => void;
}

const keys: KeyConfig[] = [
  { label: 'C', value: 'AC', type: 'action', className: 'text-red-400 bg-red-400/10 hover:bg-red-400/20' },
  { label: '(', value: '(', type: 'function' },
  { label: ')', value: ')', type: 'function' },
  { label: '÷', value: '/', type: 'operator', className: 'text-primary-400 bg-primary-400/10' },

  { label: 'sin', value: 'sin(', type: 'function', className: 'text-xs' },
  { label: 'cos', value: 'cos(', type: 'function', className: 'text-xs' },
  { label: 'tan', value: 'tan(', type: 'function', className: 'text-xs' },
  { label: '^', value: '^', type: 'operator' },

  { label: '7', value: '7', type: 'number' },
  { label: '8', value: '8', type: 'number' },
  { label: '9', value: '9', type: 'number' },
  { label: '×', value: '*', type: 'operator', className: 'text-primary-400 bg-primary-400/10' },

  { label: '4', value: '4', type: 'number' },
  { label: '5', value: '5', type: 'number' },
  { label: '6', value: '6', type: 'number' },
  { label: '-', value: '-', type: 'operator', className: 'text-primary-400 bg-primary-400/10' },

  { label: '1', value: '1', type: 'number' },
  { label: '2', value: '2', type: 'number' },
  { label: '3', value: '3', type: 'number' },
  { label: '+', value: '+', type: 'operator', className: 'text-primary-400 bg-primary-400/10' },

  { label: '0', value: '0', type: 'number', className: 'col-span-2 rounded-2xl w-full' },
  { label: '.', value: '.', type: 'number' },
  { label: '=', value: '=', type: 'action', className: 'bg-primary-600 text-white hover:bg-primary-500 shadow-lg shadow-primary-500/30' },
];

const CalculatorKeypad: React.FC<CalculatorKeypadProps> = ({ onKeyPress }) => {
  return (
    <div className="grid grid-cols-4 gap-3 md:gap-4 h-full">
      {keys.map((key) => (
        <button
          key={key.label}
          onClick={() => onKeyPress(key.value)}
          className={`
            relative overflow-hidden rounded-2xl p-4 text-xl md:text-2xl font-medium transition-all duration-200 active:scale-95
            flex items-center justify-center select-none
            ${key.type === 'number' ? 'bg-gray-800 text-white hover:bg-gray-750' : ''}
            ${key.type === 'function' ? 'bg-gray-800/50 text-gray-300 text-sm font-mono hover:bg-gray-800' : ''}
            ${!key.className?.includes('bg-') && key.type !== 'number' && key.type !== 'function' ? 'bg-gray-800 text-gray-200 hover:bg-gray-700' : ''}
            ${key.className || ''}
            ${key.label === '0' ? 'aspect-auto' : 'aspect-square md:aspect-auto'}
          `}
        >
          {key.label}
        </button>
      ))}
      <button 
        onClick={() => onKeyPress('DEL')}
        className="absolute bottom-4 left-4 md:hidden text-xs text-gray-500 p-2"
        style={{ display: 'none'}} // Hidden in grid, handle via standard layout if needed or add to grid
      >
        DEL
      </button>
    </div>
  );
};

export default CalculatorKeypad;