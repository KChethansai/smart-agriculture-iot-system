import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Eye, CheckCircle } from "lucide-react";

export default function About() {
  const team = [
    {
      name: "Dr. James Anderson",
      role: "CEO & Agricultural Tech Expert",
      bio: "15+ years in precision agriculture and IoT integration",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Dr. Sarah Kim",
      role: "AI Research Director", 
      bio: "PhD in Machine Learning with focus on agricultural applications",
      image: "https://images.unsplash.com/photo-1494790108755-2616b5c1d13b?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Michael Chen",
      role: "Lead Software Architect",
      bio: "Expert in 3D modeling and agricultural software systems",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face"
    },
    {
      name: "Dr. Emma Rodriguez",
      role: "Sustainability Specialist",
      bio: "Environmental scientist focused on sustainable farming practices",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&w=150&h=150&fit=crop&crop=face"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">About Smart Agricultural Farming</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Leading the revolution in agricultural technology with AI-powered solutions for sustainable and profitable farming
          </p>
        </div>

        {/* Mission & Vision */}
        <div className="grid lg:grid-cols-2 gap-12 mb-20">
          <Card data-testid="mission-card" className="p-8 shadow-lg">
            <div className="w-16 h-16 bg-primary/10 rounded-xl flex items-center justify-center mb-6">
              <Zap className="w-8 h-8 text-primary" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
            <p className="text-muted-foreground leading-relaxed">
              To revolutionize agriculture through cutting-edge AI technology, empowering farmers with intelligent tools that 
              increase yields, reduce waste, and promote sustainable farming practices for a better future.
            </p>
          </Card>

          <Card data-testid="vision-card" className="p-8 shadow-lg">
            <div className="w-16 h-16 bg-accent/10 rounded-xl flex items-center justify-center mb-6">
              <Eye className="w-8 h-8 text-accent" />
            </div>
            <h2 className="text-2xl font-bold text-foreground mb-4">Our Vision</h2>
            <p className="text-muted-foreground leading-relaxed">
              To create a world where every farm operates with precision and intelligence, utilizing AI and 3D modeling to 
              maximize productivity while preserving our environment for future generations.
            </p>
          </Card>
        </div>

        {/* Team Section */}
        <div className="text-center mb-12">
          <h2 className="text-2xl lg:text-3xl font-bold text-foreground mb-4">Meet Our Team</h2>
          <p className="text-xl text-muted-foreground">Experts in agriculture, AI, and technology working together</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {team.map((member, index) => (
            <div 
              key={index}
              data-testid={`team-member-${index}`}
              className="text-center group cursor-pointer"
            >
              <div className="relative mb-6">
                <img 
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full mx-auto shadow-lg group-hover:scale-110 transition-all-300 object-cover"
                />
                <div className="absolute inset-0 bg-primary/20 rounded-full opacity-0 group-hover:opacity-100 transition-all-300"></div>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">{member.name}</h3>
              <Badge variant="secondary" className="mb-3">{member.role}</Badge>
              <p className="text-sm text-muted-foreground">{member.bio}</p>
            </div>
          ))}
        </div>

        {/* Values Section */}
        <Card data-testid="values-card" className="p-8">
          <h2 className="text-2xl font-bold text-foreground mb-8 text-center">Our Core Values</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Innovation</h3>
              <p className="text-muted-foreground">
                Continuously pushing the boundaries of agricultural technology to create smarter, more efficient farming solutions.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Sustainability</h3>
              <p className="text-muted-foreground">
                Committed to developing environmentally responsible solutions that preserve our planet for future generations.
              </p>
            </div>

            <div className="text-center">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-3">Empowerment</h3>
              <p className="text-muted-foreground">
                Providing farmers with the knowledge and tools they need to make informed decisions and achieve success.
              </p>
            </div>
          </div>
        </Card>

        {/* Stats Section */}
        <div className="mt-20 grid md:grid-cols-4 gap-8 text-center">
          <div data-testid="stat-experience">
            <div className="text-3xl font-bold text-primary mb-2">15+</div>
            <div className="text-muted-foreground">Years of Experience</div>
          </div>
          <div data-testid="stat-farms">
            <div className="text-3xl font-bold text-accent mb-2">1000+</div>
            <div className="text-muted-foreground">Farms Optimized</div>
          </div>
          <div data-testid="stat-yield">
            <div className="text-3xl font-bold text-secondary mb-2">40%</div>
            <div className="text-muted-foreground">Average Yield Increase</div>
          </div>
          <div data-testid="stat-savings">
            <div className="text-3xl font-bold text-destructive mb-2">$50M+</div>
            <div className="text-muted-foreground">Farmer Savings Generated</div>
          </div>
        </div>
      </div>
    </div>
  );
}
