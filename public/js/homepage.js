document.addEventListener("DOMContentLoaded", () => {
  const menuOptions = document.querySelector(".menu-options");
  const createNewPlanLink = document.getElementById("createNewPlan");
  const viewActionsLink = document.getElementById("viewActions");
  const userIdContainerLink = document
    .getElementById("userIdContainer")
    .innerText.trim();

  const hamburgerIcon = document.querySelector(".hamburger-icon");

  hamburgerIcon.addEventListener("click", () => {
    menuOptions.classList.toggle("show");
  });

  // Toggle menu options on small screens when clicking outside the menu
  document.addEventListener("click", (event) => {
    if (
      window.innerWidth <= 768 &&
      !event.target.closest(".menu-bar") &&
      !event.target.classList.contains("hamburger-icon")
    ) {
      menuOptions.classList.remove("show");
    }
  });

  // Toggle menu options on small screens
  window.addEventListener("resize", () => {
    if (window.innerWidth > 768) {
      menuOptions.classList.remove("show");
    }
  });

  document.querySelector(".logo").addEventListener("click", () => {
    menuOptions.classList.toggle("show");
  });

  function formatDate(dateString) {
    const [day, month, year] = dateString.split("-");
    return new Date(`${year}-${month}-${day}`);
  }

  // Function to fetch and display travel plans
  async function fetchAndDisplayTravelPlans() {
    try {
      const response = await fetch(
        `/travel/getByUserId?userId=${userIdContainerLink}`
      );
      if (response.ok) {
        const travelPlans = await response.json();
        const travelPlansContainerHigh = document.getElementById(
          "travelPlansContainerHigh"
        );
        const travelPlansContainerLow = document.getElementById(
          "travelPlansContainerLow"
        );
        const travelPlansContainerPrevious = document.getElementById(
          "travelPlansContainerPrevious"
        );
        const currentDate = new Date();
        travelPlans.forEach((plan) => {
          const activitiesHTML = plan.activities_list
            .map((activity) => {
              const [name, time, expense] = activity.split("$$$$");
              return `${name}: ${time} : ${expense}$`;
            })
            .join(", ");

          const travelDate = formatDate(plan.travel_date);
          if (plan.priority === "high" && travelDate >= currentDate) {
            const planElement = createTravelPlanElement(plan, activitiesHTML);
            travelPlansContainerHigh.appendChild(planElement);
          } else if (plan.priority == "low" && travelDate >= currentDate) {
            const planElement = createTravelPlanElement(plan, activitiesHTML);
            travelPlansContainerLow.appendChild(planElement);
          } else {
            const planElement = createTravelPlanElement(plan, activitiesHTML);
            travelPlansContainerPrevious.appendChild(planElement);
          }
        });
      } else {
        console.error("Failed to fetch travel plans");
      }
    } catch (error) {
      console.error("Error fetching travel plans:", error.message);
    }
  }

  // Function to create a travel plan element
  function createTravelPlanElement(plan, activitiesHTML) {
    const planElement = document.createElement("div");
    planElement.classList.add("travel-plan");

    const planDetails = `
    <p><strong>Travel Plan Name:</strong> ${plan.name}</p>  
    <p><strong>Travel Plan Date:</strong> ${formatDate(plan.travel_date)}</p>
      <p><strong>Activities:</strong> ${activitiesHTML}</p>
      <p><strong>Notes:</strong> ${plan.notes}</p>
      <p><strong>Priority:</strong> ${plan.priority}</p>
    `;

    planElement.innerHTML = planDetails;

    return planElement;
  }

  // Fetch and display travel plans on page load
  fetchAndDisplayTravelPlans();
});
