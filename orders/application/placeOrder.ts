import { inventoryRepo } from "../../inventory/infrastructure/repo";

export async function placeOrder({ itemId, qty }: { itemId: string; qty: number }) {
  const stock = await inventoryRepo.getStock(itemId);
  if (stock < qty) {
    throw new Error("InventoryError: insufficient stock");
  }
  await inventoryRepo.decrementStock(itemId, qty);
  return { status: 200, data: { orderId: "order-001", itemId, qty } };
}
