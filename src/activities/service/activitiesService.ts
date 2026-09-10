import { activitiesRepo } from "../repository/activitiesRepo";
import { AppError } from "../../shared/errors";

export async function getActivities() {
  return activitiesRepo.list();
}

export async function createActivity(activity: any) {
  if (!activity.name) {
    throw new AppError("VALIDATION_ERROR", "Activity name required", 400);
  }
  return activitiesRepo.add(activity);
}
