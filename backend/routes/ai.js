const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/ask", async (req, res) => {
  try {
    const question = req.body.question;

    const response = await axios.post(
      `https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=${process.env.AI_API_KEY}`,
      {
        contents: [
          {
            parts: [{ text: question }]
          }
        ]
      },
      {
        headers: { "Content-Type": "application/json" }
      }
    );

    const answer =
      response.data.candidates[0].content.parts[0].text;

    res.json({ answer });
  } catch (err) {
    console.error("AI ERROR FULL:", err.response?.data || err.message);
    res.json({ answer: "AI error occurred" });
  }
});

module.exports = router;
