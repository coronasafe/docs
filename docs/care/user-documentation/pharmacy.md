---
title: Pharmacy
sidebar_position: 4
---

# Pharmacy Module

## Overview

### Document Information

| Field | Details |
|-------|---------|
| Module | Pharmacy Module |
| Version | v1.0 |
| Date Created | 15-Aug-2025 |
| Last Updated | 28-Aug-2025 |
| Author | Ayisha Shadhi |
| Reviewed By | Suma Sundararajan |
| Target Persona(s) | Admin, Stock Manager, Doctor, Pharmacist |

### Purpose

This workflow enables healthcare facilities to manage the complete medication lifecycle within the CARE platform efficiently, from initial setup and inventory management to prescribing, billing, and dispensing, ensuring accurate documentation and safe medication delivery.

### Scope

The pharmacy workflow covers system configuration, product knowledge setup, stock management (purchase orders, inward entries, internal transfers), clinical prescribing, pharmacy operations (billing, invoicing, dispensing), and reporting and analytics. Does not include external pharmacy integrations, insurance claim processing outside the pharmacy module, or non-medication related inventory.

### User Persona Context

Intended users include healthcare administrators (system setup), stock managers (inventory control), doctors (prescribing), and pharmacists (dispensing operations) who collaborate to ensure safe, efficient, and well-documented medication management.

### Prerequisites

**System Requirements:** User must be logged in with appropriate role assignments (Admin, Stock Manager, Doctor, or Pharmacist). The facility must be configured with pharmacy locations and healthcare services.

**Knowledge Requirements:** Familiarity with medication management principles, CARE platform navigation, inventory control processes, and clinical prescribing workflows.

### Expected Outcome

Upon completion, users will have successfully configured the pharmacy system, managed stock levels, prescribed medications, processed billing, and dispensed medicines with complete documentation and audit trails maintained throughout the CARE platform.

### Login (Admin, Stock Manager, Doctor, Pharmacist)

1. Open your web browser (Google Chrome, Microsoft Edge, or Mozilla Firefox recommended).
2. Enter the **CARE** platform URL in the address bar.
3. Click **Login**.
4. Select the associated facility from the **Facilities** list.

## Module Components

This pharmacy module consists of four main workflows:

