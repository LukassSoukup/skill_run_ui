// ThemeContext.tsx
'use client'; // Must be a client component for CSR functionality

import React, { createContext, useState, useContext, useEffect } from 'react';
import { WHITE_MODE } from '../constants/Styles';
import StylesWrapper from '../components/Utils/ThemeWrapper';

interface ThemeContextProps {
  theme: string;
  setTheme: React.Dispatch<React.SetStateAction<string>>;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<string>(() => {
    return WHITE_MODE;
  });

  useEffect(() => {
    localStorage.setItem('theme', theme); // Save theme to localStorage
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
        <StylesWrapper theme={theme}>
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