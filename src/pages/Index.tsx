import { useState } from "react";
import { CourseCard } from "@/components/CourseCard";
import { LoginModal } from "@/components/LoginModal";
import { ModuleSelectionModal } from "@/components/ModuleSelectionModal";
import { LaunchingLoader } from "@/components/LaunchingLoader";
import { BookOpen, GraduationCap } from "lucide-react";

const Index = () => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showModuleModal, setShowModuleModal] = useState(false);
  const [showLoader, setShowLoader] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState<string | null>(null);

  const courses = [
    {
      id: "az104",
      title: "AZ-104: Microsoft Azure Administrator",
      description: "Learn to implement, manage, and monitor identity, governance, storage, compute, and virtual networks in Azure.",
      modules: 12,
      duration: "24 hours",
      level: "Intermediate",
    },
    {
      id: "az900",
      title: "AZ-900: Microsoft Azure Fundamentals",
      description: "Foundational knowledge of cloud services and how those services are provided with Microsoft Azure.",
      modules: 8,
      duration: "16 hours",
      level: "Beginner",
    },
    {
      id: "az204",
      title: "AZ-204: Azure Developer Associate",
      description: "Design, build, test, and maintain cloud applications and services on Microsoft Azure.",
      modules: 15,
      duration: "32 hours",
      level: "Advanced",
    },
  ];

  const az104Modules = [
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

  const handleLaunchLab = (courseId: string) => {
    setSelectedCourse(courseId);
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      setShowModuleModal(true);
    }
  };

  const handleLogin = (data: { name: string; email: string; organization: string }) => {
    console.log("User logged in:", data);
    setIsLoggedIn(true);
    setShowLoginModal(false);
    setShowModuleModal(true);
  };

  const handleLaunchModule = (moduleId: string) => {
    console.log("Launching module:", moduleId);
    setShowModuleModal(false);
    setShowLoader(true);
  };

  const handleLaunchComplete = () => {
    setShowLoader(false);
    // Redirect to Azure portal
    window.open("https://portal.azure.com", "_blank");
  };

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
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-3">
            <BookOpen className="h-6 w-6 text-primary" />
            <h2 className="text-3xl font-bold text-foreground">Available Courses</h2>
          </div>
          <p className="text-muted-foreground">
            Select a course and launch interactive labs to practice your Azure skills
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <CourseCard
              key={course.id}
              title={course.title}
              description={course.description}
              modules={course.modules}
              duration={course.duration}
              level={course.level}
              onLaunchLab={() => handleLaunchLab(course.id)}
            />
          ))}
        </div>
      </main>

      {/* Modals and Loaders */}
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />
      <ModuleSelectionModal
        open={showModuleModal}
        onClose={() => setShowModuleModal(false)}
        modules={az104Modules}
        onLaunchModule={handleLaunchModule}
      />
      {showLoader && <LaunchingLoader onComplete={handleLaunchComplete} />}
    </div>
  );
};

export default Index;
