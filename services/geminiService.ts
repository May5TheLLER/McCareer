import { GoogleGenAI, Type } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

// RAG Context expanded for all roles
const SIMULATED_RAG_CONTEXT = `
[文件類別：內部標準作業程序 SOP]

1. 職位：正職服務員 (Crew)
   - 核心原則：QSCV (品質 Quality、服務 Service、清潔 Cleanliness、價值 Value)。
   - 服務黃金標準：熱而新鮮。薯條保存期限為7分鐘，超過必須報廢。
   - 顧客應對：遇到顧客特殊需求（如去鹽、客製化），應優先滿足，展現「殷勤款待」。
   - 清潔規範：大廳桌面必須隨時保持清潔，發現髒亂需在 1 分鐘內處理。

2. 職位：襄理/培訓生 (Manager Trainee)
   - 核心職能：樓面管理 (Shift Management)、人員調度。
   - 尖峰時段規範 (12:00-13:00)：禁止非必要的人員休息或補貨。全員專注於生產線與櫃檯。
   - 危機處理：若 POS 機故障或設備異常，第一優先是「安撫顧客」，第二是「啟動備案(如手寫點餐)」，最後才是報修。
   - 團隊溝通：需使用具體、正向的指令引導服務員，而非責罵。

3. 職位：餐廳經理 (Restaurant Manager)
   - 核心職能：損益管理 (P&L)、人才發展、商圈經營。
   - 客訴升級處理：當顧客情緒失控時，經理必須親自出面。採用 L.A.S.T 原則 (Listen, Apologize, Solve, Thank)。
   - 營運決策：在食安風險與營收之間，永遠選擇食安。
   - 團隊士氣：需定期與員工進行 1-on-1 訪談，了解職涯規劃。

4. 職位：營運顧問 (Business Consultant)
   - 核心職能：多店策略規劃、品牌標準稽核、長期人才佈局。
   - 決策視角：不只看單店當下的獲利，要看長期的品牌聲譽與區域市佔率。
   - 輔導原則：針對績效落後的門市，需診斷是「人」的問題還是「系統」的問題。
`;

export const generateSimulationScenario = async (currentRole: string, difficulty: 'Easy' | 'Hard') => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: `Design a professional role-playing scenario for a user applying for the position of: ${currentRole}.
      Difficulty: ${difficulty}.
      
      Strictly base the scenario on the following Internal Documents (RAG Context): 
      ${SIMULATED_RAG_CONTEXT}
      
      Generate a situation specifically relevant to the responsibilities of a ${currentRole} found in the text above.

      The output must be a JSON object containing the scenario context, the question, and 3 distinct options (A, B, C).
      
      IMPORTANT: All text fields (context, question, options text, feedback) MUST be in Traditional Chinese (繁體中文).
      The skill names in 'primarySkill' should remain in English (e.g., Leadership, Communication).
      `,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            context: { type: Type.STRING, description: "The situation description in Traditional Chinese." },
            question: { type: Type.STRING, description: "The dilemma the user faces in Traditional Chinese." },
            options: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING, description: "A, B, or C" },
                  text: { type: Type.STRING, description: "The action text in Traditional Chinese." },
                  feedback: { type: Type.STRING, description: "Brief feedback on why this was good/bad in Traditional Chinese." },
                  primarySkill: { type: Type.STRING, description: "The main skill demonstrated (e.g., Leadership, Communication, Crisis Management)" }
                },
                required: ["id", "text", "feedback", "primarySkill"]
              }
            }
          },
          required: ["context", "question", "options"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text);
    }
    throw new Error("No response text");
  } catch (error) {
    console.error("Gemini API Error, falling back to static data", error);
    // Fallback based on role
    return {
      context: `(模擬資料) 你現在是${currentRole}。正值尖峰時段，現場發生突發狀況。`,
      question: "你會如何處理？",
      options: [
        { id: 'A', text: "依照 SOP 進行標準處置。", feedback: "穩健的選擇，符合規範。", primarySkill: "Adaptability" },
        { id: 'B', text: "尋求團隊支援並向上回報。", feedback: "良好的團隊溝通意識。", primarySkill: "Communication" },
        { id: 'C', text: "優先安撫顧客情緒。", feedback: "展現了以客為尊的精神。", primarySkill: "Customer Service" }
      ]
    };
  }
};