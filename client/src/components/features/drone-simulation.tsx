import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, RotateCcw, Eye, Droplets, Camera } from "lucide-react";

interface DroneSimulationProps {
  onClose: () => void;
}

export default function DroneSimulation({ onClose }: DroneSimulationProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [selectedDrone, setSelectedDrone] = useState<number | null>(null);
  const [simulationStep, setSimulationStep] = useState(0);

  const droneFeatures = [
    {
      id: 1,
      title: "Field Monitoring",
      description: "Real-time crop health assessment using multispectral imaging",
      icon: Eye,
      color: "primary"
    },
    {
      id: 2,
      title: "Precision Spraying",
      description: "Targeted application of fertilizers and pesticides",
      icon: Droplets,
      color: "accent"
    },
    {
      id: 3,
      title: "Data Collection",
      description: "Automated data gathering for informed decision making",
      icon: Camera,
      color: "secondary"
    }
  ];

  const simulationSteps = [
    "Takeoff and initial field scan",
    "Multispectral imaging in progress",
    "Identifying problem areas",
    "Precision spraying treatment",
    "Data collection and analysis",
    "Landing and report generation"
  ];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    
    if (isRunning) {
      interval = setInterval(() => {
        setSimulationStep(prev => (prev + 1) % simulationSteps.length);
      }, 2000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isRunning, simulationSteps.length]);

  const toggleSimulation = () => {
    setIsRunning(!isRunning);
  };

  const resetSimulation = () => {
    setIsRunning(false);
    setSimulationStep(0);
    setSelectedDrone(null);
  };

  return (
    <div className="space-y-6">
      {/* Simulation Controls */}
      <div className="flex justify-center space-x-4">
        <Button
          data-testid="button-toggle-simulation"
          onClick={toggleSimulation}
          variant={isRunning ? "destructive" : "default"}
        >
          {isRunning ? (
            <>
              <Pause className="w-4 h-4 mr-2" />
              Pause Simulation
            </>
          ) : (
            <>
              <Play className="w-4 h-4 mr-2" />
              Start Simulation
            </>
          )}
        </Button>
        
        <Button
          data-testid="button-reset-simulation"
          onClick={resetSimulation}
          variant="outline"
        >
          <RotateCcw className="w-4 h-4 mr-2" />
          Reset
        </Button>
      </div>

      {/* Simulation Display */}
      <Card className="bg-gradient-to-b from-accent/10 to-primary/10 relative overflow-hidden min-h-[400px]">
        <CardContent className="p-8">
          {/* Field Grid */}
          <div className="grid grid-cols-8 gap-2 h-64 mb-6">
            {Array.from({ length: 64 }, (_, index) => (
              <div
                key={index}
                className={`rounded transition-all-300 ${
                  Math.random() > 0.7 
                    ? 'bg-accent/30' 
                    : Math.random() > 0.5 
                      ? 'bg-accent/20' 
                      : 'bg-accent/10'
                }`}
              />
            ))}
          </div>

          {/* Animated Drones */}
          <div className="relative">
            {[1, 2, 3].map((droneId) => (
              <div
                key={droneId}
                data-testid={`drone-${droneId}`}
                className={`absolute w-8 h-8 bg-secondary rounded-full flex items-center justify-center cursor-pointer transition-all-300 transform hover:scale-110 ${
                  isRunning ? 'drone' : ''
                } ${selectedDrone === droneId ? 'ring-2 ring-primary' : ''}`}
                style={{
                  top: `${20 + droneId * 60}px`,
                  left: `${50 + droneId * 30}px`,
                  animationDelay: `${droneId * 1000}ms`
                }}
                onClick={() => setSelectedDrone(selectedDrone === droneId ? null : droneId)}
              >
                <svg className="w-4 h-4 text-secondary-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                </svg>
              </div>
            ))}
          </div>

          {/* Simulation Status */}
          <div className="absolute bottom-4 left-4 right-4">
            <Card className="bg-card/90 backdrop-blur-sm">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium text-foreground">
                      Simulation Status: {isRunning ? "Active" : "Stopped"}
                    </div>
                    {isRunning && (
                      <div className="text-xs text-muted-foreground">
                        Step {simulationStep + 1}: {simulationSteps[simulationStep]}
                      </div>
                    )}
                  </div>
                  <Badge variant={isRunning ? "default" : "secondary"}>
                    {isRunning ? "Running" : "Ready"}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      {/* Drone Information */}
      <div className="grid md:grid-cols-3 gap-6">
        {droneFeatures.map((feature) => (
          <Card 
            key={feature.id}
            data-testid={`drone-feature-${feature.id}`}
            className={`text-center cursor-pointer hover:shadow-lg transition-all-300 ${
              selectedDrone === feature.id ? 'ring-2 ring-primary' : ''
            }`}
            onClick={() => setSelectedDrone(selectedDrone === feature.id ? null : feature.id)}
          >
            <CardContent className="p-6">
              <div className={`w-12 h-12 bg-${feature.color}/10 rounded-lg flex items-center justify-center mx-auto mb-4`}>
                <feature.icon className={`w-6 h-6 text-${feature.color}`} />
              </div>
              <h4 className="font-semibold text-foreground mb-2">{feature.title}</h4>
              <p className="text-sm text-muted-foreground">{feature.description}</p>
              
              {selectedDrone === feature.id && (
                <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded">
                  <p className="text-sm text-primary font-medium">
                    Drone {feature.id} Selected
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Click the drone in the simulation to see its operation
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Simulation Benefits */}
      <Card>
        <CardContent className="p-6">
          <h4 className="font-semibold text-foreground mb-4">Drone Farming Benefits</h4>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold text-primary mb-1">95%</div>
              <div className="text-sm text-muted-foreground">Coverage Accuracy</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-accent mb-1">60%</div>
              <div className="text-sm text-muted-foreground">Less Chemicals</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-secondary mb-1">10x</div>
              <div className="text-sm text-muted-foreground">Faster Than Manual</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-destructive mb-1">24/7</div>
              <div className="text-sm text-muted-foreground">Operation Capability</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
