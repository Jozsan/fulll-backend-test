# fulll-backend-test

## Branch Organization

Each step of the technical test is developed in a dedicated branch:

| Branch   | Content                                                                   |
| -------- | ------------------------------------------------------------------------- |
| `step-1` | Domain, commands/queries, in-memory repositories, BDD tests               |
| `step-2` | CLI, PostgreSQL persistence, Cucumber profiles (in-memory / real infra)   |
| `step-3` | Code quality tooling and CI/CD proposal                                   |

> Each branch builds on the previous one: `step-3` therefore contains all the work.

## Prerequisites

- Node.js >= 20.6 (required for `--env-file`)
- Docker and Docker Compose (to run PostgreSQL locally)

## Installation

```bash
npm install
cp .env.example .env
```

Then adjust the variables in `.env` if needed (see `.env.example`).

## Database

Start PostgreSQL locally:

```bash
npm run dev:services
```

Apply the migrations:

```bash
npm run db:migrate
```

## CLI Usage

```bash
# Create a fleet for a user (prints the fleetId to standard output)
./fleet create <userId>

# Register a vehicle into a fleet
./fleet register-vehicle <fleetId> <vehiclePlateNumber>

# Localize a vehicle
./fleet localize-vehicle <fleetId> <vehiclePlateNumber> <lat> <lng>

# Locate a vehicle
./fleet locate-vehicle <vehiclePlateNumber>
```

## Tests

| Command                 | Description                                                                         |
| ----------------------- | ----------------------------------------------------------------------------------- |
| `npm test`              | All BDD scenarios (`default` profile), using **in-memory** persistence              |
| `npm run test:critical` | `@critical` scenarios only, run against **PostgreSQL** (`critical` profile)         |
| `npm run test:ut`       | Type checking (`tsc --noEmit`) followed by unit tests (Vitest)                      |

> `test:critical` requires a running and migrated PostgreSQL database (see the previous section).

## Step 3: Code Quality and CI/CD

### Code quality

#### [OXC](https://oxc.rs/)

Rust-based toolchain replacing ESLint + Prettier with a single, consistent setup.

- **Oxlint**: 50-100x faster than ESLint, so linting is nearly instant locally, in pre-commit and in CI.
- **Oxfmt**: same parser and config as the linter.

#### [SonarQube](https://www.sonarsource.com/fr/products/sonarqube/)

Complements the linter with what it can't see:

- Duplication, cognitive complexity, code smells and technical debt.
- Security hotspots and vulnerabilities (injections, hardcoded secrets).
- **Quality gate** on new code (coverage, new issues): blocks the merge so new code stays clean even if legacy isn't.

#### [Dependabot](https://github.com/dependabot)

- Automated PRs when a dependency is vulnerable (CVE) or outdated.
- Small, regular updates instead of one painful migration.
- Native to GitHub, a few lines of config; PRs are validated by the CI.

### CI/CD Process

Implemented with **GitHub Actions** (native PR checks).

**CI** (on each pull request):

1. `npm ci` with dependency cache.
2. `oxfmt --check` (formatting).
3. `oxlint --type-aware --type-check` (lint + TypeScript errors).
4. Tests with coverage.
5. SonarQube scan (quality gate).
6. Merge blocked if any step fails (branch protection).
