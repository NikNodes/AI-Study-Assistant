const express = require("express");
const { GoogleGenerativeAI } = require("@google/generative-ai");

const router = express.Router();

const genAI = new GoogleGenerativeAI(process.env.AI_API_KEY);

router.post("/ask", async (req, res) => {
  console.log("AI ROUTE HIT");

  try {
    const question = req.body.question;

    const model = genAI.getGenerativeModel({
      model: "gemini-1.0-pro"

    });

    const result = await model.generateContent(question);
    const text = result.response.text();

    res.json({ answer: text });

  } catch (error) {
    console.error("AI FINAL ERROR:", error);
    res.json({ answer: "AI error occurred" });
  }
});

module.exports = router;
