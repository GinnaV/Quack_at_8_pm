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
function saveFeed() {
    let entry = document.getElementById("journalEntry").value;
    if (entry.trim() === "") return; // Ignore empty posts
  
    // Retrieve existing feed posts or initialize an empty array
    let feed = JSON.parse(localStorage.getItem("feed")) || [];
  
    // Create a new feed post object with content and a timestamp
    let newPost = {
      content: entry,
      timestamp: new Date().toLocaleString()
    };
  
    // Add the new post to the feed array and store it back in localStorage
    feed.push(newPost);
    localStorage.setItem("feed", JSON.stringify(feed));
  
    // Clear the input field after saving the post
    document.getElementById("journalEntry").value = "";
  
    // Refresh the feed display with the new post
    loadFeed();
  }
  

// Load and display journal entries
function loadJournal() {
    let journal = JSON.parse(localStorage.getItem("journal")) || [];
    let journalList = document.getElementById("journalList");
    if (journalList) {
        journalList.innerHTML = journal.map(entry => `<li>${entry}</li>`).join("");
    }
}
