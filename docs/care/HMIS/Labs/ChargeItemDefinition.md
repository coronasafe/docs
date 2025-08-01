# Charge Item Definition

### Summary

The `ChargeItemDefinition` in CARE specifies **how clinical activities (like lab tests or medications) are priced**. It allows each `ActivityDefinition`, `Medication`, or other healthcare service to be tied to a dynamic billing rule that governs how much a service costs under specific conditions.

CARE’s billing model works behind the scenes: **as practitioners record data (ServiceRequests, MedicationRequests, etc.), billing objects are automatically created** using the relevant `ChargeItemDefinition`.

### Core Relationships

| Related Resource       | Purpose                                            |
| ---------------------- | -------------------------------------------------- |
| `ActivityDefinition`   | Resource whose execution will generate this charge |
| `Medication`           | Medication product that incurs a cost              |
| `Encounter`, `Patient` | Used in condition evaluation for dynamic pricing   |

### Supported Fields

| Field Name        | Description                                               | Example                                |
| ----------------- | --------------------------------------------------------- | -------------------------------------- |
| `title`           | Name for human readability                                | `"CBC Test Standard Rate"`             |
| `slug`            | Unique internal reference                                 | `"cbc-charge"`                         |
| `derivedFromUri`  | Canonical URL reference if derived from standard          | `"http://example.org/rates/cbc"`       |
| `status`          | Lifecycle status (`draft`, `active`, etc.)                | `"active"`                             |
| `facility`        | The facility where this pricing applies                   | `Facility/medicity`                    |
| `description`     | Free-text description of the charge definition            | `"Pricing for CBC including lab work"` |
| `purpose`         | Rationale for the charge                                  | `"Used to generate automated bills"`   |
| `code`            | Internal or external billing/product code                 | `"CBC01"`                              |
| `instance[]`      | List of linked resources (ActivityDefinition, Medication) | `[ActivityDefinition/cbc]`             |
| `propertyGroup[]` | Array of pricing conditions and breakdowns                | See below                              |
| `baseprice[]`     | Base Charge for a lab test                                | See below                              |
| `discounts[]`     | Price reduction applied to the base amount before tax     | See below                              |
| `taxes[]`         | Applicable government taxes                               | See below                              |

```

### Billing Workflow in CARE

1. Practitioner creates a `ServiceRequest` for CBC.
2. The system checks the associated `ActivityDefinition` and its linked `ChargeItemDefinition`.
3. Based on patient and encounter details (age, location, tags), applicable pricing rules are evaluated.
4. A **charge item is instantiated** and added to the patient’s bill automatically.
5. Taxes and discounts are computed, total is stored with a detailed breakdown.


```
