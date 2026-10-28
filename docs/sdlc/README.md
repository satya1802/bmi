# BMI — SDLC Documentation

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start overview -->
Simple BMI calculator

**Documentation version:** v2
<!-- sdlc:auto:end overview -->

## Contents

<!-- sdlc:auto:start contents -->
| Document | State |
|---|---|
| [Requirements](requirements/README.md) | v1 approved |
| [Architecture](architecture/README.md) | 13 entries |
| [Development](development/README.md) | 1 entry |
| [Testing](testing/README.md) | 1 entry |
| [Deployment](deployment/README.md) | 1 entry |
| [Maintenance](maintenance/README.md) | 1 entry |
| [Data model](architecture/data-model.md) | generated |
| [API (OpenAPI)](architecture/api/openapi.yaml) | generated |
| [Decisions (ADRs)](architecture/adr/README.md) | 4 decisions |
| [Sprint plan](development/sprint-plan.md) | 2 sprints |
| [Developer guide](development/developer-guide.md) | generated |
| [API reference](development/api-reference.md) | 1 route |
| [Test report](testing/test-report.md) | not run yet |
| [Tests](testing/test-cases.md) | 0 tests |
| [Deployment guide](deployment/deployment-guide.md) | not deployed yet |
| [Runbook](deployment/runbook.md) | not deployed yet |
| [Release notes](deployment/release-notes.md) | 0 releases |
| [Traceability matrix](traceability-matrix.md) | 8 requirements |
| [Changelog](CHANGELOG.md) | 2 versions |
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

- Input does not map individual components or decisions to specific requirement ids (US-001..US-008); traceability from this architecture to those requirements could not be confirmed beyond the implicit privacy/no-persistence framing.
- No explicit requirement id linkage given in input for this component.
- No concrete plan or requirement was provided for when/how this database would actually be used; its purpose is speculative future-proofing only.
- No requirement currently justifies the database's existence; its value is purely speculative/future-facing per the input.
- NFR-005 is referenced by the architecture input but is not among the known requirement keys (US-001..US-008) provided, so its source/origin outside this architecture doc could not be verified.

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
