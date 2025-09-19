import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface RoleCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  color: 'primary' | 'secondary' | 'success' | 'warning';
  onSelect: () => void;
}

const colorVariants = {
  primary: 'bg-gradient-ocean text-white border-primary/20',
  secondary: 'bg-gradient-forest text-white border-secondary/20',
  success: 'bg-success text-success-foreground border-success/20',
  warning: 'bg-warning text-warning-foreground border-warning/20',
};

export function RoleCard({ title, description, icon: Icon, color, onSelect }: RoleCardProps) {
  return (
    <Card className="group hover:shadow-strong transition-all duration-300 cursor-pointer h-full">
      <CardHeader className="text-center">
        <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center mb-4 ${colorVariants[color]}`}>
          <Icon className="w-8 h-8" />
        </div>
        <CardTitle className="text-xl">{title}</CardTitle>
        <CardDescription className="text-sm">{description}</CardDescription>
      </CardHeader>
      <CardContent className="pt-0">
        <Button 
          onClick={onSelect} 
          className="w-full group-hover:shadow-medium transition-all"
          variant="outline"
        >
          Select Role
        </Button>
      </CardContent>
    </Card>
  );
}