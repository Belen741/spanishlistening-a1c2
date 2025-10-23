# Listening por Niveles - Educational Spanish Listening Platform

## Overview

Listening por Niveles is a web application for practicing Spanish listening comprehension, organized by CEFR levels (A1-C2). The platform provides interactive audio exercises with transcripts, vocabulary lists, and quizzes for each proficiency level. Built with Next.js 14 (App Router), TypeScript, and TailwindCSS, the application emphasizes fast loading, code-splitting per level, and AdSense integration readiness.

The application serves educational content through 6 distinct CEFR levels, each with dedicated audio material, transcriptions, vocabulary, and evaluable quizzes. User progress is tracked locally using browser localStorage, and the platform supports both light and dark themes with persistence.

**Current Status**: Application is fully built and functional. Requires one-time configuration update to .replit or package.json to run (see SETUP_INSTRUCTIONS.md). All components, routing, SEO, and content are complete.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: Next.js 14 with App Router
- **Problem**: Need for optimal performance, SEO, and code-splitting
- **Solution**: Next.js App Router with dynamic imports and route-based code splitting
- **Rationale**: Enables per-level lazy loading, reducing initial bundle size and improving time-to-interactive
- **Key patterns**: 
  - Dynamic imports for heavy components (AudioPlayer, Quiz, Transcript, VocabList)
  - Static generation for all level pages via `generateStaticParams`
  - Client-side hydration suppression where appropriate

**UI Component Library**: Radix UI primitives
- **Problem**: Need for accessible, customizable UI components
- **Solution**: Radix UI headless components with custom styling
- **Rationale**: Provides WAI-ARIA compliant components without design opinions, allowing full control over appearance while maintaining accessibility

**Styling**: TailwindCSS with custom design system
- **Theme system**: HSL-based color tokens supporting light/dark modes
- **Custom utilities**: Elevation classes (`hover-elevate`, `active-elevate-2`) for consistent interaction feedback
- **Typography**: Inter for UI/content, JetBrains Mono for code/vocab terms
- **Design approach**: Educational platform-inspired (Duolingo, Khan Academy) with clarity-first principles

### State Management

**Client-Side State**: React hooks + localStorage
- **Problem**: Need to persist user progress and preferences without backend
- **Solution**: localStorage for quiz results, theme preferences, and completion tracking
- **Data structure**: 
  - Quiz results: `quiz:${levelSlug}` → `{ score, total, answers, timestamp }`
  - Theme: `theme` → `'light' | 'dark'`
- **Tradeoffs**: Simple implementation, works offline, but no cross-device sync

**Theme Management**: Context API with localStorage persistence
- **Pattern**: ThemeProvider context wrapping entire app
- **Features**: System preference detection, manual toggle, persistence across sessions
- **Implementation**: Prevents flash of unstyled content with `suppressHydrationWarning`

### Content Architecture

**Content Storage**: Static JSON files per level
- **Location**: `/content/*.json` (a1.json through c2.json)
- **Schema**: Defined in `types/level.ts` - includes title, audioSrc, transcript, vocab array, quiz questions
- **Loading**: Dynamic import per level route, preventing all content from loading upfront
- **Rationale**: Separates content from code, enables easy content updates without rebuilding

**Level Routing**: Dynamic route `/nivel/[slug]`
- **Static generation**: All 6 levels pre-rendered at build time
- **Code splitting**: Each level's components lazy-loaded only when accessed
- **No prefetch**: `prefetch={false}` on level links to avoid loading unused content

### Component Design Patterns

**Progressive Enhancement**:
- Critical UI renders server-side
- Interactive components (AudioPlayer, Quiz) load client-side with loading states
- Graceful fallbacks for missing audio files

**Lazy Loading Strategy**:
- `next/dynamic` with custom loading skeletons
- SSR disabled (`ssr: false`) for components requiring browser APIs
- Named exports with `.then(mod => ({ default: mod.Component }))` pattern

**Accessibility**:
- ARIA labels on interactive elements
- Keyboard navigation support via Radix UI
- Semantic HTML structure
- Color contrast meeting WCAG AA standards

### SEO & Monetization

**SEO Implementation**:
- Dynamic metadata per level via `generateMetadata`
- Sitemap generation (`app/sitemap.ts`) covering all level pages
- Robots.txt configuration
- Semantic HTML with proper heading hierarchy
- OpenGraph metadata for social sharing

**AdSense Integration** (configured but not active):
- Placeholder AdSlot components for 4 positions (header, sidebar, in-content, footer)
- ads.txt file ready for publisher ID
- Layout prepared for AdSense script injection
- Design accommodates ads without disrupting UX

## External Dependencies

### Core Framework
- **Next.js 14**: React framework with App Router, static generation, and dynamic imports
- **React 18**: UI library with concurrent features
- **TypeScript**: Type safety and developer experience

### UI & Styling
- **TailwindCSS**: Utility-first CSS framework with custom theme configuration
- **Radix UI**: ~20 headless component primitives (Accordion, Dialog, Tooltip, etc.)
- **class-variance-authority**: Type-safe variant styling
- **lucide-react**: Icon library

### Database & Backend (Prepared but not actively used)
- **Drizzle ORM**: TypeScript ORM for SQL databases
- **@neondatabase/serverless**: Neon PostgreSQL serverless driver
- **Note**: Database infrastructure is installed but the current implementation uses localStorage only. Database may be added later for user accounts, cross-device sync, or analytics.

### Fonts
- **Google Fonts**: Inter (UI/content), JetBrains Mono (code/vocab)

### Development Tools
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for server code
- **vite**: Build tool and dev server
- **PostCSS**: CSS processing with Autoprefixer

### Potential Future Integrations
- Google AdSense (placeholders present, requires publisher ID and domain)
- PostgreSQL database via Drizzle ORM (infrastructure present but unused)
- React Query for data fetching (installed but not actively used in current localStorage-based architecture)