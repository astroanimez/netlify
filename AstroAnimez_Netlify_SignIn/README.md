# Deploy AstroAnimez with sign-in

1. Extract the ZIP. Keep the folder structure. In a private Git repository, put the contents of the extracted project folder at the repository root so Netlify can find `netlify.toml` and `package.json`.
2. In the **existing** AstroAnimez project in Netlify, open **Project configuration → Build & deploy → Continuous deployment** and link the repository. Deploy the branch with these files. The configuration builds the scripts, publishes `public`, and deploys the access-checking Edge Function. An HTML-only drag-and-drop upload cannot install the access check.
3. Under **Identity → Registration → Registration preferences**, select **Open** if visitors should be able to create their own accounts. Use **Invite only** if the site is for people you approve. Under **Identity → Registration → External providers**, add **Google**. Leave email confirmation enabled for email/password signup.
4. Keep form detection enabled. Under **Forms**, verify that `contact` is active and that your Gmail notification is still configured.
5. In an incognito window, visit the homepage and then `/app/index.html` directly. Both should lead to sign-in. Create and confirm a test email account, then sign in. Sign out and repeat with **Continue with Google**. While signed in, submit a Contact test message and verify that it appears in Netlify and Gmail.

For future edits to the chart or Contact form, change `public/app/index.html` and push to the same branch. The root `public/index.html` is the login page. Keep both the Edge Function and the Netlify configuration in the project.

## Enable basic AI readings

In your existing AstroAnimez Netlify project, add these variables under **Project configuration → Environment variables**. Make them available to **Functions** if your plan offers scope selection. Keep the API key private and redeploy after saving.

| Variable | Value |
| --- | --- |
| `AI_API_URL` | The full HTTPS endpoint URL provided by your AI service. |
| `AI_API_KEY` | The API key for the endpoint's Bearer authorization. |
| `AI_API_MODE` | `chat` for OpenAI-compatible Chat Completions (default), or `agent` for the JSON contract below. |
| `AI_MODEL` | Your provider's model ID. Required in `chat` mode. |

In `chat` mode, the function sends `model` and `messages` and reads `choices[0].message.content`. In `agent` mode it sends `{"prompt":"…","language":"en"}` or language `te`, and expects `{"reading":"…"}`. If your agent has a different request, response, or authentication format, update the adapter in `netlify/functions/ai-reading.mjs`.

To verify the deployment, sign in, generate a chart, and click **Get AI reading** near the bottom. Repeat after switching to Telugu. Check that the **Contact us** link opens the existing form and that a test submission reaches your Netlify Forms dashboard. The AI receives calculated chart placements and timing information. The visitor's name, email, raw birth date and time, and birthplace are not included in the AI request.
