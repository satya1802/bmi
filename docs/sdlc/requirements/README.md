# Product Requirements

> Maintained by QuorQ AI SDLC. Text between `sdlc:auto` markers is regenerated; anything outside them is yours and is kept.

<!-- sdlc:auto:start narrative -->
## Summary

### REQ-TECHSTACK-001 · approved · source: requirements:technology-stack

Product owner approved the technology stack to design against exactly: FastAPI 0.115 (backend), AWS (cloud), PostgreSQL 16 (database), React 19 (frontend). Requirements version 1, delivery scope marked 'lightweight'.

Rationale as given: FastAPI hosts the static app reliably for anonymous visitors and leaves room for an optional server-side calculation endpoint later, even though almost no backend work is needed since BMI math runs in-browser and nothing is saved. AWS is chosen for cheap low-traffic hosting that can absorb a sudden spike if the page is shared widely. PostgreSQL 16 is included only as future-proofing (e.g. anonymous usage counts) -- the product stores nothing today, so the database will sit effectively unused. React 19 drives the single interactive page: live recalculation, unit toggle, and a responsive layout for phones and desktops; the BMI formula itself is simple arithmetic that can run entirely client-side.

**Related:** EPIC-001, EPIC-002, EPIC-003, EPIC-004

- ⚠ Stack explicitly approved, but no architecture input yet translates it into concrete components, endpoints, or infra -- flagged under architecture phase.
- ⚠ PostgreSQL is approved but the requirements state it will be 'effectively unused' for this product as described; worth confirming with stakeholders whether it should be provisioned at all for v1.

### REQ-SCOPE-001 · approved · source: requirements:scope

Delivery scope is lightweight. In scope: height/weight entry, instant BMI calculation, WHO category result, metric/imperial toggle, not-medical-advice disclaimer, responsive layout, standard adult WHO formula, free use with no payments, and no server-side storage. Out of scope: saved BMI history/trend tracking, native mobile app.

This entry records the capability boundary as stated. All in-scope capabilities map to EPIC-001 through EPIC-004 below. Out-of-scope items (history/trend tracking, native iOS/Android app) are explicitly excluded and should not be designed or built.

### EPIC-001 · draft · source: requirements:EPIC-001

Core capability: an anonymous visitor enters height and weight and instantly sees BMI value and WHO category, using the standard adult formula (weight/height squared). No accounts, no sign-in, nothing saved between sessions.

US-001 [critical] Enter height and weight -- AC-001: page loads with numeric height/weight inputs, no account/sign-in required. AC-002: non-numeric or out-of-range input (negative, zero, empty) blocks the BMI result and shows an inline validation message. US-002 [critical] See instant BMI value -- AC-003: valid height+weight produce an immediate BMI using weight(kg)/height(m)^2, no page reload. AC-004: changing either value updates the displayed BMI. US-003 [high] See WHO category -- AC-005: result shows one of underweight/normal/overweight/obese. AC-006: boundary values (18.5, 25, 30) are assigned to a single correct category consistently. AC-007: only the standard adult formula is used -- no pediatric, age-, or sex-adjusted calculation (explicitly marked an open assumption in the source).

**Related:** US-001, US-002, US-003, NFR-002

- ⚠ AC-007 is explicitly flagged in the source as an open assumption -- no pediatric/age/sex-adjusted calculation should be confirmed with stakeholders before build.

### EPIC-002 · draft · source: requirements:EPIC-002

Calculator supports both metric (kg, cm) and imperial (lb, ft/in) units via a toggle. Epic is explicitly noted as reflecting an open assumption from the confirmed understanding.

US-004 [high] Toggle between metric and imperial units -- AC-008: a visible control switches between metric (kg, cm) and imperial (lb, ft/in). AC-009: imperial mode accepts feet/inches and pounds, BMI calculated correctly. AC-010: metric mode accepts centimetres and kilograms, BMI calculated correctly. AC-011: switching unit systems either converts existing values or clearly presents new unit fields so the resulting BMI stays correct.

**Related:** US-004, NFR-002

- ⚠ Entire epic is marked as an open assumption in the source and has not been separately confirmed by stakeholders.
- ⚠ Not specified whether switching units converts values automatically or clears fields (AC-011 allows either) -- design decision not yet made.

### EPIC-003 · draft · source: requirements:EPIC-003

Calculator shows a brief informational/not-medical-advice disclaimer and stores no personal or health data server-side; values exist only in-browser and are not retained between sessions.

US-005 [high] See disclaimer -- AC-012: a brief, clearly visible disclaimer states the result is informational only, not medical advice. US-006 [high] Values stay in the browser -- AC-013: entered height/weight are used only in-browser, never transmitted to or stored on a server (marked an open assumption). AC-014: reloading or returning in a new session retains no previously entered values or results, consistent with no saved history.

**Related:** US-005, US-006, NFR-001

- ⚠ AC-013 (no transmission/storage to a server) is explicitly flagged as an open assumption pending confirmation.
- ⚠ Epic description itself states these points are open assumptions from the confirmed understanding.

### EPIC-004 · draft · source: requirements:EPIC-004

