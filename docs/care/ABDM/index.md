# ABDM

## Overview

### Introduction to ABDM

The Ayushman Bharat Digital Mission (ABDM), initiated by the Government of India, represents a transformative step towards creating a more integrated digital health ecosystem across the country. This ambitious initiative aims to enhance the efficiency, effectiveness, accessibility, and transparency of health service delivery nationwide. By leveraging the power of digital technologies, ABDM seeks to establish a unified digital health infrastructure that facilitates the seamless exchange of health information across different levels of service delivery.

At the heart of ABDM lies the creation of unique health IDs for citizens, digital healthcare professionals and facility registries, and a unified health interface. These components work together to enable a secure and interoperable health data exchange mechanism that respects privacy and consent. The mission’s foundational elements are designed to support a wide range of health applications and services, thereby fostering innovation and empowering patients with access to their own health data.

The integration of ABDM with Health Information Management Systems (HIMS) is pivotal for streamlining health data management, improving patient care outcomes, and facilitating real-time data access. This integration enables healthcare providers to offer a continuum of care services that are more coordinated, personalized, and efficient. By connecting disparate health information systems, ABDM facilitates a holistic view of patient health records, thereby enhancing clinical decision-making and improving health service delivery across India.

The Ayushman Bharat Digital Mission marks a significant milestone in India's journey towards achieving universal health coverage and underscores the country's commitment to leveraging digital technologies for health sector reform. Through its comprehensive approach to digital health, ABDM is poised to transform the landscape of healthcare in India, making it more accessible, inclusive, and patient-centered.

### Purpose of Integration

The integration of the Ayushman Bharat Digital Mission (ABDM) into our Health Information Management System (HIMS) is driven by a multifaceted purpose, aiming to revolutionize the way health care is delivered, managed, and accessed in our organization. This strategic move is designed to harness the power of digital technologies to enhance healthcare outcomes, improve patient experiences, and create a more efficient and interconnected health ecosystem. Here are the key objectives behind this integration:

1. **Enhancing Data Interoperability**

   One of the primary goals of integrating ABDM with our HIMS is to ensure seamless interoperability of health data across different healthcare providers, systems, and services. By adopting standardized data formats and protocols, we facilitate the easy exchange and utilization of health information, enabling a more coordinated and efficient healthcare delivery system.

2. **Improving Patient Care and Outcomes**

   The integration allows for a more holistic view of patient health records, which is crucial for delivering personalized and timely healthcare services. Healthcare providers can access a patient's comprehensive health history, including previous diagnoses, treatments, and medications, enabling them to make better-informed decisions and provide more effective care. This leads to improved patient outcomes and satisfaction.

3. **Streamlining Administrative Processes**

   By digitizing and integrating health records and administrative processes, ABDM reduces the administrative burden on healthcare providers and staff. This efficiency gain not only reduces costs but also allows healthcare professionals to focus more on patient care rather than paperwork and administrative tasks.

4. **Promoting Patient Empowerment**

   ABDM integration empowers patients by giving them access to their own health records through secure digital platforms. This accessibility encourages patients to take an active role in managing their health, fostering a more engaged and informed patient population.

5. **Ensuring Data Privacy and Security**

   A critical aspect of the integration is the emphasis on robust data privacy and security measures. By adhering to stringent standards and employing advanced security technologies, the integration ensures that patient data is protected against unauthorized access and breaches, thereby maintaining patient trust and confidentiality.

6. **Facilitating Healthcare Innovation**

   The integration serves as a foundation for healthcare innovation by enabling the development and deployment of new digital health applications and services. These innovations can enhance healthcare delivery, improve health monitoring, and provide patients with new tools for health management.

7. **Supporting Public Health Initiatives**

   Lastly, the integration of ABDM with our HIMS supports broader public health initiatives by providing valuable health data analytics and insights. This data can inform public health policies, support disease surveillance and management, and contribute to the overall improvement of health outcomes at the community and national levels.

In conclusion, the integration of ABDM into our Health Information Management System is a strategic initiative that aligns with our commitment to leveraging digital technology for enhancing healthcare delivery. It promises to bring about a significant transformation in how healthcare services are delivered, experienced, and managed, paving the way for a more efficient, patient-centric, and innovative healthcare ecosystem.

## Technical Documentation

### Setup

Integrating the Ayushman Bharat Digital Mission (ABDM) into the CARE requires a straightforward setup process, configuration of environment variables, the setup of the Fidelius service, and the establishment of a bridge URL for recieving callbacks. This section provides a step-by-step guide to accomplish these tasks.

