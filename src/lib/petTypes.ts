// Pet evolution stages
export enum PetStage {
  BABY = 'BABY',
  CHILD = 'CHILD',
  TEEN = 'TEEN',
  ADULT = 'ADULT'
}

// Pet mood states based on care metrics
export enum PetMood {
  HAPPY = 'HAPPY',
  CONTENT = 'CONTENT',
  NEUTRAL = 'NEUTRAL',
  UNHAPPY = 'UNHAPPY',
  SAD = 'SAD'
}

// Care metrics for the pet
export interface PetMetrics {
  hunger: number; // 0-100, 0 is hungry, 100 is full
  happiness: number; // 0-100, 0 is sad, 100 is happy
  cleanliness: number; // 0-100, 0 is dirty, 100 is clean
  age: number; // Age in "pet days"
}

// Pet state including metrics, mood, and evolution stage
export interface PetState {
  name: string;
  metrics: PetMetrics;
  mood: PetMood;
  stage: PetStage;
  lastUpdate: number; // timestamp of last update
  birthday: number; // timestamp of when the pet was created
}

// Initial pet state
export const initialPetState: PetState = {
  name: 'Octocat',
  metrics: {
    hunger: 70,
    happiness: 70,
    cleanliness: 70,
    age: 0
  },
  mood: PetMood.CONTENT,
  stage: PetStage.BABY,
  lastUpdate: Date.now(),
  birthday: Date.now()
};

// Calculate the pet's mood based on its metrics
export const calculateMood = (metrics: PetMetrics): PetMood => {
  const average = (metrics.hunger + metrics.happiness + metrics.cleanliness) / 3;
  
  if (average >= 80) return PetMood.HAPPY;
  if (average >= 60) return PetMood.CONTENT;
  if (average >= 40) return PetMood.NEUTRAL;
  if (average >= 20) return PetMood.UNHAPPY;
  return PetMood.SAD;
};

// Calculate the pet's evolution stage based on age
export const calculateStage = (age: number): PetStage => {
  if (age >= 30) return PetStage.ADULT;
  if (age >= 15) return PetStage.TEEN;
  if (age >= 5) return PetStage.CHILD;
  return PetStage.BABY;
};

// Import our cat pet sprite
import { getCatPetArt } from './catPetSprite';

// Pet ASCII art representation based on stage and mood
export const getPetArt = (stage: PetStage, mood: PetMood): string[][] => {
  // Use our cat pet sprite
  return getCatPetArt(stage, mood);
};