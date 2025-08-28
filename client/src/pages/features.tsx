import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import CropHealthChecker from "@/components/features/crop-health-checker";
import IrrigationTool from "@/components/features/irrigation-tool";
import AIChatbot from "@/components/features/ai-chatbot";
import DroneSimulation from "@/components/features/drone-simulation";
import CropRecommendation from "@/components/features/crop-recommendation";
import BlockchainSelling from "@/components/features/blockchain-selling";
import PlantScanner from "@/components/features/plant-scanner";
import FieldLayout3D from "@/components/features/3d-field-layout";
import Modal from "@/components/ui/modal";
import { 
  CheckCircle, 
  Droplets, 
  MessageSquare, 
  Bot,
  Brain,
  Link as LinkIcon,
  Camera,
  Box
} from "lucide-react";

export default function Features() {
  const [activeFeature, setActiveFeature] = useState<string | null>(null);

  const features = [
    {
      id: "crop-health",
      icon: CheckCircle,
      title: "AI Crop Health Checker",
      description: "Upload crop photos for instant AI analysis of plant health, diseases, and treatment recommendations.",
      color: "primary",
      component: CropHealthChecker,
      badge: null
    },
    {
      id: "irrigation",
      icon: Droplets,
      title: "Smart Irrigation Tool",
      description: "Get precise water recommendations based on soil type, crop variety, and moisture levels.",
      color: "accent",
      component: IrrigationTool,
      badge: null
    },
    {
      id: "chatbot",
      icon: MessageSquare,
      title: "AI Farming Assistant",
      description: "Ask questions and get expert farming advice from our AI chatbot in simple language.",
      color: "secondary",
      component: AIChatbot,
      badge: null
    },
    {
      id: "drone",
      icon: Bot,
      title: "Bot Farming Simulation",
      description: "Interactive demo showing how drones monitor fields and apply precise treatments.",
      color: "destructive",
      component: DroneSimulation,
      badge: null
    },
    {
      id: "crop-recommendation",
      icon: Brain,
      title: "AI Crop Recommendation",
      description: "Get personalized crop suggestions based on your soil type and seasonal conditions.",
      color: "primary",
      component: CropRecommendation,
      badge: null
    },
    {
      id: "blockchain",
      icon: LinkIcon,
      title: "Blockchain Direct Selling",
      description: "Connect directly with buyers using blockchain technology for transparent pricing.",
      color: "accent",
      component: BlockchainSelling,
      badge: null
    },
    {
      id: "plant-scanner",
      icon: Camera,
      title: "Plant Scanner - Main Feature",
      description: "Complete plant analysis including health, soil requirements, fertilizers, and market pricing.",
      color: "primary",
      component: PlantScanner,
      badge: "Featured Tool"
    },
    {
      id: "3d-layout",
      icon: Box,
      title: "3D Field Layout Generator",
      description: "Create interactive 3D field layouts with optimized crop placement and irrigation design.",
      color: "accent",
      component: FieldLayout3D,
      badge: "New Feature"
    }
  ];

  const activeFeatureData = features.find(f => f.id === activeFeature);

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">Smart Farming Features</h1>
          <p className="text-xl text-muted-foreground">Advanced AI-powered tools to revolutionize your agricultural practices</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <Card 
              key={feature.id}
              data-testid={`feature-card-${feature.id}`}
              className={`cursor-pointer hover:shadow-xl transform hover:-translate-y-2 transition-all-300 ${
                feature.badge ? 'border-2 border-primary/20' : ''
              }`}
              onClick={() => setActiveFeature(feature.id)}
            >
              <CardContent className="p-6">
                <div className={`w-16 h-16 bg-${feature.color}/10 rounded-xl flex items-center justify-center mb-6`}>
                  <feature.icon className={`w-8 h-8 text-${feature.color}`} />
                </div>
                <CardTitle className="text-xl font-semibold text-foreground mb-3">
                  {feature.title}
                </CardTitle>
                <p className="text-muted-foreground mb-4">{feature.description}</p>
                {feature.badge && (
                  <Badge className={`bg-${feature.color}/5 border border-${feature.color}/20 text-${feature.color} mb-4`}>
                    🌟 {feature.badge}
                  </Badge>
                )}
                <button 
                  data-testid={`button-try-${feature.id}`}
                  className="text-primary hover:text-primary/80 font-semibold transition-all-300"
                >
                  Try Feature →
                </button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Feature Modal */}
        <Modal
          isOpen={!!activeFeature}
          onClose={() => setActiveFeature(null)}
          title={activeFeatureData?.title || ""}
          size="large"
        >
          {activeFeatureData && (
            <activeFeatureData.component onClose={() => setActiveFeature(null)} />
          )}
        </Modal>
      </div>
    </div>
  );
}
