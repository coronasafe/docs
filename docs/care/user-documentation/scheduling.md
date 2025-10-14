---
title: Scheduling Module
sidebar_position: 8
---

# Scheduling Module

## Overview

### Document Information

| Field | Details |
|-------|---------|
| Module | Scheduling Module |
| Version | v1.0 |
| Date Created | 16th August 2025 |
| Last Updated | 21st August 2025 |
| Author | Ardhra SunilKumar |
| Reviewed By | Suma Sundararajan |
| Target Persona(s) | Practitioner |

### Purpose

This workflow enables doctors to define their availability for patient appointments and set exceptions for unavailability. It ensures that only valid time slots are displayed to reception staff and patients for booking, improving scheduling efficiency and minimizing conflicts.

### Scope

**Covers:**
- Creating weekly availability templates and scheduling patterns
- Configuring exceptions for unavailability periods
- Managing appointment slots and time allocation
- Setting up consultation charges and pricing
- Calendar management and appointment coordination

**Does not Cover:**
- Patient appointment booking workflows (covered in Reception module)
- Reception-side scheduling actions and patient coordination

### User Persona Context

Doctors use this workflow to manage their schedules in the CARE platform. They set up recurring availability patterns and mark exceptions to avoid scheduling conflicts, ensuring patients and reception staff only book appointments during valid time slots.

### Prerequisites

**System Requirements:**
- Doctors must be logged into the CARE platform with scheduling permissions
- Active access to the assigned healthcare facility
- Appropriate user role permissions for schedule management

**Knowledge Requirements:**
- Familiarity with clinic working hours and operational schedules
- Understanding of personal availability patterns and constraints
- Basic knowledge of appointment duration and patient capacity planning

### Expected Outcome

- Availability slots created by the doctor will appear on the appointment calendar in designated colors by template
- Patients and reception staff will only be able to book appointments during the available slots
- Any configured exceptions will block bookings for specified times/dates
- Consultation charges will be automatically applied during patient appointments

### Login Requirements

Before accessing any Scheduling Module workflows, users must complete the authentication process:

1. **Platform Access**: Login to the CARE platform with your credentials
2. **Facility Selection**: Select the associated facility from the Facilities list
3. **Dashboard Navigation**: Navigate to the Overview section on the home screen in the left sidebar
4. **Schedule Access**: Click on **My Schedules** to begin setting up your availability

## Module Components

This module consists of several integrated components for comprehensive schedule management:

