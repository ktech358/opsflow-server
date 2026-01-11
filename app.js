import express from "express";
import authRoutes from "./routes/auth.routes.js";
import requestRoutes from "./routes/request.routes.js";
import auditRoutes from "./routes/audit.routes.js";




const app = express();

app.use(express.json());

app.use("/auth", authRoutes);
app.use("/requests", requestRoutes);
app.use("/audit-logs", auditRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});
app.get("/health", (req, res) => {
  res.status(200).json({ status: "OK" });
});


export default app;
