# CEP for offline support project

This document lists the standard workflows that will be supported offline and how we can achive this.it aslo contain theoritical info about alternative to achive offline functionality. 
Each workflow has an associated markdown table that defines the structure, HTTP method, and other important information about the API endpoints involved.

In the tables, backend API endpoints are clearly distinguished based on whether they will be **cached** or **stored and later synced via IndexedDB (for write operations).**

## These tables give us idea about which dynamic data need to be cached for offlien support and help to avoid store unnecessary data.

## Standard Workflows

- [1. Patient Registration and Search Patient Workflow](#1-patient-registration-and-search-patient-workflow)
- [2. Encounter Management and Questionnaire Filling](#2-encounter-management-and-questionnaire-filling)
- [3. Patient Profile management](#3-patient-profile-management)
- [4. Appointments Management](#4-appointments-management)

---

## 1. Patient Registration and Search Patient Workflow

Patient registration and search patient workflow include add new patient and search patient by its mobile number.After click on one of the search patient ,user go to page from where they can create encounter,schedule appointments,see encounters list of that patient.This table mainly include endpoints regarding add patient and search patient only . create encounter,list encounter come under the encounter management and schedule appointment come under the appointment management.

pattern of Read only Api that going to be cached :

1.  URL starts with `/api/v1/getcurrentuser`
2.  URL starts with `/api/v1/organization`
3.  URL matches `/api/v1/facility/:facilityId/`

Note: (3,4) are the post type read only api so we need to store them into indexed when user hit them during online. and (8) is the write operation api.

|  #  | API Endpoint                                                       | Method | Purpose                                                  | Offline Handling                                                                                           | Notes                                                         |
| :-: | :----------------------------------------------------------------- | :----: | :------------------------------------------------------- | :--------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------ |
|  1  | `/api/v1/users/getcurrentuser/`                                    |  GET   | Fetch current logged-in user info (global)               | Cache (SW)                                                                                                 | Used in every workflow. precaching will be best for this      |
|  2  | `/api/v1/facility/{facility_id}/`                                  |  GET   | Fetch details for a selected facility                    | Cache (SW)                                                                                                 | Cache per facility. workbox on-demand caching will be used    |
|  3  | `/api/v1/patient/search/`                                          |  POST  | Search patients by phone number                          | cache in IndexedDB whenever user's hit it .so that data coming from this can load on the ui during offline | Keyed by phone; store results + timestamp                     |
|  4  | `/api/v1/patient/search_retrieve/`                                 |  POST  | Retrieve full patient record after selecting from search | cache in IndexedDB during online so that data coming from this can load on the ui during offline           | Keyed by patient.id;                                          |
|  5  | `/api/v1/encounter/?patient={patient_id}&live=false`               |  GET   | List all encounters for a specific patient               | Cache (SW)                                                                                                 | workbox on-demand caching will be used                        |
|  6  | `/api/v1/organization/?org_type=govt&parent=&limit=200`            |  GET   | Fetch top-level government organization list             | Cache (SW)                                                                                                 | workbox on-demand caching will be used                        |
|  7  | `/api/v1/organization/?org_type=govt&parent={parent_id}&limit=200` |  GET   | Fetch child organizations under a given parent (dynamic) | Cache (SW)                                                                                                 | Same pattern as #6; cache per parent query.                   |
|  8  | `/api/v1/patient/`                                                 |  POST  | Create a new patient record                              | store in IndexedDB and will sync on reconnect to internet                                                  | Store new record with `dirty=true`; sync and clear flag later |

## 2. Encounter Management and Questionnaire Filling

This workflow include list down encounters on the encounter page , create/update encounter. It include filling questionnair available on encounter page . user can see allregies,symptoms,diagnones and medication statements.

pattern of Read only Api that going to be cached:

1.  URL starts with `/api/v1/encounter`
2.  URL matches `/api/v1/facility/:facilityId/organizations`
3.  URL starts with `/api/v1/valueset`
4.  URL starts with `/api/v1/questionnaire`
5.  URL matches `/api/v1/patient/:patientId/symptom/`
6.  URL matches `/api/v1/patient/:patientId/diagnosis/`
7.  URL matches `/api/v1/patient/:patientId/allergy_intolerance/`
8.  URL matches `/api/v1/patient/:patientId/medication-statement/`
9.  URL matches `/api/v1/patient/:patientId/questionnaire_response/`
10. URL starts with `/api/v1/role/`

| Step | User Action                                        | Method | Endpoint                                                                         | Offline Handling               | Notes                                                                                   |
| :--: | :------------------------------------------------- | :----- | :------------------------------------------------------------------------------- | :----------------------------- | :-------------------------------------------------------------------------------------- |
|  1   | List recent encounters for a facility              | GET    | `/api/v1/encounter?facility={facilityId}&...`                                    | Cache (Service Worker)         | Main encounter list                                                                     |
|  2   | Create a new encounter                             | POST   | `/api/v1/encounter/`                                                             | Store & Sync (IndexedDB)       | Adds a new encounter                                                                    |
|  3   | Fetch specific encounter detail                    | GET    | `/api/v1/encounter/{encounterId}/?facility={facilityId}`                         | Cache (Service Worker)         | View full encounter                                                                     |
|  5   | Load facility organizations by parent              | GET    | `/api/v1/facility/{facilityId}/organizations?parent={orgParentId}&...`           | Cache (Service Worker)         | Child organizations dropdown                                                            |
|  6   | Load root facility organizations                   | GET    | `/api/v1/facility/{facilityId}/organizations?parent=&...`                        | Cache (Service Worker)         | Root organizations list                                                                 |
|  7   | Load patient allergy history                       | GET    | `/api/v1/patient/{patientId}/allergy_intolerance?&...`                           | Cache (Service Worker)         | Allergy records                                                                         |
|  8   | Load current-encounter symptoms                    | GET    | `/api/v1/patient/{patientId}/symptom?encounter={encounterId}&...`                | Cache (Service Worker)         | Symptoms tied to this encounter                                                         |
|  9   | Load full symptom history                          | GET    | `/api/v1/patient/{patientId}/symptom?limit=100&...`                              | Cache (Service Worker)         | “History” view                                                                          |
|  10  | Load current-encounter diagnoses                   | GET    | `/api/v1/patient/{patientId}/diagnosis?encounter={encounterId}&...`              | Cache (Service Worker)         | Diagnosis for this encounter                                                            |
|  11  | Load full diagnosis history                        | GET    | `/api/v1/patient/{patientId}/diagnosis?limit=100&...`                            | Cache (Service Worker)         | “History” view                                                                          |
|  12  | List questionnaire responses for this encounter    | GET    | `/api/v1/patient/{patientId}/questionnaire_response?encounter={encounterId}&...` | Cache (Service Worker)         | Already-filled forms                                                                    |
|  13  | Fetch encounter-specific questionnaires            | GET    | `/api/v1/questionnaire?tag_slug=encounter_actions&...`                           | Cache (Service Worker)         | Which forms can be added                                                                |
|  14  | Fetch all active questionnaires                    | GET    | `/api/v1/questionnaire?status=active&...`                                        | Cache (Service Worker)         | General form listings                                                                   |
|  15  | Fetch questionnaires with subject type 'encounter' | GET    | `/api/v1/questionnaire?subject_type=encounter&status=active&...`                 | Cache (Service Worker)         | Encounter-scoped forms                                                                  |
|  16  | Load a questionnaire definition                    | GET    | `/api/v1/questionnaire/{questionnaireSlug}/`                                     | Cache (Service Worker)         | Full form schema                                                                        |
|  17  | Load valueset favourites                           | GET    | `/api/v1/valueset/{slug}/favourites/`                                            | Cache (Service Worker)         | Speeds up include/exclude lookups                                                       |
|  18  | Load valueset recent views                         | GET    | `/api/v1/valueset/{slug}/recent_views/`                                          | Cache (Service Worker)         | Speeds up include/exclude lookups                                                       |
|  19  | Expand valueset to retrieve items                  | POST   | `/api/v1/valueset/{slug}/expand/`                                                | Cache results (Service Worker) | Lookup codes for pick-lists                                                             |
|  20  | Batch create/update encounter-related data         | POST   | `/api/v1/batch_requests/`                                                        | Store & Sync (IndexedDB)       | Batch create or update of symptoms, diagnoses, allergies, questionnaire responses, etc. |

## 3. Patient Profile Management

This workflow include access patient profile and including appointments, encounters, health data, resources, users.

pattern of Read only Api that going to be cached:

1.  URL starts with `/api/v1/users/`
2.  URL matches `/api/v1/patient/:patientId/`
3.  URL matches `/api/v1/patient/:patientId/get_users/`
4.  URL matches `/api/v1/patient/:externalId/get_appointments/`
5.  URL starts with `/api/v1/patient`
6.  URL starts with `/api/v1/resource`
7.  URL starts with `/api/v1/getallfacilities`

| Step | User Action                          | Method | Endpoint                                                                      | Offline Handling         | Notes                                   |
| :--: | :----------------------------------- | :----- | :---------------------------------------------------------------------------- | :----------------------- | :-------------------------------------- |
|  1   | View patient detail                  | GET    | `/api/v1/patient/{patientId}/`                                                | Cache (Service Worker)   | Load full patient record                |
|  2   | List patients in context             | GET    | `/api/v1/patient?limit...`                                                    | Cache (Service Worker)   | Patient cards on Patient tab            |
|  3   | View organization detail             | GET    | `/api/v1/organization/{organizationId}/`                                      | Cache (Service Worker)   | Parent organization                     |
|  4   | List child organizations             | GET    | `/api/v1/organization?parent={organizationId}&...`                            | Cache (Service Worker)   | Fetch children from parent organization |
|  7   | Search patient by phone              | POST   | `/api/v1/patient/search/`                                                     | Store in IndexedDB       | Indexed by phone number                 |
|  8   | Update patient details               | PUT    | `/api/v1/patient/{patientId}/`                                                | Store & Sync (IndexedDB) | Save edited profile                     |
|  9   | List patient appointments            | GET    | `/api/v1/appointments?patient={patientId}&...`                                | Cache (Service Worker)   | Appointments tab                        |
|  10  | List recent encounters for patient   | GET    | `/api/v1/encounter?patient={patientId}&...`                                   | Cache (Service Worker)   | Encounter tab                           |
|  11  | List health profile: medications     | GET    | `/api/v1/patient/{patientId}/medication/statement?limit...`                   | Cache (Service Worker)   | Medications history                     |
|  12  | List health profile: allergies       | GET    | `/api/v1/patient/{patientId}/allergy_intolerance?limit...`                    | Cache (Service Worker)   | Allergy history                         |
|  13  | List health profile: symptoms        | GET    | `/api/v1/patient/{patientId}/symptom?limit...`                                | Cache (Service Worker)   | Symptom history                         |
|  14  | List health profile: diagnoses       | GET    | `/api/v1/patient/{patientId}/diagnosis?category...&limit...`                  | Cache (Service Worker)   | Diagnosis history                       |
|  15  | List patient questionnaire responses | GET    | `/api/v1/patient/{patientId}/questionnaire_response?subject_type=patient&...` | Cache (Service Worker)   | Patient forms                           |
|  16  | List resources related to patient    | GET    | `/api/v1/resource?related_patient={patientId}&...`                            | Cache (Service Worker)   | Request tab                             |
|  17  | List all facilities                  | GET    | `/api/v1/getallfacilities?limit...`                                           | Cache (Service Worker)   | Facility lookup                         |
|  18  | Create resource                      | POST   | `/api/v1/resource/`                                                           | Store & Sync (IndexedDB) | Add new resource                        |
|  19  | Get users list                       | GET    | `/api/v1/users?limit...&search_text...`                                       | Cache (Service Worker)   | For user assignment                     |
|  20  | List resources                       | GET    | `/api/v1/resource?status=pending&...`                                         | Cache (Service Worker)   | Filtered resource list                  |
|  21  | Fetch specific resource detail       | GET    | `/api/v1/resource/{resourceid}/`                                              | Cache (Service Worker)   | Resource detail view                    |
|  22  | List assignable users                | GET    | `/api/v1/patient/{patientId}/get_users/`                                      | Cache (Service Worker)   | Add user to patient                     |
|  23  | List roles                           | GET    | `/api/v1/role/`                                                               | Cache (Service Worker)   | For user assignment                     |
|  24  | Assign user to patient               | POST   | `/api/v1/patient/{patientId}/add_user/`                                       | Store & Sync (IndexedDB) | Add user to patient                     |

## 4. Appointments Management

It include View, create, and manage appointments for a facility.

1. url start with (`api/v1/facility/{fac:id}/appointments`)
2. url start with (`api/v1/facility/{fac:id}/slots`)

| Step | User Action                                          | Method | Endpoint                                                                    | Offline Handling         | Notes                                                                                                                              |
| :--: | :--------------------------------------------------- | :----- | :-------------------------------------------------------------------------- | :----------------------- | :--------------------------------------------------------------------------------------------------------------------------------- |
|  1   | Fetch details for a selected facility                | GET    | `/api/v1/facility/{facilityId}/`                                            | Cache (Service Worker)   | Cache per facility. workbox on-demand caching will be                                                                              |
|  2   | List “in consultation” appointments                  | GET    | `/api/v1/facility/{facilityId}/appointments?status=in_consultation&...`     | Cache (Service Worker)   | data coming from these api will be cached on req from server by sw(workbox) during online and then this data will available ofline |
|  3   | List “fulfilled” appointments                        | GET    | `/api/v1/facility/{facilityId}/appointments?status=fulfilled&...`           | Cache (Service Worker)   | same as 2                                                                                                                          |
|  4   | List “no-show” appointments                          | GET    | `/api/v1/facility/{facilityId}/appointments?status=noshow&...`              | Cache (Service Worker)   | same as 2                                                                                                                          |
|  5   | List “booked” (upcoming) appointments                | GET    | `/api/v1/facility/{facilityId}/appointments?status=booked&...`              | Cache (Service Worker)   | same as 2                                                                                                                          |
|  6   | List “checked in” appointments                       | GET    | `/api/v1/facility/{facilityId}/appointments?status=checked_in&...`          | Cache (Service Worker)   | same as 2                                                                                                                          |
|  7   | Fetch available users(practitioner) for appointments | GET    | `/api/v1/facility/{facilityId}/appointments/available_users/`               | Cache (Service Worker)   | sw(workbox) will handle caching of dynamic data comig from this api                                                                |
|  8   | Get aggregated slot availability stats               | POST   | `/api/v1/facility/{facilityId}/slots/availability_stats/`                   | Store & Sync (IndexedDB) | Keyed by `{from_date,to_date,user}`; for charts                                                                                    |
|  9   | Get detailed slots for a specific day                | POST   | `/api/v1/facility/{facilityId}/slots/get_slots_for_day/`                    | Store & Sync (IndexedDB) | Keyed by `{day,user}`; for slot picker                                                                                             |
|  10  | Create a new appointment on a slot                   | POST   | `/api/v1/facility/{facilityId}/slots/{slotId}/create_appointment/`          | Store & Sync (IndexedDB) | Stored locally and sync later                                                                                                      |
|  11  | Fetch details of a specific appointment              | GET    | `/api/v1/facility/{facilityId}/appointments/{appointmentId}/`               | Cache (Service Worker)   | Keyed by `appointmentId`; for detail view                                                                                          |
|  12  | Reschedule an existing appointment                   | POST   | `/api/v1/facility/{facilityId}/appointments/{appointmentId}/reschedule/`    | Store & Sync (IndexedDB) | Queue reschedule request locally and will sync later                                                                               |
|  13  | Update appointment details (status, notes, etc.)     | PUT    | `/api/v1/facility/{facilityId}/appointments/{appointmentId}/`               | Store & Sync (IndexedDB) | Queue update locally and will sync later                                                                                           |
|  14  | Cancel an appointment                                | POST   | `/api/v1/facility/{facilityId}/appointments/{appointmentId}/cancel/`        | Store & Sync (IndexedDB) | Queue cancel request locally and will sync later                                                                                   |
|  15  | Get list of appointments of a patient                | GET    | `/api/v1/facility/{facilityid}/appointments/?patient={patientid}&limit=100` | cache(SW)                | sw(workbox) will handle caching of dynamic data comig from this api                                                                |

## Key Assumptions and Design Considerations for Offline Mode :

Before implementing offline support, it’s essential to define how the application determines internet connectivity and how it behaves in various online/offline scenarios. This document outlines the design assumptions and expected behavior around connection status handling.


### Behavior on App Load and Connectivity Events


#### 1. Login Attempt During Poor Connectivity
 If user is explicity logout or session expired , we will removed all cached data also at that instant. it will increase security and also handle the case where one user cached data overiding other. so user cannot able to login and hence cannot acess website offline if user explicity logout or session expired.

---

#### 2. User Goes Offline During Active Session

- If already logged in and internet becomes unstable:
-  Enables offline features (e.g., cached reads, local writes).

---

### Role based caching , when multiple users access the app on the same device

- As Care have role based access control, we have to ensure that if multiple user access the app on same device then their data of one user does not override the other user data while caching. Its necessary because permissions are come from backend via api based on user. For example, the getCurrentUser API returns a list of permissions specific to the logged-in user. If this response is cached and a different user logs in, their permissions could overwrite the previous user's data. Later, if the first user tries to use the app offline, they might see incorrect permissions or data from the second user.

so to overcome this problem we have to cache data per user. we will discussed its solution in approache's section.

# Now Lets Discussed Approches to achive offline Support :

The approaches discussed here focus primarily on caching API responses. Our UI shell is already cached by default since CARE is a PWA. Below are some of the approaches we can use to achieve offline functionality for the workflows we’ve discussed.

---

### 1. Using TanStack Query Cache with Persistence

This approach plays around using TanStack Query to cache the API responses and sync write operations once the app comes back online. Persistence, in this context, here means to store the cached data into some local DB (e.g., IndexedDB). Since CARE already uses TanStack Query for fetch and write operations, integrating persistence and offline syncing becomes relatively straightforward. This approach leverages existing infrastructure, reducing the need for additional caching logic or custom data handling. Now let's discuss what configuration needs to be implemented for this approach.

#### 1. Persister:

It is the mechanism that defines how and where the data is saved/restored. TanStack provides some persisters like `createSyncStoragePersister` for mainly localStorage and `createAsyncStoragePersister` for AsyncStorage. It also provides a method to create a custom persister. We will create a custom persister for IndexedDB(via dexie.js) for our use case.

We just need to create a createDbPersister() function that returns our custom persister. Inside this function, we define a single cache key under which the entire React Query cache will be stored. The function should implement three methods — `persistClient()`, `restoreClient()`, and `removeClient()` — following the rules to create a custom persister for React Query.

When online, data fetched using useQuery is stored in the in-memory cache and also persisted to IndexedDB via this custom persister. When offline, the cached data stored in IndexedDB (using Dexie.js) is automatically hydrated back into the in-memory cache. TanStack Query then manages the cache seamlessly, providing offline support without extra effort.

#### 2. cacheTime(or gcTime) and maxage:

For persist to work properly, we have to pass `QueryClient` a `cacheTime`. `cacheTime` should be set as the same value or higher than `persistQueryClient`'s `maxAge` option.

- `cacheTime` defines how long inactive cached data stays in memory before being garbage collected. This means the data remains available for queries without refetching during this time, even if not actively used.
- `maxAge` (used in persistQueryClient) determines how long the persisted cache data remains valid and can be restored from storage.

#### 4. PersistQueryClientProvider:

`PersistQueryClientProvider` is a React wrapper around our normal `QueryClientProvider` that automatically restores persisted cache on mount and keeps it in sync through subscribe/unsubscribe. It prevents our queries from fetching until the cache is hydrated, ensuring a smooth offline‑first experience.

**lets discuss how to overcome the problem of cache mixing when multiple user use same device :** TanStack Query caches all API data fetched via useQuery. To avoid mixing cached data between different users,  we always cleared out cached data whenever user logout or session expired. it help to prevent data mixing as we are clearing previous user data. But here there is one point that to be come , which is after logout if we go offline and try to access website then it will not accessible offline as we already  cleared out cache data during logout and session expired. 

**Note:** To avoid unnecessary refetch attempts when offline, configure useQuery with enabled: navigator.online === true. This way, during online mode, staleTime can remain 0 to always fetch fresh data. When offline, the query is disabled (enabled: false), so cached data is used without triggering refetches that would fail.
This approach keeps the default online behavior unchanged while ensuring smooth offline caching without forced stale data refetches.

Main advantages of this approches is :

- It will cache data coming from api that was fetch using useQuery irrespective of operation we use(eg.GET,POST).But Approches like workbox does not provide such option's they will cache only get api responses not read only post responses.
- As Care is already using tanstack query it become easy to implement this approch in the CARE. we dont have to write


**Note** : write and sync logic will going to be same in other approch as well so we will discussed it later in the doc. The focus is on the caching of api responses using different-different approaches.

### 2. Using Workbased approach :

In the Workbox-based approach, Workbox caches API responses based on network requests. It stores the API data using the request URL as the key. During offline access, when the same URL is used to fetch data, Workbox returns the cached response. In this approach, we typically write our service worker code in a separate file, outside the React application code.
Now let's discuss what configuration needs to be implemented for this approach.

#### 1. Caching Strategy

Workbox offers multiple caching strategies depending on the freshness and criticality of the API data. The most relevant ones are:

- **StaleWhileRevalidate**: Returns cached data immediately, then fetches new data in the background. Useful for fast loads with eventual consistency.
- **NetworkFirst**: Tries to fetch fresh data first, falls back to cache if offline. Ideal for dynamic or frequently updated data.
- **CacheFirst**: Serves cached data if available, fetches from the network only if not cached. Best for static or rarely changing data.

#### 2. Custom Service Worker

A custom service worker file must be created to define how caching works. In this file, we register routes and attach caching strategies to them using Workbox’s utilities like `registerRoute`, `StaleWhileRevalidate`, or `NetworkFirst`. For API caching:

- we typically match all API requests to a specific domain or pattern (e.g., https://api.care.org/).
- Responses are cached using a named cache (api-cache) and configured with expiration rules.
- Plugins like `ExpirationPlugin` and `CacheableResponsePlugin` help manage cache size and validity based on status codes and TTLs.

#### 3.Cache Invalidation and Expiration

To prevent the cache from growing indefinitely or serving outdated data, Workbox provides:

- `ExpirationPlugin`: Limits the number of cached entries and the maximum time they remain valid.
- `CacheableResponsePlugin`: Filters which responses should be cached (e.g., only HTTP 200 responses).
- These plugins are essential for maintaining a healthy cache lifecycle, especially for API data that may become stale over time.

**Avoiding Cache Mixing Between Multiple Users**: Since Workbox caches data based on request URLs (not request bodies or headers), it's important to prevent data leakage between users. We can override Workbox's default behavior using a plugin like cacheKeyWillBeUsed. For example, we can fetch the userId from the authentication token and prepend it to the API URL during caching. This way, the modified URL becomes user-specific, allowing Workbox to distinguish and store data separately for each user. As a result, cache data is isolated per user, effectively preventing mixing or accidental data exposure.

So far we have discussed about different approaches for caching. Now come to write and sync part. it will be going to same for approches.

### write and sync operation logic :

To enable offline support for write operations, we implement a system that temporarily stores unsent writes in the browser using Dexie.js (IndexedDB) and later syncs them to the server once the device regains connectivity. This approach ensures that user actions like form submissions are never lost and are reliably retried when online.

#### Dexie Table for Offline Writes

We create a Dexie-backed IndexedDB table called offlineWrites, which acts as a local queue for pending write operations. Each entry includes important metadata such as:

- `userId`: Identifies the user to isolate caches and avoid data mixing.
- `syncrouteKey`: A key corresponding to the mutation route or function (e.g., "updatePatient"). It is used to dynamically identify and invoke the exact mutation function during sync.
- `payload`: The form data or mutation body that needs to be submitted.
- `pathParams`: Route parameters (like IDs) required to correctly construct the mutation request path or API call.
- `queryrouteKey` and `queryParams`: These identify the read query associated with the mutated resource. They help fetch the latest server data and update the local cache accordingly.
- `serverTimestamp`: The last known modification timestamp from the server at the time of the offline write. This is crucial for detecting conflicts before syncing.
- Additional fields: `syncStatus`, `retries`, `lastError`, etc., to manage syncing states and error handling.

#### Conditional Mutation Handling Based on Connectivity

- When offline, submitting a form triggers saving the mutation data to the Dexie table instead of performing the actual network mutation.
- When online, the mutation function is invoked directly using TanStack Query’s `useMutation` hook.

**Using syncrouteKey and pathParams to Replay Mutations**

During sync, the system uses the stored syncrouteKey to identify the exact mutation function to call. The pathParams are used to reconstruct the mutation endpoint or parameters, ensuring the request matches what would have been sent originally.

**For example:** If syncrouteKey is "updatePatient", the sync logic calls the corresponding mutation function in CARE’s existing codebase, passing payload and pathParams. This dynamic approach leverages the existing mutation infrastructure without requiring code duplication or special-case logic.

**Using queryrouteKey and queryParams for Cache Updates and Conflict Detection**: The stored queryrouteKey and queryParams point to the query that fetches the latest resource state.
This allows the sync process to:

- Retrieve the current server state and timestamp.
- Compare it with the stored serverTimestamp to detect any conflicts (e.g., data updated elsewhere).
- Update the local TanStack Query cache after a successful sync by invalidating or refetching this query.

This reuse of existing query keys ensures consistent cache updates and helps maintain cache integrity without manual cache manipulation.




