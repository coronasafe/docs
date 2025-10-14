---
title: Hospital Administration Module
sidebar_position: 9
---

# Hospital Administration Module

## 1. Document Information

| Field | Details |
|-------|---------|
| Module | Hospital Administration Module |
| Version | v1.0 |
| Date Created | 22nd August 2025 |
| Last Updated | 29th August 2025 |
| Author | Ardhra SunilKumar |
| Reviewed By | Suma Sundararajan |
| Target Persona(s) | Facility Admin |

## 2. Purpose

This workflow enables facility administrators to set up healthcare facilities, departments, services, users, locations, devices, roles, tags, and identifiers. It ensures that all organizational structures are configured correctly for smooth hospital administration.

## 3. Scope

Covers Facility creation, department setup, user management, locations, healthcare services, devices, RBAC roles, tags, and patient identifiers. Does not cover Clinical workflows, billing, patient encounters, scheduling and managing appointments.

## 4. User Persona Context

Facility Admins are responsible for configuring the organizational hierarchy, managing healthcare resources, and assigning permissions to ensure operational readiness of the hospital.

## 5. Prerequisites

### 5.1 System Requirements
- Users must be logged in to the CARE platform with valid credentials of an admin
- Stable internet connection and supported web browser

### 5.2 Knowledge Requirements
- Understanding of organisation hierarchy (State → District → Municipality → Ward)
- Familiarity with basic navigation of the CARE dashboard
- Awareness of healthcare facility structure (departments, services, locations)
- Basic knowledge of user roles and permissions

## 6. Expected Outcome

- Each facility created is shown in the dashboard
- The created facilities are visible in the corresponding dashboard
- The departments are created in a facility and corresponding users are linked to it
- Tags, Identifiers, Healthcare services, Devices are successfully created and visible across the system under the correct organizational hierarchy

## 7. Login (Facility Admin)

**Step 1**: Login to the CARE platform with your credentials.

**Step 2**: The Dashboard is shown in the home screen, and it shows a set of options including **Facilities**, **Associations**, **Governance** together and only **Admin Dashboard** in the top right corner.

## 8. Step-by-Step Instructions

### 8.1 Facility Setup

To register new healthcare facilities within the CARE platform, ensuring each is mapped to the correct state, district, municipality, and ward. This establishes the foundation for all operational and clinical workflows.

**Step 1**: Login as per the instructions mentioned and from the dashboard select **Governance**.

**Step 2**: Choose the **State** (*Example: Kerala*).

**Step 3**: Select the **District → Municipality → Ward** where the facility will be created. (*Example: To create a facility in Alappuzha for Punnamada ward, Click Alappuzha, then click Alappuzha Municipality and then click Punnamada.*)

**Step 4**: Select **Facilities** to create a facility under the chosen ward's organisation.

**Step 5**: Click **Add Facility**.

**Step 6**: Fill in required fields:
- **Facility Type**
- **Facility Name**
- **Phone Number**
- **Pincode**
- **State, District, Municipality, Ward**
- **Address**

**Step 7**: Scroll down and click **Create Facility**.

**Step 8**: Facility is created and visible under **Facilities** in the dashboard and in **Facilities** option under its corresponding State, District, Municipality, and Ward.

### 8.2 Department Setup

To create organizational units such as Oncology, Pediatrics, or Emergency within each facility. Departments streamline clinical operations by grouping staff, services, and resources under specific specialities.

**Step 1**: Login as per the instructions mentioned and from the dashboard select a facility under **Facilities** option.

**Step 2**: Click **Settings** and select **Department** from the left sidebar.

**Step 3**: Click **Add Department/Team**.

**Step 4**: Enter details:
- **Name** (e.g., Oncology)
- **Type** (Department/Team)
- **Description**

and click **Create Organization**.

**Step 5**: Use the **Edit icon** to modify department details if required.

To add a sub-department or team, click on any of it and click **Departments/Team**. Then click **Add Department/Team** and enter the details. (*Example: To add a sub-department in Oncology, click Oncology and create.*)

#### 8.2.1 User Management (Adding a new user or existing user to a department)

To add or link users (doctors, nurses, admins, staff) to departments or facilities, assign roles, and enable them to perform their designated responsibilities within the system.

**Step 6**: Select the created **Department/Team**.

**Step 7**: Click **Users**.

