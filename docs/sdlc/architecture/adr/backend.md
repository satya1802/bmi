<!-- sdlc:auto:start adr -->
# ADR-0002: Use FastAPI 0.115 for Backend

Status: Accepted  
Date: 2026-10-28

## Context and Problem Statement

Which Backend technology does the project use? Decided in architecture v1.

## Considered Options

- FastAPI 0.115
- Flask
- Node/Express

## Decision Outcome

Chosen option: FastAPI 0.115, because Serves the static SPA and a small health-check endpoint reliably to anonymous visitors, with room to add a server-side calculation endpoint later without changing the stack.

## Consequences

Backend does almost no work for the MVP, so FastAPI is underused today; the benefit is a consistent platform default and headroom for future endpoints.
<!-- sdlc:auto:end adr -->