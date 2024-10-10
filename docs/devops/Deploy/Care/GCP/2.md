# Setting Up Build Pipelines

## Setting Up the Artifact Registry

1. Navigate to the **Artifact Registry** in the **Google Cloud Console**.
2. Create private Artifact Registry repositories named `care` and `care_fe`.
3. Ensure that the repositories are **mutable**.
4. Use the **Default Encryption Key** for the repositories.


## Setting Up Cloud Source Repositories

1. Navigate to the **Cloud Source Repositories** service in the **Google Cloud Console**.
2. Create a new repository named `infra-name`.
3. Add the files `build/react.env` and `plug_config.py` to the repository. (The `plug_config.py` file can be used to include plugins for `care`)
4. Add the following content to the `react.env` file:
```yaml
REACT_PLAUSIBLE_SERVER_URL=https://plausible.example.com
REACT_HEADER_LOGO='{"light":"https://cdn.ohc.network/header_logo.png","dark":"https://cdn.ohc.network/header_logo.png"}'
REACT_MAIN_LOGO='{"light":"https://cdn.ohc.network/light-logo.svg","dark":"https://cdn.ohc.network/black-logo.svg"}'
REACT_GMAPS_API_KEY="examplekey"
REACT_GOV_DATA_API_KEY=""
REACT_RECAPTCHA_SITE_KEY=""
REACT_SENTRY_DSN=""
REACT_SAMPLE_FORMAT_ASSET_IMPORT=""
REACT_SAMPLE_FORMAT_EXTERNAL_RESULT_IMPORT=""
REACT_KASP_ENABLED=""
REACT_ENABLE_HCX=""
REACT_ENABLE_ABDM=""
REACT_ENABLE_SCRIBE=""
REACT_WARTIME_SHIFTING=""
REACT_OHCN_URL=""
REACT_PLAUSIBLE_SITE_DOMAIN="care.example.com"
REACT_SENTRY_ENVIRONMENT=""
REACT_CARE_API_URL="https://care.example.com"
REACT_DASHBOARD_URL=""
```
5. Add the following content to the `plug_config.py` file (if required):
```
from plugs.manager import PlugManager
from plugs.plug import Plug

hcx_plugin = Plug(
    name="hcx",
    package_name="git+https://github.com/ohcnetwork/care_hcx.git",
    version="@main",
    configs={},
)

plugs = [hcx_plugin]

manager = PlugManager(plugs)
```

