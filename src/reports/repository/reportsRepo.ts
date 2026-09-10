const storeReports: Record<string, any> = {};
const regionReports: Record<string, any> = {};

export const reportsRepo = {
  async getStoreReport(storeId: string) {
    return storeReports[storeId] || { storeId, metrics: {} };
  },
  async getRegionReport(regionId: string) {
    return regionReports[regionId] || { regionId, metrics: {} };
  }
};
