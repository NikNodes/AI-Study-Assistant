const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
  userId: {
    type: String,        // 🔥 CHANGE ObjectId → String
    required: true
  },
  filename: String,
  originalname: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Note", noteSchema);
