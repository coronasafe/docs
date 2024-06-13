# Reply feature in Doctor Notes

## Requirements/Motive

Currently CARE only supports adding a new note to the doctor notes. There is no option to reply to a specific note in the doctor notes. This feature will allow the user to reply to a specific note  and understand how a suggestion added to a doctor's note is received.

## Implementation Details

### Backend Changes

#### Model Changes

To start with the Backend Implementation of the Reply feature in the Doctor Notes, a new field `reply_to` should be added to the PatientNotes model. This field will be a ForeignKey field to the same model. This field will be used to store the note to which the reply is made.

The PatientNotes model should be updated as follows:
```python
class PatientNotes(models.Model):
    ...
    reply_to = models.ForeignKey('self', on_delete=models.SET_NULL, related_name='replies', null=True, blank=True)
    ...
```

#### Serializer for Reply to a Doctor Note

A new serializer `ReplyToPatientNoteSerializer` should be created to handle the reply to a doctor note. Since sending just an id of the note to which the reply is made is not enough, the paginated response might not have the note to which the reply is made. So, the serializer should have the details of the note and is required to show a preview of the note to which the reply is made.

This serializer should have the following fields:
- id: (CharField) This field contains the external_id of the note.
- created_by_object: (UserBaseMinimumSerializer) This field contains the details of the user who created the note. 

and some other necessary fields from the PatientNotes model to show the preview of the note to which the reply is made that are:
- created_date: (DateTimeField) This field contains the date and time when the note is created.
- user_type: (CharField) This field contains the type of the user who created the note.
- note: (TextField) This field contains the note content.

The serializer should be as follows:
```python
class ReplyToPatientNoteSerializer(serializers.ModelSerializer):
    id = serializers.CharField(source="external_id", read_only=True)
    created_by_object = UserBaseMinimumSerializer(source="created_by", read_only=True)

    class Meta:
        model = PatientNotes
        fields = (
            "id",
            "created_by_object",
            "created_date",
            "user_type",
            "note",
        )
```

All the necessary validations should be added in the existing PatientNotesSerializer to handle the reply to a doctor note. The validations are as follows:
- The note to which the reply is made should be in the same thread as the note.
- The note to which the reply is made should be in the same consultation as the note.

### Frontend Changes

#### Doctor Note Reply Preview Card

A new component `DoctorNoteReplyPreviewCard` is created to show a preview of the note to which the reply is made. This component will have the following props:

- parentNote: This prop is of type `PaitentNotesReplyModel` and contains the details of the note to which the reply is made. 
- children: This prop is a note component for which the reply is made.
- cancelReply: This prop helps to cancel the reply to the note. 