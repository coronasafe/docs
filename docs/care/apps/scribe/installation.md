---
sidebar_position: 1
---

# Installation

## 1. Pre-requisites

### OpenAI

Scribe supports models from OpenAI via both:

- **OpenAI API**
- **Azure OpenAI API**

To use either:

- Create an account on [OpenAI](https://platform.openai.com) or [Azure](https://portal.azure.com).
- Obtain your **API key**.
- If using Azure:
  - Create an **Azure OpenAI resource**.
  - Deploy the required models (e.g., `whisper-1` for transcription, `gpt-4.1` for chat).
  - Note down the **endpoint URL** and **API version**.

### Google Cloud

Scribe supports Google Cloud **only** through **Vertex AI**.

Steps:

1. Create a Google Cloud project.
2. [Enable the Vertex AI API](https://cloud.google.com/vertex-ai/docs/start/cloud-environment).
3. Authenticate:

   - **Dev Environment:** Use `gcloud auth login`. It creates the necessary credentials file automatically.
   - **Production:**
     - Create a [**service account**](https://cloud.google.com/vertex-ai/docs/general/custom-service-account) with appropriate Vertex AI permissions.
     - Download the **credentials JSON file**.
     - Set the environment variable:
       ```bash
       export GOOGLE_APPLICATION_CREDENTIALS=/path/to/credentials.json
       ```
     - If you prefer not to use a file, convert the credentials to base64 and set:
       ```bash
       export GOOGLE_APPLICATION_CREDENTIALS_B64=<base64-string>
       ```

> **Note:** These environment variables are consumed by **Care**, not directly by Scribe.

---

## 2. Backend Setup

### Step 1: Set up Care

Follow the [Care installation guide](https://care-be-docs.ohc.network/). We recommend using **Docker** for consistency.

### Step 2: Clone Scribe Plugin

Clone the `care_scribe` plugin into the root of your Care installation:

```
care/
├── care_scribe/
│ └── scribe files...
├── care/ (main application)
```

### Step 3: Enable Plugin Loading

Update `plugs/manager.py`:

Change the plugin install line to:

```python
subprocess.check_call([sys.executable, "-m", "pip", "install", "-e", *packages]) # noqa: S603
```

### Step 4: Configure Scribe Plugin

Create or update `plug_config.py` in Care's root:

```python
from plugs.manager import PlugManager
from plugs.plug import Plug

scribe_plug = Plug(
    name="care_scribe",
    package_name="care_scribe",
    version="",
    configs={
        "SCRIBE_API_PROVIDER": "openai", # or "azure" or "google"
        "SCRIBE_PROVIDER_API_KEY": "your-api-key", # not needed for Google

        # Model configs (skip for Google)
        "SCRIBE_AUDIO_MODEL_NAME": "whisper-1",
        "SCRIBE_CHAT_MODEL_NAME": "gpt-4.1",

        # Azure-specific
        "SCRIBE_AZURE_API_VERSION": "2024-03-01-preview",
        "SCRIBE_AZURE_ENDPOINT": "https://<your-endpoint>.openai.azure.com/",

        # Google-specific
        "SCRIBE_GOOGLE_PROJECT_ID": "your-gcp-project-id",
        "SCRIBE_GOOGLE_LOCATION": "us-central1",
    },
)

plugs = [scribe_plug]
manager = PlugManager(plugs)
```

> ⚠️ **Security Note:** Never commit `plug_config.py` to a public repo—it may contain sensitive keys.

---

### Step 5. Build and Run Care

Rebuild your Docker environment:

```bash
make re-build # If Care is already running

# OR

make up # To start fresh
```

If it's your first time setting up Care, don’t forget:

```bash
make load-fixtures
```

---

### Step 6. Verify Installation

Open [http://localhost:9000/swagger](http://localhost:9000/swagger).  
You should see **Scribe endpoints** listed under the API documentation.

---

## 3. Frontend Setup

Scribe frontend uses the microfrontend architecture to integrate with Care.

### Step 1: Install Care Frontend

Follow the [Care frontend installation guide](https://github.com/ohcnetwork/care_fe) to setup Care's frontend.

### Step 2: Configure Scribe Frontend

Clone the frontend plugin into any directory. This can be outside the Care directory.

```bash
git clone https://github.com/ohcnetwork/care_scribe_fe.git
```

### Step 3: Install Dependencies

Navigate to the cloned directory and install dependencies:

```bash
cd care_scribe_fe
npm install
```

### Step 4: Run the plugin server

Start the plugin server:

```bash
npm run dev
```

### Step 5: Configure Care Frontend

Update the `.env.local` file in your Care frontend directory:

```env
REACT_ENABLED_APPS="ohcnetwork/care_scribe_fe@localhost:4173"
```

Then run

```bash
npm run setup
```

Then you can run Care normally by

```bash
npm run dev
```

> Note: Plugins do not support hot reloading. You will need to refresh the page to see changes.

## 4. Enable Scribe for Users

To enable Scribe functionality:

1. Visit [http://localhost:9000/admin](http://localhost:9000/admin).
2. Go to the **User Flags** section.
3. Add the following flags for the appropriate users:
   - `SCRIBE_ENABLED`
   - `SCRIBE_OCR_ENABLED` _(optional)_

To enable for an entire facility, use the **Facility Flags** section.

---

## ✅ You're Done!

Scribe should now be integrated into Care. You can start using transcription and chat capabilities via the Scribe Plugin.
