# CEP-4: RBAC support

RBAC (Role Based Access Control) allows fine-grained control of objects within care. Currently, care has some rudimentary 
version of RBAC implemented but this is not enough for the evolving requirements and its increasingly hard to keep track of 
increasing authorization scopes.  
A new updated version of RBAC is essential to ensure that care remains secure, stable and scalable.  

Requirements for new version :  
    - Adding permission for each action, this could be anything from `edit_patient` to `edit_patient_dob` 
    - New implementation of roles which would be a combination of permissions and can be created on the fly and modifiable as necessary
    - A new library to perform authZ related actions, ie, this library can abstract permission checks like `can user X access resource Y`  

There should be some capability to override permissions in general, like a DistAdmin type user would have access to X if the district attribute of X is the same as the users. 
This needs to be abstracted somehow. ( Even thou its not required, having a permission management system capable of this would be essential )

To allow AuthZ in listing, For resources that are unbounded like patient listing, there can be permissions that allow patient searches within a facility 
and if the user requesting the search passes the criteria they are allowed to search.

A user can also be given explicit permission over a resource, this needs to be handled separately. ex : Even if you have the permission to view patients in a facility, 
you may not access the patient unless the patient is explicitly assigned to your location or you are the assigned doctor.

Open searches without any contexts applied should be discouraged, Searching patients cross facilities for instance should be discouraged.

Permissions can be cached at any level, given that they are invalidated periodically or on a change in permission.

Superadmins may sometimes required to give access to resources to other users for a temporary duration, like a doctor viewing an old patient data without actually creating a consultation.
This needs to be accounted for in the system.

## Proposed Implementation:

A new app will be created to manage permissions, This app would abstract away every bit of logic that deals with permissions in general.
    
Application logic would still control all aspects of the resource, The permission module will use metadata of a resource to identify if a user has access to a resource.
ie. Application logic would record that a patient has an assigned doctor for a consultation, the permission controller would use that metadata to confirm access for the doctor.

Since some permission logic deals with queryset based filtering, the permission class would also be responsible to create filtered querysets based on requirements, 
ie, given a user x, build a queryset to access all facilities.  
A plug with a custom permission manager can override this logic to create his own logic to determine querysets.  

All permissions are to be abstracted to a class outside care's default `facilitiy` app, this class would be tasked with checking if a user has access to resource y with a given scope.

### Permission Controller
    
This is a new idea introduced in care to abstract permission management, All available permissions in the app would be defined here.
A set of pre-defined roles along with their permission is also managed. 

The permission controller handles only permission management, it maintains a list of permission each user. 

Permissions are always applied at a context, Contexts can be at a location level, facility level or extended as per application requirements.

Permission Controller allows the permissions to be defined in different files and allows permissions to be defined by plugs as well.

### Authorization Controller

The is another concept introduced into care, the authorization controller is responsible for checking if a user has access to a resource.
Internally it can use the permission controller to check, it also uses the requested objects's metadata to detemine if the user has access to the resource. 

For ex, For the action `view_patient` ie Viewing a patients data ( Patient id already known )
The Authorization controller for this action will take a user obj and a patient obj, it will check if the user has access to the patient obj through various mechanisms.

Views will invoke the Authorization controller to check if a user can continue with the action. Authorization Controller can also cache the access for a user to a resource.
