# Sprint 1 – Place Order Flow

## Objective
Implement the "Place Order" use case in the Orders module, ensuring inventory decrement and event bus integration.

## Acceptance Criteria (BDD Style)

### GIVEN
- An item exists in the inventory with a known stock count.
- A customer submits an order for that item.

### WHEN
- The order is placed via `POST /api/v1/orders`.

### THEN
- The order is persisted in the Orders repository.
- The inventory count for the item is decremented by the ordered quantity.
- An `InventoryDecremented` event is published to the event bus.
- The API responds with:
  - `status: 200`
  - `data: { orderId, itemId, qty }`
- No direct repository writes occur across module boundaries.
- Any error uses the `AppError` hierarchy.
