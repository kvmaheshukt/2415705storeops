let regions: Record<string, any[]> = {};

export const regionReportRepo = {
  async getStores(regionId: string) {
    return regions[regionId] || null;
  },
  async setRegion(regionId: string, stores: any[]) {
    regions[regionId] = stores;
  },
  async reset() {
    regions = {};
  }
};
