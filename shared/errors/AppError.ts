export class AppError extends Error {
  constructor(message: string, public code: string) {
    super(message);
  }
}

export class InventoryError extends AppError {
  constructor(message: string) {
    super(message, "INVENTORY_ERROR");
  }
}
