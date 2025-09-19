import { StatsCard } from "@/components/StatsCard";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Clock, AlertTriangle, FileCheck, Users, TrendingUp } from "lucide-react";
import { mockProjects } from "@/data/mockData";
import { Project } from "@/types";

export function NGODashboard() {
  const pendingValidation = mockProjects.filter(p => p.status === 'pending');
  const verified = mockProjects.filter(p => p.verifiedBy === 'WWF India' || p.verifiedBy === 'TERI');
  
  const handleViewProject = (project: Project) => {
    console.log("View project for validation:", project.id);
  };

  const handleValidate = (project: Project) => {
    console.log("Validate project:", project.id);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">NGO Validator Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Validate community data, aggregate datasets, and ensure project quality
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Pending Validation"
          value={pendingValidation.length}
          icon={Clock}
          color="warning"
        />
        <StatsCard
          title="Projects Verified"
          value={verified.length}
          icon={CheckCircle}
          color="success"
          trend={{ value: 20, isPositive: true }}
        />
        <StatsCard
          title="Communities Served"
          value="12"
          icon={Users}
          color="primary"
        />
        <StatsCard
          title="Credits Validated"
          value="8,500"
          subtitle="This quarter"
          icon={TrendingUp}
          color="secondary"
          trend={{ value: 15, isPositive: true }}
        />
      </div>

      {/* Validation Queue */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Clock className="w-5 h-5 mr-2 text-warning" />
            Validation Queue
          </CardTitle>
          <CardDescription>
            Projects awaiting validation and verification
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingValidation.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{project.title}</div>
                  <div className="text-sm text-muted-foreground">{project.location}</div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      {project.area} hectares
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {project.projectType}
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge className="bg-warning/10 text-warning border-warning/20">
                    Urgent
                  </Badge>
                  <Button size="sm" onClick={() => handleValidate(project)}>
                    <FileCheck className="w-4 h-4 mr-1" />
                    Validate
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Validation Workflow */}
      <Card>
        <CardHeader>
          <CardTitle>Validation Workflow</CardTitle>
          <CardDescription>
            Steps to complete project validation
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <FileCheck className="w-6 h-6 text-primary" />
              </div>
              <div className="font-medium">Review Data</div>
              <div className="text-xs text-muted-foreground mt-1">Assess submitted documentation</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <Users className="w-6 h-6 text-secondary" />
              </div>
              <div className="font-medium">Field Visit</div>
              <div className="text-xs text-muted-foreground mt-1">Conduct on-site verification</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <TrendingUp className="w-6 h-6 text-success" />
              </div>
              <div className="font-medium">AI Analysis</div>
              <div className="text-xs text-muted-foreground mt-1">Review AI-generated insights</div>
            </div>
            <div className="text-center p-4 border rounded-lg">
              <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-2">
                <CheckCircle className="w-6 h-6 text-warning" />
              </div>
              <div className="font-medium">Submit Report</div>
              <div className="text-xs text-muted-foreground mt-1">Complete validation report</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Recently Validated Projects */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Recently Validated Projects</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {verified.slice(0, 2).map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewDetails={handleViewProject}
              actions={
                <Button size="sm" variant="outline">
                  View Report
                </Button>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}