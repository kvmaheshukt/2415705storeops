import { programmesRepo } from "../repository/programmesRepo";
import { AppError } from "../../shared/errors";

export async function getProgrammes() {
  return programmesRepo.list();
}

export async function createProgramme(programme: any) {
  if (!programme.name) {
    throw new AppError("VALIDATION_ERROR", "Programme name required", 400);
  }
  return programmesRepo.add(programme);
}
