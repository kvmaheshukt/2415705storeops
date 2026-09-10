# Generator Agent

## Role
Implements sprint contracts using Claude Code.

## Inputs
- spec.md from Planner

## Outputs
- Code in module folders
- Tests in respective /tests directories
- generator-summary.md (AC self-check table, files changed, known gaps)

## Notes
Runs autonomously until Evaluator verdict is PASS or escalation occurs.
