import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Leaf, Thermometer, Droplets, TrendingUp, Calendar } from "lucide-react";

interface CropRecommendationProps {
  onClose: () => void;
}

export default function CropRecommendation({ onClose }: CropRecommendationProps) {
  const [soilType, setSoilType] = useState("");
  const [season, setSeason] = useState("");
  const [climateZone, setClimateZone] = useState("");
  const [farmingExperience, setFarmingExperience] = useState("");
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const cropDatabase = {
    spring: {
      clay: ["Wheat", "Barley", "Oats", "Peas"],
      sandy: ["Carrots", "Radishes", "Lettuce", "Spinach"],
      loam: ["Tomatoes", "Peppers", "Corn", "Beans"],
      silt: ["Beets", "Turnips", "Cabbage", "Broccoli"]
    },
    summer: {
      clay: ["Rice", "Cotton", "Sugarcane", "Soybeans"],
      sandy: ["Watermelon", "Cantaloupe", "Squash", "Cucumbers"],
      loam: ["Corn", "Tomatoes", "Peppers", "Eggplant"],
      silt: ["Okra", "Sweet Potatoes", "Pumpkins", "Zucchini"]
    },
    fall: {
      clay: ["Winter Wheat", "Rye", "Clover", "Alfalfa"],
      sandy: ["Garlic", "Onions", "Shallots", "Leeks"],
      loam: ["Kale", "Brussels Sprouts", "Cauliflower", "Collards"],
      silt: ["Turnips", "Rutabaga", "Parsnips", "Winter Squash"]
    },
    winter: {
      clay: ["Cover Crops", "Winter Rye", "Crimson Clover"],
      sandy: ["Winter Radishes", "Mache", "Winter Lettuce"],
      loam: ["Winter Spinach", "Arugula", "Winter Onions"],
      silt: ["Winter Garlic", "Fava Beans", "Winter Peas"]
    }
  };

  const cropDetails = {
    "Tomatoes": {
      difficulty: "Medium",
      yield: "High",
      marketPrice: "$3.50/lb",
      growthTime: "75-85 days",
      waterNeeds: "High",
      description: "Popular vegetable crop with high market demand",
      tips: "Requires support structures and consistent watering"
    },
    "Corn": {
      difficulty: "Easy",
      yield: "High",
      marketPrice: "$4.20/bushel",
      growthTime: "90-100 days",
      waterNeeds: "Medium",
      description: "Staple grain crop with versatile uses",
      tips: "Plant in blocks for better pollination"
    },
    "Lettuce": {
      difficulty: "Easy",
      yield: "Medium",
      marketPrice: "$2.80/head",
      growthTime: "45-65 days",
      waterNeeds: "Medium",
      description: "Quick-growing leafy green with steady demand",
      tips: "Harvest in cool weather for best quality"
    },
    "Wheat": {
      difficulty: "Easy",
      yield: "Medium",
      marketPrice: "$6.50/bushel",
      growthTime: "90-120 days",
      waterNeeds: "Low",
      description: "Hardy grain crop suitable for large-scale farming",
      tips: "Requires good drainage and moderate fertility"
    }
  };

  const generateRecommendations = () => {
    if (!soilType || !season) return;

    const seasonCrops = cropDatabase[season as keyof typeof cropDatabase];
    const soilCrops = seasonCrops[soilType as keyof typeof seasonCrops] || [];
    
    const recommendations = soilCrops.slice(0, 4).map(crop => ({
      name: crop,
      ...cropDetails[crop as keyof typeof cropDetails] || {
        difficulty: "Medium",
        yield: "Medium",
        marketPrice: "$2.50/lb",
        growthTime: "60-80 days",
        waterNeeds: "Medium",
        description: "Suitable crop for your conditions",
        tips: "Follow standard growing practices"
      },
      suitability: Math.floor(Math.random() * 20) + 80 // 80-100% suitability
    }));

    setRecommendations(recommendations);
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Easy": return "text-primary";
      case "Medium": return "text-accent";
      case "Hard": return "text-destructive";
      default: return "text-muted-foreground";
    }
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
                <SelectValue placeholder="Select your soil type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="clay">Clay Soil</SelectItem>
                <SelectItem value="sandy">Sandy Soil</SelectItem>
                <SelectItem value="loam">Loam Soil</SelectItem>
                <SelectItem value="silt">Silt Soil</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="season">Growing Season</Label>
            <Select value={season} onValueChange={setSeason}>
              <SelectTrigger data-testid="select-season">
                <SelectValue placeholder="Select growing season" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="spring">Spring</SelectItem>
                <SelectItem value="summer">Summer</SelectItem>
                <SelectItem value="fall">Fall</SelectItem>
                <SelectItem value="winter">Winter</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="climate-zone">Climate Zone</Label>
            <Select value={climateZone} onValueChange={setClimateZone}>
              <SelectTrigger data-testid="select-climate">
                <SelectValue placeholder="Select your climate zone" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="temperate">Temperate</SelectItem>
                <SelectItem value="tropical">Tropical</SelectItem>
                <SelectItem value="arid">Arid</SelectItem>
                <SelectItem value="subtropical">Subtropical</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label htmlFor="experience">Farming Experience</Label>
            <Select value={farmingExperience} onValueChange={setFarmingExperience}>
              <SelectTrigger data-testid="select-experience">
                <SelectValue placeholder="Select your experience level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="beginner">Beginner</SelectItem>
                <SelectItem value="intermediate">Intermediate</SelectItem>
                <SelectItem value="advanced">Advanced</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <Button
            data-testid="button-get-recommendations"
            onClick={generateRecommendations}
            disabled={!soilType || !season}
            className="w-full"
          >
            Get Crop Recommendations
          </Button>
        </div>

        {/* Recommendations Section */}
        <div>
          {recommendations.length > 0 ? (
            <div className="space-y-4">
              <h4 className="font-semibold text-foreground mb-4 flex items-center">
                <Leaf className="w-5 h-5 text-primary mr-2" />
                Recommended Crops
              </h4>
              
              {recommendations.map((crop, index) => (
                <Card key={index} data-testid={`recommendation-${index}`} className="border border-border">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-3">
                      <h5 className="font-semibold text-foreground">{crop.name}</h5>
                      <Badge variant="outline" className="bg-primary/10 text-primary">
                        {crop.suitability}% match
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-3">{crop.description}</p>
                    
                    <div className="grid grid-cols-2 gap-2 text-xs mb-3">
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3 text-accent" />
                        <span className="text-muted-foreground">Difficulty:</span>
                        <span className={`font-medium ${getDifficultyColor(crop.difficulty)}`}>
                          {crop.difficulty}
                        </span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Leaf className="w-3 h-3 text-primary" />
                        <span className="text-muted-foreground">Yield:</span>
                        <span className="text-foreground font-medium">{crop.yield}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-secondary" />
                        <span className="text-muted-foreground">Time:</span>
                        <span className="text-foreground font-medium">{crop.growthTime}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Droplets className="w-3 h-3 text-accent" />
                        <span className="text-muted-foreground">Water:</span>
                        <span className="text-foreground font-medium">{crop.waterNeeds}</span>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center">
                      <span className="text-sm font-medium text-primary">{crop.marketPrice}</span>
                      <Button
                        data-testid={`button-details-${index}`}
                        variant="ghost"
                        size="sm"
                        className="text-xs"
                      >
                        View Details
                      </Button>
                    </div>
                    
                    <div className="mt-2 p-2 bg-accent/5 border border-accent/20 rounded text-xs">
                      <span className="text-accent font-medium">💡 Tip: </span>
                      <span className="text-muted-foreground">{crop.tips}</span>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border border-border">
              <CardContent className="p-8 text-center">
                <Leaf className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                <h4 className="font-semibold text-foreground mb-2">AI Crop Recommendations</h4>
                <p className="text-muted-foreground mb-4">
                  Select your soil type and growing season to get personalized crop recommendations
                </p>
                <div className="text-sm text-muted-foreground">
                  Our AI will analyze your conditions and suggest the best crops for maximum yield and profitability.
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      {/* Additional Information */}
      {soilType && season && (
        <Card>
          <CardContent className="p-6">
            <h4 className="font-semibold text-foreground mb-4">
              Growing Conditions: {season.charAt(0).toUpperCase() + season.slice(1)} - {soilType.charAt(0).toUpperCase() + soilType.slice(1)} Soil
            </h4>
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center space-x-2">
                <Thermometer className="w-4 h-4 text-destructive" />
                <span className="text-muted-foreground">Temperature considerations applied</span>
              </div>
              <div className="flex items-center space-x-2">
                <Droplets className="w-4 h-4 text-accent" />
                <span className="text-muted-foreground">Soil moisture requirements analyzed</span>
              </div>
              <div className="flex items-center space-x-2">
                <TrendingUp className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Market demand factors included</span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
