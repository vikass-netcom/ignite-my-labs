import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { CheckCircle2, Circle, BookOpen } from "lucide-react";
import { useState } from "react";

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed?: boolean;
}

interface ModuleSelectionModalProps {
  open: boolean;
  onClose: () => void;
  modules: Module[];
  onLaunchModule: (moduleId: string) => void;
}

export const ModuleSelectionModal = ({ open, onClose, modules, onLaunchModule }: ModuleSelectionModalProps) => {
  const [selectedModule, setSelectedModule] = useState<string | null>(null);

  const handleLaunch = () => {
    if (selectedModule) {
      onLaunchModule(selectedModule);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-semibold">Select Lab Module</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Choose which module you'd like to practice in the lab environment
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="max-h-[400px] pr-4">
          <div className="space-y-3 mt-4">
            {modules.map((module) => (
              <div
                key={module.id}
                onClick={() => setSelectedModule(module.id)}
                className={`p-4 rounded-lg border-2 cursor-pointer transition-all duration-200 ${
                  selectedModule === module.id
                    ? "border-primary bg-azure-light shadow-md"
                    : "border-border hover:border-primary/50 hover:shadow-sm"
                }`}
              >
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {selectedModule === module.id ? (
                      <CheckCircle2 className="h-5 w-5 text-primary" />
                    ) : (
                      <Circle className="h-5 w-5 text-muted-foreground" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <BookOpen className="h-4 w-4 text-primary" />
                      <h4 className="font-semibold text-foreground">{module.title}</h4>
                      {module.completed && (
                        <Badge variant="secondary" className="bg-success/10 text-success">
                          Completed
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{module.description}</p>
                    <span className="text-xs text-muted-foreground">Duration: {module.duration}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
        <div className="flex gap-3 mt-4">
          <Button variant="outline" onClick={onClose} className="flex-1">
            Cancel
          </Button>
          <Button
            onClick={handleLaunch}
            disabled={!selectedModule}
            className="flex-1 bg-gradient-primary hover:opacity-90 transition-opacity"
          >
            Launch Selected Module
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
