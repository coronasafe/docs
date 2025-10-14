---
title: Reception
sidebar_position: 1
---

# Reception Module 

## Patient Registrations and Managing Patient Appointments     

## Overview

### 1. Document Information

| Field | Value |
|-------|-------|
| Module | Reception Module |
| Version | v1.0 |
| Date Created | 15th August 2025 |
| Last Updated | 21st August 2025 |
| Author | Ardhra SunilKumar |
| Reviewed By | Suma Sundararajan |
| Target Persona(s) | Reception Staff |

### 2. Purpose

This workflow allows reception staff to efficiently manage patient appointments, whether for new patients, existing patients without appointments, or patients with pre-booked appointments. It ensures accurate registration, appointment booking, collection of consultation fee and check-in to facilitate smooth consultation flow.

### 3. Scope

Covers the processes including registration, searching patients, booking appointments, marking check-in, and starting consultations. Does not include clinical documentation and post-consultation billing.

### 4. User Persona Context

Reception staff handle patient intake, verify details, either check or book appointments, collect consultation fee and ensure patients are ready for doctors on time.

### 5. Prerequisites

#### 5.1 System Requirement

* Users must be logged in into the CARE platform with valid credentials.
* The reception role must be assigned.

#### 5.2 Knowledge Requirement

* The reception staff must know how to register new patient details or search patients by phone number or name.
* The reception staff must be aware of how to book an appointment.

### 6. Expected Outcome

* The new patient details are successfully registered in the CARE platform.
* The appointment slot assigned to the selected location/healthcare service/practitioner as confirmed.
* The patient is displayed under the **Checked-in** or **In-consultation** status in the **Appointments** section for the selected date.
* The consultation process is ready to begin with the doctor able to access the patient's encounter immediately.
* After scheduling an appointment, the system will display a **General OP Ticket** and appointment summary.
* The encounters are accessed when the consultation starts.

### 7. Login (Reception Staff)

**Step 1**: Login to the CARE platform with your credentials.

**Step 2**: Select the associated facility from the **Facilities** list.

**Step 3**: List down a set of options including **Overview, Appointment, Queues, Patient, Services, Resource, Users, Billing, Settings**.

**Step 4**: The **Patient** section lists down various options including **Search Patient, Encounter, Locations**.

## Step-by-Step Instructions

The role of reception includes patient registration, checking appointments, booking appointments when required, collecting consultation fee payments, and marking patients as checked-in for doctors to begin consultations.

## 8.1 New Patient Without Appointment

### 8.1.1 Patient Registration

**Step 1**: Login to the CARE platform as instructed and navigate to the Patients section and select Search patients.

**Step 2**: Following, continue with the steps outlined below.

**Step 3**: Click **Add New Patient**.

**Step 4**: Enter **Full Name**, **Date of Birth**, **Contact Details**, **Gender**, **Address** and **Identifiers**.

**Step 5**: Click **Register Patient** to register the patient.

### 8.1.2 Book Appointment for the New Registered Patient

**Step 6**: After the patient is registered, it directs to schedule an appointment.

**Step 7**: Click **Schedule Appointment**.

**Step 8**: Select the **Location** where the practitioner is available for consultation and pick an available time slot marked in green for the date selected.

**Step 9**: Click **Confirm Appointment**.

**Step 10**: The system will display **Appointment Details**.

**Step 11**: The Patient's name comes under **Booked status** in the **Appointments** section for the selected practitioner and selected date.

### 8.1.3 Mark Appointment as Checked-in and Start Consultation

**Step 12**: Navigate to the Location's Appointments section.

**Step 13**: The appointment list displays patients under different statuses:
* **Booked**
* **Checked-in**
* **In-consultation**
* **Fulfilled**
* **Non Fulfilled**

**Step 14**: Click on a patient's name to go to **Appointment Details** and proceed with actions to generate token for the patient. Click **Generate Token** to generate the token.

**Step 16**: Fill out the Token details and click **Generate Token**.

**Step 17**: The Token is generated as follows.

**Step 18**: Then the patient can be checked in by clicking the **Check-In** option.

**Step 19**: After checked-in, the status is shown as below and click **Start Consultation** to enter into the consultation.

**Step 20**: Once the option is clicked, initiate the encounter for the patient by filling the **Type of encounter** and all other details and then click **Create Encounter**.

**Step 21**: The status of the patient changes automatically from **Booked** to **In-consultation** under **Appointments**.

### 8.1.4 Reschedule or Cancel Appointment

