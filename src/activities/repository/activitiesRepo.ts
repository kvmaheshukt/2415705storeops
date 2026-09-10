const activities: any[] = [];

export const activitiesRepo = {
  async list() {
    return activities;
  },
  async add(activity: any) {
    activities.push(activity);
    return activity;
  }
};
