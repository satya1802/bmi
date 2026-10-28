# Development

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
### DEV-PLAN-V1 · approved · source: plan:v1

Overall development plan for BMI, version 1, approved. Organizes all eight user stories into two sprints assigned to the frontend-agent role.

Plan status recorded as 'approved, version 1'. The plan contains two sprints: Sprint 1 (core BMI calculation) and Sprint 2 (units toggle, responsive layout, free-access confirmation). All backlog items (4 epics, 8 stories) are assigned role=frontend-agent; no items are unassigned at the story level (only the 4 epics show role=unassigned, which is expected since epics are containers).

**Related:** US-001, US-002, US-003, US-004, US-005, US-006, US-007, US-008

- ⚠ No actual implementation status (e.g. in-progress/done), code, commits, or PR references were provided for any item -- this entry documents only the approved plan, not execution.
- ⚠ No dates were given for plan approval or sprint start/end.

### DEV-SPRINT-1 · approved · source: plan:Sprint 1

Sprint 1 goal: deliver core BMI calculation -- input entry with validation, instant BMI value, WHO category, disclaimer, and in-browser-only data handling. Capacity planned at 20 points.

Sprint 1 goal (verbatim): 'Deliver core BMI calculation: input entry with validation, instant BMI value, WHO category, disclaimer, and in-browser-only data handling.' Capacity: 20 points. Backlog items assigned to this sprint per epic EPIC-001 (BMI Calculation and Result, unassigned role as an epic container):
- US-001 'Enter height and weight' (3 points, frontend-agent)
- US-002 'See instant BMI value' (3 points, frontend-agent)
- US-003 'See BMI category per WHO adult ranges' (2 points, frontend-agent)
Total planned points for listed stories: 8 of 20 capacity (disclaimer/data-handling aspects mentioned in the goal map to US-005/US-006, which are formally scheduled in Sprint 2 per the input -- see discrepancy note).

**Related:** US-001, US-002, US-003

- ⚠ Sprint 1's stated goal mentions 'disclaimer' and 'in-browser-only data handling', but the corresponding stories (US-005, US-006) are listed under Sprint 2 in the input, not Sprint 1 -- flagging this as a discrepancy between the sprint goal text and the actual item-to-sprint assignment for human confirmation.
- ⚠ No execution/completion status, code, or test results provided for US-001, US-002, or US-003.

### DEV-SPRINT-2 · approved · source: plan:Sprint 2

Sprint 2 goal: add metric/imperial unit toggle, responsive mobile/desktop layout, and confirm free, no-payment access. Capacity planned at 20 points.

Sprint 2 goal (verbatim): 'Add metric/imperial unit toggle, responsive mobile/desktop layout, and confirm free, no-payment access.' Capacity: 20 points. Backlog items assigned to this sprint:
- EPIC-002 'Metric and Imperial Units' (container, unassigned role) -> US-004 'Toggle between metric and imperial units' (5 points, frontend-agent)
- EPIC-003 'Disclaimer and Data Privacy' (container, unassigned role) -> US-005 'See informational, not-medical-advice disclaimer' (1 point, frontend-agent); US-006 'Values stay in the browser with nothing saved' (2 points, frontend-agent)
- EPIC-004 'Responsive Web Access' (container, unassigned role) -> US-007 'Use the calculator on mobile and desktop browsers' (3 points, frontend-agent); US-008 'Use the tool free of charge' (1 point, frontend-agent)
Total planned points for listed stories: 12 of 20 capacity.

**Related:** US-004, US-005, US-006, US-007, US-008

- ⚠ US-005 and US-006 (disclaimer, data privacy) are scheduled here, which conflicts with Sprint 1's goal text explicitly naming disclaimer and in-browser-only handling as Sprint 1 deliverables -- see discrepancy flagged in DEV-SPRINT-1.
- ⚠ No execution/completion status, code, or test results provided for US-004, US-005, US-006, US-007, or US-008.
<!-- sdlc:auto:end narrative -->
