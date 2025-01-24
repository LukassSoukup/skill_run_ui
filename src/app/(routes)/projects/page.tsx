import React from 'react'
import { navMap } from '../../components/Navbar'
import CommonLayout from '@/app/components/Layout'

const PersonalProjects = () => {
  return (
    <CommonLayout pageName={navMap.projects}>
      <div>Personal projects</div>
    </CommonLayout>
  )
}

export default PersonalProjects