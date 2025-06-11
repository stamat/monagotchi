import React, { useState, useEffect } from 'react';
import type { PetState } from '@/lib/petTypes';
import { CareAction } from '@/hooks/usePet';
import { cn } from '@/lib/utils';

// Import all Mona GIFs
import monaDefault from '@/assets/mona-default.gif';
import monaDance from '@/assets/mona-dance.gif';
import monaDead from '@/assets/mona-dead.gif';
import monaNotify from '@/assets/mona-notify.gif';
import monaEating from '@/assets/mona-eating.gif';
import monaLove from '@/assets/mona-love.gif';
import monaCode from '@/assets/mona-code.gif';
import monaHeart from '@/assets/mona-heart.gif';

interface PetDisplayProps {
  pet: PetState;
  isAnimating: string | null;
}

const PetDisplay = ({ pet, isAnimating }: PetDisplayProps) => {
  const [currentGif, setCurrentGif] = useState<string>(monaDefault);
  const [afterAnimationGif, setAfterAnimationGif] = useState<string | null>(null);

  useEffect(() => {
    const { metrics } = pet;
    
    // Handle special animation states first
    if (isAnimating) {
      if (isAnimating === CareAction.FEED) {
        setCurrentGif(monaEating);
        setAfterAnimationGif(monaLove);
        return;
      } else if (isAnimating === CareAction.PLAY) {
        setCurrentGif(monaCode);
        setAfterAnimationGif(monaHeart);
        return;
      } else if (isAnimating === CareAction.CLEAN) {
        setCurrentGif(monaHeart);
        setAfterAnimationGif(null);
        return;
      }
    } else if (afterAnimationGif) {
      // Show the after-animation gif briefly
      setCurrentGif(afterAnimationGif);
      
      // Clear after-animation gif after a delay
      const timer = setTimeout(() => {
        setAfterAnimationGif(null);
      }, 1500);
      
      return () => clearTimeout(timer);
    } else {
      // Default state logic based on metrics
      if (metrics.hunger <= 0) {
        setCurrentGif(monaDead);
      } else if (metrics.hunger < 35 || metrics.happiness < 35 || metrics.cleanliness < 35) {
        setCurrentGif(monaNotify);
      } else if (metrics.hunger > 75 && metrics.happiness > 75 && metrics.cleanliness > 75) {
        setCurrentGif(monaDance);
      } else {
        setCurrentGif(monaDefault);
      }
    }
  }, [pet, isAnimating, afterAnimationGif]);

  return (
    <div className="flex flex-col items-center">
      <div className="relative bg-accent/20 rounded-md p-6 mb-2 border-2 border-black">
        <img 
          src={currentGif}
          alt={`${pet.name} state`}
          className="pixel-pet max-w-full h-auto"
          width={120}
          height={120}
        />
      </div>
      <div className="pixel-text text-xs mt-2 text-primary">
        {pet.name} - DAY {Math.floor(pet.metrics.age)}
      </div>
    </div>
  );
};

export default PetDisplay;