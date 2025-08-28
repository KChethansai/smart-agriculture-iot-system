import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { useToast } from "@/hooks/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { isUnauthorizedError } from "@/lib/authUtils";
import { MessageSquare, Send, Bot, User } from "lucide-react";
import type { ChatHistory } from "@shared/schema";

interface AIChatbotProps {
  onClose: () => void;
}

interface ChatMessage {
  id: string;
  question: string;
  answer: string;
  createdAt: string;
}

export default function AIChatbot({ onClose }: AIChatbotProps) {
  const { toast } = useToast();
  const [currentQuestion, setCurrentQuestion] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([]);

  // Load chat history
  const { data: chatHistory = [], isLoading } = useQuery<ChatHistory[]>({
    queryKey: ["/api/chat-history"],
    retry: false,
  });

  const chatMutation = useMutation<ChatHistory, Error, string>({
    mutationFn: async (question: string) => {
      return apiRequest("POST", "/api/chat", { question });
    },
    onSuccess: (data) => {
      setChatMessages(prev => [data as ChatMessage, ...prev]);
      setCurrentQuestion("");
      toast({
        title: "Response Received",
        description: "The AI farming assistant has provided guidance.",
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
        title: "Chat Failed",
        description: error.message,
        variant: "destructive",
      });
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentQuestion.trim()) {
      chatMutation.mutate(currentQuestion.trim());
    }
  };

  const allMessages = [...chatMessages, ...(chatHistory || [])];

  const sampleQuestions = [
    "How often should I water my tomato plants?",
    "What are the signs of nitrogen deficiency in corn?",
    "When is the best time to plant soybeans?",
    "How can I prevent pest damage naturally?",
    "What soil pH is best for growing vegetables?"
  ];

  return (
    <div className="space-y-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Chat Interface */}
        <div className="lg:col-span-2">
          <Card className="h-[500px] flex flex-col">
            <CardHeader>
              <CardTitle className="flex items-center">
                <Bot className="w-5 h-5 text-primary mr-2" />
                AI Farming Assistant
              </CardTitle>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col">
              {/* Messages */}
              <ScrollArea className="flex-1 pr-4 mb-4">
                {allMessages.length === 0 ? (
                  <div className="text-center py-8">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold text-foreground mb-2">
                      Welcome to AI Farming Assistant
                    </h3>
                    <p className="text-muted-foreground mb-4">
                      Ask me anything about farming, crops, soil, irrigation, or pest management.
                    </p>
                    <p className="text-sm text-muted-foreground">
                      I'm here to help you make informed farming decisions!
                    </p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {allMessages.map((message, index) => (
                      <div key={message.id || index} className="space-y-3">
                        {/* User Question */}
                        <div className="flex items-start space-x-2 justify-end">
                          <div className="bg-primary text-primary-foreground rounded-lg px-4 py-2 max-w-[80%]">
                            <p className="text-sm">{message.question}</p>
                          </div>
                          <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <User className="w-4 h-4 text-primary" />
                          </div>
                        </div>
                        
                        {/* AI Answer */}
                        <div className="flex items-start space-x-2">
                          <div className="w-8 h-8 bg-accent/10 rounded-full flex items-center justify-center flex-shrink-0">
                            <Bot className="w-4 h-4 text-accent" />
                          </div>
                          <div className="bg-muted rounded-lg px-4 py-2 max-w-[80%]">
                            <p className="text-sm text-foreground">{message.answer}</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              {new Date(message.createdAt).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </ScrollArea>

              {/* Input Form */}
              <form onSubmit={handleSubmit} className="flex space-x-2">
                <Input
                  data-testid="input-chat-question"
                  value={currentQuestion}
                  onChange={(e) => setCurrentQuestion(e.target.value)}
                  placeholder="Ask me about farming..."
                  disabled={chatMutation.isPending}
                  className="flex-1"
                />
                <Button
                  data-testid="button-send-question"
                  type="submit"
                  disabled={chatMutation.isPending || !currentQuestion.trim()}
                  size="sm"
                >
                  {chatMutation.isPending ? (
                    <div className="w-4 h-4 animate-spin rounded-full border-2 border-primary-foreground border-t-transparent"></div>
                  ) : (
                    <Send className="w-4 h-4" />
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Sample Questions */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sample Questions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              {sampleQuestions.map((question, index) => (
                <Button
                  key={index}
                  data-testid={`button-sample-question-${index}`}
                  variant="ghost"
                  size="sm"
                  className="w-full text-left justify-start h-auto py-2 px-3 text-sm text-muted-foreground hover:text-foreground"
                  onClick={() => setCurrentQuestion(question)}
                >
                  {question}
                </Button>
              ))}
            </CardContent>
          </Card>

          {/* Features */}
          <Card className="mt-4">
            <CardHeader>
              <CardTitle className="text-lg">AI Features</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3 text-sm">
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-primary rounded-full"></div>
                  <span className="text-muted-foreground">Crop-specific advice</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-accent rounded-full"></div>
                  <span className="text-muted-foreground">Soil management tips</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-secondary rounded-full"></div>
                  <span className="text-muted-foreground">Pest control guidance</span>
                </div>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-destructive rounded-full"></div>
                  <span className="text-muted-foreground">Weather-based recommendations</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
