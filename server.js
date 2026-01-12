import app from "./app.js";

const PORT = process.env.PORT || 4000;

app.get("/", (req, res) => {
  res.json({ status: "OpsFlow API running" });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

