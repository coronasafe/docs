---
title: Billing
sidebar_position: 2
---

# Billing Module

## Patient Accounts and Payment Management

## Overview

### 1. Document Information

| Field | Value |
|-------|-------|
| Module | Billing Module |
| Version | v1.0 |
| Date Created | 16th August 2025 |
| Last Updated | 28th August 2025 |
| Author | Ardhra SunilKumar |
| Reviewed By | Suma Sundararajan |
| Target Persona(s) | Billing Staff / Accounts Team |

### 2. Purpose

This document guides billing staff through the process of managing patient accounts, creating invoices, recording payments, collecting advances, and closing or settling accounts within the CARE platform. It ensures financial accuracy, transparency, and compliance with healthcare billing standards.

### 3. Scope

Covers accessing accounts, checking unbilled charge items, creating invoices, recording payments, handling advances, rebalancing, and closing accounts. Does not cover clinical documentation, patient registration, and appointment management.

### 4. User Persona Context

Billing staff are responsible for reviewing charge items, generating invoices, processing payments, and reconciling patient accounts to ensure that all financial records are accurate and up to date.

### 5. Prerequisites

#### 5.1 System Requirement

* Users must be logged in to the CARE platform with valid credentials.
* Users must have the **Billing / Accounts role** assigned in the system.

#### 5.2 Knowledge Requirement

* Familiarity with searching for patients and navigating to patient accounts.
* Understanding of charge items and their statuses (**Planned, Billable, Billed, Paid**).
* Ability to verify invoices and payment entries for accuracy.
* Awareness of advance payment handling and account settlement workflows.

### 6. Expected Outcome

* Patient accounts can be accessed and reviewed.
* Unbilled charge items can be converted into invoices.
* Payments, including advances, can be accurately recorded.
* Accounts can be rebalanced and settled with a **Balanced** status.

### 7. Billing & Payment Terms

**1. Invoice** - A formal financial document summarizing all billable items linked to a patient's encounter. It ensures accurate billing and payment tracking.

Invoice Statuses:
* **Draft** – Created but not yet issued.
* **Issued** – Finalized and ready for payment.
* **Balanced** – All payments received, invoice fully settled.
* **Cancelled** – Invalidated and excluded from billing.

**2. Charge Items** - Individual billable services, procedures, or products (*Example: consultation, lab test*). Each charge item belongs to a patient's encounter and can be added into invoices.

Charge Item Statuses:
* **Planned** – Service recorded, not yet billable.
* **Billable** – Eligible to be added to an invoice.
* **Billed** – Already included in an invoice.
* **Paid** – Cleared through invoice settlement.

**3. Payments** - Monetary transactions made to settle invoices or advance patient accounts.

Payment Components:
* **Payment Amount** – The portion applied toward the invoice.
* **Tender Amount** – The total amount handed over (system calculates change if > Payment Amount).
* **Payment Method** – Cash, Card, UPI, Bank Transfer.
* **Payment Type**:
  * **Payment** – Regular settlement.
  * **Advance** – Prepaid, used for future invoices.
  * **Adjustment** – Corrections or modifications.

Payment Statuses:
* **Active** – Successfully recorded.
* **Draft** – Saved but not finalized.
* **Cancelled** – Reversed/invalidated.
* **Error** – Failed or incorrect entry.

**4. Rebalance**:
* Function used only to recalculate patient accounts if necessary.
* Ensures no unbilled or unsettled amounts remain after updates (new charges, partial payments).

### 8. Login (Billing Staff/ Accounts Team)

**Step 1**: Login to the CARE platform with your credentials.

**Step 2**: Select the associated facility from the **Facilities** list.

**Step 3**: List down a set of options including **Overview, Queues, Patients, Appointments, Users, Resources, Billing, Services and Settings.**

**Step 4**: **Billing** lists down a set of options including **Accounts, Payments** and **Invoices**.

## Step-by-Step Instructions

### 8.1 Accessing Patient Accounts

**Step 1**: Login as per the instructions mentioned and navigate to the Billing section on the home screen and click on Accounts and follow the below steps accordingly.

**Step 2**: In the account details, you can view the **Account Status** (Active, Inactive, On Hold, Entered in Error) alongside the **Billing Status** (Open, Closed, Settled).

**Step 3**: Search for the patient account and click **Go to Account**.

### 9.2 Checking Unbilled Charge Items

**Step 1**: Login as per the instructions mentioned and navigate to the Billing section on the home screen and click on Accounts and follow the below steps accordingly.

**Step 2**: Search for the patient account and click **Go to Account**.

**Step 3**: Within the patient account, click the **Charge Items** tab.

**Step 4**: Identify any items listed as **Billable** but not yet invoiced.

### 9.3 Creating an Invoice

**Step 1**: Login as per the instructions mentioned and navigate to the Billing section on the home screen and click on Accounts and follow the below steps accordingly.

