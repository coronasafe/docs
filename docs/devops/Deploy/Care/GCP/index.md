# GCP
## Deploying Care on GCP using Cloud Console

This is a step-by-step guide to deploying the **Care** application on **GCP** using the **Cloud Console**. The deployment process involves the following steps:

  - [**Setting up the Infrastructure**](./1): This guide walks you through the steps required to set up the main infrastructure components in **GCP**.

  - [**Configuring the Deployment Pipeline**](./2): This section assists you in setting up the `Cloud Build` setup necessary for building the frontend images with a customised `react.env` and backend images with the required plugins specified in `plug_config.py`.

  - [**Triggering the Build Process**](./3): This guide provides the steps required to trigger the build process, push the images to **Artifact Registry**, apply changes to the CRD's and update the Deplyments . It also demonstrates how to set up **GitHub Actions** for triggering the build process across multiple projects.
