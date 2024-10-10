# Infrastructure Configuration

## Setting Up the Network and Creating a VPC

1. Navigate to the **VPC Network** service in the **Google Cloud Console**.
2. Select **Create VPC network** to initiate the creation of a new VPC. Name it `care-vpc`.
3. Enter the following values for the new VPC:
    - Maximum Transmission unit (MTU): `1460`
    - VPC network ULA internal IPv6 range: `Disabled`
    - Subnet creation mode: `Custom`
4. Create a new subnet with the following values:
    - Name: `cluster-snet`
    - Region: `asia-south1`
    - IP stack type: `IPv4 (single-stack)`
    - IPv4 range: `10.0.0.0/16`
    - Private Google Access: `On`
    - Flow logs: `Off`
5. Leave the default firewall rules.
6. Set the dynamic routing mode to `Regional`.
7. Use the following equivalent commands if you prefer to use the command line:
    - `gcloud compute networks create care-vpc --project=$PROJECT --subnet-mode=custom --mtu=1460 --bgp-routing-mode=regional`
    - `gcloud compute networks subnets create cluster-snet --project=$PROJRCT --range=10.0.0.0/16 --stack-type=IPV4_ONLY --network=care-vpc --region=asia-south1 --enable-private-ip-google-access`
8. Reserve a static IP address by navigating to **VPC Networks > IP Addresses > RESERVE EXTERNAL STATIC IP ADDRESS**.
9. Enter the following values for the static IP address:
    - Name: `pip-care`
    - Network Service Tier: `Premium`
    - IP version: `IPv4`
    - Type: `Regional`
    - Region: `asia-south1 (Mumbai)`
    - Attached to: `None`
10. Note down the IP address for future use.
11. Use the following equivalent command if you prefer to use the command line:
    - `gcloud compute addresses create pip-care --project=$PROJECT --region=asia-south1`

## Setting Up Databases

1. Go to the **Google Cloud Console** and find the **Cloud SQL** service.
2. Create a new database instance using the `PostgreSQL` engine.
3. For the first database:
    - Set the instance ID as `care-db`.
    - Use **Cloud SQL** for Authentication and provide a strong master password.
    - Set the Database version to `PostgreSQL 16`.
    - Choose **Enterprise** for the Cloud SQL edition.
    - Set the Region to `asia-south1` and the Primary zone to `asia-south1-a`.
    - Configure the machine with `2 vCPU`, `8 GB memory`, and `SSD storage of 20 GB`.
    - Enable automatic storage increases.
    - Under connections, set the Instance IP assignment to `Private IP` and associate it with `care-vpc`.
    - Disable `Public IP`.
    - Enable `Automated backups`, `point-in-time recovery`, and `deletion protection`.
    - Set the automated backup window to `2:30 AM - 6:30 AM` and the maintenance window to `Sunday`.
    - Once the instance is initialized, create a new database named `care`.
4. Repeat the above steps for the second database with the following changes:
    - Set the instance ID as `metabase-db`.
    - Configure the machine with `1 vCPU`, `3.75 GB memory`.
    - Create a new database named `metabase`.

## Configuring the Cloud Storage

1. Navigate to the **Cloud Storage** service in the **Google Cloud Console**.
2. Go to **buckets** and click on **create**.
3. Create a new bucket for facility images:
    - Name: `<prefix>-care-facility`
    - Location type: `Region`
    - Location: `asia-south1 (Mumbai)`
    - Default storage class: `Standard`
    - Public access prevention: `Off`
    - Access control: `Uniform`
    - Protection tools: `None`
4. Create a second bucket for patient data:
    - Name: `<prefix>-care-patient-data`
    - Location type: `Region`
    - Location: `asia-south1 (Mumbai)`
    - Default storage class: `Standard`
    - Public access prevention: `On`
    - Access control: `Uniform`
    - Protection tools: `Retention policy: 7 days`
5. Navigate to **Settings > Interoperability**.
6. Under **Access keys for service accounts**, click on **Create a key for a service account**.
7. Create a new service account:
    - Name: `care-bucket-access`
    - Role: `Storage Object Admin` under Cloud Storage
8. Click **Continue** then **Done**.
9. Select `care-bucket-access` and click on **create key**.
10. Note down the Access key and Secret for later use.

## Configuring CORS for Cloud Storage

1. Navigate to the **Cloud Storage** service in the **Google Cloud Console**.
2. Go to **buckets** and select the `<prefix>-care-facility` bucket.
3. Click on **Edit bucket permissions**.
4. Under **CORS configuration**, add the following rules:
    ```json
    [
        {
            "origin": ["*"],
            "responseHeader": ["Content-Type"],
            "method": ["GET", "HEAD", "PUT", "POST", "DELETE"],
            "maxAgeSeconds": 3600
        }
    ]
    ```
5. Click **Save**.
6. Repeat the above steps for the `<prefix>-care-patient-data` bucket.
7. Under **CORS configuration**, add the following rules:
    ```json
    [
        {
            "origin": ["care.example.com",],
            "responseHeader": ["Content-Type"],
            "method": ["GET", "HEAD", "PUT", "POST", "DELETE"],
            "maxAgeSeconds": 3600
        }
    ]
    ```
8. Click **Save**.
9. This can also be done using the `gsutil` command line tool:
    ```bash
    gsutil cors set cors.json gs://<prefix>-care-facility
    gsutil cors set cors.json gs://<prefix>-care-patient-data
    ```
    where `cors.json` contains the CORS configuration.

## Configuring the Google Kubernetes Engine (GKE) Cluster

1. Navigate to the **Kubernetes Engine** service in the **Google Cloud Console**.
2. Go to **clusters** and click on **create**.
3. Select the `Standard` mode for the new cluster.
4. Set the following values for the cluster basics:
    - Name: `care-gke`
    - Location type: `Zonal`
    - Zone: `asia-south1-a`
5. Under **Node pools**, select the `default pool` and set the number of nodes to `2`.
6. In the **Node pools > default pool > nodes** section, configure the machine as follows:
    - Machine configuration: `General purpose`
    - Series: `E2`
    - Machine type: `e2-standard-2` (2 vCPU, 8 GB memory)
7. In the **Node pools > default pool > networking** section, add `care-gke` to the Network tags.
8. In the **Node pools > Cluster > Networking** section, configure the network settings as follows:
    - Network: `care-vpc`
    - Node subnet: `cluster-snet`
    - Network access: `Public cluster`
9. Enable `HTTP load balancing`.
