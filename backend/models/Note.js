const mongoose = require("mongoose");

const NoteSchema = new mongoose.Schema({
  filename: String,
  originalname: String,
  uploadedAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model("Note", NoteSchema);
