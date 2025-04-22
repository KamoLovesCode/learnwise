
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
  Book,
  Home,
  Calendar,
  ChartBar,
  Menu,
  Upload,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const [open, setOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Upload, label: 'Upload Textbook', path: '/upload' },
    { icon: Book, label: 'Search Books', path: '/search' },
    { icon: Calendar, label: 'Schedule', path: '/schedule' },
    { icon: ChartBar, label: 'Progress', path: '/progress' },
  ];

  return (
    <div className="min-h-screen bg-background font-plus-jakarta">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 items-center">
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild>
              <button className="mr-2 px-2 hover:opacity-75">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle Menu</span>
              </button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[240px] sm:w-[280px]">
              <nav className="flex flex-col gap-4 mt-4">
                {menuItems.map((item) => (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent ${
                        isActive ? 'bg-accent text-accent-foreground' : 'text-muted-foreground'
                      }`
                    }
                  >
                    <item.icon className="h-4 w-4" />
                    {item.label}
                  </NavLink>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
          <div className="flex-1 flex items-center justify-between">
            <span className="text-xl font-semibold">LearnWise</span>
          </div>
        </div>
      </header>
      <main className="container py-4 md:py-6">
        {children}
      </main>
    </div>
  );
};
