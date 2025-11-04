'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { List, FileText, BookOpen, HelpCircle, ChevronDown } from 'lucide-react';
import { LEVELS } from '@/lib/levels';
import type { LevelSlug } from '@/types/level';

interface TableOfContentsProps {
  hasSelectedAudio: boolean;
  currentLevelSlug: LevelSlug;
}

export function TableOfContents({ hasSelectedAudio, currentLevelSlug }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>('');
  const [isLevelsOpen, setIsLevelsOpen] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the highest intersection ratio
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          // Sort by intersection ratio (most visible first)
          const mostVisible = visibleEntries.sort(
            (a, b) => b.intersectionRatio - a.intersectionRatio
          )[0];
          
          setActiveSection(mostVisible.target.id);
        }
      },
      {
        threshold: [0, 0.25, 0.5, 0.75, 1],
        rootMargin: '-100px 0px -66% 0px',
      }
    );

    // Observe only the specific section IDs we care about
    const sectionIds = [
      'audio-list',
      'audio-content',
      'transcript-section',
      'vocab-section',
      'quiz-section',
    ];

    sectionIds.forEach((id) => {
      const element = document.getElementById(id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [hasSelectedAudio]); // Re-observe when audio selection changes

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const offset = 100;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth',
      });
    }
  };

  const sections = [
    { id: 'audio-list', label: 'Lista de Audios', icon: List, alwaysShow: true },
    { id: 'audio-content', label: 'Contenido del Audio', icon: FileText, alwaysShow: false },
    { id: 'transcript-section', label: 'Transcripción', icon: FileText, alwaysShow: false },
    { id: 'vocab-section', label: 'Vocabulario', icon: BookOpen, alwaysShow: false },
    { id: 'quiz-section', label: 'Quiz', icon: HelpCircle, alwaysShow: false },
  ];

  const otherLevels = LEVELS.filter((level) => level.slug !== currentLevelSlug);

  return (
    <nav className="sticky top-4 space-y-6" data-testid="table-of-contents">
      <div>
        <h3 className="text-sm font-semibold text-muted-foreground mb-4 px-3">
          ÍNDICE
        </h3>
        <div className="space-y-1">
          {sections.map((section) => {
            const shouldShow = section.alwaysShow || hasSelectedAudio;
            if (!shouldShow) return null;

            const Icon = section.icon;
            const isActive = activeSection === section.id;

            return (
              <button
                key={section.id}
                onClick={() => scrollToSection(section.id)}
                className={`
                  w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-left
                  ${
                    isActive
                      ? 'bg-primary/10 text-primary font-medium'
                      : 'text-muted-foreground hover-elevate active-elevate-2'
                  }
                `}
                aria-current={isActive ? 'location' : undefined}
                data-testid={`toc-link-${section.id}`}
              >
                <Icon className="h-4 w-4 flex-shrink-0" />
                <span>{section.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      <div className="border-t pt-4">
        <button
          onClick={() => setIsLevelsOpen(!isLevelsOpen)}
          className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm font-semibold text-muted-foreground hover-elevate active-elevate-2 transition-colors"
          data-testid="button-toggle-levels"
          aria-expanded={isLevelsOpen}
          aria-controls="other-levels-menu"
        >
          <span>OTROS NIVELES</span>
          <ChevronDown 
            className={`h-4 w-4 transition-transform duration-200 ${
              isLevelsOpen ? 'rotate-180' : ''
            }`}
          />
        </button>
        
        {isLevelsOpen && (
          <div id="other-levels-menu" className="space-y-1 mt-2">
            {otherLevels.map((level) => (
              <Link
                key={level.slug}
                href={level.url}
                className="w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm transition-colors text-muted-foreground hover-elevate active-elevate-2"
                data-testid={`toc-link-level-${level.slug}`}
              >
                <div
                  className="h-4 w-4 rounded-sm flex-shrink-0"
                  style={{ backgroundColor: level.color }}
                />
                <span>Nivel {level.name}</span>
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
