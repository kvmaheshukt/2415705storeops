import express from "express";
import activitiesRoutes from "./activities/routes/activitiesRoutes";
import programmesRoutes from "./programmes/routes/programmesRoutes";
import staffRoutes from "./staff/routes/staffRoutes";
import alertsRoutes from "./alerts/routes/alertsRoutes";
import reportsRoutes from "./reports/routes/reportsRoutes";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/activities", activitiesRoutes);
app.use("/api/programmes", programmesRoutes);
app.use("/api/staff", staffRoutes);
app.use("/api/alerts", alertsRoutes);
app.use("/api/reports", reportsRoutes);

app.listen(port, () => {
  console.log(`StoreOps API running at http://localhost:${port}`);
});
