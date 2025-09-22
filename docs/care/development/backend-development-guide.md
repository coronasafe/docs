# Backend Development Guide: End-to-End Feature Implementation

This guide demonstrates how to build a new feature end-to-end in CARE's backend, using the Patient model as a concrete example. Follow this guide to understand how to create new models and APIs that integrate seamlessly with CARE's architecture.

## Quick Overview of the Tech Stack

Our backend uses:

- **Django & Django REST Framework**: For models, APIs, and business logic
- **Pydantic**: For API contract definitions and validation
- **PostgreSQL**: As the primary database

Key directories:

- Models: `care/emr/models/` - Extend `EMRBaseModel` for audit fields and common behavior
- Resources (Pydantic): `care/emr/resources/<feature>/spec.py` - Define create/update/read contracts
- API ViewSets: `care/emr/api/viewsets/` - Compose mixins from `EMRBaseViewSet`
- Routing: `config/api_router.py` - Use nested routers for facility/patient-scoped endpoints

## Step 1: Model Development

Let's look at the Patient model as an example of best practices. The model is defined in `care/emr/models/patient.py` and extends `EMRBaseModel`.

### Key Model Patterns

1. **Field Definitions**:

```python
class Patient(EMRBaseModel):
    name = models.CharField(max_length=200, default="")
    gender = models.CharField(max_length=35, default="")
    phone_number = models.CharField(
        max_length=14,
        validators=[mobile_or_landline_number_validator],
        default=""
    )
    date_of_birth = models.DateField(default=None, null=True)
    year_of_birth = models.IntegerField(
        validators=[MinValueValidator(1900)],
        null=True
    )
```

2. **Best Practices**:

   - Extend `EMRBaseModel` to get audit fields (created/modified dates, external_id)
   - Use appropriate field types and validators
   - Keep normalized fields and caches separate
   - Document complex fields or business logic
   - Use descriptive field names

3. **Model Methods**:
   - Keep `save()` methods minimal and safe
   - Encapsulate complex logic in helper methods
   - Use properties for derived fields
   - Handle caches and signals appropriately

## Step 2: Pydantic Resources

Resources define the API contracts and handle model mapping. They live in `care/emr/resources/<feature>/spec.py`.

### Resource Types

1. **Base Spec**:

```python
class PatientBaseSpec(EMRResource):
    name: str
    gender: str
    phone_number: str
    date_of_birth: datetime.date | None = None
    year_of_birth: int | None = None
```

2. **Create Spec**:

```python
class PatientCreateSpec(PatientBaseSpec):
    geo_organization: UUID4
    identifiers: list[PatientIdentifierConfigRequest] = []
    tags: list[UUID4] = []

    @model_validator(mode="after")
    def validate_identifiers(self):
        # Validation logic here
        return self

    def perform_extra_deserialization(self, is_update, obj):
        # Map Pydantic fields to Django model
        obj.geo_organization = Organization.objects.get(
            external_id=self.geo_organization
        )
```

3. **Update/List/Retrieve Specs**:

- Create separate specs for different operations
- Handle partial updates in UpdateSpec
- Add computed fields in ListSpec/RetrieveSpec

### Best Practices:

- Use validators for complex validation logic
- Handle related objects in `perform_extra_deserialization`
- Keep serialization logic in `perform_extra_serialization`
- Document any non-obvious mappings

## Step 3: ViewSet Implementation

ViewSets compose EMR mixins and handle authorization. They live in `care/emr/api/viewsets/`.

### Basic ViewSet Setup:

```python
class PatientViewSet(EMRModelViewSet):
    database_model = Patient
    pydantic_model = PatientCreateSpec
    pydantic_read_model = PatientListSpec
    pydantic_update_model = PatientUpdateSpec
    pydantic_retrieve_model = PatientRetrieveSpec
    filterset_class = PatientFilters
    ordering_fields = ["created_date", "modified_date"]
```

### Key Components:

1. **Authorization**:

```python
def authorize_update(self, request_obj, model_instance):
    if not AuthorizationController.call(
        "can_write_patient_obj",
        self.request.user,
        model_instance
    ):
        raise PermissionDenied("Cannot Update Patient")
```

2. **Create/Update Operations**:

```python
def perform_create(self, instance):
    with transaction.atomic():
        super().perform_create(instance)
        # Additional setup like tags, identifiers
        instance.save()
```

### Best Practices:

- Use transactions for multi-step operations
- Keep business logic in model methods
- Implement proper authorization checks
- Add appropriate filters and ordering
- Optimize querysets with select_related/prefetch_related

## Step 4: API Routing

Register your ViewSet in `config/api_router.py`:

```python
# For top-level resources
router.register("patient", PatientViewSet, basename="patient")

# For nested resources under patient
patient_nested_router = NestedSimpleRouter(
    router, r"patient", lookup="patient"
)
patient_nested_router.register(
    r"consultation",
    ConsultationViewSet,
    basename="patient-consultation"
)
```

Choose the appropriate router based on your resource's scope:

- Root router: For top-level resources
- `facility_nested_router`: For facility-scoped resources
- `patient_nested_router`: For patient-scoped resources

## Step 5: Testing

Create comprehensive tests covering all operations:

```python
@pytest.mark.django_db
class TestPatientAPI:
    def test_create_patient(self, user_factory):
        client = APIClient()
        user = user_factory()
        client.force_authenticate(user)

        url = reverse("api:patient-list")
        payload = {
            "name": "John Doe",
            "gender": "male",
            "phone_number": "+910000000000",
            "geo_organization": "<org-external-id>",
        }

        res = client.post(url, payload, format="json")
        assert res.status_code == 200
        assert res.data["name"] == "John Doe"

    def test_update_patient(self, patient_factory):
        # Test update operations
        pass

    def test_list_filters(self):
        # Test list filters and ordering
        pass
```

### Test Coverage:

- Basic CRUD operations
- Validation error cases
- Authorization rules
- Custom actions/endpoints
- Edge cases and business rules

## Development Checklist

When creating a new feature:

- [ ] Create model and migrations

  - [ ] Extend EMRBaseModel
  - [ ] Add appropriate fields and validators
  - [ ] Document complex logic

- [ ] Create Pydantic resources

  - [ ] Base spec with common fields
  - [ ] Create/Update/List/Retrieve specs
  - [ ] Add validation rules
  - [ ] Implement serialization methods

- [ ] Implement ViewSet

  - [ ] Set up basic configuration
  - [ ] Add authorization rules
  - [ ] Implement custom actions
  - [ ] Add filters and ordering

- [ ] Update routing

  - [ ] Register with appropriate router
  - [ ] Add nested routes if needed

- [ ] Write tests

  - [ ] CRUD operations
  - [ ] Validation cases
  - [ ] Authorization rules
  - [ ] Custom functionality

- [ ] Documentation
  - [ ] API endpoints
  - [ ] Request/response formats
  - [ ] Authorization requirements
  - [ ] Example usage

## Common Gotchas

1. **Authorization**:

   - Always implement proper authorization checks
   - Consider both object and action-level permissions
   - Test with different user roles

2. **Transactions**:

   - Use atomic transactions for multi-step operations
   - Handle rollbacks appropriately
   - Consider using select_for_update when needed

3. **Performance**:

   - Optimize database queries
   - Use select_related/prefetch_related
   - Add appropriate indexes
   - Cache expensive computations

4. **Validation**:
   - Add comprehensive validation rules
   - Handle edge cases
   - Provide clear error messages
   - Validate at both model and API levels
