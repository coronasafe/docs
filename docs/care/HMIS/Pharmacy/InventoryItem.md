# Inventory Item

### Summary

The **InventoryItem** resource represents the availability of a specific product at a given location. It is primarily used for inventory management within healthcare facilities, ensuring accurate tracking of stock levels for medications and other products.

Inventory items are automatically created and updated, typically when a supply delivery is marked as completed.

---

### Key Purpose

- Track the availability and quantity of products at specific locations.
- Facilitate inventory management and auditing processes.
- Support automated updates based on supply deliveries.
- Indicate the active or inactive status of inventory items.

---

---

### Supported Fields

| Field Name        | Type      | Description                                        |
| ----------------- | --------- | -------------------------------------------------- |
| `product`         | Reference | Reference to the product being tracked.            |
| `net_content`     | Quantity  | Quantity of the product available at the location. |
| `status`          | code      | Current status of the inventory item.              |
| `expiration_date` | date      | date of expiry                                     |
| `Batch`           | string    | Batch Number                                       |

---

### Functional Workflow

1. **Supply Delivery Completion**: When a supply delivery is marked as completed, corresponding inventory items are automatically created or updated to reflect the new stock levels.
2. **Inventory Updates**: Any changes in stock levels, such as dispensing or receiving products, result in automatic updates to the inventory items.
3. **Status Management**: Inventory items can be marked as inactive to indicate that they are no longer actively dispensed, possibly due to damage or other concerns.
4. **Inventory Auditing**: Regular audits can be conducted by reviewing the inventory items, their statuses, and quantities to ensure accurate stock management.
