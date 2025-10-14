---
title: Clinical Module
sidebar_position: 7
---

# Clinical Module

## Overview

### Document Information

| Field | Details |
|-------|---------|
| Module | Clinical Module (Encounter) |
| Version | v1.0 |
| Date Created | 25-Aug-2025 |
| Last Updated | 28-Aug-2025 |
| Author | AYISHA SHADHI |
| Reviewed By | Suma Sundararajan |
| Target Persona(s) | Doctor, Clinical Staff |

### Purpose

The Clinical Module provides a structured workflow for recording and managing patient encounters. It ensures that doctors and clinical staff can efficiently document clinical interactions, capture vital signs, update patient records, and maintain accurate and secure medical information. This module aims to standardize documentation, enhance care coordination, and support data-driven clinical decisions.

### Scope

**Covers:**
- Encounter creation and comprehensive clinical documentation
- Recording vitals, symptoms, diagnoses, and treatments
- Medication prescribing and management
- Service requests and diagnostic procedures
- Clinical notes and care team communication
- File management and device integration
- Insurance claims processing

**Does not Cover:**
- Billing or insurance processing workflows (covered in Billing module)
- Pharmacy dispensing operations (covered in Pharmacy module)
- Non-clinical administrative tasks

### User Persona Context

The Clinical Module serves two primary user groups:
- **Doctor**: Primary clinician responsible for patient diagnosis, treatment decisions, encounter creation, and comprehensive clinical documentation during patient visits
- **Clinical Staff**: Support personnel who record vital signs, update patient status, manage documents, and assist with patient care under the doctor's supervision

### Prerequisites

**System Requirements:**
- Valid user account with correct role permissions (Doctor or Clinical Staff)
- Access to the assigned healthcare facility on the CARE platform
- Stable internet connection and updated web browser (Google Chrome, Microsoft Edge, or Mozilla Firefox)

**Knowledge Requirements:**
- Basic understanding of clinical terminology relevant to patient encounters
- Ability to correctly identify patients using ID, name, or registration number
- Familiarity with role-specific workflows (e.g., doctors creating encounters, clinical staff recording vitals)
- Awareness of data privacy and confidentiality standards while handling patient records

### Expected Outcome

Doctors will successfully create and manage complete patient encounters with accurate diagnoses, appropriate medication prescriptions, comprehensive clinical notes, and proper service requests. Clinical Staff will accurately record observations, maintain up-to-date documentation, and support comprehensive patient care. All clinical decisions will be documented and accessible to the care team.

### Login Requirements

Before accessing any Clinical Module workflows, users must complete the authentication process:

1. **Platform Access**: Open your web browser and navigate to the CARE platform URL
2. **Login Credentials**: Enter your username and password for the CARE platform
3. **Facility Selection**: Select the associated facility from the Facilities list
4. **Dashboard Navigation**: Access the main dashboard with options including Overview, Patients, Queues, Appointments, Services, Resources, Users, Billing, and Settings

## Module Components

This module consists of two integrated components for comprehensive clinical care:

