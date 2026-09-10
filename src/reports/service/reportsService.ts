import { reportsRepo } from "../repository/reportsRepo";

export async function getStoreReport(storeId: string) {
  return reportsRepo.getStoreReport(storeId);
}

export async function getRegionReport(regionId: string) {
  return reportsRepo.getRegionReport(regionId);
}
