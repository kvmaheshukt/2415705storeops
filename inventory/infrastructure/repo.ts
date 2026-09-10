const inventory: Record<string, number> = { "item-123": 10 };

export const inventoryRepo = {
  async getStock(itemId: string) {
    return inventory[itemId] ?? 0;
  },
  async decrementStock(itemId: string, qty: number) {
    inventory[itemId] = (inventory[itemId] ?? 0) - qty;
  }
};
