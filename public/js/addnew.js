// addnew.js
const userId = document.getElementById("userIdContainer").innerText.trim();

function addActivity() {
  const activitiesContainer = document.getElementById("activitiesContainer");
  const newActivitiesRow = document.createElement("div");
  newActivitiesRow.className = "activity-row";
  newActivitiesRow.innerHTML = `
        <input type="text" class="activity_name" placeholder="Activity Name" required />
        <input type="text" class="activity_time" placeholder="Activity Time" required />
        <input type="text" class="activity_expense" placeholder="Activity Expense" required />
    `;
  activitiesContainer.appendChild(newActivitiesRow);
}

function submitTravel() {
  const name = document.getElementById("name").value.trim();
  const travel_date_data = document.getElementById("travel_date").value.trim();
  const [year, month, day] = travel_date_data.split("-");

  // Format the date as "DD-MM-YYYY"
  const travel_date = `${day}-${month}-${year}`;
  console.log(travel_date);
  const notes = document.getElementById("notes").value.trim();
  const priority = document.getElementById("priority").value.trim();

  const activities_list = [];
  const activityRows = document.querySelectorAll(".activity-row");
  activityRows.forEach((row) => {
    const activityName = row.querySelector(".activity_name").value.trim();
    const activityTime = row.querySelector(".activity_time").value.trim();
    const activityExpense = row.querySelector(".activity_expense").value.trim();

    if (activityName && activityTime && activityExpense) {
      activities_list.push(
        `${activityName}$$$$${activityTime}$$$$${activityExpense}`
      );
    }
  });

  if (!name || !travel_date || !notes || activities_list.length === 0) {
    alert("Please fill in all fields and add at least one activity.");
    return;
  }

  const activityData = {
    name,
    travel_date,
    notes,
    priority,
    activities_list,
    user_id: userId,
  };

  //   Make API call to submit the recipe
  fetch("/travel/add", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(activityData),
  })
    .then((response) => {
      if (response.ok) {
        alert("Plan added successfully!");
        // Redirect to your desired page after successful submission
        window.location.href = "/homepage";
      } else {
        throw new Error("Plan submission failed. Please try again.");
      }
    })
    .catch((error) => alert(error));
}
