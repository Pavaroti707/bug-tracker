import express from "express";
import Template from "../template";

import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import bugRoutes from "./routes/bug.routes";

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(compress());
app.use(helmet());
app.use(cors());
app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", bugRoutes);

app.get("/", (req, res) => {
  res.status(200).send(Template());
});
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  }
});

export default app;
