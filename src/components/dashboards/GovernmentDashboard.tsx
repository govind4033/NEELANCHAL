import { StatsCard } from "@/components/StatsCard";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Shield, 
  TrendingUp, 
  Award, 
  FileText, 
  BarChart3, 
  CheckCircle,
  Clock,
  Globe
} from "lucide-react";
import { mockProjects, mockTransactions } from "@/data/mockData";
import { Project } from "@/types";

export function GovernmentDashboard() {
  const pendingApproval = mockProjects.filter(p => p.status === 'verified');
  const approved = mockProjects.filter(p => p.status === 'approved' || p.status === 'active');
  const totalCreditsIssued = mockProjects.reduce((acc, p) => acc + p.credits.carbon + p.credits.biodiversity, 0);
  const totalTransactions = mockTransactions.length;
  
  const handleViewProject = (project: Project) => {
    console.log("View project for approval:", project.id);
  };

  const handleApprove = (project: Project) => {
    console.log("Approve project:", project.id);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Government Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          National Carbon Credit Registry (NCCR) - Monitor, approve, and oversee the entire ecosystem
        </p>
      </div>

      {/* National Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Credits Issued"
          value={totalCreditsIssued.toLocaleString()}
          subtitle="Total carbon + biodiversity"
          icon={Award}
          color="primary"
          trend={{ value: 18, isPositive: true }}
        />
        <StatsCard
          title="Active Projects"
          value={approved.length}
          icon={Globe}
          color="success"
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Pending Approval"
          value={pendingApproval.length}
          icon={Clock}
          color="warning"
        />
        <StatsCard
          title="Total Transactions"
          value={totalTransactions}
          subtitle="Marketplace activity"
          icon={TrendingUp}
          color="secondary"
          trend={{ value: 25, isPositive: true }}
        />
      </div>

      {/* Approval Queue */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Shield className="w-5 h-5 mr-2 text-primary" />
            Projects Awaiting Approval
          </CardTitle>
          <CardDescription>
            Verified projects ready for government approval and credit issuance
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {pendingApproval.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{project.title}</div>
                  <div className="text-sm text-muted-foreground">{project.location}</div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      Verified by: {project.verifiedBy}
                    </Badge>
                    <Badge className="bg-primary/10 text-primary border-primary/20 text-xs">
                      {project.credits.carbon + project.credits.biodiversity} credits
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline">
                    Review
                  </Button>
                  <Button size="sm" onClick={() => handleApprove(project)}>
                    <CheckCircle className="w-4 h-4 mr-1" />
                    Approve
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Registry Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Credit Distribution</CardTitle>
            <CardDescription>Breakdown of issued credits by type</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-primary rounded-full"></div>
                  <span className="text-sm">Carbon Credits</span>
                </div>
                <span className="font-medium">6,300</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-secondary rounded-full"></div>
                  <span className="text-sm">Biodiversity Credits</span>
                </div>
                <span className="font-medium">4,200</span>
              </div>
              <div className="pt-2 border-t">
                <div className="flex items-center justify-between font-medium">
                  <span>Total Credits</span>
                  <span>{totalCreditsIssued.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Market Activity</CardTitle>
            <CardDescription>Recent marketplace transactions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTransactions.slice(0, 3).map((tx) => (
                <div key={tx.id} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <div className="font-medium text-sm">{tx.buyer}</div>
                    <div className="text-xs text-muted-foreground">
                      {tx.type === 'purchase' ? 'Purchased' : 'Retired'} credits
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium text-sm">₹{tx.price.toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">
                      {Object.values(tx.credits).reduce((a, b) => (a || 0) + (b || 0), 0)} credits
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* System Monitoring */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <BarChart3 className="w-5 h-5 mr-2 text-secondary" />
            System Monitoring
          </CardTitle>
          <CardDescription>
            Blockchain and platform health metrics
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-success">99.9%</div>
              <div className="text-sm text-muted-foreground">Uptime</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-primary">2,847</div>
              <div className="text-sm text-muted-foreground">Blockchain Transactions</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary">0</div>
              <div className="text-sm text-muted-foreground">Security Incidents</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}