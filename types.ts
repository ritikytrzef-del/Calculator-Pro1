export interface CalculationHistoryItem {
  id: string;
  expression: string;
  result: string;
  timestamp: number;
  type: 'standard' | 'ai';
}

export type KeyType = 
  | 'number' 
  | 'operator' 
  | 'action' 
  | 'function'
  | 'constant';

export interface KeyConfig {
  label: string;
  value: string;
  type: KeyType;
  className?: string; // Optional tailwind override
}

export interface CalculatorState {
  expression: string;
  result: string;
  history: CalculationHistoryItem[];
  memory: number;
}
