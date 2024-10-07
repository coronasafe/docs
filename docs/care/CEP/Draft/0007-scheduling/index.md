# CEP-7: Scheduling in CARE

### Motive

Care is being used in different healthcare environments for various use-cases, including consultation scheduling, OT scheduling, vaccination appointment scheduling, and other appointment management needs. A robust and flexible scheduling system is essential for efficient healthcare delivery and resource management.

### Requirements

### 1. Appointment Booking

- The system shall allow staff members to book appointments for patients.
- Appointments can be scheduled for future dates or as walk-ins for the current day.
- The system shall support different appointment types, including:
  - New patient appointments
  - Follow-up appointments
- The system shall allow doctors to specify days for specific appointment types (e.g., follow-ups only on certain days).
- Appointments may include multiple participants or be linked to other objects. For example, a procedure could be an object with a team associated with it, and the team would consist of the participants involved in the appointment.
- Future Scope: The system shall provide a public-facing webpage where users can book their own appointments.

### 2. Resource Management

- Doctors shall be considered as schedulable resources within the system.
- Doctors shall have the ability to manage their own schedules.
- The system shall allow authorized staff members to manage doctors' schedules on their behalf.
- The system shall support flexible scheduling options, including:
  - Fixed slot durations (e.g., 15-minute intervals)
  - Daily patient limits (e.g., maximum of 20 patients per day)

### 3. Availability Management

- The system shall have the capability to show availability of resources (doctors, rooms, equipment, etc.).
- Doctors shall be able to set their available days and times.
- Doctors shall have the option to mark certain periods as unavailable.
- Doctors shall be able to specify which days in the future they can be booked.
- The system shall respect all availability settings when allowing appointments to be booked.
- The system shall support recurring availability patterns (e.g., available every Monday and Wednesday, 9 AM to 5 PM).
- Authorized staff members shall be able to view and modify availability settings on behalf of doctors, subject to appropriate permissions.

### 4. Check-in and Encounter Management

- The system shall provide a check-in function for when patients arrive at the facility.
- An encounter shall only be created in the system upon patient check-in.
- The system shall automatically manage a token system for patient queuing. (mix of appointments + walk-ins) [Logic is an open challenge to be tackled with Roopak]
- The system shall implement a check-in based priority system that automatically manages appointments and walk-ins.
- The check-in process shall update the patient's queue position based on their appointment time and arrival time.

### 5. Priority Management

- The system shall support different levels of patient priority.
- Staff shall have the ability to prioritize a VIP patient in the queue.
- The system shall provide clear visibility of the current queue order to staff members.
- The priority management system shall be flexible enough to accommodate emergency situations.

### 6. Appointment Statuses

- The system shall support multiple statuses for scheduled visits, including but not limited to:
  - Scheduled
  - Checked In
  - In Progress
  - Completed
  - Cancelled
  - No Show
- The system shall allow for status updates throughout the appointment lifecycle.

### 7. Location-based Scheduling

- The system shall support the registration and booking of various locations, including but not limited to Operating Theaters.
- This implementation shall be generic, allowing extension to support other types of location-based scheduling (e.g., vaccination appointment scheduling).
- Users with appropriate access rights shall be able to book locations.
- Location schedules shall be manageable by designated managers (can be the owner of the location schedule).
- The system shall support the handling of emergency cases that may affect location schedules.

### 8. User Permissions

- The system shall implement role-based access control for scheduling functions.
- Specific permissions shall be required for managing doctors' schedules on their behalf.
- Location booking shall be restricted to authorized doctors and staff members.

### 9. Flexibility and Customization

- The system shall allow for customization of appointment durations based on doctor or appointment type preferences.
- The system shall support different scheduling rules for different departments or specialties.

### 10. Notifications

- The system shall send notifications to relevant staff members for schedule changes, new bookings, and cancellations.
- Future: Allow SMS and whatsapp confirmations for patients

### 11. Audit Trail

- The system shall maintain a comprehensive audit trail of all scheduling actions, including creations, modifications, and cancellations.
- It shall support comments that can be added by users with access to the object.

### 12. Future Beckn Integration

- The architecture shall be flexible enough to accommodate Beckn protocols and standards for interoperable scheduling.
