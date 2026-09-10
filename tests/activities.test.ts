import request from "supertest";
import express from "express";
import activitiesRoutes from "../src/activities/routes/activitiesRoutes";

const app = express();
app.use(express.json());
app.use("/api/activities", activitiesRoutes);

describe("Activities API", () => {
  it("should list activities", async () => {
    const res = await request(app).get("/api/activities");
    expect(res.status).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should create activity", async () => {
    const res = await request(app)
      .post("/api/activities")
      .send({ name: "Test Activity" });
    expect(res.status).toBe(201);
    expect(res.body.name).toBe("Test Activity");
  });
});
