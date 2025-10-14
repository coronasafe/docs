---
title: Lab
sidebar_position: 3
---

# Laboratory Module

## Overview

### 1. Document Information

| Field | Value |
|-------|-------|
| Module | Laboratory Module |
| Version | v1.0 |
| Date Created | 15-AUG-2025 |
| Last Updated | 22-AUG-2025 |
| Author | Sreelekshmi S |
| Reviewed By | Suma Sundararajan |
| Target Persona(s) | Admins, Doctors / Practitioners, Lab Staff, Technician & Senior Reviewers |

### 2. Purpose

The Laboratory Module streamlines the end-to-end diagnostic workflow in the CARE platform. It ensures accurate test configuration, smooth request initiation by doctors, and efficient processing by lab staff. This module brings consistency, compliance, and transparency to all lab-related operations.

### 3. Scope

**Covers:**
- Setup of lab services and locations, specimen/observation/charge/activity definitions, creation of diagnostic service requests, lab processing, and report generation.

**Does Not Cover:**
- Billing operations beyond charge definition, clinical diagnosis outside the lab scope, or third-party lab integrations.

### 4. User Persona Context

- **Admin** – Configures the foundational elements such as healthcare services, locations, specimen/observation definitions, charge items, and activity definitions.
- **Doctor/Practitioners** – Initiates service requests within patient encounters, defining clinical context and urgency and view diagnostic reports.
- **Lab Staff/Technicians/Senior Reviewers** – Executes requests by collecting specimens, processing tests, entering results, and submitting reports for approval.

### 5. Prerequisites

- **System Requirements:** Users must have a CARE Staff account with appropriate role permissions (Admin, Doctor, or Lab Staff).
- **Knowledge Requirements:** Basic understanding of patient encounters, service request workflows, and role responsibilities.

### 6. Expected Outcome

- Admins have a structured lab configuration that supports all diagnostic workflows.
- Doctors can raise accurate, role-linked diagnostic service requests.
- Lab staff can process requests, record results, and ensure validated diagnostic reports are visible to doctors.

### 7. Login (Admin, Doctor, or Lab Staff)

Before accessing any Laboratory workflows, users must log in to the CARE Staff portal with the following steps:

1. Navigate to the **CARE Staff Login page** in your browser.
2. Enter your **User ID** and **Password.**
3. Click **Login**.
4. Select the appropriate **Facility** (if multiple facilities are available).

After successful authentication, you will be directed to the **Dashboard** based on your assigned role (Admin, Doctor, or Lab Staff).

## Laboratory Module - Admin Workflow

### 1. Document Information

| Field | Value |
|-------|-------|
| Module | Laboratory Module |
| Version | v1.0 |
| Date Created | 15-AUG-2025 |
| Last Updated | 22-AUG-2025 |
| Author | Sreelekshmi S |
| Reviewed By | Suma Sundararajan |
| Target Persona(s) | Admins |

### 2. Purpose

This workflow enables administrators to configure laboratory and imaging services in CARE. It covers the creation of locations, healthcare services, and the definitions (Activity, Specimen, Observation, and Charge Item) that form the foundation of diagnostic workflows.

### 3. Scope

**Covers:**
- Creating a lab location in a facility.
- Setting up healthcare services.
- Defining activity, specimen, observation, and charge item definitions.

**Does Not Cover:**
- Processing lab requests (handled by Lab Staff).
- Ordering tests (handled by Doctors/Practitioners).

### 4. User Persona Context

Admins are responsible for setting up and maintaining the structural configurations required for laboratory operations. This ensures smooth coordination between doctors who order tests and lab staff who process them.

### 5. Prerequisites

**System Requirements:**
- CARE Admin account with configuration privileges.
- Access to Facility, Healthcare Services, and Definition setup modules.

**Knowledge Requirements:**
- Understanding of lab workflows and services offered in the facility.
- Familiarity with Activity, Specimen, Observation, and Charge Item setup.

### 6. Expected Outcome

After following this workflow, the facility will have fully configured lab and imaging services with all required definitions, ready for use in clinical workflows.

### 7. Step-by-Step Instructions

#### 7.1 Add Lab Location

Creating a lab location ensures that every diagnostic area *(e.g., Radiology, Biochemistry Lab, Pathology Room)* is accurately mapped within the facility. This allows services to be linked to the right physical or virtual space for smooth coordination and reporting.

