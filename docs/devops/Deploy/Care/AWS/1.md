# Infrastructure Configuration

## Configuring the Virtual Private Cloud (VPC)

1. Access the **AWS Console** and locate the **VPC** service.
2. Initiate the creation of a new VPC by selecting the '**VPC and more**' option and name it `care-vpc`. This action will automatically generate a new VPC, along with associated subnets, route tables, and internet gateways.
3. The default settings will be applied automatically, but you can modify these according to your specific requirements.
4. Make sure **Internet Gateway** is attached to the VPC to enable external communication.

## Configuring the Relational Database Service (RDS)

1. From the **AWS Console**, navigate to the **RDS** service.
2. Create a new database instance using the `PostgreSQL` engine.
3. Assign DB cluster identifier as `care-db`
4. Set the Credential management as `Self managed` and provide the master username and password.
5. Set the Availability zone as Per requirement.
6. Configure the database instance size and storage capacity as needed.
7. Use the same VPC and subnet group that was created earlier.
8. Configure the security group to allow inbound traffic on port `5432` from all sources. (This can be restricted to the EC2 instance's internal IP address to enhance security.)
9. Set Public accessibility to `No` to restrict access to the database from the internet.

## Configuring the S3 Bucket

1. Locate the **S3** service in the **AWS Console**.
2. Create two new buckets and assign them the names `facility-data` and `patient-data`.
3. Adjust the permissions settings for each bucket: set `facility-data` to public and `patient-data` to private.
4. Configure the CORS policy for the `facility-data` and `patient-data` buckets to restrict access to specific domains after the deployment of the application.

## Configuring the Elastic Compute Cloud (EC2) Instance

1. Access the **EC2** service via the **AWS Console**.
2. Launch a new instance and select the `Ubuntu` image.
3. Choose the `t2.micro` instance type to remain within the free tier. (You can adjust this based on your requirements.)
4. Choose the VPC and subnet that were created earlier.
5. Configure the security group to allow inbound traffic on ports `22` `80` and `443` from all sources.
6. Assign a key pair to the instance to facilitate SSH access.
7. Configure the storage settings as required.
