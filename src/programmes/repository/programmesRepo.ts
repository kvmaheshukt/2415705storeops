const programmes: any[] = [];

export const programmesRepo = {
  async list() {
    return programmes;
  },
  async add(programme: any) {
    programmes.push(programme);
    return programme;
  }
};
