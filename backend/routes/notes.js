const express = require("express");
const multer = require("multer");
const Note = require("../models/Note");

const router = express.Router();

// Multer storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  }
});

const upload = multer({ storage });

// Upload note API
router.post("/upload", upload.single("note"), async (req, res) => {
  try {
    const note = new Note({
      filename: req.file.filename,
      originalname: req.file.originalname
    });

    await note.save();
    res.json({ message: "Note uploaded successfully" });
  } catch (err) {
    res.status(500).json({ message: "Upload failed" });
  }
});

module.exports = router;