1. Navigate to **Settings → Location.**
2. View Existing Locations displayed. Each entry shows the **Type** (e.g., Building, Ward), **Status** (Active/Inactive), and **Availability** (Available or not).
3. Click on the **'+ Add Location'** button at the top right.
4. Fill the **Location** Details:
   - **Location Form**: Choose the type of location from the dropdown.
   - **Name**: Enter a unique name for the location.
   - **Description** (Optional): Provide any relevant clinical or administrative notes about this location.
   - **Status**: Choose the current setup status (Active, Inactive, Unknown).
   - **Operational Status**: Define the real-time usability status of the space (Operational, Closed, Housekeeping, Isolated, Contaminated, Unoccupied).
5. Click **'Create'** to finalize the setup.

#### 7.2 Add Healthcare Services

Healthcare Services define the diagnostic or clinical services *(e.g., Biochemistry, X-Ray, Physiotherapy)* available in the facility. Setting them up ensures that lab requests are properly categorized and linked to the correct location for efficient operations.

1. Navigate to **Settings → Healthcare Services**.
2. Open Healthcare Services, click the **'+ Add Healthcare Service'** button, located in the top-right corner, to create healthcare services.
3. Fill the **Basic Information:**
   - **Name:** Enter the official name of the service (*e.g., General Consultation, X-Ray, Physiotherapy Session*).
   - **Internal Type**: Select the appropriate internal classification from the dropdown.
   - **Extra Details**: Add any additional notes or context that might help other users understand the scope or purpose of this service.
4. Select one or more physical or virtual **locations** from the dropdown where this service can be accessed.
5. Select **Icon** under **Styling** that visually represents the service (optional).
6. Click **Create** to activate the healthcare service in the system.

#### 7.3 Specimen Definition

Specimen Definition specifies the type of biological sample (e.g., blood, urine, tissue) that can be used for an in vitro diagnostic test, that is, a test performed on specimens taken from the human body.

1. Navigate to **Settings > Specimen Definition.**
2. **Navigate** to **Specimen Definition** to display the list of all specimen types defined for the facility.
3. Click **+ Add Definition** at the top-right of the screen.
4. Fill the **Basic Information:**
   - **Title**: Clear, recognisable name. (*e.g. Whole Blood — CBC*).
   - **Slug**: A short, unique code for system use. (*e.g. cbc-blood*).
   - **Status**: Set as Draft, Active, or Retired.
   - **Derived from URI**: Link to another definition if this one is derived (optional).
   - **Description**: Concise narrative describing the specimen and its diagnostic use.
5. Fill the **Specimen Details:**
   - **Type Collected**: Defines the physical type of the specimen collected from the patient.
   - **Collection**: Describes the method used to collect the specimen.
   - **Patient Preparation**: Indicates any preparatory steps that must be followed before collection.
6. Fill the **Type Tested Information:**
   - **Is Derived**: Indicates whether the specimen is obtained from another specimen.
   - **Single Use**: Identifies whether the specimen container is disposable.
   - **Preference**: Marks the specimen as either Preferred or Alternate.
   - **Retention Time:** Defines the allowable duration that the specimen remains valid for testing.
   - **Requirements:** Lists any special handling or transport instructions.
7. Fill the **Container Information:**
   - **Description**: Identifies the container used.
   - **Cap:** Indicates the cap colour or label.
   - **Capacity**: Defines the maximum volume the container can hold.
   - **Minimum Volume**: Specifies the minimum amount of specimen required.
   - **Preparation**: Lists any preparation steps before collection.
8. Click **Save.**

#### 7.4 Observation Definition

Observation Definition represents the definitional aspects of a kind of observation. It describes the structure and constraints of a kind of observation that may be collected and recorded as part of a diagnostic or clinical workflow.

1. Navigate to **Settings → Observation Definition.**
2. **Navigate** to **Observation Definition** to display the list of all observation types defined for the facility.
3. Click **+ Add Definition** to create a new observation, or open **See Details** to edit an existing one.
4. Fill the **Basic Information:**
   - **Title:** Name of the observation as it will appear in the system.
   - **Slug**: A short, system-usable identifier.
   - **Description**: A brief explanation of what the observation measures or represents.
   - **Status**: Indicates the availability state of the observation (Draft, Active, Retired).
   - **Category**: Groups the observation under a broader type.
   - **Data Type**: Specifies the format of the result that will be recorded.
   - **LOINC Code**: Standardised code used for interoperable data exchange.
5. Fill the **Additional Details (Optional):**
   - **Body Site**: Specifies the anatomical location relevant to the observation.
   - **Method**: Describes the technique, device, or process used to generate the observation.
   - **Unit**: Defines the default unit of measurement to be used when entering results.
6. Click **+ Add your first component** section if the observation needs to collect multiple values.
7. Click **Add Component** after defining the components.
8. Click **Create.**

