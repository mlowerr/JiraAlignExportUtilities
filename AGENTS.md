# Agent Guidance for Jira Align Export Utilities

## Project overview
- This repository contains a single JavaScript snippet designed to be pasted into the Jira Align browser console.
- The script pulls team-level epic estimates from Jira Align and downloads them as a CSV for spreadsheet analysis.

## Key files
- `jiraAlignEpicEstimateRetrieval.js`: Main console script; update IDs, tokens, and mappings here.
- `README.md`: User-facing documentation describing usage and configuration.

## Development workflow notes
- There is no build system, package manager, or automated test suite in this repository.
- Validate changes by re-reading the script for correctness and ensuring documentation stays in sync with script behavior.

## Required maintenance steps
- After completing each work request, review **and update this AGENTS.md** to capture any new project context or workflow details learned.
- Every time you run, **review and update the README.md** so documentation stays current with the codebase.
