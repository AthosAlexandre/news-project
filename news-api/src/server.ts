import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import router from "./routes";

dotenv.config();

const app = express();
app.use(cors({ origin: true }));
app.use(express.json());
app.use("/uploads", express.static(path.join(process.cwd(), process.env.UPLOAD_DIR || "uploads")));

app.use("/api", router);

const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`API rodando em http://localhost:${port}`);
});
