import { Router } from "express";
import { getStoreReport, getRegionReport } from "../service/reportsService";

const router = Router();

router.get("/store/:storeId", async (req, res) => {
  const report = await getStoreReport(req.params.storeId);
  res.json(report);
});

router.get("/region/:regionId", async (req, res) => {
  const report = await getRegionReport(req.params.regionId);
  res.json(report);
});

export default router;
