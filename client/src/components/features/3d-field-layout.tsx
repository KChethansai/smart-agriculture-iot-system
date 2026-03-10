import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { 
  Box, 
  RotateCcw, 
  ZoomIn, 
  Download, 
  TrendingUp, 
  Droplets,
  Clock,
  Settings
} from "lucide-react";

interface FieldLayout3DProps {
  onClose: () => void;
}

export default function FieldLayout3D({ onClose }: FieldLayout3DProps) {
  const { toast } = useToast();
  const [fieldData, setFieldData] = useState({
    name: "",
    length: "",
    width: "",
    soilType: "",
    cropType: "",
    farmingGoal: ""
  });
  const [layout, setLayout] = useState<any>(null);
  const [viewMode, setViewMode] = useState("3d");

  const generateMutation = useMutation({
    mutationFn: async (data: typeof fieldData) => {
      return apiRequest("POST", "/api/field-layouts", {
        ...data,
        length: parseFloat(data.length),
        width: parseFloat(data.width),
        layoutData: generateLayoutData(data),
        efficiency: calculateEfficiency(data),
      });
    },
    onSuccess: (data) => {
      setLayout(data);
      toast({
        title: "3D Layout Generated",
        description: "Your optimized field layout has been created and saved.",
      });
    },
    onError: (error: Error) => {
      if (isUnauthorizedError(error)) {
        toast({
          title: "Unauthorized",
          description: "You are logged out. Logging in again...",
          variant: "destructive",
        });
        setTimeout(() => {
          window.location.href = "/api/login";
        }, 500);
        return;
      }
      toast({
        title: "Generation Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const generateLayoutData = (data: typeof fieldData) => {
    // Generate optimized layout based on inputs
    const area = parseFloat(data.length) * parseFloat(data.width);
    const rowSpacing = data.cropType === "corn" ? 0.75 : 0.5;
    const plantSpacing = data.cropType === "tomatoes" ? 0.6 : 0.3;
    
    return {
      area,
      rowSpacing,
      plantSpacing,
      irrigationLines: Math.ceil(parseFloat(data.length) / 10),
      dronePathways: Math.ceil(parseFloat(data.width) / 20),
      estimatedPlants: Math.floor(area / (rowSpacing * plantSpacing)),
      waterSources: Math.max(1, Math.floor(area / 500)),
    };
  };

  const calculateEfficiency = (data: typeof fieldData): number => {
    let efficiency = 85; // Base efficiency
    
    // Adjust based on soil type
    if (data.soilType === "loam") efficiency += 10;
    else if (data.soilType === "clay") efficiency += 5;
    
    // Adjust based on farming goal
    if (data.farmingGoal === "maximize-yield") efficiency += 5;
    else if (data.farmingGoal === "water-conservation") efficiency += 3;
    
    return Math.min(98, efficiency);
  };

  const handleGenerate = () => {
    if (!fieldData.length || !fieldData.width || !fieldData.soilType || !fieldData.cropType || !fieldData.farmingGoal) {
      toast({
        title: "Missing Information",
        description: "Please fill in all field details.",
        variant: "destructive",
      });
      return;
    }

    generateMutation.mutate(fieldData);
  };

  const downloadLayout = () => {
    if (!layout || !layout.layoutData) return;
    
    const layoutReport = `
3D Field Layout Report
Generated: ${new Date().toLocaleDateString()}

Field Information:
- Name: ${layout.name || 'Unnamed Field'}
- Dimensions: ${layout.length}m x ${layout.width}m
- Total Area: ${(layout.layoutData.area || 0).toFixed(2)} m²
- Soil Type: ${layout.soilType}
- Crop Type: ${layout.cropType}
- Farming Goal: ${layout.farmingGoal}

Layout Optimization:
- Efficiency: ${layout.efficiency}%
- Row Spacing: ${layout.layoutData.rowSpacing}m
- Plant Spacing: ${layout.layoutData.plantSpacing}m
- Estimated Plants: ${layout.layoutData.estimatedPlants}
- Irrigation Lines: ${layout.layoutData.irrigationLines}
- Drone Pathways: ${layout.layoutData.dronePathways}
- Water Sources: ${layout.layoutData.waterSources}

Benefits:
- Optimized for ${layout.farmingGoal.replace('-', ' ')}
- Efficient resource utilization
- Automated irrigation coverage
- Drone-friendly field access
    `;

    const blob = new Blob([layoutReport], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `field-layout-${new Date().toISOString().split('T')[0]}.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast({
      title: "Layout Downloaded",
      description: "3D field layout report has been downloaded successfully.",
    });
  };

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <Label htmlFor="field-name">Field Name</Label>
            <Input
              data-testid="input-field-name"
              id="field-name"
              placeholder="Enter field name"
              value={fieldData.name}
              onChange={(e) => setFieldData(prev => ({ ...prev, name: e.target.value }))}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="length">Length (meters)</Label>
              <Input
                data-testid="input-length"
                id="length"
                type="number"
                placeholder="100"
                value={fieldData.length}
                onChange={(e) => setFieldData(prev => ({ ...prev, length: e.target.value }))}
              />
            </div>
            <div>
              <Label htmlFor="width">Width (meters)</Label>
              <Input
                data-testid="input-width"
                id="width"
                type="number"
                placeholder="50"
                value={fieldData.width}
                onChange={(e) => setFieldData(prev => ({ ...prev, width: e.target.value }))}
              />
            </div>
          </div>

          <div>
            <Label htmlFor="soil-type">Soil Type</Label>
            <Select value={fieldData.soilType} onValueChange={(value) => setFieldData(prev => ({ ...prev, soilType: value }))}>
              <SelectTrigger data-testid="select-soil-type">
                <SelectValue placeholder="Select soil type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clay">Clay Loam</SelectItem>
                <SelectItem value="sandy">Sandy Loam</SelectItem>
                <SelectItem value="loam">Loam</SelectItem>
                <SelectItem value="silt">Silt Loam</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="crop-type">Primary Crop</Label>
            <Select value={fieldData.cropType} onValueChange={(value) => setFieldData(prev => ({ ...prev, cropType: value }))}>
              <SelectTrigger data-testid="select-crop-type">
                <SelectValue placeholder="Select primary crop" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="corn">Corn</SelectItem>
                <SelectItem value="soybeans">Soybeans</SelectItem>
                <SelectItem value="wheat">Wheat</SelectItem>
                <SelectItem value="tomatoes">Tomatoes</SelectItem>
                <SelectItem value="lettuce">Lettuce</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="farming-goal">Farming Goal</Label>
            <Select value={fieldData.farmingGoal} onValueChange={(value) => setFieldData(prev => ({ ...prev, farmingGoal: value }))}>
              <SelectTrigger data-testid="select-farming-goal">
                <SelectValue placeholder="Select farming goal" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="maximize-yield">Maximize Yield</SelectItem>
                <SelectItem value="water-conservation">Water Conservation</SelectItem>
                <SelectItem value="mixed-farming">Mixed Farming</SelectItem>
                <SelectItem value="organic-farming">Organic Farming</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            data-testid="button-generate-layout"
            onClick={handleGenerate}
            disabled={generateMutation.isPending}
            className="w-full"
            size="lg"
          >
            {generateMutation.isPending ? "Generating..." : "🏗️ Generate 3D Layout"}
          </Button>
        </div>

        {/* 3D Visualization Section */}
        <div>
          <Card className="bg-gradient-to-br from-accent/10 to-primary/10 relative min-h-[500px]">
            <CardContent className="p-6">
              {/* 3D Controls */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <Button 
                  data-testid="button-rotate"
                  variant="outline" 
                  size="sm"
                  className="bg-card/90 backdrop-blur-sm"
                  title="Rotate View"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
                <Button 
                  data-testid="button-zoom"
                  variant="outline" 
                  size="sm"
                  className="bg-card/90 backdrop-blur-sm"
                  title="Zoom"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button 
                  data-testid="button-settings"
                  variant="outline" 
                  size="sm"
                  className="bg-card/90 backdrop-blur-sm"
                  title="View Settings"
                >
                  <Settings className="w-4 h-4" />
                </Button>
              </div>

              {/* 3D Field Visualization */}
              <div className="h-96 flex items-center justify-center">
                {layout ? (
                  <div className="relative w-full h-full">
                    {/* Simulated 3D Field Layout */}
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/20 to-primary/30 rounded-lg transform rotate-6 scale-95"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-accent/30 to-primary/20 rounded-lg transform -rotate-3 scale-90"></div>
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/40 rounded-lg">
                      {/* Field Grid */}
                      <div className="grid grid-cols-8 gap-1 p-4 h-full">
                        {Array.from({ length: 64 }, (_, index) => (
                          <div
                            key={index}
                            className={`rounded transition-all-300 ${
                              index % 8 === 0 || index % 8 === 7
                                ? 'bg-secondary/30' // Pathways
                                : Math.random() > 0.3 
                                  ? 'bg-accent/40' // Crops
                                  : 'bg-primary/30' // Irrigation
                            }`}
                          />
                        ))}
                      </div>
                      
                      {/* Field Labels */}
                      <div className="absolute bottom-2 left-2 right-2">
                        <div className="bg-card/90 backdrop-blur-sm rounded p-2 text-xs">
                          <div className="flex justify-between items-center">
                            <span className="font-medium text-foreground">
                              {layout.name || 'Field Layout'}
                            </span>
                            <Badge variant="outline">
                              {layout.efficiency}% Efficient
                            </Badge>
                          </div>
                          <div className="text-muted-foreground mt-1">
                            {layout.length}m × {layout.width}m | {layout.cropType}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center">
                    <Box className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                    <h4 className="font-semibold text-foreground mb-2">Interactive 3D Model</h4>
                    <p className="text-muted-foreground">
                      Enter field details to generate an optimized 3D layout
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          {layout && (
            <div className="mt-4 space-y-4">
              {/* Layout Stats */}
              <Card>
                <CardContent className="p-4">
                  <h4 className="font-semibold text-foreground mb-3">Layout Statistics</h4>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    {layout?.layoutData && (
                      <>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Total Area:</span>
                          <span className="text-foreground font-medium">
                            {layout.layoutData.area?.toFixed(0) || '0'} m²
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Plants:</span>
                          <span className="text-foreground font-medium">
                            {layout.layoutData.estimatedPlants?.toLocaleString() || '0'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Irrigation Lines:</span>
                          <span className="text-foreground font-medium">
                            {layout.layoutData.irrigationLines || '0'}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-muted-foreground">Drone Paths:</span>
                          <span className="text-foreground font-medium">
                            {layout.layoutData.dronePathways || '0'}
                          </span>
                        </div>
                      </>
                    )}
                  </div>
                </CardContent>
              </Card>

              <Button
                data-testid="button-download-layout"
                onClick={downloadLayout}
                variant="outline"
                className="w-full"
              >
                <Download className="w-4 h-4 mr-2" />
                Export Layout Report
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Benefits Section */}
      {layout && (
        <Card>
          <CardContent className="p-6">
            <h4 className="font-semibold text-foreground mb-4">Layout Benefits</h4>
            <div className="grid md:grid-cols-3 gap-6 text-center">
              <div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <TrendingUp className="w-6 h-6 text-primary" />
                </div>
                <div className="text-2xl font-bold text-primary mb-1">+35%</div>
                <div className="text-sm text-muted-foreground">Increased Yield</div>
              </div>
              <div>
                <div className="w-12 h-12 bg-accent/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Droplets className="w-6 h-6 text-accent" />
                </div>
                <div className="text-2xl font-bold text-accent mb-1">-40%</div>
                <div className="text-sm text-muted-foreground">Water Usage</div>
              </div>
              <div>
                <div className="w-12 h-12 bg-secondary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <Clock className="w-6 h-6 text-secondary" />
                </div>
                <div className="text-2xl font-bold text-secondary mb-1">-25%</div>
                <div className="text-sm text-muted-foreground">Labor Time</div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
