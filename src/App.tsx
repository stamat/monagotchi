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
    toast.success('Yum! Your pet is eating!');
  };

  const handlePlay = () => {
    playWithPet();
    toast.success('Your pet is having fun playing!');
  };

  const handleClean = () => {
    cleanPet();
    toast.success('Your pet is getting clean!');
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset your pet?')) {
      resetPet();
      toast.info('Your pet has been reset!');
    }
  };

  const handleNameSave = (name?: string) => {
    setNameDialogOpen(false);
    if (name && name !== pet.name) {
      namePet(name);
      toast.success(`Pet renamed to ${name}!`);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted p-4">
      <div className="device-frame bg-background shadow-lg p-6 w-full max-w-sm">
        <Card className="border-4 border-primary">
          <CardHeader className="p-3 bg-primary text-primary-foreground flex flex-row justify-between items-center">
            <CardTitle className="pixel-text text-xs">Pixel Pet</CardTitle>
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={() => setNameDialogOpen(true)} 
              className="text-primary-foreground h-7 w-7"
            >
              <Pencil size={16} />
            </Button>
          </CardHeader>
          
          <CardContent className="p-4 space-y-4">
            <PetDisplay pet={pet} isAnimating={isAnimating} />
            <StatusMeters metrics={pet.metrics} />
            <ActionButtons
              onFeed={handleFeed}
              onPlay={handlePlay}
              onClean={handleClean}
              onReset={handleReset}
              isAnimating={isAnimating}
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