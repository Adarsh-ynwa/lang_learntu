import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

export async function correct(req, res) {
  const { text } = req.body;

  try {
    const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // works with latest SDK

    const result = await model.generateContent([
      `Please correct the grammar and spelling of the following sentence without changing its meaning:\n\n"${text}"`
    ]);

    const corrected = result.response.text().trim();
    res.json({ corrected });
  } catch (err) {
    console.error("Gemini correction error:", err.message);
    res.status(err.status || 500).json({ error: err.message || "Correction failed." });
  }
}
