import { Router } from "express";
import { generateRegionReport } from "../service/regionReportService";

const router = Router();

router.get("/region/:id", async (req, res) => {
  try {
    const report = await generateRegionReport(req.params.id);
    res.json(report);
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

export default router;
