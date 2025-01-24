import CommonLayout from '@/app/components/Layout';
import React from 'react';
import { navMap } from '../../components/Navbar';

const Contact = () => {
  return (
    <CommonLayout pageName={navMap.contact}>
      <div>Contact</div>
    </CommonLayout>
  );
};

export default Contact;