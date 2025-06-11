import React from 'react';
import { Progress } from '@/components/ui/progress';
import { PetMetrics } from '@/lib/petTypes';
import { 
  Popcorn,
  Bathtub,
  Heart
} from '@phosphor-icons/react';

interface StatusMetersProps {
  metrics: PetMetrics;
}

const StatusMeters = ({ metrics }: StatusMetersProps) => {
  return (
    <div className="w-full space-y-3 p-2">
      <div className="flex items-center space-x-2">
        <Popcorn className="text-primary" size={24} />
        <div className="flex-1">
          <div className="flex justify-between mb-1 text-xs ui-text">
            <span>Hunger</span>
            <span>{Math.round(metrics.hunger)}%</span>
          </div>
          <Progress 
            value={metrics.hunger} 
            className="h-2" 
            indicatorClassName={metrics.hunger < 30 ? "bg-destructive" : "bg-primary"}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Heart className="text-accent" size={24} />
        <div className="flex-1">
          <div className="flex justify-between mb-1 text-xs ui-text">
            <span>Happiness</span>
            <span>{Math.round(metrics.happiness)}%</span>
          </div>
          <Progress 
            value={metrics.happiness} 
            className="h-2" 
            indicatorClassName={metrics.happiness < 30 ? "bg-destructive" : "bg-accent"}
          />
        </div>
      </div>
      
      <div className="flex items-center space-x-2">
        <Bathtub className="text-secondary" size={24} />
        <div className="flex-1">
          <div className="flex justify-between mb-1 text-xs ui-text">
            <span>Cleanliness</span>
            <span>{Math.round(metrics.cleanliness)}%</span>
          </div>
          <Progress 
            value={metrics.cleanliness} 
            className="h-2" 
            indicatorClassName={metrics.cleanliness < 30 ? "bg-destructive" : "bg-secondary"}
          />
        </div>
      </div>
    </div>
  );
};

export default StatusMeters;