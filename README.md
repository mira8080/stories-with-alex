# 🐩 Stories with Alex

A magical AI-powered storytelling app for kids. Kids pick a story category or create their own, then talk with Alex (a VAPI voice agent) who tells them interactive stories featuring Lunita, the family's French Poodle!

## 🖥 What You Need to Install

1. **Node.js** — Download from https://nodejs.org (click the LTS button)
2. **Git** — Download from https://git-scm.com

That's it!

## 🚀 Step-by-Step Guide

### Step 1: Download and Open Project

Unzip the project, then open a terminal in that folder:

```bash
cd stories-with-alex
npm install
```

### Step 2: Test Locally (Optional)

```bash
npm run dev
```

Open `http://localhost:5173` — you'll see the app in demo mode.

### Step 3: Create a GitHub Repository

1. Go to https://github.com/new
2. Name it `stories-with-alex`
3. Keep it **Public**
4. Do NOT add README (we already have one)
5. Click **Create repository**

### Step 4: Push Your Code

```bash
git init
git add .
git commit -m "Stories with Alex"
git remote add origin https://github.com/YOUR_USERNAME/stories-with-alex.git
git branch -M main
git push -u origin main
```

Replace YOUR_USERNAME with your GitHub username.

### Step 5: Add Your VAPI Keys

1. Go to your repo on GitHub
2. Click **Settings** → **Secrets and variables** → **Actions**
3. Click **New repository secret** and add:
   - Name: `VITE_VAPI_PUBLIC_KEY` — Value: your VAPI public key
   - Name: `VITE_VAPI_ASSISTANT_ID` — Value: your VAPI assistant ID

### Step 6: Enable GitHub Pages

1. Go to repo → **Settings** → **Pages**
2. Under Source, select **GitHub Actions**
3. Done! It deploys automatically.

Your app will be live at: `https://YOUR_USERNAME.github.io/stories-with-alex/`

---

## 🌐 Optional: Custom Domain with Cloudflare

1. GitHub repo → Settings → Pages → Custom domain → enter `stories.yourdomain.com`
2. In Cloudflare DNS, add a CNAME: name `stories`, target `YOUR_USERNAME.github.io`
3. Wait a few minutes — done!

---

## 🎤 VAPI Agent System Prompt

```
You are Alex, a magical storyteller for kids ages 3-8.

Rules:
- Speak in simple, short sentences
- Use a warm, excited, playful voice
- Make sound effects (BOOM!, shhhhh, whoooosh!)
- Ask questions to keep the child engaged
- Always include positive messages and happy endings
- Keep stories between 3-5 minutes
- You know Lunita, the family's French Poodle — fluffy, white, playful and sweet
- If the child mentions Lunita, make her the main character
- Lunita can talk, have adventures, and be the hero
- Always make Lunita brave, kind and funny
```

## 📂 Structure

```
stories-with-alex/
├── .github/workflows/deploy.yml
├── index.html
├── package.json
├── vite.config.js
├── .env.example
├── .gitignore
└── src/
    ├── main.jsx
    └── App.jsx
```
