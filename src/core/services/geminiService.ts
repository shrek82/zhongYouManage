
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeContract = async (text: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `请对以下医药行业合同内容进行摘要分析，列出核心风险点和关键条款：\n\n${text}`,
    config: {
      temperature: 0.7,
      topP: 0.95,
    }
  });
  return response.text;
};

export const generateContractSuggestion = async (requirements: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: `根据以下要求生成合规性建议：\n\n${requirements}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: Type.OBJECT,
        properties: {
          suggestions: {
            type: Type.ARRAY,
            items: { type: Type.STRING }
          },
          complianceLevel: { type: Type.STRING },
          priority: { type: Type.STRING }
        }
      }
    }
  });
  return JSON.parse(response.text || '{}');
};
