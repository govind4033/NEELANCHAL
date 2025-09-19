import { useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { ProjectCard } from "@/components/ProjectCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Filter, MapPin, Leaf, Waves } from "lucide-react";
import { mockProjects } from "@/data/mockData";
import { mockUsers } from "@/data/mockData";
import { UserRole, Project } from "@/types";

export default function Registry() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') as UserRole || 'community';
  const user = mockUsers[role];

  const handleViewProject = (project: Project) => {
    console.log("View project details:", project.id);
  };

  const activeProjects = mockProjects.filter(p => p.status === 'active');
  const totalCredits = mockProjects.reduce((acc, p) => acc + p.credits.carbon + p.credits.biodiversity, 0);

  return (
    <DashboardLayout userRole={role} userName={user.name}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Project Registry</h1>
          <p className="text-muted-foreground mt-2">
            Explore all verified blue carbon and biodiversity projects on the blockchain
          </p>
        </div>

        {/* Registry Statistics */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-primary">{mockProjects.length}</div>
              <div className="text-sm text-muted-foreground">Total Projects</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-success">{activeProjects.length}</div>
              <div className="text-sm text-muted-foreground">Active Projects</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-secondary">{totalCredits.toLocaleString()}</div>
              <div className="text-sm text-muted-foreground">Total Credits</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="p-6 text-center">
              <div className="text-2xl font-bold text-warning">2,750</div>
              <div className="text-sm text-muted-foreground">Hectares Protected</div>
            </CardContent>
          </Card>
        </div>

        {/* Filter and Search */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Search & Filter Projects
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input 
                  placeholder="Search projects by name, location, or description..." 
                  className="w-full"
                />
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">
                  <Waves className="w-4 h-4 mr-1" />
                  Blue Carbon
                </Button>
                <Button variant="outline" size="sm">
                  <Leaf className="w-4 h-4 mr-1" />
                  Biodiversity
                </Button>
                <Button variant="outline" size="sm">
                  <MapPin className="w-4 h-4 mr-1" />
                  Location
                </Button>
                <Button variant="outline" size="sm">
                  <Filter className="w-4 h-4 mr-1" />
                  Status
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Project Categories */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Waves className="w-5 h-5 mr-2" />
                Blue Carbon Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-primary">
                {mockProjects.filter(p => p.projectType === 'blue-carbon' || p.projectType === 'both').length}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Coastal ecosystems and marine conservation
              </p>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-secondary/5">
            <CardHeader>
              <CardTitle className="flex items-center text-secondary">
                <Leaf className="w-5 h-5 mr-2" />
                Biodiversity Projects
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-secondary">
                {mockProjects.filter(p => p.projectType === 'biodiversity' || p.projectType === 'both').length}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                Forest conservation and species protection
              </p>
            </CardContent>
          </Card>

          <Card className="border-success/20 bg-success/5">
            <CardHeader>
              <CardTitle className="flex items-center text-success">
                <MapPin className="w-5 h-5 mr-2" />
                Geographic Coverage
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-success">5</div>
              <p className="text-sm text-muted-foreground mt-1">
                States with active projects
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Project Listings */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">All Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {mockProjects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onViewDetails={handleViewProject}
                actions={
                  role === 'investor' ? (
                    <Button size="sm" variant="outline">
                      View Credits
                    </Button>
                  ) : null
                }
              />
            ))}
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}