const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/ask", async (req, res) => {
  console.log("AI ROUTE HIT");

  try {
    const question = req.body.question;

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent",
      {
        contents: [
          {
            parts: [{ text: question }]
          }
        ]
      },
      {
        params: {
          key: process.env.AI_API_KEY
        },
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    const answer =
      response.data.candidates[0].content.parts[0].text;

    res.json({ answer });

  } catch (error) {
    console.error("AI ERROR FINAL:", error.response?.data || error.message);
    res.json({ answer: "AI error occurred" });
  }
});

module.exports = router;
