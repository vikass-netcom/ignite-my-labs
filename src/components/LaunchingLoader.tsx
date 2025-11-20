import { useEffect, useState } from "react";
import { Progress } from "@/components/ui/progress";
import { Loader2, CheckCircle2, Server, Cloud, Shield } from "lucide-react";

interface LaunchingLoaderProps {
  onComplete: () => void;
}

export const LaunchingLoader = ({ onComplete }: LaunchingLoaderProps) => {
  const [progress, setProgress] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { icon: Server, label: "Initializing lab environment", duration: 1000 },
    { icon: Cloud, label: "Provisioning Azure resources", duration: 1500 },
    { icon: Shield, label: "Configuring security policies", duration: 1200 },
    { icon: CheckCircle2, label: "Finalizing setup", duration: 800 },
  ];

  useEffect(() => {
    const totalDuration = steps.reduce((acc, step) => acc + step.duration, 0);
    let elapsed = 0;

    const interval = setInterval(() => {
      elapsed += 50;
      const newProgress = Math.min((elapsed / totalDuration) * 100, 100);
      setProgress(newProgress);

      let stepDuration = 0;
      for (let i = 0; i < steps.length; i++) {
        stepDuration += steps[i].duration;
        if (elapsed < stepDuration) {
          setCurrentStep(i);
          break;
        }
      }

      if (elapsed >= totalDuration) {
        clearInterval(interval);
        setTimeout(onComplete, 500);
      }
    }, 50);

    return () => clearInterval(interval);
  }, [onComplete]);

  const CurrentIcon = steps[currentStep]?.icon || Loader2;

  return (
    <div className="fixed inset-0 bg-background/95 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="max-w-md w-full mx-4 p-8 bg-card rounded-xl shadow-lg border border-border">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl animate-pulse" />
            <CurrentIcon className="h-16 w-16 text-primary animate-spin relative" />
          </div>
          
          <div className="space-y-2 w-full">
            <h2 className="text-2xl font-semibold text-foreground">Launching Lab Environment</h2>
            <p className="text-muted-foreground">Please wait while we prepare your Azure lab...</p>
          </div>

          <div className="w-full space-y-4">
            <Progress value={progress} className="h-2" />
            
            <div className="space-y-3">
              {steps.map((step, index) => {
                const StepIcon = step.icon;
                const isCompleted = index < currentStep;
                const isCurrent = index === currentStep;
                
                return (
                  <div
                    key={index}
                    className={`flex items-center gap-3 text-sm transition-all duration-300 ${
                      isCompleted ? "text-success" : isCurrent ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 className="h-5 w-5 shrink-0" />
                    ) : isCurrent ? (
                      <Loader2 className="h-5 w-5 animate-spin shrink-0" />
                    ) : (
                      <StepIcon className="h-5 w-5 shrink-0 opacity-50" />
                    )}
                    <span className={isCurrent ? "font-medium" : ""}>{step.label}</span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
