# CARE Contributor's Guide

## Introduction to CARE

CARE is an open-source EMR system developed using Django Rest Framework for the backend and React TypeScript for the frontend. It aims to provide cost-effective, adaptable, and sustainable healthcare solutions.

## Prerequisites

Before you start contributing, it is recommended that you have a basic understanding of:

- Git and GitHub
- Web development (HTML, CSS, JavaScript)

## Getting Started with Web Development

If you have never coded before, we recommend taking the [WD101 Course](https://www.pupilfirst.school/courses/1802/curriculum) by pupilfirst.school, which covers the basics of web development.

## Learning Django and React

To get familiar with our tech stack, you can follow these courses:

- [DjangoForAll](https://school.ohc.network/courses/1844) for Django and DRF
- [ReactForAll](https://school.ohc.network/courses/1843) for React TypeScript

## Setting Up Your Environment

1. **Clone the Repositories**:
   ```sh
   git clone https://github.com/coronasafe/care.git
   git clone https://github.com/coronasafe/care_fe.git
   ```

2. **Install Dependencies**:
   - Follow the setup instructions in the `README.md` files for backend and frontend repositories.

## Understanding the Codebase

- **Backend (Django)**:
  - `care/` - Main application directory
  - `api/` - API endpoints
  - `models/` - Database models

- **Frontend (React)**:
  - `src/` - Source files
  - `components/` - Reusable components
  - `pages/` - Page components

## Coding Standards and Guidelines

- Follow PEP 8 for Python code.
- Use ESLint and Prettier for JavaScript and TypeScript.
- Write clear and concise commit messages.

## How to Contribute

1. **Find an Issue**:
   - Browse issues on [care](https://github.com/coronasafe/care/issues) and [care_fe](https://github.com/coronasafe/care_fe/issues).
   - Look for issues labeled `good first issue`.

2. **Claim the Issue**:
   - Comment on the issue explaining your approach and request to assign it to you.

3. **Work on the Issue**:
   - Fork the repository and create a new branch.
   - Start coding and commit your changes.
   - Write tests to ensure your changes work as expected.

4. **Submit a Pull Request (PR)**:
   - Open a draft PR as soon as you make some progress.
   - Request a review once your PR is ready.
   - Address feedback promptly.

## Communication

- Join our Slack at [slack.ohc.network](https://slack.ohc.network) for discussions and help.
- Be proactive in your communication and keep the community updated on your progress.

## Learning Resources

- [Django Documentation](https://docs.djangoproject.com/)
- [DRF Documentation](https://www.django-rest-framework.org/)
- [React Documentation](https://reactjs.org/)
- [TypeScript Documentation](https://www.typescriptlang.org/)

## Support

If you need help, you can:

- Check the project's documentation and FAQ.
- Ask questions in the relevant Slack channels.
- Look for help in the community forums.

## Frequently Asked Questions

### How to resolve merge conflicts?

Often, when you are working on a feature branch and the base branch gets updated in the original repository, conflicts may arise if both you and the base branch modified the same file or lines.

Follow these steps to resolve merge conflicts when syncing your feature branch with the latest changes from the develop branch in the org's repository:

1. Ensure you have the latest develop branch from the org's repository:

```bash
# First, verify that you have the org's repository added as a remote. You can check by running:
git remote -v

# If it's not added, you can add it using the following command:
git remote add upstream https://github.com/ohcnetwork/care_fe.git
git fetch upstream

# Merge the latest `develop` branch into your working branch
git merge upstream/develop
```

2. Resolve conflicts if any

If there are merge conflicts, git will pause and show the files with conflicts.

Open those files in your editor and look for lines like:
```
<<<<<<< HEAD
// Your changes
=======
// Changes from upstream
>>>>>>> upstream/develop
```

Resolve the conflicts by choosing which changes to keep or combining them as needed. You can use VS Code Editor to resolve these conflicts.

After resolving the conflicts, mark them as resolved and commit the merge:
```bash
git add .
git commit
```

That's it! Now you can push your changes.

## Code of Conduct

We expect all contributors to adhere to our Code of Conduct.

Thank you for contributing to CARE!

## Reference Index

**Introduction to CARE:**
- Brief overview of what CARE is and its impact.
- Purpose of the contributor's guide.

**Prerequisites:**
- Mention the basic prerequisites such as familiarity with Git, GitHub, and a basic understanding of web development.

**Setting Up Your Environment:**
- Detailed instructions on setting up the development environment for both frontend and backend.
- Links to installation guides for required software (Node.js, Python, Docker, etc.).
- Cloning the repository and initial setup commands.

**Understanding the Codebase:**
- Overview of the project structure for both frontend and backend.
- Key files and directories explained.

**Coding Standards and Guidelines:**
- Coding conventions and best practices.
- Linting and formatting tools used.
- Commit message guidelines.

**How to Contribute:**
- Step-by-step process on how to find and claim issues.
- Creating and working on branches.
- Writing and running tests.
- Submitting pull requests.
- Reviewing and addressing feedback.

**Communication:**
- How to use Slack and other communication channels effectively.
- Etiquette and expectations for community interactions.

**Learning Resources:**
- Additional resources for learning Django, DRF, React, and TypeScript.
- Open-source contribution tutorials and best practices.

**Support:**
- Where to find help if you get stuck (documentation, forums, Slack channels).

**Code of Conduct:**
- Link to the project's Code of Conduct and expectations for all contributors.