#### 7.5 Charge Item Definition

A Charge Item Definition represents the pricing and billing logic applied to services, procedures, and diagnostic activities offered within a Facility.

1. Navigate to **Settings → Charge Item Definition**
2. Navigate through the dashboard to manage pricing definitions.
3. Click **+ Add Definition** to create a new observation, or open **See Details** to edit an existing one.
4. Fill the **Basic Information:**
   - **Title**: The name of the charge item or service.
   - **Slug**: Short, system-unique identifier.
5. Fill the **Additional Details:**
   - **Description:** A brief explanation of what this charge represents.
   - **Purpose**: Functional categorisation or intended use-case of the item.
   - **Derived from URI:** A reference to a source item or service if this definition is based on another.
6. Fill the **Pricing Component:**
   - **Base Price**: Enter the flat fee charged for this item.
   - **Discounts:** Choose from predefined discounts configured in the system.
   - **Taxes**: Select the applicable Taxes (CGST, SGST, IGST).
7. Review the **Price Summary** to see the computed summary of the final charge.
8. Click **Create**

#### 7.6 Activity Definition

An Activity Definition is a shareable, consumable description of some activity to be performed. It may be used to specify actions to be taken as part of a workflow, order set, or protocol.

1. Navigate to **Settings → Activity Definition.**
2. Navigate through the page which lists all existing activity definitions.
3. To create a new entry, click **+ Add Definition**.
4. Fill the **Basic Information:**
   - **Title**: The name representing the clinical service or test.
   - **Slug**: A short, system-unique identifier used internally.
   - **Description**: A brief narrative that explains the clinical intent of the activity.
   - **Usage**: Indicates the intended use context.
   - **Status**: The lifecycle state of the activity (Draft, Active, Retired).
   - **Category**: The type of service offered.
   - **Kind**: The kind of request used to initiate this activity.
   - **Derived from URI:** (Optional) A URI reference to another Activity Definition.
   - **Code**: A clinical code representing the defined activity.
5. Fill the **Additional Details:**
   - **Body Site**: Indicates the anatomical site where the activity is performed.
6. Specify the **Requirements:**
   - **Specimen Requirements**: Select one or more predefined Specimen Definitions.
   - **Observation Requirements**: Choose the relevant Observation Definitions.
   - **Charge Item Definition:** Link the Charge Item Definition.
   - Add the **location** where the activity is to be performed.
7. Specify the **Diagnostic Report** for the activity.
8. Click **Create.**

## Laboratory Module - Doctor Workflow

### 1. Document Information

| Field | Value |
|-------|-------|
| Module | Laboratory Module |
| Version | v1.0 |
| Date Created | 15-AUG-2025 |
| Last Updated | 22-AUG-2025 |
| Author | Sreelekshmi S |
| Reviewed By | Suma Sundararajan |
| Target Persona(s) | Doctors / Practitioners |

### 2. Purpose

This flow is designed to help doctors order diagnostic tests and access results directly within CARE. It ensures that test requests are consistent, easy to track, and linked to the patient's encounter, while also providing a clear way to review finalized reports that support timely clinical decisions.

### 3. Scope

**Covers:**
- Ordering laboratory and imaging tests as part of a patient encounter.
- Viewing diagnostic reports after they have been completed and approved.

**Do Not Cover:**
- Configuration of services or definitions (covered in Admin Flow).
- Specimen collection, test execution, and validation (covered in Lab Staff Flow).

### 4. User Persona Context

Doctors and Practitioners use this flow during patient consultations. They prescribe tests, provide preparation instructions where needed, and later review reports to confirm diagnoses or adjust treatment plans.

#### 4.1 Navigation for Doctors

1. From the sidebar "**Patients**", click on **"Encounters".**
2. Click **View Encounter** to open the encounter dashboard.

### 5. Prerequisites

**System Requirements:**
- CARE Staff account with **Doctor/Practitioner** role assigned.
- Access to **Encounters** and **Service Request** modules.

**Knowledge Requirements:**
- Familiarity with prescribing diagnostic tests.
- Ability to interpret and review diagnostic reports.

### 6. Expected Outcome

After following this workflow, doctors will be able to:
- Prescribe and submit lab or imaging test requests during patient encounters.
- Access completed diagnostic reports for clinical interpretation and decision-making.

### 7. Step-by-Step Instructions

#### 7.1 How to Initiate a Service Request in the System

In a clinical setting, doctors frequently request services such as laboratory tests, imaging procedures, home care visits, or diagnostic panels. In the CARE platform, these services are formally represented as Service Requests linked to a predefined Activity Definition.