**Step 1**: Login to the CARE platform as instructed and navigate to **Appointments**.

**Step 2**: Select the required practitioner by clicking **"+"** and then click on a patient's name to view **Appointment details**.

**Step 3**: To **reschedule**, click the **Reschedule** button next to the appointment.

**Step 4**: Select a new green-marked slot from the calendar view and confirm the new time and then click **Schedule Appointment** option.

**Step 5**: Mark as **Entered in Error** or **Cancel Appointment** instead of **Reschedule** option for incorrect bookings or cancel the booked appointments at any time.

**Step 6**: The status will be updated accordingly once the changes are done.

## 8.2 Existing Patient Without Appointment

### 8.2.1 Search for Patient

**Step 1**: Login to the CARE platform as instructed and navigate to the Patients section and select Search patients.

**Step 2**: Following, continue with the steps outlined below.

**Step 3**: Search using the Patient Phone Number.

**Step 4**: Verify the patient using their year of birth.

**Step 5**: Open the Patient's profile and access the patient record for further actions like scheduling an appointment.

### 8.2.2 Book Appointment for an Existing Patient

**Step 6**: Click **Schedule Appointment**.

**Step 7**: Select the **Location in which Practitioner** and pick an available time slot marked in green for a selected date.

**Step 8**: Click **Schedule Appointment**.

**Step 9**: The system will display a **General OP Token Number**.

**Step 10**: The Patient's name comes under **Booked status** in the **Appointments** section for the selected practitioner and selected date.

### 8.2.3 Mark Appointment as Checked-in and Start Consultation

**Step 11**: Navigate to the **Appointments** section.

**Step 12**: Select the required practitioner by clicking **"+"** and click the **Date** to view appointments for that day.

**Step 13**: The appointment list displays patients under different statuses:
* **Booked**
* **Checked-in**
* **In-Consultation**
* **Fulfilled**
* **No-show**
* **Cancelled**

**Step 14**: Click on a patient's name to go to **Appointment Details** and proceed with actions and the status labelled **'Check-in'** will be enabled automatically on the appointment date which is to be clicked.

**Step 15**: The **'Start Consultation'** option is enabled automatically and clicked which will further start the consultation.

**Step 16**: During **Consultation**, it will redirect to create an encounter or to proceed with an active encounter.

**Step 17**: After the consultation, select **Mark as Fulfilled** in the **Appointment Details** section.

**Step 18**: The status changes automatically from **Consultation** to **Fulfilled** of the patient in the **Appointments** section.

To Reschedule or Cancel the Appointment, follow the steps in section 8.1.4 accordingly.

## 8.3 Existing Patient With Pre-Booked Appointment

### 8.3.1 Verify Appointment and Check-in

**Step 1**: Login to the CARE platform as instructed and navigate to Appointments.

**Step 2**: Select the assigned **Practitioner** by clicking **"+"** and click the **Date** to view appointments for that day.

**Step 3**: Locate the patient under **Booked** status.

**Step 4**: Select the patient to direct to **Appointment Details**.

**Step 5**: Click **Check-in** option enabled automatically to be checked-in in the **Appointment Details**.

**Step 6**: Click **Start Consultation** to start the consultation.

**Step 7**: During **Consultation**, it will redirect to create an encounter or to proceed with an active encounter.

**Step 8**: After the consultation, select **Mark as Fulfilled** in the **Appointment Details** section.

**Step 9**: The status changes automatically from **Consultation** to **Fulfilled** of the patient in the **Appointments** section.

To Reschedule or Cancel the Appointment, follow the steps in section 8.1.4 accordingly.

## 9. Error Handling / Common Issues

| Error Message / Issue | Possible Cause | Resolution |
|----------------------|----------------|------------|
| `Patient Not Found` | Incorrect year of birth or wrong phone number entered. | Re-enter patient details and verify year of birth. |
| Appointment Slot not Available | The selected practitioner has no open slots for the chosen date and time. | Select another available time slot or choose a different practitioner. |
| The patient is not checked-in on the date. | The patient is not available for the appointment. | Verify appointment date and reschedule if necessary. |

## 10. Related Document/ Links

*To be added as needed*

## 11. Revision History

| Version | Date | Changes Made | Author | Reviewer |
|---------|------|--------------|--------|----------|
| v1.0 | 15th August 2025, 18th August 2025, 19th August 2025, 21st August 2025 | Initial draft | Ardhra SunilKumar | Suma Sundararajan |