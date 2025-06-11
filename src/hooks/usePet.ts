import { useEffect, useState } from 'react';
import { useKV } from '@github/spark/hooks';
import { toast } from 'sonner';
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
const LOCAL_STORAGE_KEY = 'monagotchi-pet-state';

// Define pet care actions
export enum CareAction {
  FEED = 'FEED',
  PLAY = 'PLAY',
  CLEAN = 'CLEAN'
}

export const usePet = () => {
  // Get persistent pet state from KV store as a backup, but prefer localStorage
  const [storedPet, setStoredPet, deleteStoredPet] = useKV<PetState>('tamagotchi-pet', initialPetState);
  const [pet, setPet] = useState<PetState>(() => {
    // Try to load from localStorage first
    const savedPet = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (savedPet) {
      try {
        return JSON.parse(savedPet);
      } catch (e) {
        console.error('Failed to parse pet data from localStorage', e);
      }
    }
    // Fall back to KV store if localStorage fails
    return storedPet;
  });
  
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

  // Simulate time passed while app was closed
  const simulateTimePassed = (savedPet: PetState) => {
    // No need to simulate if this is a new pet
    if (savedPet === initialPetState) return savedPet;
    
    const now = Date.now();
    const timeSinceLastUpdate = now - savedPet.lastUpdate;
    
    // If less than a minute has passed, don't bother simulating
    if (timeSinceLastUpdate < TIME_FACTOR) return savedPet;
    
    // Calculate time units passed while app was closed
    const timeUnits = timeSinceLastUpdate / TIME_FACTOR;
    const timeInHours = Math.floor(timeSinceLastUpdate / (1000 * 60 * 60));
    const timeInMinutes = Math.floor((timeSinceLastUpdate % (1000 * 60 * 60)) / (1000 * 60));
    
    // Show toast notification about time passed
    if (timeInHours > 0) {
      toast.info(`Your pet was alone for ${timeInHours}h ${timeInMinutes}m!`);
    } else {
      toast.info(`Your pet was alone for ${timeInMinutes} minutes!`);
    }
    
    // Apply decay based on time passed
    let simulatedHunger = Math.max(0, savedPet.metrics.hunger - HUNGER_DECAY * timeUnits);
    let simulatedHappiness = Math.max(0, savedPet.metrics.happiness - HAPPINESS_DECAY * timeUnits);
    let simulatedCleanliness = Math.max(0, savedPet.metrics.cleanliness - CLEANLINESS_DECAY * timeUnits);
    let simulatedAge = savedPet.metrics.age + AGE_INCREASE * timeUnits;
    
    // Cap at minimum values
    simulatedHunger = Math.max(0, simulatedHunger);
    simulatedHappiness = Math.max(0, simulatedHappiness);
    simulatedCleanliness = Math.max(0, simulatedCleanliness);
    
    const simulatedMetrics = {
      hunger: simulatedHunger,
      happiness: simulatedHappiness,
      cleanliness: simulatedCleanliness,
      age: simulatedAge
    };
    
    // Check if pet died while away
    if (simulatedHunger <= 0 && savedPet.metrics.hunger > 0) {
      toast.error(`Oh no! ${savedPet.name} has died from hunger while you were away!`);
    }
    
    return {
      ...savedPet,
      metrics: simulatedMetrics,
      mood: calculateMood(simulatedMetrics),
      stage: calculateStage(simulatedAge),
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
        updatedPet.lastUpdate = Date.now();
        return updatedPet;
      });
      
      setIsAnimating(null);
    }, 2000); // Increased to 2000ms to allow GIFs to play longer
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

  // Initialize pet with time simulation on mount
  useEffect(() => {
    // Simulate time passed since last interaction
    const simulatedPet = simulateTimePassed(pet);
    setPet(simulatedPet);
    
    // Set up interval for periodic updates
    const intervalId = setInterval(() => {
      setPet(currentPet => updateMetricsOverTime(currentPet));
    }, TIME_FACTOR / 10); // Check more frequently than decay occurs
    
    return () => clearInterval(intervalId);
  }, []);

  // Effect to persist pet state to localStorage and KV store whenever it changes
  useEffect(() => {
    // Save to localStorage
    try {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(pet));
    } catch (e) {
      console.error('Failed to save pet state to localStorage', e);
    }
    
    // Also save to KV store as backup
    setStoredPet(pet);
  }, [pet, setStoredPet]);
  
  // Add event listener to save state before page unload
  useEffect(() => {
    const handleBeforeUnload = () => {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify({
          ...pet,
          lastUpdate: Date.now() // Update the timestamp to the exact moment user leaves
        }));
      } catch (e) {
        console.error('Failed to save pet state before unload', e);
      }
    };
    
    window.addEventListener('beforeunload', handleBeforeUnload);
    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [pet]);

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