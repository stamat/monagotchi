import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Popcorn,
  Bathtub,
  Heart,
  ArrowCounterClockwise 
} from '@phosphor-icons/react';
import type { PetState } from '@/lib/petTypes';

interface ActionButtonsProps {
  onFeed: () => void;
  onPlay: () => void;
  onClean: () => void;
  onReset: () => void;
  isAnimating: string | null;
  pet: PetState;
}

const ActionButtons = ({ 
  onFeed, 
  onPlay, 
  onClean, 
  onReset, 
  isAnimating,
  pet 
}: ActionButtonsProps) => {
  const isPetDead = pet.metrics.hunger <= 0;
  return (
    <div className="flex flex-col gap-2 w-full p-2">
      <div className="grid grid-cols-3 gap-2 w-full">
        <Button 
          onClick={onFeed}
          disabled={!!isAnimating || isPetDead}
          className="ui-text flex flex-col items-center py-4 bg-primary hover:bg-primary/80"
        >
          <Popcorn size={24} weight="fill" />
          <span className="mt-1 text-sm">Feed</span>
        </Button>
        
        <Button 
          onClick={onPlay}
          disabled={!!isAnimating || isPetDead}
          className="ui-text flex flex-col items-center py-4 bg-accent text-accent-foreground hover:bg-accent/80"
        >
          <Heart size={24} weight="fill" />
          <span className="mt-1 text-sm">Play</span>
        </Button>
        
        <Button 
          onClick={onClean}
          disabled={!!isAnimating || isPetDead}
          className="ui-text flex flex-col items-center py-4 bg-secondary text-secondary-foreground hover:bg-secondary/80"
        >
          <Bathtub size={24} weight="fill" />
          <span className="mt-1 text-sm">Clean</span>
        </Button>
      </div>
      
      {isPetDead && (
        <Button 
          onClick={onReset}
          disabled={!!isAnimating}
          variant="destructive"
          className="ui-text flex flex-col items-center py-4 animate-pulse"
        >
          <ArrowCounterClockwise size={24} />
          <span className="mt-1 text-sm">Reset Game</span>
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;