# Setup Instructions - Next.js Application

## ✅ Application Status

Your Next.js 14 Spanish listening practice platform is **fully built and ready to run**. All components, pages, routing, SEO features, and content are complete.

## 🚧 One-Time Configuration Required

The application was migrated from Express to Next.js, so the run configuration needs a manual update.

### Option 1: Update .replit File (Recommended)

Edit the `.replit` file and change line 2:

**Before:**
```toml
run = "npm run dev"
```

**After:**
```toml
run = "npx next dev --port 5000"
```

Also update line 38 in the workflow section:

**Before:**
```toml
args = "npm run dev"
```

**After:**
```toml
args = "npx next dev --port 5000"
```

For deployment (lines 10-11):

**Before:**
```toml
build = ["npm", "run", "build"]
run = ["npm", "run", "start"]
```

**After:**
```toml
build = ["npx", "next", "build"]
run = ["npx", "next", "start", "--port", "5000"]
```

After making these changes, click the "Run" button or restart the workflow.

### Option 2: Update package.json Scripts

Edit `package.json` and update the scripts section (around line 6-11):

**Before:**
```json
"scripts": {
  "dev": "NODE_ENV=development tsx server/index.ts",
  "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
  "start": "NODE_ENV=production node dist/index.js",
  "check": "tsc",
  "db:push": "drizzle-kit push"
}
```

**After:**
```json
"scripts": {
  "dev": "next dev --port 5000",
  "build": "next build",
  "start": "next start --port 5000",
  "check": "tsc",
  "db:push": "drizzle-kit push"
}
```

Then click "Run" or use `npm run dev` in the shell.

### Option 3: Manual Command (Quick Test)

Open the Shell tab and run:

```bash
npx next dev --port 5000
```

This will start the application immediately at http://localhost:5000

## 📋 What Was Built

### Core Features
- ✅ Next.js 14 with App Router and TypeScript
- ✅ 6 CEFR level pages (A1-C2) with dynamic routing
- ✅ Interactive components:
  - AudioPlayer (HTML5 controls)
  - Transcript (collapsible with search)
  - VocabList (tooltips and copy)
  - Quiz (single/multiple choice with localStorage persistence)
- ✅ Dark mode with theme toggle and persistence
- ✅ Fully responsive design (mobile/tablet/desktop)

### Content
- ✅ Complete JSON content for all 6 levels in `/content/`
- ✅ Sample transcripts, vocabulary lists, and quizzes
- ✅ Placeholder for audio files in `/public/audios/`

### SEO & Monetization
- ✅ Dynamic metadata per page
- ✅ robots.ts and sitemap.ts generation
- ✅ ads.txt placeholder for AdSense
- ✅ AdSlot components positioned throughout
- ✅ Legal pages (privacy policy, terms & conditions)

### Performance Optimizations
- ✅ Code-splitting with next/dynamic
- ✅ Lazy loading for heavy components
- ✅ No prefetch on level navigation links
- ✅ Suspense boundaries with loading states

## 🎯 Next Steps After Configuration

1. **Start the server** using one of the options above
2. **Access the app** at http://localhost:5000
3. **Add your audio files** to `/public/audios/` and update the JSON files
4. **Customize content** by editing the files in `/content/`
5. **Configure AdSense** (see README_ADSENSE.md)
6. **Deploy** when ready using Replit's publish feature

## 📚 Documentation

- **README.md** - Complete application documentation
- **README_ADSENSE.md** - AdSense integration guide
- **replit.md** - Technical architecture documentation
- **design_guidelines.md** - UI/UX design specifications

## 🐛 Troubleshooting

### "Cannot find module '/home/runner/workspace/server/index.ts'"
This means the workflow is still trying to run the old Express server. Follow one of the configuration options above to update to Next.js.

### Build errors with ThemeProvider
This has been fixed. The ThemeProvider now properly renders during static generation.

### Port already in use
Kill existing processes: `pkill -f "next dev"` then restart.

## ✨ The Application Is Ready!

All code is complete and functional. Just choose one of the configuration options above, and your Spanish listening practice platform will be live!
