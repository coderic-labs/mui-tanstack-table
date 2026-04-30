# Workflow Rules

## Adding or modifying rules

Before writing to any `.claude/rules/` file:
1. Read all existing rule files to check for conflicts, duplicates, or contradictions with the new content.
2. If a conflict exists, surface it to the user and wait for a resolution before writing.
3. Prefer updating an existing rule file over creating a new one when the topic fits.

## Rules violations

If the user requests something that contradicts an active rule, do not silently comply or silently refuse. State which rule is in conflict and ask whether to proceed anyway or keep the rule intact.

## Task clarification

If a task is ambiguous — unclear scope, missing context, or multiple valid interpretations — ask clarifying questions before starting work. Keep asking until the user says to proceed. Do not make assumptions and start implementing.
