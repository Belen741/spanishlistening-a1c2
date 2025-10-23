'use client';

interface AdSlotProps {
  slot: 'header' | 'sidebar' | 'in-content' | 'footer';
  className?: string;
}

export function AdSlot({ slot, className = '' }: AdSlotProps) {
  const sizes = {
    header: 'min-h-[90px] md:min-h-[90px]',
    sidebar: 'min-h-[250px] md:min-h-[600px]',
    'in-content': 'min-h-[280px]',
    footer: 'min-h-[90px]',
  };

  return (
    <div
      className={`flex items-center justify-center bg-muted rounded-lg border-2 border-dashed border-border ${sizes[slot]} ${className}`}
      data-testid={`ad-slot-${slot}`}
    >
      <div className="text-center p-4">
        <p className="text-xs text-muted-foreground uppercase tracking-wide mb-1">
          Anuncio
        </p>
        <p className="text-sm text-muted-foreground">
          AdSense {slot === 'header' ? '728×90 / 320×50' : slot === 'sidebar' ? '300×600' : slot === 'in-content' ? '336×280' : 'Responsive'}
        </p>
      </div>
    </div>
  );
}
