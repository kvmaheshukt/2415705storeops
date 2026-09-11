import { regionReportRepo } from "../repository/regionReportRepo";
import { eventBus } from "../../shared/eventBus";
import { AppError } from "../../shared/errors";

export async function generateRegionReport(regionId: string) {
  const stores = await regionReportRepo.getStores(regionId);
  if (!stores) {
    throw new AppError("NOT_FOUND", "Region not found", 404);
  }

  const tasks = stores.flatMap(s => s.activities);

  const completionRate =
    tasks.length === 0 ? 0 : tasks.filter(t => t.status === "DONE").length / tasks.length;

  const overdueByCategory: Record<string, number> = {};
  const blockedTasks: string[] = [];

  for (const task of tasks) {
    if (task.status === "BLOCKED") blockedTasks.push(task.id);
    if (task.dueDate && new Date(task.dueDate) < new Date() && task.status !== "DONE") {
      overdueByCategory[task.category] = (overdueByCategory[task.category] || 0) + 1;
    }
  }

  const report = { regionId, completionRate, overdueByCategory, blockedTasks };

  eventBus.publish({
    type: "REGIONAL_ROLLUP",
    payload: report,
    timestamp: new Date().toISOString()
  });

  return report;
}
