document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();

    // Collect feedback data from the form
    const age = document.getElementById('age-range').value;
    const checkboxes = document.querySelectorAll('input[name="programme-interest"]:checked');
    const programmeInterest = Array.from(checkboxes)
        .map(checkbox => checkbox.nextElementSibling.innerText)
        .join(', ');

    const willingnessToPay = slider.value == 100 ? '$100+' : `$${slider.value}`;

    // Create the CSV line of data
    const timestamp = new Date().toLocaleString();
    const csvLine = `"${timestamp}","${age}","${programmeInterest}","${willingnessToPay}"\n`;

    // Store the data secretly in localStorage
    saveToLocalStorage(csvLine);

    // Hide the form
    document.getElementById('feedback-form').style.display = 'none';

    // Show the thank-you message and make it obvious
    const thankYouMessage = document.getElementById('thank-you-message');
    thankYouMessage.style.display = 'block';  // Make it visible
    thankYouMessage.style.position = 'absolute';  // Position it over the form
    thankYouMessage.style.top = '50%';  // Center it vertically
    thankYouMessage.style.left = '50%';  // Center it horizontally
    thankYouMessage.style.transform = 'translate(-50%, -50%)';  // Adjust for perfect centering
    thankYouMessage.style.backgroundColor = '#4CAF50';  // Green background for visibility
    thankYouMessage.style.color = 'white';  // White text color
    thankYouMessage.style.padding = '20px';  // Padding to make the message look nicer
    thankYouMessage.style.fontSize = '18px';  // Larger font size for clarity
    thankYouMessage.style.textAlign = 'center';  // Centered text

    // Redirect to home page after a delay (3 seconds)
    setTimeout(function() {
        window.location.href = '/'; // Adjust the path if necessary
    }, 1000); 
});

// Handle the slider value change
const slider = document.getElementById("willingness-to-pay-slider");
const sliderValue = document.getElementById("slider-value");

slider.addEventListener("input", function() {
    if (slider.value == 100) {
        sliderValue.textContent = `$100+`;
    } else {
        sliderValue.textContent = `$${slider.value}`;
    }
});

// Function to secretly save data without downloading
function saveToLocalStorage(csvLine) {
    const csvHeader = "Timestamp,Age,Programme Interest,Willingness to Pay\n";
    let existingCSV = localStorage.getItem('feedbackCSV') || csvHeader;
    existingCSV += csvLine;
    localStorage.setItem('feedbackCSV', existingCSV);
}

// ✅ SUPER SECRET TRIGGER TO DOWNLOAD THE FILE
document.addEventListener('keydown', function(event) {
    if (event.shiftKey && event.key === 'D') {
        downloadCSV();
    }
});

// ✅ If you also want a hidden button instead of Shift+D (Optional)
const hiddenButton = document.createElement('button');
hiddenButton.textContent = "Download Feedback Data";
hiddenButton.style.display = 'none';
hiddenButton.onclick = downloadCSV;
document.body.appendChild(hiddenButton);

// ✅ Function to download the CSV file
function downloadCSV() {
    const csvFileName = "feedback-data.csv";
    const existingCSV = localStorage.getItem('feedbackCSV');

    if (!existingCSV) {
        alert("No feedback data available yet.");
        return;
    }

    // Create a downloadable CSV file
    const blob = new Blob([existingCSV], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = csvFileName;
    a.click();
    URL.revokeObjectURL(url);

    // Optional: Clear the data after downloading if you want
    // localStorage.removeItem('feedbackCSV');
}
