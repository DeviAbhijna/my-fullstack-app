import express from "express";
import multer from "multer";
import path from "path";

const app = express();
const PORT = process.env.PORT || 5000;

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + path.extname(file.originalname)),
});

const upload = multer({ storage });

// Upload route
app.post("/upload", upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "No file uploaded" });
  res.json({ message: "File uploaded successfully", file: req.file.filename });
});

// Serve uploaded files
app.use("/uploads", express.static("uploads"));

app.listen(PORT, () => console.log(`Backend running on port ${PORT}`));