**Step 2**: Search for the patient account and click **Go to Account**.

**Step 3**: Check if there are Billable Charge Items.

**Step 4**: If there are Billable Charge items, Click **Create Invoice**.

**Step 5**: Select the charge items with status **Billable**.

**Step 6**: Click **Create Invoice** to generate the draft invoice.

**Step 7**: Review the invoice details.

**Step 8**: Click **Issue Invoice** to finalize it.

**Step 9**: The charge item status changes from **Billable** to **Billed**.

### 9.4. Recording Payments

**Step 1**: Login as per the instructions mentioned and navigate to the Billing section on the home screen and click on Accounts and follow the below steps accordingly.

**Step 2**: Search for the patient account and click **Go to Account**.

**Step 3**: After the invoice is created and issued, it is visible under **Invoices**, click **See Invoice** to record payment.

**Step 4**: Click **Record Payment**.

**Step 5**: Enter **Payment Method** (Cash, Card, UPI, Bank Transfer).

**Step 6**: Enter **Payment Amount** and **Tender Amount.** Payment Amount is the actual amount the patient needs to pay for the bill. Tender amount indicates the amount of money the patient physically gives at the counter, which may be equal to or greater than the actual payment amount.

**Step 7**: Click **Record Payment**.

**Step 8**: Payment is recorded and linked to the invoice. The remaining balance is updated automatically.

**Step 9**: After the total amount is paid, the **issued invoice** is marked as balanced by selecting **Mark as Balanced** option.

**Step 10**: Once invoice is balanced, the charge item status is updated to **Paid.**

**Step 11**: From the Dashboard, Click **Billing** and select **Payments** to view all payment history.

## 10. Collecting Advance Payments

**Step 1**: Login as per the instructions mentioned and navigate to the Billing section on the home screen and click on Accounts and follow the below steps accordingly.

**Step 2**: Search for the patient account and click **Go to Account**.

**Step 3**: From the account page, click **Record Payment**.

**Step 4**: Under **Payment Type**, select **Advance**.

**Step 5**: Enter the **Advance Amount** and payment details.

**Step 6**: Click **Record Payment**.

**Step 7**: From the Dashboard, Click **Billing** and select **Payments**.

**Step 8**: Click **Advance** and view the advance payment history.

## 11. Closing and Settling an Account

**Step 1**: Login as per the instructions mentioned and navigate to the Billing section on the home screen and click on Accounts and follow the below steps accordingly.

**Step 2**: Search for the patient account and click **Go to Account**.

**Step 3**: Click **Settle & Close** option to close the account.

**The following could be the reasons to settle and close the account:**

* The organization has been unable to recover the amount and has decided not to pursue debt recovery. **(Closed bad debt)**
* The account was not created in error, however the organization has decided not charge any transactions for this account. **(Closed voided)**
* The account is closed and all charges are processed and accounted for. **(Closed completed)**
* This account has been combined with another account, and all charges have been migrated. **(Closed combined)**

**Step 4**: Choose an option for an account and click **Close Account**.

## 12. Invoice Management

**Step 1**: Login as per the instructions mentioned and navigate to the Billing section on the home screen and click on Invoices and follow the below steps accordingly.

**Step 2**: The system will display all invoices with their statuses:

* **Draft** – Invoice created but not yet issued.
* **Issued** – Invoice sent out for payment.
* **Balanced** – Invoice where charges and payments are fully reconciled.

## 13. Payment Reconciliation

**Step 1**: Login as per the instructions mentioned and navigate to the Billing section on the home screen and click on Payments and follow the below steps accordingly.

**Step 2**: The system will display all payments categorized under statuses:

* **Active** – Successfully recorded payments.
* **Draft** – Payments created but not yet finalized.
* **Cancelled** – Invalidated or voided payments.
* **Error** – Payments that failed or were incorrectly entered.

**Step 3**: Payments are also grouped by Type:

* **Payment** – Standard settlement of invoices.
* **Advance** – Amount collected in advance before invoicing.
* **Adjustment** – Manual corrections applied to balance the account.

## 14. Error Handling / Common Issues

| Error Message / Issue | Possible Cause | Resolution |
|----------------------|----------------|------------|
| Cannot Issue Invoice. | Attempting to issue without selecting items | Select Billable items before creating an invoice. |
| `Invalid input`, while recording payment. | Submitting without filling the required details. | Check the filled details and then start recording payment |

## 15. Related Documents / Links

*To be added as needed*

## 16. Revision History

| Version | Date | Changes Made | Author | Reviewer |
|---------|------|--------------|--------|----------|
| v1.0 | 16th August 2025, 18th August 2025, 19th August 2025, 21st August 2025, 28th August 2025 | Initial Draft | Ardhra SunilKumar | Suma Sundararajan |