import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Bowl, 
  GameController, 
  ShowerHead, 
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
    <div className="grid grid-cols-2 gap-2 w-full p-2">
      <Button 
        onClick={onFeed}
        disabled={!!isAnimating}
        className="ui-text flex flex-col items-center py-6 bg-primary hover:bg-primary/80"
      >
        <Bowl size={28} weight="fill" />
        <span className="mt-1">Feed</span>
      </Button>
      
      <Button 
        onClick={onPlay}
        disabled={!!isAnimating}
        className="ui-text flex flex-col items-center py-6 bg-accent text-accent-foreground hover:bg-accent/80"
      >
        <GameController size={28} weight="fill" />
        <span className="mt-1">Play</span>
      </Button>
      
      <Button 
        onClick={onClean}
        disabled={!!isAnimating}
        className="ui-text flex flex-col items-center py-6 bg-secondary text-secondary-foreground hover:bg-secondary/80"
      >
        <ShowerHead size={28} weight="fill" />
        <span className="mt-1">Clean</span>
      </Button>
      
      <Button 
        onClick={onReset}
        disabled={!!isAnimating}
        variant="outline"
        className="ui-text flex flex-col items-center py-6"
      >
        <ArrowCounterClockwise size={28} />
        <span className="mt-1">Reset</span>
      </Button>
    </div>
  );
};

export default ActionButtons;