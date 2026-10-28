# BMI — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
Simple BMI calculator

**Documentation version:** v1
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v1 approved |
| [Architecture](architecture/README.md) | 1 entry |
| [Development](development/README.md) | 1 entry |
| [Testing](testing/README.md) | 1 entry |
| [Deployment](deployment/README.md) | 1 entry |
| [Maintenance](maintenance/README.md) | 1 entry |
| [Data model](architecture/data-model.md) | not generated yet |
| [API (OpenAPI)](architecture/api/openapi.yaml) | not generated yet |
| [Decisions (ADRs)](architecture/adr/README.md) | 0 decisions |
| [Sprint plan](development/sprint-plan.md) | not generated yet |
| [Developer guide](development/developer-guide.md) | not generated yet |
| [API reference](development/api-reference.md) | 0 routes |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 0 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 8 requirements |
| [Changelog](CHANGELOG.md) | 1 version |
<!-- sdlc:auto:end contents -->

## Open gaps

<!-- sdlc:auto:start open-gaps -->
### Requirements

- Stack explicitly approved, but no architecture input yet translates it into concrete components, endpoints, or infra -- flagged under architecture phase.
- PostgreSQL is approved but the requirements state it will be 'effectively unused' for this product as described; worth confirming with stakeholders whether it should be provisioned at all for v1.
- AC-007 is explicitly flagged in the source as an open assumption -- no pediatric/age/sex-adjusted calculation should be confirmed with stakeholders before build.
- Entire epic is marked as an open assumption in the source and has not been separately confirmed by stakeholders.
- Not specified whether switching units converts values automatically or clears fields (AC-011 allows either) -- design decision not yet made.
- AC-013 (no transmission/storage to a server) is explicitly flagged as an open assumption pending confirmation.
- Epic description itself states these points are open assumptions from the confirmed understanding.
- AC-017 (web-only, no native app) and AC-018 (free of charge) are both explicitly flagged as open assumptions in the source.

### Architecture

- Architecture phase has not started -- no design artifacts, diagrams, or component breakdowns provided.
- No screen/UI inventory has been received, which also blocks producing the user_guide section.
- Unclear how (or whether) FastAPI, AWS, and PostgreSQL will concretely be used given the app's stated client-side-only, no-storage design -- needs architecture-phase clarification.

### Development

- Development phase has not started -- no planning or implementation records to document.
- No code exists yet to verify any acceptance criteria from the requirements phase.

### Testing

- Testing phase has not started -- no test plans or results to document.

### Deployment

- No deployment recorded yet -- the approved AWS hosting target has not been provisioned or documented as deployed.

### Maintenance

- Maintenance phase has not begun -- no post-deployment notes exist because there is no deployment yet.
<!-- sdlc:auto:end open-gaps -->
