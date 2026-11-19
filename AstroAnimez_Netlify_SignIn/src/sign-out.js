import { logout } from "@netlify/identity";

const button = document.getElementById("sign-out");
button.addEventListener("click", async () => {
  const status = document.getElementById("session-status");
  button.disabled = true;
  status.hidden = true;
  try {
    await logout();
    window.location.replace("/");
  } catch {
    status.textContent = "Could not sign out. Please try again.";
    status.hidden = false;
    button.disabled = false;
  }
});
