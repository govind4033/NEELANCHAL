import { DashboardLayout } from "@/components/DashboardLayout";
import { CommunityDashboard } from "@/components/dashboards/CommunityDashboard";
import { NGODashboard } from "@/components/dashboards/NGODashboard";
import { GovernmentDashboard } from "@/components/dashboards/GovernmentDashboard";
import { InvestorDashboard } from "@/components/dashboards/InvestorDashboard";
import { useAuth } from "@/contexts/AuthContext";

export default function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return null; // This should not happen due to ProtectedRoute
  }

  const renderDashboard = () => {
    switch (user.role) {
      case 'community':
        return <CommunityDashboard />;
      case 'ngo':
        return <NGODashboard />;
      case 'government':
        return <GovernmentDashboard />;
      case 'investor':
        return <InvestorDashboard />;
      default:
        return <CommunityDashboard />;
    }
  };

  return (
    <DashboardLayout userRole={user.role} userName={user.username}>
      {renderDashboard()}
    </DashboardLayout>
  );
}