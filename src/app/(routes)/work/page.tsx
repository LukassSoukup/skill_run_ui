import CommonLayout from '@/app/components/Layout'
import React from 'react'
import { navMap } from '../../components/Navbar'

const Work = () => {
  return (
    <CommonLayout pageName={navMap.work}>
      <div>Work</div>
    </CommonLayout>
  )
}

export default Work