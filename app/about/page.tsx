import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, BookOpen, Headphones, Target, GraduationCap } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About - Spanish Listening',
  description: 'Learn about Spanish Listening, an educational platform created by a Spanish teacher with 6+ years of experience to help students improve their listening comprehension skills.',
};

export default function AboutPage() {
  return (
    <div className="container mx-auto px-6 py-12 max-w-3xl">
      <Link 
        href="/" 
        className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground mb-8 hover-elevate px-3 py-2 rounded-md transition-colors"
        data-testid="link-back"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to home
      </Link>

      <h1 className="text-3xl md:text-4xl font-bold mb-6" data-testid="text-page-title">
        About Spanish Listening
      </h1>

      <div className="bg-card border rounded-xl p-8 space-y-8">
        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2" data-testid="text-section-mission">
            <GraduationCap className="h-5 w-5 text-primary" />
            Our Mission
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground" data-testid="text-mission-content">
            Spanish Listening was created by a Spanish as a Second Language teacher with over 6 years of classroom experience. After years of working with students at every level, one thing became clear: listening comprehension is one of the biggest challenges learners face, and there aren't enough quality resources designed specifically to address it.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            This platform was born from the desire to give students the tools they need to reach their language goals — whether they're just starting out or preparing for advanced conversations.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2" data-testid="text-section-what">
            <Headphones className="h-5 w-5 text-primary" />
            What We Offer
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Spanish Listening provides carefully designed audio exercises organized by CEFR proficiency levels (A1 through C2) and by regional accents from across the Spanish-speaking world — including Argentina, Mexico, Spain, Colombia, and Cuba.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            Each audio lesson includes:
          </p>
          <ul className="space-y-3 ml-4">
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>Natural conversations with authentic vocabulary and expressions</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>Full transcripts so you can read along and check your understanding</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>Vocabulary lists with clear definitions in English</span>
            </li>
            <li className="flex items-start gap-3 text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-primary mt-2 flex-shrink-0" />
              <span>Comprehension quizzes to test what you've learned</span>
            </li>
          </ul>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2" data-testid="text-section-approach">
            <BookOpen className="h-5 w-5 text-primary" />
            Our Approach
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Every lesson is crafted with real teaching experience in mind. The dialogues reflect everyday situations — from ordering coffee to discussing travel plans — so learners can practice with content that's genuinely useful in the real world.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            We also believe that exposure to different accents is essential. That's why we include audio from multiple Spanish-speaking countries, helping students develop a well-rounded ear for the language as it's actually spoken.
          </p>
        </section>

        <section className="space-y-4">
          <h2 className="text-xl font-semibold flex items-center gap-2" data-testid="text-section-goal">
            <Target className="h-5 w-5 text-primary" />
            Our Goal
          </h2>
          <p className="text-base leading-relaxed text-muted-foreground">
            Our goal is simple: to help Spanish learners at every level build confidence in their listening skills. Whether you're a self-directed learner, a student in a formal program, or someone preparing for a trip to a Spanish-speaking country, this platform is for you.
          </p>
          <p className="text-base leading-relaxed text-muted-foreground">
            New audio lessons are added regularly, so there's always something new to practice with. We're committed to growing this resource and making quality Spanish listening practice accessible to everyone.
          </p>
        </section>
      </div>
    </div>
  );
}
