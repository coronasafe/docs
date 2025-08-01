# Specimen Definition

### Summary

`SpecimenDefinition` defines the **template or blueprint for specimen types** used in the laboratory. Instead of repeatedly defining the properties of commonly collected specimens (like blood, urine, or sputum), CARE uses `SpecimenDefinition` to maintain a central, reusable registry of specimen kinds that can be instantiated when needed.

When a specimen is collected during a diagnostic workflow, it is linked to its `SpecimenDefinition`. The instance retains a **snapshot** of the original definition to ensure **data integrity** and **historical traceability**, even if the definition changes later.

This resource enables structured specimen management aligned with the FHIR specification and supports integration with `ActivityDefinition` for test planning.

### Core Relationships

| Related Resource     | Purpose                                           |
| -------------------- | ------------------------------------------------- |
| `ActivityDefinition` | Specifies which specimens are required for a test |
| `Specimen`           | Concrete instance created from this definition    |
| `Facility`           | Scope of usage for definition                     |

### Supported Fields

| Field                     | Description                                 | Example                        |
| ------------------------- | ------------------------------------------- | ------------------------------ |
| `title`                   | Human-readable label                        | `"Venous Blood"`               |
| `slug`                    | Unique internal name                        | `"venous-blood"`               |
| `status`                  | Lifecycle status (`draft`, `active`, etc.)  | `"active"`                     |
| `derived_from_uri`        | Reference to external source or standard    | `"http://hl7.org/specs/blood"` |
| `description`             | Narrative explanation of this specimen type | `"Standard blood draw"`        |
| `type_collected`          | Type of specimen (bound to HL7 valuesets)   | `"venous blood"`               |
| `collection`              | Collection procedure (e.g., venipuncture)   | `"SNOMED/73761001"`            |
| `patient_preparation[]`   | Pre-collection instructions (e.g., fasting) | `["SNOMED/20430005"]`          |
| `Is derived[]`            | Whether specimen is derived or not          | `[""]`                         |
| `Single Use[]`            | Whether it is meant for a single use or not | `[""]`                         |
| `Specimen Type[]`         | Type of specimen collected                  | `[""]`                         |
| `Preference[]`            | Preferred or alternate                      | `[""]`                         |
| `Retention Time[]`        | Amount of time specimen can be retained     | `[""]`                         |
| `Requirement[]`           | To add any additional requirements          | `[""]`                         |
| `Container Description[]` | Description of container                    | `[""]`                         |
| `Cap[]`                   | Color of the container cap                  | `[""]`                         |
| `Capacity[]`              | Capacity of container                       | `[""]`                         |
| `Minimum Quantity[]`      | Minimum quantity of specimen required       | `[""]`                         |
| `Preparation[]`           | To record preparation details               | `[""]`                         |

### Functional Workflow

1. **Admin defines a SpecimenDefinition** for common sample types (e.g., venous blood).
2. **Linked via ActivityDefinition** to relevant lab tests.
3. When a lab test is initiated, **specimen instances are created** from these definitions via a dedicated API.
4. Specimen instances store a **snapshot** of definition fields to preserve traceability.
