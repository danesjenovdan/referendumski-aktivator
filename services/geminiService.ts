import { GoogleGenAI, Type } from "@google/genai";
import { ChecklistItem, AnalysisResponse } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeImpact = async (items: ChecklistItem[]): Promise<AnalysisResponse> => {
  const completedItems = items.filter(i => i.isCompleted);
  const totalImpact = items.reduce((acc, curr) => acc + curr.impact, 0);
  const currentImpact = completedItems.reduce((acc, curr) => acc + curr.impact, 0);
  const percentage = Math.round((currentImpact / totalImpact) * 100);

  const prompt = `
    Uporabnik izpolnjuje check-listo za dvig volilne udeležbe na referendumu o pomoči pri prostovoljnem končanju življenja.
    
    Kontekst: Kampanja "Moje življenje, moja pravica". Glasuje se ZA.
    Cilj je mobilizacija volivcev za pomembno družbeno vprašanje.
    
    Trenutno je uporabnik dosegel ${percentage}% potencialnega vpliva.
    
    Izpolnjene naloge:
    ${completedItems.map(i => `- ${i.text}`).join('\n')}
    
    Neizpolnjene naloge:
    ${items.filter(i => !i.isCompleted).map(i => `- ${i.text}`).join('\n')}

    Naloga:
    Generiraj kratek, motivacijski komentar v slovenščini. 
    Ton naj bo resen, a spodbuden in povezovalen.
    Če je rezultat nizek, poudari pomembnost vsakega glasu za prihodnost. 
    Če je visok, mu čestitaj za državljansko držo.
    Vrni JSON.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: "Kratek naziv za uporabnika (npr. 'Glasnik sprememb' ali 'Zaveden državljan')" },
            message: { type: Type.STRING, description: "2-3 stavki motivacije." },
            scoreEmoji: { type: Type.STRING, description: "En sam emoji." }
          },
          required: ["title", "message", "scoreEmoji"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text) as AnalysisResponse;
  } catch (error) {
    console.error("Error fetching AI analysis:", error);
    return {
      title: "Analiza v teku",
      message: "Tvoj glas in trud sta neprecenljiva. Nadaljuj z osveščanjem!",
      scoreEmoji: "❤️"
    };
  }
};