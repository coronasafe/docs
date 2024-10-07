# CEP-6: Customizable Ordersets and Trigger Mechanisms


## Requirements/Motive 
We propose to introduce support for customizable clinical ordersets within the CARE system to enhance decision-making and standardize care processes. This feature should include a mechanism to trigger ordersets based on specific clinical criteria or diagnoses.

### Feature Details
- **Triggerable Ordersets**: Ordersets should be automatically triggerable based on predefined conditions such as patient diagnosis or lab results.
- **Customization**: Allow customization of ordersets to cater to the specific protocols of various healthcare facilities or departments.

### Example Orderset: Management of Acute Asthma in Adults
- **Medications**: High-dose inhaled corticosteroids, Oral steroids, Rescue inhaler (Albuterol)
- **Diagnostics**: Peak flow measurement, Blood gases
- **Observations**: Monitor respiratory rate, oxygen saturation
- **Instructions**: Patient education on inhaler technique, Asthma action plan review

## Implementation

### Rulesets

Rulesets will define the conditions under which an orderset should be triggered. These rulesets can be based on any patient related model and fileds. 

```python
class Ruleset(models.Model):
    name = models.CharField(max_length=255)
    model = models.CharField(max_length=255)
    description = models.TextField()
    conditions = models.JSONField()
```

#### Rulesets Conditions

A single ruleset can have multiple conditions, and each condition can have multiple fields to check against.

```python
conditions = {
    "operator": "AND",
    "conditions": [
        {
            "operator": "OR",
            "conditions": [
                {
                    "field": "diagnosis",
                    "operator": "contains",
                    "value": "asthma"
                },
                {
                    "field": "diagnosis",
                    "operator": "contains",
                    "value": "allergy"
                }
            ]
        },
        {
            "field": "age",
            "operator": "gte",
            "value": 18
        }
    ]
}
```


### Ordersets

Ordersets will be triggered based on the rulesets defined above. Ordersets will have a many-to-many relationship with rulesets.

```python
class Orderset(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    rulesets = models.ManyToManyField(Ruleset)
    actions = models.JSONField()
```

#### Orderset Actions

Ordersets will have a list of actions that will be suggested when the orderset is triggered.

```python
actions = [
    {
        "model": "Prescription",
        "values": {
            "medicine": "Albuterol",
            "dosage": "2 puffs",
            "frequency": "PRN"
        }
    },
    {
        "model": "Procedure",
        "values": {
            "name": "Peak Flow Measurement",
            "instructions": "Measure peak flow every 4 hours"
        }
    }
]
```

#### Orderset Suggestions

Orderset Suggestions will be a list of actions that will be suggested when the orderset is triggered.

```python
class OrdersetSuggestions(models.Model):
    orderset = models.ForeignKey(Orderset, on_delete=models.CASCADE)
    model = models.CharField(max_length=255)
    model_id = models.IntegerField()
    executed = models.BooleanField(default=False)
    created_date = models.DateTimeField(auto_now_add=True)
    expires_date = models.DateTimeField() # default: created_at + 24 hours
```


### Orderset Trigger Mechanism

Ordersets can be triggered by signals, or by a manual trigger from the user interface. 


##### Helper functions to check conditions

```python
def check_conditions(conditions, instance):
    ...

def suggest_orderset(orderset, instance):
    # skip if orderset is already suggested
    ...
```

#### Signal Trigger

```python

@receiver(post_save, sender=Patient)
def trigger_ordersets(sender, instance, created, **kwargs):
    rulesets = Ruleset.objects.filter(
        model="Patient",
    )
    for ruleset in rulesets:
        if check_conditions(ruleset.conditions, instance):
            ordersets = ruleset.orderset_set.all()
            for orderset in ordersets:
                suggest_orderset(orderset, instance)
```

### Manual Trigger

Users can request to trigger an orderset manually from the frontend. This will start a background task to check the conditions on the requested object.

Users can then list the OrdersetSuggestions and execute them as needed.


## Annexture

Here's a list of actions, that may be triggered as part of an orderset:

1. **Medications**
   - Prescription drugs
   - Over-the-counter medications
   - Intravenous solutions
   - Pre-medication protocols

2. **Observations**
   - Vital signs monitoring (blood pressure, temperature, heart rate, respiratory rate)
   - Pain assessment
   - Fluid intake and output
   - Nutritional status and dietary requirements

3. **Lab Tests**
   - Blood tests (CBC, blood glucose, lipid profile)
   - Urine tests (urinalysis)
   - Microbiological cultures (bacterial, fungal)
   - Genetic testing or biomarkers

4. **Imaging**
   - X-ray
   - MRI
   - CT scan
   - Ultrasound

5. **Procedures**
   - Surgical interventions
   - Non-surgical treatments (e.g., catheter insertion, lumbar puncture)
   - Rehabilitation exercises
   - Wound care

6. **Consultations**
   - Referrals to specialists (cardiologists, endocrinologists)
   - Mental health evaluations
   - Physiotherapy
   - Dietary consultation

7. **Patient Education**
   - Disease-specific information
   - Medication instructions
   - Lifestyle and dietary recommendations
   - Follow-up care and self-monitoring techniques

8. **Care Coordination**
   - Follow-up appointments
   - Transfer orders within or between facilities
   - Home care or community health services

9. **Dietary Orders**
   - Specific diets (low salt, diabetic, allergy-specific)
   - Fluid restrictions or supplements
   - Parenteral nutrition

10. **Safety and Precautions**
    - Allergy checks
    - Fall risk assessments and interventions
    - Isolation precautions for infectious diseases

11. **Discharge Planning**
    - Medication reconciliation
    - Summary of hospital stay and treatment
    - Instructions for home care or rehabilitation

