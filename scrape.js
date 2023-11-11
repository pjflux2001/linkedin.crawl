var pageNum = 1;
var movedNum = false;
var dataArray = new Set();
var repeatID;

// Function to extract data from a person element
function extractData(personElement) {
    return {
        profileID: personElement.firstElementChild.href.split('?')[0].trim(),
    };
}

// Function to loop through people elements on the page
function loopThroughPeopleElements() {
    // Get all elements with the specified class name
    var peopleElements = document.getElementsByClassName("entity-result__title-text t-16");

    // Loop through each person element
    for (var i = 0; i < peopleElements.length; i++) {
        var data = extractData(peopleElements[i]);
        dataArray.push(data);
    }
    return dataArray;
}

// Function to scroll the window to the bottom
function scrollToBottom() {
    window.scrollTo(0, document.body.scrollHeight);
}

// Function to click on the next page button
function goToNextPage() {
	// Scroll to the bottom before changing the page
    scrollToBottom();

    // Sleep for 2 seconds
    setTimeout(function() {
	  console.log("Next Page . . .");
	  if(window.location.search.split('&')[2].includes("96") == true || window.location.search.split('&')[2].includes("97") == true)
	  	clearInterval(repeatID);
	}, 3000);

    // Handling next page logic
    var nextPageButton = document.getElementsByClassName("artdeco-pagination__indicator artdeco-pagination__indicator--number ember-view")[pageNum].getElementsByTagName("button")[0].click();
    console.log(pageNum);
    if(pageNum == 8) {
    	pageNum = 4;
    	movedNum = true;
    }
    if(movedNum == true && pageNum == 6) {
    	pageNum = 5;
    }
    pageNum = (pageNum + 1);

    // Check if the next page button exists
    if (nextPageButton) {

        // Click on the next page button
        nextPageButton.click();
        return true; // Successfully clicked on the next page button
    }

    return false; // No next page button found
}

// Function to create and print a table with the extracted data
function createAndPrintTable(dataArray) {
    // Create a table element
    var table = document.createElement("table");

    // Create a header row
    var headerRow = table.insertRow(0);
    var headers = Object.keys(dataArray[0]);

    // Add headers to the header row
    for (var i = 0; i < headers.length; i++) {
        var headerCell = headerRow.insertCell(i);
        headerCell.innerHTML = headers[i];
    }

    // Add data rows to the table
    for (var i = 0; i < dataArray.length; i++) {
        var dataRow = table.insertRow(i + 1);

        // Add data to the data row
        for (var j = 0; j < headers.length; j++) {
            var dataCell = dataRow.insertCell(j);
            dataCell.innerHTML = dataArray[i][headers[j]];
        }
    }

    // Print the table to the console
    console.table(dataArray);
}

// Main function to execute the entire process
function scrapeAndPrintData() {
    var dataArray = loopThroughPeopleElements();

    // Every cummulative print
    createAndPrintTable(dataArray);

    // Attempt to go to the next page
    var nextPageClicked = goToNextPage();

    // If successfully clicked on the next page button, recursively call the function again
    if (nextPageClicked) {
        setTimeout(scrapeAndPrintData, 2000); // Add a delay to allow the next page to load (adjust as needed)
    }
}

// Call the main function to start the process
repeatID = setInterval(scrapeAndPrintData, 5000);