Delivered as a free, responsive web app that works on mobile and desktop browsers; not a native mobile app; no payments or billing.

US-007 [high] Use on mobile and desktop browsers -- AC-015: mobile layout adapts, all elements legible/usable with no horizontal scrolling. AC-016: desktop layout adapts, all elements remain legible/usable. AC-017: delivered as a browser web page, not a native iOS/Android app (marked an open assumption). US-008 [medium] Use free of charge -- AC-018: no payment, subscription, or billing is ever requested; all functionality is free (marked an open assumption).

**Related:** US-007, US-008, NFR-003, NFR-004, NFR-005

- ⚠ AC-017 (web-only, no native app) and AC-018 (free of charge) are both explicitly flagged as open assumptions in the source.

### REQ-NFR-001 · draft · source: requirements:NFR-001

Privacy: height/weight are used only in-browser for calculation, never transmitted to or stored on a server, and nothing is retained after reload or in a new session.

Applies to US-006. No backend persistence of health data is expected under this NFR, which has implications for how little the approved PostgreSQL/FastAPI stack will actually be used.

**Related:** US-006

### REQ-NFR-002 · draft · source: requirements:NFR-002

Performance: BMI value and category are calculated and shown immediately once valid inputs exist, updating on any input or unit change, with no server round-trip or page reload.

Applies to US-002, US-003, US-004. Confirms the calculation must be fully client-side (consistent with the React-in-browser architecture rationale given for the approved stack).

**Related:** US-002, US-003, US-004

### REQ-NFR-003 · draft · source: requirements:NFR-003

Compatibility: available as a web page working correctly on both mobile and desktop browsers; explicitly not a native iOS/Android app.

Applies to US-007.

**Related:** US-007

### REQ-NFR-004 · draft · source: requirements:NFR-004

Usability: responsive layout keeps inputs, unit toggle, result, and disclaimer legible and usable, with no horizontal scrolling on small mobile screens.

Applies to US-007.

**Related:** US-007

### REQ-NFR-005 · draft · source: requirements:NFR-005

Scalability: hosting must serve the page reliably to anonymous visitors and absorb sudden traffic spikes without manual intervention.

Applies to the whole system. This is the stated driver for choosing AWS as the approved cloud platform.
<!-- sdlc:auto:end narrative -->

<!-- sdlc:auto:start summary -->
**Requirements version:** v1  
**Delivery scope:** lightweight  
**Approved:** 2026-10-28

**Capabilities in scope:** Height and weight entry, Instant BMI calculation, BMI category result (underweight, normal, overweight, obese), Metric and imperial unit toggle, Informational, not-medical-advice disclaimer, Responsive mobile and desktop layout, Standard adult BMI formula with WHO categories, Free to use, no payments or billing, No server-side storage; values stay in the browser

**Approved technology stack:**

| Layer | Choice | Rationale |
|---|---|---|
| backend | FastAPI | There is almost no backend work here — the BMI math happens in the browser and nothing is saved — but you still need something to serve the page reliably to anonymous visitors. FastAPI is the platform default and is more than capable of hosting this static app and any small health-check endpoint, with room to add a server-side calculation endpoint later if you ever want one. |
| cloud | AWS | A free, public tool for a general audience needs hosting that is cheap at low traffic and able to absorb a sudden spike if the page ever gets shared widely. AWS is the platform default and covers both: it can serve this responsive page to anonymous visitors worldwide and scale without you touching anything, while the tiny footprint of a calculator keeps the bill low. |
| database | PostgreSQL | Your product deliberately stores nothing — height and weight never leave the browser and no history is kept — so there is no data for a database to hold today. PostgreSQL is the platform default and the sensible choice to have in place only as future-proofing, if you ever decide to add something like anonymous usage counts. For the product as described, it will sit effectively unused. |
| frontend | React | The entire product is one interactive page: a visitor types height and weight, toggles between metric and imperial, and sees the BMI and its WHO category update instantly. React handles that live, in-the-browser recalculation and the unit toggle cleanly, and renders as a responsive page that works on phones and desktops as you require. Because the BMI formula is simple arithmetic, the calculation itself can run right in the browser, which is exactly what you want for a tool that saves nothing. |
<!-- sdlc:auto:end summary -->

<!-- sdlc:auto:start epics -->
## EPIC-001: BMI Calculation and Result

The core capability of the application: an anonymous visitor enters their height and weight and instantly sees their BMI value and its WHO category. Uses the standard adult BMI formula (weight / height squared). No accounts, no sign-in, nothing saved between sessions.

### US-001: Enter height and weight

**Priority:** critical

> As a anonymous visitor, I want to enter my height and weight into the calculator, so that the application has the inputs it needs to calculate my BMI.

| ID | Given | When | Then |
|---|---|---|---|
| AC-001 | I am on the BMI calculator page | the page loads | I see input fields for height and weight that I can type numeric values into, with no requirement to create an account or sign in |
| AC-002 | I am entering my measurements | I type a non-numeric or out-of-range value (for example a negative number, zero, or empty field) into height or weight | the application does not produce a BMI result and shows a clear inline validation message prompting me to enter a valid value |

### US-002: See instant BMI value

