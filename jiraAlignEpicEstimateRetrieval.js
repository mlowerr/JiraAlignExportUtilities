// jiraAlignEpicEstimateRetrieval.js
//
// Author: Matthew Lowerr
//
// Description:
// This script will extract all team level estimates from the Estimate tab of a Jira Align epic into a downloadable CSV file to be further processed in Excel.
//
// Usage:
// 1. Log into Jira Align
// 2. Open the browsers Dev Tools (in Chrome: More Tools > Developer Tools)
// 3. Paste the entire contents of this file into the Console tab
// 4. Import the output file into Excel
// The lists of Jira Align epics, program increments, investable structures and programs to extract data for

// Update with all epics in scope for data retrieval
let epicList = [12213, 10604, 10660, 11900];

let piList = [{
    Name: "PI-17A",
    ID: 291
}, {
    Name: "PI-18A",
    ID: 292
}, {
    Name: "PI-19A",
    ID: 293
}, {
    Name: "PI-20A",
    ID: 294
}];

// programList and invStructureProgramMap values come from an inspection of the the dropdowns
let programList = [79, 81, 83, 119, 130, 132, 239, 242, 243, 245, 246, 247, 268, 280, 294];

let invStructureProgramMap = new Map();
invStructureProgramMap.set(INTEGER-VALUE-OF-PROGRAM, 'PROGRAM-NAME-HERE');

let showProgressMessages = true;

outputArray = [];
outputArray[0] = "PI,Investable Structure,Epic,Program,Team,Estimate (Team Weeks)"

loopCount = 1;

//Function to generate download of results
//from: https://stackoverflow.com/questions/3665115/how-to-create-a-file-in-memory-for-user-to-download-but-not-through-server
function downloadResults(downloadFileName, downloadContent) {
    var element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(downloadContent));
    element.setAttribute('download', downloadFileName);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
}

// Main program loop to retrieve and format data
for (const [epicKey, epicValue] of Object.entries(epicList)) {
    if (showProgressMessages) {
        console.log("--- Working on epic: ", epicValue);
    }

    //From the Epic, get the primaryProgramID to determine the investable structure originating the work
    let result = await fetch(`https://YOUR-SUBDOMAIN-HERE.jiraalign.com/rest/align/api/2/Epics/${epicValue}`, {
            method: 'GET',
            headers: {
                'Authorization': `Bearer YOUR-TOKEN-HERE`,
                'Content-Type': 'application/json'
            }
        })
        .then(response => {
            if (response.ok) return response.json();
            throw new Error(response.statusText);
        })

    invStructureOriginating = (invStructureProgramMap.has(result.primaryProgramId) ? invStructureProgramMap.get(result.primaryProgramId) : 0);

    for (const [piKey, piValue] of Object.entries(piList)) {
        if (showProgressMessages) {
            console.log("--- --- Working on pi: ", piValue.ID);
        }

        for (const [programKey, programValue] of Object.entries(programList)) {
            if (showProgressMessages) {
                console.log("--- --- --- Working on program: ", programValue);
            }
            
            //Get team level estimates for each program in scope
            let reqURL = https://YOUR-SUBDOMAIN-HERE.jiraalign.com/privateapi/teamForecasts?itemType=2&itemId= + epicValue;
            reqURL += "&releaseid=" + piValue.ID;
            reqURL += "&programId=" + programValue;
            
            let result = await fetch(reqURL, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                .then(response => {
                    if (response.ok) return response.json();
                    throw new Error(response.statusText);
                })
            
            resultArray = result.results;
            
            for (x = 0; x < resultArray.length; x++) {
                let currentResult = ""
                currentResult += piValue.Name + "," + invStructureOriginating + "," + epicValue + "," + "\"" + resultArray[x].programName + "\"," + "\"" + resultArray[x].teamName + "\"," + ((resultArray[x].estimate == null) ? 0 : resultArray[x].estimate)
                outputArray[loopCount] = currentResult;
                loopCount++
            }
        }
    }
}

outputArray = outputArray.join("\r\n");
downloadResults("JiraAlignEstimates.csv", outputArray);