**Step 8**: Click **Add User** to add a new user to the department.

**Step 9**: Fill user details: **User type, First Name, Last Name, Username, Email, Password, Phone Number, State, District, Municipality, Ward**.

**Step 10**: Click **Create User**.

**Step 11**: To link an existing user, Click **Link User** from the required **Department**.

**Step 12**: Search for the **Name** and select **Role** in the Department and then click **Add to Organisation**.

**Step 13**: Users are now visible under **Users** category in **Departments** section.

### 8.3 Location Setup

A location is a major area within a healthcare facility where specific activities, services, or departments are housed. It serves as a primary organizational unit for managing space, staff, and resources.

(*Examples: Main Hospital Building, Outpatient Block, Radiology Department*)

**Step 1**: Login as per the instructions mentioned and from the dashboard select a facility under **Facilities** option.

**Step 2**: Click **Settings** and select **Locations**.

**Step 3**: Click **Add Location**.

**Step 4**: Enter location details and click **Create**. (*Example: To create a main building: Building A, give the Location Form as Building, Name as Building A and mention the status of the building.*)

#### 8.3.1 Adding Sublocation

A sublocation is a smaller, nested area within a main location in a facility. It helps organize spaces hierarchically for better management and tracking of resources, staff, and patients.

(*Example: In a Hospital, if Building A is the main location, sub-locations can be ward 1, ward 2, ICU room 1, OPD room 3.*)

**Step 5**: To create a sub-location, from **Locations** option of the selected facility select the parent location (*Example: Building A*) then click **Add Location**.

**Step 6**: Enter the details and click **Create**.

**Step 7**: The location and sub-location will be visible in the following manner.

### 8.4 Healthcare Services Setup

To configure the medical and non-medical services provided by a facility (*Example: OPD Consultation, Radiology, Surgery, Physiotherapy*).

**Step 1**: Login as per the instructions mentioned and from the dashboard select a facility under **Facilities** option.

**Step 2**: Click **Settings** and select **Healthcare services**.

**Step 3**: Click **Add Healthcare Service**.

**Step 4**: Enter details:
- **Service Name**
- **Internal Type**
- **Select Location** (from created Locations)

and click **Create**. (*Example: To create a healthcare service named Pharmacy A in Building A.*)

**Step 5**: The Healthcare Service is created and shown below with the **View Details** option.

**Step 6**: Click **View Details** and click **Edit** icon to edit the details.

### 8.5 Device Setup

To register medical devices (*Example: diagnostic machines, surgical recording devices, monitoring equipment*) within a facility. Devices are also linked to encounter and services for clinical documentation and compliance.

**Step 1**: Login as per the instructions mentioned and from the dashboard select a facility under **Facilities** option.

**Step 2**: Click **Settings** and select **Devices**.

**Step 3**: Click **Add Device**. The Device is added on the basis of what procedure or workflow will the device support. (*Example: Surgical video recording, patient monitoring, lab diagnostics.*)

**Step 4**: Fill out the details and click **Save**. (*Example: To enter the details of surgical recording camera*)

**Step 5**: The added device forms are visible in the following manner.

### 8.6 Role-Based Access Control (RBAC)

To define and manage user roles and permissions, ensuring each user can only access the modules, data, and actions relevant to their role (*Example: Doctor vs. Receptionist vs. Admin*). This enforces security and compliance.

**Step 1**: Login as per the instructions mentioned and from the dashboard select **Admin Dashboard**.

**Step 2**: Click **RBAC** from the left side panel and click **Roles**.

**Step 3**: Click **Add Role**.

**Step 4**: Enter **Role Name** and assign **Permissions**, and then click **Create Role**.

A role name defines a user's responsibilities and access permissions within the system, determining what actions they can perform and which data they can access.

*Examples:*
1. *Doctor - View/Edit patient records, create/update encounters, add charge items.*
2. *Billing Staff - View accounts, manage invoices/payments, generate reports.*
3. *Reception Staff - Patient registration, appointment scheduling, search records.*
4. *Nurse - Update vitals, document observations, assist in encounters*

**Step 5**: The role and permission is created and an **edit icon** is visible near to edit the details.

**Step 6**: To clone and create roles and permissions for an existing role, click **Clone**.

**Step 7**: Fill out the details and click **Create**.

