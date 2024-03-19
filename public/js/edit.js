// edit.js

document.addEventListener("DOMContentLoaded", () => {
  const userIdContainer = document.getElementById("userIdContainer");
  const userId = userIdContainer.innerText.trim();
  const planIdInput = document.getElementById("planId");
  const nameInput = document.getElementById("name");
  const travelDateInput = document.getElementById("travel_date");
  const activitiesListInput = document.getElementById("activities_list");
  const notesInput = document.getElementById("notes");
  const priorityInput = document.getElementById("priority");

  const urlParams = new URLSearchParams(window.location.search);
  const planId = urlParams.get("plan_id");

  // Fetch travel plan details
  async function fetchTravelPlan() {
    try {
      const response = await fetch(`/travel/get?id=${planId}`);
      if (response.ok) {
        const travelPlan = await response.json();
        displayTravelPlan(travelPlan);
      } else {
        console.error("Failed to fetch travel plan details");
      }
    } catch (error) {
      console.error("Error fetching travel plan details:", error.message);
    }
  }

  // Display travel plan details in the form
  function displayTravelPlan(travelPlan) {
    planIdInput.value = travelPlan._id;
    nameInput.value = travelPlan.name;

    // Convert travel_date string to Date object
    const travelDateParts = travelPlan.travel_date.split("-");
    const travelDate = new Date(
      parseInt(travelDateParts[2]), // year
      parseInt(travelDateParts[1]) - 1, // month (subtract 1 since months are zero-based)
      parseInt(travelDateParts[0]) + 1 // day
    );

    // Format the date as YYYY-MM-DD for input field
    const formattedDate = travelDate.toISOString().split("T")[0];
    travelDateInput.value = formattedDate;
    notesInput.value = travelPlan.notes;
    priorityInput.value = travelPlan.priority;

    const activitiesContainer = document.getElementById("activities");
    travelPlan.activities_list.forEach((activity, index) => {
      const activityDiv = document.createElement("div");

      const nameLabel = document.createElement("label");
      nameLabel.textContent = `Activity ${index + 1}: `;
      const nameInput = document.createElement("input");
      nameInput.type = "text";
      const activityArray = activity.split("$$$$");
      const activityName = activityArray[0];
      nameInput.value = activityName;
      activityDiv.appendChild(nameLabel);
      nameInput.classList.add("activity-name-input"); // Add class
      activityDiv.appendChild(nameInput);

      const timeLabel = document.createElement("label");
      timeLabel.textContent = " Time: ";
      const timeInput = document.createElement("input");
      timeInput.type = "text";
      timeInput.value = activityArray[1];
      timeInput.classList.add("activity-time-input"); // Add class
      activityDiv.appendChild(timeLabel);
      activityDiv.appendChild(timeInput);

      const expenseLabel = document.createElement("label");
      expenseLabel.textContent = " Expense: ";
      const expenseInput = document.createElement("input");
      expenseInput.type = "text";
      expenseInput.value = activityArray[2];
      expenseInput.classList.add("activity-expense-input"); // Add class
      activityDiv.appendChild(expenseLabel);
      activityDiv.appendChild(expenseInput);

      activitiesContainer.appendChild(activityDiv);
    });
  }

  // Function to handle plan submission
  window.submitEdit = async function () {
    console.log("called");
    const planId = planIdInput.value.trim();
    const name = nameInput.value.trim();
    const travel_date_data = travelDateInput.value.trim();
    const [year, month, day] = travel_date_data.split("-");
    const travel_date = `${day}-${month}-${year}`;
    // const activities_list = getActivitiesListInputValues();
    const notes = notesInput.value.trim();
    const priority = priorityInput.value.trim();

    const updatedactivities = [];

    const activitiesDivs = document.querySelectorAll("#activities div");

    activitiesDivs.forEach((div) => {
      const nameInput = div.querySelector(".activity-name-input");
      const timeInput = div.querySelector(".activity-time-input");
      const expenseInput = div.querySelector(".activity-expense-input");

      // Check if the inputs are found before accessing their values
      if (nameInput && timeInput && expenseInput) {
        const name = nameInput.value;
        const time = timeInput.value;
        const expense = expenseInput.value;
        updatedactivities.push(`${name}$$$$${time}$$$${expense}`);
      }
    });

    try {
      const response = await fetch(
        `/travel/edit?id=${planId}&name=${name}&travel_date=${travel_date}&activities_list=${updatedactivities}&notes=${notes}&priority=${priority}`,
        {
          method: "PUT",
        }
      );

      if (response.ok) {
        const updatedTravelPlan = await response.json();
        // Redirect to the action page after successful edit
        window.location.href = "/action";
      } else {
        console.error("Failed to edit travel plan");
      }
    } catch (error) {
      console.error("Error editing travel plan:", error.message);
    }
  };

  // Fetch travel plan details on page load
  fetchTravelPlan();
});
