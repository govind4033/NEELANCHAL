import { useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { StatsCard } from "@/components/StatsCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Satellite, 
  Camera, 
  MapPin, 
  BarChart3, 
  CheckCircle, 
  Clock,
  Brain,
  Upload,
  Activity
} from "lucide-react";
import { mockMRVData, mockUsers } from "@/data/mockData";
import { UserRole } from "@/types";

export default function MRV() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') as UserRole || 'community';
  const user = mockUsers[role];

  const handleUploadData = () => {
    console.log("Upload MRV data");
  };

  const handleRunAnalysis = () => {
    console.log("Run AI analysis");
  };

  return (
    <DashboardLayout userRole={role} userName={user.name}>
      <div className="space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-3xl font-bold text-foreground">MRV System</h1>
          <p className="text-muted-foreground mt-2">
            Measurement, Reporting & Verification - AI-powered monitoring and analysis
          </p>
        </div>

        {/* MRV Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Data Points Collected"
            value="2,847"
            icon={Activity}
            color="primary"
            trend={{ value: 23, isPositive: true }}
          />
          <StatsCard
            title="AI Analyses Complete"
            value="156"
            icon={Brain}
            color="secondary"
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            title="Verified Reports"
            value="89"
            icon={CheckCircle}
            color="success"
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            title="Pending Verification"
            value="12"
            icon={Clock}
            color="warning"
          />
        </div>

        {/* Data Collection Methods */}
        <Card>
          <CardHeader>
            <CardTitle>Data Collection Methods</CardTitle>
            <CardDescription>
              Multiple data sources for comprehensive monitoring
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="text-center p-4 border rounded-lg hover:shadow-medium transition-all">
                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Camera className="w-6 h-6 text-primary" />
                </div>
                <div className="font-medium">Field Photos</div>
                <div className="text-sm text-muted-foreground mt-1">Geo-tagged images</div>
                <div className="text-xs text-success mt-2">847 uploads</div>
              </div>
              
              <div className="text-center p-4 border rounded-lg hover:shadow-medium transition-all">
                <div className="w-12 h-12 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Satellite className="w-6 h-6 text-secondary" />
                </div>
                <div className="font-medium">Drone Surveys</div>
                <div className="text-sm text-muted-foreground mt-1">Aerial monitoring</div>
                <div className="text-xs text-success mt-2">156 flights</div>
              </div>
              
              <div className="text-center p-4 border rounded-lg hover:shadow-medium transition-all">
                <div className="w-12 h-12 bg-warning/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Satellite className="w-6 h-6 text-warning" />
                </div>
                <div className="font-medium">Satellite Data</div>
                <div className="text-sm text-muted-foreground mt-1">Remote sensing</div>
                <div className="text-xs text-success mt-2">Daily updates</div>
              </div>
              
              <div className="text-center p-4 border rounded-lg hover:shadow-medium transition-all">
                <div className="w-12 h-12 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Activity className="w-6 h-6 text-success" />
                </div>
                <div className="font-medium">IoT Sensors</div>
                <div className="text-sm text-muted-foreground mt-1">Real-time monitoring</div>
                <div className="text-xs text-success mt-2">24/7 active</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Community Upload Section */}
        {role === 'community' && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Upload className="w-5 h-5 mr-2 text-primary" />
                Upload Field Data
              </CardTitle>
              <CardDescription>
                Submit geo-tagged photos and sensor readings for your project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <Button onClick={handleUploadData} className="h-24 flex flex-col space-y-2">
                  <Camera className="w-8 h-8" />
                  <span>Upload Photos</span>
                  <span className="text-xs opacity-80">With GPS location</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col space-y-2">
                  <MapPin className="w-8 h-8" />
                  <span>GPS Mapping</span>
                  <span className="text-xs opacity-80">Mark boundaries</span>
                </Button>
                <Button variant="outline" className="h-24 flex flex-col space-y-2">
                  <BarChart3 className="w-8 h-8" />
                  <span>Sensor Data</span>
                  <span className="text-xs opacity-80">Environmental readings</span>
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* AI Analysis Dashboard */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <Brain className="w-5 h-5 mr-2 text-secondary" />
                AI Analysis Results
              </CardTitle>
              <CardDescription>
                Latest AI-powered insights from collected data
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockMRVData.filter(d => d.aiAnalysis).map((data) => (
                  <div key={data.id} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <div className="font-medium">{data.type}</div>
                      <Badge className="bg-success/10 text-success border-success/20">
                        {Math.round(data.aiAnalysis!.confidence * 100)}% confidence
                      </Badge>
                    </div>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <div className="text-muted-foreground">Carbon Sequestration</div>
                        <div className="font-medium text-primary">
                          {data.aiAnalysis!.carbonSequestration} tons/ha
                        </div>
                      </div>
                      <div>
                        <div className="text-muted-foreground">Biodiversity Score</div>
                        <div className="font-medium text-secondary">
                          {data.aiAnalysis!.biodiversityScore}/10
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>MRV Workflow Status</CardTitle>
              <CardDescription>
                Track the verification process for each project
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 bg-primary/5 rounded-lg">
                  <div>
                    <div className="font-medium">Sundarbans Restoration</div>
                    <div className="text-sm text-muted-foreground">Data collection complete</div>
                  </div>
                  <Badge className="bg-success/10 text-success border-success/20">
                    Verified
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-warning/5 rounded-lg">
                  <div>
                    <div className="font-medium">Chilika Lake Restoration</div>
                    <div className="text-sm text-muted-foreground">AI analysis in progress</div>
                  </div>
                  <Badge className="bg-warning/10 text-warning border-warning/20">
                    Processing
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div>
                    <div className="font-medium">Western Ghats Project</div>
                    <div className="text-sm text-muted-foreground">Awaiting field data</div>
                  </div>
                  <Badge variant="outline">
                    Pending
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Verification Reports */}
        <Card>
          <CardHeader>
            <CardTitle>Generated Reports</CardTitle>
            <CardDescription>
              Auto-generated MRV reports in PDF/CSV format
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { name: "Sundarbans MRV Report Q3 2024", date: "2024-09-15", status: "Complete" },
                { name: "Seagrass Conservation Analysis", date: "2024-09-10", status: "Complete" },
                { name: "Western Ghats Biodiversity Assessment", date: "2024-09-05", status: "Complete" },
                { name: "Chilika Lake Monitoring Report", date: "2024-09-01", status: "Draft" },
              ].map((report, index) => (
                <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                  <div>
                    <div className="font-medium">{report.name}</div>
                    <div className="text-sm text-muted-foreground">{report.date}</div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge variant={report.status === 'Complete' ? 'default' : 'outline'}>
                      {report.status}
                    </Badge>
                    <Button size="sm" variant="outline">
                      Download
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}