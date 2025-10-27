# Spanish Listening - Educational Spanish Listening Platform

## Overview

Spanish Listening is a web application designed to enhance Spanish listening comprehension, structured by CEFR levels (A1-C2). The platform offers interactive audio exercises complemented by transcripts, vocabulary lists, and quizzes for each proficiency level. Built using Next.js 14 (App Router), TypeScript, and TailwindCSS, the application prioritizes fast loading, level-specific code-splitting, and is ready for AdSense integration.

The application delivers educational content across 6 distinct CEFR levels, each featuring dedicated audio materials, transcriptions, vocabulary, and evaluable quizzes. User progress, including quiz results and theme preferences, is tracked locally using browser localStorage. The platform supports both light and dark themes with persistence.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: Next.js 14 with App Router, utilizing dynamic imports and route-based code splitting for optimal performance, SEO, and per-level lazy loading. Static generation is used for all level pages.

**UI Component Library**: Radix UI primitives, providing accessible and customizable headless components.

**Styling**: TailwindCSS with a custom HSL-based design system for light/dark modes, custom elevation utilities, and specific typography (Inter for UI/content, JetBrains Mono for code/vocab terms). The design adopts an educational platform aesthetic, prioritizing clarity.

### State Management

**Client-Side State**: React hooks and `localStorage` are used to persist user progress (quiz results), theme preferences, and track level completion without a backend.

**Theme Management**: Context API with `localStorage` persistence ensures consistent theme display and prevents flash of unstyled content.

### Content Architecture

**Content Storage**: Audio data is centrally stored in `/data/audios.json`. A schema defined in `types/level.ts` structures audio items, including id, level, title, duration, file, transcript, vocabulary, and quiz questions. Audio files are located in `/public/audios/` and are lazy-loaded.

**Level Routing**: Dynamic routing for `/nivel/[slug]` (now mapped to SEO-optimized English URLs) allows for static generation of all 6 CEFR levels at build time, with corresponding components lazy-loaded on access.

### Component Design Patterns

**Progressive Enhancement**: Critical UI elements are server-rendered, while interactive components like AudioPlayer and Quiz load client-side with appropriate loading states and graceful fallbacks.

**Lazy Loading Strategy**: Achieved using `next/dynamic` with custom loading skeletons and disabling SSR for browser API-dependent components.

**Accessibility**: Implemented through ARIA labels, keyboard navigation support (via Radix UI), semantic HTML, and WCAG AA compliant color contrast.

### SEO & Monetization

**SEO Implementation**: Includes dynamic metadata per level, sitemap generation, `robots.txt` configuration, semantic HTML, and OpenGraph metadata. All 6 CEFR levels have custom SEO-optimized English URLs (e.g., `/spanish-audio-for-beginners-a1`) with strategic keyword grouping.

**AdSense Integration**: The platform is designed to be AdSense-ready with placeholder `AdSlot` components and an `ads.txt` file in place, accommodating future ad injection without disrupting UX.

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

## Recent Changes (October 2025)

### Persistent Audio Playback System (October 27, 2025)
- **Change**: Audio playback now persists when modal closes, allowing users to continue listening while reading transcripts or taking quizzes
- **Problem Solved**: Previously, audio would stop when users clicked "Ver transcripción completa" or "Hacer quiz", interrupting their learning flow
- **Solution**: Moved `<audio>` element from AudioModal to PaginatedAudioList (parent level) so it stays mounted across modal open/close events
- **Architecture**:
  - `PaginatedAudioList` manages persistent audio element and playback state (`isPlaying`, `currentAudio`)
  - `AudioModal` receives `isPlaying` state and `onPlayPause` callback to control the persistent player
  - **Floating Mini Player**: Appears at bottom-right corner when modal closes while audio is loaded
  - Custom play/pause button in modal instead of native HTML5 audio controls
  - Helper text in modal: "💡 El audio continuará reproduciéndose mientras navegas por la transcripción o el quiz"
- **Mini Player Features**:
  - Displays current audio title and playback status ("Reproduciendo..." or "Pausado")
  - Play/Pause button to control playback
  - Close button (X) to stop audio and dismiss player
  - Fixed position at bottom-right corner, stays visible while scrolling
  - Automatically switches when user selects a different audio
- **UX Flow**: Click play on audio card → Modal opens → Click play button to start audio → Click "Ver transcripción" or "Hacer quiz" → Modal closes, mini player appears, **page auto-scrolls to selected section** (transcript auto-expands if collapsed) → User can pause/play from mini player while reading → Click X to stop audio completely
- **Auto-Scroll Feature**: When closing modal via action buttons, page automatically scrolls to the relevant section with -100px offset for sticky header compensation. Transcript section auto-expands if collapsed.
- **Files Modified**: `components/PaginatedAudioList.tsx`, `components/AudioModal.tsx`

### AbortController Error Fix - Final Solution (October 27, 2025)
- **Problem**: "AbortError: signal is aborted without reason" was persistently appearing when navigating between pages or when components unmounted during fetch operations, even with try/catch blocks
- **Root Cause**: `AbortController.abort()` was creating unhandled promise rejections that couldn't be caught in the cleanup function, especially problematic with React StrictMode's double effect execution in development
- **Solution Implemented**:
  - **Completely removed AbortController** from the fetch useEffect hook
  - Simplified cleanup to use only the `isMounted` boolean flag
  - No more abort() calls = no more AbortError exceptions
- **Technical Details**:
  - Fetch requests continue in background if component unmounts before completion
  - The `isMounted` flag prevents state updates on unmounted components (prevents memory leaks)
  - This is a common and accepted pattern in React for cleanup
- **Result**: Zero console errors, clean navigation between all levels (A1-C2), smooth page transitions
- **Files Modified**: `components/PaginatedAudioList.tsx` (lines 68-106)