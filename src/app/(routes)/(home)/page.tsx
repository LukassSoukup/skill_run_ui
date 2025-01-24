import CommonLayout from '@/app/components/Layout';
import AnimatedHomePage from '@/app/components/Utils/AnimatedHomePage';
import React from 'react';
import { navMap } from '../../components/Navbar';

const Home = () => {
  return (
    <CommonLayout pageName={navMap.home}>
      <AnimatedHomePage />
    </CommonLayout>
  );
};

export default Home;