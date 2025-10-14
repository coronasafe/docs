---
title: Questionnaire and ValueSets
sidebar_position: 5
---

# Questionnaire and ValueSets Module

## Overview

### Document Information

| Field | Details |
|-------|---------|
| Module | Questionnaire and ValueSets Module |
| Version | v1.0 |
| Date Created | 22-Aug-2025 |
| Last Updated | 28-Aug-2025 |
| Author | Sreelekshmi S |
| Reviewed By | Suma Sundararajan |
| Target Persona(s) | Facility Admin |

### Purpose

The Questionnaire and ValueSet Module enables Facility Admins to create and configure questionnaires extensively, covering all options and capabilities of the questionnaire builder, and to create ValueSets for predefined response collections.

### Scope

**Covers:**
- End-to-end creation and configuration of questionnaires
- Creation and management of ValueSets

**Does not Cover:**
- Patient & Administration Module
- Clinical Module

### User Persona Context

The module is designed for Facility Admins who configure questionnaires and value sets to support data collection workflows later used by doctors, nurses, and other staff.

### Prerequisites

**System Requirements:**
- Users must be logged in to the CARE platform with valid credentials
- Only Facility Admins with Super Admin access can log in and access the Admin Dashboard

**Knowledge Requirements:**
- Understanding the type of data to be collected in the facility workflow
- Familiarity with form design principles (e.g., question order, mandatory vs. optional fields)
- Awareness of clinical/administrative terminology relevant to the questionnaires
- Ability to map response options using ValueSets for standardization

### Expected Outcome

After successful configuration, the system will generate well-defined questionnaires that capture the required data fields and link them with curated value sets. Facility Admins will be able to configure, manage, and reuse these questionnaires, while value sets provide a precise list of acceptable response options. This ensures that every question asked in the workflow has a clear, controlled set of values tied to it.

### Login

Before accessing any Questionnaire and ValueSets workflows, users must log in to the CARE Staff portal with the following steps. Only Facility Admins with Super Admin access can log in and access the Admin Dashboard.

1. Navigate to the **CARE Staff Login page** in your browser.
2. Enter your **User ID** and **Password.**
3. Click **Login**.
4. After successful login, the **Facility list page** will appear.
5. On the top-right corner, click **Admin Dashboard** to access administrative configurations.

## Module Components

This module consists of two main components:

- [Questionnaire Management](#questionnaire-management) - Creating and configuring questionnaires
- [ValueSets Management](#valuesets-management) - Creating and managing standardized value collections

---

## Questionnaire Management

### Document Information

| Field | Details |
|-------|---------|
| Module | Questionnaire and ValueSets Module |
| Version | v1.0 |
| Date Created | 23-Aug-2025 |
| Last Updated | 28-Aug-2025 |
| Author | Sreelekshmi S |
| Reviewed By | Suma Sundararajan |
| Target Persona(s) | Facility Admins |

### Purpose

A Questionnaire is a customizable form used to collect structured information from users within the CARE portal. It supports a variety of use cases, including clinical assessments, operational checklists, feedback forms, and other workflow-specific data entry requirements. Each questionnaire consists of one or more questions that can be customized in terms of type, format, and behavior. By creating and updating questionnaires, we can quickly adapt to evolving data collection requirements without needing to make any software changes.

### Scope

**Covers:**
- Clinical assessments (e.g., patient condition, treatment decisions)
- Operational workflows (e.g., safety or quality checklists, administrative forms)
- Feedback and survey collection from patients, caregivers, or staff
- Research and audit data collection

**Does not cover:**
- Automated clinical decision-making (it only collects data, does not interpret it)
- System-level configuration or backend data processing (outside questionnaire use)

### User Persona Context

The primary user persona for this feature is the **Facility Administrator**, who is responsible for creating and managing questionnaires within the portal. This role ensures that the right questions are always available for staff, updates forms when workflows or regulations change, and seeks to standardize data collection across the facility.

### Prerequisites

**System Requirements:**
- Access to the CARE Portal with Facility Admin role
- Active facility and user accounts already set up in the system
- Stable internet connection and browser access to the portal

**Knowledge Requirements:**
- Understanding of the workflow or process for which the questionnaire is being created (e.g., clinical assessment, operational checklist)
- Familiarity with different question types (choice, boolean, group, text, date, etc.)
- Basic knowledge of configuring forms (adding, editing, and organizing fields)

### Expected Outcome

The Questionnaire module is expected to simplify and streamline the process of data collection within the CARE portal. Facility Admins will be able to create, configure, and manage questionnaires independently. The flexibility of the module will allow quick customization of forms to meet evolving clinical and operational needs.

### Step-by-Step Instructions

#### Navigation to Questionnaire

This section explains how a Facility Admin can create a new questionnaire in the CARE Portal. The process begins by accessing the Admin Dashboard, navigating to the Questionnaires section, and then initiating the creation of a new form through the configuration panel.

1. Log into the **CARE Staff portal** as indicated in the login section above or if already logged in, follow the steps below:
2. In the Admin Dashboard menu, click the **Questionnaires button.**
3. Review the Questionnaire Management screen showing the list of existing questionnaires.
4. Apply filters to view questionnaires by status such as **Active, Draft, or Retired.**
5. Use the **Questionnaire Search bar** to locate a questionnaire by entering a title or keyword.
6. Click **+ Create Questionnaire** in the top-right corner of the Questionnaire Management screen.

#### Configuring Basic Information

The **Basic Information** section defines the core identity of the questionnaire and how it will appear to users.

1. Log into the **CARE Staff portal** as indicated in the login section above or if already logged in, follow the steps below:
2. Follow 'Navigation to questionnaire' as described above.
3. Navigate to the **Basic Information** section.
4. Enter a clear and descriptive title in the **Title** field that identifies the questionnaire (e.g., "Patient Intake Form," "Post-operative Follow-up Survey").
5. In the **Slug** field, Enter a unique, URL-friendly identifier for the questionnaire (e.g., patient-intake-form).
6. In the **Description** field, Enter a detailed explanation of the questionnaire's purpose.

#### Configuring Questionnaire Properties

The Properties section allows you to define the core settings for your questionnaire.

1. Log into the **CARE Staff portal** as indicated in the login section above, or if already logged in, follow the steps below:
2. Follow the steps outlined in the 'Navigation to questionnaire' as described above.
3. Go to the **Properties** section.
4. Under **Status,** select one option:
   - **Active**: The questionnaire is live and ready for use
   - **Draft**: The questionnaire is a work in progress and not yet available
   - **Retired**: The questionnaire is no longer in use
5. Under **Subject Type**, select the context for which the questionnaire is intended:
   - **Patient**: Used for questionnaires completed by or about a patient
   - **Encounter**: Used for questionnaires related to a specific clinical visit or event
6. Under Organizations, Use **Select Organizations** to assign the questionnaire to one or more groups (e.g., doctor, administrator, nurse, staff, official).
7. Use **Tags** to categorize and organize your questionnaires.
8. Under Tags, Click **Select Tags** to pick from existing tags.
9. To create a new tag, click **Create Tag**.
10. On clicking Create Tag, fill in the following details and select the **Create Tag option.**
    - **Tag Name**: Enter a descriptive name for your tag (e.g., "Emergency," "Follow-up," "Mental Health")
    - **Tag Slug**: This is a unique, URL-friendly identifier. It is typically a lowercase version of the tag name with spaces replaced by hyphens
11. Review the **Version** field, which is preset to **1.0** for the first entry and non-editable.
12. The **Question Actions** section provides tools for creating, arranging and managing the questions within your questionnaire:
    - **Move Questions**: Use this action to change the order of questions in the list
    - **Remove Questions**: Use this action to delete selected questions from the questionnaire

#### Adding and Configuring Question

In this step, you will learn how to add and configure questions for your questionnaire. Each question can be customized with common options such as coding, conditions, data collection, and enabling rules. These are explained first, as they apply to all question types.

After that, we will explore the detailed configurations available for each specific question type (e.g., Choice, Group & Structured). This way, you first understand the shared features, and then dive into the unique settings based on the type of question you select.

**Note**: The detailed options for each specific question type (such as Choice, Group, or Structured) will be covered in the next step.

##### Adding a Question

This is the first step in building the questionnaire content. Each question you add defines the data you want to capture from the user.

1. Log into the **CARE Staff portal** as indicated in the login section above, or if already logged in, follow the steps below:
2. Follow 'Navigation to questionnaire' as described above.
3. Click the **Add Question** button located below the Basic Information section.
4. A new **question block** will be created with configurable fields.
5. Enter **Question Text.** This field is required.
6. Enter a **Description** for the question text.
7. Select the **Question Type**. Open the Type **dropdown** and choose the expected response format.

Available types include:
- **Group**: A container for organizing related questions together under a single heading
- **Display**: Used to show static text or instructions to users without collecting an answer
- **Boolean**: A simple "yes/no" question that users can answer with a single click
- **Decimal**: Used for questions requiring a numerical answer with decimal points (e.g., 3.14)
- **Integer**: Used for questions requiring a whole number answer (e.g., 1, 2, 3)
- **Date**: Allows users to select a specific date from a calendar
- **Date Time**: Allows users to select both a specific date and time
- **Time**: Allows users to select a specific time of day
- **String**: A short text field for brief answers like names or single-line responses
- **Text**: A larger text area for longer responses or detailed explanations
- **URL**: Used to collect a website address or link
- **Choice**: Presents a list of predefined options for users to choose from
- **Quantity**: Collects a number with a unit of measurement (e.g., 5 kg, 2 hours)
- **Structured**: A specialized question type for collecting specific medical data

##### Adding Coding Details

Coding ensures that every question in the questionnaire is mapped to internationally recognized medical terminologies.

1. Log into the **CARE Staff portal** as indicated in the login section above, or if already logged in, follow the steps below:
2. Follow 'Navigation to questionnaire' as described above.
3. Click the **Add Question** button located below the Basic Information section.
4. Click **+ Add Coding.**
5. Open the coding section inside the selected question block.
6. In **System**, Choose the coding system that matches the clinical context of the question.

Common systems include:
- **SNOMED CT**: Used for capturing clinical terms such as diagnoses, conditions, symptoms, or procedures
- **LOINC**: Used for laboratory tests, observations, and measurements
- **UCUM**: Used for standardized units of measure such as mg, mmHg, or kg

7. Enter **Code**. Input the exact numerical or alphanumerical code from the selected system. This uniquely identifies the medical concept or measurement.
8. Verify the **Display**. The system automatically populates the Display field based on the code entered
9. The coding can be removed using the **Remove Coding** button.

##### Configuring Question Settings & Data Collection Details

1. Log into the **CARE Staff portal** as indicated in the login section above, or if already logged in, follow the steps below:
2. Follow 'Navigation to Questionnaires' as described above.
3. Click the **Add Question** button located below the Basic Information section.
4. The **Question Settings** allows you to control the fundamental behavior of the question:
   - **Required**: Mark this if the user must provide an answer before they can submit the questionnaire
   - **Repeatable**: Allows the user to provide multiple answers to the same question (e.g., adding several medications)
   - **Read only**: The question is displayed but the user cannot edit the answer. This is useful for displaying pre-filled or calculated information
5. The **Data Collection Details** section is used to specify key metadata that will be collected along with the answer:
   - **Collect Time**: Captures the time the question was answered
   - **Collect Performer**: Records who provided the answer
   - **Collect Body Site**: Specifies a particular body site related to the answer
   - **Collect Method**: Documents the method used to obtain the answer

##### Enabling Conditions

This feature allows you to control the visibility of the question based on a user's answer to a previous question. The question will only be displayed if the defined conditions are met.

1. Log into the **CARE Staff portal** as indicated in the login section above, or if already logged in, follow the steps below:
2. Follow 'Navigation to questionnaire' as described above.
3. Click the **Add Question** button located below the Basic Information section.
4. Under Data Collection details, Click **+Add Condition.**
5. Choose whether **All the conditions must be met** or **Any one condition can be met** to display the question.
6. Define Condition 1:
   - **Select a Question**: Choose the previous question whose answer will trigger this condition
   - **Choose an Operator**: Pick a logical operator, such as "Equals," "Not Equals," "Greater Than," etc.
   - **Enter an Answer Value**: Specify the exact answer that satisfies the condition
7. Click **+ Add Condition** to create more conditions for the question.

#### Creating a Question

1. Log into the **CARE Staff portal** as indicated in the login section above or if already logged in, follow the steps below:
2. Follow 'Navigation to questionnaires' as described above
3. Configure basic information and Properties as described in previous sections.
4. Add and configure question as described in the previous section
5. Click **Add Question** to create a new question block.
6. Once everything is done, Click the **Create** button.
7. Instead of creating each question manually, you can use the **Import** option to upload pre-defined questions from a file or from a URL.
8. Click **Cancel** if you decide not to proceed with adding a question.
9. After creating the form, use the **Form Preview** option to see how the questionnaire will appear to end-users.

#### Detailed Configuration of Question Types

Once you know the different question types available, the next step is to configure them properly. Each type has its own settings, layouts, and behaviors that determine how users interact with it and how the collected data is stored.

Below is a detailed guide for configuring each question type:

##### Group

The **Group** type is used as a heading or section to organize related questions together under one label, without collecting an answer itself.

1. Enter the **Question Text** and **description.**
2. Set type to **Group.**
3. Click **+ Add coding** if it's necessary.
4. Configure **Question Settings** and **Data Collection Details.**
5. Select the **Group Layout** that matches how you want sub-questions to appear:
   - **Full Width**: Place sub-questions in a single full-width column
   - **Equal Split**: Place sub-questions in two equal columns for side-by-side fields
   - **Wide Start**: Make the left column wide and the right column narrow
   - **Wide End**: Make the right column wide and the left column narrow
6. Click **Add Sub-Question.** Configure each sub-question exactly as you would a normal question.
7. If needed, set **Enable when conditions** (optional)

For example, here the group "First Report" is selected:
- The Group title ("First Report") is shown at the top
- Below it, you can see 8 sub-questions listed under the group (e.g., Level of consciousness, Is the patient oriented, Mobility status etc.)
- The left-hand Navigation panel also shows the sub-questions indented under the group, so you can easily expand or collapse them
- The Group layout options (bottom of the editor) allow you to arrange these sub-questions in single-column or split-column views

This way, groups act like containers that organize related questions together, and sub-questions inherit the settings defined at the group level.

##### Choice

1. Enter **the Question Text** and **description.**
2. Set type to **Choice.**
3. Select a **Unit** related to the question.
4. Click **+Add coding** if it's necessary.
5. Configure **Question Settings** and **Data Collection settings**.
6. Go to the **Answer Options** section in the Choice Question form.
7. There are two approaches for the answer option which is **Using Value Set** and **Using Custom Options.**

**For a value set approach:**
8. Click on **Value Set**.
9. Select an existing **ValueSets** from the dropdown.
10. If no suitable set exists, click **Create ValueSet** to define one.
11. The system will auto-populate the answer options based on the selected Value Set.

**For using Custom Options:**
12. Click on **Custom Options**.
13. Click **+Add Option.**
14. For each option:
    - Enter the **Option Value** (system reference value)
    - Enter the **Display Text** (optional, shown to users, e.g., Yes / No)
    - Click **Add Option** to insert more choices
15. Enable **Sort Alphabetically** if you want the options arranged automatically.
16. Repeat until all required answer options are added.

For example, here *Configuring Answer Options for EOL Intervention,* by using Custom Options:
- Go to Answer Options → Custom Options and set:
- Option Value: Yes → Display Text: Yes
- Option Value: No → Display Text: No
- Click Add Option for each one and turn on Sort Alphabetically. This would arrange them as: No, Yes.

##### Structured

For structured types the steps are the same as Adding and Configuring questions.

1. Set data type to **Structured.**
2. Select **Structured type.** (e.g., Encounter, Diagnosis etc.)

#### Viewing a Questionnaire

1. Log into the **CARE Staff portal** as indicated in the login section above, or if already logged in, follow the steps below:
2. Follow the first four steps in the 'Navigation to questionnaire' as described above.
3. Click on the **View** button.
4. Use the **Edit Form** option to make changes to the questionnaire
5. The form can be previewed using the **Form Preview** option.
6. Click **Download** to export the questionnaire in **JSON format.**
7. The **Cancel** option is to discard changes in the questionnaire.
8. After Editing the form is saved using the **Save** button.

### Error Handling/Common Issues

| Error / Issue | Possible Cause | Resolution |
|---------------|----------------|------------|
| `Missing Title` | `Title field left empty.` | `Enter a descriptive title (e.g., "Patient Intake Form").` |
| `Invalid Slug` | `Slug contains spaces, uppercase, or already exists.` | `Use a unique, lowercase, hyphenated slug (e.g., "patient-intake-form").` |
| `Download Failure` | `JSON export fails due to invalid formatting.` | `Check for duplicates/missing fields, fix, and retry.` |
| `Version Conflict` | `Multiple users editing at the same time.` | `Refresh, review updates, and re-save as new version.` |
| `Unsaved Changes Lost` | `The user navigated away before saving.` | `Always click Save after editing.` |
| `Preview Not Loading` | `The questionnaire has unresolved errors.` | `Review all required fields and correct them.` |
| `No Sub-questions in Group` | `Group created without sub-questions.` | `Add at least one sub-question.` |
| `No Options in Choice Question` | `Options not added under Choice type.` | `Add at least one option via Value Set or Custom Options.` |
| `Duplicate Option Values` | `Same value entered for multiple options.` | `Ensure each option has a unique value.` |

---

## ValueSets Management

### Document Information

| Field | Details |
|-------|---------|
| Module | Questionnaire and ValueSets Module |
| Version | v1.0 |
| Date Created | 23-Aug-2025 |
| Last Updated | 28-Aug-2025 |
| Author | Sreelekshmi S |
| Reviewed By | Suma Sundararajan |
| Target Persona(s) | Facility Admin |

### Purpose

A ValueSet is a defined and curated collection of concepts and their corresponding codes, drawn from one or more standard terminologies such as SNOMED CT, LOINC, or UCUM. Its fundamental purpose is to specify a precise, machine-readable list of acceptable values for a particular data element, thereby establishing a single source of truth for a clinical or administrative concept.

Within modern health information systems and interoperability standards, like FHIR (Fast Healthcare Interoperability Resources), ValueSets are a foundational component for defining the content and constraints of data fields.

### Scope

**Covers:**
- Creation and management of ValueSets by **Administrators** within the CARE Portal
- Configuring **Include and Exclude rules** using standard terminologies (SNOMED CT, LOINC, UCUM)
- Adding **concepts and filters** to build curated code lists
- Previewing, saving, and managing the lifecycle of ValueSets (Active, Draft, Retired)

**Does Not Cover:**
- Direct clinical data entry by doctors, nurses, or patients
- Manual creation of non-standard codes or free-text lists
- Modification of underlying standard coding systems (SNOMED, LOINC, UCUM)

### User Persona Context

The users of the ValueSet feature are **administrators** who configure, curate, and manage standardized clinical terminologies in the CARE Portal. Their role is to create precise and reusable ValueSets that define acceptable codes for questionnaires, clinical workflows, and reporting. These administrators have a working knowledge of coding systems such as **SNOMED CT, LOINC, and UCUM**, and understand how inclusion and exclusion rules shape the scope of a ValueSet.

### Prerequisites

**System Requirements:**
- Access to the CARE Portal through a supported web browser
- Stable internet connection to ensure uninterrupted access to the administrative dashboard
- Active Administrator account credentials with permissions to create and manage ValueSets

**Knowledge Requirements:**
- Basic understanding of FHIR standards and the role of ValueSets in data interoperability
- Familiarity with terminology systems such as SNOMED CT, LOINC, and UCUM for defining inclusion and exclusion rules
- Awareness of the clinical or administrative use case for which the ValueSet is being created
- Ability to navigate the CARE Portal interface and perform administrative tasks

### Expected Outcome

By following this workflow, administrators will be able to successfully create and manage ValueSets that provide a standardized, machine-readable set of codes for use across the CARE platform.

### Step-by-Step Instructions

#### Navigation to ValueSets

This section explains how a Facility Admin can create ValueSets in the CARE Portal.

1. Log into the **CARE Staff portal** as indicated in the login section above or if already logged in, follow the steps below:
2. In the Admin Dashboard menu, click the **ValueSets button.**
3. Review the ValueSets Management screen showing the list of existing ValueSets.
4. Apply filters to view ValueSets by status such as **Active, Draft, Retired, or unknown.**
5. Use the **search ValueSets bar** to locate a ValueSets by entering a title or keyword.
6. Click **View** to see the existing ValueSets.
7. Click **+ Create ValueSets** in the top-right corner of the ValueSets Management screen.

#### Creating ValueSets

1. Log into the **CARE Staff portal** as indicated in the login section above, or if already logged in, follow the steps below:
2. Follow 'Navigation to ValueSets' as described above.
3. Once clicking on **Create ValueSet**, fill in the basic information.
4. Enter a clear and descriptive **Name** for your ValueSet (e.g., "Medication Doses," "Pain Levels"). This is a required field.
5. Enter the **Slug** value which is a unique, URL-friendly identifier for the ValueSet.
6. Provide a brief **description** of what the ValueSet contains and its intended purpose.
7. Set the **Status** of your new ValueSet:
   - **Active**: The ValueSet is ready for use in questionnaires
   - **Draft**: The ValueSet is still under development and not yet available
   - **Retired**: The ValueSet is no longer in use
   - **Unknown**: Not defined
8. **Include rules** specify which codes to include in your ValueSet. Click **+ Add Rule** to create a new inclusion rule.
9. Select the standardized coding **System** from which you want to pull values. Common systems include:
   - **LOINC** (Logical Observation Identifiers Names and Codes): universal code system for laboratory and clinical observations. E.g., Blood glucose fasting test → LOINC Code: 1558-6.
   - **SNOMED** (Systematized Nomenclature of Medicine): A comprehensive clinical terminology used worldwide to standardize the way clinical concepts (like diseases, procedures, findings, and body structures) are recorded. E.g., Diabetes mellitus → SNOMED CT Code: 73211009
   - **UCUM** (Unified Code for Units of Measure): A standard code system for units of measure used in healthcare and scientific data. E.g., 5 milligrams → "mg"
10. Under Concepts, Click on **+ Add Concepts.**
11. Enter the specific **Code** from the selected system.
12. You can use filters to include a group of codes based on a property rather than adding them one by one. Click **+ Add Filter.**
13. Select a **Property** to filter by (e.g., a certain category or type).
14. Choose an **Operator** (e.g., equals, starts with, etc.).
15. Enter the **Value** to match.
16. Under Exclude rules, Click **+ Add Rule** to create a new exclusion rule.

    Exclude Rules work in the same way as include rules, but they specify which codes to exclude from the ValueSet. This is useful for removing a few specific codes from a broad group that you've included with a filter.

17. You will have the same options (**+Add Concept, +Add Filter**) as the include rules to define the codes you want to remove from the set.
18. Click the **Value Preview** button to see a preview of the codes and values that will be included and excluded based on the rules you have defined.
19. The **Cancel** button is there to discard all changes and return to the ValueSets list.
20. Click the **Save** button to save and create your new ValueSets.
21. You can view the one you created in the ValueSet dashboard.

### Error Handling/Common Issues

| Error / Issue | Possible Cause | Resolution |
|---------------|----------------|------------|
| `Status Not Set` | `Status left blank.` | `Select one: Active, Draft, Retired, or Unknown.` |
| `Unsupported Status` | `Invalid option typed instead of selecting from menu.` | `Use only system-defined statuses.` |
| `Include Rule Missing` | `No inclusion rules added.` | `Use + Add Rule to specify codes from LOINC, SNOMED, or UCUM.` |
| `Unsupported Coding System` | `The selected system is not recognized.` | `Use only supported systems (SNOMED CT, LOINC, UCUM).` |
| `Invalid Code` | `Code does not exist in the chosen system.` | `Cross-check the code in the official coding reference before entry.` |
| `Duplicate Concept Codes` | `Same code repeated in multiple rows.` | `Remove duplicates to avoid redundancy.` |
| `Filter Misconfigured` | `Property, operator, or value mismatch.` | `Correct the filter by selecting valid combinations supported by the coding system.` |
| `Preview Failure` | `Invalid rules or missing codes prevent preview.` | `Fix include/exclude rules, then retry Value Preview.` |
| `Unknown Status Overuse` | `ValueSets frequently left as "Unknown."` | `Update lifecycle state appropriately (Active, Draft, or Retired).` |

## Revision History

| Version | Date | Changes Made | Author | Reviewer |
|---------|------|--------------|--------|----------|
| v1.0 | 26-Aug-2025 | Initial draft | Sreelekshmi S | Suma Sundararajan |
| v2.0 | 28-Aug-2025 | Corrected edits in the Questionnaire and ValueSets Module | Sreelekshmi S | Suma Sundararajan |

---

*This documentation is part of the CARE platform user guide. For technical support, please contact your system administrator.*