1. After logging in, follow the Navigation for Doctors steps.
2. Select **Service Request** from the dropdown.
3. Configure the **Service Request,** which is a formal request in CARE raised by a Doctor for a specific clinical service, such as a laboratory test, imaging scan, or procedure.
4. Select **Activity definition** under Service Request and fill the remaining details:
   - **Priority:** Indicates the urgency of the service request (Routine, Urgent, ASAP, Stat).
   - **Body Site**: Specifies the anatomical location where the procedure or sample collection is to occur.
   - **Patient Instructions:** Free-text field to capture any instructions the patient must follow.
   - **Notes**: Internal remarks for the care team; not visible to the patient.
5. Click **Submit.**

#### 7.2 Viewing a Patient's Diagnostic Report

Once a diagnostic service has been completed and results have been reviewed and approved, the corresponding Diagnostic Report becomes available within the patient's encounter.

**Note:** The doctor can view a diagnostic report only when it's approved by a senior reviewer in the lab.

1. After logging in, follow the Navigation for Doctors steps.
2. Inside the **Encounter dashboard**, click the **Diagnostic Reports.**
3. Click **View Details** to review Report Details.
4. Review the Diagnostic Report which contains:
   - **Patient Information**: Displays the patient's full name, DOB/age, and other demographic details.
   - **Test Name**: Indicates the name of the diagnostic service performed.
   - **Category**: Specifies the type of service performed.
   - **Status**: Reflects the current lifecycle state of the report.
   - **Conclusion**: A clinical summary of the result interpretation.
   - **Results**: Lists individual observations recorded as part of the diagnostic test.
5. Click **Print** to generate a PDF version of the Diagnostic Report.

## Laboratory Module - Lab Staff Workflow

### 1. Document Information

| Field | Value |
|-------|-------|
| Module | Laboratory Module |
| Version | v1.0 |
| Date Created | 15-AUG-2025 |
| Last Updated | 21-AUG-2025 |
| Author | Sreelekshmi S |
| Reviewed By | Suma Sundararajan |
| Target Persona(s) | **Lab Staff, Technician & Senior Reviewers** |

### 2. Purpose

The goal of this workflow is to help Lab Staff, Technician & Senior Reviewers to handle test requests from doctors, collect the right specimens, enter the results, and make sure the final report is approved.

### 3. Scope

**Covers:**
- Checking and opening service requests raised by doctors.
- Collecting specimens and recording collection details.
- Processing specimens and entering test results.
- Generating diagnostic reports.
- Verifying reports before they are visible to doctors.

**Does Not Cover:**
- Creating or configuring services (Admin responsibility).
- Placing service requests (Doctor responsibility).
- Approving or interpreting results (Doctor responsibility).

### 4. User Persona Context

The users of this workflow are laboratory staff and senior lab staff. Lab staff are responsible for checking new service requests, collecting and processing specimens, and recording results in CARE. Senior lab staff act as reviewers — they go through the reports prepared by the team, verify the accuracy of the results, and approve them before doctors can view them.

#### 4.1 Navigation for Lab Staff

1. Under **Service**, the list of healthcare services offered by the Facility is seen.
2. Locate the service you are responsible for and click **View Details**.
3. Click **View Requests** to access the queue of service requests relevant to that department.
4. View and Filter Active Service Requests. You will see a table of submitted requests including:
   - **Patient Name**: The patient for whom the request was raised.
   - **Service Type**: The ordered service, linked to its Activity Definition.
   - **Priority**: Indicates urgency (Routine, Urgent, ASAP, Stat).
   - **Status**: Pending, In Progress, or Completed.
5. Click **See Details** to open and manage the request.

### 5. Prerequisites

**System Requirements:**
- CARE Staff account with **Lab Staff** role assigned.
- Access to the Laboratory **module** in the facility.

**Knowledge Requirements:**
- Familiarity with specimen collection and safety protocols.
- Ability to process specimens and enter results in CARE.
- For senior lab staff: ability to review and verify diagnostic reports.

### 6. Expected Outcome

After following this workflow, lab staff will be able to check service requests, collect and process specimens, and generate diagnostic reports within CARE. Senior lab staff will successfully review and verify these reports, making them available for doctors to access and use in patient care.

### 7. Step-by-Step Instructions

#### 7.1 How to Check a Service Request

In the CARE platform, each medical test or diagnostic procedure requested by a doctor is formalized as a Service Request, tied to a predefined Activity Definition.

