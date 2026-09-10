import { Router } from "express";
import { getProgrammes, createProgramme } from "../service/programmesService";

const router = Router();

router.get("/", async (_req, res) => {
  const data = await getProgrammes();
  res.json(data);
});

router.post("/", async (req, res) => {
  try {
    const programme = await createProgramme(req.body);
    res.status(201).json(programme);
  } catch (err: any) {
    res.status(err.statusCode || 500).json({ error: err.message });
  }
});

export default router;
