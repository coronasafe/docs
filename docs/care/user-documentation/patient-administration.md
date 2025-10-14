---
title: Patient Administration
sidebar_position: 6
---

# Patient Administration Module

## Overview

### Document Information

| Field | Details |
|-------|---------|
| Module | Patient Administration Module |
| Version | v1.0 |
| Date Created | 22nd August 2025 |
| Last Updated | 29th August 2025 |
| Author | Ardhra SunilKumar |
| Reviewed By | Suma Sundararajan |
| Target Persona(s) | Practitioner/Anyone with access to patient profile |

### Purpose

This workflow enables healthcare practitioners to access, update, and manage comprehensive patient information and treatment-related records. It ensures accurate documentation, supports clinical workflows, and maintains continuity of care across the healthcare facility.

### Scope

**Covers:**
- Patient search and profile creation
- Comprehensive patient information management
- Clinical documentation and history tracking
- Appointment and encounter management
- Patient updates, requests, and communication
- File management and user assignments

**Does not Cover:**
- Appointment scheduling workflows (covered in Appointment module)
- Patient registration at facility level
- Facility creation and administration

### User Persona Context

Healthcare practitioners (doctors, nurses, clinical staff) use the Patient Administration Module to create, access, and update patient profiles, manage clinical information, and coordinate care across different departments and encounters.

### Prerequisites

**System Requirements:**
- Active login to the CARE platform with appropriate credentials
- Assigned practitioner role with patient access permissions
- Stable internet connection and supported browser access

**Knowledge Requirements:**
- Familiarity with patient search methods (Care ID, phone number, name)
- Understanding of clinical documentation requirements
- Basic knowledge of encounter types and clinical workflows
- Awareness of privacy and security protocols for patient information

### Expected Outcome

Healthcare practitioners will be able to efficiently manage patient profiles, maintain accurate clinical documentation, coordinate care across multiple encounters, and ensure continuity of care with complete and accessible patient records.

### Login Requirements

Before accessing any Patient Administration workflows, users must complete the authentication process:

1. **Login to CARE Platform**: Navigate to the CARE Staff Login page and enter your credentials
2. **Facility Selection**: Choose your associated facility from the Facilities list
3. **Dashboard Access**: Access the main dashboard with navigation options including Overview, Patient, Queues, Appointments, Services, Resources, Users, Billing, and Settings
4. **Patient Module Navigation**: The Patients section provides access to patient search, profile management, and related functions

## Module Components

This module consists of several integrated components for comprehensive patient management:

