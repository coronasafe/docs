# RBAC support - CEP-4

RBAC (Role Based Access Control) allows fine-grained control of objects within care. Currently, care has some rudimentary 
version of RBAC implemented but this is not enough for the evolving requirements and its increasingly hard to keep track of 
increasing authorization scopes.  
A new updated version of RBAC is essential to ensure that care remains secure, stable and scalable.  

Requirements for new version : 
    - Adding permission for each action, this could be anything from `edit_patient` to `edit_patient_dob` ( Some relation can be maintained for this hierarchy )
    - New implementation of a role which would be a combination of permissions
    - A new library to perform authZ related actions, ie, this library can abstract permission checks like `can user X access resource Y`
    - Creating new users with combined permissions on the fly, ie create a new user with roles A and B

There should be some capability to override permissions based on attributes, like a DistAdmin type user would have access to X if the district attribute of X is the same as the users. 
This needs to be abstracted somehow.

To allow AuthZ in listing, For resources that are unbounded like patient listing, there can be permissions that allow patient searches within a facility 
and if the user requesting the search passes the criteria they are allowed to search.

A user can also be given explicit permission over a resource, this needs to be handled separately. Since the permissions in care do not explicitly deny any user from an action, 
The most open permission can be used first.

Open searches without any contexts applied should be discouraged, Searching patients across without a facility limit for instance should be discouraged.

Permissions can be cached at any level, given that they are invalidated periodically or on a change in permission.

## Proposed Design:

### Approach 1 (Proposed): Abstract all Permissions to a separate app

A new app will be created to manage permissions, This app would abstract away every bit of logic that deals with permissions in general.
    
Object level permission control will not be included in this design, this will be left towards the application logic, ie,
logic to determine if a doctor is assigned to a patient will still remain in the application logic, the permission management will control if that user can access that patient

Since some permission logic deals with queryset based filtering, the permission class would also be responsible to create filtered querysets based on requirements, 
ie, given a user x, build a queryset to access all facilities.  
A secondary application builder might override this logic to create his own logic to determine querysets.  

All permissions are to be abstracted to a class outside care's default `facilitiy` app, this class would be tasked with checking if a user has access to resource y with a given scope.

Different classes can exist to manage querysets.
