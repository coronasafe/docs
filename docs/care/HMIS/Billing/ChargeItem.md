# Charge Item
A **Charge Item** is the actual **instance** of billing for a specific service or product provided to a patient. It references a **Charge Item Definition** (i.e., the priced “catalog entry”) to derive the cost, plus actual usage details (quantity, date, any overrides). Each Charge Item links to a specific **Account** (which accumulates charges for a patient or episode of care) and often to an **Encounter** (the clinical context).

For example, if a nurse administers 2 doses of an expensive medication, the system may create a Charge Item for “Medication: XYZ” with quantity=2, referencing the relevant charge definition for medication pricing. Once a Charge Item is **billable**, it can appear on an **Invoice**.


## Schema Definition
```json
{
  "id": "<str>",                      // Internal Identifier
  "definition": "<id|fk>",            // Definition pointing to Charge Definition
  "status": "<string>",               // planned | billable | not-billable | aborted | billed | entered-in-error | unknown
  "code": "<code>",                   // A code that identifies the charge, like a billing code
  "patient": "<id|fk>",               // Patient Associated with the charge
  "encounter": "<id|fk>",             // Encounter associated with this ChargeItem
  "facility": "<id|fk>",              // Facility where this Charge Item is created
  "quantity": "<float>",              // Quantity of which the charge item has been serviced
  "unitPriceComponent": [
    "MonetaryComponent"               // Unit price components
  ],
  "totalPriceComponent": [
    "MonetaryComponent"               // Total price components
  ],
  "total_price": {                    // Total Price in Amount
    "Money"
  },
  "overrideReason": {                 // Reason for overriding the list price/factor
    "text": "",
    "code": "<code>"
  },
  "service": {                        // Why was the charged service rendered?
    "resource": "<resource>",
    "id": "id"
  },
  "account": "<id|fk>",               // Account to place this charge
  "note": "<markdown>",               // Comments made about the ChargeItem
  "supportingInformation": [
    { "Reference(Any)" }              // Further information supporting this charge
  ]
}
```

## Core Data Structure

### Essential Fields

| Field | Description | Technical Notes |
|-------|-------------|----------------|
| **id** | Internal system identifier | Primary key, auto-generated |
| **definition** | Reference to the Charge Item Definition | Links to the catalog entry for this service/item |
| **status** | Current state in the billing lifecycle | Controls whether the item can be invoiced |
| **code** | Billing code for the service | Often derived from the definition |
| **patient** | Reference to the patient | Person receiving the service |
| **encounter** | Reference to the healthcare encounter | Links to the clinical context |
| **facility** | Reference to the healthcare facility | Location where service was provided |
| **quantity** | Number of units provided | Default is 1 for most services |
| **unitPriceComponent** | Price breakdown per unit | Includes base, surcharges, discounts, taxes |
| **totalPriceComponent** | Price breakdown for all units | Unit price × quantity with all components |
| **total_price** | Final calculated amount | Sum of all price components |
| **account** | Reference to the billing account | Where this charge accumulates |

### Status Lifecycle

| Status Value | Description | System Behavior |
|--------------|-------------|----------------|
| **planned** | Service is scheduled but not yet provided | Not counted in account balance; not billable |
| **billable** | Service provided and ready to bill | Included in account balance; can be invoiced |
| **not-billable** | Service provided but won't be billed | Not included in account balance; excluded from invoices |
| **aborted** | Service was not completed | Not included in account balance; excluded from invoices |
| **billed** | Charge included on an invoice | Included in account balance; cannot be invoiced again |
| **entered-in-error** | Charge was created by mistake | Excluded from all calculations and invoices |


## User Workflows

### Editing or Canceling a Charge
- If a charge is still **billable** (and not on an issued invoice), staff can adjust quantity, override price, or mark it **not-billable**.  
- If it is **billed** (already invoiced), any correction typically requires reversing that invoice or adding a credit note.  
- Marking **entered-in-error** will remove it from the account’s balance. Log who performed this action.

### Automatic Charge Creation
- The system will automatically create charges when certain clinical events occur (e.g., lab test result posted). Staff can still review them before they become “billable.”