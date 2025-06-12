# Deploying Monagotchi to GitHub Pages

This guide explains how to deploy your Monagotchi app to GitHub Pages so you can share it with others.

## Automatic Deployment with GitHub Actions

The easiest way to deploy is using the included GitHub Action, which will automatically build and deploy your app whenever you push changes to the main branch.

### Setup Steps:

1. **Push your code to GitHub**
   - Make sure your repository is on GitHub
   - Ensure the `.github/workflows/github-pages-deploy.yml` file is present

2. **Enable GitHub Pages**
   - Go to your repository on GitHub
   - Click on "Settings"
   - Navigate to "Pages" in the sidebar
   - Under "Source", select "GitHub Actions"

3. **Trigger Deployment**
   - Push changes to the `main` branch
   - The GitHub Action will automatically build and deploy your app
   - Once complete, GitHub will provide a URL where your app is accessible

4. **Access Your App**
   - Your app will be available at `https://<your-username>.github.io/<repository-name>/`

## Manual Deployment

You can also deploy manually using the provided npm script, which will build your app and push it to the gh-pages branch.

### Prerequisites:
- Git installed and configured
- Node.js and npm installed
- Repository already pushed to GitHub

### Steps:

1. **Install Dependencies**
   ```bash
   npm install
   ```

2. **Deploy to GitHub Pages**
   ```bash
   npm run deploy
   ```

3. **Enable GitHub Pages (if not already done)**
   - Go to your repository on GitHub
   - Click on "Settings"
   - Navigate to "Pages" in the sidebar
   - Under "Source", select "Deploy from a branch"
   - Select "gh-pages" branch and "/ (root)" folder
   - Click "Save"

4. **Access Your App**
   - Your app will be available at `https://<your-username>.github.io/<repository-name>/`

## Troubleshooting

- If your app shows a white screen, check the browser console for errors related to file paths
- Ensure the base path is correctly set in the vite.config.ts file
- Check if your repository name matches what's configured in the build scripts
- Make sure all assets are loading from relative paths