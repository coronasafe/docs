# Schedulable User Resource

### Summary

In CARE, a **Schedulable User Resource** represents a healthcare provider (e.g., doctor, nurse) whose availability can be scheduled for patient appointments.

This resource sits at the top of the scheduling hierarchy and governs the **availability**, **exceptions**, and **schedules** for each user. It acts as the anchor point from which **available slots** are derived and **token bookings** are made.

### Design Philosophy

- **Explicitly Declared Availability**: Not all users are schedulable by default — only those marked as such.
- **Facility-Scoped**: A user is schedulable within the context of a healthcare facility.
- **Encapsulates Multiple Scheduling Layers**: Availability, exceptions, and schedule patterns are defined here.

### Core Relationships

| Related Resource        | Purpose                                                     |
| ----------------------- | ----------------------------------------------------------- |
| `Facility`              | The organization within which the user operates             |
| `Availability`          | Repeating time blocks when this user is generally available |
| `AvailabilityException` | Overrides or cancels availability (e.g., leave, holiday)    |
| `TokenSlot`             | Actual bookable slots derived from the user's availability  |
| `TokenBooking`          | A confirmed reservation of a slot for a patient             |
| `Encounter`             | Generated upon successful booking?                          |

### Functional Workflow

1. A user is flagged as "schedulable" during onboarding or profile setup.
2. Admin assigns this user to a facility and defines:
   - **Schedule** (recurring patterns)
   - **Availability Exceptions** (leaves, conferences, holidays)
3. CARE dynamically calculates token slots based**Availability** ?and generates **Token Slots**.
4. Patients or staff can book available slots against this user.
5. Each successful booking leads to a **TokenBooking** and an **Encounter**.
