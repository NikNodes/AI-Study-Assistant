const express = require("express");
const StudyPlan = require("../models/StudyPlan");

const router = express.Router();

/* Add plan */
router.post("/add", async (req, res) => {
  try {
    const plan = new StudyPlan(req.body);
    await plan.save();
    res.json({ message: "Study plan saved" });
  } catch (err) {
    res.status(500).json({ message: "Error saving plan" });
  }
});

/* Get user plans */
router.get("/:userId", async (req, res) => {
  try {
    const plans = await StudyPlan.find({ userId: req.params.userId });
    res.json(plans);
  } catch (err) {
    res.status(500).json({ message: "Error fetching plans" });
  }
});

module.exports = router;
