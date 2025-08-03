# Care Enhancement Proposal (CEP): Offline Support Implementation

## Overview

This proposal details the implementation of offline capabilities in CARE using **TanStack Query with IndexedDB persistence**. The solution enables healthcare workers to perform critical operations during internet outages with automatic synchronization when connectivity is restored.

We evaluated multiple methods to achieve this functionality. Information about these alternative approaches is documented in:  
[Additional Approaches Audit](AdditionalInfo.md)

The current proposal focuses specifically on our selected production-ready solution. Comprehensive implementation details for the chosen approach will be maintained in this document.

The implementation will focus on supporting specific critical workflows that require offline functionality. All workflows designated for offline support are documented in: [Additional Info Audit](AdditionalInfo.md)

## Implementation Phases

1. **[Phase 1: Caching ](#phase-1-caching)**
2. **[Phase 2: Offline Writes](#phase-2-offline-writes)**
3. **[Phase 3: Synchronization](#phase-3-synchronization)**
4. **[Phase 4: Notifications](#phase-4-notifications)**

### Phase 1: Caching

#### What Are We Caching?

- **API Responses:** We cache the results of API calls for workflows that require offline support (such as patient data, forms, and other critical resources). Only endpoints explicitly marked for offline use (`meta.persist: true`) are cached.
- **Selective Data:** Not all API responses are cached—only those relevant to offline workflows, as determined by the application's business logic and user needs.
- **Granularity:** Data is cached per `queryKey`, ensuring that only the specific data a user has accessed is available offline. For example, if a user views Patient A's record, only that record is cached for offline use.

#### Why Do We Need Caching?

- **Offline Access:** Caching enables users to access previously viewed data even when there is no internet connection, ensuring continuity of care and workflow.
- **Performance:** By serving data from the local cache, the application reduces redundant network requests and improves data retrieval speed.
- **User Experience:** Users can continue to view and interact with critical information during connectivity interruptions, minimizing workflow disruptions.
- **Reliability:** Caching prevents data loss and enables seamless transitions between online and offline states, which is crucial for healthcare environments where connectivity may be unreliable.

**Note**: Configuration details needed for caching using tanstack query are 
available in [Additional Approaches Audit](AdditionalInfo.md). This section focuses on their 
technical implementation.

#### How Are We Caching?

- **Technology Stack:**
  - **TanStack Query (React Query):** Used for data fetching, caching, and state management.
  - **IndexedDB (via Dexie.js):** Provides persistent local storage for cached data, allowing it to survive page reloads and browser restarts.
- **Custom Persister:**
  - A custom persister is implemented using Dexie.js to store and retrieve TanStack Query's cache from IndexedDB.
  - The persister implements three core methods: `persistClient` (save cache), `restoreClient` (load cache), and `removeClient` (clear cache on logout).
- **Configuration:**
  - Only queries with `meta.persist: true` are persisted to IndexedDB, ensuring that only essential data is stored.
  - Cached data is stored with a configurable expiration (`maxAge`), and in-memory cache is managed with `gcTime`.
  - The application is wrapped in `PersistQueryClientProvider` to enable persistence and manage cache lifecycle.
- **Cache Invalidation:**
  - Cached data is cleared on logout or session expiration to prevent data leakage between users and ensure privacy.

#### How Does Caching Help in Offline Support?

- **Data Availability:** Users can access cached data for supported workflows even when offline, allowing them to continue working without interruption.
- **Seamless Experience:** When the app detects offline status, it serves data from the cache instead of making network requests, providing a smooth user experience.
- **Automatic Updates:** When connectivity is restored, fresh data is fetched from the server and the cache is updated automatically.
- **Security:** Cache is user-isolated and cleared on logout, ensuring that data from one user is not accessible to another.

#### Practical Example

Suppose a healthcare worker accesses a patient's record while online. The data is fetched from the server and cached locally. If the worker later loses connectivity, they can still view the cached patient record. When connectivity returns, the app fetches the latest data and updates the cache.

#### Additional Details and Limitations

- **Only Accessed Data is Cached:** Data must be accessed at least once while online to be available offline. New or unvisited records will not be available until accessed online.
- **Selective Caching:** Mark only essential queries with `meta.persist: true` to avoid excessive storage usage and ensure optimal performance.
- **Network Detection Caveats:** TanStack Query’s network detection may sometimes give false positives (e.g., connected to Wi-Fi without internet). This can affect when cached data is served versus when a network request is attempted.
- **Session Isolation:** Cache is cleared on logout to prevent data mixing between users, which is especially important on shared devices.

#### Technical Implementation Summary

- **Dexie.js Schema:**
  - A table named `queryCache` is used to store cached query data, keyed by a unique cache key and timestamped for expiration management.
- **PersistQueryClientProvider:**
  - The app is wrapped in this provider, which manages the persistence and hydration of the query cache.
- **Query Configuration:**
  - Queries that should be cached for offline use are configured with `meta: { persist: true }` and `networkMode: "online"`.
  - Example:

```typescript
const { data: user, isLoading } = useQuery({
  queryKey: ["currentUser", accessToken],
  queryFn: query(routes.currentUser, { silent: true }),
  networkMode: "online",
  retry: false,
  enabled: !!localStorage.getItem(LocalStorageKeys.accessToken),
  meta: { persist: true },
});
```

- **Cache Lifecycle:**
  - Data is cached when fetched online, served from cache when offline, and updated when connectivity is restored.
  - Cache is cleared on logout or session expiration.

This caching strategy forms the foundation for robust offline support, ensuring that users have access to critical data regardless of network conditions, while maintaining security, performance, and data integrity.

### Phase 2: Offline Writes

This phase implements saving form data to IndexedDB (via Dexie.js) when offline, for later synchronization when connectivity returns.

**Implementation Flow**:

1. On form submission, check network status
2. If offline:
   - Save form data to IndexedDB
   - **Normalize the form payload to match the API response structure**
   - **Update the cache using setQueryData to reflect the new/updated record**
   - **Update all relevant cached API responses that relate to this form (e.g., detail and list endpoints)**
   - Queue for later synchronization
3. If online:
   - Process normally via `useMutation`

#### Normalizing and Caching Offline Writes

After saving a record offline, it is important to ensure the local cache reflects the new or updated data, so the user experience remains consistent and the UI shows the latest state—even while offline. This is achieved by:

- **Normalizing the Payload:** The form data is transformed to match the structure of the API response (as if it had come from the backend). This ensures consistency between online and offline data representations.
- **Updating the Cache:**
  - Use TanStack Query's `setQueryData` to update the cache for the relevant query key(s) with the normalized data.
  - Update not only the detail endpoint (e.g., the specific record) but also any related list endpoints (e.g., the list of all encounters) to ensure the new or updated record appears in all relevant places in the UI.

**Example: Creating an Encounter Offline**

Suppose a user creates a new encounter while offline:

1. The form payload is saved to IndexedDB as an offline write.
2. The payload is normalized to match the encounter API response structure (e.g., adding default fields, IDs, or computed values as needed).
3. The cache is updated:
   - `setQueryData(["encounter", newEncounterId], normalizedEncounter)` updates the cache for the encounter detail endpoint.
   - `setQueryData(["encounter-list", patientId], prevList => [...prevList, normalizedEncounter])` updates the cache for the encounter list endpoint, ensuring the new encounter appears in the list view.

This approach ensures that after creating an encounter offline, the user immediately sees the new encounter in both the detail and list views, providing a seamless and consistent experience.

#### Additional Details on Offline Write Handling

- **Form Validation:** All forms are validated client-side before saving to IndexedDB. Users are notified immediately if any required fields are missing or invalid, ensuring only valid data is stored for later sync.
- **Temporary IDs:** When creating new records offline (such as a new encounter or patient), temporary UUIDs are generated. These IDs are used to maintain relationships between records (e.g., linking a new encounter to a new patient) until real IDs are assigned after successful sync with the backend.
- **Payload Normalization:** The form data is normalized to match the API response structure. This ensures that the UI can display the new or updated record as if it had come from the backend, maintaining consistency between online and offline states.
- **Immediate Cache Update:** After saving the offline write, the cache is updated using TanStack Query's `setQueryData` for both detail and list endpoints. This allows the UI to reflect the new or updated record instantly, even before it is synced to the backend.
- **Atomicity and Consistency:** The offline write and cache update are performed together to prevent UI inconsistencies. If the cache update fails, the system can roll back the IndexedDB write or notify the user of the issue.
- **Metadata Storage:** Each offline write includes metadata such as timestamp, operation type (create/update), and the target route. This metadata is useful for later synchronization, debugging, and providing UI indicators (such as "pending" badges).
- **Developer Extensibility:** Developers can hook into the offline write process to trigger custom logic, such as analytics, local notifications, or additional cache updates, making the system flexible and extensible.
- **Example UI Feedback:**
  - "Your data has been saved locally and will be synced when you’re back online."
  - "This record is pending sync."

#### 1. Dexie.js Table Schema

so first see the table schema and then we will discusse about each entrie of the table schema. we will use same indexdDB database instant we use for caching. W just create another Table in it for offline writes.

```ts
offlineWrites!: Dexie.Table<
    {
      id: string;
      userId: string;
      syncrouteKey: string;
      type?:string;
      resourceType?: string;
      pathParams?: Record<string, any>;
      payload: unknown;
      response?: unknown;
      parentMutationIds?: string[]; 
      clientTimestamp: number;
      serverTimestamp?: string;
      lastAttemptAt?: number;
      syncStatus: "pending" | "success" | "failed" | "conflict";
      lastError?: string;
      retries?: number;
      conflictData?: unknown;
      queryrouteKey?: string;
      queryParams?: Record<string, any>;
    },
    string
  >;
 constructor() {
   this.version(2).stores({
      queryCache: "cacheKey, timestamp",
      offlineWrites: "id, userId,  timestamp",
    });
 }
```

Below is a concise description of each field in the offlineWrites Dexie table :-

1. **`id: string`** :- Unique identifier for this offline‑write record (usually a UUID).
2. **`userId: string`** :- The ID of the current user (e.g. `user.external_id`) who initiated this write. Help to prevent syncing data of one user by another user if there is same device.
3. **`syncrouteKey: string`** :- Key/name of the mutation route to replay when syncing (e.g. `"updatePatient"`), allowing reuse of existing mutation functions.
4. **`resourceType?: string`** :- Human‑readable tag for the type of resource being written (e.g. `"patient"`, `"form"`), useful for grouping or logging.
5. **`pathParams?: Record<string, any>`** :- Route parameters (e.g. `{ id: patientId }`) required by the `syncrouteKey` mutation, so the same API function signature can be called offline.
6. **`payload: unknown`** :- The actual data object (e.g. updated form fields) that will be sent to the server when back online.
7. **`clientTimestamp: number`** :- Timestamp (e.g. `Date.now()`) when the user saved this record offline—used to order writes or detect staleness.
8. **`serverTimestamp?: string`** :- Optional server‑provided timestamp of the last known server version (e.g. `patientQuery.data.modified_date`) for conflict detection at frontend level.
9. **`lastAttemptAt?: number`** :- Timestamp of the last time you tried syncing this record—used to implement retry/backoff logic.
10. **`syncStatus: "pending" | "success" | "failed" | "conflict"`** :- Current sync state:
    - `"pending"` = not yet retried
    - `"success"` = synced successfully
    - `"failed"` = last sync attempt errored
    - `"conflict"` = server data has diverged from local payload
11. **`lastError?: string`** :- Error message (e.g. HTTP status or validation error) from the most recent sync attempt, for debugging or user notification.
12. **`retries?: number`** :- Number of times this record has been retried so far—used to limit retry attempts or escalate conflicts.
13. **`conflictData?: unknown`** :- If a conflict is detected (e.g. server has newer data), this holds the server’s latest version so you can show a merge UI.
14. **`queryrouteKey?: string`** :- Key/name of the “fetch” route (e.g. `"getPatient"`) that can be called before syncing, in order to retrieve the current server state for conflict checks.
15. **`queryParams?: Record<string, any>`** :- Route parameters (e.g. `{ id: patientId }`) required by `queryrouteKey` to fetch the current form/patient data before submitting the offline write.
16. **`parentMutationIds`** :- array of parent mutations id It help us during syncing of parent-child  dependent mutations.
17. **`response`** :- store response after successful sync.
18. **`type`** :-  store the the type of mutation like 'createpatient,'updatepatient'


#### 2. **SaveofflineWrites** function

We have a generalized `saveOfflineWrites` function that should be called when submitting form data while offline. We will pass all necessary information to it so that it can save the data locally in IndexedDB.

```ts
export const saveOfflineWrite = async ({
  userId,
  syncrouteKey,
  payload,
  pathParams,
  type,
  resourceType,
  serverTimestamp,
  queryParams,
  queryrouteKey,
  parentMutationIds 
  dependentFields,
}: SaveOfflineWriteParams) => {
  const writeEntry = {
    id,
    userId,
    syncrouteKey,
    payload,
    pathParams,
    type,
    resourceType,
    clientTimestamp: Date.now(),
    serverTimestamp,
    syncStatus: "pending" as const,
    retries: 0,
    queryParams,
    queryrouteKey,
    parentMutationIds,
    dependentFields,
  };

  try {
    await db.offlineWrites.add(writeEntry);
    console.log("Offline write saved successfully:", writeEntry);
  } catch (error) {
    console.error(" Failed to save offline write:", error);
  }
};
```

> Note : Here again a critical point that is using navigator.online or tanstack network provider for checking network status, both can sometime giving wrong network status value in some cases.

### Phase 3: Synchronization

## Core Components

### 1. SyncManager Class

The main orchestrator for offline synchronization.

**Location:** `src/OfflineSupport/syncmanger.ts`

**Purpose:** Coordinates the entire sync process, manages dependencies, handles errors, and ensures data consistency across offline and online states.

**Key Features:**
- Dependency-aware sync processing
- ID mapping persistence
- Error classification and retry logic
- Progress tracking and abort control
- Conflict detection

**Usage:**
```typescript
const syncManager = new SyncManager({
  userId: "user-id",
  maxRetries: 3,
  retryDelayMs: 1000,
  enableConflictDetection: true,
  onProgress: (synced, total) => console.log(`${synced}/${total}`),
  onSyncStart: (total) => console.log(`Starting sync of ${total} items`),
  onSyncComplete: () => console.log("Sync completed"),
});

const result = await syncManager.sync();
```

### 2. IdMap Class

Manages offline-to-server ID mappings across sync sessions.

**Location:** `src/OfflineSupport/idMap.ts`

**Purpose:** Maintains a mapping between offline-generated IDs and server-generated IDs, ensuring that dependent writes can reference the correct server IDs even across multiple sync sessions.

**Features:**
- Pre-population from successful sync records
- In-memory caching with IndexedDB persistence
- Automatic mapping updates

**Usage:**
```typescript
const idMap = new IdMap();

// Pre-populate with existing mappings
idMap.prePopulateFromSuccessfulSyncs(successfulWrites);

// Add new mapping
idMap.addMapping("offline-123", "server-456");

// Get server ID
const serverId = idMap.getServerId("offline-123");
```

### 3. Write Queue Management

Handles the lifecycle of offline writes.

**Location:** `src/OfflineSupport/writeQueue.ts`

**Purpose:** Manages the state and lifecycle of offline writes, including retry logic, status updates, and dependency management between parent and child writes.

**Key Functions:**
- `getPendingAndRetryableWrites()` - Retrieves writes ready for sync
- `markWriteStatus()` - Updates write status and metadata
- `unblockDependentWrites()` - Unblocks writes when parent succeeds

**Write States:**
- `pending` - Ready for sync
- `success` - Successfully synced
- `failed` - Failed to sync (may be retried)
- `blocked` - Blocked by failed parent
- `conflict` - Has conflicts

## Sync Process Flow

### 1. Initialization
**Purpose:** Ensures sync can only run when appropriate conditions are met and prevents multiple concurrent sync sessions.

```typescript
// Check if sync is already running
if (this.isRunning) {
  throw new Error("Sync is already running");
}

// Verify online status
if (!onlineManager.isOnline()) {
  throw new Error("Cannot sync while offline");
}
```

### 2. Write Collection
**Purpose:** Gathers all writes that need to be synced, including pending, failed (retryable), and blocked writes that have been unblocked.

```typescript
// Get all writes that need syncing
const pendingWrites = await getPendingAndRetryableWrites(userId);

// Includes:
// - pending writes
// - failed writes (retries < MAX_RETRIES)
// - blocked writes (unblocked when parent succeeds)
```

### 3. ID Mapping Pre-population
**Purpose:** Builds a complete mapping of offline-to-server IDs from all successful writes, ensuring that dependent writes can reference the correct server IDs even if they were created in different sync sessions.

```typescript
// Get all writes to build complete ID mapping
const allWrites = await db.OfflineWrites
  .where("userId")
  .equals(userId)
  .toArray();

const successfulWrites = allWrites.filter(
  write => write.syncStatus === "success"
);

// Pre-populate ID map with historical mappings
this.idMap.prePopulateFromSuccessfulSyncs(successfulWrites);
```

### 4. Dependency Resolution
**Purpose:** Ensures that writes are processed in the correct order based on their dependencies, preventing errors where child writes reference parent writes that haven't been synced yet.

```typescript
// Sort writes by dependencies (topological sort)
const sortedWrites = topologicalSort(pendingWrites);

// Ensures parent writes are processed before children
// Example: Patient → Encounter → Questionnaire
```

### 5. Write Processing
For each write in dependency order:

#### Step 1: Parent Check
**Purpose:** Verifies that all parent writes are not permanently failed, preventing child writes from attempting to sync when their dependencies cannot be satisfied.

```typescript
// Check if parent writes are blocked
if (write.parentMutationIds?.length > 0) {
  const blockedParents = await this.checkBlockedParents(
    write.parentMutationIds
  );
  if (blockedParents.length > 0) {
    return { status: "blocked" };
  }
}
```

#### Step 2: Conflict Detection
**Purpose:** Detects and handles conflicts between offline changes and server state, ensuring data consistency and preventing data corruption.

```typescript
// Optional conflict detection
if (this.options.enableConflictDetection && write.useQueryRouteKey) {
  const hasConflict = await detectAndMarkConflict(write);
  if (hasConflict) {
    return { status: "conflict" };
  }
}
```

#### Step 3: ID Replacement
**Purpose:** Replaces all offline-generated IDs in the write payload with their corresponding server IDs, ensuring the API receives valid server references.

```typescript
// Replace offline IDs with server IDs
const processedWrite = replaceOfflineIdsInWrite(
  write,
  dependencySchema,
  this.idMap
);
```

#### Step 4: API Execution
**Purpose:** Executes the actual API mutation using the processed write data, communicating with the server to persist the offline changes.

```typescript
// Execute the actual API mutation
const response = await this.executeMutation(processedWrite);
```

#### Step 5: Success Handling
**Purpose:** Updates the write status, stores the server response, creates ID mappings for future reference, and unblocks any dependent writes that were waiting for this write to succeed.

```typescript
// Update write status
await markWriteStatus(write.id, "success", {
  response,
  lastAttemptAt: Date.now(),
});

// Store ID mapping
if (response?.id && write.id.startsWith("offline-")) {
  this.idMap.addMapping(write.id, response.id);
}

// Unblock dependent writes
await unblockDependentWrites(write.id);
```

#### Step 6: Error Handling
**Purpose:** Classifies errors as permanent or temporary, updates write status with detailed error information, and blocks dependent writes if the failure is permanent to prevent cascading failures.

```typescript
// Classify error as permanent or temporary
const isPermanentFailure = this.isPermanentFailure(error);

// Update write status with error details
await markWriteStatus(write.id, "failed", {
  lastError: errorMessage,
  lastErrorDetails: errorDetails,
  lastAttemptAt: Date.now(),
  retries: (write.retries || 0) + 1,
  isPermanentFailure,
});

// Block dependent writes if permanent failure
if (isPermanentFailure) {
  await this.markDependentWritesAsBlocked(write.id);
}
```

## Error Classification

The sync manager intelligently classifies errors:

### Permanent Failures (No Retry)
- **4xx Errors** (except 429): Validation errors, not found, etc.
- **Most 5xx Errors**: Server configuration issues

### Temporary Failures (Retry)
- **429 Rate Limit**: Too many requests
- **501, 502, 503**: Service unavailable, gateway errors
- **Network Errors**: Timeouts, connection issues

```typescript
private isPermanentFailure(error: any): boolean {
  if (error instanceof HTTPError) {
    const statusCode = error.status;
    
    // 4xx errors are permanent (except 429)
    if (statusCode >= 400 && statusCode < 500 && statusCode !== 429) {
      return true;
    }
    
    // 5xx errors: 501, 502, 503 are temporary
    if (statusCode >= 500) {
      return ![501, 502, 503].includes(statusCode);
    }
  }
  return false;
}
```

## Retry Strategy

### Retry Logic
- **Max Retries**: 5 attempts per write
- **Retry Condition**: `retries < MAX_RETRIES && !isPermanentFailure`
- **Retry Timing**: Immediate retry in next sync session

### Retry Flow
1. Write fails → Status: `failed`, `retries++`
2. Next sync → Include in `pendingWrites` if retries < 5
3. Retry attempt → Execute mutation again
4. Success → Status: `success`, unblock dependents
5. Failure → Repeat until max retries reached

## Dependency Management

### Dependency Schema
Defined in `src/OfflineSupport/dependencySchema.ts`:

**Purpose:** Defines the relationships between different types of writes, specifying which writes depend on others and how to resolve these dependencies during sync.

```typescript
export const dependencySchema: DependencySchema = {
  create_patient: [], // No dependencies
  create_encounter: [
    { location: "payload", path: ["patient"], resourceType: "patient" },
  ],
  create_appointment: [
    { location: "payload", path: ["patient"], resourceType: "patient" },
  ],
  // ... more dependencies
};
```

### Dependency Resolution
1. **Topological Sort**: Ensures correct processing order
2. **Parent Check**: Verifies parents are not blocked
3. **Blocking Logic**: Blocks children when parent fails permanently
4. **Unblocking Logic**: Unblocks children when parent succeeds

## Integration Points

### 1. React Context Integration
**Location:** `src/context/SyncContext.tsx`

**Purpose:** Provides sync state and controls to React components, enabling UI components to display sync progress and allow users to trigger manual syncs.

Provides sync state and controls to React components:

```typescript
const { isSyncing, syncedCount, totalCount, startSync, resetSync } = useSync();
```

### 2. AuthUserProvider Integration
**Location:** `src/Providers/AuthUserProvider.tsx`

**Purpose:** Automatically triggers sync when users come online and are authenticated, with smart conditions to prevent sync on login pages or when users are not properly authenticated.

Automatic sync triggers with smart conditions:

```typescript
useEffect(() => {
  const isOnSessionExpiredPage = location.pathname === "/session-expired";
  
  if (
    !onlineManager.isOnline() ||
    !user?.external_id ||
    isSyncing ||
    localStorage.getItem(LocalStorageKeys.accessToken) === null ||
    isOnSessionExpiredPage
  ) {
    return;
  }

  const timeout = setTimeout(() => {
    startSync(user.external_id);
  }, 3000);

  return () => clearTimeout(timeout);
}, [user?.external_id, onlineManager.isOnline(), startSync, isSyncing, location.pathname]);
```

### 3. UI Components
**Location:** `src/components/Common/SyncBanner.tsx`

**Purpose:** Displays real-time sync progress to users, providing visual feedback about the sync process and completion status.




### Phase 4: Notifications (Sync Status Page)

The Notifications phase is implemented as a **Sync Status Page**—a dedicated interface where users can monitor and manage the status of all their offline writes and sync operations.

#### Purpose
- Provide a clear, centralized view of all data that is pending sync, has failed to sync, has conflicts, or has been successfully synced.
- Empower users to take action on failed or conflicted records directly from the page.

#### What the Sync Status Page Shows
- **Conflicts Queue:** List of records where a conflict was detected during sync. Each entry shows details of the conflict and provides an action to resolve it (e.g., open a merge dialog or accept/reject changes).
- **Failed Queue:** List of records that failed to sync due to network/server errors. Each entry includes error details and a "Retry" button to attempt sync again.
- **Success Queue:** (Optional) List or count of records that have been successfully synced, for audit or reassurance.
- **Pending Queue:** (Optional) Records that are saved locally and waiting for the next sync attempt.

#### Example UI Elements
- **Tables or Lists:** Each queue is displayed as a table or list with columns for record type, timestamp, status, and actions.
- **Badges:** Status badges (e.g., "conflict", "failed", "pending", "success") for quick visual identification.
- **Action Buttons:**
  - **Retry:** Manually retry syncing a failed or conflicted record.
  - **Resolve:** Open a conflict resolution dialog for conflicted records.
  - **View Details:** Inspect the payload, error, or conflict data for any record.

#### User Actions
- Users can manually retry failed/conflicted syncs.
- Users can resolve conflicts through a dedicated UI.
- Users can view details of any record in the sync queues.

This Sync Status Page ensures transparency and gives users control over their offline data, making it easy to track, troubleshoot, and resolve sync issues as they arise.


## Limitations and Known Issues

Before discussing limitation and known Issue , let say go through how CARE work offline :

- User logged-in  and run website, Whenever user go throught he workflows for which offline functionality is added there API-data will caached and save locally
- now suppose user goes offline( during Active session), Now it will can access those pages and data that is present in cache or user previosly visit.
- now if user fill forms , it will be saved offline if navigator.online==false(means we are offline).
- Now when network status switch to online , syncing start and all our data will be sync to backend.
- user can see their conflict and faild data in notification part.

Now lets take a look om limitation and known issue now :

 - **Reliance on navigator.onLine** : Browsers often report “online” when a device is connected to a local network but actually has no Internet access (e.g. captive portals or firewalls). This can cause the sync manager to attempt writes even though the server is unreachable
 - **No Background Sync Outside Active Tab**: All synchronization occurs only while the app is open and the user is logged-in. If the user closes the tab or the device sleeps, pending writes remain unsynced until the app is re‐opened.
- **Conflict Resolution Assumes Timestamp Accuracy**: We rely on comparing serverData.modified_date to write.serverTimestamp. If the server’s clock drifts or the timestamp field is not updated reliably, conflicts may be missed or falsely detected.
- **No offline support after Log-out**: when a user logout , its cached data will be cleared and it cannot access website offline. But clearing cache during logout increase security and also prevent mixing of data of two or more user if their is same device.

> Note : For some simple cases we can handle dependency enforcement  of  data during online. Simply means for those child write that not depend heavily on parent record.

## Implemenation Timeline and Milestone

As project implementation is divided into four phases , we  will  complete phase 1-2  from week 1-6 (till mid evaluation) and  phase 3-4 from week 7-12. 


| **Phase**                                  | **Timeline**        | **Key Deliverables**                                                                 |
|--------------------------------------------|---------------------|--------------------------------------------------------------------------------------|
| **Phase 1: Caching**                        | Week 1 – Week 3     | • Dexie schema & IndexedDB setup  <br /> • `PersistQueryClientProvider` integrated <br /> • Selective caching using `meta.persist` <br /> • Implementation of all tech configs mentioned in Phase 1 <br /> • Offline reads tested |
| **Phase 2: Offline Writes** (Mid-evaluation)| Week 4 – Week 6     | • `offlineWrites` table created <br /> • `saveOfflineWrite` hooked into form submissions <br /> • Basic retry metadata stored <br /> • Test coverage for offline write logic |
| **Phase 3: Synchronization**               | Week 7 – Week 9     | • `syncOneWrite`, `computeBackoffDelay`, and retry mechanism implemented <br /> • `detectAndMarkConflict` for conflict detection <br /> • Sync trigger on reconnect <br /> • Implementation of all tech configs mentioned in Phase 3 <br /> • End-to-end sync (offline → online) tested |
| **Phase 4: Conflict Resolution + User Feedback** | Week 10 – Week 12 | • Conflict resolution UI implemented <br /> • Sync status page for success/failed/pending writes <br /> • Manual discard/overwrite support for conflicts <br /> • User notifications (toasts, alerts) for sync outcomes <br /> • Cleanup of stale writes <br /> • Final testing & polishing <br /> • **Build errors resolved and CI passes** |
