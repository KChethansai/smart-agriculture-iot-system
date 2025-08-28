import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Droplets, Clock, Calendar } from "lucide-react";

interface IrrigationToolProps {
  onClose: () => void;
}

export default function IrrigationTool({ onClose }: IrrigationToolProps) {
  const { toast } = useToast();
  const [soilType, setSoilType] = useState("");
  const [cropType, setCropType] = useState("");
  const [moistureLevel, setMoistureLevel] = useState([45]);
  const [recommendation, setRecommendation] = useState<any>(null);

  const calculateMutation = useMutation({
    mutationFn: async (data: { soilType: string; cropType: string; moistureLevel: number }) => {
      return apiRequest("POST", "/api/irrigation-plans", {
        ...data,
        waterAmount: calculateWaterAmount(data.soilType, data.cropType, data.moistureLevel),
        frequency: calculateFrequency(data.soilType, data.cropType, data.moistureLevel),
        schedule: generateSchedule(data.soilType, data.cropType, data.moistureLevel),
      });
    },
    onSuccess: (data) => {
      setRecommendation(data);
      toast({
        title: "Irrigation Plan Created",
        description: "Your irrigation recommendation has been calculated and saved.",
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
        title: "Calculation Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const calculateWaterAmount = (soil: string, crop: string, moisture: number): number => {
    // Smart irrigation calculation based on soil type, crop, and current moisture
    let baseAmount = 2.0; // inches per week
    
    // Adjust for soil type
    if (soil === "sandy") baseAmount *= 1.3;
    else if (soil === "clay") baseAmount *= 0.8;
    else if (soil === "loam") baseAmount *= 1.0;
    
    // Adjust for crop type
    if (crop === "tomatoes") baseAmount *= 1.2;
    else if (crop === "corn") baseAmount *= 1.1;
    else if (crop === "wheat") baseAmount *= 0.9;
    
    // Adjust for current moisture
    const moistureAdjustment = (100 - moisture) / 100;
    baseAmount *= moistureAdjustment;
    
    return Math.round(baseAmount * 10) / 10;
  };

  const calculateFrequency = (soil: string, crop: string, moisture: number): number => {
    if (soil === "sandy") return 4; // More frequent for sandy soil
    if (soil === "clay") return 2; // Less frequent for clay soil
    return 3; // Default for loam
  };

  const generateSchedule = (soil: string, crop: string, moisture: number): string => {
    const frequency = calculateFrequency(soil, crop, moisture);
    const days = ["Monday", "Wednesday", "Friday", "Sunday"];
    return days.slice(0, frequency).join(", ");
  };

  const handleCalculate = () => {
    if (!soilType || !cropType) {
      toast({
        title: "Missing Information",
        description: "Please select both soil type and crop type.",
        variant: "destructive",
      });
      return;
    }

    calculateMutation.mutate({
      soilType,
      cropType,
      moistureLevel: moistureLevel[0]
    });
  };

  const currentRecommendation = recommendation || {
    waterAmount: calculateWaterAmount(soilType, cropType, moistureLevel[0]),
    frequency: calculateFrequency(soilType, cropType, moistureLevel[0]),
    schedule: generateSchedule(soilType, cropType, moistureLevel[0])
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Input Section */}
        <div className="space-y-6">
          <div>
            <Label htmlFor="soil-type">Soil Type</Label>
            <Select value={soilType} onValueChange={setSoilType}>
              <SelectTrigger data-testid="select-soil-type">
                <SelectValue placeholder="Select soil type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clay">Clay Loam</SelectItem>
                <SelectItem value="sandy">Sandy Loam</SelectItem>
                <SelectItem value="silt">Silt Loam</SelectItem>
                <SelectItem value="loam">Loam</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="crop-type">Crop Type</Label>
            <Select value={cropType} onValueChange={setCropType}>
              <SelectTrigger data-testid="select-crop-type">
                <SelectValue placeholder="Select crop type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="tomatoes">Tomatoes</SelectItem>
                <SelectItem value="corn">Corn</SelectItem>
                <SelectItem value="wheat">Wheat</SelectItem>
                <SelectItem value="soybeans">Soybeans</SelectItem>
                <SelectItem value="lettuce">Lettuce</SelectItem>
                <SelectItem value="carrots">Carrots</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="moisture-level">Current Soil Moisture (%)</Label>
            <div className="mt-2 space-y-2">
              <Slider
                data-testid="slider-moisture"
                value={moistureLevel}
                onValueChange={setMoistureLevel}
                max={100}
                min={0}
                step={1}
                className="w-full"
              />
              <div className="text-center">
                <Badge variant="outline">{moistureLevel[0]}%</Badge>
              </div>
            </div>
          </div>

          <Button
            data-testid="button-calculate-irrigation"
            onClick={handleCalculate}
            disabled={calculateMutation.isPending || !soilType || !cropType}
            className="w-full"
          >
            {calculateMutation.isPending ? "Calculating..." : "Calculate Irrigation"}
          </Button>
        </div>

        {/* Results Section */}
        <div>
          <Card className="border border-border">
            <CardContent className="p-6">
              <h4 className="font-semibold text-foreground mb-4 flex items-center">
                <Droplets className="w-5 h-5 text-primary mr-2" />
                Irrigation Recommendation
              </h4>
              
              {(soilType && cropType) ? (
                <div className="space-y-4">
                  <div className="text-center">
                    <div className="text-3xl font-bold text-primary mb-2">
                      {currentRecommendation.waterAmount}" 
                    </div>
                    <div className="text-muted-foreground">Water needed this week</div>
                  </div>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        Schedule:
                      </span>
                      <span className="text-foreground font-medium">
                        {currentRecommendation.frequency}x this week
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground flex items-center">
                        <Clock className="w-4 h-4 mr-1" />
                        Duration:
                      </span>
                      <span className="text-foreground font-medium">
                        {Math.round(currentRecommendation.waterAmount * 10)} minutes each
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground">Days:</span>
                      <span className="text-foreground font-medium text-sm">
                        {currentRecommendation.schedule}
                      </span>
                    </div>
                  </div>
                  
                  <div className="bg-accent/5 border border-accent/20 rounded p-3">
                    <p className="text-sm text-foreground font-medium">💡 Tip:</p>
                    <p className="text-sm text-muted-foreground">
                      Water early morning (6-8 AM) to reduce evaporation and prevent fungal diseases.
                    </p>
                  </div>

                  {recommendation && (
                    <div className="bg-primary/5 border border-primary/20 rounded p-3">
                      <p className="text-sm text-primary font-medium">✅ Plan Saved</p>
                      <p className="text-sm text-muted-foreground">
                        This irrigation plan has been saved to your dashboard.
                      </p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Droplets className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Select soil type and crop to see irrigation recommendations
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
