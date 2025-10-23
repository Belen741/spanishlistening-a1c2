# Design Guidelines: Listening Practice Platform

## Design Approach

**Selected Approach:** Design System with Educational Platform References

Drawing inspiration from successful educational platforms (Duolingo, Khan Academy) and productivity tools (Notion, Linear) that prioritize clarity, focus, and sustained engagement. The design balances professional credibility with approachable learning aesthetics while maintaining AdSense compatibility.

**Core Principles:**
- Clarity over decoration: Every element serves learning
- Cognitive load reduction: Clean layouts aid comprehension
- Progressive disclosure: Reveal complexity gradually
- Ad integration without disruption: Monetization that respects UX

---

## Color Palette

### Light Mode
**Primary Brand:** 59 91% 47% (vibrant blue - trustworthy, educational)
**Primary Hover:** 59 91% 42%
**Secondary:** 142 76% 36% (success green for correct answers)
**Background Base:** 0 0% 100% (pure white)
**Background Elevated:** 220 13% 97% (subtle gray for cards)
**Text Primary:** 222 47% 11% (near-black for readability)
**Text Secondary:** 215 16% 47% (muted for descriptions)
**Border Default:** 214 32% 91%
**Error/Incorrect:** 0 84% 60% (red for wrong answers)
**Warning:** 38 92% 50% (amber for hints)

### Dark Mode
**Primary Brand:** 59 91% 60% (lighter blue for contrast)
**Background Base:** 222 47% 11%
**Background Elevated:** 217 33% 17%
**Text Primary:** 210 40% 98%
**Text Secondary:** 215 20% 65%
**Border Default:** 217 33% 25%

**Accent Colors (Minimal Use):**
- Level badges: Use hue shifts (A1=180, A2=200, B1=220, B2=240, C1=260, C2=280) with 70% saturation, 50% lightness
- Quiz feedback: Green for correct, red for incorrect, amber for partial

---

## Typography

**Font Stack:** 
- **Primary:** 'Inter' (Google Fonts) - excellent readability for UI and content
- **Headings:** 'Inter' with tighter letter-spacing (-0.02em for large text)
- **Code/Monospace:** 'JetBrains Mono' (for vocab terms, technical text)

**Type Scale:**
- **Hero/H1:** text-4xl md:text-5xl, font-bold, leading-tight
- **Section Headers/H2:** text-3xl md:text-4xl, font-semibold
- **Card Titles/H3:** text-xl md:text-2xl, font-semibold
- **Component Headers/H4:** text-lg font-medium
- **Body Text:** text-base, leading-relaxed (1.75)
- **Small/Captions:** text-sm, text-secondary
- **Micro/Labels:** text-xs, uppercase tracking-wide

**Reading Optimization:**
- Transcripts: max-w-prose (65ch), text-base, leading-relaxed
- Quiz questions: text-lg, font-medium for emphasis
- Vocabulary terms: font-semibold for Spanish, font-normal for English

---

## Layout System

**Spacing Primitives:** Tailwind units of **2, 4, 6, 8, 12, 16, 24** (simplified set)
- Component padding: p-4 to p-8
- Section spacing: py-12 md:py-16
- Card gaps: gap-4 to gap-8
- Tight spacing: space-y-2
- Standard spacing: space-y-4
- Section breaks: space-y-12

**Grid System:**
- Home level cards: grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6
- Vocabulary lists: grid-cols-1 sm:grid-cols-2 gap-4
- Quiz options: space-y-3 (stacked for better mobile UX)

**Container Widths:**
- Main content: max-w-6xl mx-auto px-4
- Reading content (transcripts): max-w-3xl
- Wide sections (with ads): max-w-7xl

**AdSense Integration Zones:**
- Header leaderboard: 728x90 desktop, 320x50 mobile
- Sidebar: 300x250 or 300x600 (sticky on desktop)
- In-content: 336x280 between transcript and quiz
- Footer: responsive horizontal unit
- All ad containers: min-h-[250px] bg-gray-100 dark:bg-gray-800 rounded-lg with "Advertisement" label

---

## Component Library

### Navigation
**Header:** Fixed top, backdrop-blur-lg bg-white/80 dark:bg-gray-900/80, shadow-sm
- Logo/title left, navigation center, user actions right
- Mobile: Hamburger menu with slide-out drawer

**Breadcrumbs:** Home > Nivel > [Level Name] with chevron separators

### Level Cards (Home Page)
**Structure:** Rounded-2xl cards with subtle shadow (shadow-md hover:shadow-lg transition)
- Badge: Small rounded pill top-left with level color (A1, A2, etc.)
- Title: Level name + brief description
- Icon: Simple headphones or audio wave SVG (from Heroicons)
- CTA: "Start Practicing" button, full-width at bottom
- Progress indicator: If user has completed quiz, show subtle checkmark