0. **Prerequisites**

   Before you begin the setup for integrating Ayushman Bharat Digital Mission (ABDM) with CARE HIMS, ensure the following prerequisites are completed:

   1. ABDM Access and Keys

      Ensure you have applied for and obtained either sandbox or production access to ABDM, along with the necessary access. This is essential for authenticating and communicating with the ABDM services.

      - **Sandbox / Production Access**: Follow the instructions provided here for ABDM sandbox signup: [ABDM Sandbox Signup](https://sandbox.abdm.gov.in/abdm-docs/ABDMSandboxSignup).

   2. Register Health Professional and Facility

      Ensure you have registered the health professionals and facilities with ABDM. This is essential for creating and managing health records and data exchange with ABDM.

      - **Health Professional Registration**: Follow these instructions to register: [Health Professional Registry](https://sandbox.abdm.gov.in/abdm-docs/HealthProfessionalRegistry).

      - **Health Facility Registration**: Follow these instructions to register: [Health Facility Registry](https://sandbox.abdm.gov.in/abdm-docs/HealthFacilityRegistory).

   3. Setting Up CARE

      Ensure that the CARE is set up successfully on your local or server environment. This setup is crucial for the subsequent integration of ABDM functionalities.

      - **CARE Setup Guide**: Detailed instructions for setting up CARE are available here: [CARE Local Setup](https://care-be-docs.coronasafe.network/local-setup/configuration.html).

1. **Fidelius Setup**

   Fidelius is an 3rd party open source service that is used for encrypting and decrypting data to and from ABDM.

   If CARE is setup or deployed using Docker, specifically through the `make up` command, Fidelius is automatically installed and configured as part of the setup process. In case of manual setup, to install Fidelius, please follow the documentation in https://github.com/sukreet/fidelius.

   Please note that we are actively working on developing a Python alternative to Fidelius to streamline the setup process and reduce external dependencies. This forthcoming solution aims to integrate seamlessly within the CARE, offering an in-house mechanism for encrypting and decrypting data without the need for additional services. To follow the progress of this development or contribute, please visit https://github.com/coronasafe/care/issues/1871.

2. **Environment Variable Configuration**

   The ABDM features within CARE are disabled by default and can be enabled through environment variables. Set the following environment variables:

   | Environment Variable     | Description                                                                                                  | Default Value                                               | Required |
   | ------------------------ | ------------------------------------------------------------------------------------------------------------ | ----------------------------------------------------------- | -------- |
   | `ENABLE_ABDM`            | Enables or disables the ABDM integration. Set to `true` to enable.                                           | false                                                       | Yes      |
   | `FIDELIUS_URL`           | The URL where the Fidelius service is running. This service handles data encryption and decryption for ABDM. | `http://fidelius:8090`                                      | Yes      |
   | `ABDM_CLIENT_ID`         | The client ID provided by ABDM upon registration. Used for authentication with the ABDM APIs.                | `""` (Provided by ABDM)                                     | Yes      |
   | `ABDM_CLIENT_SECRET`     | The client secret provided by ABDM upon registration. Used for authentication with the ABDM APIs.            | `""` (Provided by ABDM)                                     | Yes      |
   | `ABDM_URL`               | The base URL for the ABDM services.                                                                          | `https://dev.abdm.gov.in` (Sandbox environment)             | Yes      |
   | `HEALTH_SERVICE_API_URL` | The URL for the health service API provided by ABDM.                                                         | `https://healthidsbx.abdm.gov.in/api` (Sandbox environment) | Yes      |
   | `ABDM_FACILITY_URL`      | The URL for the ABDM facility services.                                                                      | `https://facilitysbx.abdm.gov.in` (Sandbox environment)     | Yes      |
   | `X_CM_ID`                | Identifier for the Consent Manager in the ABDM ecosystem.                                                    | `sbx` (Sandbox environment)                                 | Yes      |
   | `HIP_NAME_PREFIX`        | Prefix for the Health Information Provider (HIP) name. Used to uniquely identify the healthcare provider.    | `""` (Set as needed)                                        | No       |
   | `HIP_NAME_SUFFIX`        | Suffix for the Health Information Provider (HIP) name. Further customizes the HIP identifier.                | `""` (Set as needed)                                        | No       |
   | `ABDM_USERNAME`          | Username for internal use within CARE for ABDM services.                                                     | `abdm_user_internal` (Change as needed)                     | No       |

3. **Bridge URL Setup**

   The Ayushman Bharat Digital Mission (ABDM) employs an asynchronous API architecture, which plays a pivotal role in how requests are processed and responses are communicated. When an API call is made to ABDM, it initially responds with a 202 status code, indicating that the request has been accepted but not yet processed. The actual processing occurs asynchronously. Upon completion, ABDM sends the response back to the initiating system by making a callback API call to a pre-defined URL, known as the bridge URL. For ABDM-CARE integration, this bridge URL needs to be correctly set up to ensure seamless communication and data exchange with ABDM.

   **To set the bridge url:**

   1. Authenticate with ABDM and get the accessToken

      ```sh
          curl --location 'https://dev.abdm.gov.in/gateway/v0.5/sessions' \
          --header 'Content-Type: application/json' \
          --data '{
          "clientId": "<ABDM_CLIENT_ID>",
          "clientSecret": "<ABDM_CLIENT_SECRET>"
          }'
      ```

   2. Set the bridge url

      ```sh
          curl --location --request PATCH 'https://dev.abdm.gov.in/gateway/v1/bridges' \
          --header 'Content-Type: application/json' \
          --header 'Authorization: Bearer <ACCESS_TOKEN>' \
          --data '{
          "url": "<CARE_URL>"
          }'
      ```

   3. Verify the bridge url

      ```sh
          curl --location 'https://dev.abdm.gov.in/gateway/v1/bridges/getServices' \
          --header 'Authorization: Bearer <ACCESS_TOKEN>'
      ```

### Flows

The integration of the Ayushman Bharat Digital Mission (ABDM) with the CARE were done in 3 stages. This section provides a detailed guide on the integrated flows in each stage.

0.  **Miscellaneous**

    This section outlines the process for configuring the Health Facility ID for a given facility. This step was introduced following the completion of Milestone 2 to enable tracking of actions performed by Health Information Providers (HIPs) for statistical purposes and to determine which HIP executed a specific action.

    **Prerequisites:**

    - A registered Health Facility with a Health Facility ID.

    **Flows:**

         1. **Configure Health Facility ID**

            This flow involves setting up the Health Facility ID for a given facility within the CARE system. The Health Facility ID is a unique identifier assigned by ABDM to each health facility, enabling tracking and identification of the facility within the ABDM ecosystem.

            **Steps:**

               1. Select an existing facility or create a new one within the CARE system.
               2. Configure the Health Facility ID by sending a POST request to the endpoint `abdm/health_facility`. Include both `hf_id` and `facility_id` in the request. This action will not only create a health facility within CARE but also register the facility as a service (HIP & HIU) within the ABDM system.

    **Models:**

         1. **HealthFacility**

            _Represents the association between a CARE facility and its registration within the ABDM system. This model maintains a one-to-one relationship with a facility._

            | Fields          | Description  |
            |----------------|--------------|
            | `hf_id` | A unique identifier for the health facility as assigned by ABDM. |
            | `registered` | A boolean value indicating whether the facility has been successfully registered as a service provider in ABDM. |
            | `facility` | Links to the corresponding CARE facility, establishing a mapping between the two. |

1.  **Milestone 1 (M1)**

    The following documentation outlines Milestone 1 (M1), which focuses on creating and linking ABHA numbers within the system. This milestone is crucial for integrating with ABDM and facilitating patient identification and authentication.

    **Prerequisites:**

    - The Health Facility ID must be configured for the respective facility.

    **Flows:**

         1. **Creation of ABHA Number Using Aadhaar OTP**

            This flow involves creating an ABHA number for a patient within the CARE system. The ABHA number is a unique identifier assigned by ABDM to each patient, enabling accurate identification and tracking of patient health records.

            **Steps:**

               1. Send the Aadhaar number to the `generate aadhaar otp` API in ABDM.
               2. ABDM requests OTP from UIDAI, which is sent to the mobile number registered with the Aadhaar number, and returns a transaction ID.
               3. Submit the received OTP along with the transaction ID to the `verify aadhaar otp` API in ABDM.
               4. Upon verification, ABDM returns another transaction ID.
               5. Send the mobile number and new transaction ID to the `check and generate mobile otp` API in ABDM.
               6. If the mobile number differs from the Aadhaar registered number, an OTP is sent; and finally a transaction ID is returned in both cases.
               7. If a new mobile number is used, verify the OTP and transaction ID using the `verify mobile otp` API.
               8. Send the final transaction ID and a unique username for health ID to the `create health id pre verified` API.
               9. ABDM creates the health ID and returns the ABHA profile.
               10. Store the ABHA profile in the database and link it with the patient, either immediately if already registered or later.

         2. **Linking an Existing ABHA Number Using Mobile / Aadhaar OTP**

            This process allows for the verification and linking of an existing ABHA number by authenticating the user through mobile or Aadhaar OTP.

            **Steps:**

               1. Send the ABHA number or health ID to the `search by health id` API in ABDM.
               2. ABDM provides the available authentication methods.
               3. Choose an authentication method (mobile or Aadhaar OTP) and send it along with the ABHA number or health ID to the `auth init` API in ABDM.
               4. ABDM dispatches an OTP to the user’s mobile number and returns a transaction ID.
               5. Submit the received OTP and the transaction ID to the appropriate API (`confirm with aadhaar otp` or `confirm with mobile otp`) based on the chosen method.
               6. ABDM verifies the OTP and returns the ABHA profile.
               7. Store the ABHA profile in the database and link it with the patient, either immediately if already registered or later.

         3. **Linking an Existing ABHA Number by Scanning QR Code (Scan and Pull)**

            This flow enables the linking of an existing ABHA number by scanning a QR code generated by the patient. This method simplifies the authentication process and facilitates the retrieval of patient health records.

            **Steps:**

               1. Scan the patient's ABHA QR code to capture the essential details encoded in it.
               2. Create the ABHA profile in the database using the data extracted from the QR code.
               3. Link the ABHA profile with the patient's record—if the patient is already registered in the system, update their existing record; if not, create a new patient and link the abha profile.
               4. Call a series of APIs to validate the QR content and obtain a linking token for the ABHA profile, which will be crucial for further actions.
               5. Call the `fetch modes` API in ABDM to retrieve possible ways to authenticate the user.
               6. ABDM sends the available authentication methods via a callback request to the `on fetch modes` endpoint.
               7. Initiate the authentication process by calling the `init` API with the health ID, intended purpose, and chosen mode.
               8. ABDM sends the transaction ID to the `on init` endpoint and dispatches an OTP to the patient if the selected mode involves OTP.
               9. Call the `confirm` API with the transaction ID and OTP (or other credentials) to confirm the authentication.
               10. ABDM sends the linking token to the `on confirm` endpoint.
               11. Update the linking token in the ABHA profile in the database, ensuring that the profile is fully authenticated and linked.

         4. **Patient Sharing ABHA Details via Scanning HIP QR Code (Scan and Share)**

            This flow enables patients to share their ABHA details with a Health Information Provider (HIP) by scanning the HIP's QR code. This method allows for secure and efficient sharing of health information between patients and healthcare providers.

            **Steps:**

               1. Patient scans the HIP QR code through their ABHA app and shares their ABHA profile with the HIP (CARE), a process independent of CARE's direct operations.
               2. ABDM sends the ABHA profile to the HIP (CARE) at the `patients/share` endpoint, including the facility ID, which is predetermined during the creation of the HIP QR code.
               3. In CARE, create a patient record with the ABHA profile if the patient is not already registered in the system.
               4. Call a series of APIs to fetch the linking token for the ABHA profile, which includes `fetch modes`, `init`, and `confirm` APIs; subsequently, update the linking token in the ABHA profile in the database asynchronously.
               5. Call the `on share` API in ABDM with a token number to confirm the sharing of the ABHA profile.

    **Models:**

         1. **AbhaNumber**

               _Represents the ABHA profile assigned to a patient within the CARE. This model maintains a one-to-one relationship with a patient._

               | Field           | Description                                            |
               |-----------------|--------------------------------------------------------|
               | `abha_number`   | Unique ABHA number                                     |
               | `health_id`     | Unique ABHA ID for easy reference                      |
               | `name`          | Patient's full name (concatenation of first, middle, last names) |
               | `first_name`    | Patient's first name                                   |
               | `middle_name`   | Patient's middle name                                  |
               | `last_name`     | Patient's last name                                    |
               | `gender`        | Patient's gender                                       |
               | `date_of_birth` | Patient's date of birth                                |
               | `address`       | Patient's full address                                 |
               | `district`      | Patient's district                                     |
               | `state`         | Patient's state                                        |
               | `pincode`       | Patient's pin code                                     |
               | `email`         | Patient's email address                                |
               | `profile_photo` | base64 string of patient's profile image                         |
               | `new`           | Boolean to check if the ABHA number is new or not      |
               | `txn_id`        | Transaction ID for the OTP verification (to be deprecated) |
               | `access_token`  | Access token or linking token                          |
               | `refresh_token` | Refresh token for the access token                     |

2. **Milestone 2 (M2)**

   The following documentation outlines Milestone 2 (M2), which focuses on the system's capability to share patient records across different Health Information Users (HIUs) upon request, leveraging the ABHA number to ensure secure and authenticated data exchange.

   **Prerequisites:**

   - The respective facility must have its Health Facility ID properly configured.
   - The patient's ABHA number must be linked as described in Milestone 1 (M1).

   **Flows:**

         1. **Linking the Care Context in ABDM**

            This flow involves linking the care context within the ABDM system, enabling the exchange of patient health records between different Health Information Users (HIUs). The care context serves as an identification of an encounter. This process is initiated either by the HIP or the patient.
            
            i.i. **HIP Initiated Care Context Linking**
               
               1.  Before establishing a care context, initiate a sequence of API calls—`fetch modes`, `init`, and `confirm`—to acquire a linking token associated with the patient’s ABHA profile.
               2. Once the linking token is obtained, use the `add care context` API in ABDM. Pass the linking token along with the care context name (using the consultation ID as the care context name) to create the care context.
            
            i.ii. **Patient Initiated Care Context Linking**

               1. Patients can start the care context linking process directly from their ABHA app.
               2. Upon initiation by the patient, ABDM sends the patient data to the HIP at the `care-contexts/discover` endpoint.
               3. In CARE, identify the patient using the data provided by ABDM and send back the consultation IDs of the respective patient for linking care contexts through a callback API, at the `care-contexts/on-discover` endpoint.

         2. **Sending Patient Records to Other HIUs when Requested**

            This flow enables the sharing of patient records with other Health Information Users (HIUs) upon request. The HIP can send patient records to other HIUs for consultation or further treatment, ensuring seamless data exchange and continuity of care.

            **Steps:**

               1. An HIU sends a consent request to the patient via their ABHA app. This step is not directly related to the CARE system in the context of M2.
               2. The patient reviews and approves the consent request through their ABHA app.
               3. Upon consent approval, ABDM sends the consent artefact to the CARE system at the `consents/hip/notify` endpoint.
               4. In CARE, store the consent artefact in memory and send an acknowledgement back to ABDM at the `consents/hip/on-notify` endpoint.
               5. The HIU formally requests the data from ABDM. This step is outside the direct purview of CARE in the context of M2.
               6. ABDM forwards this request to CARE at the `health-information/hip/request` endpoint, including the consent artefact ID, encryption details (public key and nonce), and the data push URL.
               7. In CARE, verify the validity and currency of the consent ID. Fetch all consultations that fall within the consent artefact's specified range.
               8. Convert the fetched data into the FHIR format, encrypt it using Fidelius, and send the encrypted data directly to the data push URL. Include encryption details (public key, shared key, and nonce).
               9. Send an acknowledgement to ABDM at the `health-information/hip/on-request` endpoint after pushing the data.


3. **Milestone 3 (M3)**

   The following documentation outlines Milestone 3 (M3), which focuses on the system's capability to receive patient records from other Health Information Providers (HIPs) and display them within the CARE system.

   **Prerequisites:**

   - The respective facility must have its Health Facility ID properly configured.
   - The patient's ABHA number must be linked as described in Milestone 1 (M1).
   - The care context related to the respective consultation must be linked as described in Milestone 2 (M2). 

   **Flows:**
   
         1. **Receiving Patient Records from Other HIPs**

            This flow enables the CARE system to receive patient records from other Health Information Providers (HIPs) upon request.

            **Steps:**

               1. A consent request is created for the patient and stored in CARE using a POST request to `abdm/consent`.
               2. The request is then initiated with ABDM via `consent_requests/init`.
               3. ABDM sends the consent request to the patient on their ABHA app (this step is external to CARE).
               4. ABDM sends the patient's response (approved or rejected) to CARE at `consents/hiu/notify`:
                  - If approved: ABDM sends the respective consent artefacts, potentially multiple, each corresponding to a HIP visit within the requested date range.
                  - If rejected: Only the rejection status is sent to CARE.
               5. In CARE, update the status of the consent request based on the response received and save any consent artefacts in the database.
               6. Send an acknowledgement to ABDM at `consents/hiu/on-notify`.
               7. After sending the acknowledgement, fetch all the consent artefacts via `consents/fetch`. ABDM responds with the consent artefacts in the `consent/on-fetch` callback API.
               8. Update the fetched information in the database.
               9. Send a health information request to ABDM via `health-information/cm/request` with encryption details (public key and nonce) and the data push URL where HIPs can directly send the encrypted data.
               10. Once the data is received from HIP (HIP encrypts and sends the data directly to HIU through the data push URL—this step is external to CARE), update the consent artefact status in CARE.
               11. Decrypt the data and store it in an S3 bucket using the existing File Upload utility.
               12. Send an acknowledgement to ABDM at `health-information/notify`.
               13. Fetch the data from the S3 bucket when requested from the frontend and provide it to the end user.
               14. If the patient revokes the consent or if the consent expires, mark the file as archived, noting the specific reason (expired or revoked).
               15. Once archived, the data becomes inaccessible from the frontend, ensuring compliance with consent laws and patient privacy regulations.
   
   **Models**

      1. **ConsentRequest**

         _Represents a consent request initiated by a HIP for sharing patient records with other HIUs. This model maintains a one-to-many relationship with consent artefacts._

         | Field               | Description                                                  |
         |---------------------|--------------------------------------------------------------|
         | `request_id`        | Unique identifier for the consent request.                   |
         | `patient_abha`      | ABHA number mapping to identify the patient.                 |
         | `care_contexts`     | Array of objects containing `patientReference` and `careContextReference` which link to specific patient and consultation IDs. |
         | `status`            | Current status of the consent request (e.g., requested, granted, denied, expired, revoked). |
         | `purpose`           | Purpose of the consent request.                              |
         | `hi_types`          | Types of medical information requested.                      |
         | `hip`               | HIP ID (not utilized in the current context).                |
         | `hiu`               | ID of the Health Information User requesting the consent.    |
         | `requester`         | CARE user mapping who initiates the consent request.         |
         | `access_mode`       | Type of access permitted (view, store, query, stream).       |
         | `from_time`         | Start date from which the data is requested.                 |
         | `to_time`           | End date till which the data is requested.                   |
         | `expiry`            | Expiry date of the data access permission.                   |
         | `frequency_unit`    | Unit of frequency (hour, day, week, month, year).            |
         | `frequency_value`   | Value that specifies how often the data access is permitted within the frequency unit. |
         | `frequency_repeats` | Number of times the data access frequency is repeated.       |  

      2. **ConsentArtefact**

         _Represents a consent artefact generated as part of a consent request, this contains few additional fields wrt consent request. This model maintains a one-to-many relationship with consent requests._

         | Field                       | Description                                                        |
         |-----------------------------|--------------------------------------------------------------------|
         | `artefact_id`               | Unique identifier for the consent artefact (UUID).                 |
         | `transaction_id`            | Transaction ID associated with the consent request.                |
         | `consent_request`           | Mapping to the specific consent request.                           |
         | `patient_abha`              | ABHA number mapping to identify the patient.                       |
         | `care_contexts`             | JSON array containing `patientReference` and `careContextReference` which link to specific patient and consultation IDs. |
         | `status`                    | Current status of the consent artefact (requested, granted, denied, expired, revoked). |
         | `purpose`                   | Purpose of the consent artefact.                                   |
         | `hi_types`                  | Types of medical information requested.                            |
         | `hip`                       | HIP ID (not utilized in current context).                          |
         | `hiu`                       | ID of the Health Information User requesting the consent.          |
         | `cm`                        | Consent Manager ID (not utilized in current context).              |
         | `requester`                 | CARE user mapping who initiates the consent request.               |
         | `access_mode`               | Type of access permitted (view, store, query, stream).             |
         | `from_time`                 | Start date from which the data is requested.                       |
         | `to_time`                   | End date till which the data is requested.                         |
         | `expiry`                    | Expiry date of the data access permission.                         |
         | `frequency_unit`            | Unit of frequency (hour, day, week, month, year).                  |
         | `frequency_value`           | Value specifying how often the data access is permitted within the frequency unit. |
         | `frequency_repeats`         | Number of times the data access frequency is repeated.             |
         | `key_material_algorithm`    | Encryption algorithm used.                                         |
         | `key_material_curve`        | Encryption curve used.                                             |
         | `key_material_public_key`   | Public key used for encryption.                                    |
         | `key_material_private_key`  | Private key used for encryption (sensitive information).           |
         | `key_material_nonce`        | Nonce used in encryption.                                          |
         | `signature`                 | Signature of the incoming data to verify its integrity.            |
  




### Data Mapping

The integration of the Ayushman Bharat Digital Mission (ABDM) with the CARE involves the mapping of data fields between the two systems. This data mapping process ensures that health information is accurately exchanged and synchronized between ABDM and CARE, enabling seamless interoperability and data consistency. Here is an overview of the key data mapping considerations for the CARE-ABDM integration.

We utilize FHIR (Fast Healthcare Interoperability Resources) standards, which are designed to facilitate better data exchange and interoperability within healthcare systems. FHIR provides a framework for the exchange of healthcare information in a structured format across different systems.

Below is an approximate mapping of CARE data models to FHIR resources. It's important to note that these mappings are not exact but provide a foundational approach to how data from CARE is translated into FHIR profiles for use in ABDM:

| CARE Model    | FHIR Profile                   | Link to CARE Model                                                                                                     | Link to FHIR Profiles                                                                                                                  |
| ------------- | ------------------------------ | ---------------------------------------------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------- |
| Patient       | Patient                        | [CARE Patient](https://github.com/coronasafe/care/blob/develop/care/facility/models/patient.py#L45)                    | [FHIR Patient](https://www.hl7.org/fhir/patient.html)                                                                                  |
| User          | Practitioner                   | [CARE User](https://github.com/coronasafe/care/blob/develop/care/users/models.py#L175)                                 | [FHIR Practitioner](https://www.hl7.org/fhir/practitioner.html)                                                                        |
| Facility      | Organization                   | [CARE Facility](https://github.com/coronasafe/care/blob/develop/care/facility/models/facility.py#L114)                 | [FHIR Organization](https://www.hl7.org/fhir/organization.html)                                                                        |
| Diagnosis     | Condition                      | [CARE Diagnosis](https://github.com/coronasafe/care/blob/develop/care/facility/models/icd11_diagnosis.py#L70)          | [FHIR Condition](https://www.hl7.org/fhir/condition.html)                                                                              |
| Procedure     | Procedure                      | [CARE Procedure](https://github.com/coronasafe/care/blob/develop/care/facility/models/patient_consultation.py#L101)    | [FHIR Procedure](https://www.hl7.org/fhir/procedure.html)                                                                              |
| Consultation  | Encounter + CarePlan           | [CARE Consultation](https://github.com/coronasafe/care/blob/develop/care/facility/models/patient_consultation.py#L32)  | [FHIR Encounter](https://www.hl7.org/fhir/encounter.html), [FHIR CarePlan](https://www.hl7.org/fhir/careplan.html)                     |
| Investigation | DiagnosticReport               | [CARE Investigation](https://github.com/coronasafe/care/blob/develop/care/facility/models/patient_consultation.py#L99) | [FHIR DiagnosticReport](https://www.hl7.org/fhir/diagnosticreport.html)                                                                |
| DailyRound    | Observation                    | [CARE DailyRound](https://github.com/coronasafe/care/blob/develop/care/facility/models/daily_round.py#L34)             | [FHIR Observation](https://www.hl7.org/fhir/observation.html)                                                                          |
| File          | DocumentReference              | [CARE File](https://github.com/coronasafe/care/blob/develop/care/facility/models/file_upload.py#L121)                  | [FHIR DocumentReference](https://www.hl7.org/fhir/documentreference.html)                                                              |
| Prescription  | Medication + MedicationRequest | [CARE Prescription](https://github.com/coronasafe/care/blob/develop/care/facility/models/prescription.py#L85)          | [FHIR Medication](https://www.hl7.org/fhir/medication.html), [FHIR MedicationRequest](https://www.hl7.org/fhir/medicationrequest.html) |

_Currently, not all data within CARE is mapped to FHIR models. We are actively working on expanding and refining these mappings to enhance the completeness and accuracy of data exchange. This ongoing effort aims to improve interoperability and ensure that all relevant health information is seamlessly integrated and available through ABDM. The exact mapping can be found here: [ABDM FHIR Mappings](https://github.com/coronasafe/care/blob/develop/care/abdm/utils/fhir.py)_

ABDM expects all data to be encapsulated in the FHIR Composition format. A Composition resource in FHIR is used to describe a set of resources that are compiled together to provide a detailed and coherent narrative. This format is particularly useful for ensuring that all relevant health data related to a single patient or event is grouped together, making it easier for healthcare providers to access and understand the patient’s situation.

For more detailed guidance on how to structure data using FHIR Composition, refer to the ABDM documentation: [Packaging Health Data with FHIR Composition](https://sandbox.abdm.gov.in/abdm-docs/PackagingHealthData).

_Data mapping from CARE models to FHIR profiles is specifically executed when sending data to the requested Health Information Provider (HIP) in Module 2 (M2). It is important to note that when data is received from another HIP, it is not remapped but instead is forwarded directly to the frontend. The data received is displayed using the HI Profiles npm package, which can be found here: [HI Profiles](https://github.com/coronasafe/hi-profiles). This package ensures that the data is presented in a consistent and standardized format, aligning with predefined HI Profiles._

### Security and Compliance

We rigorously adhere to all security and compliance standards recommended by the Ayushman Bharat Digital Mission (ABDM). Patient data is encrypted using the encryption standards specified by ABDM prior to sharing, ensuring its security during transmission. Additionally, this data is stored in a secure S3 bucket, accessible exclusively to authorized users, which guarantees data confidentiality and integrity. In compliance with ABDM’s guidelines, data is also archived once the consent provided by a patient expires or is revoked, rendering it inaccessible to users. We consistently follow ABDM's prescribed data sharing standards to maintain high levels of data protection and ethical handling.

ABDM mandates comprehensive audits conducted by external security teams, which have been pre-approved by ABDM, before granting production access. These audits are scheduled to occur once every year, providing consistent reassurance that our application upholds the best security and compliance standards throughout its operation. The primary focus of these audits is to ensure that our application meets all functional requirements, adheres to ABDM regulations, and upholds industry standards in security practices.

Furthermore, our CARE system undergoes additional audits conducted by the ABDM team, specifically designed to verify compliance with ABDM regulations and overall security. These audits are systematically performed after the completion of each milestone to ensure ongoing compliance and security assurances. Below are the attachments that detail the outcomes of the audits conducted after each milestone, offering transparency and evidence of our system's robust security and compliance posture:

1. **Milestone 1 Audit Report**: 

   - [Certificate of Compliance](https://drive.google.com/file/d/1Uyuy6m4HFZ7CIdVFS_MIMxuhTyEjcJ-t/view?usp=sharing)
   - [Safe to Host Certificate](https://drive.google.com/file/d/1ODcG_sos-0zM2dQU9Baiwb296c7qj_lQ/view?usp=sharing)
   - [Functional Test Report](https://docs.google.com/spreadsheets/d/1SPRSx0JPfJXOZF_4aMwpEJmgK9E2cUnU/edit?usp=sharing&ouid=103545470959739179970&rtpof=true&sd=true)
   - [Cyber Security Audit Report](https://drive.google.com/file/d/1r8ZpolaxhzNZixeQHRl_SRiM353rxiBN/view?usp=sharing)

2. **Milestone 2 Audit Report**: 

   - [Certificate of Compliance](https://drive.google.com/file/d/1yT8jKGVMJCIt-VnaqdiemAXJXHaWhlKz/view?usp=sharing)
   - [Safe to Host Certificate](https://drive.google.com/file/d/1Sko4jU4J7-AlXka5_ulvYZ-rPImtLOG-/view?usp=sharing)
   - [Functional Test Report](https://docs.google.com/spreadsheets/d/17ITNPUCBc7afAjUevX1EZRE2HBqeKTrn/edit?usp=sharing&ouid=103545470959739179970&rtpof=true&sd=true)
   - [Cyber Security Audit Report](https://drive.google.com/file/d/156j1o5X0ae7qg6OQzgzaOxcOkT5HFEXn/view?usp=sharing)

3. **Milestone 3 Audit Report**: 

   - [Certificate of Compliance](https://drive.google.com/file/d/1iT2RLszu4eSe4NipyARX9saRENH63JWG/view?usp=sharing)
   - [Safe to Host Certificate](https://drive.google.com/file/d/1d_TzOcBvhg9Zs9w6BTyt-eVX8mIUlbfu/view?usp=sharing)
   - [Functional Test Report](https://docs.google.com/spreadsheets/d/1tOuJPJHQ-Fg5bYfG1UdrHqKFAxC8brId/edit?usp=sharing&ouid=103545470959739179970&rtpof=true&sd=true)
   - [Cyber Security Audit Report](https://drive.google.com/file/d/1bdj_NE4HBet7tt8pIcQ9lUHXhg3Y3poM/view?usp=sharing)

## User Guide

### Demo

Explore our demonstration videos that showcase the integration of the Ayushman Bharat Digital Mission (ABDM) with the CARE system across different milestones. These videos provide a visual guide to the functionalities implemented during each phase of the integration process:

- [ABDM Integration with CARE - Milestone 1 & 2](https://drive.google.com/file/d/1yx2fZuPofy6KljACxcQuaZFez-t-5yMf/view?usp=sharing): This video covers the initial and intermediate stages of our integration, demonstrating key processes and interactions within the first two milestones.
- [ABDM Integration with CARE - Milestone 3](https://drive.google.com/file/d/1ux91Se3fPR7dz_kRU90xkEAVUzsYT0YP/view?usp=sharing): Watch how we complete the integration process with advanced functionalities in the final milestone.

_Note: The user interface (UI) shown in these videos may have been updated since their recording. However, the core flow and processes remain largely unchanged._

### FAQs
<details>
<summary>1. How to create a QR code for HIP which patients can scan to get registered?</summary>

Create a QR code with the following URL as the content:

```
https://phrsbx.abdm.gov.in/share-profile?hip-id=HIP-ID&counter-id=CARE-FACILITY-EXTERNAL-ID
```

Replace `HIP-ID` with the Health Information Provider (HIP) ID and `CARE-FACILITY-EXTERNAL-ID` with the external ID of the CARE facility. Patients can scan this QR code to share their ABHA profile with the HIP.

_If you want create QRs in production replace `phrsbx` with `phr`_

_Read More at https://sandbox.abdm.gov.in/docs/build_hip_share_patient_profile1.0_
</details>

### Updates and Enhancements

Our team is committed to continuously improving the integration of the Ayushman Bharat Digital Mission (ABDM) with the CARE system. We are actively working on enhancing the existing functionalities, adding new features, and refining the user experience to ensure seamless data exchange and interoperability. Stay tuned for upcoming updates and enhancements to our integration with ABDM.

We track all updates, enhancements, and bug fixes through our GitHub repository. You can view the latest changes, updates, and releases on our GitHub page: [CARE Frontend](https://github.com/coronasafe/care_fe) and [CARE Backend](https://github.com/coronasafe/care).

_To track ABDM specific issues and updates, use `ABDM` label in the issues section of the repository. [ABDM Frontend Updates](https://github.com/coronasafe/care_fe/labels/ABDM) and  [ABDM Backend Updates](https://github.com/coronasafe/care/labels/ABDM)_

### Resources

For more information on the Ayushman Bharat Digital Mission (ABDM) and its integration with the CARE system, refer to the following resources:

- [ABDM Documentation](https://sandbox.abdm.gov.in/abdm-docs): Access the official ABDM documentation for detailed information on the mission, its objectives, and the technical specifications for integration.
- [ABDM CARE Documentation](https://docs.coronasafe.network/abdm-documentation/): This is more simplified documentation of the ABDM documentation, which is more beginner-friendly compared to the official docs.