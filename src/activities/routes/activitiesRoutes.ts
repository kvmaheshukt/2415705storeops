import { Router } from "express";
import { getActivities, createActivity } from "../service/activitiesService";

const router = Router();

router.get("/", async (_req, res) => {
  const data = await getActivities();
  res.json(data);
});

router.post("/", async (req, res) => {
  try {
    const activity = await createActivity(req.body);
    res.status(201).json(activity);
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

export default router;
