import { PetStage, PetMood } from './petTypes';

// GitHub cat pet sprite art for different moods
export const getCatPetArt = (stage: PetStage, mood: PetMood): string[][] => {
  // Base cat with glasses sprite art
  const happyContent = [
    "  ▄▄▄▄▄  ",
    " █▀█▀█▀█ ",
    " █ █ █ █ ",
    " ███████ ",
    " █▄▄▄▄▄█ ",
    "  ▀▀▀▀▀  "
  ];

  const neutral = [
    "  ▄▄▄▄▄  ",
    " █▀█▀█▀█ ",
    " █ █ █ █ ",
    " ███████ ",
    " █▄▄▄▄▄█ ",
    "  ▀▀▀▀▀  "
  ];

  const sad = [
    "  ▄▄▄▄▄  ",
    " █▀█▀█▀█ ",
    " █ █ █ █ ",
    " ███████ ",
    " █▄▄▄▄▄█ ",
    "  ▀▀▀▀▀  "
  ];

  // Define modified whiskers based on mood
  const whiskers = {
    happy: [
      "  ▄▄▄▄▄  ",
      " █■█■█■█ ",
      " █ ▀▀▀ █ ",
      "═███████═",
      " █▄▄▄▄▄█ ",
      " ╱     ╲ "
    ],
    content: [
      "  ▄▄▄▄▄  ",
      " █■█■█■█ ",
      " █ ━━━ █ ",
      "═███████═",
      " █▄▄▄▄▄█ ",
      " ╱     ╲ "
    ],
    neutral: [
      "  ▄▄▄▄▄  ",
      " █■█■█■█ ",
      " █ ━━━ █ ",
      "─███████─",
      " █▄▄▄▄▄█ ",
      " ╱     ╲ "
    ],
    unhappy: [
      "  ▄▄▄▄▄  ",
      " █■█■█■█ ",
      " █ ︵︵︵ █ ",
      "─███████─",
      " █▄▄▄▄▄█ ",
      " ╱     ╲ "
    ],
    sad: [
      "  ▄▄▄▄▄  ",
      " █■█■█■█ ",
      " █ ︵︵︵ █ ",
      "─███████─",
      " █▄▄▄▄▄█ ",
      " ╱     ╲ "
    ]
  };

  // Growth variations based on stage
  let petArt;
  
  switch (mood) {
    case PetMood.HAPPY:
      petArt = whiskers.happy;
      break;
    case PetMood.CONTENT:
      petArt = whiskers.content;
      break;
    case PetMood.NEUTRAL:
      petArt = whiskers.neutral;
      break;
    case PetMood.UNHAPPY:
      petArt = whiskers.unhappy;
      break;
    case PetMood.SAD:
      petArt = whiskers.sad;
      break;
    default:
      petArt = whiskers.neutral;
  }
  
  // Add stage-specific modifications
  if (stage === PetStage.BABY) {
    // Baby is slightly smaller
    petArt = petArt.map(line => line.trim());
  } else if (stage === PetStage.TEEN) {
    // Teen has slightly different eyes
    petArt[1] = petArt[1].replace('■█■', '◆█◆');
  } else if (stage === PetStage.ADULT) {
    // Adult has bigger whiskers
    petArt[3] = petArt[3].replace('═', '═══').replace('═', '═══');
    petArt[5] = petArt[5].replace('╱', '╱╱╱').replace('╲', '╲╲╲');
  }

  return petArt;
};