# Supply Request

### Summary

The **Supply Request** resource in the CARE system represents a formal request for the provision of healthcare-related items such as medications, devices, or other supplies. It serves as the initial step in the supply chain workflow, capturing the intent to procure or transfer items within or between facilities.

This resource aligns with FHIR's [SupplyRequest](https://build.fhir.org/supplyrequest.html) resource, facilitating standardized communication and interoperability in supply management processes.[FHIR Build](https://build.fhir.org/supplyrequest.html?utm_source=chatgpt.com)

---

### Key Purpose

- Initiate requests for the supply of healthcare items.
- Facilitate inventory management by tracking requested items.
- Support logistics and procurement workflows within healthcare facilities.
- Enable integration with downstream processes such as supply delivery and inventory updates.

---

### Core Data Structure – Essential Fields

- **`id`**: Unique identifier for the supply request.
- **`status`**: Current status of the request (e.g., draft, active, suspended, completed, entered-in-error, cancelled).
- **`category`**: Classification of the supply request (e.g., central, non-stock).
- **`priority`**: Indicates the urgency of the request (e.g., routine, urgent, asap, stat).
- **`item`**: The item being requested, represented as a reference to a resource (e.g., Medication, Device) or a code.
- **`quantity`**: The amount of the item requested.
- **`occurrence`**: The timeframe when the request should be fulfilled.
- **`authoredOn`**: Date when the request was created.
- **`requester`**: Individual or organization making the request.
- **`supplier`**: Potential suppliers who can fulfill the request.
- **`reasonCode`**: Reason for the request.
- **`deliverFrom`**: Origin location for the supply.
- **`deliverTo`**: Destination location for the supply.[FHIR Build+2Medplum+2HAPI FHIR+2](https://www.medplum.com/docs/api/fhir/resources/supplyrequest?utm_source=chatgpt.com)[InterSystems Documentation+1FHIR Build+1](https://docs.intersystems.com/irisforhealthlatest/csp/documatic/%25CSP.Documatic.cls?CLASSNAME=HS.FHIR.DTL.vSTU3.Model.Resource.SupplyDelivery&LIBRARY=HSLIB&utm_source=chatgpt.com)[FHIR Build](https://build.fhir.org/supplydelivery-definitions.html?utm_source=chatgpt.com)[Medical Packaging Inc., LLC+2FHIR Build+2IdentiMedical+2](https://build.fhir.org/resourcelist.html?utm_source=chatgpt.com)

---

### Core Relationships

| Field         | Reference Resource         | Description                                |
| ------------- | -------------------------- | ------------------------------------------ |
| `item`        | Medication, Device         | The specific item being requested.         |
| `requester`   | Practitioner, Organization | Entity initiating the supply request.      |
| `supplier`    | Organization               | Potential supplier to fulfill the request. |
| `deliverFrom` | Location                   | Origin location for the supply.            |
| `deliverTo`   | Location                   | Destination location for the supply.       |

---

### Supported Fields

**Status Codes:**

- `draft`: The request has been created but is not yet active.
- `active`: The request is currently active and awaiting fulfillment.
- `suspended`: The request has been temporarily suspended.
- `completed`: The request has been fulfilled.
- `entered-in-error`: The request was entered in error and is not valid.
- `cancelled`: The request has been cancelled.

**Priority Levels:**

- `routine`: Standard priority.
- `urgent`: High priority.
- `asap`: As soon as possible.
- `stat`: Immediate action required.

---

### Functional Workflow

1. **Request Initiation**: A supply request is created by a practitioner or organization, specifying the item, quantity, and delivery details.
2. **Review and Approval**: The request is reviewed and approved by the appropriate authority within the facility.
3. **Fulfillment Planning**: Upon approval, the request is forwarded to potential suppliers or internal departments for fulfillment planning.
4. **Supply Delivery**: Once the supply is prepared, a corresponding Supply Delivery is initiated to track the movement of items.
5. **Inventory Update**: Upon receipt, the inventory at the destination location is updated to reflect the new stock levels.
6. **Request Completion**: The supply request status is updated to 'completed' to indicate fulfillment.
