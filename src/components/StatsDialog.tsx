import React from 'react';
import { 
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { PetState, PetMetrics, PetMood, PetStage } from '@/lib/petTypes';
import { ChartLineUp } from '@phosphor-icons/react';
import StatusMeters from './StatusMeters';

interface StatsDialogProps {
  pet: PetState;
}

const StatsDialog = ({ pet }: StatsDialogProps) => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button 
          variant="outline" 
          className="ui-text flex items-center gap-2 bg-muted border-primary"
        >
          <ChartLineUp size={20} weight="fill" />
          <span>Stats</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-card border-primary border-2 max-w-xs">
        <DialogHeader>
          <DialogTitle className="pixel-text text-center text-primary">
            {pet.name}'s Stats
          </DialogTitle>
          <DialogDescription className="ui-text text-center">
            Day {Math.floor(pet.metrics.age)} • {pet.mood.toLowerCase()} • {pet.stage.toLowerCase()}
          </DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4">
          <StatusMeters metrics={pet.metrics} />
          
          <div className="text-xs ui-text space-y-1 p-2 bg-muted rounded-md">
            <div className="flex justify-between">
              <span className="font-bold">Current Mood:</span>
              <span>{getPetMoodDescription(pet.mood)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Life Stage:</span>
              <span>{getPetStageDescription(pet.stage)}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-bold">Birthday:</span>
              <span>{getFormattedBirthday(pet.metrics.age)}</span>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

// Helper function to get a friendly mood description
const getPetMoodDescription = (mood: PetMood): string => {
  switch (mood) {
    case PetMood.HAPPY: return "Ecstatic!";
    case PetMood.CONTENT: return "Content";
    case PetMood.NEUTRAL: return "Okay";
    case PetMood.UNHAPPY: return "Unhappy";
    case PetMood.SAD: return "Sad";
    default: return "Unknown";
  }
};

// Helper function to get a friendly stage description
const getPetStageDescription = (stage: PetStage): string => {
  switch (stage) {
    case PetStage.BABY: return "Baby";
    case PetStage.CHILD: return "Child";
    case PetStage.TEEN: return "Teen";
    case PetStage.ADULT: return "Adult";
    default: return "Unknown";
  }
};

// Helper function to calculate birthday based on age
const getFormattedBirthday = (age: number): string => {
  const today = new Date();
  const birthDate = new Date(today);
  birthDate.setDate(today.getDate() - Math.floor(age));
  
  return birthDate.toLocaleDateString('en-US', { 
    month: 'short', 
    day: 'numeric'
  });
};

export default StatsDialog;