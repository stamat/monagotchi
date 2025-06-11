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
          className="ui-text flex items-center justify-center gap-1 py-2 bg-primary hover:bg-primary/80"
        >
          <Popcorn size={18} weight="fill" />
          <span className="text-xs">Feed</span>
        </Button>
        
        <Button 
          onClick={onPlay}
          disabled={!!isAnimating || isPetDead}
          className="ui-text flex items-center justify-center gap-1 py-2 bg-accent text-accent-foreground hover:bg-accent/80"
        >
          <Heart size={18} weight="fill" />
          <span className="text-xs">Play</span>
        </Button>
        
        <Button 
          onClick={onClean}
          disabled={!!isAnimating || isPetDead}
          className="ui-text flex items-center justify-center gap-1 py-2 bg-secondary text-secondary-foreground hover:bg-secondary/80"
        >
          <Bathtub size={18} weight="fill" />
          <span className="text-xs">Clean</span>
        </Button>
      </div>
      
      {isPetDead && (
        <Button 
          onClick={onReset}
          disabled={!!isAnimating}
          variant="destructive"
          className="ui-text flex items-center justify-center gap-1 py-2 animate-pulse"
        >
          <ArrowCounterClockwise size={18} />
          <span className="text-xs">Reset Game</span>
        </Button>
      )}
    </div>
  );
};

export default ActionButtons;