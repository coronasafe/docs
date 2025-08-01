# Medication Request

### Summary

A [**MedicationRequest**](https://hl7.org/fhir/medicationrequest.html) is an order or request for both the supply of medication and instructions for its administration to a patient. It represents the prescriber's intent for a medication to be supplied and/or administered.

---

### Key Purpose

- Create and track medication orders/prescriptions
- Document medication instructions and dosage requirements
- Facilitate regular and PRN (as needed) medications[Wikipedia+7Flexpa+7ExecuteCommands+7](https://www.flexpa.com/docs/fhir/medication-request?utm_source=chatgpt.com)

---

### Core Components

- Medication details (drug, form, strength)
- Dosage instructions
- Timing and frequency
- Route of administration
- Quantity/duration
- Patient and prescriber information

---

### Core Relationships

| Field        | Reference Resource | Description                                              |
| ------------ | ------------------ | -------------------------------------------------------- |
| `subject`    | Patient            | The patient for whom the medication is prescribed.       |
| `encounter`  | Encounter          | The encounter during which the prescription was created. |
| `medication` | Medication         | The medication being prescribed.                         |
| `requester`  | Practitioner       | The individual who initiated the prescription.           |

---

### Supported Fields

| Field Name     | Type          | Description                              |
| -------------- | ------------- | ---------------------------------------- |
| `Medicine`     | string        | Medicine name                            |
| `Dosage`       | string        | Dosage suggested                         |
| `Frequency`    | string        | Frequency of medication                  |
| `Duration`     | string        | Duration of medicine administration      |
| `Instructions` | text          | Additional instructions                  |
| `Route`        | text          | Administration route                     |
| `Site`         | text          | Body site                                |
| `Method`       | text          | Administration method                    |
| `Intent`       | text          | Medicine intent                          |
| `Authored_on`  | date and time | Prescribed on                            |
| `Note`         | text          | Additional notes about the prescription. |

---

### Functional Workflow

1. **Prescription Creation**: A healthcare provider creates a MedicationRequest during a patient encounter.
2. **Review and Approval**: The prescription is reviewed and approved as per facility protocols.
3. **Dispensing**: The pharmacy dispenses the medication as per the prescription details.
4. **Administration and Monitoring**: The patient administers the medication, and adherence is monitored.
5. **Status Updates**: The status of the MedicationRequest is updated based on the medication's lifecycle (e.g., completed, stopped).