1. After logging in, follow the Navigation for lab Staff steps.
2. Review the **Request** Details. Inside the detailed request view, carefully verify:
   - **Priority**: To determine urgency of fulfillment.
   - **Specimen:** As defined by the associated Specimen Definition.
   - **Observation Definition**: The expected observations that must be recorded.
   - **Requested Doctor**: The doctor who submitted the request.
   - **Payment or Billing Status**: The status of payment can be viewed here.

#### 7.2 How to Collect Required Specimen(s)

1. After logging in, follow the Navigation for lab Staff steps.
2. Scroll to the **Specimen** section of the request.
3. Click **+Collect Specimen.**
4. Fill out the collection form with the following fields:
   - **Date and Time of Collection**
   - **Quantity and Unit** *(e.g., 5 mL, 2 swabs)*
   - **Body Site**: The anatomical location from which the specimen is to be collected.
   - **Fasting Status**: Mark as Yes or No.
   - **Fasting Duration**: Duration in hours if applicable.
   - **Storage Information:** Instructions such as Refrigerated at 2–8°C.
5. Cross-check the **Container Requirements** configured in the linked Specimen Definition.
6. Click **Collect**, once verified.
7. A **QR code** will be automatically generated for the specimen.
8. Click **Process Specimen** to choose specimen steps performed on the Specimen (If Needed).
9. Click to the Specimen **Processing Step**, if the sample needs to go through any processing.
10. Click **Add** in the Add Processing Step.

#### 7.3 How to generate a Report

1. After logging in, follow the Navigation for lab Staff steps.
2. After collection and processing, navigate to the **Test Result** Generation section.
3. Choose the appropriate **Diagnostic Result Type**, linked to the Observation Definitions from the Activity.
4. Click **Create Report.**
5. Enter the **Observation Value** (Clinical Findings):
   - **Result**: Measured value or qualitative outcome.
   - **Abnormal Flag**: If applicable, mark if the result is outside normal range.
   - **Conclusion**: Optional clinical interpretation or summary.
6. After reviewing the inputs, click **Save Result.**

#### 7.4 How to Verify a Report

1. Once the result is recorded, review it in the Result **Review tab.**
2. The report is routed to a designated **Senior Reviewer** (e.g., *Department Head or Approver*).
3. The reviewer reviews the results, clinical summary, and observation details.
4. Upon validation, they click **Approve Results.**

## Error Handling / Common Issues

| Error / Issue | Possible Cause | Resolution |
|---------------|----------------|------------|
| Unable to link Lab Location to a Facility. | Missing permissions or incorrect facility mapping. | Verify Admin role permissions; re-map the lab location to the correct facility. |
| Healthcare Service not saving. | Required fields (name, type, category) not filled. | Enter all mandatory details before saving. |
| Activity Definition missing in Service Request dropdown. | Activity not created or set to Retired. | Create/activate Activity Definition under Admin settings. |
| Specimen Definition not available for selection. | Specimen not configured or inactive. | Add the specimen type and set it to Active. |
| Observation fields showing incorrectly in reports. | ObservationDefinition not configured properly. | Correct or update observation definition with right units and codes. |
| Charge Item not linked to service. | Charge Item not mapped to the Activity Definition. | Map the correct charge item while configuring the activity. |
| Patient encounter not found in the Encounters tab. | Encounter not created or patient registered under another facility. | Create a new encounter or switch to the correct facility. |
| Service Request assigned to the wrong facility. | Request created under a different facility. | Switch to the correct facility or ask the doctor to resubmit under the right one. |
| Barcode/Specimen ID not generated. | Specimen definition missing barcode rule. | Contact Admin to configure specimen ID/barcode generation. |
| Verification button disabled. | The user does not have reviewer/approver permissions. | Ensure senior staff roles with verification rights are assigned. |

## Related Documents / Links

*To be added as needed*

## Revision History

| Version | Date | Changes Made | Author | Reviewer |
|---------|------|--------------|--------|----------|
| v1.0 | 16-AUG-2025 | Initial draft | Sreelekshmi S | Suma Sundararajan |
| v2.0 | 18-AUG-2025 | Reordered and structured content; added subsections. | Sreelekshmi S | Suma Sundararajan |
| v2.1 | 20-AUG-2025 | Added overview and login navigation; aligned formatting as per suggestions. | Sreelekshmi S | Suma Sundararajan |
| v2.2 | 21-AUG-2025 | Corrected screenshot sizing, spacing, and color consistency. | Sreelekshmi S | Suma Sundararajan |
| v2.3 | 22-AUG-2025 | Final corrections: applied uniform color theme and added missing details. | Sreelekshmi S | Suma Sundararajan |