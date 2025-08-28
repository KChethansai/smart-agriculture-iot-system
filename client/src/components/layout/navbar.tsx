import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Menu, X, Leaf } from "lucide-react";

export default function Navbar() {
  const [location] = useLocation();
  const { user } = useAuth();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navLinks = [
    { path: "/", label: "Home" },
    { path: "/features", label: "Features" },
    { path: "/solutions", label: "Solutions" },
    { path: "/about", label: "About" },
    { path: "/contact", label: "Contact" },
    { path: "/dashboard", label: "Dashboard" }
  ];

  const isActive = (path: string) => {
    if (path === "/" && location === "/") return true;
    if (path !== "/" && location.startsWith(path)) return true;
    return false;
  };

  return (
    <nav className="sticky top-0 z-50 bg-card/95 backdrop-blur-sm border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Leaf className="w-5 h-5 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold text-foreground">Smart Agricultural Farming</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link key={link.path} href={link.path}>
                <button
                  data-testid={`nav-link-${link.label.toLowerCase()}`}
                  className={`transition-all-300 ${
                    isActive(link.path)
                      ? "text-primary font-medium"
                      : "text-muted-foreground hover:text-primary"
                  }`}
                >
                  {link.label}
                </button>
              </Link>
            ))}
            
            <div className="flex items-center space-x-4">
              <span className="text-sm text-muted-foreground">
                Welcome, {user?.firstName || "Farmer"}
              </span>
              <Button
                data-testid="button-logout"
                variant="outline"
                size="sm"
                onClick={() => window.location.href = "/api/logout"}
              >
                Logout
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              data-testid="button-mobile-menu"
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden bg-card border-t border-border">
            <div className="px-4 pt-2 pb-3 space-y-1">
              {navLinks.map((link) => (
                <Link key={link.path} href={link.path}>
                  <button
                    data-testid={`mobile-nav-link-${link.label.toLowerCase()}`}
                    className={`block w-full text-left px-3 py-2 transition-all-300 ${
                      isActive(link.path)
                        ? "text-primary font-medium"
                        : "text-muted-foreground hover:text-primary"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.label}
                  </button>
                </Link>
              ))}
              
              <div className="pt-4 border-t border-border mt-4">
                <div className="text-sm text-muted-foreground px-3 py-2">
                  Welcome, {user?.firstName || "Farmer"}
                </div>
                <Button
                  data-testid="button-mobile-logout"
                  variant="outline"
                  size="sm"
                  className="w-full mt-2"
                  onClick={() => window.location.href = "/api/logout"}
                >
                  Logout
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
