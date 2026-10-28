# Sprint Plan

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start sprints -->
## Sprint 1: Sprint 1

Deliver core BMI calculation: input entry with validation, instant BMI value, WHO category, disclaimer, and in-browser-only data handling

Capacity: 20 points · Committed: 11

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-001 | Story | Enter height and weight | 3 | frontend-agent | — |
| US-002 | Story | See instant BMI value | 3 | frontend-agent | US-001 |
| US-003 | Story | See BMI category per WHO adult ranges | 2 | frontend-agent | US-002 |
| US-005 | Story | See informational, not-medical-advice disclaimer | 1 | frontend-agent | — |
| US-006 | Story | Values stay in the browser with nothing saved | 2 | frontend-agent | US-001 |

## Sprint 2: Sprint 2

Add metric/imperial unit toggle, responsive mobile/desktop layout, and confirm free, no-payment access

Capacity: 20 points · Committed: 9

| Key | Type | Title | Points | Role | Depends on |
|---|---|---|---|---|---|
| US-004 | Story | Toggle between metric and imperial units | 5 | frontend-agent | US-001, US-002 |
| US-007 | Story | Use the calculator on mobile and desktop browsers | 3 | frontend-agent | US-001, US-004 |
| US-008 | Story | Use the tool free of charge | 1 | frontend-agent | — |

## Unscheduled

_Nothing unscheduled._
<!-- sdlc:auto:end sprints -->
