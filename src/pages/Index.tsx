import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CourseCard } from "@/components/CourseCard";
import { LoginModal } from "@/components/LoginModal";
import { BookOpen, GraduationCap } from "lucide-react";

const Index = () => {
  const navigate = useNavigate();
  const [showLoginModal, setShowLoginModal] = useState(false);
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


  const handleLaunchLab = (courseId: string) => {
    setSelectedCourse(courseId);
    if (!isLoggedIn) {
      setShowLoginModal(true);
    } else {
      navigate(`/course/${courseId}`);
    }
  };

  const handleLogin = (data: { name: string; email: string; organization: string }) => {
    console.log("User logged in:", data);
    setIsLoggedIn(true);
    setShowLoginModal(false);
    if (selectedCourse) {
      navigate(`/course/${selectedCourse}`);
    }
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

      {/* Login Modal */}
      <LoginModal open={showLoginModal} onClose={() => setShowLoginModal(false)} onLogin={handleLogin} />
    </div>
  );
};

export default Index;
