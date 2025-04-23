import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

type Theme = 'materialLight' | 'light' | 'dark';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

interface ThemeProviderProps {
  children: ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  // Check if a theme preference exists in localStorage
  const getInitialTheme = (): Theme => {
    const savedTheme = localStorage.getItem('theme') as Theme;

    if (savedTheme && ['materialLight', 'light', 'dark'].includes(savedTheme)) {
      return savedTheme;
    }

    // Check system preference
    if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
      return 'dark';
    }

    // Default to materialLight if no valid theme is found
    return 'materialLight';
  };

  const [theme, setTheme] = useState<Theme>(getInitialTheme);

  // Apply theme to html element and save to localStorage
  useEffect(() => {
    const html = document.documentElement;

    // Remove previous theme classes
    html.classList.remove('light', 'dark', 'materialLight');

    // Add current theme class
    html.classList.add(theme);

    // Set data-theme attribute for DaisyUI
    html.setAttribute('data-theme', theme);

    // Store theme preference
    localStorage.setItem('theme', theme);
  }, [theme]);

  // Toggle between materialLight and dark themes
  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'materialLight' : 'dark');
  };

  return (
    <ThemeContext.Provider value={{ theme, setTheme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
