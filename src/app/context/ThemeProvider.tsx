// ThemeContext.tsx
'use client'; // Must be a client component for CSR functionality

import React, { createContext, useState, useContext, useEffect } from 'react';
import StylesWrapper from '../components/Utils/ThemeWrapper';

interface ThemeContextProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}


const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const WHITE_MODE = process.env.NEXT_PUBLIC_THEME_LIGHT_MODE || 'nord';
  const [theme, setTheme] = useState<string>(WHITE_MODE);

  useEffect(() => {
    setTheme(localStorage.getItem("theme") || WHITE_MODE);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    localStorage.setItem('theme', theme); // Save theme to localStorage
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
        <StylesWrapper>
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