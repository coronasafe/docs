# Doctor Notes Enhancement

### Project Overview

This project aims to enhance the functionality of doctor notes within the system to provide a more comprehensive and user-friendly experience. The planned features aim to empower users by allowing them to upload images, hyperlink documents, and leverage markdown formatting for better organization and clarity. The key enhancements include implementing a file upload option, adding markdown support, enabling notes to be directed to specific files, and introducing a user tagging mechanism for improved communication. Additionally, all uploaded files will be seamlessly integrated into the patient consultation file, enhancing the overall efficiency and effectiveness of healthcare documentation.

### Proposed Solution and Benefits to Users

1. **File Upload Option**: Users can upload different types of files, like images, documents, audio, and videos, directly to doctor notes. This helps make documenting easier and makes patient records more detailed. It helps doctors make better decisions about patient care.

2. **Markdown Support**: Users can use markdown to format their notes better. This helps them organize information clearly and makes it easier for medical teams to work together. It leads to better care for patients.

3. **Comments under Each Note**: Users will have the ability to add comments under each note, allowing for better organization and collaboration. This feature enhances the overall usability of the system and improves communication among healthcare professionals.

4. **User Tagging Mechanism**: Users can tag other healthcare professionals in their notes. This helps them communicate better and work together efficiently. Users will get notifications when they're mentioned in notes or comments. This encourages quick responses and active collaboration.

5. **Integration with Patient Consultation Files**: All uploaded files will be added to the patient consultation file in a section called "Doctor Notes." This makes it easy to find relevant information quickly. It helps doctors make informed decisions about patient care.

6. **Bookmark Feature**: A new bookmark feature will be introduced, allowing users to bookmark important notes or sections for quick access. This feature can be seamlessly integrated across various sections of the website, ensuring its versatility and enhancing user convenience and productivity.

# Implementation Plan

## Markdown Editor

- There was a change in plan from using a dedicated library for markdown editor to implementing a custom markdown editor in order to have more control over the editor's behavior and usage of fewer resources.

### Challenges:
- Earlier, there used to be a `execCommand` API for rich text editing, but it is now deprecated. So, we need to implement a custom markdown editor with existing alternatives such as 
  - `window.getSelection()`
  - `window.getSelection().getRangeAt(0).commonAncestorContainer`
  - `document.createRange()`
  - `document.createRange().surroundContents()`
  - `appendChild`
  - `insertBefore` etc...
- There are no references to implement since it is deprecated recently and most of the references are outdated and many started using libraries instead.
- After a couple of trials and errors, I was able to implement a custom markdown editor with the help of the above-mentioned alternatives. It's not perfect yet and has some minor issues which can be fixed in future iterations.

### Implementation:

There are couple of steps that are need to be followed inorder to achive the expected behavior:

#### Step 1: Get the Current Text Selection
First, retrieve the current text selection from the document.

```javascript
const selection = window.getSelection();
if (!selection.rangeCount) return;
```

#### Step 2: Create a Range and Extract Contents
Create a new range from the selection and extract the selected contents.

```javascript
const range = selection.getRangeAt(0);
const extractedContents = range.extractContents();
```

#### Step 3: Create the New Element
Create the new element that will wrap or replace the selected text. For example, if you're implementing bold text, create a `<strong>` element.

```javascript
const newElement = document.createElement('strong'); // or 'a', 'em', etc.
newElement.appendChild(extractedContents);
```

#### Step 4: Insert the New Element into the Document
Insert the newly created element back into the document at the position of the original selection.

```javascript
range.insertNode(newElement);
```

- Basically we will be styling the text in html and converting it to markdown when the user saves the note.
- Currently I am using existing library react-markdown to preview the markdown text and using prose from tailwindcss for styling the text and inorder to convert the styled text to markdown I am using turndown library.

