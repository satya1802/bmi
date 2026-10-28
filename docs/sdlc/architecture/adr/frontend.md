<!-- sdlc:auto:start adr -->
# ADR-0001: Use React 19 for Frontend

Status: Accepted  
Date: 2026-10-28

## Context and Problem Statement

Which Frontend technology does the project use? Decided in architecture v1.

## Considered Options

- React 19
- Vue
- Svelte

## Decision Outcome

Chosen option: React 19, because The whole product is one interactive page; React 19 handles live in-browser recalculation, the unit toggle, and inline validation cleanly, and renders a responsive layout for phones and desktops. All BMI arithmetic runs client-side here, so nothing is saved or transmitted.

## Consequences

React is heavier than strictly needed for a single calculator page, but it is the approved default and keeps the code familiar and maintainable; bundle size is trivial at this scope.
<!-- sdlc:auto:end adr -->