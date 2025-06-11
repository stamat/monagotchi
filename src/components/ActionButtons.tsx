import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Popcorn,
  Bathtub,
  Heart,
  ArrowCounterClockwise 
} from '@phosphor-icons/react';

interface ActionButtonsProps {
  onFeed: () => void;
  onPlay: () => void;
  onClean: () => void;
  onReset: () => void;
  isAnimating: string | null;
}

const ActionButtons = ({ 
  onFeed, 
  onPlay, 
  onClean, 
  onReset, 
  isAnimating 
}: ActionButtonsProps) => {
  return (
    <div className="flex flex-col gap-2 w-full p-2">
      <div className="grid grid-cols-3 gap-2 w-full">
        <Button 
          onClick={onFeed}
          disabled={!!isAnimating}
          className="ui-text flex flex-col items-center py-4 bg-primary hover:bg-primary/80"
        >
          <Popcorn size={24} weight="fill" />
          <span className="mt-1 text-sm">Feed</span>
        </Button>
        
        <Button 
          onClick={onPlay}
          disabled={!!isAnimating}
          className="ui-text flex flex-col items-center py-4 bg-accent text-accent-foreground hover:bg-accent/80"
        >
          <Heart size={24} weight="fill" />
          <span className="mt-1 text-sm">Play</span>
        </Button>
        
        <Button 
          onClick={onClean}
          disabled={!!isAnimating}
          className="ui-text flex flex-col items-center py-4 bg-secondary text-secondary-foreground hover:bg-secondary/80"
        >
          <Bathtub size={24} weight="fill" />
          <span className="mt-1 text-sm">Clean</span>
        </Button>
      </div>
      
      <Button 
        onClick={onReset}
        disabled={!!isAnimating}
        variant="outline"
        className="ui-text flex flex-col items-center py-4"
      >
        <ArrowCounterClockwise size={24} />
        <span className="mt-1 text-sm">Reset</span>
      </Button>
    </div>
  );
};

export default ActionButtons;