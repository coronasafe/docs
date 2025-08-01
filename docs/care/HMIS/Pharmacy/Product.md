# Product

### Summary

A product in Care refers to anything that can be purchasable from the facility, this could be [medication](https://build.fhir.org/medication.html), [nutritional product](https://build.fhir.org/nutritionproduct.html) or consumables. All of these items can be requested through Medication request for a patient ( The terminology is confusion, but it made sense at the time ), requested products are dispensed through Medication Dispense.

Since product is a culmination of multiple resources references maintained by FHIR, It should be possible to create resources of theses types when creating integrations with FHIR, the spec for the Product resource will deviate from FHIR significantly while still being able to create the individual resourse when needed.

Product is an instantiation of Product Knowledge, All relevant details will always be present in Product Knowledge, the Product resource will only capture data that is unique to the particular batch in question, like batch no, expiry etc..

A Product will have a link to a charge item definition as well, this can help create charge items whenever this particular medication is billed.

---

### Key Purpose

- Represent purchasable items within the facility.
- Differentiate between general product information (Product Knowledge) and batch-specific details.
- Integrate with billing systems through Charge Item Definitions.
- Ensure compatibility with FHIR resources for interoperability.

---

### Core Data Structure – Essential Fields

- **`product_knowledge`**: Reference to the Product Knowledge resource containing general information about the product.
- **`batch_number`**: The specific batch number of the product.
- **`expiry_date`**: The expiration date of the product batch.
- **`charge_item_definition`**: Reference to the Charge Item Definition associated with the product.
- **`status`**: Current status of the product (e.g., active, inactive).

---

### Core Relationships

| Field                    | Reference Resource   | Description                                  |
| ------------------------ | -------------------- | -------------------------------------------- |
| `product_knowledge`      | ProductKnowledge     | General information about the product.       |
| `charge_item_definition` | ChargeItemDefinition | Billing details associated with the product. |

---

### Supported Fields

| Field Name               | Type      | Description                                             |
| ------------------------ | --------- | ------------------------------------------------------- |
| `product_knowledge`      | Reference | Link to the general product information.                |
| `batch_number`           | string    | Unique identifier for the product batch.                |
| `expiry_date`            | date      | Expiration date of the product batch.                   |
| `charge_item_definition` | Reference | Link to the billing definition for the product.         |
| `status`                 | code      | Current status of the product (e.g., active, inactive). |

---

### Functional Workflow

1. **Product Knowledge Creation**: General information about a product is entered into the Product Knowledge resource.
2. **Product Instantiation**: For each batch received, a Product resource is created, referencing the Product Knowledge and including batch-specific details.
3. **Billing Integration**: The Product resource links to a Charge Item Definition, ensuring accurate billing when the product is dispensed.
4. **Dispensing Process**: Products are dispensed to patients through the Medication Dispense process, with all relevant information captured.

---
