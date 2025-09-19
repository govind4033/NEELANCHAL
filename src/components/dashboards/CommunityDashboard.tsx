import { StatsCard } from "@/components/StatsCard";
import { ProjectCard } from "@/components/ProjectCard";
import { PhotoUpload } from "@/components/PhotoUpload";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Camera, MapPin, TrendingUp, DollarSign, Award } from "lucide-react";
import { mockProjects } from "@/data/mockData";
import { Project } from "@/types";
import { useState } from "react";

export function CommunityDashboard() {
  const [showPhotoUpload, setShowPhotoUpload] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<any[]>([]);

  const communityProjects = mockProjects.filter(p => 
    p.submittedBy === "Sundarbans Community Group" || 
    p.submittedBy === "Chilika Development Authority"
  );

  const totalCredits = communityProjects.reduce((acc, p) => acc + p.credits.carbon + p.credits.biodiversity, 0);
  const totalEarnings = totalCredits * 120; // Mock calculation

  const handleViewProject = (project: Project) => {
    console.log("View project:", project.id);
  };

  const handleUploadData = () => {
    setShowPhotoUpload(true);
  };

  const handleUploadComplete = (photos: any[]) => {
    setUploadedPhotos(prev => [...prev, ...photos]);
    setShowPhotoUpload(false);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Community Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Upload field data, track your submissions, and monitor credits earned
        </p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Projects Submitted"
          value={communityProjects.length}
          icon={MapPin}
          color="primary"
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Total Credits"
          value={totalCredits.toLocaleString()}
          subtitle="Carbon + Biodiversity"
          icon={Award}
          color="secondary"
          trend={{ value: 23, isPositive: true }}
        />
        <StatsCard
          title="Earnings (₹)"
          value={`₹${totalEarnings.toLocaleString()}`}
          subtitle="From credit sales"
          icon={DollarSign}
          color="success"
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Data Uploads"
          value="47"
          subtitle="This month"
          icon={Upload}
          color="warning"
          trend={{ value: 12, isPositive: true }}
        />
      </div>

      {/* Quick Actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>
            Upload field data and manage your project submissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Button 
              onClick={handleUploadData}
              className="h-20 flex flex-col space-y-2 bg-gradient-ocean hover:shadow-glow"
            >
              <Camera className="w-6 h-6" />
              <span>Upload Photos</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2 border-secondary text-secondary hover:bg-secondary hover:text-secondary-foreground"
            >
              <MapPin className="w-6 h-6" />
              <span>GPS Data</span>
            </Button>
            <Button 
              variant="outline" 
              className="h-20 flex flex-col space-y-2"
            >
              <TrendingUp className="w-6 h-6" />
              <span>View Reports</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Photo Upload Section */}
      {showPhotoUpload && (
        <PhotoUpload 
          onUploadComplete={handleUploadComplete}
          projectId={communityProjects[0]?.id}
        />
      )}

      {/* Recent Data Uploads */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Data Uploads</CardTitle>
          <CardDescription>
            Your latest field data submissions and their verification status
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[
              { date: "2024-09-15", type: "Drone Survey", status: "Verified", project: "Sundarbans Restoration" },
              { date: "2024-09-12", type: "Field Photos", status: "Pending", project: "Chilika Wetland" },
              { date: "2024-09-10", type: "GPS Mapping", status: "Verified", project: "Sundarbans Restoration" },
            ].map((upload, index) => (
              <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <div className="font-medium">{upload.type}</div>
                  <div className="text-sm text-muted-foreground">{upload.project} • {upload.date}</div>
                </div>
                <div className={`px-2 py-1 rounded text-xs font-medium ${
                  upload.status === 'Verified' 
                    ? 'bg-success/10 text-success' 
                    : 'bg-warning/10 text-warning'
                }`}>
                  {upload.status}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Your Projects */}
      <div>
        <h2 className="text-2xl font-semibold mb-6">Your Projects</h2>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {communityProjects.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              onViewDetails={handleViewProject}
              actions={
                <Button size="sm" variant="outline">
                  Upload Data
                </Button>
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
}