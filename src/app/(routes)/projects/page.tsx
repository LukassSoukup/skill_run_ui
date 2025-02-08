import React from 'react'
import { navMap } from '../../components/Navbar'
import CommonLayout from '@/app/components/Layout'

const PersonalProjects = () => {
  return (
    <CommonLayout pageName={navMap.projects}>
      <div className="flex items-center justify-center min-h-screen relative z-10">
        <div className="overflow-x-auto w-1/2">
          <table className="table table-zebra bg-base-200 rounded-lg">
            <thead>
              <tr className="bg-base-300">
                <th className="text-primary">Project Name</th>
                <th className="text-primary">Date</th>
                <th className="text-primary">Project Description</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover">
                <td className="font-medium">ColArtStudio</td>
                <td>September of 2024</td>
                <td>Concept of a kids drawing app with native support for Android and IOS using Expo...</td>
              </tr>
              <tr className="hover">
                <td className="font-medium">Welder Norm Checker</td>
                <td>February - March 2023</td>
                <td>ElectronJS desktop application, that keeps track of employees, orders and if the welders are performing based on a given norm</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </CommonLayout>
  )
}

export default PersonalProjects