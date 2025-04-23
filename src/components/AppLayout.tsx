import React from "react";
import { Home, BookOpen, Calendar, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import "../App.css";
import React, { ReactNode } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useTheme } from '../contexts/ThemeContext';

interface AppLayoutProps {
  children: ReactNode;
}

export const AppLayout: React.FC<AppLayoutProps> = ({ children }) => {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-base-200 shadow-sm">
        <div className="navbar container mx-auto">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                </svg>
              </label>
              <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                <li><Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link></li>
                <li><Link to="/library" className={location.pathname === "/library" ? "active" : ""}>Library</Link></li>
              </ul>
            </div>
            <Link to="/" className="btn btn-ghost normal-case text-xl">LearnWise</Link>
          </div>
          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">
              <li><Link to="/" className={location.pathname === "/" ? "active" : ""}>Home</Link></li>
              <li><Link to="/library" className={location.pathname === "/library" ? "active" : ""}>Library</Link></li>
            </ul>
          </div>
          <div className="navbar-end">
            <button 
              className="btn btn-circle btn-ghost" 
              onClick={toggleTheme}
              aria-label="Toggle theme"
            >
              {theme === 'dark' ? (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-5 h-5 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-5 h-5 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>
      
      <main className="flex-grow">
        {children}
      </main>
      
      <footer className="footer footer-center p-4 bg-base-200 text-base-content">
        <div>
          <p>© 2023 LearnWise Math Mentor - Created with DaisyUI & React</p>
        </div>
      </footer>
    </div>
  );
};
export const AppLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: "var(--md-background)" }}>
      {/* App Bar */}
      <header className="md-surface-2 py-3 px-4 flex items-center justify-between">
        <div className="flex items-center">
          <h1 className="text-lg font-medium ml-2" style={{ color: "var(--md-primary)" }}>
            StudyGenius
          </h1>
        </div>
      </header>
      
      <main className="container mx-auto py-4 md:py-6 flex-1 pb-20 px-4">
        {children}
      </main>
      
      {/* Floating Bottom Navigation */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center z-20">
        <div className="md-bottom-nav min-w-64 max-w-xs w-auto mx-auto flex justify-between items-center h-16 px-2">
          <NavItem 
            icon={<Home size={20} />} 
            label="Home" 
            to="/" 
            active={location.pathname === '/'} 
          />
          <NavItem 
            icon={<BookOpen size={20} />} 
            label="Library" 
            to="/library" 
            active={location.pathname === '/library'} 
          />
          <NavItem 
            icon={<Calendar size={20} />} 
            label="Schedule" 
            to="/schedule" 
            active={location.pathname === '/schedule'} 
          />
          <NavItem 
            icon={<Settings size={20} />} 
            label="Settings" 
            to="/settings" 
            active={location.pathname === '/settings'} 
          />
        </div>
      </div>
    </div>
  );
};

const NavItem = ({ 
  icon, 
  label, 
  to, 
  active 
}: { 
  icon: React.ReactNode; 
  label: string; 
  to: string; 
  active: boolean;
}) => {
  return (
    <Link 
      to={to} 
      className={`md-bottom-nav-item flex flex-col items-center justify-center px-4 py-1 rounded-full
        ${active ? 'active' : ''} transition-all md-ripple`}
      style={{ 
        position: "relative"
      }}
      onClick={(e) => {
        // Add ripple effect coordinates
        const target = e.currentTarget;
        const rect = target.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        target.style.setProperty('--x', String(x));
        target.style.setProperty('--y', String(y));
      }}
    >
      <div className="flex items-center justify-center">
        {icon}
      </div>
      <span className="text-xs font-medium mt-1">{label}</span>
    </Link>
  );
};
