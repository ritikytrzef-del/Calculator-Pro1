import React, { useState, useEffect, useRef } from 'react';
import { Calculator, History as HistoryIcon, Sparkles, X, Menu } from 'lucide-react';
import CalculatorKeypad from './components/CalculatorKeypad';
import Display from './components/Display';
import AIInput from './components/AIInput';
import HistoryPanel from './components/HistoryPanel';
import { useCalculator } from './hooks/useCalculator';
import { CalculationHistoryItem } from './types';

const App: React.FC = () => {
  const [isHistoryOpen, setIsHistoryOpen] = useState(false);
  const [mode, setMode] = useState<'standard' | 'ai'>('standard');
  
  // Custom hook for calculator logic
  const {
    expression,
    result,
    history,
    addToHistory,
    handleKeyPress,
    evaluateExpression,
    setExpression,
    setResult,
    isLoadingAI
  } = useCalculator();

  const toggleHistory = () => setIsHistoryOpen(!isHistoryOpen);

  return (
    <div className="flex h-screen w-full bg-gray-950 text-gray-100 font-sans overflow-hidden selection:bg-primary-500/30">
      
      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-full relative transition-all duration-300 ease-in-out">
        
        {/* Header / Navbar */}
        <header className="flex justify-between items-center p-4 md:p-6 bg-gray-900/50 backdrop-blur-md border-b border-gray-800 z-10">
          <div className="flex items-center gap-2">
            <div className="bg-primary-500/20 p-2 rounded-lg">
              <Calculator className="w-6 h-6 text-primary-400" />
            </div>
            <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-primary-400 to-purple-400 bg-clip-text text-transparent">
              Calculator Pro
            </h1>
          </div>
          
          <div className="flex items-center gap-2 bg-gray-800/50 p-1 rounded-full border border-gray-700/50">
            <button
              onClick={() => setMode('standard')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                mode === 'standard' 
                  ? 'bg-gray-700 text-white shadow-sm' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Standard
            </button>
            <button
              onClick={() => setMode('ai')}
              className={`flex items-center gap-1.5 px-4 py-1.5 rounded-full text-sm font-medium transition-all duration-200 ${
                mode === 'ai' 
                  ? 'bg-indigo-600 text-white shadow-sm shadow-indigo-500/20' 
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              AI Solver
            </button>
          </div>

          <button 
            onClick={toggleHistory}
            className="p-2 hover:bg-gray-800 rounded-lg transition-colors text-gray-400 hover:text-white"
            aria-label="Toggle History"
          >
            <HistoryIcon className="w-5 h-5" />
          </button>
        </header>

        {/* Calculator Body */}
        <main className="flex-1 flex flex-col max-w-4xl mx-auto w-full p-4 md:p-8 gap-4 overflow-hidden">
          
          <Display 
            expression={expression} 
            result={result} 
            mode={mode}
            isThinking={isLoadingAI}
          />

          <div className="flex-1 min-h-0 relative">
             {mode === 'standard' ? (
                <div className="h-full flex flex-col justify-end pb-4">
                  <CalculatorKeypad onKeyPress={handleKeyPress} />
                </div>
             ) : (
                <div className="h-full flex flex-col">
                  <AIInput 
                    onSolve={(query) => handleKeyPress('AI_SOLVE', query)} 
                    isThinking={isLoadingAI}
                  />
                  {/* Quick hints or suggestions could go here */}
                  <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3 opacity-60">
                    <div className="p-3 border border-gray-800 rounded text-sm text-gray-400 hover:border-gray-600 transition cursor-pointer" onClick={() => handleKeyPress('AI_SOLVE', "Solve for x: 3x^2 + 2x - 5 = 0")}>
                        Solve for x: 3x^2 + 2x - 5 = 0
                    </div>
                    <div className="p-3 border border-gray-800 rounded text-sm text-gray-400 hover:border-gray-600 transition cursor-pointer" onClick={() => handleKeyPress('AI_SOLVE', "Convert 150 USD to EUR")}>
                        Convert 150 USD to EUR
                    </div>
                     <div className="p-3 border border-gray-800 rounded text-sm text-gray-400 hover:border-gray-600 transition cursor-pointer" onClick={() => handleKeyPress('AI_SOLVE', "Derivative of sin(x) * cos(x)")}>
                        Derivative of sin(x) * cos(x)
                    </div>
                    <div className="p-3 border border-gray-800 rounded text-sm text-gray-400 hover:border-gray-600 transition cursor-pointer" onClick={() => handleKeyPress('AI_SOLVE', "Explain the Pythagorean theorem")}>
                        Explain the Pythagorean theorem
                    </div>
                  </div>
                </div>
             )}
          </div>

        </main>

      </div>

      {/* History Side Panel */}
      <div 
        className={`fixed inset-y-0 right-0 w-80 bg-gray-900 border-l border-gray-800 shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isHistoryOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <HistoryIcon className="w-5 h-5 text-gray-400" />
            History
          </h2>
          <button 
            onClick={toggleHistory}
            className="p-1 hover:bg-gray-800 rounded text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <HistoryPanel 
          history={history} 
          onSelect={(item) => {
            setExpression(item.expression);
            setResult(item.result);
            if (window.innerWidth < 768) setIsHistoryOpen(false);
          }}
          onClear={() => {
              // In a real app we would clear history state here
          }}
        />
      </div>

      {/* Mobile Overlay for History */}
      {isHistoryOpen && (
        <div 
          className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 md:hidden"
          onClick={toggleHistory}
        />
      )}

    </div>
  );
}

export default App;