```javascript
const saveState = () => {
    const turndownService = new TurndownService();
    turndownService.addRule("strikethrough", {
      filter: ["s", "del"],
      replacement: (content) => `~~${content}~~`,
    });
    ...
    const htmlContent = editorRef.current?.innerHTML || "";
    const markdownText = turndownService.turndown(htmlContent);
    onChange(markdownText);
  };
```
- Strikethroughs are not in markdown by default, so I added a rule to convert the strikethrough styled text to markdown.
```javascript
  const processedMarkdown = markdown.replace(/~~(.*?)~~/g, (_, text) => `<del>${text}</del>`);
  <ReactMarkdown
    className="prose text-sm prose-p:m-0"
    rehypePlugins={[rehypeRaw]}
  >
      {processedMarkdown}
  </ReactMarkdown>
```
- Using this approch we can create any custom component of our choice based on the requirement and matching a regex pattern.

## Attachments / File upload
- The files will be uploaded to `patient-bucket` under the folder `notes` using exising fileupload API.
- The uploaded files will be associated with the notes using the `associating_id` as `notes_id` field in the `FileUpload` model.

### Implementation:

**Backend:**

- A new file type will be added to the existing FileType enum.

  ```python
  class FileType(enum.Enum):
      ...
      NOTES = 9
  ```

- A new field in the `PatientNotesSerializer` to retrive the uploaded files.

  ```python
  class PatientNotesSerializer(serializers.ModelSerializer):
      ...
      files = FileUpload.objects.filter(
            associating_id=obj.id,
            file_type=FileUpload.FileType.NOTES.value,
            upload_completed=True,
            is_archived=False,
        ).values()
      
  ```
**Frontend:**

Uploading attachments to specific notes :
- We can use notes Id as associating id for uploading attachments , which later helps in easy retrieval by using following method
  
  ```javascript
    await request(routes.createUpload, {
      body: {
         file_type: "NOTES",
         associating_id: `${noteId}`,
         ...
    }, });
  ```
- However we won't be able to upload files without a note id, so we need to create a note first and then upload files to that note, Once the note is created we can upload files to that note using the note id.

- This involoves the following steps:
  1. Creating a note

  ```javascript
     const { res } = await request(routes.addPatientNote, {
      pathParams: {
        patientId: patientId,
      },
      body: {
        note: noteField,
        thread,
        consultation: consultationId,
      },
    });
  ```

  2. Creating a file upload request with associating id as note id

  ```javascript
    const { data } = await request(routes.createUpload, {
      body: {
        original_name: f.name,
        file_type: file_type,
        name: f.name,
        associating_id: noteId,
        file_category: category,
        mime_type: f.type,
      },
    });
  ```
  3. Uploading files to the created requests
  4. Updating the status of the file upload to completed
  
    ```javascript
    await request(routes.editUpload, {
      body: { upload_completed: true },
      pathParams: {
        id: data.id,
        fileType: file_type,
        associatingId: noteId,
      },
    });
    ```
  5. Retrieving the uploaded files using the following method using created file upload id to get the signed url for the file.
  ```javascript
    const { data } = await request(routes.retrieveUpload, {
      query: {
        file_type: file_type,
        associating_id: noteId,
      },
      pathParams: { id },
    });
  ```

## Mentions/Tagging support
- Initially, This was a bit challenging as there are no references to implement this and need to be implemented from scratch.
- However, flexibility with conversion of markdown to html and vice versa with various custom components helped in implementing this feature.

### Implementation:
- This involves triggering a component when the user types `@` and then showing a list of users to tag.

  ```javascript
  const handleInput = useCallback((event: React.FormEvent<HTMLDivElement>) => {
    const target = event.target as HTMLDivElement;
    const text = target.textContent || "";
    const lastChar = text[text.length - 1];

    if (lastChar === "@") {
      const selection = window.getSelection();
      if (selection && selection.rangeCount > 0 && editorRef.current) {
        const range = selection.getRangeAt(0);
        const rect = range.getBoundingClientRect();
        setMentionPosition({
          top: rect.bottom + window.scrollY + 30,
          left: rect.left + window.scrollX + 10,
        });
        setShowMentions(true);
        lastCaretPosition.current = range.cloneRange();
      }
    } else {
      setShowMentions(false);
    }

    saveState();
  }, []);
  ```
- Once we get the state updated with the user input, we can use the following method to get the user list to tag from a custom component.

