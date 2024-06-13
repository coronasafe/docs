# Schedule

### 27th May - 1st June
- [x] Creating Model
  - [x] Implementation strategy for database changes 
  - [x] Ensuring data consistency and integrity.
  - [x] Discuss approach with mentor.
  - [x] Create Django migrations to modify existing database tables to align with Django model.
  - [x] WebSockets Using Django Channels
  - [x] Improve directory structure
  - [x] Implement celery and celery Beat (basic structure)
  - [x] Rewrite retrieve assets_config function
  - [x] calling necessary functions on app startup 

### 1st June - 10th June
- [ ] Rewriting existing controllers in Django
  - [x] Rewrite update_observations api end to end.
  - [x] test update_observations from care_fe
   - [x] Specify the approach for implementing WebSockets. 
  - [x] Implement WebSockets.
  - [x] Test controllers.
  - [x] Authentication for WebSockets and Requests (WebSockets pending)
  - [x] Specify the approach for implementing authentication.
  - [x] Finalize approach for authentication.
  - [x] Ensure authentication works for connections from the CARE and CARE_FE applications.
  - [x] Cron job for retrieving asset configs
  - [ ] Rewrite automated daily_rounds function 
  - [ ] Store observation logs and status in redis 
  
### 11th June - 14th June
  - [ ] Write tests for controllers.
  - [ ] Rewriting existing routers in Django
  - [ ] Create APIs for the controllers.
  - [ ] Add tests for the APIs.

### 15th June - 19th June
  - [] Create Dockerfile for middleware
 
### 20th June - 27th June
  - [ ] Write tests for authentication.
  - [ ] Manually test authentication with tools like Postman.

### 28th June - 5th July
- [ ] Rewriting exceptions and rewriting remaining components
  - [ ] Handle exceptions and write custom exceptions for better exception handling.
  - [ ] Write tests related to exceptions.
  - [ ] Rewrite remaining parts from TypeScript to the new Django project.

### 6th July - 14th July
- [ ] Rewriting utils and automation in Django
  - [ ] Rewrite utility functions like camera utils.
  - [ ] Rewrite existing automation (uploading observations of Medical Equipment Data on AWS S3).

### 15th July - 22nd July
- [ ] Rewriting validators and ensuring typing
  - [ ] Implement type annotations throughout the Django middleware codebase.
  - [ ] Implement commit hooks to ensure maintainability.
  - [ ] Add validators to validate data wherever necessary.

### 23rd July - 31st July
- [ ] Connecting CARE (backend) to the new middleware
  - [ ] Test the middleware with the existing backend.
  - [ ] Thoroughly test the changes.
  - [ ] Ensure results are as expected.

### 1st Aug - 14th Aug
- [ ] Writing e2e tests
  - [ ] Write tests for happy flows.
  - [ ] Write e2e tests.
  - [ ] Write tests for edge cases.
  - [ ] Ensure everything works as expected.

### 15th Aug - 18th Aug
- [ ] Final Testing

### 19th Aug - 26th Aug
- [ ] Submit final work product