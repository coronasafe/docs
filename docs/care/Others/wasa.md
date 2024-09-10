# ABDM WASA Documentation

## Postman Collection
[ABDM WASA Postman Collection](../../../static/files/ABDM_V3.postman_collection.json)  
[ABDM WASA Environment](../../../static/files/ABDM_V3.postman_environment.json)

## Pre-requisite
All the APIs in CARE require authentication and certain permissions to be accessed. Currently, we have role-based permission. There are multiple roles in CARE, but we will focus on three specific roles as they are the most commonly used.

1. **District Admin** - Has access to all the facilities in their district  
   - Username: `devdistrictadmin`  
   - Password: `Coronasafe@123`

2. **Doctor** - Has access to the facilities assigned to the user (limited access to actions like modifying and viewing certain records)  
   - Username: `dev-doctor`  
   - Password: `Coronasafe@123`

3. **Nurse** - Has access to the facilities assigned to the user (limited access to actions like modifying and viewing certain records)  
   - Username: `dev-doctor`  
   - Password: `Coronasafe@123`

In the context of ABDM, there is no difference between these roles if they have access to the facility.

Use the login API in the root folder for authentication.

## Support
Before going to ABDM APIs, it is essential to understand the support APIs. These APIs are crucial for interacting with the CARE system. To use CARE, we need to understand three key entities: **Facility**, **Patient**, and **Consultation**.

- **Facility**: A hospital that can have one or more patients admitted.
- **Patient**: Can have one or more consultations.
- **Consultation**: A record of a patient’s particular visit. It is opened when a patient visits a facility and closed when the patient is discharged.

For simplicity, here are the APIs for listing, getting, and creating these three entities, which will be useful while going through ABDM APIs.

## M1
M1 contains two flows: **Create ABHA Using Aadhaar OTP** and **Login ABHA Using OTP**. All APIs in M1 are synchronous, meaning they do not have any callback API.

### Create ABHA Using Aadhaar OTP
This flow has 7 APIs, called sequentially. The transaction ID from the previous API response is passed into the next API request along with other parameters. This flow creates a new ABHA Number using Aadhaar OTP. A real Aadhaar number and phone number are required for testing, as ABDM does not accept dummy values.

For the last API, `link_abha_number_and_patient`, you need a patient ID, which can be obtained from `get_patient` or `create_patient` from the Support folder.

### Login ABHA Using OTP
This flow has 4 APIs, called sequentially. The transaction ID from the first API response is passed into the third API request. This flow fetches an existing ABHA Number using Aadhaar OTP or Mobile OTP. The second API is optional.

There are two ways to perform this flow:
1. Using Aadhaar number to get an OTP.
2. Using a mobile number to get an OTP. 

A real Aadhaar number or phone number linked with an ABHA number is required for testing. For the last API, `link_abha_number_and_patient`, you need a patient ID, which can be obtained from `get_patient` or `create_patient` from the Support folder.

### Abha Number
ABHA Number is an entity in CARE that stores the ABHA Profile. The following APIs are available:

1. **get** - Fetch the ABHA Number.
2. **abha_card** - Fetch the ABHA card from ABDM (available for 15 minutes after linking the ABHA number).
3. **create** - Create an ABHA Number manually in CARE (used for ABHA number linking using the ABHA QR code).

## M2
M2 consists of four flows: **HIP Initiated Care Context Linking**, **User Initiated Care Context Linking**, **Data Transfer**, and **Scan and Share**. Only the first flow (HIP Initiated Care Context Linking) is initiated by CARE, while the others are initiated by ABDM through callback APIs. M2 APIs are asynchronous, meaning the response is sent via a callback API.

### Health Facility
Health Facility is an entity that maps CARE’s facility to ABDM’s health facility. This is a pre-requisite for M2 and M3 APIs. Mapping is a simple process—creating a health facility is sufficient. The following APIs are available:

1. **create** - Create a health facility (requires `facility_id` from the Support folder and `hf_id` from the postman environment).
2. **get** - Fetch a specific Health Facility.
3. **list** - List all Health Facilities.
4. **update** and **partial_update** - Edit a health facility.
5. **register_service** - Register services for a health facility (automatically called when creating, available for utility).

### HIP Initiated Care Context Linking
This flow has 1 API, which internally triggers multiple API calls to ABDM. It associates care contexts with the patient, requiring consultation IDs from the Support folder.

### Callback APIs
These callback APIs are used by ABDM to communicate with CARE, initiate flows, send responses, update status, and more. For testing, the callback URL will be set in CARE to a webhook site that can receive and forward callback requests to CARE. Please ensure to forward headers too, as they are used in the logic.

## M3
M3 contains one flow: **Raise Consent Request and Request Data**. Like M2, M3 APIs are asynchronous, and responses are sent via callback APIs.

### Raise Consent Request and Request Data
This flow has 5 APIs, but only `consent__request__init` is mandatory. This API creates a consent request, which is sent to the patient via the ABHA App. Once approved by the patient, the rest of the flow is handled internally. 

Optional APIs include:
- **verify_identity** - Checks if the ABHA ID is still valid.
- **consent_request_status** - Fetches the status (approved or denied).
- **fetch_consent_artefact** - Retrieves consent artefacts (approval for accessing data).
- **request_health_information** - Requests data from facilities based on consent artefacts.

Some of these APIs require a consent ID or artefact ID, which can be obtained from the Consent folder in M3.

### Consent
Consent is an entity in CARE that stores Consent Requests and Consent Artefacts. The following APIs are available:

1. **create** - Manually create a Consent Request (same as `consent__request__init`).
2. **get** - Fetch Consent Requests and respective artefacts.
3. **list** - List all Consent Requests and artefacts.

### Health Information
Health Information is an entity in CARE that stores references to the health information obtained from the above flow. It is mapped against the Artefact ID.

1. **get** - Fetch health information by artefact ID (from Consent APIs).

### Callback APIs
These callback APIs are used by ABDM to communicate with CARE, initiate flows, send responses, update status, and more. For testing, the callback URL will be set in CARE to a webhook site that can receive and forward callback requests to CARE. Please ensure to forward headers too, as they are used in the logic.
