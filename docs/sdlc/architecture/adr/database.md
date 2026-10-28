<!-- sdlc:auto:start adr -->
# ADR-0003: Use PostgreSQL 16 for Database

Status: Accepted  
Date: 2026-10-28

## Context and Problem Statement

Which Database technology does the project use? Decided in architecture v1.

## Considered Options

- PostgreSQL 16
- No database

## Decision Outcome

Chosen option: PostgreSQL 16, because Provisioned as future-proofing for possible anonymous usage counts; the product stores no personal or health data today, so it sits effectively unused.

## Consequences

An idle database adds a small fixed cost with no current benefit, accepted only because it is the approved default and avoids a later migration if counts are added.
<!-- sdlc:auto:end adr -->