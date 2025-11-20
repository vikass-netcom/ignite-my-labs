import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen, GraduationCap, ArrowLeft, Clock, Rocket } from "lucide-react";
import { useState } from "react";
import { LaunchingLoader } from "@/components/LaunchingLoader";

interface Module {
  id: string;
  title: string;
  description: string;
  duration: string;
  completed?: boolean;
}

const ModuleSelection = () => {
  const navigate = useNavigate();
  const { courseId } = useParams();
  const [showLoader, setShowLoader] = useState(false);
  const [launchingModuleId, setLaunchingModuleId] = useState<string | null>(null);

  // Module data for AZ-104 - user will provide their own list
  const az104Modules: Module[] = [
    {
      id: "mod1",
      title: "Module 1: Identity and Governance",
      description: "Manage Azure Active Directory objects and implement Azure Policy",
      duration: "2 hours",
      completed: true,
    },
    {
      id: "mod2",
      title: "Module 2: Storage Solutions",
      description: "Configure and manage storage accounts, blob storage, and Azure Files",
      duration: "2.5 hours",
    },
    {
      id: "mod3",
      title: "Module 3: Virtual Machines",
      description: "Deploy and configure virtual machines for Windows and Linux",
      duration: "3 hours",
    },
    {
      id: "mod4",
      title: "Module 4: Virtual Networks",
      description: "Implement and manage virtual networking including VNet peering",
      duration: "2.5 hours",
    },
    {
      id: "mod5",
      title: "Module 5: Monitoring and Backup",
      description: "Configure Azure Monitor and implement backup and recovery solutions",
      duration: "2 hours",
    },
  ];

  const handleLaunchModule = (moduleId: string) => {
    setLaunchingModuleId(moduleId);
    setShowLoader(true);
  };

  const handleLaunchComplete = () => {
    setShowLoader(false);
    navigate(`/course/${courseId}/lab/${launchingModuleId}`);
  };

  const courseTitles: Record<string, string> = {
    az104: "AZ-104: Microsoft Azure Administrator",
    az900: "AZ-900: Microsoft Azure Fundamentals",
    az204: "AZ-204: Azure Developer Associate",
  };

  const courseTitle = courseTitles[courseId || "az104"] || "Azure Course";

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-lg bg-gradient-primary flex items-center justify-center">
              <GraduationCap className="h-6 w-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-foreground">Azure Learning Management System</h1>
              <p className="text-sm text-muted-foreground">Practice in real Azure environments</p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Back Button */}
        <Button
          variant="ghost"
          onClick={() => navigate("/")}
          className="mb-6 gap-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Courses
        </Button>

        {/* Page Title */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Select Lab Module</h2>
          </div>
          <p className="text-muted-foreground">
            Choose a module from <span className="font-semibold text-foreground">{courseTitle}</span> to launch your lab environment
          </p>
        </div>

        {/* Modules Grid */}
        <div className="grid grid-cols-1 gap-6 max-w-4xl">
          {az104Modules.map((module) => (
            <Card
              key={module.id}
              className="group hover:shadow-lg transition-all duration-300 border-border bg-gradient-card overflow-hidden"
            >
              <div className="h-1.5 bg-gradient-primary" />
              <CardHeader>
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <BookOpen className="h-5 w-5 text-primary" />
                      <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
                        {module.title}
                      </CardTitle>
                    </div>
                    <CardDescription className="text-muted-foreground">
                      {module.description}
                    </CardDescription>
                  </div>
                  {module.completed && (
                    <Badge variant="secondary" className="bg-success/10 text-success shrink-0">
                      Completed
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 text-primary" />
                    <span>Duration: {module.duration}</span>
                  </div>
                  <Button
                    onClick={() => handleLaunchModule(module.id)}
                    className="bg-gradient-primary hover:opacity-90 transition-opacity gap-2"
                  >
                    <Rocket className="h-4 w-4" />
                    Lab Launch
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </main>

      {/* Loading Screen */}
      {showLoader && <LaunchingLoader onComplete={handleLaunchComplete} />}
    </div>
  );
};

export default ModuleSelection;
