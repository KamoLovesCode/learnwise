import React, { ReactNode } from "react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";
import { useTheme } from '../contexts/ThemeContext';
import { Navbar } from "./Navbar";
import { Button } from "@/components/ui/button";
import { Moon, Sun, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background">
        <div className="container mx-auto flex h-16 items-center px-4">
          <div className="md:flex md:items-center md:gap-4 md:px-6">
            <div className="block md:hidden">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-52">
                  <DropdownMenuItem asChild>
                    <Link to="/" className={location.pathname === "/" ? "font-medium" : ""}>Home</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/library" className={location.pathname === "/library" ? "font-medium" : ""}>Library</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/tasks" className={location.pathname === "/tasks" ? "font-medium" : ""}>Tasks</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/schedule" className={location.pathname === "/schedule" ? "font-medium" : ""}>Schedule</Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <Link to="/" className="text-xl font-semibold">LearnWise</Link>
          </div>
          <div className="hidden md:flex flex-1 items-center justify-center">
            <nav className="flex items-center space-x-6 text-sm font-medium">
              <Link to="/" className={`transition-colors hover:text-foreground/80 ${location.pathname === "/" ? "text-foreground" : "text-foreground/60"}`}>Home</Link>
              <Link to="/library" className={`transition-colors hover:text-foreground/80 ${location.pathname === "/library" ? "text-foreground" : "text-foreground/60"}`}>Library</Link>
              <Link to="/tasks" className={`transition-colors hover:text-foreground/80 ${location.pathname === "/tasks" ? "text-foreground" : "text-foreground/60"}`}>Tasks</Link>
              <Link to="/schedule" className={`transition-colors hover:text-foreground/80 ${location.pathname === "/schedule" ? "text-foreground" : "text-foreground/60"}`}>Schedule</Link>
            </nav>
          </div>
          <div className="flex items-center justify-end">
            <Button 
              variant="ghost" 
              size="icon"
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <Sun className="h-5 w-5" />
              ) : (
                <Moon className="h-5 w-5" />
              )}
            </Button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="border-t py-4 bg-background">
        <div className="container mx-auto flex justify-center text-sm text-muted-foreground">
          <p>© 2023 LearnWise Math Mentor - Created with React</p>
        </div>
      </footer>

      {/* Removed duplicate Navbar since we now have a consistent top navigation */}
    </div>
  );
};
