# Activity Definition

### Summary

In CARE, `ActivityDefinition` is used to define reusable **templates for clinical actions**, such as lab tests or medication requests. Each definition standardizes how a particular diagnostic activity should be instantiated at runtime — enabling consistent behavior across service requests and automated billing.

### Core Relationships

| Related Resource        | Purpose                                           |
| ----------------------- | ------------------------------------------------- |
| `ServiceRequest`        | Primary output when ActivityDefinition is applied |
| `ChargeItemDefinition`  | Linked to define billing behavior                 |
| `SpecimenDefinition`    | Defines required specimens for lab tests          |
| `ObservationDefinition` | Specifies expected observation outcomes           |

### Supported Fields

| Field Name                       | Description                                                                  | Example                        |
| -------------------------------- | ---------------------------------------------------------------------------- | ------------------------------ |
| `id`                             | Internal identifier                                                          | `AD-001`                       |
| `version`                        | Versioning control for updates                                               | `1`                            |
| `slug`                           | Unique name within a facility                                                | `cbc-test`                     |
| `derived_from_url`               | Source or canonical reference                                                | `https://fhir.care/ad/cbc`     |
| `title`                          | Human-readable name                                                          | `Complete Blood Count`         |
| `subtitle`                       | Optional secondary title                                                     | `CBC (Routine)`                |
| `status`                         | Draft, active, retired                                                       | `active`                       |
| `category`                       | Clinical category (from FHIR extensible valueset)                            | `laboratory`                   |
| `description`                    | Long-form description                                                        | `"Standard CBC test"`          |
| `purpose`                        | Rationale for defining the activity                                          | `"Baseline health evaluation"` |
| `usage`                          | Description of clinical usage                                                | `"Used for anemia screening"`  |
| `facility`                       | Facility where the definition is used                                        | `Facility/Medicity`            |
| `kind`                           | Type of FHIR resource created by this template (e.g., `ServiceRequest`)      | `ServiceRequest`               |
| `code`                           | Clinical code (e.g., SNOMED or internal code for the action)                 | `718-7`                        |
| `body_site`                      | Applicable body site, if relevant                                            | `left arm`                     |
| `locations[]`                    | List of locations where this test can be performed                           | `[LabA, LabB]`                 |
| `specimenRequirement[]`          | Linked `SpecimenDefinition` entries required for the test                    | `Specimen/Blood`               |
| `observationResultRequirement[]` | Linked `ObservationDefinition` entries that define expected result structure | `[Hemoglobin, WBC, RBC]`       |

### Functional Workflow

- **Define Activity**

  Admin defines a test (e.g., CBC) using `ActivityDefinition`, linking to specimens, observations, and charge items.

- **Apply ActivityDefinition**

  When a `ServiceRequest` is created (via UI/API), the system references the relevant `ActivityDefinition` and uses it to instantiate the required resource.

- **Auto-Generate ChargeItems**

  If charges are linked to the `ActivityDefinition`, they are also instantiated.

### **Schema Definition?**

```jsx
{
  "id" : "<str>", // Internal Identifier
  "version" : "<int>", // Version of the Activity Definition
  "slug" : "<string>", // Unique name per facility
  "derived_from_url" : "<url>", // URL this object was derived from
  "title" : "<string>", // Name for this activity definition (human friendly)
  "subtitle" : "<string>", // Subordinate title of the activity definition
  "status" : "<string>", // R!  draft | active | retired | unknown
  "category" : "<code>" // Bound to https://build.fhir.org/valueset-servicerequest-category.html Extensible
  // "contact" : [{ ContactDetail }], // Contact details for the publisher
  "description" : "<markdown>", // Natural language description of the activity definition
  "purpose" : "<markdown>", // Why this activity definition is defined
  "usage" : "<markdown>", // Describes the clinical usage of the activity definition
  "facility" : "<id|fk>", // Facility where this Account is created
  // topic" : "", // No Valid use for this right now
  "kind" : "<string>", // FHIR Resource Type that is created by this Definition, Options will be internally identified by the system
  "code" : "<code>", // Bound to Snomed, controls what kind of Def this is, Example Procedure Codes
  //"intent" : "<code>", // proposal | plan | directive | order | original-order | reflex-order | filler-order | instance-order | option
  //"priority" : "<code>", // routine | urgent | asap | stat
  "body_site" : "<code>" // Bound to the Body site Valueset
  "locations" : ["<id|fk>"], // Foreign key to location
  "specimenRequirement" : ["<id|fk>"], // Points to SpecimentDefinition
  //"observationRequirement" : ["<id|fk>"], //Points to Observation Requirement
  "observationResultRequirement" : ["<id|fk>"], // What observations must be produced by this action
}
```
