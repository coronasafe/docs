# Observation Definition

### Summary

`ObservationDefinition` is used to define the structure and expectations of a **clinical observation or lab result**, such as "Hemoglobin level" or "Blood glucose." These definitions describe the unit, valid value range, data type, and measurement method — forming a **template** for the actual `Observation` instances recorded during diagnostics.

In CARE, this ensures consistency across lab results and helps maintain standards for how observations are displayed, interpreted, and validated.

### Core Relationships

| Related Resource     | Purpose                                                    |
| -------------------- | ---------------------------------------------------------- |
| `ActivityDefinition` | Links expected observations for a test                     |
| `Observation`        | Actual instance of a result captured using this definition |
| `SpecimenDefinition` | May define specimen type required for this observation     |

### Supported Fields

| Field Name    | Description                                     | Example                               |
| ------------- | ----------------------------------------------- | ------------------------------------- |
| `title`       | Human-readable name of the observation          | `Hemoglobin`                          |
| `slug`        | Unique internal reference name                  | `hb-level`                            |
| `description` | Clinical context or explanation                 | `"Hemoglobin concentration in blood"` |
| `status`      | Lifecycle status (`draft`, `active`, etc.)      | `active`                              |
| `category`    | Clinical category                               | `laboratory`                          |
| `data_type`   | Type of result value                            | `string`                              |
| `Loinc_Code`  | LOINC or internal code                          | `"LOINCCode"`                         |
| `Body Site`   | Location on the body for sample collection      | `"Right Arm"`                         |
| `Method`      | Measurement technique (e.g., Spectrophotometry) | `"Automatic"`                         |
| `unit`        | Measurement unit                                | `"mmHg"`                              |
| `Components`  | To record multiple related values               | `CBC`                                 |

### Functional Workflow

1. Admin defines the **observation format** for a test (e.g., Hemoglobin).
2. Links this definition to the appropriate **ActivityDefinition**.
3. When test results are recorded, the system:
   - Enforces data type (e.g., Quantity)
   - Validates result range
   - Uses the `preferred_report_name` for display