```javascript
 
const MentionsDropdown: React.FC<{
  onSelect: (user: { id: string; username: string }) => void;
  position: { top: number; left: number };
  editorRef: React.RefObject<HTMLDivElement>;
}> = ({ onSelect, position, editorRef }) => {
  const facilityId = useSlug("facility");
  const { data } = useQuery(routes.getFacilityUsers, {
    pathParams: { facility_id: facilityId },
  });

  const users = data?.results || [];

  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    if (editorRef.current) {
      const editorRect = editorRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: position.top - editorRect.top + editorRef.current.scrollTop,
        left: position.left - editorRect.left,
      });
    }
  }, [position, editorRef]);

  return (
    <div
      className="absolute z-10 max-h-36 w-64 overflow-y-scroll rounded-md bg-white text-sm shadow-lg"
      style={{ top: dropdownPosition.top, left: dropdownPosition.left }}
    >
      {users.map((user) => (
        <div
          key={user.id}
          className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100"
          onClick={() =>
            onSelect({ id: user.id.toString(), username: user.username })
          }
        >
          <span className="flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-semibold text-white">
            {user.first_name[0]}
          </span>
          {user.username}
        </div>
      ))}
    </div>
  );
};

export default MentionsDropdown;
```
- The state for the position of the dropdown is updated based on the position of the caret in the editor and the position of the editor in the window.

- Once the user is selected for mention , and we want to store the data, then we can convert the html to markdown and store the data in the backend.

```javascript
  const saveState = () => {
    const turndownService = new TurndownService();
    turndownService.addRule("mentions", {
      filter: (node) => {
        return node.nodeName === "A" && node.hasAttribute("data-user-id");
      },
      replacement: (content, node) => {
        const userId = (node as HTMLElement).getAttribute("data-user-id");
        const username = content.replace("@", "");
        return `![mention_user](user_id:${userId}, username:${username})`;
      },
    });

    const htmlContent = editorRef.current?.innerHTML || "";
    const markdownText = turndownService.turndown(htmlContent);
    onChange(markdownText);
  };
```
- The above code will convert the mention tag to markdown and store the data in the backend as `![mention_user](user_id:${userId}, username:${username})`

- We can preview back the custom markdown syntax by creating a custom component for the same.

```javascript
  const processedMarkdown = markdown.replace(
    /!\[mention_user\]\(user_id:(.*?), username:(.*?)\)/g,
    (_, userId, username) => {
      return `<span class="user-mention" data-user-id="${userId}" data-username="${username}">@${username}</span>`;
    }
  );
  <ReactMarkdown
    className="prose text-sm prose-p:m-0"
    rehypePlugins={[rehypeRaw]}
    components={{
      a: CustomLink,
    }}
  >
    {processedMarkdown}
  </ReactMarkdown>
```

## Notifications for user tagging

**Backend:**
- A new event `USER_TAGGED` will be added in the notification model.
  
  ```python
  class Event(enum.Enum):
        ...
        PATIENT_NOTE_ADDED = 210
        USER_TAGGED = 230
  ```
- A new notification will be created when a user is tagged in a note.
  ```python
  NotificationGenerator(
        event=Notification.Event.USER_TAGGED,
        caused_by=self.request.user,
        caused_object=instance,
        facility=patient.facility,
        users_tagged=instance.tagged_users.all(),
    ).generate()
  ```
- Modifications in the notification handler to retrieve a message for tagged users.
    
    ```python
    def generate_system_message(self):
      message = ""
      ...
      elif isinstance(self.caused_object, PatientNotes):
          if self.event == Notification.Event.PATIENT_NOTE_ADDED.value:
              message = "Notes for Patient {} was added by {}".format(
                  self.caused_object.patient.name,
                  self.caused_by.get_full_name(),
              )
          elif self.event == Notification.Event.USER_TAGGED.value:
              message = "{} just mentioned you in a note for Patient {}".format(
                  self.caused_by.get_full_name(), self.caused_object.patient.name
              )
      return message
    ```
- Adding users to send notifications.
    
    ```python
    def generate_system_users(self):
      users = []
      users_tagged = self.users_tagged
      ...
      if users_tagged:
          users.append(users_tagged)
      return users
    ```

    ## Reply to notes
    