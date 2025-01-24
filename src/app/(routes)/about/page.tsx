import CommonLayout from '@/app/components/Layout';
import React from 'react';
import { navMap } from '../../components/Navbar';

const About = () => {
  return (
    <CommonLayout pageName={navMap.about}>
      <div>About</div>
    </CommonLayout>
  );
};

export default About;