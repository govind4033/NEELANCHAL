import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Users, Building2, Shield, TrendingUp, ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";
import { useAuth } from "@/contexts/AuthContext";
import { useEffect } from "react";

const features = [
  {
    title: "Community",
    description: "Upload geo-tagged field data, track submissions, and view credits received",
    icon: Users,
    color: 'primary' as const,
  },
  {
    title: "NGO",
    description: "Validate and aggregate community data, submit verified datasets",
    icon: Building2,
    color: 'secondary' as const,
  },
  {
    title: "Government",
    description: "Approve projects, issue credits, monitor registry and analytics",
    icon: Shield,
    color: 'success' as const,
  },
  {
    title: "Investor",
    description: "Browse verified projects, purchase/retire credits, track ESG compliance",
    icon: TrendingUp,
    color: 'warning' as const,
  },
];

export default function Landing() {
  const navigate = useNavigate();
  const { user } = useAuth();

  // Redirect authenticated users to dashboard
  useEffect(() => {
    if (user) {
      navigate('/dashboard');
    }
  }, [user, navigate]);

  const handleGetStarted = () => {
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-hero rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">N</span>
              </div>
              <span className="font-bold text-xl">NEELANCHAL</span>
            </div>
            <div className="text-sm text-muted-foreground">
              Blockchain-based Blue Carbon & Biodiversity Registry
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative bg-gradient-hero text-white py-20 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-20"
          style={{ backgroundImage: `url(${heroImage})` }}
        />
        
        {/* Floating elements for visual appeal */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl animate-pulse"></div>
        <div className="absolute top-40 right-20 w-32 h-32 bg-blue-400/20 rounded-full blur-2xl animate-bounce"></div>
        <div className="absolute bottom-20 left-1/4 w-16 h-16 bg-green-400/20 rounded-full blur-lg animate-pulse"></div>
        <div className="absolute top-1/2 right-10 w-24 h-24 bg-purple-400/20 rounded-full blur-xl animate-pulse"></div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-blue-100 to-green-100 bg-clip-text text-transparent animate-pulse">
            NEELANCHAL
          </h1>
          <p className="text-xl md:text-2xl mb-4 opacity-90 font-semibold">
            Blockchain-based Blue Carbon & Biodiversity Credit Registry
          </p>
          <p className="text-lg mb-8 opacity-80 max-w-3xl mx-auto leading-relaxed">
            Complete MRV (Measurement, Reporting & Verification) System for transparent, 
            tamper-proof carbon and biodiversity credit management
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Button 
              onClick={handleGetStarted}
              size="lg" 
              className="bg-white text-blue-600 hover:bg-white/90 px-10 py-4 text-xl font-semibold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all duration-300 rounded-full border-2 border-white/20 hover:border-white/40"
            >
              <span className="flex items-center gap-3">
                Get Started
                <ArrowRight className="h-6 w-6 animate-pulse" />
              </span>
            </Button>
            
            <div className="flex flex-col sm:flex-row items-center gap-2 text-white/90">
              <span className="text-lg">Already have an account?</span>
              <button 
                onClick={() => navigate('/login')}
                className="text-white font-semibold text-lg underline decoration-2 underline-offset-4 hover:decoration-white/60 hover:text-white transition-all duration-300 hover:scale-105"
              >
                Sign in
              </button>
            </div>
          </div>
          
          {/* Additional attractive elements */}
          <div className="mt-8 flex justify-center">
            <div className="flex items-center gap-2 text-white/70 text-sm">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span>Live Platform • Real-time Data • Secure Transactions</span>
            </div>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-16">
            <div className="bg-white/15 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-3xl font-bold text-white mb-2">5,000+</div>
              <div className="text-sm opacity-90 text-white">Carbon Credits Issued</div>
              <div className="w-full bg-white/20 rounded-full h-1 mt-3">
                <div className="bg-gradient-to-r from-green-400 to-blue-400 h-1 rounded-full w-4/5"></div>
              </div>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-3xl font-bold text-white mb-2">2,500+</div>
              <div className="text-sm opacity-90 text-white">Biodiversity Credits</div>
              <div className="w-full bg-white/20 rounded-full h-1 mt-3">
                <div className="bg-gradient-to-r from-blue-400 to-purple-400 h-1 rounded-full w-3/5"></div>
              </div>
            </div>
            <div className="bg-white/15 backdrop-blur-md rounded-2xl px-8 py-6 border border-white/20 hover:bg-white/20 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
              <div className="text-3xl font-bold text-white mb-2">15</div>
              <div className="text-sm opacity-90 text-white">Active Projects</div>
              <div className="w-full bg-white/20 rounded-full h-1 mt-3">
                <div className="bg-gradient-to-r from-purple-400 to-pink-400 h-1 rounded-full w-2/5"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Platform Roles */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Platform Roles</h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our platform serves different stakeholders in the carbon and biodiversity credit ecosystem
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => {
              const Icon = feature.icon;
              return (
                <div key={feature.title} className="text-center p-6 border rounded-lg hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Overview */}
      <section className="py-20 bg-muted/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Platform Features</h2>
            <p className="text-lg text-muted-foreground">
              Comprehensive tools for transparent carbon and biodiversity credit management
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-ocean rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Blockchain Security</h3>
              <p className="text-muted-foreground">
                Immutable ledger prevents tampering, duplication, and fraud
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-forest rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered MRV</h3>
              <p className="text-muted-foreground">
                Automated measurement, reporting, and verification using AI
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/20 border border-primary/30 rounded-full flex items-center justify-center mx-auto mb-4">
                <Building2 className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Transparent Marketplace</h3>
              <p className="text-muted-foreground">
                Fair pricing and transparent trading of verified credits
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-foreground text-background py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="w-8 h-8 bg-gradient-hero rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">N</span>
            </div>
            <span className="font-bold text-xl">NEELANCHAL</span>
          </div>
          <p className="text-muted-foreground">
            Building a sustainable future through blockchain technology
          </p>
        </div>
      </footer>
    </div>
  );
}