6. Clone the [infra-template](https://github.com/coronasafe/infra_template) repository. This repository contains the necessary YAML files to deploy our applications as Kubernetes workloads. You will need to replace all generic/example values with your production values. Here's a guide on what to change in each folder:

    - **Certificate**: Replace the example hostnames for 'dnsNames' with your actual hostnames.

    - **Configmaps**: In `care-configmap.yaml`, add your database configurations and update the hostnames in `CSRF_TRUSTED_ORIGINS` and `DJANGO_ALLOWED_HOSTS`. In `nginx.yaml`, update the `server_name` with your hostnames.

    - **Helm**: Install Helm if you haven't already. Use the static IP created from the "Reserve a static IP address" step to replace the IP value in `helm/scripts.sh`.

    - **Ingress**: Replace the example hostnames with your actual hostnames.

    - **Secrets**: Update `care-secrets.yml` with your secrets. Update `metabase.yml` with your Metabase database credentials.
7. Push the changes to the `infra-name` repository we created earlier in the **Cloud Source Repositories**.

## Setting Up the Cloud Build Project

1. Go to the **Cloud Build** service in the **Google Cloud Console**.
2. Establish a new build project, name it `deploy-care`.
3. Generate a new trigger for the project.
4. Configure the Event to respond to Webhook events.
5. Retrieve the `Webhook URL` from the `Show URL Preview` option.
6. Define the Configuration as `Cloud Build configuration file (yaml or json)`.
7. Specify the Location as `Inline` and insert the following content:
```yaml
steps:
  - name: ubuntu
    args:
      - '-c'
      - |
        echo "be $_BE_TAG" \
        && echo "fe $_FE_TAG" \
        && echo "metabase $_METABASE_TAG"
    entrypoint: bash
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk:slim'
    args:
      - '-c'
      - |
        gcloud source repos clone $_INFRA_REPO infra
        cd infra
        git config user.name "CloudBuild"
        git config user.email example@cloudbuild.gserviceaccount.com
    dir: /workspace
    id: clone-infra
    entrypoint: bash
  - name: gcr.io/cloud-builders/gsutil
    args:
      - '-c'
      - |
        if [[ -n "$_BE_TAG" ]]; then
          curl -L https://github.com/ohcnetwork/care/archive/$_BE_TAG.zip -o care.zip
          unzip care.zip
          mv care-$_BE_TAG care
        else
           echo "Skipping..."
        fi
    dir: /workspace
    id: download-care
    entrypoint: bash
  - name: ubuntu
    args:
      - '-c'
      - |
        if [[ -n "$_BE_TAG" ]]; then
          cp -r /workspace/infra/build/. /workspace/care
        else
          echo "Skipping..."
        fi
    id: copy-build-files
    entrypoint: bash
  - name: gcr.io/cloud-builders/docker
    args:
      - '-c'
      - |
        if [[ -n "$_BE_TAG" ]]; then
          #docker pull asia-south1-docker.pkg.dev/$PROJECT_ID/care/care:latest
          DOCKER_BUILDKIT=1 docker build -f ./care/docker/prod.Dockerfile \
            -t asia-south1-docker.pkg.dev/$PROJECT_ID/care/care:$_BE_TAG \
            -t asia-south1-docker.pkg.dev/$PROJECT_ID/care/care:latest \
            ./care
          docker push \
            asia-south1-docker.pkg.dev/$PROJECT_ID/care/care:$_BE_TAG
          docker push \
            asia-south1-docker.pkg.dev/$PROJECT_ID/care/care:latest
        else
          echo "Skipping..."
        fi
    dir: /workspace
    id: build-care
    entrypoint: bash
  - name: gcr.io/cloud-builders/git
    args:
      - '-c'
      - |
        if [[ -n "$_BE_TAG" ]]; then
          cd infra
          sed -i -e 's|\(image: .*care:\).*|\1$_BE_TAG|' deployments/*
          sed -i -e "/name: deployment-version/{n;s/value: .*/value: \"$BUILD_ID\"/;}" deployments/care-backend.yaml
          sed -i -e "/name: deployment-version/{n;s/value: .*/value: \"$BUILD_ID\"/;}" deployments/care-celery-worker.yaml
          sed -i -e "/name: deployment-version/{n;s/value: .*/value: \"$BUILD_ID\"/;}" deployments/care-celery-beat.yaml
          git add .
          git commit -m "update backend crds to $_BE_TAG" || true
        else
          echo "Skipping..."
        fi
    dir: /workspace
    id: update-care-crd
    entrypoint: bash
  - name: gcr.io/cloud-builders/gsutil
    args:
      - '-c'
      - |
        if [[ -n "$_FE_TAG" ]]; then
          curl -L https://github.com/ohcnetwork/care_fe/archive/$_FE_TAG.zip -o /workspace/care_fe.zip
          unzip /workspace/care_fe.zip -d /workspace
          mv /workspace/care_fe-$_FE_TAG /workspace/care_fe
          cp /workspace/infra/build/react.env /workspace/care_fe/.env.local
          cd /workspace/care_fe
        else
           echo "Skipping..."
        fi
    dir: /workspace
    id: download-care-fe
    entrypoint: bash
  - name: ubuntu
    args:
      - '-c'
      - |
        if [[ -n "$_FE_TAG" ]]; then
          cp /workspace/infra/build/react.env /workspace/care_fe/.env.local
        else
          echo "Skipping..."
        fi
    id: copy-fe-build-files
    entrypoint: bash
  - name: gcr.io/cloud-builders/docker
    args:
      - '-c'
      - |
        if [[ -n "$_FE_TAG" ]]; then
          #docker pull asia-South1-docker.pkg.dev/$PROJECT_ID/care/care_fe:latest
          DOCKER_BUILDKIT=1 docker build -f ./care_fe/Dockerfile \
            -t asia-south1-docker.pkg.dev/$PROJECT_ID/care/care_fe:$_FE_TAG \
            -t asia-south1-docker.pkg.dev/$PROJECT_ID/care/care_fe:latest \
            ./care_fe
          docker push \
            asia-south1-docker.pkg.dev/$PROJECT_ID/care/care_fe:$_FE_TAG
          docker push \
            asia-south1-docker.pkg.dev/$PROJECT_ID/care/care_fe:latest
        else
          echo "Skipping..."
        fi
    dir: /workspace
    id: build-care-fe
    entrypoint: bash
  - name: gcr.io/cloud-builders/git
    args:
      - '-c'
      - |
        if [[ -n "$_FE_TAG" ]]; then
          cd infra
          sed -i -e 's|\(image: .*care_fe:\).*|\1$_FE_TAG|' deployments/care-fe.yaml
          sed -i -e "/name: deployment-version/{n;s/value: .*/value: \"$BUILD_ID\"/;}" deployments/care-fe.yaml
          git add .
          git commit -m "update frontend crds to $_FE_TAG" || true
        else
          echo "Skipping..."
        fi
    dir: /workspace
    id: update-care-fe-crd
    entrypoint: bash
  - name: gcr.io/cloud-builders/git
    args:
      - '-c'
      - |
        if [[ -n "$_METABASE_TAG" ]]; then
          cd infra
          sed -i -e 's|\(image: metabase/metabase:\).*|\1$_METABASE_TAG|' deployments/metabase.yaml
          git add .
          git commit -m "update frontend crds" || true
        else
          echo "Skipping..."
        fi
    dir: /workspace
    id: update-metabase-crd
    entrypoint: bash
  - name: gcr.io/cloud-builders/gke-deploy
    args:
      - '-c'
      - |
        gke-deploy apply \
          --location=${_CARE_GKE_ZONE} \
          --cluster=${_CARE_GKE_CLUSTER} \
          --filename=infra/deployments
    dir: /workspace
    id: deploy-to-gke
    entrypoint: bash
  - name: 'gcr.io/google.com/cloudsdktool/cloud-sdk:slim'
    args:
      - '-c'
      - |
        cd infra
        git pull --rebase
        git push
    dir: /workspace
    id: push-crds
    entrypoint: bash
options:
  logging: CLOUD_LOGGING_ONLY
substitutions:
  _FE_TAG: $(body.substitutions.care_fe_tag)
  _METABASE_TAG: $(body.substitutions.metabase_tag)
  _BE_TAG: $(body.substitutions.care_be_tag)

```
8. Save the file and exit the editor.
9. Configure the Substitution variables for the Cloud Build trigger:
    - Navigate to the `Substitution variables` tab.
    - Select the `Add substitution variable` button.
    - Input the following variables:
        - Name: `_FE_TAG`
          Value: ``
        - Name: `_METABASE_TAG`
          Value: ``
        - Name: `_BE_TAG`
          Value: ``
        - Name: `_CARE_GKE_ZONE`
          Value: ``
        - Name: `_CARE_GKE_CLUSTER`
          Value: ``
        - Name: `_INFRA_REPO`
          Value: ``
    - Save your changes by clicking the `Save` button.
10. In a separate tab, create a Service Account for Cloud Build. Navigate to the IAM Section, name the account `cloudbuilder`, and assign the following roles:
    - Artifact Registry Administrator
    - Cloud Build Service Account
    - Cloud Run Source Developer
    - Cloud Source Repositories Service Agent
    - Kubernetes Engine Admin
    - Logs Bucket Writer
    - Secret Manager Secret Accessor
    - Source Repository Reader
    - Source Repository Writer
11. Assign the Service Account to the Cloud Build trigger:
    - Navigate to the `Service account` tab.
    - Choose the `cloudbuilder` service account from the list.
12. Save the trigger by selecting the `Create` button.
