import { useState, useCallback } from 'react';
import { evaluateSafe } from '../utils/mathUtils';
import { CalculationHistoryItem } from '../types';
import { solveMathProblem } from '../services/geminiService';

export const useCalculator = () => {
  const [expression, setExpression] = useState('');
  const [result, setResult] = useState('');
  const [history, setHistory] = useState<CalculationHistoryItem[]>([]);
  const [isLoadingAI, setIsLoadingAI] = useState(false);

  const addToHistory = useCallback((expr: string, res: string, type: 'standard' | 'ai') => {
    const newItem: CalculationHistoryItem = {
      id: Date.now().toString(),
      expression: expr,
      result: res,
      timestamp: Date.now(),
      type
    };
    setHistory(prev => [newItem, ...prev]);
  }, []);

  const evaluateExpression = useCallback(() => {
    if (!expression) return;
    
    const res = evaluateSafe(expression);
    setResult(res);
    addToHistory(expression, res, 'standard');
    // After calculation, we might want to reset expression to result for next op
    // But usually standard calcs keep the expression visible until next key press
  }, [expression, addToHistory]);

  const handleAIRequest = useCallback(async (query: string) => {
    if (!query.trim()) return;
    
    setIsLoadingAI(true);
    setExpression(query);
    setResult("Thinking..."); // Temporary loading state in result
    
    try {
      const aiResponse = await solveMathProblem(query);
      setResult(aiResponse);
      addToHistory(query, aiResponse, 'ai');
    } catch (e) {
      setResult("Error connecting to AI.");
    } finally {
      setIsLoadingAI(false);
    }
  }, [addToHistory]);

  const handleKeyPress = useCallback((key: string, value?: string) => {
    if (key === 'AI_SOLVE') {
      if (value) handleAIRequest(value);
      return;
    }

    setResult(''); // Clear previous result on new input

    switch (key) {
      case 'AC':
        setExpression('');
        setResult('');
        break;
      case 'DEL':
        setExpression(prev => prev.slice(0, -1));
        break;
      case '=':
        evaluateExpression();
        break;
      default:
        setExpression(prev => prev + key);
        break;
    }
  }, [evaluateExpression, handleAIRequest]);

  return {
    expression,
    result,
    history,
    addToHistory,
    handleKeyPress,
    evaluateExpression,
    setExpression,
    setResult,
    isLoadingAI
  };
};
