# Schedule

### Summary

In CARE, the **Schedule** resource represents the availability of a healthcare provider (e.g., doctor, nurse) for appointments. It defines the time periods during which the provider is available to provide services. ~~This concept aligns with FHIR's `Schedule` resource~~, which serves as a container for time slots that can be booked using an appointment

---

### Functional Workflow

1. **Define Schedule**: Create a `Schedule` resource for each provider, specifying the time periods during which they are available.
2. **Generate Slots**: Within the schedule, create `Slot` resources representing specific time intervals available for booking.?