- [Admin Setup](#admin-setup) - Initial pharmacy configuration
- [Stock Management](#stock-management) - Inventory and procurement
- [Clinical Prescribing](#clinical-prescribing) - Doctor workflow
- [Pharmacy Operations](#pharmacy-operations) - Pharmacist workflow

---

## Admin Setup

### Document Information

| Field | Details |
|-------|---------|
| Module | Pharmacy – Setting Up the Pharmacy |
| Version | v1.0 |
| Date Created | 15-Aug-2025 |
| Last Updated | 28-Aug-2025 |
| Author | Ayisha Shadhi |
| Reviewed By | Suma Sundararajan |
| Target Persona(s) | Admin |

### Purpose

This workflow guides admin users through the complete initial setup of the pharmacy system, including configuring locations, services, product knowledge, and inventory management to establish the foundation for all pharmacy operations within the healthcare facility.

### Scope

**Includes:**
- Adding facility locations for the pharmacy
- Creating the pharmacy service and linking it to locations
- Creating product knowledge (medicine master list)
- Managing product inventory with billing information

**Excludes:**
- Stock purchase orders and transfers
- Prescribing and dispensing workflows

### User Persona Context

Administrators are responsible for configuring the pharmacy system infrastructure to ensure doctors and pharmacists can effectively use medicines for prescribing, billing, and dispensing operations throughout the healthcare facility.

### Prerequisites

- **System Requirements:** User must be logged into CARE with Admin privileges; Facility structure must be defined in advance
- **Knowledge Requirements:** Medicine details and product information must be available for entry

### Expected Outcome

Pharmacy locations, services, product knowledge, and inventory are successfully created and configured, making the system ready for daily clinical and operational workflows.

### Step-by-Step Instructions

#### Add Location

This process creates physical locations within the facility where pharmacy services will operate. Locations help organize inventory tracking, staff assignments, and workflow management across different pharmacy areas such as the main pharmacy, emergency dispensing, or outpatient services.

1. Open **CARE** and log in as described in the login section above. If you are already logged in, please proceed with the steps below.
2. From the dashboard, select your facility.
3. In the sidebar, go to **Settings > Locations**.
4. Select the parent location (e.g., **OP Pharmacy**) where you want to add a sub-location.
5. Click **+ Add Location**.
6. Fill in the required details:
   - Select **Location Form** (e.g., Site, Building, Room, Bed). Choose the relevant location form from the list.
   - Enter **Name** (Enter a clear name for the location, e.g., Pharmacy Room, Ward A – Bed 1, Radiology Room 2.)
   - (Optional) **Description**
   - (Optional) **Status** → Active
   - (Optional) **Operational Status** → Operational
7. Click **Create** to save.

#### Add Healthcare Service

This process creates the pharmacy service that links locations with pharmacy functionality and enables clinical workflows. Healthcare services define what medical activities can be performed at specific locations and establish the connection between physical spaces and operational capabilities.

1. Open **CARE** and log in as described in the login section above. If you are already logged in, please proceed with the steps below.
2. From the dashboard, select your facility.
3. In the sidebar, go to **Settings**.
4. Click Healthcare Services to view existing services.
5. Click **+ Add Healthcare Service** in the top-right corner.
6. In the **Basic Information** section, enter:
   - **Name** → Enter the relevant healthcare service (e.g., Pharmacy, Laboratory, Radiology, General Consultation).
   - **Internal Type** → Select the corresponding type (e.g., Pharmacy, Laboratory).
   - (Optional) **Extra Details**
7. In the **Locations** section, select the locations within the facility where the pharmacy will be available (e.g., **OP Pharmacy**, **Store C**).
8. (Optional) In the **Styling** section, choose an icon for easy identification.
9. Click **Create** to finalize and add the pharmacy service.

#### Create Product Knowledge

This process establishes the master list of medicines available for prescribing and dispensing throughout the healthcare facility. Product knowledge serves as the central database containing all medication details, dosage forms, and clinical information that doctors and pharmacists reference during patient care.

1. Open CARE and log in as described in the login section above, and if you are already logged in, please proceed with the steps below.
2. From the dashboard, select your facility.
3. In the sidebar, go to **Settings > Product Knowledge**.
4. Use the **Search Bar** or filters (e.g., **Status** and **Product Type**) to find an existing product.
5. To add a new product, click **+ Add Product Knowledge**.
6. Enter:
   - **Name** (e.g., Paracetamol 500mg)
   - **Product Type** (e.g., Medication, Consumable)
   - **Status** → Active or Draft
   - **Dosage Form** (e.g., Tablet, Syrup)
7. (Optional) Add:
   - Trade Names
   - Storage Instructions
   - Stability Duration
   - Intended Routes
8. Click **Save**.

### Error Handling / Common Issues

| Error Message / Issue | Possible Cause | Resolution |
|----------------------|----------------|------------|
| `Location not available in service setup` | `Location not created` | `Create a location first under Settings > Locations` |
| `Product not visible in inventory` | `Not added to Product Knowledge` | `Add product in Settings > Product Knowledge` |
| `Unable to bill the product` | `No Charge Item Definition` | `Create and link a Charge Item Definition` |
| `Duplicate product warning` | `Name already exists` | `Search existing entries before creating a new one` |
| `Healthcare service creation fails` | `Missing required fields or invalid data` | `Verify all mandatory fields are completed correctly` |
| `Product Knowledge saves errors` | `Duplicate name or invalid product type` | `Check for existing products with the same name and verify the product type selection` |
| `Inventory batch creation fails` | `Invalid lot number or expiry date` | `Ensure the lot number is unique and the expiry date is in the future` |
| `Charge Item Definition error` | `Missing pricing information` | `Complete all required billing fields, including base price` |

---

## Stock Management

### Document Information

| Field | Details |
|-------|---------|
| Module | Pharmacy – Stock Setup |
| Version | v1.0 |
| Date Created | 16-Aug-2025 |
| Last Updated | 28-Aug-2025 |
| Author | Ayisha Shadhi |
| Reviewed By | Suma Sundararajan |
| Target Persona(s) | Stock Manager |

### Purpose

This workflow guides stock managers through comprehensive stock-related operations, including creating purchase orders, recording inward stock entries, and managing internal stock transfers to ensure the continuous availability of medicines and consumables throughout the healthcare facility.

### Scope

**Includes:**
- Creating purchase orders for external suppliers
- Recording inward stock entries and verification
- Raising internal stock requests between locations
- Receiving and dispatching stock transfers

**Excludes:**
- Product knowledge creation
- Prescribing and dispensing workflows

### User Persona Context

Stock managers are responsible for ensuring the continuous availability of medicines and consumables in the facility by handling procurement processes, inward stock entries, and internal stock transfers between different pharmacy locations and wards.

### Prerequisites

- **System Requirements:** User must be logged into CARE with Admin or Stock Manager privileges
- **Knowledge Requirements:** Product Knowledge and Product Inventory must already be configured in the system

### Expected Outcome

Stock is ordered from external suppliers, received and verified accurately, and transferred between locations as needed, ensuring pharmacy operations run without interruptions and maintaining optimal inventory levels across the facility.

### Step-by-Step Instructions

#### Create Purchase Order (External Supply)

This process creates purchase orders for external suppliers to procure medicines and consumables. Purchase orders establish formal requests to vendors and track the procurement workflow from order creation to delivery.

1. Open **CARE** and log in as described in the login section above. If you are already logged in, please proceed with the steps below.
2. From the dashboard, select your facility.
3. In the left sidebar, go to **Services** → Your **Pharmacy**, and click **View Details** for the selected product.
4. On the Pharmacy page, select the store/location (e.g., OP Pharmacy) and click **View Prescriptions.**
5. Go to **Inventory → Purchase Orders**
6. Click **+ Create Purchase Order.**
7. Fill the Form:
   - **Vendor/Distributor**: Select from the dropdown.
   - **Status**: Choose Active or Draft.
   - **Reason**: Select Ward Stock or Patient Care.
   - **Priority**: Choose Routine, Urgent, ASAP, or STAT.
   - **Intent**: Set to Order.
   - **Items**: **Select product(s)** → enter **Quantity** → click **Add Another Item** to include more.
8. Review the details and click **Create**.
9. The new purchase order is now visible under Pending POs.

**Result:** A new purchase order is created and ready for vendor processing.

#### Record Inward Stock Entry

This process records the receipt of stock from external suppliers and verifies the received items against purchase orders. It ensures accurate inventory updates and maintains proper documentation for audit trails.

1. Open **CARE** and log in as described in the login section above. If you are already logged in, please proceed with the steps below.
2. From the dashboard, select your facility.
3. Click **Services**.
4. Find Pharmacy → Click View Details.
5. Select **Inventory → Inward Purchase Entries**.
6. Click **Receive Stock**.
7. Select the **Supplier** from the dropdown.
8. Click **+ Add Item**.
9. Select the **Requested Item** (or switch to **Additional Items** and choose the product).
10. Enter the **Received Quantity**.
11. From the item dropdown, click **"Create a new product instead "**.
12. Enter the **Lot/Batch** and **Expiry Date** for this new batch.
13. Click **Add Item**.
14. Review the **Items** for accuracy.
15. Select and click **Save as Received**.
16. The system redirects to In Progress (under Inward Purchase Entries) after clicking **Save as Received.**
17. Click **View Details** on the new entry.
18. **Complete verification**
    - Set **Receiving Status** → **Completed** (or **Abandoned** if rejecting).
    - Set **Item Condition** → **Normal** (or **Damaged**).
    - Confirm the **Received Quantity**.
    - (Optional) Tick **Mark as Fully Received** when all items are accounted for.
    - Click **Mark as Received**.

**RESULT:** The item is received into stock with the status marked as **Received**. Details such as dispatched quantity, expiry date, batch number, and storage instructions are recorded.

#### Internal Stock Transfer – Request & Dispatch Between Stores/Wards

This workflow manages stock transfers between different locations within the facility, ensuring optimal distribution of medicines and consumables where needed.

##### Raise Stock Request (Requesting Unit)

This process allows locations to request stock from other locations within the facility when inventory levels are low or specific items are needed.

1. Open **CARE** and log in as described in the login section above. If you are already logged in, please proceed with the steps below.
2. From the dashboard, go to **Facility** → **Services** → **Pharmacy** → **View Details**.
3. Click **Inventory** → **To Receive**
4. Click **+ Raise Stock Request**.
5. Select **Deliver From**. From the list, select the location to which the request is being sent (supplying store, e.g., Op Pharmacy)
6. Set **Status**, **Reason**, **Priority**, and **Intent**.
7. Click **+ Add Item**, select the **product**, and **enter the quantity**.
8. Review and click **Create**.
9. View the requested items in the **Requests Raised** tab with "Active" status
10. The request goes to the **Supplying Unit's Dispatch** section → after confirming dispatch, the status changes to **Processed**.

##### Receive the Requested Stock

This process records the receipt of requested stock items into the pharmacy inventory, ensuring accurate tracking and updating of available supplies.

1. Open **CARE** and log in as described in the login section above. If you are already logged in, please proceed with the steps below.
2. From the dashboard, go to **Facility** → **Services** → **Pharmacy** → **View Details**.
3. Click **Inventory** → **To Receive**
4. Go to the **Receive Items** tab → click **See Details** of the request.
5. Review dispatched items → click **Mark as Received.**
6. Confirm and click **Done**.
7. The items move to the **Received section**.
8. Requests can also be marked as **Abandoned** (if not fulfilled) or **Entered in Error** (if created by mistake).

##### Dispatch Stock (Supplying Unit)

This process handles the fulfillment of stock requests by the supplying location, completing the internal transfer workflow.

1. Open **CARE** and log in as described in the login section above. If you are already logged in, please proceed with the steps below.
2. From the dashboard, go to **Facility → Services → Pharmacy →** Click **View Details**.
3. Click **Inventory → To Dispatch**
4. Open the **To Dispatch** tab.
5. (Optional) Apply filters to narrow down requests:
   - **Search by Item** – look up a specific item.
   - **Filter by Status** – e.g., Active.
   - **Filter by Priority** – view by urgency.
6. In the "**Request to Dispatch**" tab, select a request → click **See Details.**
7. Enter the **item details, quantities,** and **dispatch information.**
8. Click **Confirm Dispatch.**
9. The request moves to the **Processed** section.
10. The request then appears in the **Requesting Pharmacy's Receive** Items tab.
11. The process is **completed** only after the Requesting Pharmacy **marks the items as Received.**
12. Use the filter to view requests based on their status (e.g., **completed**, **in progress**, **request**, **abandoned**, **entered in error**).

#### View the inventory items

This function allows stock managers to monitor the availability of medicines and supplies in the pharmacy inventory. It provides real-time visibility of item details, stock levels, and helps in planning for replenishment.

1. Open **CARE** and log in as described in the login section above. If you are already logged in, please proceed with the steps below.
2. In the left sidebar, navigate to **Services** → **Pharmacy**, then click **View Details**.
3. Under **Available Locations**, select your preferred pharmacy.
4. Click **View Prescriptions** to see pending prescriptions.
5. From the sidebar, select **Inventory** → **Items** to view stock.

### Error Handling / Common Issues

| Error Message / Issue | Possible Cause | Resolution |
|----------------------|----------------|------------|
| `Cannot create Purchase Order` | `Vendor not defined` | `Add vendor details in system settings` |
| `Stock not visible in Inward Entry` | `Purchase Order not linked` | `Ensure the PO is created before the inward entry` |
| `Request not found in the Receive list` | `Dispatch not completed` | `Verify supplying location has dispatched items` |
| `Duplicate inward entries` | `Same PO entered twice` | `Check existing entries before adding` |
| `Items not available for selection` | `Product inventory not configured / Lot number missing` | `Verify product inventory setup and lot number creation` |
| `Lot/Batch selection unavailable` | `Inventory not properly configured` | `Verify product inventory setup and lot number creation` |

---

## Clinical Prescribing

### Document Information

| Field | Details |
|-------|---------|
| Module | Pharmacy – Clinical Prescribing Workflow |
| Version | v1.0 |
| Date Created | 16-Aug-2025 |
| Last Updated | 28-Aug-2025 |
| Author | Ayisha Shadhi |
| Reviewed By | Suma Sundararajan |
| Target Persona(s) | Doctor |

### Purpose

This workflow guides doctors through the process of prescribing medicines within the CARE platform, ensuring accurate and standardized prescription entries that are properly linked to the pharmacy service for dispensing.

### Scope

**Includes:**
- Accessing patient encounters
- Adding prescriptions to the patient record
- Selecting medicines from product knowledge
- Saving and finalizing prescriptions

**Excludes:**
- Dispensing prescriptions
- Stock setup or product creation

### User Persona Context

Doctors prescribe medicines during patient encounters and consultations. All prescriptions must be entered into the CARE platform to ensure the pharmacy can dispense the correct medications with proper documentation and tracking.

### Prerequisites

- **System Requirements:** User must be logged into CARE with Doctor privileges; An active patient encounter must be created
- **Knowledge Requirements:** Product Knowledge must be set up (refer to Admin Setup section)

### Expected Outcome

Prescriptions are successfully added to the patient's encounter record and are immediately available for review and dispensing in the pharmacy module.

### Step-by-Step Instructions

#### Access Patient Encounter

This section enables doctors to navigate to and open existing patient encounters where clinical documentation and prescriptions are recorded. Patient encounters represent individual visits or consultations and serve as the central location for all clinical activities during that specific healthcare interaction.

1. Open **CARE** and log in as described in the login section above. If you are already logged in, please proceed with the steps below.
2. From the dashboard, select your facility.
3. Go to **Patients → Encounters**.
4. Search for the patient by name, ID, or encounter number.
5. Once you locate the patient, click **View Encounter.**

**Result:** Patient encounter is opened.

#### Add Prescription

This process involves creating and documenting medication prescriptions within the patient's encounter record. Doctors select appropriate medicines from the system's knowledge base and specify complete dosage instructions, frequency, and duration to ensure safe and effective treatment.

1. Open **CARE** and log in as described in the login section above. If you are already logged in, please proceed with the steps below.
2. Go to **Patients → Encounters**.
3. Click **View Encounter**.
4. Click the **Medicines** tab inside the patient encounter.
   - You will see:
     1. Prescriptions
     2. Ongoing Medicines
     3. Medicine Administration
5. Click **Add/Edit** Medicines to open the Medication Request form.
   - **If no medicines are listed** → use **Add** to create a new prescription.
   - **If medicines are already listed** → use **Edit** to update existing prescriptions or add new ones.
6. Enter the following details:
   - Medicine Name (select from Product Knowledge)
   - Dosage (e.g., 500 mg)
   - Frequency (e.g., 1-0-1)
   - Duration (e.g., 5 days)
7. (Optional) Add additional **instructions** (e.g., "Take on an empty stomach").
8. (Optional) Add **Route** (e.g., Sublabial route, Subretinal route, Intraportal route)
9. (Optional) Add **Site** (e.g., Structure of left supraclavicular lymph node, Structure of right deltoid muscle)

**Note:** Medicines can be prescribed via questionnaires using the "Medication Request" structured questionnaire.

10. Click **Submit**.

**Result:** The medication request can be viewed in the medicines section within the encounter.

### Error Handling / Common Issues

| Error Message / Issue | Possible Cause | Resolution |
|----------------------|----------------|------------|
| `Medicine is not listed in the search` | `Product not created in Product Knowledge` | `Ask Admin to add product (refer to Admin Setup)` |
| `Unable to save prescription` | `Required fields missing` | `Enter dosage, frequency, and duration in all required fields` |
| `Prescription not visible to the pharmacy` | `Prescription not finalized` | `Ensure prescriptions are properly submitted and finalized` |
| `Encounter not accessible` | `Patient encounter not created or insufficient privileges` | `Verify encounter exists and the user has Doctor privileges` |
| `Medicine dropdown empty` | `Product Knowledge is not set up` | `Contact Admin to configure Product Knowledge (Admin Setup)` |
| `Form submission fails` | `Network connectivity or system timeout` | `Refresh the page and retry, or contact technical support` |

---

## Pharmacy Operations

### Document Information

| Field | Details |
|-------|---------|
| Module | Pharmacy – Pharmacist Workflow |
| Version | v1.1 |
| Date Created | 16-Aug-2025 |
| Last Updated | 28-Aug-2025 |
| Author | Ayisha Shadhi |
| Reviewed By | Suma Sundararajan |
| Target Persona(s) | Pharmacist |

### Purpose

This workflow guides pharmacists through handling prescriptions, dispensing medicines, initiating billing, recording payments, and printing prescriptions in the CARE platform. It ensures accurate processing of all pharmaceutical transactions and proper documentation.

### Scope

**Includes:**
- Viewing the prescription queue
- Initiating billing and recording payments
- Dispensing medicines
- Printing prescriptions

**Excludes:**
- Prescription creation
- Stock setup procedures

### User Persona Context

Pharmacists verify doctor-entered prescriptions, manage billing processes, dispense medicines to patients, and ensure proper documentation of all pharmaceutical transactions within the healthcare facility.

### Prerequisites

- **System Requirements:** User must be logged into CARE with Pharmacist privileges
- **Knowledge Requirements:** Prescriptions must be finalized by a doctor; Stock must be available in the pharmacy inventory

### Expected Outcome

All prescriptions are processed accurately with proper billing, dispensing, and system documentation completed.

### Step-by-Step Instructions

#### Prescription Queue and Billing

The prescription queue displays all pending prescriptions that require pharmacist attention. This section allows you to filter, review, and prioritize prescriptions based on their billing status and urgency.

1. Open **CARE** and log in as described in the login section above. If you are already logged in, please proceed with the steps below.
2. From the dashboard, select your facility.
3. Click **Services** in the sidebar.
4. Find **Pharmacy** → Click **View Details**.
5. Under **Available Locations**, select your preferred pharmacy.
6. Click **View Prescriptions** to see pending prescriptions.
7. Click **See Prescription** next to a patient's name to open prescription details.
8. There are two options available:
   - **Billing Pending:** Shows medications that are not billed/invoiced. You can also add new medicines here.
     - Click **Add New Medications** to update.
     - Click **Print Prescription** for a copy.
   - **Partially Billed:** Shows prescriptions where some items are already billed.
     - If medications have already been added, click **Start Billing**.
9. To add extra medicines, click **Add Medication** and choose a medicine from the list.
10. Enter key details: Dosage, Frequency, Duration, and Method.
11. Click **Add Medication** to include the item in the bill list.
12. Review the bill and confirm accuracy.
13. Select the appropriate Lot, adjust quantities, and apply discounts if applicable.
14. Click **Bill Selected** to finalize the medicine list.
15. Provide final invoice details such as **Payment Terms** and **Notes**.
16. Confirm all amounts, including Quantity and Unit Price.
17. Click **Create Invoice** to generate the billing record.
18. Click **"Issue Invoice"** at the top right to finalize the invoice.
19. After the invoice is issued, click **"Record Payment"**.
    - In the pop-up, select **Payment Method** (Cash, Card, etc.).
    - Confirm **Payment Type** and **Payment Amount**.
    - Optionally, add **Reference Number** or **Notes**.
    - Click **"Record Payment"** to save.
20. Click **Mark as Balanced** after the payment is recorded.
21. Click **"Confirm"** in the pop-up to finalize.
22. Once the invoice shows **Balanced**, click **"Dispense Medicine Now"** to go to the dispensing queue and dispense the items.

**Result:** The patient's name and prescribed medications will appear in the Medications Dispense section, ready for physical dispensing.

#### Dispensing Medications

This final step involves distributing medications to patients after billing is complete. Pharmacists verify payment status, confirm medication availability, and document the dispensing process to maintain accurate inventory and patient records.

1. Open **CARE** and log in as described in the login section above. If you are already logged in, please proceed with the steps below.
2. In the sidebar, click **Services**, then **Pharmacy > View Details**, and choose the desired location.
3. Navigate to **Dispense** from the sidebar to open the **Medication Dispense** window.
4. Use tabs to view **Pending** (current requests) or **History** (completed requests).
5. Use the search bar to find a patient if needed.
6. Click **View** next to the patient to open details.
7. Patient details appear at the top of the window.
8. Apply filters to view **Medication status**: Preparation / In Progress / Cancelled / On Hold.
   - Pharmacists can update the status of medications using the dropdown in the Status column.
9. If the payment status is Paid, verify that the medicines and prescription details are correct, then click **Complete Dispense**.
10. (Optional) Click **View Account** for billing info.
11. If the payment status is **Unpaid**, a billing follow-up is required before dispensing. Once payment is cleared, the prescription moves to the Paid tab.

**Billing an Unpaid Prescription (if required):**

- If the payment status is **Unpaid**, click **View Account.**
- Select the invoice under **Draft**.
- Click **Issue Invoice**.
- Click **Record Payment**.
- After recording the payment, click **Mark it as Balanced and click Confirm.**
- Once payment is cleared, the prescription will automatically move to the Paid tab.
- Click **Complete Dispense** to mark medicines as dispensed.
- Dispense medicines to the patient.

**Result:** As a result, after billing, the pharmacists dispense the medicine to patients by updating the status and physically distributing the medications.

### Error Handling / Common Issues

| Error Message / Issue | Possible Cause | Resolution |
|----------------------|----------------|------------|
| `Prescription not visible` | `Prescription not finalized by the doctor` | `Request the doctor to finalize the prescription (refer to Clinical Prescribing)` |
| `Medicine not available` | `No inward stock or expired batch` | `Raise a stock request through inventory management (refer to Stock Management)` |
| `Payment failed` | `Incorrect payment details or system error` | `Retry payment with correct details or contact technical support` |
| `Dispense action fails` | `Prescription not billed or payment pending` | `Complete the billing process first before attempting to dispense` |
| `Patient not found in the queue` | `Patient not registered or prescription not created` | `Verify patient registration and ensure the prescription has been created by the doctor` |
| `Invoice generation error` | `Missing required fields or system timeout` | `Check all mandatory fields are filled and retry, or refresh the page` |
| `Print function not working` | `Browser settings or printer connectivity` | `Check printer connection and browser print permissions` |
| `Lot selection unavailable` | `Insufficient stock or the lot has expired` | `Select an alternative lot or request new stock from inventory` |

## Revision History

| Version | Date | Changes Made | Author | Reviewer |
|---------|------|--------------|--------|----------|
| v1.0 | 16-Aug-25 | Initial draft of Pharmacy Module Workflow | Ayisha Shadhi | Suma Sundararajan |
| v2.0 | 18-Aug-25 | Submitted the Pharmacy Module as per the given template | Ayisha Shadhi | Suma Sundararajan |
| v2.1 | 20-Aug-20 | Updated font color, heading size, and heading | Ayisha Shadhi | Suma Sundararajan |
| v2.2 | 22-Aug-25 | Updated the flow of internal transfer and billing workflows | Ayisha Shadhi | Suma Sundararajan |

---

*This documentation is part of the CARE platform user guide. For technical support, please contact your system administrator.*