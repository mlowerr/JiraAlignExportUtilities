# Jira Align Export Utilities

This repository currently contains a single JavaScript snippet intended to be pasted into the browser console while logged into Jira Align. The script fetches team-level epic estimates from the Jira Align UI/API and downloads them as a CSV for analysis in Excel or another spreadsheet tool.

## Contents

- `jiraAlignEpicEstimateRetrieval.js`: Console script that iterates through a list of epics, program increments, and programs to fetch team-level estimates, then downloads a CSV.

## Usage

1. Log into Jira Align in your browser.
2. Open Developer Tools (Chrome: **More Tools > Developer Tools**).
3. Open the **Console** tab.
4. Paste the contents of `jiraAlignEpicEstimateRetrieval.js` and press Enter.
5. Import the downloaded `JiraAlignEstimates.csv` into Excel or another tool.

## Configuration

Before running the script, update these values in `jiraAlignEpicEstimateRetrieval.js`:

- `epicList`: List of Jira Align epic IDs to extract.
- `piList`: Program increment names and IDs.
- `programList`: Program IDs to iterate through.
- `invStructureProgramMap`: Map of program IDs to investable structure names.
- `YOUR-SUBDOMAIN-HERE` and `YOUR-TOKEN-HERE`: Replace with your Jira Align subdomain and API bearer token.

## Notes

- The script uses the Jira Align APIs in the context of your logged-in browser session.
- The output CSV includes program names and team names, with estimates defaulting to 0 when missing.
