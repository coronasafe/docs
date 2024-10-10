# DigitalOcean

## Setting up VPC

- Navigate to the Networking tab in the DigitalOcean Console.
- Click on the VPC section.
- Click on the Create VPC button.
- Choose Datacenter region.
- Select Generate an IP range for me option.
- click on Create VPC.

## Setting up the Database

- Navigate to the Databases tab in the DigitalOcean Console.
- Click on the `Create Database` button.
- Select the required datacenter region.
- Select the VPC for the database (make sure the datacenter is same as the one of the VPC created above)
- Choose the PostgreSQL database engine.
- Select the CPU, plan and storage based on the requirements.
- choose a unique database name.
- Add tags for access control.
- click on the `Create Database Cluster` button.

## Setting up Spaces

- Navigate to the Spaces Objects Storage tab in the DigitalOcean Console.
- Click on the `Create a Space` button.
- Choose the datacenter region.
- Enable CDN for faster content delivery.
- Set bucket name and press on the `Create a Spaces Bucket`.

## Setting up the App Platform

- Decide the domain name for the app.
  - Care FE App: `care.example.com`
  - Care BE App: `care-api.example.com`

### 1. Deploy Care FE App
  - Fork the [care_fe](https://github.com/ohcnetwork/care_fe) repository from [ohcnetwork](https://github.com/ohcnetwork)
  - Select `Create App` option.
  - Set the Service Provider as GitHub
  - Choose `https://github.com/accountname/care_fe` as the source.

  - Set the environment variables.
    ```
    REACT_APP_API_URL: <care-api-url> // URL of the care backend, e.g. https://care-api.example.com
    ```
  - Set the build command as `npm run build`
  - Set output directory as **Auto**
  - Set custom pages as `index.html` for Catchall.
  - Click on the Deploy button.

  ---
### 2.Deploy Care BE App
  - Fork the [care](https://github.com/ohcnetwork/care) repository from [ohcnetwork](https://github.com/ohcnetwork)
  - Select `Create App` option.
  - Set the Service Provider as GitHub
  - Choose the repository `https://github.com/accountname/care` and branch as `production`.
  - Set the **global environment variables**.
  ```
    DJANGO_SETTINGS_MODULE=config.settings.production
    SNS_ACCESS_KEY=
    SNS_SECRET_KEY=
    CORS_ALLOWED_ORIGINS=["https://example.com"]
    DATABASE_URL=<db-url>
    SENTRY_ENVIRONMENT=
    SENTRY_TRACES_SAMPLE_RATE=
    SENTRY_PROFILES_SAMPLE_RATE=
    SENTRY_DSN=
    CELERY_BROKER_URL=redis://redis:6379
    REDIS_URL=redis://redis:6379
    BUCKET_PROVIDER=
    BUCKET_REGION=
    BUCKET_KEY=
    BUCKET_SECRET=
    BUCKET_HAS_FINE_ACL=True
    FILE_UPLOAD_BUCKET=care-data
    FILE_UPLOAD_BUCKET_ENDPOINT=
    FACILITY_S3_BUCKET=care-data
    FACILITY_S3_BUCKET_ENDPOINT=
    HCX_AUTH_BASE_PATH=
    HCX_ENCRYPTION_PRIVATE_KEY_URL=
    HCX_IG_URL=
    HCX_PARTICIPANT_CODE=
    HCX_PASSWORD=
    HCX_PROTOCOL_BASE_PATH=
    HCX_USERNAME=
    HCX_CERT_URL=
    JWKS_BASE64=
    ADDITIONAL_PLUGS=[{"name": "example_plugin", "package_name": "git+https://github.com/ohcnetwork/channgeme.git", "version": "@v0.0.0"}]
  ```
  - Expose the port as 9000
  - Set the run command to `gunicorn config.wsgi:application --workers 2 --bind :9000`
  - Deploy the app.

#### Additional Components

Care requires a few more components to function and they can be setup in the same app as care-be as additional components.

#### Care Celery Worker
   - Use the Create resource from the source option to add a new component.
   - Set the Service Provider as GitHub
   - Select the repository as `care` and branch as `production`.
   - Set the resource type to Worker instead of Web Service.
   - Set the run command as `celery --app=config.celery_app worker --max-tasks-per-child=6 -B --loglevel=info`
   - Deploy the app.
#### Care Celery Beat
   - Use the Create resource from the source option to add a new component.
   - Set the Service Provider as GitHub
   - Select the repository as `care` and branch as `production`.
   - Set the resource type to Job instead of Web Service.
   - Set the Job Trigger to run after every successful deployment.
   - Set the run command as `python manage.py migrate && python manage.py load_redis_index`
#### Redis
    - Use the Create resource from the source option to add a new component.
    - Set the Service Provider as Docker Hub.
    - Set the image as `redis-stack-server:6.2.6-v10`.
    - name the component as `redis`.
    - Expose the port as 6379 as an internal port.

---

## Setting up the Domain and CORS

1. Setting up the Domain
- Select the `care-fe` app.
- Navigate to the `Settings` tab.
- Click on the `Domains` section edit option.
- add the domain name and click on the `Add Domain` button.
- add cname records to the DNS dashboard.
2. Setting up CORS for storage bucket
- Navigate to the Spaces Objects Storage tab in the DigitalOcean Console.
- Click on the bucket created for the care app.
- Click on the settings tab.
- Add CORS configuration as below.
  ```json
  [
    {
      "AllowedHeaders": [
        "*"
      ],
      "AllowedMethods": [
        "GET",
        "POST",
        "PUT",
        "DELETE"
      ],
      "AllowedOrigins": [
        "https://example.com"
      ],
      "ExposeHeaders": []
    }
  ]
  ```
