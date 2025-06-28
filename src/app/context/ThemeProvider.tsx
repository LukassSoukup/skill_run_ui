// ThemeContext.tsx
'use client'; // Must be a client component for CSR functionality

import React, { createContext, useState, useContext, useEffect } from 'react';
import StylesWrapper from '../components/Utils/ThemeWrapper';

interface ThemeContextProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
  isWhiteMode: () => boolean;
  isDarkMode?: () => boolean;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const WHITE_MODE = process.env.NEXT_PUBLIC_THEME_LIGHT_MODE || 'nord';
  const DARK_MODE = process.env.NEXT_PUBLIC_THEME_DARK_MODE || 'business';
  const [theme, setTheme] = useState<string>(DARK_MODE);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    setTheme(storedTheme || DARK_MODE); 

    if (storedTheme) {
      document.documentElement.classList.toggle('dark', storedTheme === DARK_MODE);
    } else {
      document.documentElement.classList.toggle('dark', prefersDark);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme); // Save theme to localStorage
    document.documentElement.classList.toggle('dark', theme === DARK_MODE);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [theme]);

  const isWhiteMode = () => theme === WHITE_MODE;
  const isDarkMode = () => theme === DARK_MODE;

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isWhiteMode, isDarkMode }}>
        <StylesWrapper className='h-full w-full'>
          {children}
        </StylesWrapper>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};