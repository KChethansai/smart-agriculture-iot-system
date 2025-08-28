import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "wouter";
import { 
  Leaf, 
  Droplets, 
  MessageSquare, 
  Bot,
  Brain,
  Link as LinkIcon,
  Camera,
  Box,
  TrendingUp,
  Shield,
  CheckCircle
} from "lucide-react";

export default function Home() {
  const { user } = useAuth();

  const features = [
    {
      icon: CheckCircle,
      title: "AI Crop Health Checker",
      description: "Upload crop photos for instant AI analysis of plant health, diseases, and treatment recommendations.",
      color: "primary",
      path: "/features",
      badge: null
    },
    {
      icon: Droplets,
      title: "Smart Irrigation Tool",
      description: "Get precise water recommendations based on soil type, crop variety, and moisture levels.",
      color: "accent",
      path: "/features",
      badge: null
    },
    {
      icon: MessageSquare,
      title: "AI Farming Assistant",
      description: "Ask questions and get expert farming advice from our AI chatbot in simple language.",
      color: "secondary",
      path: "/features",
      badge: null
    },
    {
      icon: Bot,
      title: "Bot Farming Simulation",
      description: "Interactive demo showing how drones monitor fields and apply precise treatments.",
      color: "destructive",
      path: "/features",
      badge: null
    },
    {
      icon: Brain,
      title: "AI Crop Recommendation",
      description: "Get personalized crop suggestions based on your soil type and seasonal conditions.",
      color: "primary",
      path: "/features",
      badge: null
    },
    {
      icon: LinkIcon,
      title: "Blockchain Direct Selling",
      description: "Connect directly with buyers using blockchain technology for transparent pricing.",
      color: "accent",
      path: "/features",
      badge: null
    },
    {
      icon: Camera,
      title: "Plant Scanner",
      description: "Complete plant analysis including health, soil requirements, fertilizers, and market pricing.",
      color: "primary",
      path: "/features",
      badge: "Featured Tool"
    },
    {
      icon: Box,
      title: "3D Field Layout Generator",
      description: "Create interactive 3D field layouts with optimized crop placement and irrigation design.",
      color: "accent",
      path: "/features",
      badge: "New Feature"
    }
  ];

  const stats = [
    { value: "40%", label: "Increase in Crop Yield", icon: TrendingUp },
    { value: "60%", label: "Water Conservation", icon: Droplets },
    { value: "75%", label: "Reduced Pest Damage", icon: Shield }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        {/* Welcome Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight mb-6">
            Welcome back, <span className="text-primary">{user?.firstName || 'Farmer'}</span>!
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Your smart farming dashboard is ready. Explore AI-powered tools to optimize your agricultural practices and increase your yields.
          </p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} data-testid={`stat-card-${index}`} className="text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-primary" />
                </div>
                <div className="text-3xl font-bold text-primary mb-2">{stat.value}</div>
                <div className="text-muted-foreground">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Features Grid */}
        <div className="mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4 text-center">Smart Farming Tools</h2>
          <p className="text-xl text-muted-foreground mb-12 text-center">Advanced AI-powered features at your fingertips</p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <Link key={index} href={feature.path}>
                <Card 
                  data-testid={`feature-card-${index}`}
                  className={`cursor-pointer hover:shadow-xl transform hover:-translate-y-2 transition-all-300 h-full ${
                    feature.badge ? 'border-2 border-primary/20' : ''
                  }`}
                >
                  <CardContent className="p-6 flex flex-col h-full">
                    <div className={`w-12 h-12 bg-${feature.color}/10 rounded-lg flex items-center justify-center mb-4`}>
                      <feature.icon className={`w-6 h-6 text-${feature.color}`} />
                    </div>
                    <h3 className="text-lg font-semibold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground text-sm mb-4 flex-grow">{feature.description}</p>
                    {feature.badge && (
                      <Badge className={`bg-${feature.color}/10 text-${feature.color} text-xs mb-2`}>
                        {feature.badge}
                      </Badge>
                    )}
                    <Button 
                      data-testid={`button-try-${index}`}
                      variant="ghost" 
                      size="sm" 
                      className="text-primary hover:text-primary/80 p-0 h-auto font-semibold"
                    >
                      Try Feature →
                    </Button>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          <Link href="/dashboard">
            <Card data-testid="card-dashboard" className="cursor-pointer hover:shadow-lg transition-all-300">
              <CardHeader>
                <CardTitle className="text-lg">My Dashboard</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">View saved scans, plans, and layouts</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/features">
            <Card data-testid="card-features" className="cursor-pointer hover:shadow-lg transition-all-300">
              <CardHeader>
                <CardTitle className="text-lg">All Features</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">Explore interactive farming tools</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/solutions">
            <Card data-testid="card-solutions" className="cursor-pointer hover:shadow-lg transition-all-300">
              <CardHeader>
                <CardTitle className="text-lg">Solutions</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">Learn about smart farming workflow</p>
              </CardContent>
            </Card>
          </Link>
          
          <Link href="/contact">
            <Card data-testid="card-support" className="cursor-pointer hover:shadow-lg transition-all-300">
              <CardHeader>
                <CardTitle className="text-lg">Get Support</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm">Contact our farming experts</p>
              </CardContent>
            </Card>
          </Link>
        </div>

        {/* Recent Activity Placeholder */}
        <Card data-testid="card-recent-activity">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8">
              <Leaf className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">Start using our farming tools to see your activity here</p>
              <Link href="/features">
                <Button data-testid="button-start-farming" className="mt-4">
                  Start Smart Farming
                </Button>
              </Link>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