**Step 8**: The role is then shown as below.

**Step 9**: To review roles, click **Permissions** under **RBAC** for an overview of roles and their assigned permissions.

**Step 10**: The overview of all roles and their permissions are visible. The permissions assigned to an users are marked in green.

### 8.7 Tag Configuration

To create and assign customizable tags (*Example: Emergency, Insurance, Walk-in, VIP*) that help categorize patients, encounters, or services for easier filtering, searching, and workflow management.

**Step 1**: Login as per the instructions mentioned and from the dashboard select **Admin Dashboard**.

**Step 2**: Select **Tag Config** from the left side panel.

**Step 3**: Click **Add Config**.

**Step 4**: Enter details:
- **Display Name** (*Example: Emergency - The name of the tag as it will appear in the system.*)
- **Slug** (*Example: emergency - A unique, short identifier for system use (usually lowercase, no spaces).*)
- **Category** (*Example: Patient Status - The category under which the tag will be grouped.*)
- **Resource** (*Example: Encounter - The resource this tag is linked to (Patient, Encounter, Department, etc.*)
- **Priority** (*Example: High - Indicates the importance level of the tag (Low, Medium, High).*)
- **Status** (*Example: Active - Determines if the tag is active and can be used immediately.*)

and then click **Create tag config**.

**Step 5**: The created tag is shown as below.

(*Example: The above tag named Trial tag is only visible under Encounter of a patient.*)

**Step 6**: To add child tags or edit tags, select the created tag and click **View**.

**Step 7**: Click **Edit** to edit the same tag.

**Step 8**: Edit the details and click **Update tag config**.

**Step 9**: After clicking **View**, click **Add child tag** to create a child tag.

**Step 10**: Enter the details and click **Create tag config** and the child tag is created.

**Step 11**: The Yes icon is enabled under **Children** in the tag row as shown below when the child tag is created.

### 8.8 Patient Identifier Configuration

To generate unique identifiers for patients (*Example: OP Number, IP Number, Insurance ID*). Identifiers ensure accurate record-keeping, avoid duplicates, and support integration with clinical documentation.

**Step 1**: Login as per the instructions mentioned and from the dashboard select **Admin Dashboard**.

**Step 2**: Select **Patient Identifier Config**.

**Step 3**: Click **Add Patient Identifier Config**.

**Step 4**: Enter all the details, scroll down and click **Create**.

**Step 5**: The identifier is created and shown as below. Click the **Edit** option to edit the details.

(*Example: The identifiers shown while searching for a patient instead of the phone number, which is default.*)

## 9. Error Handling / Common Issues

| Error Message / Issue | Possible Cause | Resolution |
|----------------------|----------------|------------|
| Facility not visible under district | Wrong organisation hierarchy selected | Recheck and select correct State → District → Municipality → Ward |
| Users not appearing under department | User not linked correctly | Use the **Link User** option and assign a role |
| Device not saving | Missing mandatory details | Enter all required fields before saving |
| Permission denied when accessing RBAC | Insufficient admin privileges | Ensure user has admin role and proper permissions |
| Tag not appearing in module | Incorrect resource assignment | Verify tag is assigned to correct resource type |
| Location hierarchy not displaying | Parent-child relationship error | Ensure proper location hierarchy setup |
| Healthcare service not accessible | Service not linked to location | Link service to appropriate location |
| User role assignment failing | Role permissions conflict | Review and adjust role permissions |

## 10. Integration Points

- **Reception Module**: User roles and facility configuration
- **Clinical Module**: Healthcare services and device configuration
- **Billing Module**: Department setup and user permissions
- **Lab Module**: Device configuration and location setup
- **Pharmacy Module**: Location and service configuration
- **Patient Administration**: Identifier configuration and facility setup
- **Scheduling Module**: Department and user management

## 11. Revision History

| Version | Date | Changes Made | Author | Reviewer |
|---------|------|--------------|--------|----------|
| v1.0 | 22nd August 2025, 24th August 2025, 25th August 2025, 28th August 2025, 29th August 2025 | Initial Draft - Comprehensive Hospital Administration module documentation including Facility Setup, Department Management, User Management, Location Configuration, Healthcare Services, Device Setup, RBAC, Tag Configuration, and Patient Identifiers | Ardhra SunilKumar | Suma Sundararajan |