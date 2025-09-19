import { useSearchParams } from "react-router-dom";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Bell, 
  CheckCircle, 
  Clock, 
  AlertTriangle,
  Award,
  ShoppingCart,
  FileText,
  Users
} from "lucide-react";
import { mockUsers } from "@/data/mockData";
import { UserRole } from "@/types";

export default function Notifications() {
  const [searchParams] = useSearchParams();
  const role = searchParams.get('role') as UserRole || 'community';
  const user = mockUsers[role];

  const handleMarkAsRead = (notificationId: string) => {
    console.log("Mark as read:", notificationId);
  };

  const handleMarkAllAsRead = () => {
    console.log("Mark all as read");
  };

  // Role-specific notifications
  const getNotifications = () => {
    const baseNotifications = [
      {
        id: "1",
        title: "System Maintenance Scheduled",
        message: "Blockchain network maintenance on Sept 20, 2024 from 2:00-4:00 AM IST",
        type: "info",
        timestamp: "2 hours ago",
        read: false,
        icon: Bell
      }
    ];

    switch (role) {
      case 'community':
        return [
          ...baseNotifications,
          {
            id: "2",
            title: "Data Verification Complete",
            message: "Your drone survey data for Sundarbans project has been verified by WWF India",
            type: "success",
            timestamp: "1 day ago",
            read: false,
            icon: CheckCircle
          },
          {
            id: "3",
            title: "Credit Payment Received",
            message: "₹15,000 payment received for 125 carbon credits from your Mangrove project",
            type: "success",
            timestamp: "2 days ago",
            read: true,
            icon: Award
          },
          {
            id: "4",
            title: "Upload Reminder",
            message: "Monthly field data upload due for Chilika Lake project",
            type: "warning",
            timestamp: "3 days ago",
            read: false,
            icon: Clock
          }
        ];

      case 'ngo':
        return [
          ...baseNotifications,
          {
            id: "2",
            title: "New Project Submission",
            message: "Coastal Restoration Project from Tamil Nadu Community requires validation",
            type: "info",
            timestamp: "3 hours ago",
            read: false,
            icon: FileText
          },
          {
            id: "3",
            title: "Validation Approved",
            message: "Government approved your validation report for Western Ghats project",
            type: "success",
            timestamp: "1 day ago",
            read: false,
            icon: CheckCircle
          },
          {
            id: "4",
            title: "Field Visit Scheduled",
            message: "Community site visit scheduled for Sept 25, 2024 - Sundarbans location",
            type: "info",
            timestamp: "2 days ago",
            read: true,
            icon: Users
          }
        ];

      case 'government':
        return [
          ...baseNotifications,
          {
            id: "2",
            title: "Projects Awaiting Approval",
            message: "3 verified projects ready for government approval and credit issuance",
            type: "warning",
            timestamp: "1 hour ago",
            read: false,
            icon: Clock
          },
          {
            id: "3",
            title: "Market Anomaly Detected",
            message: "Unusual trading pattern detected - requires investigation",
            type: "error",
            timestamp: "4 hours ago",
            read: false,
            icon: AlertTriangle
          },
          {
            id: "4",
            title: "Monthly Registry Report",
            message: "September 2024 registry analytics report is now available",
            type: "info",
            timestamp: "1 day ago",
            read: true,
            icon: FileText
          }
        ];

      case 'investor':
        return [
          ...baseNotifications,
          {
            id: "2",
            title: "New Credits Available",
            message: "1,200 biodiversity credits now available from Western Ghats project",
            type: "info",
            timestamp: "30 minutes ago",
            read: false,
            icon: ShoppingCart
          },
          {
            id: "3",
            title: "Purchase Confirmed",
            message: "Successfully purchased 100 carbon credits from Sundarbans project",
            type: "success",
            timestamp: "2 days ago",
            read: false,
            icon: Award
          },
          {
            id: "4",
            title: "Price Alert",
            message: "Blue carbon credit prices increased by 12% - consider purchasing now",
            type: "warning",
            timestamp: "3 days ago",
            read: true,
            icon: AlertTriangle
          }
        ];

      default:
        return baseNotifications;
    }
  };

  const notifications = getNotifications();
  const unreadCount = notifications.filter(n => !n.read).length;

  const getNotificationStyle = (type: string, read: boolean) => {
    const baseStyle = read ? 'opacity-60' : '';
    
    switch (type) {
      case 'success':
        return `border-l-4 border-l-success bg-success/5 ${baseStyle}`;
      case 'warning':
        return `border-l-4 border-l-warning bg-warning/5 ${baseStyle}`;
      case 'error':
        return `border-l-4 border-l-destructive bg-destructive/5 ${baseStyle}`;
      default:
        return `border-l-4 border-l-primary bg-primary/5 ${baseStyle}`;
    }
  };

  const getNotificationBadge = (type: string) => {
    switch (type) {
      case 'success':
        return <Badge className="bg-success/10 text-success border-success/20">Success</Badge>;
      case 'warning':
        return <Badge className="bg-warning/10 text-warning border-warning/20">Warning</Badge>;
      case 'error':
        return <Badge className="bg-destructive/10 text-destructive border-destructive/20">Alert</Badge>;
      default:
        return <Badge className="bg-primary/10 text-primary border-primary/20">Info</Badge>;
    }
  };

  return (
    <DashboardLayout userRole={role} userName={user.name}>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Notifications</h1>
            <p className="text-muted-foreground mt-2">
              Real-time updates and alerts for your account activity
            </p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge variant="outline" className="text-primary">
              {unreadCount} unread
            </Badge>
            <Button variant="outline" onClick={handleMarkAllAsRead}>
              Mark All as Read
            </Button>
          </div>
        </div>

        {/* Notification Categories */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card className="text-center">
            <CardContent className="p-4">
              <Bell className="w-8 h-8 mx-auto mb-2 text-primary" />
              <div className="font-medium">All</div>
              <div className="text-sm text-muted-foreground">{notifications.length} total</div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <CheckCircle className="w-8 h-8 mx-auto mb-2 text-success" />
              <div className="font-medium">Success</div>
              <div className="text-sm text-muted-foreground">
                {notifications.filter(n => n.type === 'success').length} notifications
              </div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <Clock className="w-8 h-8 mx-auto mb-2 text-warning" />
              <div className="font-medium">Pending</div>
              <div className="text-sm text-muted-foreground">
                {notifications.filter(n => n.type === 'warning').length} notifications
              </div>
            </CardContent>
          </Card>
          <Card className="text-center">
            <CardContent className="p-4">
              <AlertTriangle className="w-8 h-8 mx-auto mb-2 text-destructive" />
              <div className="font-medium">Alerts</div>
              <div className="text-sm text-muted-foreground">
                {notifications.filter(n => n.type === 'error').length} notifications
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Notifications List */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Notifications</CardTitle>
            <CardDescription>
              Stay updated with the latest activities and alerts
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {notifications.map((notification) => {
                const IconComponent = notification.icon;
                return (
                  <div
                    key={notification.id}
                    className={`p-4 rounded-lg transition-all hover:shadow-medium ${getNotificationStyle(notification.type, notification.read)}`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start space-x-3 flex-1">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          notification.type === 'success' ? 'bg-success/20' :
                          notification.type === 'warning' ? 'bg-warning/20' :
                          notification.type === 'error' ? 'bg-destructive/20' :
                          'bg-primary/20'
                        }`}>
                          <IconComponent className={`w-5 h-5 ${
                            notification.type === 'success' ? 'text-success' :
                            notification.type === 'warning' ? 'text-warning' :
                            notification.type === 'error' ? 'text-destructive' :
                            'text-primary'
                          }`} />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-1">
                            <h3 className="font-medium">{notification.title}</h3>
                            {!notification.read && (
                              <div className="w-2 h-2 bg-primary rounded-full"></div>
                            )}
                          </div>
                          <p className="text-sm text-muted-foreground mb-2">
                            {notification.message}
                          </p>
                          <div className="flex items-center justify-between">
                            <span className="text-xs text-muted-foreground">
                              {notification.timestamp}
                            </span>
                            {getNotificationBadge(notification.type)}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2 ml-4">
                        {!notification.read && (
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleMarkAsRead(notification.id)}
                          >
                            Mark as Read
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </DashboardLayout>
  );
}