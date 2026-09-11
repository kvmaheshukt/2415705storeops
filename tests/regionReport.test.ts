import request from "supertest";
import express from "express";
import regionReportRoutes from "../src/reports/routes/regionReportRoutes";
import { regionReportRepo } from "../src/reports/repository/regionReportRepo";

const app = express();
app.use("/api/reports", regionReportRoutes);

describe("GET /api/reports/region/:id", () => {
  beforeEach(async () => {
    await regionReportRepo.reset();
    await regionReportRepo.setRegion("r1", [
      {
        id: "store1",
        activities: [
          { id: "t1", status: "DONE", category: "Stocking", dueDate: new Date().toISOString() },
          { id: "t2", status: "BLOCKED", category: "Cleaning", dueDate: new Date().toISOString() },
          { id: "t3", status: "PENDING", category: "Stocking", dueDate: new Date(Date.now() - 3600000).toISOString() }
        ]
      }
    ]);
  });

  it("should return aggregated report for region", async () => {
    const res = await request(app).get("/api/reports/region/r1");
    expect(res.status).toBe(200);
    expect(res.body.regionId).toBe("r1");
    expect(res.body.completionRate).toBeGreaterThanOrEqual(0);
    expect(res.body.blockedTasks).toContain("t2");
    expect(res.body.overdueByCategory.Stocking).toBeGreaterThan(0);
  });

  it("should return 404 for invalid region", async () => {
    const res = await request(app).get("/api/reports/region/invalid");
    expect(res.status).toBe(404);
  });
});
