# Diagnostic Report

### Summary

A `DiagnosticReport` in CARE provides a structured summary of the findings, interpretations, and outcomes derived from diagnostic activities such as lab tests. While the **clinical measurements themselves are stored as `Observation` resources**, the `DiagnosticReport` acts as a **wrapper** or **summary document**, linking together those observations in a meaningful context.

In the CARE MVP, diagnostic reports are generated **only from `ServiceRequest` resources**, but the system is designed to support reports generated from other clinical contexts in future.

### Core Relationships

| Related Resource | Purpose                                               |
| ---------------- | ----------------------------------------------------- |
| `ServiceRequest` | Origin of the diagnostic request                      |
| `Observation[]`  | Measured values linked to this report                 |
| `Patient`        | Patient for whom the report was generated             |
| `Encounter`      | Visit or session in which the test was performed      |
| `Specimen[]`     | Specimens used for testing (currently ignored in MVP) |
