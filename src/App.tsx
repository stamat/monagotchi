import React, { useState } from 'react';
import { Pencil } from '@phosphor-icons/react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Toaster } from '@/components/ui/sonner';
import { toast } from 'sonner';

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