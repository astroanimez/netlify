# Deploy AstroAnimez with sign-in

1. Extract the ZIP. Keep the folder structure. In a private Git repository, put the contents of the extracted project folder at the repository root so Netlify can find `netlify.toml` and `package.json`.
2. In the **existing** AstroAnimez project in Netlify, open **Project configuration → Build & deploy → Continuous deployment** and link the repository. Deploy the branch with these files. The configuration builds the scripts, publishes `public`, and deploys the access-checking Edge Function. An HTML-only drag-and-drop upload cannot install the access check.
3. Under **Identity → Registration → Registration preferences**, select **Open** if visitors should be able to create their own accounts. Use **Invite only** if the site is for people you approve. Under **Identity → Registration → External providers**, add **Google**. Leave email confirmation enabled for email/password signup.
4. Keep form detection enabled. Under **Forms**, verify that `contact` is active and that your Gmail notification is still configured.
5. In an incognito window, visit the homepage and then `/app/index.html` directly. Both should lead to sign-in. Create and confirm a test email account, then sign in. Sign out and repeat with **Continue with Google**. While signed in, submit a Contact test message and verify that it appears in Netlify and Gmail.

For future edits to the chart or Contact form, change `public/app/index.html` and push to the same branch. The root `public/index.html` is the login page. Keep both the Edge Function and the Netlify configuration in the project.
