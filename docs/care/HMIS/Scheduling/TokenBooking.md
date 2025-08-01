# Token Booking

### Summary

In CARE, a **Token Booking** represents the reservation of a specific time slot by a patient for a healthcare service. It describes the details of a scheduled meeting between a patient and a healthcare provider.

### Design Philosophy

- **Integration with Slots**: Each appointment is linked to a `Slot` resource that defines the specific time interval.
- **Status Tracking**: Monitor the status of appointments to manage workflows effectively.

---

### Functional Workflow

1. **Select Available Slot**: Patient selects an available `Slot` for the desired service.
2. **Create Appointment**: System creates an `Appointment` resource linking the patient, provider, and selected slot.
3. **Manage Appointment**: Appointment status is updated as needed (e.g., checked-in, completed).
