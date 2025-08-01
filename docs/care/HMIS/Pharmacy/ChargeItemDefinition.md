# Charge Item Definition

### Summary

The **Charge Item Definition** resource in the CARE system outlines the billing rules and pricing details associated with healthcare services and products. It serves as a blueprint for how charges are calculated, considering various factors such as patient demographics, service context, and applicable taxes.

This resource aligns with FHIR's [ChargeItemDefinition](https://build.fhir.org/chargeitemdefinition.html) resource, providing a standardized framework for representing billing information.[FHIR Build](https://build.fhir.org/chargeitemdefinition.html?utm_source=chatgpt.com)

---

### Key Purpose

- Define billing rules and pricing structures for healthcare services and products.
- Enable automated charge item creation based on clinical data entry.
- Support conditional pricing based on patient attributes and service context.
- Facilitate tax calculations and regional billing configurations.[imagineteam.com+7HL7 Confluence+7RCM Matter+7](https://confluence.hl7.org/spaces/FHIR/pages/66929138/Chargeitemdefinition%2BFhir%2BResource%2BProposal?utm_source=chatgpt.com)[Medical Billing Star](https://www.medicalbillingstar.com/medgen-ehr/work-flow.html?utm_source=chatgpt.com)

---

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

---

### Functional Workflow

1. **Definition Creation**: A Charge Item Definition is created, detailing the billing rules and pricing structures for specific services or products.
2. **Automated Charge Generation**: When clinical data is entered (e.g., medication requests), the system automatically generates corresponding charge items based on the definitions.
3. **Conditional Pricing**: The system evaluates patient and encounter data against the applicability conditions to determine the appropriate pricing.
4. **Tax Calculation**: Applicable taxes are calculated based on configured tax codes and added to the total charge.
5. **Billing Integration**: The final charge, including all components, is integrated into the billing system for invoicing and payment processing.
```
