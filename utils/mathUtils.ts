export const evaluateSafe = (expression: string): string => {
  try {
    // Sanitize input to only allow math chars
    // Allows digits, operators, parenthesis, decimals, and basic functions
    const sanitized = expression.replace(/[^0-9+\-*/().e\s^%cosintaqrglxpijm]/gi, '');
    
    // Replace visual operators with JS operators
    let jsExpression = sanitized
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/\^/g, '**')
      .replace(/π/g, 'Math.PI')
      .replace(/e/g, 'Math.E')
      .replace(/sin\(/g, 'Math.sin(')
      .replace(/cos\(/g, 'Math.cos(')
      .replace(/tan\(/g, 'Math.tan(')
      .replace(/sqrt\(/g, 'Math.sqrt(')
      .replace(/log\(/g, 'Math.log10(')
      .replace(/ln\(/g, 'Math.log(');

    // Handle percentage (simple case: number% -> number/100)
    // Note: Complex percentage logic (like 50 + 10%) is often ambiguous in calculators. 
    // We will treat x% as x/100 for now.
    jsExpression = jsExpression.replace(/(\d+(\.\d+)?)%/g, '($1/100)');

    // Safe evaluation using Function constructor (better than eval, still needs caution)
    // eslint-disable-next-line no-new-func
    const result = new Function(`return (${jsExpression})`)();
    
    // Format Result
    if (!isFinite(result) || isNaN(result)) return "Error";
    
    // Round to reasonable decimal places to avoid float precision errors
    const rounded = Math.round(result * 10000000000) / 10000000000;
    return String(rounded);
  } catch (error) {
    return "Error";
  }
};
