import { useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { 
  ShoppingCart, 
  TrendingUp, 
  DollarSign, 
  Award,
  Search,
  Leaf,
  Waves,
  Activity
} from "lucide-react";
import { mockProjects, mockTransactions, mockUsers } from "@/data/mockData";
import { UserRole, Project } from "@/types";

export default function Marketplace() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') as UserRole || 'community';
  const user = mockUsers[role];

  const availableProjects = mockProjects.filter(p => p.status === 'active');
  const totalTransactionValue = mockTransactions.reduce((acc, tx) => acc + tx.price, 0);
  const avgPrice = totalTransactionValue / mockTransactions.length;

  const handlePurchaseCredits = (project: Project) => {
    console.log("Purchase credits from:", project.title);
  };

  const handleRetireCredits = (project: Project) => {
    console.log("Retire credits from:", project.title);
  };

  return (
    <DashboardLayout userRole={role} userName={user.name}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">Credit Marketplace</h1>
          <p className="text-muted-foreground mt-2">
            Trade verified carbon and biodiversity credits on the blockchain
          </p>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Available Credits"
            value="12,450"
            subtitle="Carbon + Biodiversity"
            icon={Award}
            color="primary"
            trend={{ value: 15, isPositive: true }}
          />
          <StatsCard
            title="Market Volume"
            value={`₹${totalTransactionValue.toLocaleString()}`}
            subtitle="Last 30 days"
            icon={DollarSign}
            color="success"
            trend={{ value: 23, isPositive: true }}
          />
          <StatsCard
            title="Average Price"
            value={`₹${Math.round(avgPrice)}`}
            subtitle="Per credit"
            icon={TrendingUp}
            color="secondary"
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Active Traders"
            value="47"
            subtitle="This month"
            icon={Activity}
            color="warning"
            trend={{ value: 12, isPositive: true }}
          />
        </div>

        {/* Market Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="border-primary/20 bg-primary/5">
            <CardHeader>
              <CardTitle className="flex items-center text-primary">
                <Waves className="w-5 h-5 mr-2" />
                Blue Carbon Credits
              </CardTitle>
              <CardDescription>
                Credits from coastal and marine ecosystems
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold text-primary">6,800</div>
                  <div className="text-sm text-muted-foreground">Available credits</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">₹115</div>
                  <div className="text-sm text-muted-foreground">Avg price</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-secondary/20 bg-secondary/5">
            <CardHeader>
              <CardTitle className="flex items-center text-secondary">
                <Leaf className="w-5 h-5 mr-2" />
                Biodiversity Credits
              </CardTitle>
              <CardDescription>
                Credits from biodiversity conservation projects
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-between items-center">
                <div>
                  <div className="text-2xl font-bold text-secondary">5,650</div>
                  <div className="text-sm text-muted-foreground">Available credits</div>
                </div>
                <div className="text-right">
                  <div className="text-lg font-semibold">₹125</div>
                  <div className="text-sm text-muted-foreground">Avg price</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Search className="w-5 h-5 mr-2" />
              Find Credits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <Input placeholder="Search by project name or location..." />
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
                  Price Range
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Available Credits */}
        <div>
          <h2 className="text-2xl font-semibold mb-6">Available Credits</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {availableProjects.map((project) => (
              <Card key={project.id} className="hover:shadow-strong transition-all">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <div className="w-2 h-2 bg-success rounded-full mr-2"></div>
                        {project.location}
                      </CardDescription>
                    </div>
                    <Badge className="bg-success/10 text-success border-success/20">
                      Active
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Credit Availability */}
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center p-3 bg-primary/5 rounded-lg">
                        <div className="text-lg font-semibold text-primary">
                          {project.credits.carbon}
                        </div>
                        <div className="text-xs text-muted-foreground">Carbon Credits</div>
                        <div className="text-xs font-medium text-primary mt-1">₹115 each</div>
                      </div>
                      <div className="text-center p-3 bg-secondary/5 rounded-lg">
                        <div className="text-lg font-semibold text-secondary">
                          {project.credits.biodiversity}
                        </div>
                        <div className="text-xs text-muted-foreground">Biodiversity Credits</div>
                        <div className="text-xs font-medium text-secondary mt-1">₹125 each</div>
                      </div>
                    </div>

                    {/* Project Details */}
                    <div className="text-sm text-muted-foreground">
                      <div>Area: {project.area} hectares</div>
                      <div>Project Type: {project.projectType}</div>
                      <div>Verified by: {project.verifiedBy}</div>
                    </div>

                    {/* Action Buttons */}
                    {role === 'investor' && (
                      <div className="flex space-x-2">
                        <Button 
                          onClick={() => handlePurchaseCredits(project)}
                          className="flex-1"
                        >
                          <ShoppingCart className="w-4 h-4 mr-1" />
                          Purchase
                        </Button>
                        <Button 
                          variant="outline"
                          onClick={() => handleRetireCredits(project)}
                          className="flex-1"
                        >
                          Retire Credits
                        </Button>
                      </div>
                    )}
                    
                    {role !== 'investor' && (
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Market Activity</CardTitle>
            <CardDescription>
              Latest credit purchases and retirements on the blockchain
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockTransactions.map((transaction) => {
                const project = mockProjects.find(p => p.id === transaction.projectId);
                return (
                  <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex-1">
                      <div className="font-medium">{project?.title}</div>
                      <div className="text-sm text-muted-foreground">
                        {transaction.buyer} • {transaction.timestamp.toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-center mx-4">
                      <Badge variant={transaction.type === 'purchase' ? 'default' : 'outline'}>
                        {transaction.type}
                      </Badge>
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

        {/* Market Insights */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Price Trends</CardTitle>
              <CardDescription>Credit pricing over the last 30 days</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-sm">Carbon Credits</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">₹115</span>
                    <span className="text-xs text-success">+12%</span>
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm">Biodiversity Credits</span>
                  <div className="flex items-center space-x-2">
                    <span className="font-medium">₹125</span>
                    <span className="text-xs text-success">+8%</span>
                  </div>
                </div>
                <div className="pt-2 border-t">
                  <div className="text-xs text-muted-foreground">
                    Prices have increased due to growing corporate demand for ESG compliance
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Trading Volume</CardTitle>
              <CardDescription>Monthly trading activity</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">₹{totalTransactionValue.toLocaleString()}</div>
                  <div className="text-sm text-muted-foreground">Total volume this month</div>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div>
                    <div className="font-medium">24</div>
                    <div className="text-xs text-muted-foreground">Purchases</div>
                  </div>
                  <div>
                    <div className="font-medium">8</div>
                    <div className="text-xs text-muted-foreground">Retirements</div>
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