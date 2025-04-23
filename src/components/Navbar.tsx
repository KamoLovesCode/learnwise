import { NavLink } from "react-router-dom";
import { Book, Home, Calendar, ChartBar, ListTodo } from "lucide-react";
import { cn } from "@/lib/utils";
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { Book, Calendar, Home, ListTodo } from 'lucide-react';
import { useTheme } from '../contexts/ThemeContext';

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { isDark } = useTheme();

  const navItems = [
    { path: '/', label: 'Home', icon: <Home size={20} /> },
    { path: '/library', label: 'Library', icon: <Book size={20} /> },
    { path: '/tasks', label: 'Tasks', icon: <ListTodo size={20} /> },
    { path: '/schedule', label: 'Schedule', icon: <Calendar size={20} /> },
  ];

  return (
    <div className="fixed bottom-6 left-0 right-0 z-50 flex justify-center">
      <nav className={`
        flex items-center rounded-full px-1 py-2
        shadow-xl backdrop-blur-md
        ${isDark ? 'bg-gray-800/90' : 'bg-white/90'}
      `}>
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <button
              key={item.path}
              onClick={() => navigate(item.path)}
              className={`
                relative flex flex-col items-center justify-center
                w-16 h-16 mx-1 rounded-full transition-all
                ${isActive 
                  ? isDark 
                    ? 'text-primary bg-gray-700/70' 
                    : 'text-primary bg-gray-100/80' 
                  : 'text-muted-foreground hover:text-foreground'}
              `}
            >
              {item.icon}
              <span className="text-xs mt-1">{item.label}</span>
              {isActive && (
                <span className="absolute -top-1 left-50 w-2 h-2 bg-primary rounded-full transform -translate-x-1/2"></span>
              )}
            </button>
          );
        })}
      </nav>
    </div>
  );
};
export const Navbar = () => {
  const menuItems = [
    { icon: Home, label: "Home", path: "/" },
    { icon: Book, label: "Library", path: "/library" },
    { icon: ListTodo, label: "Tasks", path: "/tasks" },
    { icon: Calendar, label: "Schedule", path: "/schedule" },
    { icon: ChartBar, label: "Progress", path: "/progress" },
  ];

  return (
    <nav className="fixed bottom-4 left-1/2 transform -translate-x-1/2 border border-gray-300 bg-background p-1 rounded shadow">
      <div className="flex justify-around">
        {menuItems.map((item) => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              cn(
                "flex flex-col items-center text-xs px-3 py-2 transition-all",
                isActive ? "text-accent" : "text-muted-foreground"
              )
            }
          >
            <item.icon className="h-4 w-4" />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
};
