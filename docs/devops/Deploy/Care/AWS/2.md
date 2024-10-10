# Setting Up Build Pipelines

## Setting Up the ECR Repository

1. Navigate to the **ECR** service in the **AWS Console**.
2. Create private ECR repositories named `care` and `care_fe`.
3. Make sure that the repositories are **mutable**.
4. Use the **Default Encryption Key** for the repositories.

## Setting Up SSM Documents

1. Navigate to the **SSM** service in the **AWS Console**.
2. Create a new document named `trigger-docker`.
3. Add the following content to the document:
```yaml
schemaVersion: "2.2"
description: "Trigger Docker Container"
mainSteps:
- action: "aws:runShellScript"
  name: "triggerDocker"
  inputs:
    runCommand:
    - "bash /home/ubuntu/trigger-docker.sh"
```
## Setting Up CodeCommit Repository

1. Navigate to the **CodeCommit** service in the **AWS Console**.
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

## Setting Up the CodeBuild Project

1. Navigate to the **Cloudbuild** service in the **AWS Console**.
2. Create a new build project named `deploy-care`.
3. Add the following build steps:
```yaml
version: 0.2
env:
  variables:
    AWS_DEFAULT_REGION: ap-south-1
    ACCOUNT_ID:  ${ACCOUNT_ID}
    INSTANCE_ID: ${INSTANCE_ID}
    BE_TAG: ${BE_TAG}
    FE_TAG: ${FE_TAG}
    METABASE_TAG: ${METABASE_TAG}
  git-credential-helper: yes

phases:
  install:
    commands:
      - echo "Installing necessary dependencies"
      - yum install -y unzip
      - echo "Environment Variables:"
      - echo "AWS_DEFAULT_REGION=${AWS_DEFAULT_REGION}"
      - echo "INSTANCE_ID=${INSTANCE_ID}"
      - echo "BE_TAG=${BE_TAG}"
      - echo "FE_TAG=${FE_TAG}"
      - echo "ACCOUNT_ID=${ACCOUNT_ID}"
      - echo "METABASE_TAG=${METABASE_TAG}"

  pre_build:
    commands:
      - LOGIN_PASSWORD=$(aws ecr get-login-password --region $AWS_DEFAULT_REGION)
      - echo $LOGIN_PASSWORD | docker login --username AWS --password-stdin ${ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com
      - git clone https://git-codecommit.ap-south-1.amazonaws.com/v1/repos/infra-name infra/
  build:
    commands:
      - echo "Building and pushing Docker images"

      # Build and Push the Backend Image
      - |
        if [[ -n "${BE_TAG}" ]]; then
          curl -L https://github.com/ohcnetwork/care/archive/${BE_TAG}.zip -o care.zip
          unzip care.zip
          mv care-${BE_TAG} care
          cp infra/build/plug_config.py. care/plug_config.py
          cp infra/build/. care
          DOCKER_BUILDKIT=1 docker build -f ./care/docker/prod.Dockerfile \
            -t ${ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/care:${BE_TAG} \
            -t ${ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/care:latest ./care
          docker push ${ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/care:${BE_TAG}
          docker push ${ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/care:latest
        fi

      # Build and Push the Frontend Image
      - |
        if [[ -n "${FE_TAG}" ]]; then
          curl -L https://github.com/ohcnetwork/care_fe/archive/${FE_TAG}.zip -o care_fe.zip
          unzip care_fe.zip
          mv care_fe-${FE_TAG} care_fe
          cp infra/build/react.env care_fe/.env.local
          DOCKER_BUILDKIT=1 docker build -f ./care_fe/Dockerfile \
            -t ${ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/care_fe:${FE_TAG} \
            -t ${ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/care_fe:latest ./care_fe
          docker push ${ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/care_fe:${FE_TAG}
          docker push ${ACCOUNT_ID}.dkr.ecr.${AWS_DEFAULT_REGION}.amazonaws.com/care_fe:latest
        fi

  post_build:
    commands:
      - echo "Writing environment variables to JSON file..."
      - |
        aws ssm send-command \
          --document-name "AWS-RunShellScript" \
          --targets "Key=instanceids,Values=${INSTANCE_ID}" \
          --parameters "{\"commands\":[
            \"echo '{\\\"ACCOUNT_ID\\\": \\\"${ACCOUNT_ID}\\\", \\\"AWS_DEFAULT_REGION\\\": \\\"${AWS_DEFAULT_REGION}\\\", \\\"LOGIN_PASSWORD\\\": \\\"${LOGIN_PASSWORD}\\\"}' > /tmp/env_vars.json\"
          ]}"
      - echo "Environment variables written to /tmp/env_vars.json"
      - aws ssm send-command --document-name "trigger-docker" --targets "Key=instanceids,Values=${INSTANCE_ID}"

```
4. Select **Amazon Linux** as the operating system.
5. Enable **CloudWatch** logs.
6. Utilize the default service role and permit AWS to append necessary permissions to the role.
7. Establish the environment variables `ACCOUNT_ID` and `INSTANCE_ID` in the build project settings.
8. Clone the `care-docker` repository using **git**.
9. Populate the `.env` values with the required values.
10. Generate the file `trigger-docker.sh` with the following content:
```bash
#!/bin/bash

# Define variables
ENV_FILE="/tmp/env_vars.json"
DOCKER_COMPOSE_DIR="/home/ubuntu/care-docker"
LOG_DIR="/var/log/docker-operations"
LOG_FILE="$LOG_DIR/docker-operations.log"
PULL_LOG_FILE="$LOG_DIR/docker-compose-pull.log"
UP_LOG_FILE="$LOG_DIR/docker-compose-up.log"
DOWN_LOG_FILE="$LOG_DIR/docker-compose-down.log"
MAX_LOG_SIZE=10M
BACKUP_COUNT=5

# Ensure log directory exists
mkdir -p "$LOG_DIR"

# Function for logging
log() {
    echo "$(date '+%Y-%m-%d %H:%M:%S') - $1" >> "$LOG_FILE"
}

# Function to rotate logs
rotate_log() {
    if [ -f "$1" ] && [ $(du -b "$1" | cut -f1) -ge $(numfmt --from=iec $MAX_LOG_SIZE) ]; then
        for i in $(seq $((BACKUP_COUNT-1)) -1 1); do
            [ -f "${1}.$i" ] && mv "${1}.$i" "${1}.$((i+1))"
        done
        mv "$1" "${1}.1"
        touch "$1"
    fi
}

# Rotate logs before starting
rotate_log "$LOG_FILE"
rotate_log "$PULL_LOG_FILE"
rotate_log "$UP_LOG_FILE"

# Read environment variables
if [ ! -f "$ENV_FILE" ]; then
    log "Error: Environment file $ENV_FILE not found"
    exit 1
fi

eval $(cat "$ENV_FILE" | jq -r '@sh "ACCOUNT_ID=\(.ACCOUNT_ID) AWS_DEFAULT_REGION=\(.AWS_DEFAULT_REGION) LOGIN_PASSWORD=\(.LOGIN_PASSWORD)"')

if [ -z "$ACCOUNT_ID" ] || [ -z "$AWS_DEFAULT_REGION" ] || [ -z "$LOGIN_PASSWORD" ]; then
    log "Error: Required environment variables are not set"
    exit 1
fi

# Perform Docker login
log "Attempting Docker login"
if echo "$LOGIN_PASSWORD" | docker login --username AWS --password-stdin "$ACCOUNT_ID.dkr.ecr.$AWS_DEFAULT_REGION.amazonaws.com" > /dev/null 2>&1; then
    log "Docker login successful"
else
    log "Error: Docker login failed"
    exit 1
fi

# Change to the Docker Compose directory
if ! cd "$DOCKER_COMPOSE_DIR"; then
    log "Error: Failed to change to directory $DOCKER_COMPOSE_DIR"
    exit 1
fi

# Perform Docker pull
log "Starting Docker pull"
if docker compose pull >> "$PULL_LOG_FILE" 2>&1; then
    log "Docker pull successful"
else
    log "Error: Docker pull failed. Check the log file at $PULL_LOG_FILE"
    exit 1
fi

# Perform Docker Compose down
log "Stopping existing containers"
if docker compose down >> "$DOWN_LOG_FILE" 2>&1; then
    log "Docker Compose down successful"
else
    log "Error: Docker Compose down failed. Check the log file at $DOWN_LOG_FILE"
    exit 1
fi

# Perform Docker Compose up
log "Starting Docker Compose up"
if docker compose up -d >> "$UP_LOG_FILE" 2>&1; then
    log "Docker Compose up successful"
else
    log "Error: Docker Compose up failed. Check the log file at $UP_LOG_FILE"
    exit 1
fi

log "Script completed successfully"
```
11. Make the script executable by executing the command `chmod +x trigger-docker.sh`.

# Setting Up the IAM Role and User Policies

### ssm-iam-ec2
- Create a user named `ssm-iam-ec2` and add the policies `AmazonSSMFullAccess` and `AmazonSSMManagedInstanceCore`.
- Attach the policy to the EC2 instance in the **IAM Role** field.

### codebuild-iam-role
- Add the policies `AmazonSSMFullAccess`, `AmazonSSMManagedInstanceCore`, `AWSCodeCommitReadOnly`, and `AmazonEC2ContainerRegistryFullAccess` to the role created during the Cloud Build setup, in addition to the default permissions set automatically.
