import { Router } from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import { createNews, getNews, listNews, updateNews } from "./news.controller";

const uploadDir = process.env.UPLOAD_DIR || "uploads";
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => cb(null, uploadDir),
  filename: (_req, file, cb) => {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const router = Router();

// GET /news
router.get("/news", listNews);

// GET /news/:id
router.get("/news/:id", getNews);

// POST /news (multipart: title, summary, body, image?)
router.post("/news", upload.single("image"), createNews);

// PUT /news/:id (multipart opcional)
router.put("/news/:id", upload.single("image"), updateNews);

export default router;
