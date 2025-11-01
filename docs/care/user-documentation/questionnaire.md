# Questionnaire

## What are Questionnaires?

A **Questionnaire** is a customizable form used to collect information from users or staff. It can be about a patient, doctor, clinical procedure, or any other resource in the system. By building and updating Questionnaires, you can adapt quickly to changing data-collection needs without requiring software changes.

### Key Benefits

- **Flexible**: Easily update questions, add new fields, and reorder sections
- **Adaptable**: Use different question types (multiple choice, text, date, etc.) for various scenarios
- **User-Friendly**: Build and manage forms in a simple interface without writing any code

## Who Can Create and Manage Questionnaires?

By default, administrators can create new Questionnaires and manage existing ones. If you need access to the form builder but don't see the option, contact your system administrator.

## Navigation to Questionnaires

To access the questionnaire management system:

1. **Log into the CARE Staff portal** as an administrator
2. In the Admin Dashboard menu, click the **Questionnaires** button
3. Review the Questionnaire Management screen showing existing questionnaires
4. Apply filters to view questionnaires by status: **Active**, **Draft**, or **Retired**
5. Use the **Questionnaire Search bar** to locate specific questionnaires by title or keyword
6. Click **+ Create Questionnaire** in the top-right corner to create a new form

## Creating a New Questionnaire

### Configuring Basic Information

The **Basic Information** section defines the core identity of the questionnaire:

1. Navigate to the **Basic Information** section
2. Enter a clear and descriptive **Title** (e.g., "Patient Intake Form," "Post-operative Follow-up Survey")
3. In the **Slug** field, enter a unique, URL-friendly identifier (e.g., patient-intake-form)
4. In the **Description** field, enter a detailed explanation of the questionnaire's purpose

### Configuring Questionnaire Properties

The Properties section allows you to define core settings:

1. Go to the **Properties** section
2. Under **Status**, select one option:
   - **Active**: The questionnaire is live and ready for use
   - **Draft**: The questionnaire is a work in progress and not yet available
   - **Retired**: The questionnaire is no longer in use

3. Under **Subject Type**, select the context:
   - **Patient**: Used for questionnaires related to a patient and updated within the patient profile
   - **Encounter**: Used for questionnaires related to a specific clinical visit or event

4. Under **Organizations**, use **Select Organizations** to assign the questionnaire to one or more groups (e.g., doctor, administrator, nurse, staff, official)

5. Use **Tags** to categorize and organize your questionnaires:
   - Click **Select Tags** to pick from existing tags
   - To create a new tag, click **Create Tag** and fill in:
     - **Tag Name**: Enter a descriptive name (e.g., "Emergency," "Follow-up," "Mental Health")
     - **Tag Slug**: A unique, URL-friendly identifier (lowercase with hyphens)
   - **Special Tag**: Use `encounter_actions` to highlight and list this particular form within the encounter page

6. Review the **Version** field, which is preset to **1.0** for new questionnaires

## Adding and Configuring Questions

### Adding a Question

1. Click the **Add Question** button below the Basic Information section
2. A new **question block** will be created with configurable fields
3. Enter **Question Text** (required field)
4. Enter a **Description** for the question
5. Select the **Question Type** from the dropdown

### Available Question Types

- **Group**: A container for organizing related questions under a single heading
- **Display**: Shows static text or instructions without collecting an answer
- **Boolean**: Simple "yes/no" question
- **Decimal**: Numerical answer with decimal points (e.g., 3.14)
- **Integer**: Whole number answer (e.g., 1, 2, 3)
- **Date**: Calendar date selection
- **Date Time**: Date and time selection
- **Time**: Time of day selection
- **String**: Short text field for brief answers
- **Text**: Larger text area for detailed responses
- **URL**: Website address or link collection
- **Choice**: Predefined options for users to choose from
- **Quantity**: Number with unit of measurement (e.g., 5 kg, 2 hours)
- **Structured**: Specialized question type for medical data

### Adding Coding Details

Coding ensures questions are mapped to internationally recognized medical terminologies:

1. Click **+ Add Coding** in the question block
2. In **System**, choose the coding system:
   - **SNOMED CT**: Clinical terms, diagnoses, conditions, symptoms, procedures
   - **LOINC**: Laboratory tests, observations, measurements
   - **UCUM**: Standardized units of measure (mg, mmHg, kg)
