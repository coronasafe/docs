# Deploy

## Getting Ready For First Deployment

1. SSH into the EC2 instance either via the AWS Console or your terminal.
2. clone care-docker repository from the GitHub.
3. Navigate to the `care-docker` directory.
4. Ensure that docker is installed on the instance.
5. We are now ready to trigger the cloud build pipeline we setup in the previous steps.
6. Navigate to the codebuild service in the AWS Console.
7. Select the `deploy-care` project.
8. Click on the `Start Build With Overrides` button.
9. Refer to the [Care Commit History](https://github.com/ohcnetwork/care/commits/production) and [Care FE Commit History](https://github.com/ohcnetwork/care_fe/commits/production) to fetch the commit hashes and replace it in the environment variables BE_TAG and FE_TAG respectively.
10. Click on the `Start Build` button.

## Setting Up Triggers

The build/deploy pipeline can be triggered directly from the console as mentioned above, however for triggering can be done using the AWS CLI as well.

  ```bash
    aws codebuild start-build --project-name deploy-care --environment-variables-override name=BE_TAG,value=<tag> name=FE_TAG,value=<tag>
    ```
This can be further automated by setting up a GitHub Action to trigger multiple codebuild projects.

**Prerequisites:**
- AWS Access Key ID and Secret Access Key for each project.
- Setup Access Key ID and Secret Access Key as GitHub Secrets.

```yaml
name: Trigger AWS CodeBuild for Multiple Projects

on:
  workflow_dispatch:
    inputs:
      BE_TAG:
        description: 'Backend Tag'
        required: true
        type: string
      FE_TAG:
        description: 'Frontend Tag'
        required: true
        type: string

jobs:
  trigger-codebuild-projects:
    strategy:
      matrix:
        project: [Example1, Example2, Example3, Example4]
    runs-on: ubuntu-latest
    steps:
    - name: Configure AWS credentials for ${{ matrix.project }}
      uses: aws-actions/configure-aws-credentials@v1
      with:
        aws-access-key-id: ${{ secrets[format('AWS_ACCESS_KEY_ID_{0}', matrix.project)] }}
        aws-secret-access-key: ${{ secrets[format('AWS_SECRET_ACCESS_KEY_{0}', matrix.project)] }}
        aws-region: ap-south-1
    - name: Trigger AWS CodeBuild for ${{ matrix.account }}
      run: |
        aws codebuild start-build \
          --project-name deploy-care \
          --environment-variables-override \
            name=BE_TAG,value=${{ github.event.inputs.BE_TAG }},type=PLAINTEXT \
            name=FE_TAG,value=${{ github.event.inputs.FE_TAG }},type=PLAINTEXT
```

## Applying Release Updates

The release updates can be applied by following the steps below:
1. Fetch the latest commit hash from the [Care Commit History](https://github.com/ohcnetwork/care/commits/production) and [Care FE Commit History](https://github.com/ohcnetwork/care_fe/commits/production).
2. Navigate to the deploy repository where the above mentioned GitHub Action is setup.
3. Click on the `Actions` tab.
4. Select the `Trigger AWS CodeBuild for Multiple Projects` workflow.
5. Click on the `Run Workflow` button.
6. Enter the latest commit hash for the backend and frontend.
7. Click on the `Run Workflow` button.

The above steps will trigger the build pipeline for the backend and frontend projects accross all the aws accounts setup in the GitHub Secrets.
