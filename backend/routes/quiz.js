const express = require("express");
const router = express.Router();
const Groq = require("groq-sdk");

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY
});

router.post("/generate", async (req, res) => {
  try {
    const { topic } = req.body;

    if (!topic) {
      return res.status(400).json({ error: "Topic is required" });
    }

    const prompt = `
Generate 5 multiple choice questions on the topic "${topic}".
Return ONLY valid JSON in this format:

[
  {
    "question": "Question text",
    "options": ["A", "B", "C", "D"],
    "answer": "Correct option"
  }
]
`;

    const response = await groq.chat.completions.create({
      model: "llama-3.1-8b-instant",
      messages: [{ role: "user", content: prompt }],
      temperature: 0.5
    });

    const aiText = response.choices[0].message.content;
    const quiz = JSON.parse(aiText);

    res.json(quiz);

  } catch (err) {
    console.error("QUIZ AI ERROR:", err);
    res.status(500).json({ error: "AI quiz generation failed" });
  }
});

module.exports = router;
