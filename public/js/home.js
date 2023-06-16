
// Variables
var currentPage = 1;
var rowsPerPage = 9; // Number of rows to display per page

// Function to display the current page
function displayPage(pageNumber) {
    var tableRows = document.querySelectorAll('#mytable tbody tr');


    // Calculate start and end indexes for the rows to display
    var startIndex = (pageNumber - 1) * rowsPerPage;
    var endIndex = startIndex + rowsPerPage;

    // Show/hide table rows based on the current page
    for (var i = 0; i < tableRows.length; i++) {
        if (i >= startIndex && i < endIndex) {
            tableRows[i].style.display = 'table-row';
        } else {
            tableRows[i].style.display = 'none';
        }
    }

    // Update current page indicator
    document.getElementById('current-page').textContent = 'Page ' + pageNumber;
}

// Function to navigate to the previous page
function goToPreviousPage() {
    if (currentPage > 1) {
        currentPage--;
        displayPage(currentPage);
    }
}

// Function to navigate to the next page
function goToNextPage() {
    var tableRows = document.querySelectorAll('#mytable tbody tr');
    var totalPages = Math.ceil(tableRows.length / rowsPerPage);

    if (currentPage < totalPages) {
        currentPage++;
        displayPage(currentPage);
    }
}

// Attach event listeners to pagination buttons
document.getElementById('prev-page').addEventListener('click', goToPreviousPage);
document.getElementById('next-page').addEventListener('click', goToNextPage);

// Display the initial page
displayPage(currentPage);

const searchInput = document.getElementById('searchbar');
const table = document.getElementById('mytable');

// Add event listener for the input keyup event
searchInput.addEventListener('keyup', function (event) {
    const searchTerm = event.target.value.toLowerCase();
    searchTable(searchTerm);
});

// Function to search table data
function searchTable(searchTerm) {
    const rows = table.getElementsByTagName('tr');

    // Loop through all the rows except the header row
    for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let found = false;

        // Loop through all the cells in the current row
        for (let j = 0; j < cells.length; j++) {
            const cellText = cells[j].textContent.toLowerCase();

            // Check if the cell text contains the search term
            if (cellText.includes(searchTerm)) {
                found = true;
                break;
            }
        }

        // Show/hide the row based on search term match
        if (found) {
            rows[i].style.display = '';
        } else {
            rows[i].style.display = 'none';
        }
    }
    if (searchTerm.trim() === '') {
        // Reload the page
        location.reload(true);
    }
}

const sideMenu = document.querySelector("aside");
const menuBtn = document.querySelector("#menu-btn");
const closeBtn = document.querySelector("#close-btn");

menuBtn.addEventListener('click', () => {
    sideMenu.classList.add('open');
});

closeBtn.addEventListener('click', () => {
    sideMenu.classList.remove('open');
});



// Calculate the stroke-dasharray value
const circle = document.getElementById('progress-circle');
const circleLength = 2 * Math.PI * circle.getAttribute('r');
circle.style.strokeDasharray = `${circleLength}`;

// Calculate the stroke-dashoffset value
const roomtypePercentage = roomtypeValue / 100;
const strokeDashoffset = circleLength - (circleLength * roomtypePercentage);
circle.style.strokeDashoffset = `${strokeDashoffset}`;



function validateForm() {
    var name = document.forms["Form"]["name"].value;
    var email = document.forms["Form"]["email"].value;
    var contact = document.forms["Form"]["contact"].value;
    var adult = document.forms["Form"]["adult"].value;
    var transactionid = document.forms["Form"]["transactionid"].value;
    var amount = document.forms["Form"]["amount"].value;

    // Validate name field
    if (name === "") {
        document.getElementById("nameErr").innerHTML = "Name is required.";
        return false;
    }
    // Validate email field
    if (email === "") {
        document.getElementById("emailErr").innerHTML = "Email is required.";
        return false;
    }

    // Validate contact number field
    if (contact === "" || contact.length < 7 || contact.length > 16) {
        document.getElementById("mobileErr").innerHTML = "Contact number should be between 7 to 15 digits";
        return false;
    }
                // Validate contact number field

    // Validate adult field
    if (adult === "" || parseInt(adult) < 1) {
        document.getElementById("adultErr").innerHTML = "At least 1 adult is required.";
        return false;
    }
    if (transactionid === "") {
        document.getElementById("mobileErr").innerHTML = "Transaction ID is required";
        return false;
    }
    if (amount === "") {
        document.getElementById("mobileErr").innerHTML = "Amount is required";
        return false;
    }

    return true;
}







