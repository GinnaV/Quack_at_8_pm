document.getElementById('feedback-form').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the default form submission

    // Collect feedback data from the form
    const feedbackData = {
        interest: document.getElementById('service-interest').value,
        willingnessToPay: document.getElementById('willingness-to-pay').value,
        age: document.getElementById('age').value,
        location: document.getElementById('location').value
    };

    // Get existing feedback data from localStorage or initialize an empty array
    let feedbackList = JSON.parse(localStorage.getItem('feedbackData')) || [];

    // Add the new feedback to the existing list
    feedbackList.push(feedbackData);

    // Save the updated feedback data back to localStorage
    localStorage.setItem('feedbackData', JSON.stringify(feedbackList));

    // Log feedback data for verification
    console.log('Collected Feedback:', feedbackData);

    // Show the thank-you message
    document.getElementById('thank-you-message').style.display = 'block';

    // Optionally, reset the form for the user to submit more feedback
    document.getElementById('feedback-form').reset();

    // Update and display curated insights (you can call a function here to update insights)
    updateInsights(feedbackList);
});

// Function to display curated insights
function updateInsights(feedbackList) {
    // Example insights: number of responses, average willingness to pay, etc.
    let totalFeedback = feedbackList.length;
    let totalWillingnessToPay = feedbackList.reduce((sum, feedback) => sum + parseFloat(feedback.willingnessToPay), 0);
    let averageWillingnessToPay = totalWillingnessToPay / totalFeedback;

    // Update the report section on the page
    document.getElementById('insight-report').innerHTML = `
        <h2>Feedback Insights</h2>
        <p>Total Responses: ${totalFeedback}</p>
        <p>Average Willingness to Pay: $${averageWillingnessToPay.toFixed(2)}</p>
        <p>Most Popular Service: ${getMostPopularService(feedbackList)}</p>
    `;
}

// Function to get the most popular service (based on how many times each service is selected)
function getMostPopularService(feedbackList) {
    const serviceCounts = feedbackList.reduce((counts, feedback) => {
        counts[feedback.interest] = (counts[feedback.interest] || 0) + 1;
        return counts;
    }, {});

    const mostPopular = Object.entries(serviceCounts).reduce((max, [service, count]) => count > max.count ? { service, count } : max, { service: '', count: 0 });
    return mostPopular.service || 'No data yet';
}
