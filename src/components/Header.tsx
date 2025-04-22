
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Book, Calendar, ChartBar, Search, User } from "lucide-react";

export const Header = () => {
  return (
    <header className="bg-white border-b sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold text-math-800 flex items-center">
            <Book className="mr-2 h-6 w-6 text-primary" />
            LearnWise
          </Link>
        </div>
        
        <nav className="hidden md:flex items-center space-x-1">
          <Button variant="ghost" asChild>
            <Link to="/search" className="flex items-center">
              <Search className="h-4 w-4 mr-1" />
              Find Textbooks
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/schedule" className="flex items-center">
              <Calendar className="h-4 w-4 mr-1" />
              Schedule
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link to="/progress" className="flex items-center">
              <ChartBar className="h-4 w-4 mr-1" />
              Progress
            </Link>
          </Button>
        </nav>

        <div className="flex items-center">
          <Button variant="outline" size="sm" className="rounded-full">
            <User className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </header>
  );
};
