# Supply Delivery

### Summary

The **Supply Delivery** resource in the CARE system records the delivery of healthcare-related items, such as medications, devices, or other supplies, to a specified location. It serves as a critical component in inventory management, ensuring accurate tracking of stock levels within healthcare facilities.

This resource aligns with FHIR's [SupplyDelivery](https://build.fhir.org/supplydelivery.html) resource, facilitating standardized communication and interoperability in supply chain processes.

---

### Key Purpose

- Document the delivery of healthcare items to specific locations.
- Facilitate inventory management by updating stock levels upon delivery.
- Support auditing and tracking of supply movements within the facility.
- Enable integration with supply requests and inventory systems for seamless operations.[MyDiagram](https://mydiagram.online/process-flow-diagram-healthcare/?utm_source=chatgpt.com)[HL7 Terminology+2OntoServer+2FHIR Build+2](https://tx.ontoserver.csiro.au/fhir/CodeSystem/supplydelivery-status?utm_source=chatgpt.com)

---

### Core Data Structure – Essential Fields

- **`supply_request`**: Reference to the associated Supply Request.
- **`status`**: Current status of the delivery (e.g., in-progress, completed, abandoned, entered-in-error).
- **`status_history`**: Audit trail of status changes for the delivery.
- **`delivery_type`**: Type of supply being delivered (e.g., medication, device).
- **`stage`**: Stage of the delivery process (e.g., dispatched, received).
- **`supplied_item_quantity`**: Quantity of the item delivered.
- **`supplied_item_condition`**: Condition of the item upon delivery (e.g., intact, damaged).
- **`supplied_item`**: Reference to the specific product delivered.
- **`origin`**: Location from which the item was dispatched.
- **`destination`**: Location to which the item was delivered.[MyDiagram](https://mydiagram.online/process-flow-diagram-healthcare/?utm_source=chatgpt.com)[InterSystems Documentation](https://docs.intersystems.com/irisforhealthlatest/csp/documatic/%25CSP.Documatic.cls?CLASSNAME=HS.FHIR.DTL.vDSTU2.Model.Resource.SupplyDelivery&LIBRARY=HSCUSTOM&utm_source=chatgpt.com)

---

### Core Relationships

| Field            | Reference Resource | Description                                  |
| ---------------- | ------------------ | -------------------------------------------- |
| `supply_request` | SupplyRequest      | The original request prompting the delivery. |
| `supplied_item`  | Product            | The specific item being delivered.           |
| `origin`         | Location           | The source location of the delivery.         |
| `destination`    | Location           | The target location for the delivery.        |

---

### Supported Fields

**Status Codes:**

- `in-progress`: Delivery is currently underway.
- `completed`: Delivery has been successfully completed.
- `abandoned`: Delivery was not completed.
- `entered-in-error`: Delivery record was created in error.[IdentiMedical](https://identimedical.com/the-importance-of-hospital-inventory-management/?utm_source=chatgpt.com)[FHIR Build](https://build.fhir.org/codesystem-supplydelivery-status.html?utm_source=chatgpt.com)

**Delivery Types:**

- `medication`: Delivery of medication items.
- `device`: Delivery of medical devices.
- `biologically-derived-product`: Delivery of biologically derived products.[Zus Health+2FHIR Build+2FHIR Build+2](https://build.fhir.org/supplydelivery-definitions.html?utm_source=chatgpt.com)

**Item Conditions:**

- `intact`: Item delivered in good condition.
- `damaged`: Item delivered with damage.
- `expired`: Item delivered past its expiration date.[Medplum+3CData Software+3Karexpert+3](https://cdn.cdata.com/help/KIJ/jdbc/pg_table-supplydelivery.htm?utm_source=chatgpt.com)

---

### Functional Workflow

1. **Initiation**: A Supply Request is finalized, prompting the creation of a corresponding Supply Delivery with the stage set to "dispatched."
2. **Dispatch**: Items are deducted from the inventory of the origin location upon dispatch.
3. **Receipt**: Upon arrival, the destination location verifies the quantity and condition of the items.
4. **Inventory Update**: If accepted, items are added to the destination's inventory.
5. **Discrepancy Handling**: If discrepancies or damages are noted, the delivery may be rejected, prompting a return to the origin and the creation of a new Supply Delivery.
6. **Audit Trail**: All status changes and actions are recorded in the status history for auditing purposes.
