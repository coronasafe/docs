
# Charge Item Definition

A **Charge Item Definition** specifies **what** items/services can be billed and **how** pricing or conditions are applied. Think of it as the **price catalog** plus rule engine for your billing system. Each definition includes a billing code, base price or rate, plus optional surcharges, discounts, or taxes. It can also contain rules about when to apply these pricing components—for example, a certain code might only apply to patients of a specific age group, or only for inpatient encounters.

This resource allows your HMIS to automatically derive the appropriate cost of a service or product by referencing the relevant **Charge Item Definition**. If you later update your official price list, that change is made once in the definition, and all future charges referencing it will use the updated pricing logic. Complex logic (like time-of-day surcharges, tax rules, or special discounts) can also be embedded here.

## Schema Definition

```json
{
  "id": "<str>",                  // Internal Identifier
  "version": "<string>",          // Version 
  "title": "<string>",            // Name for this charge item definition
  "slug": "<string>",             // URL-friendly identifier
  "derivedFromUri": "<uri>",      // Was this from a URL
  "status": "<string>",           // draft | active | retired | unknown
  "facility": "<id|fk>",          // Facility where this Charge Item Definition is created
  "description": "<markdown>",    // Natural language description of the charge item definition
  "purpose": "<markdown>",        // Why this charge item definition is defined
  "code": "<code>",               // Billing code or product type this definition applies to
  "instance": [
    { "ActivityDefinition|Medication" }  // Resources this definition can apply to
  ],
  "propertyGroup": [{             // Group of properties which are applicable under the same conditions
    "applicability": [{           // Whether or not the billing code is applicable
      "condition": { "Expression" }  // Boolean-valued expression
    }],
    "priceComponent": [{ "MonetaryComponent" }]  // Components of total line item price
  }]
}
```

### Monetary Component Definition
```json
{
  "type": "<string>",           // base | surcharge | discount | tax | informational
  "code": "<code>",             // Codes to differentiate taxes, surcharges, discounts etc.
  "factor": "<decimal>",        // Factor used for calculating this component
  "amount": {
    "value": "<decimal>",       // Numerical value (with implicit precision)
    "currency": "<string>"      // ISO 4217 Currency Code
  }
}
```
## Core Data Structure

### Essential Fields

| Field | Description | Technical Notes |
|-------|-------------|----------------|
| **id** | Internal system identifier | Primary key, auto-generated |
| **version** | Version number of the definition | Supports tracking changes over time |
| **title** | Human-readable name of the charge item | Used in selection interfaces and reports |
| **slug** | URL-friendly identifier | Used for API endpoints and references |
| **status** | Current state of the definition | Controls whether it can be used for billing |
| **facility** | Healthcare facility reference | Used for facility-specific pricing |
| **description** | Detailed description of the charge item | Provides context for billing staff |
| **code** | Billing code or identifier | Links to standard coding systems when possible |
| **instance** | Reference to clinical resources | Shows which clinical activities can trigger this charge |
| **propertyGroup** | Container for pricing rules | Groups related pricing components |

### Status Values

| Status Value | Description | System Behavior |
|--------------|-------------|----------------|
| **draft** | Definition is being created or updated | Not yet available for charging |
| **active** | Definition is currently in use | Can be selected for charging |
| **retired** | Definition is no longer used | Not available for new charges but preserved for historical records |
| **unknown** | Status cannot be determined | Used for imported data with unclear status |

### Price Component Types

| Component Type | Description | Usage |
|----------------|-------------|-------|
| **base** | Core price of the service or item | Starting point for all calculations |
| **surcharge** | Additional charge on top of base price | Used for extras or special conditions (e.g., after-hours service) |
| **discount** | Reduction from base price | Used for special programs or agreements |
| **tax** | Statutory charges required by law | Applied based on tax regulations |
| **informational** | Non-charging line items | Used to show calculations or for documentation |


## Business Logic
1. **Single Source of Truth**: All billable items must have a corresponding Charge Item Definition. Users can only bill codes that exist here, ensuring consistent naming/pricing.  
2. **Lifecycle**: 
   - **draft** definitions should not appear in standard picklists for charge entry.  
   - **active** definitions appear in the billing UI.  
   - **retired** definitions are hidden from new usage but remain valid for historical bills.  
3. **Price Calculation**: At the moment a user (or system) creates a Charge Item referencing this definition:
   - Evaluate each `propertyGroup` in order. For those whose conditions pass, accumulate the price components (base, surcharge, discount, tax, etc.).  
   - Derive the final unit price or total by combining those components.  
   - If multiple property groups apply, they can be additive. For example, base price = 100, night surcharge = 20, tax = 5% → final = 126.  

## Step-by-Step User Workflows
Though staff typically do not interact with Charge Item Definitions daily (they are more of an admin function), here is how the workflow might look for a billing administrator:

1. **Navigate to “Charge Item Definitions” Admin Screen**  
   - Only users with proper roles (billing manager) can edit these definitions.  

2. **Create or Edit a Definition**  
   - Enter basic info: code, title, description.  
   - Set **status** to `active` once ready.  
   - Define or update `propertyGroup` details—like base price, potential surcharges, discount conditions.  

3. **Save & Activate**  
   - The definition now appears in the system’s reference data.  
   - If staff add charges referencing this code, the system automatically uses these pricing rules.  

4. **Retire a Definition**  
   - If no longer used, set status to `retired`. The system hides it from new charge entry. Existing references remain valid historically.  

5. **Verify Pricing**  
   - Admin or finance staff can test conditions to confirm the definition yields correct amounts. E.g., “Patient over 60 -> 10% discount is working as intended.”  


**Deactivating (Retiring) a Charge Item Definition:**
- If a service is no longer offered or a code is deprecated, an admin can mark it as **Inactive**. This usually involves editing the definition and unchecking an “Active” box or setting a termination date.
- Save the change. Inactive definitions are typically hidden from the charge entry UI so that staff won’t accidentally use them. If they try to use an inactive code (say by typing it manually), the system should reject it.
- The definition remains in the database for reference (especially for old records that used it), but it’s not available for new charges. If there’s a replacement code, the admin might add a note like “Replaced by CODE123 as of 2025”.

**Viewing the Catalog:**
- The Charge Item Definition list can usually be viewed in a table format by authorized users. It might show columns: Code, Description, Price, Unit, Active/Inactive, etc.
- Users (like billing staff) with view-only access can search this list to find how something is billed. For example, “How much is the charge for an MRI spine?” They can find the definition entry for MRI spine which says, e.g., $400.
- This ensures transparency: staff can answer patient queries about costs using the official catalog.