import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, BookOpen, Award } from "lucide-react";

interface CourseCardProps {
  title: string;
  description: string;
  modules: number;
  duration: string;
  level: string;
  onLaunchLab: () => void;
}

export const CourseCard = ({ title, description, modules, duration, level, onLaunchLab }: CourseCardProps) => {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-border bg-gradient-card overflow-hidden">
      <div className="h-1.5 bg-gradient-primary" />
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors">
              {title}
            </CardTitle>
            <CardDescription className="mt-2 text-muted-foreground">
              {description}
            </CardDescription>
          </div>
          <Badge variant="secondary" className="bg-azure-light text-primary font-medium shrink-0">
            {level}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <BookOpen className="h-4 w-4 text-primary" />
            <span>{modules} Modules</span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span>{duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Award className="h-4 w-4 text-primary" />
            <span>Certification</span>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button 
          onClick={onLaunchLab}
          className="w-full bg-gradient-primary hover:opacity-90 transition-opacity"
        >
          Launch Lab Environment
        </Button>
      </CardFooter>
    </Card>
  );
};