**States:** 
- Default: bg-white dark:bg-gray-800 border border-gray-200
- Hover: Lift slightly (transform -translate-y-1), enhanced shadow
- Active/Visited: Accent border-l-4 with level color

### Audio Player
**Container:** Rounded-xl bg-gray-50 dark:bg-gray-800 p-6
- Waveform visualization: Optional CSS animation for "now playing" indicator
- Controls: Large play/pause (48x48), progress bar with timestamp, volume, download button
- Progress bar: Full-width, accent color fill, draggable thumb
- Playback speed: 0.75x, 1x, 1.25x, 1.5x buttons

### Transcript Component
**Header:** Collapsible with chevron icon, "Show Transcript" / "Hide Transcript"
**Content (Expanded):** 
- Search box: Sticky at top, highlights matches in transcript
- Text container: prose prose-lg dark:prose-invert, padded, subtle background
- Copy button: Top-right corner, icon-only with tooltip

### Vocabulary List
**Format:** Cards or definition list style
- Term (Spanish): font-semibold text-lg, dark text color
- Meaning (English): text-base text-secondary, slightly indented
- Dividers: Subtle border-b between items
- Hover: Highlight background, show copy icon
- Optional: Toggle between list/grid view for dense content

### Quiz Component
**Question Container:** Numbered questions (1/5, 2/5, etc.) with progress dots
**Options:** 
- Radio buttons (single choice) or checkboxes (multiple) with large clickable areas
- Full-width option cards: p-4 rounded-lg border-2 transition
- Default: border-gray-300 bg-white
- Selected: border-primary bg-blue-50 dark:bg-blue-900/20
- Correct (after submit): border-green-500 bg-green-50
- Incorrect (after submit): border-red-500 bg-red-50

**Feedback Section:**
- Score display: Large centered text with circular progress indicator
- Explanations: Accordion-style per question with green checkmark or red X
- Actions: "Retry Quiz" button (outline) and "Continue" button (solid)

**LocalStorage Indicator:** Small badge showing "Last score: 8/10" if exists

### Buttons
**Primary:** bg-primary text-white hover:bg-primary-hover px-6 py-3 rounded-lg font-medium
**Secondary:** border-2 border-primary text-primary hover:bg-primary hover:text-white
**Outline (on images/overlays):** backdrop-blur-md bg-white/20 border-2 border-white text-white

### Legal Pages
**Simple text pages:** prose prose-lg max-w-4xl mx-auto with clear headings
**Footer Links:** Small text-sm links in footer, separated by bullets

---

## Animations & Interactions

**Minimal, Purposeful Motion:**
- Card hovers: 200ms ease transform and shadow
- Button clicks: 100ms scale(0.98) for tactile feedback
- Page transitions: None (fast navigation priority)
- Quiz feedback: 300ms slide-in for explanations
- Audio player: Subtle pulse on play button when active
- Avoid: Parallax, complex scroll animations, decorative motion

**Focus States:** 
- 2px solid ring in primary color, offset by 2px
- High contrast for keyboard navigation

---

## Images

**No Hero Image** - This platform prioritizes utility and fast loading.

**Minimal Image Usage:**
- Level card icons: Simple SVG icons from Heroicons (only if enhancing clarity)
- Placeholder for audio waveform: CSS-based visualization
- No decorative imagery, stock photos, or background images

**If Absolutely Necessary:**
- Optimized WebP format, lazy-loaded
- Max 50KB per image
- Alt text required for all

---

## Responsive Behavior

**Breakpoints:** sm (640px), md (768px), lg (1024px), xl (1280px)

**Mobile-First Adaptations:**
- Home: Single column level cards, full-width CTAs
- Level pages: Stacked layout (audio → transcript → vocab → quiz)
- Ad placement: Top and bottom only on mobile, avoid mid-content disruption
- Audio controls: Larger touch targets (min 44x44px)
- Quiz: Full-width options, generous padding for thumb tapping

**Desktop Enhancements:**
- Sidebar layout possible for ads (300px fixed width)
- Two-column vocab lists
- Larger audio player with waveform
- Sticky transcript search bar

---

## Accessibility Checklist

- ARIA labels on all interactive controls (play, pause, submit, etc.)
- Semantic HTML: `<article>` for level content, `<nav>`, `<main>`, `<aside>` for ads
- Keyboard navigation: Tab order logical, Esc closes modals
- Focus indicators: Always visible, never disabled
- Color contrast: WCAG AA minimum (4.5:1 for text)
- Screen reader announcements: Quiz results, audio state changes
- Skip links: "Skip to main content" at page top

---

This design creates a focused, accessible learning environment that respects both user attention and AdSense requirements, ensuring fast load times and sustained engagement.