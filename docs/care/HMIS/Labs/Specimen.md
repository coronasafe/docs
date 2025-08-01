# Specimen

### Summary

In CARE, a `Specimen` represents a **physical sample collected from a patient** for diagnostic analysis. This includes blood, urine, swabs, or tissue samples collected as part of a diagnostic process. Each specimen is associated with a patient, collected during an encounter, and typically originates from a `ServiceRequest`.

Specimens can optionally be **instantiated from a `SpecimenDefinition`**, inheriting baseline properties such as type, preparation, and container. However, all real-world specifics — collection details, condition, and processing — are captured in the `Specimen` resource itself.

### Core Relationships

| Related Resource     | Purpose                                                      |
| -------------------- | ------------------------------------------------------------ |
| `Patient`            | The subject from whom the specimen was collected             |
| `Encounter`          | The clinical context of collection                           |
| `ServiceRequest`     | The reason the specimen was collected                        |
| `SpecimenDefinition` | (Optional) Template from which the specimen was instantiated |
| `Procedure`          | Procedure during which the specimen was collected            |
| `Observation`        | Diagnostic data produced based on this specimen              |
