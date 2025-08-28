import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import { useToast } from "@/hooks/use-toast";
import { isUnauthorizedError } from "@/lib/authUtils";
import { Camera, Droplets, Box, MessageSquare, ChevronRight, Activity } from "lucide-react";
import type { PlantScan, IrrigationPlan, FieldLayout } from "@shared/schema";

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const { toast } = useToast();

  // Redirect to home if not authenticated
  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
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
  }, [isAuthenticated, isLoading, toast]);

  const { data: plantScans = [], isLoading: plantScansLoading } = useQuery<PlantScan[]>({
    queryKey: ["/api/plant-scans"],
    enabled: isAuthenticated,
    retry: false,
  });

  const { data: irrigationPlans = [], isLoading: irrigationLoading } = useQuery<IrrigationPlan[]>({
    queryKey: ["/api/irrigation-plans"],
    enabled: isAuthenticated,
    retry: false,
  });

  const { data: fieldLayouts = [], isLoading: layoutsLoading } = useQuery<FieldLayout[]>({
    queryKey: ["/api/field-layouts"],
    enabled: isAuthenticated,
    retry: false,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h1 data-testid="dashboard-title" className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Welcome back, {user?.firstName || 'Farmer'}!
          </h1>
          <p className="text-xl text-muted-foreground">Manage your farming analytics and saved data</p>
        </div>

        {/* Dashboard Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          <Card data-testid="card-plant-scans" className="hover:shadow-lg transition-all-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Camera className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Plant Scans</h3>
                </div>
                <Badge variant="secondary">
                  {plantScansLoading ? "..." : plantScans?.length || 0} saved
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">View your saved plant analysis results</p>
              <Button data-testid="button-view-scans" variant="ghost" className="text-primary hover:text-primary/80 p-0">
                View All <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>

          <Card data-testid="card-irrigation-plans" className="hover:shadow-lg transition-all-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                    <Droplets className="w-5 h-5 text-accent" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">Irrigation Plans</h3>
                </div>
                <Badge variant="secondary">
                  {irrigationLoading ? "..." : irrigationPlans?.length || 0} active
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">Access your irrigation recommendations</p>
              <Button data-testid="button-manage-irrigation" variant="ghost" className="text-primary hover:text-primary/80 p-0">
                Manage <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>

          <Card data-testid="card-field-layouts" className="hover:shadow-lg transition-all-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                    <Box className="w-5 h-5 text-secondary" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground">3D Layouts</h3>
                </div>
                <Badge variant="secondary">
                  {layoutsLoading ? "..." : fieldLayouts?.length || 0} designs
                </Badge>
              </div>
              <p className="text-muted-foreground mb-4">Review your field layout designs</p>
              <Button data-testid="button-open-editor" variant="ghost" className="text-primary hover:text-primary/80 p-0">
                Open Editor <ChevronRight className="w-4 h-4 ml-1" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Recent Activity */}
        <Card data-testid="card-recent-activity" className="shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Activity className="w-5 h-5" />
              <span>Recent Activity</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            {(!plantScans?.length && !irrigationPlans?.length && !fieldLayouts?.length) ? (
              <div className="text-center py-12">
                <Activity className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold text-foreground mb-2">No Activity Yet</h3>
                <p className="text-muted-foreground mb-6">Start using our farming tools to see your activity here</p>
                <Button data-testid="button-start-farming">
                  Start Smart Farming
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                {plantScans?.slice(0, 3).map((scan: any, index: number) => (
                  <div key={index} data-testid={`activity-scan-${index}`} className="flex items-center space-x-4 p-4 bg-muted/5 rounded-lg">
                    <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Camera className="w-5 h-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">Plant scan completed</p>
                      <p className="text-sm text-muted-foreground">
                        {scan.plantName || "Unknown plant"} - {new Date(scan.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}

                {irrigationPlans?.slice(0, 2).map((plan: any, index: number) => (
                  <div key={index} data-testid={`activity-irrigation-${index}`} className="flex items-center space-x-4 p-4 bg-muted/5 rounded-lg">
                    <div className="w-10 h-10 bg-accent/10 rounded-lg flex items-center justify-center">
                      <Droplets className="w-5 h-5 text-accent" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">Irrigation plan created</p>
                      <p className="text-sm text-muted-foreground">
                        {plan.cropType} - {new Date(plan.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}

                {fieldLayouts?.slice(0, 2).map((layout: any, index: number) => (
                  <div key={index} data-testid={`activity-layout-${index}`} className="flex items-center space-x-4 p-4 bg-muted/5 rounded-lg">
                    <div className="w-10 h-10 bg-secondary/10 rounded-lg flex items-center justify-center">
                      <Box className="w-5 h-5 text-secondary" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium text-foreground">3D field layout generated</p>
                      <p className="text-sm text-muted-foreground">
                        {layout.name} - {new Date(layout.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <Card data-testid="stat-total-scans" className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-primary mb-2">
                {plantScansLoading ? "..." : plantScans?.length || 0}
              </div>
              <div className="text-muted-foreground">Total Plant Scans</div>
            </CardContent>
          </Card>
          
          <Card data-testid="stat-active-plans" className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-accent mb-2">
                {irrigationLoading ? "..." : irrigationPlans?.filter((p: any) => p.active)?.length || 0}
              </div>
              <div className="text-muted-foreground">Active Irrigation Plans</div>
            </CardContent>
          </Card>
          
          <Card data-testid="stat-field-designs" className="text-center">
            <CardContent className="pt-6">
              <div className="text-3xl font-bold text-secondary mb-2">
                {layoutsLoading ? "..." : fieldLayouts?.length || 0}
              </div>
              <div className="text-muted-foreground">Field Designs</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
