import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import type { AccentTheme } from '@/lib/accentThemes';

interface AccentCardProps {
  theme: AccentTheme;
}

function withAlpha(hslColor: string, alpha: number): string {
  const match = hslColor.match(/hsl\(([^)]+)\)/);
  if (match) {
    return `hsl(${match[1]} / ${alpha})`;
  }
  return hslColor;
}

export function AccentCard({ theme }: AccentCardProps) {
  return (
    <Link
      href={theme.href}
      className="group block border rounded-xl overflow-hidden hover:shadow-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary transition-all duration-200"
      style={{ borderColor: withAlpha(theme.colors.primary, 0.3) }}
      aria-label={`Open ${theme.title}`}
      data-testid={`card-accent-${theme.slug}`}
    >
      <div className="flex">
        <div 
          className="w-1.5 shrink-0"
          style={{ backgroundColor: theme.colors.accentBar }}
          aria-hidden="true"
        />
        
        <div 
          className="flex-1 flex items-center justify-between p-4 md:p-5 gap-4"
          style={{ 
            background: theme.colors.gradient,
            fontFamily: theme.fontFamily,
          }}
        >
          <div className="flex items-center gap-3 md:gap-4">
            <div 
              className="w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center text-2xl md:text-3xl shrink-0 shadow-sm"
              style={{ backgroundColor: theme.colors.primary }}
            >
              {theme.flag}
            </div>
            
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 
                  className="text-lg md:text-xl font-semibold truncate"
                  style={{ color: theme.colors.text }}
                >
                  {theme.title}
                </h2>
                <span 
                  className="text-base hidden sm:inline"
                  aria-hidden="true"
                >
                  {theme.icon}
                </span>
              </div>
              
              <p 
                className="text-sm text-muted-foreground mt-0.5 line-clamp-1 hidden md:block"
                style={{ lineHeight: 1.5 }}
              >
                {theme.subtitle}
              </p>
            </div>
          </div>
          
          <ArrowRight 
            className="h-5 w-5 shrink-0 text-muted-foreground group-hover:translate-x-1 group-hover:text-foreground transition-all duration-200" 
            aria-hidden="true"
          />
        </div>
      </div>
    </Link>
  );
}
