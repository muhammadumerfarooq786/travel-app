// action.js

document.addEventListener("DOMContentLoaded", () => {
  const userIdContainer = document.getElementById("userIdContainer");
  const userId = userIdContainer.innerText.trim();

  const travelPlansBody = document.getElementById("travelPlansBody");

  // Function to fetch and display travel plans
  async function fetchAndDisplayTravelPlans() {
    try {
      const response = await fetch(`/travel/getByUserId?userId=${userId}`);
      if (response.ok) {
        const travelPlans = await response.json();
        displayTravelPlans(travelPlans);
      } else {
        console.error("Failed to fetch travel plans");
      }
    } catch (error) {
      console.error("Error fetching travel plans:", error.message);
    }
  }

  // Function to display travel plans in the table
  function displayTravelPlans(plans) {
    plans.forEach((plan) => {
      const activitiesHTML = plan.activities_list
        .map((activity) => {
          const [name, time, expense] = activity.split("$$$$");
          return `${name}: ${time} : ${expense}$`;
        })
        .join(", ");
      const row = document.createElement("tr");
      row.innerHTML = `
                <td>${plan.name}</td>
                <td>${plan.travel_date}</td>
                <td>${activitiesHTML}</td>
                <td>${plan.notes}</td>
                <td>${plan.priority}</td>
                <td>
                    <a href="/edit?plan_id=${plan._id}">Edit</a>
                    <a href="#" onclick="deletePlan('${plan._id}')">Delete</a>
                </td>
            `;
      travelPlansBody.appendChild(row);
    });
  }

  // Function to handle plan deletion
  window.deletePlan = async function (planId) {
    const confirmDelete = confirm("Are you sure you want to delete this plan?");
    if (confirmDelete) {
      try {
        const response = await fetch(`/travel/delete?id=${planId}`, {
          method: "DELETE",
        });
        if (response.ok) {
          // Refresh the page after deletion
          location.reload();
        } else {
          console.error("Failed to delete travel plan");
        }
      } catch (error) {
        console.error("Error deleting travel plan:", error.message);
      }
    }
  };

  // Fetch and display travel plans on page load
  fetchAndDisplayTravelPlans();
});
