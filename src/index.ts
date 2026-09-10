import express from "express";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

// Example endpoint
app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.listen(port, () => {
  console.log(`StoreOps API running at http://localhost:${port}`);
});
