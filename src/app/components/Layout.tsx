import Navbar, { routeDetailsType } from '@/app/components/Navbar';
import ThemeChanger from '@/app/components/Utils/ThemeChanger';
import StylesWrapper from '@/app/components/Utils/ThemeWrapper';
import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
  pageName: routeDetailsType;
}

const CommonLayout: React.FC<LayoutProps> = ({ children, pageName }) => {
  return (
    <>
      <ThemeChanger />
      <Navbar pageName={pageName} />
      <StylesWrapper>
        {children}
      </StylesWrapper>
    </>
  );
};

export default CommonLayout;
