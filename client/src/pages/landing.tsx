import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, Leaf, Zap, Shield, TrendingUp, ChevronRight } from "lucide-react";

export default function Landing() {
  const [activeModal, setActiveModal] = useState<string | null>(null);

  const problemSolutions = {
    rainfall: {
      title: 'Smart Rainfall Management',
      solutions: [
        { title: 'AI Weather Prediction', desc: 'Advanced machine learning models analyze weather patterns with 95% accuracy up to 14 days in advance.' },
        { title: 'Smart Irrigation Systems', desc: 'Automated irrigation that adjusts based on rainfall predictions and soil moisture.' },
        { title: 'Water Storage Optimization', desc: 'Smart water collection systems that maximize rainwater harvesting.' }
      ]
    },
    pests: {
      title: 'AI Pest Detection & Control',
      solutions: [
        { title: 'Early Detection Systems', desc: 'Computer vision detects pest infestations 2-3 weeks before visible damage occurs.' },
        { title: 'Precision Treatment', desc: 'Targeted pesticide application using drone technology, reducing chemical usage by 60%.' },
        { title: 'Biological Control', desc: 'AI-recommended beneficial insects to maintain ecological balance.' }
      ]
    },
    soil: {
      title: 'Smart Soil Health Management',
      solutions: [
        { title: 'Real-time Soil Monitoring', desc: 'IoT sensors continuously monitor pH, nutrients, moisture, and organic matter levels.' },
        { title: 'Precision Fertilization', desc: 'AI-calculated fertilizer recommendations based on soil test results.' },
        { title: 'Soil Health Recovery', desc: 'Customized improvement plans using cover crops and sustainable practices.' }
      ]
    },
    market: {
      title: 'Direct Market Access',
      solutions: [
        { title: 'Blockchain Marketplace', desc: 'Connect directly with buyers through secure, transparent blockchain transactions.' },
        { title: 'Price Prediction', desc: 'AI-powered market analysis provides crop price forecasts.' },
        { title: 'Quality Certification', desc: 'Digital quality certificates based on farming practices and analysis.' }
      ]
    }
  };

  const testimonials = [
    {
      name: "John Smith",
      role: "Organic Farm Owner",
      image: "https://images.unsplash.com/photo-1607013251379-e6eecfffe234?ixlib=rb-4.0.3&w=64&h=64&fit=crop&crop=face",
      quote: "The AI crop scanner helped me identify disease early and saved my entire harvest. Incredible technology!"
    },
    {
      name: "Maria Garcia",
      role: "Sustainable Agriculture",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&w=64&h=64&fit=crop&crop=face",
      quote: "Smart irrigation reduced my water usage by 50% while increasing yields. Perfect for drought-prone areas."
    },
    {
      name: "David Chen",
      role: "Tech-Forward Farming",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&w=64&h=64&fit=crop&crop=face",
      quote: "The 3D field layout generator optimized my crop placement. My yields increased by 35% in one season!"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                Transforming Farming with 
                <span className="text-primary"> AI & Smart Technology</span>
              </h1>
              <p className="mt-6 text-xl text-muted-foreground max-w-2xl">
                Revolutionize your agricultural practices with cutting-edge AI, IoT sensors, and 3D field modeling for optimal crop yields and sustainable farming.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Button 
                  data-testid="button-get-started"
                  size="lg" 
                  className="px-8 py-4 text-lg font-semibold transform hover:scale-105 transition-all-300"
                  onClick={() => window.location.href = '/api/login'}
                >
                  Get Started → Login/Sign Up
                </Button>
                <Button 
                  data-testid="button-watch-demo"
                  variant="outline" 
                  size="lg" 
                  className="px-8 py-4 text-lg font-semibold"
                >
                  Watch Demo
                </Button>
              </div>
            </div>
            <div className="relative">
              <img 
                src="https://images.unsplash.com/photo-1500076656116-558758c991c1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="Modern smart farm with green technology" 
                className="rounded-2xl shadow-2xl animate-float" 
              />
              <Badge className="absolute -top-4 -right-4 px-4 py-2 animate-pulse-slow">
                AI Powered
              </Badge>
            </div>
          </div>
        </div>
      </div>

      {/* Farming Problems Cards */}
      <div className="py-20 bg-muted/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Major Farming Challenges</h2>
            <p className="text-xl text-muted-foreground">Discover how smart technology solves traditional agricultural problems</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { key: 'rainfall', icon: CheckCircle, title: 'Rainfall Dependency', desc: 'Unpredictable weather patterns affecting crop irrigation and planning' },
              { key: 'pests', icon: Shield, title: 'Pest & Disease', desc: 'Early detection and treatment of crop diseases and pest infestations' },
              { key: 'soil', icon: Zap, title: 'Soil Health Issues', desc: 'Monitoring soil nutrients, pH levels, and optimal fertilizer application' },
              { key: 'market', icon: TrendingUp, title: 'Market Access', desc: 'Direct connection to buyers and fair pricing for agricultural products' }
            ].map(({ key, icon: Icon, title, desc }) => (
              <Card 
                key={key}
                data-testid={`card-problem-${key}`}
                className="cursor-pointer hover:shadow-xl transform hover:-translate-y-2 transition-all-300"
                onClick={() => setActiveModal(key)}
              >
                <CardContent className="p-6">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-2">{title}</h3>
                  <p className="text-muted-foreground">{desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-20 bg-primary/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div data-testid="stat-yield">
              <div className="text-4xl font-bold text-primary mb-2">40%</div>
              <div className="text-muted-foreground">Increase in Crop Yield</div>
            </div>
            <div data-testid="stat-water">
              <div className="text-4xl font-bold text-accent mb-2">60%</div>
              <div className="text-muted-foreground">Water Conservation</div>
            </div>
            <div data-testid="stat-pest">
              <div className="text-4xl font-bold text-secondary mb-2">75%</div>
              <div className="text-muted-foreground">Reduced Pest Damage</div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials */}
      <div className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">What Farmers Say</h2>
            <p className="text-xl text-muted-foreground">Real stories from farmers using smart agricultural technology</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} data-testid={`testimonial-${index}`}>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img 
                      src={testimonial.image}
                      alt={`Farmer ${testimonial.name}`}
                      className="w-12 h-12 rounded-full mr-4 object-cover" 
                    />
                    <div>
                      <div className="font-semibold text-foreground">{testimonial.name}</div>
                      <div className="text-sm text-muted-foreground">{testimonial.role}</div>
                    </div>
                  </div>
                  <p className="text-muted-foreground">"{testimonial.quote}"</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>

      {/* Problem Solution Modal */}
      {activeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50" onClick={() => setActiveModal(null)}>
          <Card className="max-w-2xl w-full mx-4" onClick={(e) => e.stopPropagation()}>
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold text-foreground">
                  {problemSolutions[activeModal as keyof typeof problemSolutions].title}
                </h3>
                <Button
                  data-testid="button-close-modal"
                  variant="ghost"
                  size="sm"
                  onClick={() => setActiveModal(null)}
                >
                  ✕
                </Button>
              </div>
              <div className="space-y-4">
                {problemSolutions[activeModal as keyof typeof problemSolutions].solutions.map((solution, index) => (
                  <div key={index} className="bg-primary/5 border border-primary/20 rounded-lg p-4">
                    <h4 className="font-semibold text-foreground mb-2">{solution.title}</h4>
                    <p className="text-muted-foreground">{solution.desc}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* CTA Section */}
      <div className="py-20 bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold text-secondary-foreground mb-4">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers already using AI technology to increase yields and reduce costs.
          </p>
          <Button 
            data-testid="button-start-journey"
            size="lg" 
            className="px-8 py-4 text-lg font-semibold bg-primary text-primary-foreground hover:bg-primary/90"
            onClick={() => window.location.href = '/api/login'}
          >
            Start Your Smart Farming Journey
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
