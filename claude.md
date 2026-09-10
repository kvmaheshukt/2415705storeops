# CLAUDE Harness Orchestrator



\# CLAUDE Harness Orchestrator



agents:

&#x20; - planner: .harness/agents/planner.agent.md

&#x20; - generator: .harness/agents/generator.agent.md

&#x20; - evaluator: .harness/agents/evaluator.agent.md

&#x20; - monitor: .harness/agents/monitor.agent.md



sequence:

&#x20; - planner → generator → evaluator → monitor



routing:

&#x20; - PASS: advance to next sprint

&#x20; - FAIL: send feedback to generator

&#x20; - Escalate: after 3 failed iterations, notify developer



