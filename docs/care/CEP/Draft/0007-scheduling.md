# Scheduling in CARE

## Context

CARE is a Health Information Management System (HMIS) structured to manage various aspects of healthcare facilities, patient information, consultations, daily rounds, and user details. The core models include:

- **Facility**: Stores information about medical facilities.
- **Patient**: Stores patient details, including basic information and non-changing health information such as allergies and blood type. Patients belong to a facility and can be transferred to another facility if needed.
- **Consultation**: Stores details of a patient’s visit, including diagnosis, symptoms, and vitals taken. A patient can have multiple consultations, one for each hospital visit.
- **DailyRound**: Stores details of a patient’s vitals and progress over time. Each consultation can have multiple daily rounds.
- **User**: Stores details of hospital staff, including their login information. Users include nurses, doctors, admin staff, etc.

There are many more models, but at the core, these are the important ones.

## Requirements

- To schedule consultation within CARE (In this requirement, when a patient reaches the hospital, at the front desk, an attendant schedules a consultation for the patient).
- To schedule user activities (In this requirement, should be able to schedule user (doctor and nurse) availability and events (operation, patient check) assigned or associated with them).
- To merge sample tests and investigations (should understand this requirement further).
- To schedule visits for palliative care (similar to requirement 1 but additionally patient’s location has to be tracked).
- To schedule one-time consultation (similar to requirement 1 and see no difference wrt scheduling).

## Features Needed

- Ability to schedule one-time appointment or recurring appointment.
- Ability to attach all the resources needed for the schedule request.
- Ability to simulate a queue.
- Ability to allow overlaps (shall be decided when to be used by the users).

## Initial Idea

To have 2 models, Booking & Slot, which should be generic enough to handle the requirements and should be easy to expand and scale.

## Modeling

### Schedule

- Title
- Description (optional)
- Start time
- End time (optional)
- Recurrence (optional)
- Type (User_Availability | Palliative_Visit | Consultation | Daily Round | Investigation | Event)
- Allows overlap

### ScheduleParticipant

- Schedule id
- Participant id
- Participant type (User | Patient)

### ScheduleResource

- Schedule id
- Resource id
- Resource type (Consultation | Daily Round | Investigation | Location | Facility)

## Explanation of Modeling

The `Schedule` model will be the main entity used to block time, where `start time`, `end time`, and `recurrence` are used to track the timing of the schedule. The `title`, `description`, and `type` fields are used to capture the purpose of the schedule. The `title` and `description` help users understand and differentiate between schedules, while the `type` field is used by the application to enforce participant and resource requirements. The `allows overlap` field is used to determine if time block overlaps are permitted.

`ScheduleParticipant` and `ScheduleResource` are used to add one or more resources and participants involved or needed for the schedule. Recurring schedules can be achieved using the `recurrence` field in `Schedule`. Additional resources can be added using `ScheduleParticipant` and `ScheduleResource`. Queue simulation can be done on the frontend without changing the models. Overlaps can be managed using the `allows overlap` field in `Schedule`.

## Implementation wrt Requirements

### 1. Schedule Consultation

#### Schedule

- **Title**: Patient Consultation: [Patient Name]
- **Description**: Brief context of the consultation (e.g., issue description, follow-up).
- **Start Time**: Today’s date and time.
- **End Time**: None (simulated as a queue).
- **Recurrence**: None.
- **Type**: Consultation.
- **Allows Overlap**: True.

#### ScheduleParticipant

- **Participant**: Patient requesting consultation (create a patient if new).
- **User**: Doctor in duty (optional and decided on demand).

#### ScheduleResource

- **Resource**: Facility.

### 2. Schedule User Activities (Availability)

#### Schedule

- **Title**: Doctor Availability: [Doctor Name]
- **Start Time**: 9:00 AM.
- **End Time**: 5:00 PM.
- **Recurrence**: Monday to Friday.
- **Type**: User_Availability.
- **Allows Overlap**: True.

#### ScheduleParticipant

- **Participant**: Respective user.

#### ScheduleResource

- **Resource**: Facility (if specific to one facility).

### Handling User Leave

When a user (doctor, nurse, etc.) takes leave, a separate `Schedule` record can be created to block their availability during the leave period.

#### Schedule

- **Title**: Leave: [User Name]
- **Description**: Reason for the leave (optional).
- **Start Time**: Start date and time of the leave.
- **End Time**: End date and time of the leave.
- **Recurrence**: None (unless the leave is recurring, such as for a specific pattern).
- **Type**: User_Availability.
- **Allows Overlap**: False.

#### ScheduleParticipant

- **Participant**: User on leave.

#### ScheduleResource

- **Resource**: Facility (if leave is specific to one facility).

### 3. Schedule User Activities (Events)

#### Schedule

- **Title**: Heart Operation: [Patient Name] - [Doctor Name]
- **Start Time**: 10:30 AM.
- **End Time**: 3:30 PM.
- **Recurrence**: None.
- **Type**: Event.
- **Allows Overlap**: False.

#### ScheduleParticipant

- **Participant**: Patient having the operation.
- **User**: Doctor performing the operation (multiple if necessary).
- **User**: Nurse assisting in the operation (multiple if necessary).

#### ScheduleResource

- **Resource**: Facility.
- **Resource**: Location (operation room).
- **Resource**: Consultation.

### 4. Schedule Palliative Care Visits

Same as scheduling a consultation, with an additional consideration for patient location.

#### Schedule

- **Title**: Palliative Visit: [Patient Name]
- **Start Time**: Scheduled visit time.
- **End Time**: Expected end time (optional).
- **Recurrence**: As required.
- **Type**: Palliative_Visit.
- **Allows Overlap**: True.

#### ScheduleParticipant

- **Participant**: Patient.
- **User**: Assigned caregiver or healthcare professional.

#### ScheduleResource

- **Resource**: Facility.
- **Resource**: Location (patient’s address or coordinates from the patient model).

---

This scheduling module for CARE ensures flexibility, scalability, and ease of expansion to meet the diverse requirements of a Health Information Management System. The detailed implementation and examples provide a comprehensive guide to utilizing the scheduling module effectively.
