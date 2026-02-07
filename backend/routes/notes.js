const express = require("express");
const multer = require("multer");
const Note = require("../models/Note");
const fs = require("fs");
const path = require("path");


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
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({ message: "userId is required" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const note = new Note({
      userId,
      filename: req.file.filename,
      originalname: req.file.originalname
    });

    await note.save();
    res.json({ message: "Note uploaded successfully" });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ message: "Upload failed: " + err.message });
  }
});

// Get user notes
router.get("/user/:userId", async (req, res) => {
  try {
    const notes = await Note.find({ userId: req.params.userId });
    res.json(notes);
  } catch (err) {
    console.error("Fetch error:", err);
    res.status(500).json({ message: "Error fetching notes" });
  }
});
router.delete("/:id", async (req, res) => {
  try {
    console.log("DELETE REQUEST ID:", req.params.id);

    const note = await Note.findById(req.params.id);
    console.log("FOUND NOTE:", note);

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    const filePath = path.join(__dirname, "../uploads", note.filename);
    console.log("FILE PATH:", filePath);

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
      console.log("FILE DELETED FROM DISK");
    } else {
      console.log("FILE NOT FOUND ON DISK");
    }

    await Note.findByIdAndDelete(req.params.id);
    console.log("NOTE DELETED FROM DB");

    res.json({ message: "Note deleted successfully" });
  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ message: "Delete failed" });
  }
});



module.exports = router;
