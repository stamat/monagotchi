# ✨ Welcome to Monagotchi!
You've just launched your Monagotchi - a Tamagotchi-inspired virtual pet experience featuring GitHub's Mona mascot!

This project is built as a GitHub Spark application and can be deployed to GitHub Pages for easy sharing.

🚀 What's Inside?
- A nostalgic virtual pet experience
- Animated Mona character with different states
- Stats tracking for Hunger, Happiness, and Cleanliness
- Local storage persistence to keep your pet alive between sessions

## 🚀 Deploying to GitHub Pages

This project is configured to deploy to GitHub Pages in two ways:

### Automatic Deployment

The project includes a GitHub Action that automatically deploys to GitHub Pages when you push to the main branch. To set it up:

1. Make sure your repository has GitHub Pages enabled in Settings > Pages
2. Select "GitHub Actions" as the source
3. Push changes to the main branch to trigger deployment

### Manual Deployment

You can also deploy manually using the included npm script:

```bash
# Install dependencies
npm install

# Deploy to GitHub Pages
npm run deploy
```

This will build the project and push it to the gh-pages branch of your repository.

## 🧹 Local Development

To run the project locally:

```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

📄 License For Spark Template Resources 

The Spark Template files and resources from GitHub are licensed under the terms of the MIT license, Copyright GitHub, Inc.