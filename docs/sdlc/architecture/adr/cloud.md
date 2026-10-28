<!-- sdlc:auto:start adr -->
# ADR-0004: Use AWS for Cloud

Status: Accepted  
Date: 2026-10-28

## Context and Problem Statement

Which Cloud technology does the project use? Decided in architecture v1.

## Considered Options

- AWS
- GCP
- Azure

## Decision Outcome

Chosen option: AWS, because CloudFront plus an auto-scaling FastAPI host serves the responsive page cheaply worldwide and absorbs sudden traffic spikes without manual intervention (NFR-005), keeping the bill tiny at low traffic.

## Consequences

Managing CloudFront, ECS and RDS is more moving parts than a static-only host, but it is the approved default and gives spike resilience with scale-to-near-zero economics.
<!-- sdlc:auto:end adr -->