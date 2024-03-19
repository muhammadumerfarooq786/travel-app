document.addEventListener("DOMContentLoaded", () => {
  const loginForm = document.getElementById("loginForm");
  const errorMessage = document.getElementById("errorMessage");

  loginForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch(
        "/travel/login?email=" + email + "&password=" + password,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        const user = await response.json();
        // Assuming you have a function to handle successful login and redirect
        handleLoginSuccess(user);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Login failed");
      }
    } catch (error) {
      errorMessage.textContent = "Incorrect Credentials";
    }
  });

  function handleLoginSuccess(user) {
    // Make API call to create session endpoint
    fetch("/travel/create-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userId: user._id,
        email: user.email,
      }),
    })
      .then((response) => {
        if (response.ok) {
          // Redirect to the homepage or perform other actions on successful login
          window.location.href = "/homepage";
          alert("Login successful");
        } else {
          throw new Error("Session creation failed.");
        }
      })
      .catch((error) => alert(error));
  }
});
