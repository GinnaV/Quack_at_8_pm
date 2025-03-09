document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const age = document.getElementById('age-range').value;
    const checkboxes = document.querySelectorAll('input[name="programme-interest"]:checked');
    const programmeInterest = Array.from(checkboxes)
        .map(checkbox => checkbox.nextElementSibling.innerText)
        .join(', ');

    const willingnessToPay = slider.value == 100 ? '$100+' : `$${slider.value}`;

    const timestamp = new Date().toLocaleString();
    const csvLine = `"${timestamp}","${age}","${programmeInterest}","${willingnessToPay}"\n`;

    downloadCSV(csvLine);

    document.getElementById('feedback-form').reset();
    slider.value = 20;
    sliderValue.textContent = `$20`;

    document.getElementById('thank-you-message').style.display = 'block';
});

const slider = document.getElementById("willingness-to-pay-slider");
const sliderValue = document.getElementById("slider-value");

slider.addEventListener("input", function() {
    if (slider.value == 100) {
        sliderValue.textContent = `$100+`;
    } else {
        sliderValue.textContent = `$${slider.value}`;
    }
});

function downloadCSV(csvLine) {
    const csvHeader = "Timestamp,Age,Programme Interest,Willingness to Pay\n";
    const csvFileName = "feedback-data.csv";

    // Check if there's already CSV data in localStorage
    let existingCSV = localStorage.getItem('feedbackCSV') || csvHeader;
    existingCSV += csvLine;
    localStorage.setItem('feedbackCSV', existingCSV);

    // Create a downloadable CSV file
    const blob = new Blob([existingCSV], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = csvFileName;
    a.click();
    URL.revokeObjectURL(url);
}