3. Enter the exact **Code** from the selected system
4. Verify the **Display** field is automatically populated
5. Use **Remove Coding** button to remove if needed

### Configuring Question Settings

**Question Settings** control the fundamental behavior:
- **Required**: User must provide an answer before submission
- **Repeatable**: Allows multiple answers to the same question
- **Read only**: Question is displayed but user cannot edit the answer

**Data Collection Details** specify metadata collected with answers:
- **Collect Time**: Captures when the question was answered
- **Collect Performer**: Records who provided the answer
- **Collect Body Site**: Specifies relevant body site
- **Collect Method**: Documents the method used to obtain the answer

### Enabling Conditions

Control question visibility based on previous answers:

1. Click **+ Add Condition** under Data Collection details
2. Choose whether **All conditions must be met** or **Any one condition can be met**
3. Define conditions:
   - **Select a Question**: Choose the triggering question
   - **Choose an Operator**: Select logical operator (Equals, Not Equals, Greater Than, etc.)
   - **Enter an Answer Value**: Specify the triggering answer
4. Click **+ Add Condition** to create additional conditions

## Detailed Question Type Configuration

### Group Questions

Groups organize related questions under one heading:

1. Set type to **Group**
2. Configure basic information and coding if necessary
3. Select **Group Layout**:
   - **Full Width**: Single full-width column
   - **Equal Split**: Two equal columns side-by-side
   - **Wide Start**: Wide left column, narrow right column
   - **Wide End**: Wide right column, narrow left column
4. Click **Add Sub-Question** and configure each like a normal question
5. Set enabling conditions if needed

### Choice Questions

Present predefined options for selection:

1. Set type to **Choice**
2. Select a **Unit** if applicable
3. Configure **Answer Options** using one of two approaches:

**Using Value Set:**
- Click **Value Set**
- Select existing ValueSets from dropdown
- Click **Create ValueSet** if none suitable exists
- System auto-populates options based on selected Value Set

**Using Custom Options:**
- Click **Custom Options**
- Click **+ Add Option**
- For each option, enter:
  - **Option Value**: System reference value
  - **Display Text**: Text shown to users (e.g., Yes/No)
- Enable **Sort Alphabetically** for automatic arrangement
- Repeat until all options are added

### Structured Questions

For specialized medical data collection:

1. Set type to **Structured**
2. Select **Structured Type**:
   - **Allergy Intolerance**: Record allergies
   - **Medication Request**: Raise medication requests
   - **Medication Statement**: Record ongoing medications
   - **Symptom**: Capture symptoms
   - **Diagnosis**: Capture diagnoses
   - **Time of Death**: Record death
   - **Appointment**: Book appointments
   - **Files**: Add file attachments
   - **Service Request**: Raise service requests
   - **Charge Item**: Add charge items

## Managing Questionnaires

### Viewing and Editing

1. Navigate to the Questionnaire Management screen
2. Click the **View** button for any questionnaire
3. Use **Edit Form** to make changes
4. Use **Form Preview** to see how it appears to end-users
5. Click **Download** to export in JSON format
6. Use **Save** to save changes or **Cancel** to discard

## Best Practices & Tips

1. **Keep It Simple**: Only add necessary questions. Long forms can overwhelm users.
2. **Use Groups/Sections Wisely**: Break your form into smaller sections for better navigation.
3. **Leverage Conditional Logic**: Don't show questions that aren't relevant.
4. **Review Before Publishing**: Always preview the form in Draft mode to catch mistakes early.
5. **Stay Consistent**: Use consistent naming and question wording across multiple forms.
6. Use LOINC Code for Questions and SnomedCT for answers

---

## Summary

**Questionnaires** empower you to gather information in a structured, user-friendly way. By creating and managing forms within your administrative interface:

- You can swiftly adapt to new data requirements.
- You maintain control over how users fill out critical information.
- You ensure consistent data collection across different workflows.

With a bit of planning and the tips above, you'll be able to create intuitive, effective Questionnaires for all of your organization's needs. If you need additional help, consult your team's administrator or support channel.

## Support

For additional help with questionnaires, contact the CARE support team or refer to the technical documentation.