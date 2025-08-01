# Medication Dispense

### Summary

The **MedicationDispense** resource in FHIR records the details of medications that have been dispensed to a patient. It serves as both a completion to the workflow initiated by a MedicationRequest and as a tool for inventory management within a healthcare setting.

In inpatient (IP) settings, items may be dispensed and maintained in the patient's room and refilled as needed. In outpatient (OP) settings, dispensing typically occurs after an encounter has been completed.

A **ChargeItem** can be associated with each dispense. By default, the **ChargeItemDefinition** is used to create this ChargeItem.

---

### Key Purpose

- Document the supply of medications to patients.
- Complete the medication workflow initiated by a MedicationRequest.
- Support inventory management within healthcare facilities.
- Facilitate billing through associated ChargeItems.

---

### Core Relationships

| Field                      | Reference Resource | Description                                       |
| -------------------------- | ------------------ | ------------------------------------------------- |
| `product`                  | Product            | The product being dispensed.                      |
| `patient`                  | Patient            | The individual receiving the medication.          |
| `encounter`                | Encounter          | The encounter during which the dispense was made. |
| `location`                 | Location           | The location where the dispense occurred.         |
| `authorizing_prescription` | MedicationRequest  | The prescription that authorized the dispense.    |
| `charge_item`              | ChargeItem         | The associated charge for the dispensed item.     |

---

### Supported Fields

| Field Name            | Type       | Description                                        |
| --------------------- | ---------- | -------------------------------------------------- |
| `medicine`            | Reference  | Reference to the product being dispensed.          |
| `dosage_instructions` | Dosage     | Instructions on how the medication should be used. |
| `select_lot`          | Lot        | Lot number                                         |
| `expiry`              | string     | Expiry Date                                        |
| `quantity`            | Quantity   | Amount of medication dispensed.                    |
| `days_supply`         | Quantity   | Number of days the supply is intended to last.     |
| `price`               | Amount     | Price of the item                                  |
| `discount`            | Percentage | Applicable discount                                |
| `is_fully_dispensed`  | Checkbox   | Full or partial dispensed                          |

---

### Functional Workflow

1. **Initiation**: A MedicationRequest is created for a patient.
2. **Dispensing**: Based on the request, a MedicationDispense is recorded when the medication is prepared and handed over.
3. **Status Tracking**: The status of the dispense is updated throughout the process (e.g., from `preparation` to `completed`).
4. **Inventory Management**: The dispense record aids in managing inventory levels within the healthcare facility.
5. **Billing**: A ChargeItem is associated with the dispense for billing purposes.

---
