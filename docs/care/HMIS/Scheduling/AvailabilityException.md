# Availability Exception

### Summary

In CARE, an **Availability Exception** represents periods when a schedulable user (e.g., a healthcare provider) is unavailable for appointments, such as during vacations, training sessions, or unforeseen absences. This concept aligns with FHIR's approach to managing non-availability through the `Schedule` and `Slot` resources.

### Design Philosophy

- **Explicit Non-Availability**: Clearly define periods when a provider is not available to prevent scheduling conflicts.
- **Integration with Scheduling**: Ensure that availability exceptions are considered when generating available slots for appointments.
