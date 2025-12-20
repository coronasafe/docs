# Contributing to CARE Frontend

Thanks for considering contributing to CARE! This guide consolidates our workflow and development practices to help you get started.

## Getting Started

### Prerequisites

You'll need:
- Node.js (LTS version recommended)
- npm (comes with Node.js)

Check your versions:
```bash
node -v
npm -v
```

### Local Setup

1. Fork the repository to your GitHub account

2. Clone your fork:
```bash
git clone https://github.com/<your-username>/care_fe.git
cd care_fe
```

3. Install dependencies:
```bash
npm install
```

This will also run postinstall scripts to set up platform dependencies and generate headers.

### Backend Setup

You need the CARE backend running locally. Follow the [backend setup documentation](https://care-be-docs.ohc.network/) to get it running.

Create a `.env.local` file in the project root:
```env
REACT_CARE_API_URL=http://127.0.0.1:9000
```

Once the backend is loaded with dummy data, use these credentials:

```
ROLE              USERNAME                PASSWORD
---------------------------------------------------------------
Volunteer         volunteer_2_0           Coronasafe@123
Doctor            doctor_2_0              Coronasafe@123
Staff             staff_2_0               Coronasafe@123
Nurse             nurse_2_0               Coronasafe@123
Administrator     administrator_2_0       Coronasafe@123
Facility Admin    facility_admin_2_0      Coronasafe@123
```

**Important:** Never commit `.env` or `.env.local` files (they're already in `.gitignore`).

## Development Workflow

### Branch Naming

Create a new branch from `develop` following this format:
```
issues/{issue-number}/{short-description}
```

Example:
```bash
git checkout develop
git pull origin develop
git checkout -b issues/14890/add-contributing-guide
```

### Running the App

Start the development server:
```bash
npm run dev
```

Visit `http://localhost:4000` in your browser. The page reloads automatically when you make changes. Lint errors show up in the console.

### Code Style & Linting

We use ESLint, Prettier, and Husky for code quality. The linting rules are **stricter during pre-commit** than during development.

Run lint checks:
```bash
npm run lint
```

Auto-fix issues:
```bash
npm run lint-fix
```

Format code:
```bash
npm run format
```

**Pre-commit hooks:** When you commit, `lint-staged` automatically runs:
- Prettier formatting (with Tailwind and import sorting plugins)
- ESLint with stricter rules (`PRE_COMMIT=true`)
- Locale sorting for translation files

If pre-commit checks fail, your commit will be rejected. Fix the issues and try again.

### Important Linting Rules

From our `eslint.config.mjs`, note these key rules:

- **No relative imports:** Use `@/` prefix instead of relative paths like `../../`
- **i18n translations required:** All user-facing strings must use `t()` - this is a warning in dev but an **error during pre-commit**
- **Undefined translation keys:** Translation keys must exist in `public/locale/en.json` - also enforced as error during pre-commit
- **TypeScript:** Unused vars must start with `_`, no explicit `any` (warn), deprecated APIs throw warnings

### Running Tests

We use Playwright for E2E testing. Make sure your local backend is running first.

Install Playwright browsers:
```bash
npm run playwright:install
```

Run tests:
```bash
npm run playwright:test              # Headless mode
npm run playwright:test:ui           # Interactive UI mode
npm run playwright:test:headed       # Visible browser
npm run playwright:show-report       # View HTML report
```

Test results go to `test-results/`, HTML reports to `playwright-report/`. See `tests/README.md` for more details.

### Translations

All user-facing text must be wrapped in i18n translations.

Add new translation keys to `public/locale/en.json` only. Don't add translations for other languages via PR - those are managed through Crowdin.

When you commit changes to locale files, `npm run sort-locales` runs automatically to keep keys organized.

### Commit Messages

Keep commits clear and descriptive. We don't enforce a strict format, but conventional style is preferred:

```bash
git commit -m "docs: add contributing guide"
git commit -m "fix: resolve ESLint warnings in UserProfile"
git commit -m "feat: add patient discharge summary export"
```

## Submitting a Pull Request

### Before Opening a PR

- Make sure all tests pass locally
- Run `npm run lint` and fix any errors
- Test your changes with the local backend
- If you changed UI, take screenshots (desktop + mobile if relevant)

### Opening the PR

1. Push your branch to your fork:
```bash
git push origin issues/{issue-number}/{short-description}
```

2. Open a pull request against the `develop` branch

3. Use this title format:
```
{emoji} #{issue-number} Short description
```

Example: `✨ #14890 Add CONTRIBUTING.md guide`

4. In the PR description:
   - Reference the issue with a closing keyword: `Closes #14890`
   - Add screenshots for UI changes (required)
   - Tag reviewers: `@ohcnetwork/care-fe-code-reviewers`

### After Submission

1. Reviewers will provide feedback - address any requested changes
2. Once approved, PR gets labeled **"Needs Testing"** for QA
3. After QA testing passes, it gets labeled **"Tested"**
4. PR is merged once all checks pass and approvals are obtained

## Additional Resources

- [CARE Documentation](https://care-fe-docs.ohc.network/)
- [API Documentation](https://careapi.ohc.network/api/swagger/)
- [Testing Guide](tests/README.md)
- [Backend Setup](https://care-be-docs.ohc.network/)

## Need Help?

- Check existing issues and PRs for similar problems
- Ask questions in the relevant issue before starting work on large changes
- Use the thumbs down button on any response to give feedback to maintainers

We appreciate your contributions to CARE! 🙏