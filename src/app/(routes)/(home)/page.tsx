import CommonLayout from '@/app/components/Layout';
import AnimatedHomePage from '@/app/components/Utils/AnimatedHomePage';
import React from 'react';
import { navMap } from '../../components/Navbar';
import About from '../about/page';
import Contact from '../contact/page';
import { GitHubIcon, LinkedInIcon } from '../../data/IconSvg';

const Home = () => {
  return (
    <CommonLayout pageName={navMap.home}>
      <AnimatedHomePage />
      <div className="flex flex-col min-h-screen bg-base-200 items-center justify-center p-4 md:p-8 backdrop-filter backdrop-blur-lg bg-opacity-80">
        <About />
        <Contact />
      </div>
      <Footer />
    </CommonLayout>
  );
};

const Footer = () => {
  return (
    <footer className="mt-auto py-8  bg-base-200 w-full backdrop-filter backdrop-blur-lg bg-opacity-70">
          <div className="container mx-auto px-4">
            <div className="flex flex-col items-center justify-center text-center">
              <div className="flex items-center gap-4">
                <span className="text-base-content/70 mr-2">Connect:</span>
                <LinkedInIcon />
                <GitHubIcon />
              </div>
              <p className="text-base-content/70 mb-4">© {new Date().getFullYear()} Lukáš Soukup. All rights reserved.</p>
            </div>
          </div>
        </footer>
      );
}

export default Home;