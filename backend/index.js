import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connectDB from "./config/connectDB.js";
import router from "./routes/authRoutes.js";
import songRouter from "./routes/songRoutes.js"

dotenv.config();
const PORT = process.env.PORT || 5001;

const app = express();
app.use(express.json());

//connect your database
connectDB();

app.use(cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"].filter(Boolean),
    credentials: true,
}));

app.get("/", (req, res) => res.status(200).json({ status: "ok", message: "Music Player API running" }));
app.get("/api/health", (req, res) => res.status(200).json({ status: "ok" }));

app.use("/api/songs", songRouter);
app.use("/api/auth", router);


app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));