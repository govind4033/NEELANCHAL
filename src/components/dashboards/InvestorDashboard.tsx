import { StatsCard } from "@/components/StatsCard";
import { ProjectCard } from "@/components/ProjectCard";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  ShoppingCart, 
  TrendingUp, 
  Award, 
  Target, 
  DollarSign,
  Activity,
  Leaf,
  Waves
} from "lucide-react";
import { mockProjects, mockTransactions } from "@/data/mockData";
import { Project } from "@/types";

export function InvestorDashboard() {
  const availableProjects = mockProjects.filter(p => p.status === 'active');
  const myTransactions = mockTransactions.filter(tx => tx.buyer === 'Tata Steel Ltd');
  const totalSpent = myTransactions.reduce((acc, tx) => acc + tx.price, 0);
  const totalCredits = myTransactions.reduce((acc, tx) => 
    Object.values(tx.credits).reduce((sum, credits) => sum + (credits || 0), 0), 0
  );
  
  const handleViewProject = (project: Project) => {
    console.log("View project for investment:", project.id);
  };

  const handlePurchase = (project: Project) => {
    console.log("Purchase credits from project:", project.id);
  };

  return (
    <div className="space-y-8">
      {/* Welcome Section */}
      <div>
        <h1 className="text-3xl font-bold text-foreground">Investor Dashboard</h1>
        <p className="text-muted-foreground mt-2">
          Browse verified projects, purchase credits, and track your ESG impact
        </p>
      </div>

      {/* Investment Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatsCard
          title="Credits Owned"
          value={totalCredits}
          subtitle="Carbon + Biodiversity"
          icon={Award}
          color="primary"
          trend={{ value: 32, isPositive: true }}
        />
        <StatsCard
          title="Total Investment"
          value={`₹${totalSpent.toLocaleString()}`}
          icon={DollarSign}
          color="success"
          trend={{ value: 15, isPositive: true }}
        />
        <StatsCard
          title="Projects Invested"
          value={myTransactions.length}
          icon={Target}
          color="secondary"
        />
        <StatsCard
          title="ESG Score"
          value="8.7/10"
          subtitle="Above industry average"
          icon={TrendingUp}
          color="warning"
          trend={{ value: 12, isPositive: true }}
        />
      </div>

      {/* ESG Impact Summary */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Leaf className="w-5 h-5 mr-2 text-secondary" />
            Your Environmental Impact
          </CardTitle>
          <CardDescription>
            Summary of your carbon and biodiversity contributions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-4 bg-primary/5 rounded-lg">
              <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Waves className="w-6 h-6 text-primary" />
              </div>
              <div className="text-2xl font-bold text-primary">300</div>
              <div className="text-sm text-muted-foreground">Carbon Credits Purchased</div>
              <div className="text-xs text-muted-foreground mt-1">Equivalent to 300 tons CO₂</div>
            </div>
            <div className="text-center p-4 bg-secondary/5 rounded-lg">
              <div className="w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Leaf className="w-6 h-6 text-secondary" />
              </div>
              <div className="text-2xl font-bold text-secondary">125</div>
              <div className="text-sm text-muted-foreground">Biodiversity Credits</div>
              <div className="text-xs text-muted-foreground mt-1">Supporting 5 ecosystems</div>
            </div>
            <div className="text-center p-4 bg-success/5 rounded-lg">
              <div className="w-12 h-12 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-2">
                <Activity className="w-6 h-6 text-success" />
              </div>
              <div className="text-2xl font-bold text-success">1,250</div>
              <div className="text-sm text-muted-foreground">Hectares Protected</div>
              <div className="text-xs text-muted-foreground mt-1">Across 3 projects</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Available Investments */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <ShoppingCart className="w-5 h-5 mr-2 text-primary" />
            Available Credit Opportunities
          </CardTitle>
          <CardDescription>
            Verified projects with credits available for purchase
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {availableProjects.slice(0, 3).map((project) => (
              <div key={project.id} className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex-1">
                  <div className="font-medium">{project.title}</div>
                  <div className="text-sm text-muted-foreground">{project.location}</div>
                  <div className="flex items-center space-x-2 mt-2">
                    <Badge variant="outline" className="text-xs">
                      ₹120/credit
                    </Badge>
                    <Badge className="bg-success/10 text-success border-success/20 text-xs">
                      {project.credits.carbon + project.credits.biodiversity} available
                    </Badge>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <Button size="sm" variant="outline" onClick={() => handleViewProject(project)}>
                    View Details
                  </Button>
                  <Button size="sm" onClick={() => handlePurchase(project)}>
                    <ShoppingCart className="w-4 h-4 mr-1" />
                    Purchase
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Transactions */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Transactions</CardTitle>
          <CardDescription>Your credit purchase and retirement history</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {myTransactions.map((transaction) => {
              const project = mockProjects.find(p => p.id === transaction.projectId);
              return (
                <div key={transaction.id} className="flex items-center justify-between p-4 bg-muted/30 rounded-lg">
                  <div>
                    <div className="font-medium">{project?.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {transaction.type === 'purchase' ? 'Purchased' : 'Retired'} • 
                      {transaction.timestamp.toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-medium">₹{transaction.price.toLocaleString()}</div>
                    <div className="text-sm text-muted-foreground">
                      {Object.values(transaction.credits).reduce((a, b) => (a || 0) + (b || 0), 0)} credits
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* CSR Compliance */}
      <Card>
        <CardHeader>
          <CardTitle>CSR Compliance Status</CardTitle>
          <CardDescription>Track your corporate sustainability goals</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Carbon Neutrality Goal (2030)</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-muted rounded-full h-2">
                  <div className="bg-primary h-2 rounded-full" style={{ width: '65%' }}></div>
                </div>
                <span className="text-sm text-muted-foreground">65%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Biodiversity Conservation</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-muted rounded-full h-2">
                  <div className="bg-secondary h-2 rounded-full" style={{ width: '45%' }}></div>
                </div>
                <span className="text-sm text-muted-foreground">45%</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Annual CSR Requirement</span>
              <div className="flex items-center space-x-2">
                <div className="w-32 bg-muted rounded-full h-2">
                  <div className="bg-success h-2 rounded-full" style={{ width: '85%' }}></div>
                </div>
                <span className="text-sm text-muted-foreground">85%</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}