- [Patient Profile Creation](#patient-profile-creation) - Creating new patient records
- [Patient Search and Access](#patient-search-and-access) - Finding and accessing existing patients
- [Patient Information Management](#patient-information-management) - Managing comprehensive patient data
- [Clinical Documentation](#clinical-documentation) - Recording and tracking clinical information
- [Communication and Coordination](#communication-and-coordination) - Patient updates, requests, and team collaboration

---

## Patient Profile Creation

### Purpose

This workflow enables healthcare practitioners to create comprehensive patient profiles for new patients entering the healthcare system, ensuring all essential demographic, contact, and identification information is properly captured and stored.

### Step-by-Step Instructions

#### Creating a New Patient Profile

1. **Navigate to Patient Creation**:
   - Follow the login process described above
   - From the main dashboard, click on **Patients** in the left navigation menu
   - Select **Search Patients** from the available options
   - Click **Add new Patient** button to initiate patient creation

2. **Enter Patient Demographics**:
   - **Full Name**: Enter the patient's complete legal name
   - **Date of Birth**: Select the patient's birth date using the date picker
   - **Gender**: Choose the appropriate gender from the dropdown options

3. **Contact Information**:
   - **Phone Number**: Enter the patient's primary contact number
   - **Address**: Provide complete address details including street, city, and postal code
   - **Emergency Contact**: Add emergency contact information if available

4. **Patient Identifiers**:
   - **Care ID**: System will auto-generate a unique Care ID
   - **Additional Identifiers**: Add any relevant identification numbers (e.g., Aadhaar, medical record numbers)

5. **Complete Registration**:
   - Review all entered information for accuracy
   - Click **Register Patient** to create the patient profile
   - The system will generate a unique patient profile and Care ID

#### Post-Creation Actions

After successful patient registration:
- The new patient profile becomes immediately accessible
- Care ID is generated for future searches and references
- Patient can be found through various search methods
- Profile is ready for additional information updates and clinical documentation

---

## Patient Search and Access

### Purpose

This workflow enables healthcare practitioners to efficiently locate and access existing patient profiles using multiple search criteria and methods.

### Step-by-Step Instructions

#### Searching for Existing Patients

1. **Access Patient Search**:
   - From the main dashboard, click **Patients** in the left navigation
   - Select **Search Patients** from the available options

2. **Search Methods**:
   - **Phone Number Search**: Enter the patient's registered phone number
   - **Patient Name Search**: Type the patient's name (full or partial)
   - **Care ID Search**: Enter the unique Care ID if known

3. **Access Patient Profile**:
   - Review search results to identify the correct patient
   - Click on the patient's name in the search results
   - Select **View Profile** to access the complete patient record

#### Patient Profile Navigation

Once in the patient profile, users can access multiple sections:
- **General Info**: Basic demographics and contact information
- **Appointments**: Appointment history and scheduling
- **Encounters**: Clinical encounters and medical visits
- **Clinical History**: Medical history and documentation
- **Updates**: Patient status updates and communications
- **Requests**: Resource requests and transfers
- **Users**: Assigned healthcare team members
- **Notes**: Clinical notes and team communications
- **Files**: Documents, images, and multimedia files
- **Accounts**: Billing and financial information

---

## Patient Information Management

### Purpose

This workflow covers comprehensive management of patient demographic information, contact details, identifiers, and administrative data within the patient profile.

### Step-by-Step Instructions

#### Managing General Information

1. **Access Patient General Info**:
   - Navigate to the patient profile as described above
   - The **General Info** section displays by default
   - Review current patient demographics and contact information

2. **Edit Patient Information**:
   - Click the **Edit** button to modify patient details
   - Update any changed information such as:
     - Address changes
     - Phone number updates
     - Contact person modifications
     - Emergency contact updates
   - Save changes to update the patient record

#### Managing Patient Identifiers

1. **View Current Identifiers**:
   - In the General Info section, click on **Identifiers**
   - Review existing identification numbers and documents

2. **Add New Identifiers**:
   - Click **Add Identifier** if additional identification is needed
   - Enter identifier type (e.g., Aadhaar Number, Patient ID)
   - Provide the identifier value
   - Save to update the patient record

#### Managing Patient Tags

Patient tags help categorize and organize patients for filtering and administrative purposes:

1. **Access Patient Tags**:
   - In the General Info section, click on **Patient Tags**
   - Review currently assigned tags

2. **Add Patient Tags**:
   - Click **Add Tags** to assign new categories
   - Search for existing tag groups or categories
   - Select appropriate tags (e.g., Ration Card categories: Yellow, Pink, Blue, White)
   - Use the checkbox to confirm tag selection
   - Tags help with patient filtering and administrative categorization

---

## Clinical Documentation

### Purpose

This workflow covers comprehensive clinical documentation including appointments, encounters, clinical history, and medical record management within the patient profile.

### Step-by-Step Instructions

#### Managing Appointments

1. **View Appointment History**:
   - Navigate to the **Appointments** section in the patient profile
   - Review all past and upcoming appointments with status indicators:
     - **Booked**: Scheduled appointment
     - **In-consultation**: Currently in progress
     - **Fulfilled**: Completed appointment
     - **Checked-in**: Patient arrived for appointment
     - **Non-fulfilled**: Missed or cancelled appointment

2. **Schedule New Appointments**:
   - Click **Schedule Appointment** to book new appointments
   - Select the appropriate practitioner from available options
   - Choose available time slots (green slots indicate availability)
   - Add appointment details and reason for visit
   - Click **Confirm Appointment** to save

3. **View Appointment Details**:
   - Click **View** on any existing appointment to see detailed information
   - Review appointment history, practitioner notes, and outcomes

#### Managing Clinical Encounters

Clinical encounters represent specific interactions between patients and healthcare providers:

1. **Understanding Encounter Types**:
   - **Inpatient**: Patient admitted to the hospital
   - **Ambulatory**: Outpatient care visits
   - **Observation**: Patient under clinical observation
   - **Emergency**: Urgent care requiring immediate attention
   - **Virtual**: Telehealth or remote consultation
   - **Home Health**: Care provided at patient's residence

2. **View Encounter History**:
   - Navigate to the **Encounters** section
   - Review all active and completed encounters
   - Check encounter status:
     - **In Progress**: Ongoing encounter
     - **Completed**: Finished encounter
     - **Discharged**: Patient discharged
     - **Cancelled**: Cancelled encounter
     - **Entered in error**: Corrected entry
     - **Unknown**: Status unclear
     - **On Hold**: Temporarily suspended

3. **Encounter Priority Levels**:
   - **ASAP**: As soon as possible
   - **Routine**: Standard priority
   - **Urgent**: High priority
   - **Emergency**: Immediate attention required
   - **As-needed**: Based on patient condition
   - **Pre-op**: Pre-operative preparation

4. **Create New Encounters**:
   - If no encounters exist, click **Create Encounter**
   - Select encounter type, priority, and clinical details
   - Document reason for encounter and initial assessment

5. **View Encounter Details**:
   - Click **View Encounter** to access detailed encounter information
   - Review clinical documentation, assessments, and treatment plans

#### Managing Clinical History

The Clinical History section provides comprehensive medical documentation:

1. **Access Clinical History**:
   - Navigate to the **Clinical History** section
   - Review comprehensive medical documentation including:
     - **Past Symptoms**: Previously documented symptoms and complaints
     - **Past Diagnoses**: Historical diagnoses and medical conditions
     - **Allergies**: Known allergic reactions and sensitivities
     - **Questionnaire Responses**: Structured assessment responses
     - **Past Medications**: Medication history and statements

2. **Review Medication Statements**:
   - View all medication statements uploaded during encounters
   - Track medication changes and prescribing history
   - Monitor for drug interactions and allergies

3. **Clinical Documentation Review**:
   - Assess patient's medical trajectory over time
   - Identify patterns in symptoms and treatments
   - Support clinical decision-making with historical context

---

## Communication and Coordination

### Purpose

This workflow covers patient communication, care coordination, team collaboration, and resource management within the patient care ecosystem.

### Step-by-Step Instructions

#### Managing Patient Updates

Patient updates capture ongoing changes in patient condition and care requirements:

1. **Access Patient Updates**:
   - Navigate to the **Updates** section in the patient profile
   - Review existing patient status updates and communications

2. **Add Patient Updates**:
   - Click **Add Patient Updates** to document new information
   - Select from available questionnaire options (e.g., Pain Assessment Form)
   - Choose appropriate update type based on clinical needs
   - Click **Add Questionnaire** to proceed

3. **Complete Update Forms**:
   - Fill out the selected questionnaire with current patient information
   - Provide detailed responses to capture patient status changes
   - Click **Submit** to save the update

4. **Review Update History**:
   - View chronological list of all patient updates
   - Track changes in patient condition over time
   - Use updates for care planning and coordination

#### Managing Resource Requests

Resource requests facilitate obtaining additional care resources, equipment, or services:

1. **Access Requests Section**:
   - Navigate to the **Requests** section in the patient profile
   - Review existing resource requests and their status

2. **Create New Requests**:
   - Click **Create Request** to initiate a new resource request
   - Provide detailed information including:
     - **Target Facility**: Destination facility for the resource
     - **Urgency Level**: Priority classification for the request
     - **Resource Details**: Specific description of needed resources
     - **Clinical Justification**: Medical reason for the request
     - **Contact Information**: Follow-up communication details

3. **Submit Resource Requests**:
   - Complete all required fields with accurate information
   - Click **Submit** to send the request for processing

4. **Manage Request Status**:
   - Use **Update Status** to modify request information
   - Click **Request Letter** to view formal documentation
   - Track request progress and resolution

#### Team Collaboration and User Management

Healthcare teams require coordinated access to patient information:

1. **Access User Management**:
   - Navigate to the **Users** section in the patient profile
   - Review currently assigned team members and their roles

2. **Assign Team Members**:
   - Click **Assign User** to add new team members
   - Search for healthcare providers by name or role
   - Select appropriate user from search results
   - Assign specific role for patient care (e.g., Primary Care, Specialist, Nurse)
   - Click **Assign to Patient** to confirm assignment

3. **Review Team Assignments**:
   - View all assigned team members in the Users section
   - Monitor role assignments and access permissions
   - Coordinate care responsibilities across team members

#### Clinical Notes and Communication

The Notes section facilitates team communication and clinical documentation:

1. **Access Notes Section**:
   - Navigate to the **Notes** section in the patient profile
   - Review existing clinical discussions and communications

2. **Create New Discussions**:
   - Click **New** or **Start New Discussion** to begin communication
   - Select discussion category:
     - **Treatment Plan**: Treatment strategy discussions
     - **Care Coordination**: Team coordination communications
     - **General Notes**: Miscellaneous clinical information
     - **Patient History**: Historical medical information
     - **Referral Notes**: Specialist referral communications
     - **Lab Result Discussion**: Laboratory findings review

3. **Participate in Discussions**:
   - Click on existing discussion titles to join conversations
   - Type messages in the communication area
   - Click the **send button** to post messages
   - Engage in ongoing clinical conversations with team members

#### File and Document Management

Comprehensive file management supports clinical documentation:

1. **Access Files Section**:
   - Navigate to the **Files** section in the patient profile
   - Review existing documents, images, and multimedia files

2. **Add New Files**:
   - Click **Add Files** to upload new documentation
   - Choose upload method:
     - **Upload From Device**: Select files from computer storage
     - **Open Camera**: Record video documentation
     - **Record Audio**: Capture audio recordings

3. **Create Clinical Drawings**:
   - Click **Drawings** to access drawing tools
   - Click **New Drawing** to create medical illustrations
   - Use drawing tools to document clinical findings
   - Click **Save** to preserve drawings in the patient record

4. **Manage Existing Files**:
   - View uploaded files in the Files section
   - Edit drawings by clicking on existing illustrations
   - Update documentation as needed for ongoing care

#### Account and Billing Management

Financial and billing coordination within patient care:

1. **Access Accounts Section**:
   - Navigate to the **Accounts** section in the patient profile
   - Review financial accounts and billing status

2. **Account Status Management**:
   - View accounts categorized by status:
     - **Active**: Currently active accounts
     - **Inactive**: Temporarily inactive accounts
     - **Entered in Error**: Corrected account entries
     - **On Hold**: Temporarily suspended accounts

3. **Create New Accounts**:
   - Click **Create Account** for new billing arrangements
   - Complete account setup with appropriate financial information

4. **Manage Existing Accounts**:
   - Click **Go to Account** to access account details
   - Use **Edit** to modify account information
   - Update **Account Status**: Active, Inactive, Entered in Error, On Hold
   - Modify **Billing Status**: Care not completed, Billing, Closed Bad Debt, Closed Voided, Closed Completed, Closed Combined
   - Click **Update** to save account changes

### Error Handling and Common Issues

| Error/Issue | Possible Cause | Resolution |
|-------------|----------------|------------|
| `Patient Not Found` | Incorrect year of birth or wrong phone number entered | Re-enter patient details and verify year of birth and contact information |
| `Appointment Slot Not Available` | Selected practitioner has no open slots for chosen date/time | Select another available time slot or choose a different practitioner |
| `Access Denied` | Insufficient permissions for patient profile | Verify user role assignments and contact system administrator |
| `Profile Update Failed` | Network connectivity or validation errors | Check internet connection, verify required fields, and retry operation |
| `File Upload Error` | File size too large or unsupported format | Reduce file size or convert to supported format (PDF, JPG, PNG) |
| `Encounter Creation Failed` | Missing required fields or invalid data | Complete all mandatory fields and verify encounter type/priority selections |
| `User Assignment Error` | Selected user lacks appropriate permissions | Verify user roles and permissions before assignment |
| `Request Submission Failed` | Incomplete request information | Complete all required fields including facility, urgency, and resource details |
| `Note Save Error` | Network interruption during save operation | Check connection stability and retry message posting |
| `Account Update Failed` | Invalid status combination or missing data | Verify account and billing status compatibility and complete required fields |

## Revision History

| Version | Date | Changes Made | Author | Reviewer |
|---------|------|--------------|--------|----------|
| v1.0 | 22nd August 2025 | Initial draft creation | Ardhra SunilKumar | Suma Sundararajan |
| v1.1 | 25th August 2025 | Content structure refinement | Ardhra SunilKumar | Suma Sundararajan |
| v1.2 | 28th August 2025 | Workflow details enhancement | Ardhra SunilKumar | Suma Sundararajan |
| v1.3 | 29th August 2025 | Final review and corrections | Ardhra SunilKumar | Suma Sundararajan |

---

*This documentation is part of the CARE platform user guide. For technical support, please contact your system administrator.*