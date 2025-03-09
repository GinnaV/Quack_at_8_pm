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

    // Reset the form without downloading anything
    document.getElementById('feedback-form').reset();
    slider.value = 20;
    sliderValue.textContent = `$20`;

    // Show the thank-you message
    document.getElementById('thank-you-message').style.display = 'block';
});

// ✅ Handle the slider value change
const slider = document.getElementById("willingness-to-pay-slider");
const sliderValue = document.getElementById("slider-value");

slider.addEventListener("input", function() {
    if (slider.value == 100) {
        sliderValue.textContent = `$100+`;
    } else {
        sliderValue.textContent = `$${slider.value}`;
    }
});

// ✅ Function to secretly save data without downloading
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
