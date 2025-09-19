import { ReactNode } from "react";
import { Navigation } from "./Navigation";
import { UserRole } from "@/types";

interface DashboardLayoutProps {
  children: ReactNode;
  userRole: UserRole;
  userName?: string;
}

export function DashboardLayout({ children, userRole, userName }: DashboardLayoutProps) {
  return (
    <div className="min-h-screen bg-background">
      <Navigation userRole={userRole} userName={userName} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}