import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, Link as LinkIcon, Shield, Users, DollarSign } from "lucide-react";

interface BlockchainSellingProps {
  onClose: () => void;
}

export default function BlockchainSelling({ onClose }: BlockchainSellingProps) {
  const [selectedCrop, setSelectedCrop] = useState("");
  const [quantity, setQuantity] = useState("");
  const [priceHistory, setPriceHistory] = useState<any[]>([]);

  // Mock market data
  const marketData = [
    {
      crop: "Tomatoes",
      currentPrice: 3.45,
      change: 0.15,
      trend: "up",
      volume: "2,450 tons",
      buyers: 23,
      quality: "Premium"
    },
    {
      crop: "Corn",
      currentPrice: 4.20,
      change: -0.08,
      trend: "down",
      volume: "8,750 tons",
      buyers: 45,
      quality: "Grade A"
    },
    {
      crop: "Wheat",
      currentPrice: 6.85,
      change: 0.32,
      trend: "up",
      volume: "12,300 tons",
      buyers: 67,
      quality: "Premium"
    },
    {
      crop: "Soybeans",
      currentPrice: 5.60,
      change: 0.05,
      trend: "up",
      volume: "5,890 tons",
      buyers: 34,
      quality: "Grade A"
    }
  ];

  const transactions = [
    {
      id: "TXN001",
      crop: "Tomatoes",
      quantity: "500 kg",
      price: "$3.45/kg",
      buyer: "Fresh Market Co.",
      status: "Completed",
      timestamp: "2024-01-15 14:30"
    },
    {
      id: "TXN002",
      crop: "Corn",
      quantity: "2 tons",
      price: "$4.20/kg",
      buyer: "AgriCorp Ltd.",
      status: "Pending",
      timestamp: "2024-01-15 12:15"
    },
    {
      id: "TXN003",
      crop: "Wheat",
      quantity: "1.5 tons",
      price: "$6.85/kg",
      buyer: "Grain Exchange",
      status: "Completed",
      timestamp: "2024-01-14 16:45"
    }
  ];

  const benefits = [
    {
      icon: Shield,
      title: "Transparent Pricing",
      description: "All transactions recorded on blockchain for complete transparency"
    },
    {
      icon: Users,
      title: "Direct Buyer Access",
      description: "Connect directly with verified buyers without intermediaries"
    },
    {
      icon: DollarSign,
      title: "Fair Market Prices",
      description: "Real-time pricing based on quality and market demand"
    },
    {
      icon: LinkIcon,
      title: "Smart Contracts",
      description: "Automated payments upon delivery confirmation"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Completed": return "bg-primary/10 text-primary";
      case "Pending": return "bg-accent/10 text-accent";
      case "Failed": return "bg-destructive/10 text-destructive";
      default: return "bg-secondary/10 text-secondary";
    }
  };

  return (
    <div className="space-y-6">
      <Tabs defaultValue="marketplace" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger data-testid="tab-marketplace" value="marketplace">Marketplace</TabsTrigger>
          <TabsTrigger data-testid="tab-sell" value="sell">Sell Crops</TabsTrigger>
          <TabsTrigger data-testid="tab-transactions" value="transactions">Transactions</TabsTrigger>
        </TabsList>

        {/* Marketplace Tab */}
        <TabsContent value="marketplace" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <TrendingUp className="w-5 h-5 text-primary mr-2" />
                Live Market Prices
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4">
                {marketData.map((item, index) => (
                  <Card key={index} data-testid={`market-item-${index}`} className="border border-border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <h5 className="font-semibold text-foreground">{item.crop}</h5>
                        <Badge variant="outline">{item.quality}</Badge>
                      </div>
                      
                      <div className="flex items-center space-x-2 mb-2">
                        <span className="text-2xl font-bold text-foreground">
                          ${item.currentPrice}
                        </span>
                        <div className={`flex items-center space-x-1 ${
                          item.trend === 'up' ? 'text-primary' : 'text-destructive'
                        }`}>
                          {item.trend === 'up' ? (
                            <TrendingUp className="w-4 h-4" />
                          ) : (
                            <TrendingDown className="w-4 h-4" />
                          )}
                          <span className="text-sm font-medium">
                            ${Math.abs(item.change)}
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                        <div>Volume: {item.volume}</div>
                        <div>Buyers: {item.buyers}</div>
                      </div>
                      
                      <Button
                        data-testid={`button-view-buyers-${index}`}
                        variant="outline"
                        size="sm"
                        className="w-full mt-3"
                      >
                        View Buyers
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Sell Crops Tab */}
        <TabsContent value="sell" className="space-y-4">
          <div className="grid md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>List Your Crops</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="crop-type">Crop Type</Label>
                  <select 
                    data-testid="select-crop-type"
                    className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                    value={selectedCrop}
                    onChange={(e) => setSelectedCrop(e.target.value)}
                  >
                    <option value="">Select crop type</option>
                    <option value="tomatoes">Tomatoes</option>
                    <option value="corn">Corn</option>
                    <option value="wheat">Wheat</option>
                    <option value="soybeans">Soybeans</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="quantity">Quantity (kg)</Label>
                  <Input
                    data-testid="input-quantity"
                    id="quantity"
                    type="number"
                    placeholder="Enter quantity"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                
                <div>
                  <Label htmlFor="quality">Quality Grade</Label>
                  <select 
                    data-testid="select-quality"
                    className="w-full mt-1 px-3 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring"
                  >
                    <option value="">Select quality</option>
                    <option value="premium">Premium</option>
                    <option value="grade-a">Grade A</option>
                    <option value="standard">Standard</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="min-price">Minimum Price ($/kg)</Label>
                  <Input
                    data-testid="input-min-price"
                    id="min-price"
                    type="number"
                    step="0.01"
                    placeholder="Enter minimum price"
                  />
                </div>
                
                <Button 
                  data-testid="button-list-crop"
                  className="w-full"
                  disabled={!selectedCrop || !quantity}
                >
                  List on Blockchain Marketplace
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Pricing Insights</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedCrop ? (
                  <div className="space-y-4">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-primary mb-2">
                        ${marketData.find(item => item.crop.toLowerCase() === selectedCrop)?.currentPrice || "0.00"}
                      </div>
                      <div className="text-muted-foreground">Current Market Price</div>
                    </div>
                    
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">24h Change:</span>
                        <span className="text-primary font-medium">+$0.15 (4.5%)</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Weekly High:</span>
                        <span className="text-foreground">$3.60</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Weekly Low:</span>
                        <span className="text-foreground">$3.20</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Active Buyers:</span>
                        <span className="text-foreground">23</span>
                      </div>
                    </div>
                    
                    <div className="bg-primary/5 border border-primary/20 rounded p-3">
                      <p className="text-sm text-primary font-medium">💡 Recommended:</p>
                      <p className="text-sm text-muted-foreground">
                        List at $3.40-3.50 for quick sale based on current demand.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <DollarSign className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <p className="text-muted-foreground">
                      Select a crop type to see pricing insights
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <LinkIcon className="w-5 h-5 text-primary mr-2" />
                Transaction History
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {transactions.map((transaction, index) => (
                  <Card key={index} data-testid={`transaction-${index}`} className="border border-border">
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h5 className="font-semibold text-foreground">{transaction.crop}</h5>
                          <p className="text-sm text-muted-foreground">ID: {transaction.id}</p>
                        </div>
                        <Badge className={getStatusColor(transaction.status)}>
                          {transaction.status}
                        </Badge>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <span className="text-muted-foreground">Quantity:</span>
                          <span className="text-foreground font-medium ml-1">{transaction.quantity}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Price:</span>
                          <span className="text-foreground font-medium ml-1">{transaction.price}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Buyer:</span>
                          <span className="text-foreground font-medium ml-1">{transaction.buyer}</span>
                        </div>
                        <div>
                          <span className="text-muted-foreground">Date:</span>
                          <span className="text-foreground font-medium ml-1">{transaction.timestamp}</span>
                        </div>
                      </div>
                      
                      <Button
                        data-testid={`button-view-transaction-${index}`}
                        variant="ghost"
                        size="sm"
                        className="mt-3"
                      >
                        View on Blockchain
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Benefits Section */}
      <Card>
        <CardHeader>
          <CardTitle>Blockchain Marketplace Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {benefits.map((benefit, index) => (
              <div key={index} data-testid={`benefit-${index}`} className="text-center">
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-3">
                  <benefit.icon className="w-6 h-6 text-primary" />
                </div>
                <h5 className="font-semibold text-foreground mb-2">{benefit.title}</h5>
                <p className="text-sm text-muted-foreground">{benefit.description}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
