// Load activities from local storage
document.addEventListener("DOMContentLoaded", function () {
    loadActivities();
    loadJournal();
});

// Add new activity
function addActivity() {
    let activityInput = document.getElementById("activityInput").value;
    if (activityInput === "") return;

    let activities = JSON.parse(localStorage.getItem("activities")) || [];
    activities.push(activityInput);
    localStorage.setItem("activities", JSON.stringify(activities));

    loadActivities();
}

// Load and display activities
function loadActivities() {
    let activities = JSON.parse(localStorage.getItem("activities")) || [];
    let activityList = document.getElementById("activityList");
    if (activityList) {
        activityList.innerHTML = activities.map(act => `<li>${act}</li>`).join("");
    }
}

// Save journal entry
function saveJournal() {
    let entry = document.getElementById("journalEntry").value;
    if (entry === "") return;

    let journal = JSON.parse(localStorage.getItem("journal")) || [];
    journal.push(entry);
    localStorage.setItem("journal", JSON.stringify(journal));

    loadJournal();
}

// Load and display journal entries
function loadJournal() {
    let journal = JSON.parse(localStorage.getItem("journal")) || [];
    let journalList = document.getElementById("journalList");
    if (journalList) {
        journalList.innerHTML = journal.map(entry => `<li>${entry}</li>`).join("");
    }
}
