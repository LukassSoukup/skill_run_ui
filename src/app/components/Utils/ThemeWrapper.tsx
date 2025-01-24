"use client"
import { useTheme } from "@/app/context/ThemeProvider";
import React from "react";

interface WrapperProps {
  children: React.ReactNode;
  className?: string; // Allows adding additional custom styles when needed
}

const StylesWrapper: React.FC<WrapperProps> = ({ children, className = "" }) => {
   const { theme } = useTheme()
 
  return (
    <div data-theme={theme} className={`transition-all duration-1000 ${className}`}>
      {children}
    </div>
  );
};

export default StylesWrapper;
