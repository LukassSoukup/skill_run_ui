import ThemeChanger from '@/app/components/Utils/ThemeChanger';
import StylesWrapper from '@/app/components/Utils/ThemeWrapper';
import React from 'react';
import { routeDetailsType } from '../interfaces/NavMapInt';
import Navbar from './Navbar';

interface LayoutProps {
  children: React.ReactNode;
  pageName: routeDetailsType;
  className?: string;
}

const CommonLayout: React.FC<LayoutProps> = ({ children, pageName, className = "" }) => {
  return (
    <div className={className}>
      <ThemeChanger />
      <Navbar pageName={pageName} />
      <StylesWrapper>
        {children}
      </StylesWrapper>
    </div>
  );
};

export default CommonLayout;
