//Improve styling, more padding, home libary schedule progress
import { NavLink } from 'react-router-dom';
import {
  Book,
  Home,
  Calendar,
  ChartBar,
  Upload,
} from 'lucide-react';

export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const menuItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: Upload, label: 'Libary', path: '/find-textbook' },
    { icon: Calendar, label: 'Schedule', path: '/schedule' },
    { icon: ChartBar, label: 'Progress', path: '/progress' },
  ];

  return (
    <div className="min-h-screen bg-background font-plus-jakarta flex flex-col">
      <main className="container py-4 md:py-6 flex-1">
        {children}
      </main>
      <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 border border-gray-300 bg-background p-1 rounded shadow">
        <div className="flex justify-around">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex flex-col items-center text-xs transition-all ${
                  isActive ? 'text-accent' : 'text-muted-foreground'
                }`
              }
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
      </nav>
    </div>
  );
};
