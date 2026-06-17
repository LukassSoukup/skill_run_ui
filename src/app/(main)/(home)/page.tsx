import CommonLayout from '@/app/components/Layout';
import AnimatedHomePage from '@/app/components/Utils/AnimatedHomePage';
import React from 'react';
import Contact from '../contact/Contact';
import Work from '../work/Work';
import GitHubProjects from '../personalProjects/GitHubProjects';
import { navMap } from '@/app/interfaces/NavMapInt';
import About from '../about/About';
import Footer from './Footer';

const Home = () => {
  return (
    <CommonLayout pageName={navMap.home}>
      <AnimatedHomePage />
      <div className="flex flex-col min-h-screen bg-base-200/50 items-center justify-center p-4 md:p-8 backdrop-blur-sm">
        <div className="card bg-base-100 shadow-xl max-w-5xl w-full backdrop-blur-lg bg-opacity-50 p-8 rounded-lg">
          <About />
          <GitHubProjects />
          <Work />
        </div>
        <Contact />
      </div>
      <Footer />
    </CommonLayout>
  );
};

export default Home;
