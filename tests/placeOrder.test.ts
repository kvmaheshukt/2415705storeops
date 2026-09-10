import { placeOrder } from "../src/orders/application/placeOrder";
import { inventoryRepo } from "../src/inventory/infrastructure/repo";

test("should decrement inventory when order placed", async () => {
  const initialStock = await inventoryRepo.getStock("item-123");
  const result = await placeOrder({ itemId: "item-123", qty: 1 });

  expect(result.status).toBe(200);
  expect(await inventoryRepo.getStock("item-123")).toBe(initialStock - 1);
});
