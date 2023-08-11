// jiraAlignEpicEstimateRetrieval.js
//
// This script will extract all team level estimates from the Estimate tab of a Jira Align epic into a downloadable CSV file to be further processed in Excel.
//
// Usage:
// 1. Log into Jira Align
// 2. Open the browsers Dev Tools (in Chrome: More Tools > Developer Tools)
// 3. Paste the entire contents of this file into the Console tab
// 4. Import the output file into Excel

// The lists of Jira Align epics, program increments, and programs to extract data for
let epicList = [10266, 10265];
let piList = [291, 292, 293, 294];
let programList = [79, 81, 83, 119, 130, 132, 239, 242, 243, 245, 246, 247, 268, 280, 294];

let showProgressMessages = true;

outputArray = [];
outputArray[0] = "PI,Epic,Program,Team,Estimate (Team Weeks)"

loopCount = 1;

//function to generate download of results
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

for (const [epicKey, epicValue] of Object.entries(epicList)) {

    if (showProgressMessages) {
        console.log("--- Working on epic: ", epicValue);
    }

    for (const [piKey, piValue] of Object.entries(piList)) {

        if (showProgressMessages) {
            console.log("--- --- Working on pi: ", piValue);
        }

        for (const [programKey, programValue] of Object.entries(programList)) {

            if (showProgressMessages) {
                console.log("--- --- --- Working on program: ", programValue);
            }

            let reqURL = https: //<your instance>.jiraalign.com/privateapi/teamForecasts?itemType=2&itemId=;

            reqURL += epicValue;
            reqURL += "&releaseid=";
            reqURL += piValue;
            reqURL += "&programId=";
            reqURL += programValue;

            await $.ajax({
                url: reqURL,
                headers: {
                    'Access-Control-Allow-Origin': '*'
                },
                type: "GET",

                success: await
                function(result) {
                    results = result.results;

                    for (x = 0; x < results.length; x++) {
                        let currentResult = ""
                        currentResult += piValue + ","
                        currentResult += epicValue + ","
                        currentResult += "\"" + results[x].programName + "\","
                        currentResult += "\"" + results[x].teamName + "\","
                        currentResult += results[x].estimate

                        outputArray[loopCount] = currentResult;
                        loopCount++
                    }
                },
 
               error: function(error) {
                    console.log("ERROR: ", error);
                }
            })
        }
    }
}

outputArray = outputArray.join("\r\n");
downloadResults("JiraAlignEstimates.csv", outputArray);