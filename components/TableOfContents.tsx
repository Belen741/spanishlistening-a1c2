'use client';

import { useEffect, useState } from 'react';
import { List, FileText, BookOpen, HelpCircle } from 'lucide-react';

interface TableOfContentsProps {
  hasSelectedAudio: boolean;
}

export function TableOfContents({ hasSelectedAudio }: TableOfContentsProps) {
  const [activeSection, setActiveSection] = useState<string>('');

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-20% 0px -70% 0px',
      }
    );

    const sections = document.querySelectorAll('[id]');
    sections.forEach((section) => observer.observe(section));

    return () => observer.disconnect();
  }, []);

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

  return (
    <nav className="sticky top-4 space-y-2" data-testid="table-of-contents">
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
              data-testid={`toc-link-${section.id}`}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              <span>{section.label}</span>
            </button>
          );
        })}
      </div>
    </nav>
  );
}
