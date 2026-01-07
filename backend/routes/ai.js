const express = require("express");
const axios = require("axios");

const router = express.Router();

router.post("/ask", async (req, res) => {
  try {
    const userQuestion = req.body.question;

    if (!userQuestion) {
      return res.json({ answer: "No question received" });
    }

    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=" +
        process.env.AI_API_KEY,
      {
        contents: [
          {
            parts: [{ text: userQuestion }]
          }
        ]
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    console.log("AI RAW RESPONSE:", JSON.stringify(response.data, null, 2));

    const aiReply =
      response.data.candidates?.[0]?.content?.parts?.[0]?.text;

    if (!aiReply) {
      return res.json({ answer: "No AI response generated" });
    }

    res.json({ answer: aiReply });

  } catch (error) {
    console.error("AI ERROR:", error.response?.data || error.message);
    res.status(500).json({ answer: "AI service error" });
  }
});

module.exports = router;
