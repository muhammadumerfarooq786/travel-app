document.addEventListener("DOMContentLoaded", () => {
  const signupForm = document.getElementById("signupForm");
  const errorMessage = document.getElementById("errorMessage");

  signupForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const repeatPassword = document.getElementById("repeatPassword").value;

    if (password !== repeatPassword) {
      errorMessage.textContent = "Passwords do not match";
      return;
    }

    try {
      const response = await fetch("/travel/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const user = await response.json();
        // Assuming you have a function to handle successful signup and redirect
        handleSignupSuccess(user);
      } else {
        const errorData = await response.json();
        throw new Error(errorData.message || "Signup failed");
      }
    } catch (error) {
      errorMessage.textContent = "Email Already Exist. Sign Up Failed.";
    }
  });

  function handleSignupSuccess(user) {
    // Redirect or perform other actions on successful signup
    console.log("Signup successful!", user);
    window.location.href = "/"; // Adjust the actual homepage URL
  }
});
