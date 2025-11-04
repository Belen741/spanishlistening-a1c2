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

## Recent Changes (November 2025)

### Gamification & Progress Tracking System (November 3, 2025)
- **Feature**: Complete Duolingo-style gamification system with progress bars, badges, daily streaks, and statistics
- **Motivation**: Enhance user engagement and motivation through visible progress tracking and achievement systems
- **Architecture**:
  - **Progress Management** (`lib/progress.ts`): Centralized localStorage-based system for tracking all user progress
  - **Data Model**: TypeScript interfaces for `AudioProgress`, `DailyStreak`, `LevelStats`, `Badge`, and `UserProgress`
  - **Badge System**: 14 unlockable achievements across 4 categories (streak, completion, mastery, speed)
  - **Daily Streaks**: Automatic tracking of consecutive practice days with current and longest streak display
- **UI Components**:
  - `ProgressBar`: Visual progress indicator with percentage
  - `StreakCounter`: Flame icon display with current and best streak
  - `BadgeDisplay`: Grid layout showing locked/unlocked badges with lock icons
  - `StatsCard`: Metric cards for quick stats overview
  - Shadcn components added: `Card` and `Progress` with Radix UI primitives
- **Dashboard Page** (`/progreso`):
  - Overall progress bar showing completion of all 36 audios
  - Statistics grid: completed audios, quizzes taken, average score, badges unlocked
  - Streak counter prominent display
  - Per-level progress cards with links to each level
  - Full badge gallery with unlock status
- **Integration Points**:
  - **Header**: Progress link with live percentage indicator (updates on progress)
  - **Audio Playback**: Tracks when users listen to audios via `markAudioAsListened()`
  - **Quiz Completion**: Records scores and completion via `recordQuizResult()`
  - **Streak Logic**: Automatically updates daily streaks, handles day gaps, tracks longest streaks
  - **Badge Unlocking**: Automatic unlock based on achievements (e.g., 7-day streak, complete A1, perfect score)
- **User Experience**:
  - Progress persists in localStorage (no authentication required)
  - Real-time updates in header when progress changes
  - Visual feedback with badges, streaks, and percentages
  - Motivational system similar to language learning apps
  - Encourages consistent practice through daily streaks
- **Files Created**: `lib/progress.ts`, `components/ProgressBar.tsx`, `components/StreakCounter.tsx`, `components/BadgeDisplay.tsx`, `components/StatsCard.tsx`, `components/ui/card.tsx`, `components/ui/progress.tsx`, `app/progreso/page.tsx`
- **Files Modified**: `components/Header.tsx` (added progress link), `components/Quiz.tsx` (integrated recordQuizResult and fixed ID mismatch), `components/PaginatedAudioList.tsx` (integrated markAudioAsListened), `components/LevelPageClient.tsx` (passes audioId and level as props to Quiz)
- **Critical Bug Fix** (November 3, 2025):
  - **Problem**: Quiz submissions were creating progress entries with mismatched audio IDs, preventing proper progress tracking
  - **Root Cause**: Quiz component was parsing audioId from levelSlug string, which could introduce errors
  - **Solution**: Modified Quiz to accept `audioId` and `level` as separate explicit props instead of parsing from levelSlug
  - **Impact**: Both `markAudioAsListened()` and `recordQuizResult()` now use identical IDs, ensuring progress, streaks, and badges update correctly
  - **Files Modified**: `components/Quiz.tsx` (added audioId and level props), `components/LevelPageClient.tsx` (passes audioId={selectedAudio.id} and level={selectedAudio.level})

### Visual Listened Audio Indicator (November 4, 2025)
- **Feature**: Visual badge indicator on audio cards showing which audios have been listened to
- **Motivation**: Provide immediate visual feedback to users about their listening progress directly on the audio grid
- **Implementation**:
  - **AudioCard Component**: Added `isListened` prop that displays a green "Escuchado" badge with CheckCircle icon in top-right corner
  - **Badge Styling**: Green color scheme (`bg-green-500/10 text-green-600 dark:text-green-400`) with proper light/dark mode support
  - **PaginatedAudioList**: Loads listened audios from progress on mount, maintains state in a Set for O(1) lookup performance
  - **Real-time Updates**: Badge appears immediately when audio starts playing, updates local state synchronously
  - **Persistence**: State persists across page refreshes via localStorage through existing progress system
- **User Experience**:
  - Users can quickly scan which audios they've completed without opening the progress dashboard
  - Visual confirmation appears instantly when they start listening
  - Consistent with gamification system's progress tracking
  - Works seamlessly with existing audio playback system
- **Files Modified**: `components/AudioCard.tsx` (added isListened prop and badge UI), `components/PaginatedAudioList.tsx` (tracks and passes listened state)
- **Testing**: End-to-end test confirmed badge appears on play, persists on refresh, and works correctly with progress system

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