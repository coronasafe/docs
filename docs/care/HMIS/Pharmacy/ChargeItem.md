# Charge Item

### Summary

The **Charge Item** resource in the CARE system captures financial details associated with services rendered or products supplied to a patient. It serves as a self-contained record, detailing the origin of the charge, the amount, applied discounts, taxes, and other relevant financial information.

---

### Key Purpose

- Document financial charges for services or products provided to patients.
- Enable automated billing processes by linking clinical activities to financial records.
- Support detailed breakdowns of charges, including taxes, discounts, and surcharges.

---

## Core Data Structure

### Essential Fields

| Field                   | Description                             | Technical Notes                                  |
| ----------------------- | --------------------------------------- | ------------------------------------------------ |
| **id**                  | Internal system identifier              | Primary key, auto-generated                      |
| **definition**          | Reference to the Charge Item Definition | Links to the catalog entry for this service/item |
| **status**              | Current state in the billing lifecycle  | Controls whether the item can be invoiced        |
| **code**                | Billing code for the service            | Often derived from the definition                |
| **patient**             | Reference to the patient                | Person receiving the service                     |
| **encounter**           | Reference to the healthcare encounter   | Links to the clinical context                    |
| **facility**            | Reference to the healthcare facility    | Location where service was provided              |
| **quantity**            | Number of units provided                | Default is 1 for most services                   |
| **unitPriceComponent**  | Price breakdown per unit                | Includes base, surcharges, discounts, taxes      |
| **totalPriceComponent** | Price breakdown for all units           | Unit price × quantity with all components        |
| **total_price**         | Final calculated amount                 | Sum of all price components                      |
| **account**             | Reference to the billing account        | Where this charge accumulates                    |

### Supported Fields

**Monetary Component:**

- **`type`**: Type of price component (e.g., base, surcharge, discount, tax, informational).
- **`code`**: Code differentiating kinds of taxes, surcharges, discounts, etc.
- **`factor`**: Factor used for calculating this component.
- **`amount`**: Monetary amount associated with this component, including value and currency.

---

### Functional Workflow

1. **Charge Item Creation**: When a service is rendered or a product is supplied, a Charge Item is automatically generated, capturing all relevant financial details.
2. **Association with Encounter and Account**: The Charge Item is linked to the specific patient encounter and their billing account, ensuring accurate financial tracking.
3. **Pricing Calculation**: Using the associated Charge Item Definition, the system calculates the unit and total prices, factoring in any applicable taxes, discounts, or surcharges.
4. **Manual Overrides**: If necessary, authorized personnel can override standard pricing, with the reason documented in the `overrideReason` field.
5. **Billing and Invoicing**: Charge Items feed into the billing system, facilitating invoice generation and payment processing.
6. **Audit and Reporting**: Detailed records of Charge Items support financial audits and reporting requirements.
