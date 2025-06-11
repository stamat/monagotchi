import React, { useState, useEffect } from 'react';
import { Pencil, Clock } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';

import { usePet } from '@/hooks/usePet';
import PetDisplay from '@/components/PetDisplay';
import StatusMeters from '@/components/StatusMeters';
import ActionButtons from '@/components/ActionButtons';
import NameDialog from '@/components/NameDialog';
import StatsDialog from '@/components/StatsDialog';

function App() {
  const { 
    pet, 
    feedPet, 
    playWithPet, 
    cleanPet, 
    resetPet, 
    namePet, 
    isAnimating 
  } = usePet();
  
  const [nameDialogOpen, setNameDialogOpen] = useState(false);
  const [lastUpdatedText, setLastUpdatedText] = useState('');

  // Format the last updated time
  useEffect(() => {
    const updateTimestamp = () => {
      const lastUpdate = new Date(pet.lastUpdate);
      const now = new Date();
      const diffInMs = now.getTime() - lastUpdate.getTime();
      
      if (diffInMs < 60000) { // Less than a minute
        setLastUpdatedText('Just now');
      } else if (diffInMs < 3600000) { // Less than an hour
        const minutes = Math.floor(diffInMs / 60000);
        setLastUpdatedText(`${minutes} min${minutes > 1 ? 's' : ''} ago`);
      } else if (diffInMs < 86400000) { // Less than a day
        const hours = Math.floor(diffInMs / 3600000);
        setLastUpdatedText(`${hours} hour${hours > 1 ? 's' : ''} ago`);
      } else { // More than a day
        const days = Math.floor(diffInMs / 86400000);
        setLastUpdatedText(`${days} day${days > 1 ? 's' : ''} ago`);
      }
    };
    
    updateTimestamp();
    const intervalId = setInterval(updateTimestamp, 60000); // Update every minute
    
    return () => clearInterval(intervalId);
  }, [pet.lastUpdate]);

  const handleFeed = () => {
    feedPet();
    toast.success('Yum! Your Mona is eating!');
  };

  const handlePlay = () => {
    playWithPet();
    toast.success('Your Mona is having fun playing!');
  };

  const handleClean = () => {
    cleanPet();
    toast.success('Your Mona is getting clean!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your pet?')) {
      resetPet();
      toast.info('Your Mona has been reset!');
    }
  };

  const handleNameSave = (name?: string) => {
    setNameDialogOpen(false);
    if (name && name !== pet.name) {
      namePet(name);
      toast.success(`Mona renamed to ${name}!`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <div className="device-frame bg-background shadow-lg p-6 w-full max-w-sm">
        <Card className="border-4 border-primary">
          <CardHeader className="p-3 bg-primary text-primary-foreground">
            <CardTitle className="pixel-text text-xs">Monagotchi</CardTitle>
          </CardHeader>
          
          <CardContent className="p-4 space-y-4">
            <PetDisplay 
              pet={pet} 
              isAnimating={isAnimating} 
              onEditName={() => setNameDialogOpen(true)}
            />
            <div className="flex justify-center w-full mt-1">
              <StatsDialog pet={pet} />
            </div>
            <ActionButtons
              onFeed={handleFeed}
              onPlay={handlePlay}
              onClean={handleClean}
              onReset={handleReset}
              isAnimating={isAnimating}
              pet={pet}
            />
          </CardContent>
          <CardFooter className="p-2 border-t border-border flex justify-center">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <div className="text-xs text-muted-foreground flex items-center gap-1 px-2 py-1 rounded-full bg-muted/50 cursor-help">
                    <Clock size={12} />
                    <span>Last Updated: {lastUpdatedText}</span>
                  </div>
                </TooltipTrigger>
                <TooltipContent className="ui-text text-xs p-2">
                  <p>Your pet's status gets updated based on time passed since your last visit.</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardFooter>
        </Card>
      </div>
      
      <NameDialog 
        open={nameDialogOpen} 
        onClose={handleNameSave}
        currentName={pet.name}
      />
      
      <Toaster position="top-center" richColors />
    </div>
  );
}

export default App;