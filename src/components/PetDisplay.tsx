import React from 'react';
import { getPetArt } from '@/lib/petTypes';
import type { PetState } from '@/lib/petTypes';
import { CareAction } from '@/hooks/usePet';
import { cn } from '@/lib/utils';

interface PetDisplayProps {
  pet: PetState;
  isAnimating: string | null;
}

const PetDisplay = ({ pet, isAnimating }: PetDisplayProps) => {
  const { stage, mood } = pet;
  const petArt = getPetArt(stage, mood);

  // Define animation based on current action
  const animationClass = isAnimating 
    ? isAnimating === CareAction.FEED 
      ? 'animate-[eating_0.5s_ease-in-out_infinite]'
      : isAnimating === CareAction.PLAY
        ? 'animate-[happy_0.5s_ease-in-out_infinite]'
        : 'animate-[cleaning_0.5s_ease-in-out_infinite]'
    : mood === 'HAPPY' || mood === 'CONTENT'
      ? 'animate-[idle_2s_ease-in-out_infinite]'
      : 'animate-[sad_2s_ease-in-out_infinite]';

  return (
    <div className="flex flex-col items-center">
      <div className="relative bg-accent/20 rounded-md p-6 mb-2 border-2 border-black">
        <pre 
          className={cn(
            "pixel-pet text-lg font-bold text-black whitespace-pre leading-none",
            animationClass
          )}
        >
          {petArt.map((line, i) => (
            <div key={i}>{line}</div>
          ))}
        </pre>
      </div>
      <div className="pixel-text text-xs mt-2 text-primary">
        {pet.name} - DAY {Math.floor(pet.metrics.age)}
      </div>
    </div>
  );
};

export default PetDisplay;