- [Creating Availability Slots](#creating-availability-slots) - Setting up recurring availability templates
- [Exception Management](#exception-management) - Marking unavailability periods
- [Schedule Editing](#schedule-editing) - Modifying and deleting schedules
- [Appointment Management](#appointment-management) - Viewing and managing booked appointments
- [Charge Management](#charge-management) - Setting consultation fees and pricing

---

## Creating Availability Slots

### Purpose

This workflow enables doctors to create recurring availability templates that define when they are available for patient appointments, including time slots, duration, and patient capacity.

### Step-by-Step Instructions

#### Setting Up Availability Template

1. **Access Schedule Creation**:
   - Navigate to the **Overview** section in the left sidebar
   - Click on **My Schedules** to access scheduling management
   - Click **Create Template** to start a new schedule

2. **Configure Template Details**:
   - **Template Name**: Enter a descriptive name (Example: "Regular OP day")
   - **Start Date**: Choose the beginning date for the schedule
   - **End Date**: Set the end date for the schedule period

3. **Define Time Schedules**:
   - **Schedule Concept**: A Schedule represents a block of time during which a doctor is available for patient appointments
   - **Examples**:
     - Morning OPD: 9:00 AM – 1:00 PM
     - Afternoon OPD: 2:00 PM – 6:00 PM
     - Evening OPD: 6:00 PM – 8:00 PM

4. **Configure Multiple Sessions**:
   - Doctors can divide their working hours into multiple sessions to better organize patient flow
   - **Example Configuration**:
     - Morning OPD → 09:00 AM – 01:00 PM
     - Afternoon OPD → 02:00 PM – 05:00 PM
     - Evening OPD → 06:00 PM – 08:00 PM

#### Understanding Slot Configuration

##### Auto-Fill Slot Duration

The **Auto-Fill Slot Duration** button automatically generates time slots within a time schedule based on the given slot duration and time range.

**Example**:
- Session: 09:00 AM – 01:00 PM
- Slot duration: 20 minutes
- Result: System auto-generates 12 slots (09:00, 09:20, 09:40, … up to 01:00 PM)

##### Slot Duration

**Slot Duration** defines how long each patient appointment lasts.

**Examples**:
- 15 minutes per patient
- 20 minutes per patient
- 30 minutes per patient

##### Patients per Slot

**Patients per Slot** specifies how many patients can be booked in the same time slot.

**Examples**:
- 1 patient per slot → only one booking at 09:00 AM
- 2 patients per slot → two patients can be booked for the same 09:00 AM slot (useful for group consultations or quicker checkups)

#### Finalizing Availability

5. **Save Template**:
   - Click **Save** to finalize and activate the schedule
   - Confirm that your availability appears on the appointment calendar in designated colors
   - Each color represents a different template you created
   - Only reception staff can book appointments during these available periods

6. **Calendar Verification**:
   - Verify that availability slots appear correctly on the appointment calendar
   - Note that unavailability cannot be modified once appointments are booked

---

## Exception Management

### Purpose

Exception management allows doctors to mark unavailable days or time periods to prevent patient bookings during times when they cannot see patients.

### Step-by-Step Instructions

#### Adding Availability Exceptions

1. **Access Exception Management**:
   - Navigate to **My Schedules** section
   - Click **Exceptions** under **Availability**

2. **Create New Exception**:
   - Click **Add Exception**

3. **Configure Exception Details**:
   - **Unavailable Date(s)**: Select the dates when you will be unavailable
   - **Time Window**: Specify the time period for unavailability
   - **Reason**: Enter explanation (Examples: "Conference", "Surgery", "Training", "Personal Leave")

4. **Confirm Exception**:
   - Click **Confirm Unavailability**
   - Check the appointment calendar to verify that selected dates/times are blocked from booking (shown with diagonal striped lines)

#### Calendar Quick Action (Single-Day Exception)

For quick single-day exceptions, you can use the calendar interface:

1. **Direct Calendar Access**:
   - In the right-side **Calendar**, click the **Date** you will be unavailable
   - Select **Add Exception** from the options

2. **Configure Quick Exception**:
   - Enter the **Time slot** for unavailability
   - Provide **Reason** for the exception

3. **Confirm and Verify**:
   - Click **Confirm Unavailability**
   - Verify that bookings are blocked for that date/time

**Example**: Add an exception for **12-Aug, 10:00–13:00 (Department Meeting)**. No bookings will be allowed during that window.

---

## Schedule Editing

### Purpose

This workflow allows doctors to modify existing availability templates, add additional sessions, or remove schedules that are no longer needed.

### Step-by-Step Instructions

#### Editing Existing Templates

1. **Access Template Management**:
   - Navigate to **My Schedules** section
   - Locate the template you want to modify

2. **Modify Template**:
   - Click **Edit icon** next to the template
   - Update any of the following:
     - **Template Name**
     - **Date Range**
     - **Time Slots**

3. **Save Changes**:
   - Click **Save** to apply changes
   - Verify the appointment calendar reflects your updates

#### Adding Additional Sessions

1. **Expand Existing Template**:
   - Click **Edit icon** on the existing template
   - Click **Add another session** within the edit interface

2. **Configure New Session**:
   - Define the **Day** for the new session
   - Set the **Time Slot** for the session

3. **Confirm Updates**:
   - Save the template with additional sessions
   - Verify that all sessions are visible on the calendar and available for booking

#### Deleting Templates

1. **Remove Template**:
   - Locate the template you want to remove
   - Click **Delete** and confirm the action

2. **Verify Removal**:
   - Check that the template is removed from the calendar
   - Ensure no appointment slots remain from the deleted template

---

## Appointment Management

### Purpose

This workflow allows doctors to view and manage appointments that have been booked within their available time slots.

### Step-by-Step Instructions

#### Viewing Scheduled Appointments

1. **Access Calendar View**:
   - Navigate to **My Schedules** section
   - On the right side calendar, click on the available dates to view scheduled appointments

2. **View Appointment Details**:
   - Click **View scheduled appointments**
   - Review patients under **Booked** status for the available date and time slots

3. **Alternative Access Method**:
   - Click **Appointments** from the left sidebar
   - Select the practitioner, date, and time to view the same appointment information

#### Managing Appointment Status

1. **Review Appointment List**:
   - View all patients scheduled for specific dates and times
   - Check appointment status and patient information

2. **Coordinate with Reception**:
   - Work with reception staff for any necessary appointment changes
   - Ensure proper communication for schedule modifications

---

## Charge Management

### Purpose

The Practitioner can add consultation charges to their schedule, which are automatically applied when patients book appointments with that practitioner.

### Step-by-Step Instructions

#### Setting Up Consultation Charges

1. **Access Charge Management**:
   - Navigate to **My Schedules** section
   - Click **Manage Charges**

2. **Create New Charge Structure**:
   - Under **Consultation Charge**, click **Create**

3. **Configure Charge Details**:
   - **Title**: Enter descriptive name for the charge
   - **Slug**: Create URL-friendly identifier
   - **Category**: Select appropriate category
   - **Pricing Components**: Define pricing structure

4. **Complete Charge Setup**:
   - Click **Create** to save the initial charge structure

#### Setting Consultation Pricing

1. **Configure Pricing Details**:
   - **Consultation Charge**: Set the standard consultation fee
   - **Re-visit Allowed Days**: Define the period within which re-visits are allowed
   - **Re-visit Consultation Charge**: Set the reduced fee for re-visits

2. **Save Pricing Configuration**:
   - Click **Save** to finalize the charge structure
   - Charges will be automatically applied during patient appointments

### Error Handling and Common Issues

| Error/Issue | Possible Cause | Resolution |
|-------------|----------------|------------|
| `Slots not visible on the calendar` | Template not saved or date range outside view | Reopen template, verify dates and Save; adjust calendar view range |
| `There are bookings during this exception` | Trying to add exception on date with scheduled appointment | Add the exception on another day or time slot, then confirm unavailability |
| `Cannot create template` | Missing mandatory fields | Provide Template Name, Start/End Date, and at least one Time Slot |
| `Overlapping/duplicate slots` | Multiple templates or sessions overlap | Edit Availability in My Schedules to remove overlaps; maintain one template/session per time slot |
| `Charges not applying` | Charge structure not properly configured | Verify all pricing components are completed and saved |
| `Exception not blocking bookings` | Exception time range not properly set | Check exception date/time range and re-confirm unavailability |
| `Template changes not reflecting` | Browser cache or system delay | Refresh the page and verify changes are saved correctly |
| `Unable to delete template` | Active appointments exist in template | Cancel or reschedule existing appointments before deleting template |

## Integration Points

The Scheduling Module integrates seamlessly with other CARE platform modules:

- **Reception**: Appointment booking and patient scheduling coordination
- **Clinical**: Provider schedules and clinical workflow coordination  
- **Patient Administration**: Patient contact information for appointment management
- **Billing**: Appointment-based billing and consultation charges

## Training Requirements

- Schedule management software navigation and interface usage
- Appointment types and scheduling protocols understanding
- Provider preferences and scheduling rules configuration
- Template creation and exception management best practices
- Consultation charge setup and pricing structure management

## Revision History

| Version | Date | Changes Made | Author | Reviewer |
|---------|------|--------------|--------|----------|
| v1.0 | 16th August 2025 | Initial Draft | Ardhra SunilKumar | Suma Sundararajan |
| v1.1 | 18th August 2025 | Content enhancements and workflow clarifications | Ardhra SunilKumar | Suma Sundararajan |
| v1.2 | 20th August 2025 | Error handling additions and structure improvements | Ardhra SunilKumar | Suma Sundararajan |
| v1.3 | 21st August 2025 | Final review and documentation completion | Ardhra SunilKumar | Suma Sundararajan |

---

*This documentation is part of the CARE platform user guide. For technical support, please contact your system administrator.*