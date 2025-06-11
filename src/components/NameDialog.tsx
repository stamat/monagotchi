import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface NameDialogProps {
  open: boolean;
  onClose: (name?: string) => void;
  currentName: string;
}

const NameDialog = ({ open, onClose, currentName }: NameDialogProps) => {
  const [name, setName] = useState(currentName);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onClose(name.trim());
  };

  return (
    <Dialog open={open} onOpenChange={(isOpen) => !isOpen && onClose()}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="pixel-text text-sm">Name Your Pet</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="flex flex-col space-y-2">
              <Label htmlFor="pet-name" className="ui-text">Pet Name</Label>
              <Input
                id="pet-name"
                placeholder="Enter a name for your pet"
                className="ui-text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                maxLength={12}
                autoFocus
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              className="ui-text"
              disabled={name.trim().length === 0}
            >
              Save Name
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default NameDialog;