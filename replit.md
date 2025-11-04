# Spanish Listening - Educational Spanish Listening Platform

## Overview

Spanish Listening is a web application designed to enhance Spanish listening comprehension, structured by CEFR levels (A1-C2). The platform offers interactive audio exercises complemented by transcripts, vocabulary lists, and quizzes for each proficiency level. Built using Next.js 14, TypeScript, and TailwindCSS, it prioritizes fast loading, level-specific code-splitting, and is ready for AdSense integration. The application delivers educational content across 6 distinct CEFR levels, tracking user progress and theme preferences locally without a backend. It also incorporates a gamification system with progress bars, badges, and streaks to enhance user engagement.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: Next.js 14 with App Router, utilizing dynamic imports and route-based code splitting for optimal performance, SEO, and per-level lazy loading. Static generation is used for all level pages.

**UI Component Library**: Radix UI primitives for accessible and customizable headless components.

**Styling**: TailwindCSS with a custom HSL-based design system for light/dark modes, custom elevation utilities, and specific typography (Inter for UI/content, JetBrains Mono for code/vocab terms). The design adopts an educational platform aesthetic, prioritizing clarity.

### State Management

**Client-Side State**: React hooks and `localStorage` are used to persist user progress (quiz results, audio listening percentages), theme preferences, and track level completion.

**Theme Management**: Context API with `localStorage` persistence ensures consistent theme display.

### Content Architecture

**Content Storage**: Audio data is centrally stored in `/data/audios.json`. Audio files are located in `/public/audios/` and are lazy-loaded.

**Level Routing**: Dynamic routing for `/nivel/[slug]` (mapped to SEO-optimized English URLs) allows for static generation of all 6 CEFR levels at build time, with corresponding components lazy-loaded.

### Component Design Patterns

**Progressive Enhancement**: Critical UI elements are server-rendered, while interactive components like AudioPlayer and Quiz load client-side with appropriate loading states and graceful fallbacks.

**Lazy Loading Strategy**: Achieved using `next/dynamic` with custom loading skeletons and disabling SSR for browser API-dependent components.

**Accessibility**: Implemented through ARIA labels, keyboard navigation support (via Radix UI), semantic HTML, and WCAG AA compliant color contrast.

### Gamification and Progress Tracking

The platform includes a gamification system to enhance engagement.

**Progress Tracking**: Tracks listen percentage for audios, quiz results, and overall completion using `localStorage`.

**Gamification Elements**: Features a badge system (14 unlockable achievements), daily streaks, and statistics displayed on a dedicated dashboard.

**Persistent Audio Playback**: Audio playback persists when modals close, allowing users to continue listening while navigating transcripts or quizzes, supported by a floating mini-player.

### SEO & Monetization

**SEO Implementation**: Includes dynamic metadata per level, sitemap generation, `robots.txt` configuration, semantic HTML, and OpenGraph metadata. All 6 CEFR levels have custom SEO-optimized English URLs with strategic keyword grouping.

**AdSense Integration**: Designed to be AdSense-ready with placeholder `AdSlot` components and an `ads.txt` file.

### Navigation

**Table of Contents**: A sticky left-side table of contents with internal navigation links and automatic active section tracking improves navigation within level pages.

## External Dependencies

### Core Framework
- **Next.js 14**: Main React framework.
- **React 18**: UI library.
- **TypeScript**: For type safety.

### UI & Styling
- **TailwindCSS**: Utility-first CSS framework.
- **Radix UI**: Headless component primitives.
- **class-variance-authority**: For type-safe variant styling.
- **lucide-react**: Icon library.

### Fonts
- **Google Fonts**: Inter (UI/content), JetBrains Mono (code/vocab).