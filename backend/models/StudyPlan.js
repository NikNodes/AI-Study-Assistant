const mongoose = require("mongoose");

const studyPlanSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  subject: String,
  hoursPerDay: Number,
  deadline: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("StudyPlan", studyPlanSchema);
