Section A — Intent Decomposition

We decomposed the StoreOps feature set into four sprint contracts:



Sprint 2: Bulk update endpoint for shift handovers



Sprint 3: SLA breach detection and escalation



Sprint 4: Regional rollup reporting



Sprint 5: Planogram task templating



Why these boundaries: Each sprint isolates a subsystem (activities, alerts, reports, programmes) to ensure modularity and testability.



Acceptance criteria: Structured using GIVEN/WHEN/THEN to ensure testability. Example:



GIVEN valid and invalid activity IDs



WHEN a PATCH request is made to /api/activities/bulk-status



THEN the response must include both success and failed arrays, and audit entries must exist for all attempted updates.



Diagram suggestion:



A Sprint decomposition diagram showing four boxes (Sprint 2, Sprint 3, Sprint 4, Sprint 5) connected to the central StoreOps feature. Each box lists its subsystem and acceptance criteria.



Section B — Governance Framework

Skill file strategy:



error-hierarchy.skill.md → enforces AppError usage



event-bus.skill.md → governs event publishing format



test-quality.skill.md → ensures GIVEN/WHEN/THEN acceptance criteria encoded in tests



repo-boundary.skill.md → enforces separation between service, routes, and repository layers



audit-log.skill.md → ensures audit entries are created for every update



reporting.skill.md → governs aggregation logic for reports



Audit trail:



.harness/reviews/ stores evaluator feedback and monitor logs for each sprint.



Accessible to all contributors.



Surfaces recurring issues (e.g., missing reset methods in repos).



Example skill rule:  

“All errors must use AppError hierarchy; raw Error throws are prohibited.”

Without this, error handling becomes inconsistent, making monitoring and escalation unreliable.



Diagram suggestion:



A Governance flow diagram showing Planner → Generator → Evaluator → Monitor, with .harness/reviews/ as the permanent archive.



Section C — Non‑Determinism Strategy

Evaluation dimensions:



Correctness (40%)



Compliance with architecture rules (30%)



Test coverage (20%)



Code hygiene (10%)



Hard gates:



No raw Error throws



All endpoints must have tests



EventBus publishing must follow schema



Verdict rules:  

Evaluator converts variable LLM output into deterministic PASS/FAIL.

Example: Generator produces bulk update code missing audit entries → FAIL verdict because hard gate violated.



Escalation path:



Triggered when FAIL verdict repeats across two iterations.



Escalation output includes sprint ID, failure mode, recommended fix.



Logged in run-log.md.



Diagram suggestion:



A Verdict decision tree showing Generator output → Evaluator checks → PASS/FAIL → Escalation if repeated FAIL.



Section D — Architectural Decisions

Decision 1: In‑memory repositories for sprints



Alternatives: Database integration vs. in‑memory stubs



Rationale: Lightweight, testable



Assumption: Persistence can be added later



Decision 2: EventBus as mandatory notification channel



Alternatives: Direct logging or email notifications



Rationale: Decoupling and extensibility



Assumption: EventBus infrastructure exists in StoreOps



Decision 3: GIVEN/WHEN/THEN acceptance criteria



Alternatives: Informal acceptance notes



Rationale: Formal structure ensures testability



Assumption: Contributors understand BDD‑style criteria



Diagram suggestion:



An Architecture decision matrix showing each decision, alternatives, rationale, and assumptions.

