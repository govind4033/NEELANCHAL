import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Leaf, Waves } from "lucide-react";
import { Project } from "@/types";

interface ProjectCardProps {
  project: Project;
  onViewDetails: (project: Project) => void;
  actions?: React.ReactNode;
}

const statusColors = {
  pending: 'bg-warning/10 text-warning border-warning/20',
  verified: 'bg-primary/10 text-primary border-primary/20',
  approved: 'bg-success/10 text-success border-success/20',
  active: 'bg-secondary/10 text-secondary border-secondary/20',
};

const typeIcons = {
  'blue-carbon': Waves,
  'biodiversity': Leaf,
  'both': Leaf, // Could be a combined icon
};

export function ProjectCard({ project, onViewDetails, actions }: ProjectCardProps) {
  const TypeIcon = typeIcons[project.projectType];
  
  return (
    <Card className="group hover:shadow-strong transition-all duration-300">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 rounded-full bg-gradient-sky flex items-center justify-center">
              <TypeIcon className="w-5 h-5 text-primary" />
            </div>
            <div>
              <CardTitle className="text-lg">{project.title}</CardTitle>
              <div className="flex items-center text-sm text-muted-foreground mt-1">
                <MapPin className="w-4 h-4 mr-1" />
                {project.location}
              </div>
            </div>
          </div>
          <Badge className={statusColors[project.status]}>
            {project.status}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4 line-clamp-3">
          {project.description}
        </CardDescription>
        
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="text-center p-3 bg-primary/5 rounded-lg">
            <div className="text-lg font-semibold text-primary">{project.credits.carbon}</div>
            <div className="text-xs text-muted-foreground">Carbon Credits</div>
          </div>
          <div className="text-center p-3 bg-secondary/5 rounded-lg">
            <div className="text-lg font-semibold text-secondary">{project.credits.biodiversity}</div>
            <div className="text-xs text-muted-foreground">Biodiversity Credits</div>
          </div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {project.area} hectares
          </div>
          <div className="flex space-x-2">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => onViewDetails(project)}
            >
              View Details
            </Button>
            {actions}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}