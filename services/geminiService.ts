import { GoogleGenAI } from "@google/genai";

// Initialize the client. 
// Note: In a real environment, ensure process.env.API_KEY is available.
// If the key is missing, the service should handle it gracefully or UI should show prompt.
const getClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        console.error("API_KEY is missing from environment variables.");
        return null;
    }
    return new GoogleGenAI({ apiKey });
};

export const solveMathProblem = async (query: string): Promise<string> => {
    const client = getClient();
    if (!client) return "Error: API Key missing.";

    try {
        const response = await client.models.generateContent({
            model: "gemini-3-pro-preview",
            contents: query,
            config: {
                systemInstruction: `You are a highly capable mathematical assistant called 'Calculator Pro AI'. 
                Your goal is to solve math problems, unit conversions, and physics equations provided by the user.
                
                Rules:
                1. If the user asks for a direct calculation (e.g., "5 + 5", "integrate x^2"), provide the final answer clearly at the start.
                2. Use Markdown for formatting. Use LaTeX for complex math formulas if possible, but formatted in a way that is readable as plain text or code blocks if standard rendering isn't available.
                3. If the user asks for an explanation, provide a step-by-step breakdown.
                4. Be concise. Do not adhere to conversational pleasantries unless asked.
                5. If the input is not a math problem, politely steer the user back to math or science topics.
                
                Format your response such that the "result" is easily identifiable.`,
                thinkingConfig: {
                    thinkingBudget: 2048 // Enable thinking for complex reasoning
                }
            }
        });

        const text = response.text;
        return text || "Could not generate a response.";
    } catch (error: any) {
        console.error("Gemini API Error:", error);
        return `Error: ${error.message || "Failed to connect to AI service."}`;
    }
};
