import { useEffect, useState } from 'react';
import { useKV } from '@github/spark/hooks';
import { 
  PetState, 
  initialPetState, 
  calculateMood, 
  calculateStage,
  PetMood,
  PetStage
} from '@/lib/petTypes';

// Constants for state changes
const TIME_FACTOR = 1000 * 60; // 1 minute in ms
const HUNGER_DECAY = 5; // per time unit
const HAPPINESS_DECAY = 3; // per time unit
const CLEANLINESS_DECAY = 2; // per time unit
const AGE_INCREASE = 0.5; // per time unit

// Define pet care actions
export enum CareAction {
  FEED = 'FEED',
  PLAY = 'PLAY',
  CLEAN = 'CLEAN'
}

export const usePet = () => {
  // Get persistent pet state from KV store or use initial state
  const [storedPet, setStoredPet, deleteStoredPet] = useKV<PetState>('tamagotchi-pet', initialPetState);
  const [pet, setPet] = useState<PetState>(storedPet);
  const [isAnimating, setIsAnimating] = useState<string | null>(null);

  // Update metrics based on time passed
  const updateMetricsOverTime = (currentPet: PetState) => {
    const now = Date.now();
    const timeDiff = now - currentPet.lastUpdate;
    
    if (timeDiff < TIME_FACTOR / 10) return currentPet; // Don't update too frequently
    
    // Calculate time units passed
    const timeUnits = timeDiff / TIME_FACTOR;
    
    // Calculate new metrics with decay
    const newHunger = Math.max(0, currentPet.metrics.hunger - HUNGER_DECAY * timeUnits);
    const newHappiness = Math.max(0, currentPet.metrics.happiness - HAPPINESS_DECAY * timeUnits);
    const newCleanliness = Math.max(0, currentPet.metrics.cleanliness - CLEANLINESS_DECAY * timeUnits);
    const newAge = currentPet.metrics.age + AGE_INCREASE * timeUnits;
    
    // Update metrics
    const newMetrics = {
      hunger: newHunger,
      happiness: newHappiness,
      cleanliness: newCleanliness,
      age: newAge
    };
    
    // Calculate new mood and stage
    const newMood = calculateMood(newMetrics);
    const newStage = calculateStage(newMetrics.age);
    
    // Return updated pet
    return {
      ...currentPet,
      metrics: newMetrics,
      mood: newMood,
      stage: newStage,
      lastUpdate: now
    };
  };

  // Perform care actions
  const performCareAction = (action: CareAction) => {
    // Show animation for the action
    setIsAnimating(action);
    
    // After a short delay, apply the action effects and stop animation
    setTimeout(() => {
      setPet(currentPet => {
        const updatedPet = { ...currentPet };
        
        switch (action) {
          case CareAction.FEED:
            updatedPet.metrics.hunger = Math.min(100, updatedPet.metrics.hunger + 30);
            break;
          case CareAction.PLAY:
            updatedPet.metrics.happiness = Math.min(100, updatedPet.metrics.happiness + 30);
            break;
          case CareAction.CLEAN:
            updatedPet.metrics.cleanliness = Math.min(100, updatedPet.metrics.cleanliness + 30);
            break;
        }
        
        // Update mood based on new metrics
        updatedPet.mood = calculateMood(updatedPet.metrics);
        return updatedPet;
      });
      
      setIsAnimating(null);
    }, 1000);
  };

  // Reset pet to initial state
  const resetPet = () => {
    const newPet = {
      ...initialPetState,
      lastUpdate: Date.now()
    };
    setPet(newPet);
  };

  // Set a custom name for the pet
  const namePet = (name: string) => {
    setPet(currentPet => ({ ...currentPet, name }));
  };

  // Effect to periodically update metrics based on time
  useEffect(() => {
    // Update metrics immediately on mount
    setPet(currentPet => updateMetricsOverTime(currentPet));
    
    // Set up interval for periodic updates
    const intervalId = setInterval(() => {
      setPet(currentPet => updateMetricsOverTime(currentPet));
    }, TIME_FACTOR / 10); // Check more frequently than decay occurs
    
    return () => clearInterval(intervalId);
  }, []);

  // Effect to persist pet state to KV store whenever it changes
  useEffect(() => {
    setStoredPet(pet);
  }, [pet, setStoredPet]);

  return {
    pet,
    feedPet: () => performCareAction(CareAction.FEED),
    playWithPet: () => performCareAction(CareAction.PLAY),
    cleanPet: () => performCareAction(CareAction.CLEAN),
    resetPet,
    namePet,
    isAnimating
  };
};