**Priority:** critical

> As a anonymous visitor, I want my BMI value to be calculated and displayed immediately once I have entered valid height and weight, so that I get my result without waiting or submitting to a server.

| ID | Given | When | Then |
|---|---|---|---|
| AC-003 | I have entered a valid height and weight | both values are present and valid | the application calculates and displays my BMI value using the standard adult formula (weight in kilograms divided by height in metres squared) without requiring a page reload |
| AC-004 | I have a calculated BMI displayed | I change either my height or weight to another valid value | the displayed BMI value updates to reflect the new inputs |

### US-003: See BMI category per WHO adult ranges

**Priority:** high

> As a anonymous visitor, I want to see which WHO category my BMI falls into, so that I can interpret what my BMI value means.

| ID | Given | When | Then |
|---|---|---|---|
| AC-005 | my BMI has been calculated | the result is displayed | the application shows the matching WHO adult category label: underweight, normal, overweight, or obese |
| AC-006 | a BMI value sits on a WHO category boundary (for example 18.5, 25, or 30) | the category is determined | the application assigns it to the correct single WHO category consistently with the standard adult ranges |
| AC-007 | the understanding states that only the standard adult BMI formula and WHO categories are used | I view the result | the application applies no pediatric, age-adjusted, or sex-adjusted BMI calculation (open assumption surfaced here) |

## EPIC-002: Metric and Imperial Units

The calculator supports both metric (kg, cm) and imperial (lb, ft/in) units, with the user selecting their preferred units via a toggle. This reflects an open assumption from the confirmed understanding.

### US-004: Toggle between metric and imperial units

**Priority:** high

> As a anonymous visitor, I want to choose whether I enter my height and weight in metric or imperial units, so that I can use the units I am familiar with.

| ID | Given | When | Then |
|---|---|---|---|
| AC-008 | I am on the BMI calculator page | the page loads | I see a control to switch between metric (kg, cm) and imperial (lb, ft/in) units |
| AC-009 | I have selected imperial units | I enter my height and weight | the height input accepts feet and inches and the weight input accepts pounds, and the BMI is calculated correctly for those units |
| AC-010 | I have selected metric units | I enter my height and weight | the height input accepts centimetres and the weight input accepts kilograms, and the BMI is calculated correctly for those units |
| AC-011 | I have entered valid measurements in one unit system | I switch to the other unit system | the application either converts my existing values or clearly presents fields for the newly selected units so that the resulting BMI remains correct |

## EPIC-003: Disclaimer and Data Privacy

The application shows a brief disclaimer that results are informational and not medical advice, and does not store any personal or health data server-side. Entered values exist only in the browser for the calculation and nothing is saved between sessions. These reflect open assumptions from the confirmed understanding.

### US-005: See informational, not-medical-advice disclaimer

**Priority:** high

> As a anonymous visitor, I want to see a disclaimer that the result is informational and not medical advice, so that I understand the limitations of the tool.

| ID | Given | When | Then |
|---|---|---|---|
| AC-012 | I am using the BMI calculator | I view the page and my result | a brief, clearly visible disclaimer states that the result is informational only and not medical advice |

### US-006: Values stay in the browser with nothing saved

**Priority:** high

> As a anonymous visitor, I want my entered height and weight to stay in my browser and not be saved anywhere, so that my health data remains private and is not stored.

| ID | Given | When | Then |
|---|---|---|---|
| AC-013 | I enter my height and weight | the BMI is calculated | the values are used only in the browser for the calculation and are not transmitted to or stored on a server (open assumption surfaced here) |
| AC-014 | I have calculated a BMI | I reload the page or return in a new session | none of my previously entered values or results are retained, consistent with no saved history or trend tracking |

## EPIC-004: Responsive Web Access

The calculator is delivered as a free, responsive web application that works in mobile and desktop browsers. It is free to use with no payments or billing, and is not delivered as a native mobile app. These reflect open assumptions from the confirmed understanding.

### US-007: Use the calculator on mobile and desktop browsers

**Priority:** high

> As a anonymous visitor, I want the calculator to display and work well on both mobile and desktop browsers, so that I can use it on whatever device I have.

| ID | Given | When | Then |
|---|---|---|---|
| AC-015 | I open the calculator on a mobile phone browser | the page loads | the layout adapts to the small screen so that inputs, the unit toggle, the result, and the disclaimer are all legible and usable without horizontal scrolling |
| AC-016 | I open the calculator on a desktop browser | the page loads | the layout adapts to the larger screen and all elements remain legible and usable |
| AC-017 | the understanding states the product is a responsive web app | I access the tool | it is available as a web page in a browser and not as a native iOS or Android app (open assumption surfaced here) |

### US-008: Use the tool free of charge

**Priority:** medium

> As a anonymous visitor, I want to use the BMI calculator without any payment, so that I can get my result at no cost.

| ID | Given | When | Then |
|---|---|---|---|
| AC-018 | I am using the BMI calculator | I enter my measurements and view my result | I am never asked to pay, subscribe, or provide billing details, and all functionality is available free of charge (open assumption surfaced here) |
<!-- sdlc:auto:end epics -->
