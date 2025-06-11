import React, { useState, useEffect } from 'react';
import type { PetState } from '@/lib/petTypes';
import { CareAction } from '@/hooks/usePet';
import { cn } from '@/lib/utils';
import { Pencil } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';

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
  onEditName?: () => void;
}

const PetDisplay = ({ pet, isAnimating, onEditName }: PetDisplayProps) => {
  const [currentGif, setCurrentGif] = useState<string>(monaDefault);
  const [afterAnimationGif, setAfterAnimationGif] = useState<string | null>(null);
  const [isFlipped, setIsFlipped] = useState<boolean>(false);

  // Randomly change direction periodically
  useEffect(() => {
    const directionChangeInterval = Math.floor(Math.random() * 15000) + 5000; // Random interval between 5-20 seconds
    
    const directionTimer = setInterval(() => {
      // 50% chance to flip direction
      if (Math.random() > 0.5) {
        setIsFlipped(prev => !prev);
      }
    }, directionChangeInterval);
    
    return () => clearInterval(directionTimer);
  }, []);

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
          className={cn(
            "pixel-pet max-w-full h-auto transition-transform duration-300",
            isFlipped && "scale-x-[-1]"
          )}
          width={120}
          height={120}
        />
        {pet.metrics.hunger <= 0 && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
            <p className="pixel-text text-destructive text-center p-2">
              {pet.name} has died!<br/>
              Please reset
            </p>
          </div>
        )}
        
        {/* Status indicators */}
        <div className="absolute top-2 right-2 flex flex-col gap-1">
          {/* Cleanliness indicator */}
          {pet.metrics.cleanliness < 35 && pet.metrics.hunger > 0 && (
            <div className="text-xl bg-white/70 rounded-full h-7 w-7 flex items-center justify-center shadow-sm">
              💩
            </div>
          )}
          
          {/* Happiness indicator */}
          {pet.metrics.happiness < 35 && pet.metrics.hunger > 0 && (
            <div className="text-xl bg-white/70 rounded-full h-7 w-7 flex items-center justify-center shadow-sm">
              💧
            </div>
          )}
          
          {/* Hunger indicator */}
          {pet.metrics.hunger < 35 && pet.metrics.hunger > 0 && (
            <div className="text-xl bg-white/70 rounded-full h-7 w-7 flex items-center justify-center shadow-sm">
              🥣
            </div>
          )}
          
          {/* Dead indicator */}
          {pet.metrics.hunger <= 0 && (
            <div className="text-xl bg-white/70 rounded-full h-7 w-7 flex items-center justify-center shadow-sm">
              🪦
            </div>
          )}
        </div>
      </div>
      <div className="pixel-text text-xs mt-2 text-primary flex items-center justify-center">
        <span>{pet.name}</span>
        {onEditName && (
          <Button 
            variant="ghost" 
            size="icon" 
            onClick={onEditName} 
            className="text-primary h-5 w-5 ml-1 p-0"
          >
            <Pencil size={12} />
          </Button>
        )}
      </div>
    </div>
  );
};

export default PetDisplay;