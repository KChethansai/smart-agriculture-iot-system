import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Upload, Camera, CheckCircle, AlertTriangle } from "lucide-react";

interface CropHealthCheckerProps {
  onClose: () => void;
}

export default function CropHealthChecker({ onClose }: CropHealthCheckerProps) {
  const { toast } = useToast();
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [analysis, setAnalysis] = useState<any>(null);

  const analyzeMutation = useMutation({
    mutationFn: async (file: File) => {
      const formData = new FormData();
      formData.append('image', file);
      
      const response = await fetch('/api/analyze-crop', {
        method: 'POST',
        body: formData,
        credentials: 'include',
      });

      if (!response.ok) {
        const text = await response.text();
        throw new Error(`${response.status}: ${text}`);
      }

      return response.json();
    },
    onSuccess: (data) => {
      setAnalysis(data);
      toast({
        title: "Analysis Complete",
        description: "Crop health analysis has been completed successfully.",
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
        title: "Analysis Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.type.startsWith('image/')) {
        setSelectedFile(file);
        setAnalysis(null);
      } else {
        toast({
          title: "Invalid File",
          description: "Please select an image file.",
          variant: "destructive",
        });
      }
    }
  };

  const handleAnalyze = () => {
    if (selectedFile) {
      analyzeMutation.mutate(selectedFile);
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Upload Section */}
        <div className="space-y-4">
          <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
            {selectedFile ? (
              <div className="space-y-4">
                <img
                  src={URL.createObjectURL(selectedFile)}
                  alt="Selected crop"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <p className="text-foreground font-medium">{selectedFile.name}</p>
              </div>
            ) : (
              <>
                <Upload className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <p className="text-muted-foreground mb-4">Upload a photo of your crop</p>
              </>
            )}
            
            <Input
              data-testid="input-crop-image"
              type="file"
              accept="image/*"
              onChange={handleFileSelect}
              className="hidden"
              id="crop-image-upload"
            />
            <label htmlFor="crop-image-upload">
              <Button
                data-testid="button-select-image"
                type="button"
                variant={selectedFile ? "outline" : "default"}
                className="cursor-pointer"
              >
                <Camera className="w-4 h-4 mr-2" />
                {selectedFile ? "Select Different Image" : "Select Image"}
              </Button>
            </label>
          </div>

          {selectedFile && (
            <Button
              data-testid="button-analyze-crop"
              onClick={handleAnalyze}
              disabled={analyzeMutation.isPending}
              className="w-full"
            >
              {analyzeMutation.isPending ? "Analyzing..." : "Analyze Crop Health"}
            </Button>
          )}

          <Card className="bg-muted/5">
            <CardContent className="p-4">
              <h4 className="font-semibold text-foreground mb-2">How it works:</h4>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Upload high-quality crop images</li>
                <li>• AI analyzes plant health indicators</li>
                <li>• Receive detailed health assessment</li>
                <li>• Get treatment recommendations</li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Results Section */}
        <div>
          {analysis ? (
            <Card className="border border-border">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-4 flex items-center">
                  <CheckCircle className="w-5 h-5 text-primary mr-2" />
                  Analysis Results
                </h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Plant Type:</span>
                    <Badge variant="secondary">{analysis.plantName}</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Health Status:</span>
                    <Badge 
                      className={
                        analysis.healthStatus === 'Healthy' 
                          ? 'bg-primary/10 text-primary' 
                          : 'bg-destructive/10 text-destructive'
                      }
                    >
                      {analysis.healthStatus}
                    </Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Health Score:</span>
                    <span className="text-foreground font-medium">{analysis.healthScore}%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Confidence:</span>
                    <span className="text-foreground font-medium">{Math.round(analysis.confidence * 100)}%</span>
                  </div>
                  
                  {analysis.diseases && analysis.diseases.length > 0 && (
                    <div className="mt-4 p-3 bg-destructive/5 border border-destructive/20 rounded">
                      <h5 className="text-sm text-destructive font-medium mb-2 flex items-center">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        Diseases Detected:
                      </h5>
                      <ul className="text-sm text-muted-foreground">
                        {analysis.diseases.map((disease: string, index: number) => (
                          <li key={index}>• {disease}</li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  <div className="mt-4 p-3 bg-primary/5 border border-primary/20 rounded">
                    <h5 className="text-sm text-foreground font-medium mb-2">Recommendations:</h5>
                    <p className="text-sm text-muted-foreground">{analysis.recommendations}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ) : (
            <Card className="border border-border">
              <CardContent className="p-6">
                <h4 className="font-semibold text-foreground mb-4">Sample Analysis Result:</h4>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Plant Health:</span>
                    <Badge className="bg-primary/10 text-primary">Healthy</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Disease Risk:</span>
                    <Badge className="bg-accent/10 text-accent">Low</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Pest Damage:</span>
                    <Badge className="bg-secondary/10 text-secondary">None</Badge>
                  </div>
                  <div className="mt-4 p-3 bg-muted/5 rounded">
                    <p className="text-sm text-foreground font-medium">Recommendations:</p>
                    <p className="text-sm text-muted-foreground">Continue current care routine. Monitor for early blight symptoms.</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
