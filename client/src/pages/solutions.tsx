import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Modal from "@/components/ui/modal";
import { 
  Cpu, 
  Brain, 
  Box, 
  TrendingUp,
  ChevronRight,
  Leaf,
  Zap,
  CheckCircle
} from "lucide-react";

export default function Solutions() {
  const [activeStep, setActiveStep] = useState<string | null>(null);

  const solutionSteps = [
    {
      id: "sensors",
      title: "IoT Sensors",
      subtitle: "Field Monitoring",
      icon: Cpu,
      color: "primary",
      details: {
        title: "IoT Sensor Network",
        description: "Advanced sensor technology for comprehensive field monitoring",
        benefits: [
          "Real-time soil moisture monitoring",
          "Temperature and humidity tracking",
          "pH and nutrient level detection",
          "Weather condition monitoring",
          "Pest and disease early warning"
        ],
        examples: [
          "Wireless soil moisture sensors placed every 50 meters",
          "Weather stations with solar power backup",
          "Drone-mounted multispectral cameras",
          "Smart irrigation valve controllers"
        ]
      }
    },
    {
      id: "ai",
      title: "AI Analysis",
      subtitle: "Data Processing",
      icon: Brain,
      color: "accent",
      details: {
        title: "AI-Powered Data Analysis",
        description: "Machine learning algorithms process sensor data for actionable insights",
        benefits: [
          "Predictive crop health modeling",
          "Weather pattern analysis",
          "Optimal irrigation scheduling",
          "Pest outbreak predictions",
          "Yield optimization recommendations"
        ],
        examples: [
          "Computer vision for disease detection",
          "Time series analysis for weather prediction",
          "Neural networks for yield forecasting",
          "Natural language processing for market analysis"
        ]
      }
    },
    {
      id: "3d",
      title: "3D Layout",
      subtitle: "Field Optimization",
      icon: Box,
      color: "secondary",
      details: {
        title: "3D Field Layout Optimization",
        description: "Advanced 3D modeling for optimal field design and resource allocation",
        benefits: [
          "Maximized land utilization",
          "Efficient irrigation design",
          "Optimal crop spacing",
          "Drainage system planning",
          "Equipment path optimization"
        ],
        examples: [
          "3D topographic field modeling",
          "Virtual reality field planning",
          "Automated irrigation line design",
          "Solar panel placement optimization"
        ]
      }
    },
    {
      id: "yield",
      title: "Higher Yield",
      subtitle: "Improved Results",
      icon: TrendingUp,
      color: "destructive",
      details: {
        title: "Increased Agricultural Productivity",
        description: "Measurable improvements in crop yield and farm profitability",
        benefits: [
          "35-50% increase in crop yields",
          "40-60% reduction in water usage",
          "30% decrease in fertilizer costs",
          "50% reduction in pesticide use",
          "25% improvement in profit margins"
        ],
        examples: [
          "Corn yields increased from 150 to 225 bushels per acre",
          "Tomato harvest improved by 40% with AI monitoring",
          "Water savings of 2 million gallons per season",
          "Reduced crop loss from 15% to 3%"
        ]
      }
    }
  ];

  const benefits = [
    {
      icon: Leaf,
      title: "Sustainable Farming",
      description: "Reduce environmental impact while maximizing productivity through smart resource management.",
      color: "primary"
    },
    {
      icon: Zap,
      title: "Precision Agriculture",
      description: "Apply the right treatment at the right place and time for optimal crop growth and health.",
      color: "accent"
    },
    {
      icon: CheckCircle,
      title: "Data-Driven Decisions",
      description: "Make informed choices based on real-time data and AI-powered insights for better outcomes.",
      color: "secondary"
    }
  ];

  const activeStepData = solutionSteps.find(step => step.id === activeStep);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Smart Farming Solutions</h1>
          <p className="text-xl text-muted-foreground">End-to-end technology workflow for modern agriculture</p>
        </div>

        {/* Interactive Infographic */}
        <Card className="mb-16 p-8 shadow-xl">
          <div className="grid md:grid-cols-7 gap-4 items-center">
            {solutionSteps.map((step, index) => (
              <div key={step.id} className="contents">
                <div 
                  data-testid={`solution-step-${step.id}`}
                  className="text-center cursor-pointer group"
                  onClick={() => setActiveStep(step.id)}
                >
                  <div className={`w-16 h-16 mx-auto bg-${step.color}/10 rounded-full flex items-center justify-center mb-4 group-hover:bg-${step.color}/20 transition-all-300`}>
                    <step.icon className={`w-8 h-8 text-${step.color}`} />
                  </div>
                  <h4 className="font-semibold text-foreground">{step.title}</h4>
                  <p className="text-sm text-muted-foreground">{step.subtitle}</p>
                </div>
                
                {index < solutionSteps.length - 1 && (
                  <div className="text-center">
                    <ChevronRight className="w-8 h-8 text-muted-foreground mx-auto" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} data-testid={`benefit-${index}`} className="text-center">
              <div className={`w-20 h-20 mx-auto bg-${benefit.color}/10 rounded-2xl flex items-center justify-center mb-6`}>
                <benefit.icon className={`w-10 h-10 text-${benefit.color}`} />
              </div>
              <h3 className="text-xl font-semibold text-foreground mb-3">{benefit.title}</h3>
              <p className="text-muted-foreground">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Implementation Steps */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl">Implementation Process</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { step: "1", title: "Assessment", desc: "Field analysis and needs evaluation" },
                { step: "2", title: "Planning", desc: "Custom solution design and 3D modeling" },
                { step: "3", title: "Installation", desc: "Sensor deployment and system setup" },
                { step: "4", title: "Optimization", desc: "AI training and performance tuning" }
              ].map((item, index) => (
                <div key={index} data-testid={`implementation-step-${index}`} className="text-center">
                  <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mx-auto mb-4 text-primary-foreground font-bold">
                    {item.step}
                  </div>
                  <h4 className="font-semibold text-foreground mb-2">{item.title}</h4>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Solution Step Modal */}
        <Modal
          isOpen={!!activeStep}
          onClose={() => setActiveStep(null)}
          title={activeStepData?.details.title || ""}
          size="large"
        >
          {activeStepData && (
            <div className="space-y-6">
              <p className="text-muted-foreground text-lg">
                {activeStepData.details.description}
              </p>
              
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Key Benefits</h4>
                  <ul className="space-y-2">
                    {activeStepData.details.benefits.map((benefit, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-semibold text-foreground mb-4">Real-World Examples</h4>
                  <ul className="space-y-2">
                    {activeStepData.details.examples.map((example, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <Zap className="w-5 h-5 text-accent mt-0.5 flex-shrink-0" />
                        <span className="text-muted-foreground">{example}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
