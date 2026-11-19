import { acceptInvite, getUser, handleAuthCallback, login, oauthLogin, signup } from "@netlify/identity";

const byId = id => document.getElementById(id);
const form = byId("login-form");
const status = byId("status");
const heading = byId("heading");
const submit = byId("submit");
const google = byId("google");
const modeButton = byId("switch-mode");
const email = form.elements.email;
const password = form.elements.password;
let mode = "login";
let inviteToken = null;

function openSite() {
  window.location.replace("/app/");
}

function setMode(next) {
  mode = next;
  const signingIn = mode === "login";
  const invited = mode === "invite";
  heading.textContent = signingIn ? "Sign in to continue" : invited ? "Accept your invitation" : "Create an account";
  submit.textContent = signingIn ? "Sign in" : invited ? "Accept invitation" : "Create account";
  modeButton.textContent = signingIn ? "Create an account" : "Back to sign in";
  password.value = "";
  password.autocomplete = signingIn ? "current-password" : "new-password";
  byId("email-label").hidden = invited;
  email.disabled = invited;
  modeButton.hidden = invited;
  google.hidden = invited;
}

modeButton.addEventListener("click", () => {
  status.textContent = "";
  setMode(mode === "login" ? "signup" : "login");
});

google.addEventListener("click", async () => {
  google.disabled = true;
  status.textContent = "";
  try {
    await oauthLogin("google");
  } catch {
    status.textContent = "Google sign-in could not start. Please try again.";
    google.disabled = false;
  }
});

form.addEventListener("submit", async event => {
  event.preventDefault();
  submit.disabled = google.disabled = modeButton.disabled = true;
  status.textContent = "";
  try {
    if (mode === "signup") {
      const address = email.value.trim();
      await signup(address, password.value);
      if (await getUser()) return openSite();
      setMode("login");
      status.textContent = "Check your inbox for a confirmation link. Then sign in.";
    } else if (mode === "invite") {
      await acceptInvite(inviteToken, password.value);
      openSite();
    } else {
      await login(email.value.trim(), password.value);
      openSite();
    }
  } catch {
    status.textContent = mode === "login"
      ? "Sign-in failed. Check your email, password, and email confirmation."
      : "We could not create the account. Check your details or contact AstroAnimez.";
  } finally {
    submit.disabled = google.disabled = modeButton.disabled = false;
  }
});

try {
  const result = await handleAuthCallback();
  if (result?.type === "invite" && result.token) {
    inviteToken = result.token;
    setMode("invite");
    status.textContent = "";
  } else if (await getUser()) {
    openSite();
  } else {
    status.textContent = "";
  }
} catch {
  status.textContent = "We could not complete sign-in. Please try again.";
} finally {
  submit.disabled = google.disabled = modeButton.disabled = false;
}
