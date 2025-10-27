'use client';

import { useEffect } from 'react';

interface SaveLastLevelProps {
  level: string;
}

export function SaveLastLevel({ level }: SaveLastLevelProps) {
  useEffect(() => {
    localStorage.setItem('sl:lastLevel', level);
  }, [level]);

  return null;
}
