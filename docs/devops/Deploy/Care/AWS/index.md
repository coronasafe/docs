# AWS
## Deploying Care on AWS using Cloud Console

This is a step-by-step guide to deploying the **Care** application on **AWS** using the **Cloud Console**. The deployment process involves the following steps:

  - [**Setting up the Infrastructure**](./1): This guide walks you through the steps required to set up the main infrastructure components in **AWS**.

  - [**Configuring the Deployment Pipeline**](./2): This section assists you in setting up the `codebuild` setup necessary for building the frontend images with a customised `react.env` and backend images with the required plugins specified in `plug_config.py`.

  - [**Triggering the Build Process**](./3): This guide provides the steps required to trigger the build process, push the images to **ECR**, and deploy the images to the **EC2** instance. It also demonstrates how to set up **GitHub Actions** for triggering the build process across multiple projects.
