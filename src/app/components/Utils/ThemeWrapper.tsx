// components/Wrapper.tsx
import React from "react";

interface WrapperProps {
  children: React.ReactNode;
  theme: string;
  className?: string; // Allows adding additional custom styles when needed
}

const StylesWrapper: React.FC<WrapperProps> = ({ children, theme, className = "" }) => {
  return (
    <div data-theme={theme} className={`transition-all duration-1000 ${className}`}>
      {children}
    </div>
  );
};

export default StylesWrapper;
