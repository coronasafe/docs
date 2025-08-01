# Product Knowledge

### Summary

This resource stores all foundational information about a given product, foundational information is anything need not be duplicated across different individual products, ie ingredient lists, possible allergens, nutritional information and so on..

All Products will have a Product Knowledge item in Care.

## Production Knowledge can be instance or facility level.

### Key Purpose

- Define comprehensive, facility-wide information about products.
- Standardize product data across different batches and instances.
- Facilitate integration with FHIR resources for interoperability.
- Support inventory management, prescribing, and dispensing processes.

---

### Core Data Structure – Essential Fields

- **`facility`**: Reference to the facility where the product is available (nullable).
- **`slug`**: A URL-friendly identifier for the product.
- **`status`**: Current status of the product knowledge entry (e.g., draft, active, retired, unknown).
- **`product_type`**: Type of product (e.g., Medication, NutritionProduct, Consumable).
- **`code`**: A code representing the product, with the value set depending on the product type.
- **`name`**: The primary name of the product.
- **`base_unit`**: The unit in which the product is measured or dispensed.
- **`names`**: A list of alternative names for the product, each with a specified name type.
- **`storage_guidelines`**: Instructions for storing the product, including notes, stability duration, and environmental settings.
- **`definition`**: Detailed information about the product's form, intended route(s) of administration, ingredients, nutrients, and drug characteristics.

---

### Core Relationships

| Field                                 | Reference Resource | Description                                                                                                                                               |
| ------------------------------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `facility`                            | Organization       | The facility where the product is available.                                                                                                              |
| `code`                                | CodeSystem         | The coding system used to identify the product.                                                                                                           |
| `names.name_type`                     | ValueSet           | The type of name, bound to [InventoryItem Name Type](https://build.fhir.org/valueset-inventoryitem-nametype.html).                                        |
| `definition.dose_form`                | ValueSet           | The form of the medication, bound to [Medication Form Codes](https://build.fhir.org/valueset-medication-form-codes.html).                                 |
| `definition.intended_route`           | ValueSet           | The intended route(s) of administration, bound to [Route Codes](https://build.fhir.org/valueset-route-codes.html).                                        |
| `definition.ingredients.substance`    | Substance          | The substance(s) that make up the product.                                                                                                                |
| `definition.drug_characteristic.type` | ValueSet           | The type of drug characteristic, bound to [Medication Knowledge Characteristic](https://build.fhir.org/valueset-medicationknowledge-characteristic.html). |

---

### Supported Fields

| Field Name                                          | Type            | Description                                                       |
| --------------------------------------------------- | --------------- | ----------------------------------------------------------------- |
| `facility`                                          | Reference       | Reference to the facility (nullable).                             |
| `slug`                                              | string          | URL-friendly identifier for the product.                          |
| `status`                                            | code            | Status of the product knowledge entry.                            |
| `product_type`                                      | code            | Type of product (e.g., Medication, NutritionProduct, Consumable). |
| `code`                                              | CodeableConcept | Code representing the product.                                    |
| `name`                                              | string          | Primary name of the product.                                      |
| `base_unit`                                         | CodeableConcept | Unit in which the product is measured or dispensed.               |
| `names`                                             | List            | Alternative names for the product.                                |
| `names.name_type`                                   | code            | Type of name (e.g., trade name, brand name).                      |
| `names.name`                                        | string          | The alternative name.                                             |
| `storage_guidelines`                                | List            | Storage instructions for the product.                             |
| `storage_guidelines.note`                           | string          | Additional notes on storage.                                      |
| `storage_guidelines.stability_duration`             | Duration        | Duration for which the product remains stable.                    |
| `storage_guidelines.environmental_setting`          | List            | Environmental conditions for storage.                             |
| `storage_guidelines.environmental_setting.type`     | code            | Type of environmental condition.                                  |
| `storage_guidelines.environmental_setting.value`    | string          | Value of the environmental condition.                             |
| `definition`                                        | BackboneElement | Detailed definition of the product.                               |
| `definition.dose_form`                              | CodeableConcept | Form of the medication.                                           |
| `definition.intended_route`                         | List            | Intended route(s) of administration.                              |
| `definition.ingredients`                            | List            | Ingredients of the product.                                       |
| `definition.ingredients.is_active`                  | boolean         | Indicates if the ingredient is active.                            |
| `definition.ingredients.substance`                  | CodeableConcept | Substance that makes up the ingredient.                           |
| `definition.ingredients.strength`                   | BackboneElement | Strength information of the ingredient.                           |
| `definition.ingredients.strength.strength_ratio`    | Ratio           | Strength ratio of the ingredient.                                 |
| `definition.ingredients.strength.strength_quantity` | Quantity        | Strength quantity of the ingredient.                              |
| `definition.nutrients`                              | List            | Nutritional components of the product.                            |
| `definition.drug_characteristic`                    | List            | Characteristics of the drug.                                      |
| `definition.drug_characteristic.type`               | CodeableConcept | Type of drug characteristic.                                      |
| `definition.drug_characteristic.value`              | string          | Value of the drug characteristic.                                 |

---

### Functional Workflow

1. **Creation**: A Product Knowledge entry is created with comprehensive details about a product, including its classification, composition, and storage guidelines.
2. **Reference**: Individual Product instances reference the Product Knowledge entry, inheriting its general attributes while specifying batch-specific details.
3. **Integration**: The Product Knowledge resource integrates with FHIR resources like MedicationKnowledge and NutritionProduct, facilitating interoperability across systems.
4. **Maintenance**: Updates to product information, such as changes in composition or storage guidelines, are made within the Product Knowledge resource, ensuring consistency across all related Product instances.
