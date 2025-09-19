import { useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  FileText, 
  Download, 
  BarChart3, 
  TrendingUp,
  Calendar,
  Filter
} from "lucide-react";
import { mockUsers } from "@/data/mockData";
import { UserRole } from "@/types";

export default function Reports() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') as UserRole || 'community';
  const user = mockUsers[role];

  const handleDownloadReport = (reportName: string) => {
    console.log("Download report:", reportName);
  };

  const handleGenerateReport = () => {
    console.log("Generate new report");
  };

  return (
    <DashboardLayout userRole={role} userName={user.name}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Reports & Analytics</h1>
          <p className="text-muted-foreground mt-2">
            Auto-generated MRV reports, analytics, and compliance documentation
          </p>
        </div>

        {/* Report Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Generated Reports"
            value="156"
            icon={FileText}
            color="primary"
            trend={{ value: 23, isPositive: true }}
          />
          <StatsCard
            title="Downloads"
            value="1,247"
            icon={Download}
            color="secondary"
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Compliance Reports"
            value="24"
            icon={BarChart3}
            color="success"
          />
          <StatsCard
            title="Analytics Views"
            value="3,486"
            icon={TrendingUp}
            color="warning"
            trend={{ value: 32, isPositive: true }}
          />
        </div>

        {/* Quick Actions */}
        <Card>
          <CardHeader>
            <CardTitle>Generate New Report</CardTitle>
            <CardDescription>
              Create custom reports for your projects and analytics
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Button onClick={handleGenerateReport} className="h-20 flex flex-col space-y-2">
                <FileText className="w-6 h-6" />
                <span>MRV Report</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <BarChart3 className="w-6 h-6" />
                <span>Analytics Dashboard</span>
              </Button>
              <Button variant="outline" className="h-20 flex flex-col space-y-2">
                <Calendar className="w-6 h-6" />
                <span>Compliance Report</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Available Reports */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center justify-between">
              <span>Available Reports</span>
              <Button variant="outline" size="sm">
                <Filter className="w-4 h-4 mr-1" />
                Filter
              </Button>
            </CardTitle>
            <CardDescription>
              Generated reports from your projects and activities
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  name: "Sundarbans MRV Report Q3 2024",
                  type: "MRV Analysis",
                  date: "2024-09-15",
                  size: "2.4 MB",
                  format: "PDF",
                  status: "Complete"
                },
                {
                  name: "Blue Carbon Credit Registry Report",
                  type: "Registry Analytics",
                  date: "2024-09-12",
                  size: "1.8 MB",
                  format: "PDF",
                  status: "Complete"
                },
                {
                  name: "Biodiversity Impact Assessment",
                  type: "Impact Report",
                  date: "2024-09-10",
                  size: "3.2 MB",
                  format: "PDF",
                  status: "Complete"
                },
                {
                  name: "Market Transaction Summary",
                  type: "Financial Report",
                  date: "2024-09-08",
                  size: "0.9 MB",
                  format: "CSV",
                  status: "Complete"
                },
                {
                  name: "Chilika Project Analysis",
                  type: "Project Report",
                  date: "2024-09-05",
                  size: "2.1 MB",
                  format: "PDF",
                  status: "Draft"
                }
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-muted/30 transition-colors">
                  <div className="flex-1">
                    <div className="font-medium">{report.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {report.type} • {report.date} • {report.size} • {report.format}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={report.status === 'Complete' ? 'default' : 'outline'}>
                      {report.status}
                    </Badge>
                    <Button 
                      size="sm" 
                      variant="outline"
                      onClick={() => handleDownloadReport(report.name)}
                    >
                      <Download className="w-4 h-4 mr-1" />
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Analytics Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Project Performance</CardTitle>
              <CardDescription>Key metrics across all projects</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Carbon Credits Issued</span>
                  <span className="font-medium">6,300</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Biodiversity Credits</span>
                  <span className="font-medium">4,200</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Total Area Protected</span>
                  <span className="font-medium">2,750 ha</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Active Projects</span>
                  <span className="font-medium">15</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Monthly Growth</CardTitle>
              <CardDescription>Trends over the last 6 months</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">New Projects</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">+23%</span>
                    <TrendingUp className="w-4 h-4 text-success" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Credit Issuance</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">+18%</span>
                    <TrendingUp className="w-4 h-4 text-success" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Market Volume</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">+32%</span>
                    <TrendingUp className="w-4 h-4 text-success" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">User Adoption</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">+45%</span>
                    <TrendingUp className="w-4 h-4 text-success" />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}