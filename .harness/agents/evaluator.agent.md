# Evaluator Agent

## Role
Review Generator output against standards.

## Inputs
- Generated code/tests
- generator-summary.md

## Outputs
- evaluator-feedback.md with structured verdict:
  - PASS / CONDITIONAL PASS / FAIL
  - File-level and line-level feedback

## Notes
Feedback is routed back to Generator or escalated to developer after 3 fails.