- [Doctor Guide](#doctor-guide) - Complete clinical documentation and encounter management
- [Clinical Staff Guide](#clinical-staff-guide) - Support activities and patient care assistance

---

## Doctor Guide

### Purpose

This workflow enables doctors to create patient encounters, make clinical diagnoses, prescribe medications, and manage comprehensive patient care documentation. Doctors have full encounter management capabilities, including creation, clinical decision-making, and treatment planning.

### Scope

**Covers:**
- Complete encounter lifecycle from creation to clinical documentation and care coordination
- Patient registration, encounter initiation, diagnosis recording, medication prescribing, and clinical note documentation

**Does not Cover:**
- Nursing tasks (covered in Clinical Staff workflow)
- Administrative oversight (covered in Administration modules)
- Billing processes (covered in Billing module)

### User Persona Context

Doctors are the primary clinicians responsible for patient diagnosis, treatment decisions, encounter creation, and comprehensive clinical documentation during patient visits. They lead the clinical team and coordinate patient care activities.

### Prerequisites

**System Requirements:**
- The doctor's role must be assigned in the CARE platform
- User must be logged in with the correct credentials
- Access to the assigned facility must be enabled

**Knowledge Requirements:**
- Clinical expertise for accurate patient diagnosis and decision-making
- Understanding of medical terminology and abbreviations used in documentation
- Familiarity with standard treatment protocols and procedures
- Awareness of patient data privacy, security, and confidentiality standards

### Expected Outcome

Doctors will successfully create and manage complete patient encounters with accurate diagnoses, appropriate medication prescriptions, comprehensive clinical notes, and proper service requests. All clinical decisions will be documented and accessible to the care team.

### Step-by-Step Instructions

#### Patient Registration and Encounter Creation

##### Patient Registration

This process allows doctors and staff to add a new patient record when the patient is not already available in the system.

1. **Navigate to Patient Search**:
   - From the home screen, open **Facilities** and select your hospital
   - Go to **Patients > Search patients** from the sidebar

2. **Search for Existing Patient**:
   - Search by **Phone Number** or **Hospital ID**
   - If the patient is not found, click **Add New Patient**

3. **Complete Patient Registration Form**:
   - **General Info**: Enter Name, Phone, Emergency Contact, Sex, Blood Group
   - **Tags**: Add or search patient groups (e.g., Maternal, Gender, Ration Card)
   - **Date of Birth**: Enter Day, Month, Year
   - **Deceased Status**: Check only if the patient is deceased
   - **Address**: Complete Current & Permanent Address, Pincode, Nationality, State, District, Municipality, Ward
   - **Identifiers**: Hospital ID auto-generated

4. **Save Patient Information**:
   - Click **Save and Continue** to complete registration

##### Create New Encounter (Doctor-Only Function)

This function enables doctors to initiate a new patient visit, link it to clinical records, and start documenting care activities.

1. **Access Patient Dashboard**:
   - Navigate to **Patients > Search patients** from the sidebar
   - Enter the **Phone Number** or **Hospital ID** in the search bar
   - Select the patient from the search results
   - Verify the patient's identity by entering the **Year of Birth**
   - Click **Verify** to confirm patient identity

2. **Initiate Encounter Creation**:
   - On the Patient Dashboard, click **Create Encounter** in Quick Actions

3. **Complete Encounter Information**:
   - **Date and Time**: Set the encounter date and time
   - **Type of Encounter**: Select from:
     - **Inpatient**: Patient admitted to the hospital
     - **Ambulatory**: Outpatient care visits
     - **Observation**: Patient under clinical observation
     - **Emergency**: Urgent care requiring immediate attention
     - **Virtual**: Telehealth or remote consultation
     - **Home Health**: Care provided at patient's residence
   - **Status**: Choose In progress, Planned, or On Hold
   - **Priority**: Choose Routine, Urgent, or Stat
   - **Tags**: Add relevant tags for categorization
   - **Department**: Select appropriate clinical department

4. **Create and Access Encounter**:
   - Click **Create Encounter** to initiate patient visit
   - The encounter is created and added to the patient's record

#### Clinical Assessment and Records

##### Access Clinical Dashboard

1. **Navigate to Encounters**:
   - From the home screen, open **Facilities** and select your hospital
   - Go to **Patients > Encounters** from the sidebar
   - In the Encounters list, locate the patient
   - Click **View Encounter** for the active admission
   - Access the **Clinical Dashboard**

##### Add Allergy

The Add Allergy function allows clinicians to record or update a patient's allergy or intolerance information, ensuring accurate documentation of substances that may cause adverse reactions.

1. **Access Allergy Documentation**:
   - In the **Overview tab**, click **+ Add Allergy**

2. **Select Allergy Information**:
   - Click **Add allergy** in the search box and select the correct one from the list

3. **Complete Allergy Details**:
   - **Criticality**: Low, High, Unable to Assess
   - **Status**: Active, Inactive, Resolved
   - **Verification**: Confirmed, Unconfirmed, Presumed
   - **Occurrence Date**: Date allergy first noted

4. **Optional Documentation**:
   - Click **Add Questionnaire** and complete for additional clinical details

5. **Save Allergy Information**:
   - Click **Submit** to save allergy in the patient record

##### Add Symptoms

The Add Symptoms function allows clinicians to record and update patients' presenting complaints during encounters using structured questionnaires.

1. **Access Symptom Documentation**:
   - In the **Overview tab**, click **+ Add Symptoms**

2. **Select Symptom Information**:
   - Click **Add Symptoms** in the search box and select the correct one from the list

3. **Enter Symptom Details**:
   - **Date**: When observed
   - **Status**: Active, Inactive, Resolved
   - **Severity**: Mild, Moderate, Severe
   - **Verification**: Confirmed, Provisional, Differential, Unconfirmed, Refuted

4. **Add Multiple Symptoms**:
   - Use **Add another Diagnosis** for additional entries

5. **Complete Documentation**:
   - Optionally click **Add Questionnaire** for additional clinical details
   - Click **Submit** to save symptoms linked to the encounter

##### Add Diagnosis

The Add Diagnosis function records, updates, and manages a patient's medical diagnoses during an encounter, ensuring accurate documentation for clinical decision-making.

1. **Access Diagnosis Documentation**:
   - In the **Overview tab**, click **+ Add Diagnosis**

2. **Select Diagnosis**:
   - Click **Add Diagnosis** to add a diagnosis
   - Select the appropriate option from the suggestions

3. **Set Diagnosis Parameters**:
   - **Date**: When the diagnosis was made
   - **Status**: Active, Recurrence, Relapse, Inactive, Remission, Resolved
   - **Verification**: Confirmed, Provisional, Differential, Suspected

4. **Add Multiple Diagnoses**:
   - Use **Add another Diagnosis** for additional entries

5. **Complete Documentation**:
   - Optionally complete the **Questionnaire** for additional clinical details
   - Click **Submit** to record diagnosis in the patient's profile

##### Add Form

The Forms section allows healthcare providers to add structured questionnaires to capture detailed clinical information.

1. **Access Forms Section**:
   - Go to the patient's **Overview** tab
   - Click **+ Forms**

2. **Select Questionnaire**:
   - Choose the required questionnaire (e.g., OPD Consultation Form, Doctor's Progress Notes, Community Nurse Homecare Form)

3. **Complete Form Details**:
   - Fill in required information such as:
     - **Logistical Feasibility**: Yes/No
     - **Oncologist Experience**: 1–5 rating
     - **Efficiency of Consultation Process**: 1–5 rating
     - **Decision Making**: Yes/No
     - **Suggestions for Improvement**: Free text

4. **Submit Form**:
   - Optionally complete additional **Questionnaire** for clinical details
   - Click **Submit** to save the questionnaire in the patient record

#### Medicines – Prescribe and Manage Drugs

The Medicine section allows healthcare providers to prescribe and manage patient medications during an encounter.

1. **Access Medicines Section**:
   - In the **Overview tab**, click **Medicines**
   - Review existing Prescriptions, Ongoing Medicines, and Medicine Administration

2. **Add or Edit Medications**:
   - Click **Add/Edit Medicines** to open the Medication Request form
   - **If no medicines are listed**: Use **Add** to create a new prescription
   - **If medicines are already listed**: Use **Edit** to update existing prescriptions or add new ones

3. **Add New Medication**:
   - Click **+ Add Medication** in the Medication Request Form
   - Select a Medicine from the list (e.g., Dolo)

4. **Enter Medication Details**:
   - **Medication Name**: Verify selected medication
   - **Dosage**: Specify amount per dose
   - **Frequency**: Set administration frequency (e.g., TID – three times daily)
   - **Duration**: Specify treatment duration
   - **Instructions**: Add administration instructions (e.g., "Until gone")

5. **Optional Additional Information**:
   - **Route**: Add administration route (e.g., Sublabial route, Subretinal route, Intraportal route)
   - **Site**: Add administration site (e.g., Structure of left supraclavicular lymph node, Structure of right deltoid muscle)
   - **Questionnaire**: Add additional clinical questionnaire (e.g., "OPD Consultation Form", "Tele-Medicine-Consultation")

6. **Save Prescription**:
   - Click **Save** to complete medication order
   - View newly added medications in the patient's medicines section

#### Notes

The Notes section allows healthcare providers to record and organize clinical information during a patient's encounter.

1. **Access Notes Section**:
   - In the **Overview tab**, click **Notes**

2. **Create New Note**:
   - Click **+ New** or the **Start New Discussion** button

3. **Select Note Type**:
   - Select a predefined template or type a custom title

4. **Create Discussion Thread**:
   - Click **Create** and the thread will appear in the Discussions panel

5. **Add Clinical Notes**:
   - Open the thread, type your message, and click send
   - View notes with timestamps and continue adding updates in the same thread

#### Consent

The Consents section allows healthcare providers to document a patient's permissions or refusals for specific treatments or procedures.

1. **Access Consents Section**:
   - From the patient record, select the encounter and go to the **Consents** tab

2. **Add New Consent**:
   - Click the **Add Consent** button on the right side

3. **Enter Consent Details**:
   - **Consent Date**: Fill in the consent date
   - **Validity Period**: Set the validity period
   - **Decision**: Select Permit or Deny

4. **Select Consent Category**:
   - Choose appropriate category:
     - Research
     - Privacy Consent
     - Treatment
     - Do Not Resuscitate
     - Advance Directive
     - Advance Care Directive

5. **Set Consent Status**:
   - Select from: Active, Inactive, Draft, Not Done, Entered in error

6. **Complete Documentation**:
   - Write any additional notes if required
   - Upload any related files in the **Supporting Documents** field
   - Click **Save** to record the consent

#### Service Request

The Service Requests section allows healthcare providers to request specific clinical services or tests for a patient during an encounter.

1. **Access Service Requests**:
   - From the patient record, select the encounter and go to the **Service Request** tab

2. **Create New Request**:
   - Click **+ Create Service Request** on the Service Requests tab

3. **Select Service Type**:
   - In the Service Request form, select the **Service Request type** from the dropdown (e.g., WBC – White Blood Cell count)

4. **Enter Request Details**:
   - **Priority**: Set request priority level
   - **Body Site**: Specify anatomical location if applicable
   - **Patient Instruction**: Add optional patient instructions
   - **Note**: Include optional clinical notes

5. **Submit Request**:
   - Click **Add** to include the request in the form
   - Optionally attach a **Questionnaire** for additional structured information
   - Click **Submit** to save the service request

6. **Manage Request Lifecycle**:
   - The request is created and shown as Active in the patient record
   - Click **See Details** to open the request
   - Review the **report** generated upon testing:
     - Check test values, reference ranges, and interpretation
     - Add a **Conclusion**
     - If correct, click **Approve Results**
     - Click **Approve** to make the report **Final** (cannot be edited)
   - Once care process is complete, click **Mark as Complete**
   - Request status updates from **Active** to **Completed**

#### Diagnostic Report

The Diagnostic Reports section allows healthcare providers to review and manage all diagnostic test reports linked to a patient's encounter.

1. **Access Diagnostic Reports**:
   - From the patient record, select the encounter and go to the **Diagnostic report** tab

2. **Review Reports**:
   - From the list of reports, click **View Details** next to the required report

3. **Analyze Results**:
   - The full diagnostic report opens, showing patient details, report category, status, and conclusion
   - Review the **results** in the Test Results table (e.g., Complete Blood Count, Hemoglobin, Hematocrit, Erythrocytes, Platelets)
   - Interpret the **results** and use them to support clinical decision-making

### Error Handling and Common Issues

| Error/Issue | Possible Cause | Resolution |
|-------------|----------------|------------|
| `Cannot create an encounter` | Patient not properly registered | Complete patient registration first, and ensure all mandatory fields are filled |
| `Prescription not saving` | Incomplete medication details | Verify all prescription fields are completed: name, dose, frequency, duration |
| `Diagnosis search returns no results` | Incorrect spelling or terminology | Try alternative medical terms or abbreviations, and check spelling |
| `Service request failed to submit` | Missing priority field | Priority is mandatory - select Routine, Urgent, or Stat |
| `Clinical notes are not saving` | Session timeout or network issue | Refresh page, re-login if necessary, and re-enter notes |

---

## Clinical Staff Guide

### Purpose

This workflow enables clinical staff and nurses to support patient encounters by recording vital signs, managing clinical documentation, uploading patient files, and assisting with patient care activities under physician supervision. Clinical staff play a crucial support role in comprehensive patient care delivery.

### Scope

**Covers:**
- Recording vital signs and clinical observations
- Documenting patient status and observations
- Managing files and attachments
- Updating patient information within existing encounters
- Supporting clinical workflows and care coordination

**Does not Cover:**
- Encounter creation (doctor-only function)
- Prescribing medications (physician responsibility)
- Making diagnostic decisions (physician responsibility)

### User Persona Context

Clinical Staff provide direct patient care support, record essential patient data, maintain clinical documentation, and assist physicians with patient care coordination. They work within encounters created by doctors and follow established care protocols.

### Prerequisites

**System Requirements:**
- The Clinical Staff role must be assigned within the CARE platform
- Active login credentials for the CARE platform
- Access to patient encounters assigned to the user
- Up-to-date browser or CARE-supported application version

**Knowledge Requirements:**
- Basic clinical skills, including patient assessment and observation
- Techniques for accurate measurement of vital signs (temperature, blood pressure, pulse, respiration, oxygen saturation)
- Familiarity with medical terminology and abbreviations used in clinical documentation
- Understanding of patient safety protocols, including infection control and emergency procedures
- Ability to identify and report abnormal patient findings promptly

### Expected Outcome

Clinical staff will accurately record patient vital signs, maintain up-to-date clinical documentation, manage patient files effectively, and provide quality patient care support. All recorded data will be immediately available to the care team for clinical decision-making.

### Step-by-Step Instructions

#### Accessing Patient Encounters and Clinical Dashboard

1. **Navigate to Patient Encounters**:
   - From the home screen, open **Facilities** and select your hospital
   - Go to **Patients > Encounters** from the sidebar
   - Locate the patient in the list and click **View Encounter** for the active admission
   - Access the Clinical Dashboard to review the patient's overview and current status

*Note: Only doctors can create new encounters; clinical staff can only work within existing ones.*

#### Plots

The Plot section displays vital signs and clinical parameters (heart rate, temperature, blood pressure, oxygen levels, etc.) over time in graphical form for clinical monitoring.

1. **Access Plots Section**:
   - In the **Overview** tab, click **Plots**

2. **View Clinical Parameters**:
   - Choose a category of plots to view:
     - **Primary Parameters**: Blood Pressure, Pulse, Temperature, etc.
     - **ABG Analysis**: Blood gas results and related parameters
     - **Respiratory Support**: Ventilation, oxygen support details
     - **Nutrition**: Nutritional intake and related values
     - **Dialysis**: Dialysis-related readings

3. **Monitor Patient Trends**:
   - Observe color-coded, time-stamped data points that display changes over time
   - Use the graphs to quickly track patient progress and identify any sudden changes in condition

#### Observation

The Observation module records clinical notes, assessments, and physical findings made by healthcare professionals during the encounter.

1. **Access Observations**:
   - In the **Overview** tab, click **Observation**

2. **Review Clinical Observations**:
   - Look for entries showing the **test name, time, and result/status**
   - Confirm that tests ordered in **Service Requests** are now visible in **Observations**
   - Read observation details (e.g., CBC panel – Blood by Automated count, All fine) and note completion

#### Files

The Files section allows healthcare providers to store and manage patient documents for a selected encounter.

1. **Access Files Section**:
   - In the **Overview** tab, click **Files**

2. **Add New Files**:
   - Click **Add Files**
   - Select upload method:
     - **Upload from Device**: Select files from computer storage
     - **Open Camera**: Start recording video
     - **Record Audio**: Start recording voice

3. **Upload and Manage Files**:
   - Add a relevant name for the document and click upload
   - The file appears in the list for future reference

4. **Generate Discharge Summary**:
   - Open the **discharge summary** tab
   - Click **Generate Discharge Summary**
   - PDF is created and shown in the list
   - Click **View** to open the PDF

5. **Create Clinical Drawings**:
   - Open the **Drawings** tab and click **New Drawing**
   - Sketch or mark notes, add a name to the drawing, then save it
   - All uploaded files, discharge summaries, and drawings can be viewed anytime in the Files section

#### Devices

The Devices section allows healthcare providers to link medical devices to a specific patient encounter for monitoring or data collection.

1. **Access Device Management**:
   - Go to the patient encounter and click on the **Files** tab

2. **Associate Medical Devices**:
   - If no devices are linked, click **'Associate a device to this encounter'**
   - In the **'Associate device'** pop-up, click the **'Select a device…'** dropdown
   - Choose from available devices (e.g., Ventilator, ECG Monitor, Infusion Pump, Dialysis Machine, Glucometer)
   - Click **'Associate'** to link the device to the encounter

#### Insurance Claims

The Insurance Claims section allows healthcare providers to check a patient's coverage eligibility and manage insurance details within the patient encounter.

1. **Access Insurance Claims**:
   - Go to the patient encounter and click on the **Insurance Claims** tab

2. **Check Eligibility**:
   - Select an option (e.g., Coverage Verification, Pre-Authorization Request, Claim Status Check)
   - Click **Check Eligibility**

3. **Manage Coverage Information**:
   - On the Insurance Claims screen, click the **'Manage Coverages'** button at the top right
   - Fill in the details:
     - Enter the **Coverage ID** in the designated field
     - Enter the **Subscriber ID** in the designated field
     - Select the **Payor** from the dropdown menu
   - Click **'Add Coverage'** to save the information

#### ABDM Records

Ayushman Bharat Digital Mission (ABDM) Records let you access a patient's health information from the national digital health system after patient consent.

1. **Access ABDM Records**:
   - In the **Overview tab**, click **ABDM Records**

2. **Request Patient Consent**:
   - If no records appear, note the message: "No Records Found – Raise a consent request to fetch patient records over ABDM"
   - Click the consent request prompt in the **ABDM Records** tab
   - Fill in the required patient and encounter details and submit the request
   - Once the patient grants consent, health records will be visible in the **ABDM Records** section

#### Completing a Patient Encounter

This workflow ensures proper finalization of a patient encounter, documenting all clinical activities and closing the encounter.

1. **Access Encounter Completion**:
   - In the **Overview** tab, navigate to the **Actions** tab on the right side of the screen

2. **Mark Encounter Complete**:
   - Click **Mark as completed**
   - A confirmation pop-up will appear
   - Review the message, then click the **Mark as complete** button in the pop-up to finalize

**Important**: Once marked as completed, the encounter **cannot be edited further**.

### Error Handling and Common Issues

| Error/Issue | Possible Cause | Resolution |
|-------------|----------------|------------|
| `Cannot access "Create Encounter"` | Insufficient role permissions | Only doctors can create encounters - access existing encounters only |
| `Vital signs not saving` | Missing mandatory fields | Complete all required vital sign measurements before saving |
| `File upload failing` | File too large or unsupported format | Check file size limits and use supported formats (PDF, JPG, PNG) |
| `Cannot edit prescriptions` | No prescription authority | Contact the physician for medication changes - clinical staff cannot modify prescriptions |
| `Notes are not appearing` | Network connectivity issue | Check internet connection, refresh page, and re-enter notes if necessary |

## Integration Points

The Clinical Module integrates seamlessly with other CARE platform modules:

- **Patient Administration**: Patient demographics and medical history access
- **Pharmacy**: Prescription management and medication orders
- **Lab**: Test ordering and result review
- **Billing**: Procedure and service documentation for billing workflows
- **Scheduling**: Appointment coordination and follow-up care

## Training Requirements

- Clinical documentation standards and best practices
- Electronic health record navigation and usage
- Clinical decision support system utilization
- Interdisciplinary communication protocols
- Quality improvement and patient safety initiatives

## Revision History

| Version | Date | Changes Made | Author | Reviewer |
|---------|------|--------------|--------|----------|
| v1.0 | 25-Aug-2025 | Initial Draft | Ayisha Shadhi | Suma Sundararajan |
| v1.1 | 26-Aug-2025 | Changed heading sizes, adjusted spacing, updated steps, and added screenshots | Ayisha Shadhi | Suma Sundararajan |
| v1.2 | 28-Aug-2025 | Added text to the step, added examples in Devices and Insurance sections, removed extra spaces, and added description in ABDM Records section | Ayisha Shadhi | Suma Sundararajan |

---

*This documentation is part of the CARE platform user guide. For technical support, please contact your system administrator.*