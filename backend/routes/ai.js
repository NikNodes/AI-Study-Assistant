const express = require("express");
const axios = require("axios");

const router = express.Router();

const GROQ_MODELS = [
  "mixtral-8x7b-32768",     // ⭐ very stable
  "llama-3.1-8b-instant",  // fallback
  "gemma-7b-it"            // fallback
];

router.post("/ask", async (req, res) => {
  console.log("GROQ AI ROUTE HIT");

  const question = req.body.question;

  for (let model of GROQ_MODELS) {
    try {
      console.log("Trying model:", model);

      const response = await axios.post(
        "https://api.groq.com/openai/v1/chat/completions",
        {
          model,
          messages: [
            { role: "system", content: "You are a helpful study assistant." },
            { role: "user", content: question }
          ]
        },
        {
          headers: {
            Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
            "Content-Type": "application/json"
          }
        }
      );

      return res.json({
        answer: response.data.choices[0].message.content,
        modelUsed: model
      });

    } catch (err) {
      console.error(`Model failed: ${model}`);
    }
  }

  res.status(503).json({
    answer:
      "AI service temporarily unavailable. Models are updating. Please try again later."
  });
});

module.exports = router;