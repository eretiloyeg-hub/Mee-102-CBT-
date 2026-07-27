import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "10mb" }));

// Initialize Google Gen AI client lazy/safely
function getGeminiClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured in secrets.");
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        "User-Agent": "aistudio-build",
      },
    },
  });
}

// API Health
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

// API endpoint to generate CBT test questions on ANY topic
app.post("/api/generate-questions", async (req, res) => {
  try {
    const { topic, questionCount = 10, difficulty = "medium" } = req.body;

    if (!topic || typeof topic !== "string") {
      return res.status(400).json({ error: "A valid topic string is required." });
    }

    const count = Math.min(Math.max(1, parseInt(questionCount, 10) || 10), 200);

    const ai = getGeminiClient();

    const prompt = `Generate a high quality Computer Based Test (CBT) multiple-choice exam with exactly ${count} distinct multiple-choice questions on the topic/subject: "${topic}".
Difficulty level: ${difficulty}.
For each question, provide:
1. questionText: Clear, unambiguous test question statement.
2. options: An array of exactly 4 plausible option strings (A, B, C, D).
3. correctIndex: 0-based index (0, 1, 2, or 3) pointing to the correct option in the options array.
4. category: A short sub-topic name (e.g. "Concepts", "Calculations", "Theory").
5. explanation: A clear, educational explanation explaining WHY the correct option is right and why other options are incorrect.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              questionText: { type: Type.STRING },
              options: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
              },
              correctIndex: { type: Type.INTEGER },
              category: { type: Type.STRING },
              explanation: { type: Type.STRING },
            },
            required: ["questionText", "options", "correctIndex", "category", "explanation"],
          },
        },
      },
    });

    const rawText = response.text || "[]";
    const parsedQuestions = JSON.parse(rawText);

    // Format with unique IDs
    const formattedQuestions = parsedQuestions.map((q: any, idx: number) => ({
      id: `ai-${Date.now()}-${idx + 1}`,
      questionText: q.questionText,
      options: q.options || [],
      correctIndex: typeof q.correctIndex === "number" ? q.correctIndex : 0,
      category: q.category || topic,
      explanation: q.explanation || "No explanation provided.",
    }));

    return res.json({
      success: true,
      topic,
      questions: formattedQuestions,
    });
  } catch (error: any) {
    console.error("Error generating questions:", error);
    return res.status(500).json({
      error: "Failed to generate AI test questions.",
      details: error?.message || String(error),
    });
  }
});

// API endpoint to generate deep AI explanation for a question/answer got wrong
app.post("/api/explain-question", async (req, res) => {
  try {
    const { questionText, options, correctIndex, selectedIndex, userNote } = req.body;

    if (!questionText || !options || correctIndex === undefined) {
      return res.status(400).json({ error: "Missing required question parameters." });
    }

    const ai = getGeminiClient();

    const correctOption = options[correctIndex] || "Unknown";
    const selectedOption = selectedIndex !== null && selectedIndex !== undefined ? options[selectedIndex] : "No answer selected (Unattempted)";

    const prompt = `You are an expert academic tutor in a CBT Examination review.
Help the student understand this question they answered in their test.

QUESTION: "${questionText}"
OPTIONS:
${options.map((opt: string, i: number) => `${String.fromCharCode(65 + i)}. ${opt}`).join("\n")}

STUDENT'S SELECTION: ${selectedOption}
CORRECT ANSWER: ${correctOption} (Option ${String.fromCharCode(65 + correctIndex)})
${userNote ? `STUDENT QUERY/NOTE: "${userNote}"` : ""}

Provide a clear, detailed, step-by-step breakdown:
1. Key Concept: What key theory, law, or equation is tested here?
2. Why Option ${String.fromCharCode(65 + correctIndex)} ("${correctOption}") is 100% correct.
3. Why the student's selected choice ("${selectedOption}") was incorrect (if applicable).
4. Quick Memory Tip / Formula to remember for future exams.`;

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: prompt,
    });

    return res.json({
      success: true,
      explanation: response.text || "Detailed explanation generated.",
    });
  } catch (error: any) {
    console.error("Error explaining question:", error);
    return res.status(500).json({
      error: "Failed to generate explanation.",
      details: error?.message || String(error),
    });
  }
});

async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (_req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Apex CBT Server running on http://localhost:${PORT}`);
  });
}

startServer();
