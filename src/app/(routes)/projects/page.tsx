import React from 'react'
import { navMap } from '../../components/Navbar'
import CommonLayout from '@/app/components/Layout'

const PersonalProjects = () => {
  return (
    <CommonLayout pageName={navMap.projects}>
      <main className="mt-10">
        <div className="grid grid-row-1 md:grid-row-2 lg:grid-row-3 gap-8 h-full w-full">
          <Project name="Skill Run" date="2025" 
          description="This very webApp showcasing my overall skill, personality and interests." 
          gitHub='https://github.com/LukassSoukup/skill_run_ui'/>
          <Project name="Welder Norm Checker" date="2023" 
          description="ElectronJS desktop application, that keeps track of employees, orders and if the welders are performing based on a given requirements." 
          gitHub='https://github.com/LukassSoukup/welder_norm_checker'/>
          <Project name="InvoiceParser" date="2024" 
          description="Little RestAPI that is connected to GmailAPI and from specified emails saves attatchments (invoices). To speed up the billing process." 
          gitHub='https://github.com/LukassSoukup/InvoiceParser'/>
        </div>
      </main>
    </CommonLayout>
  )
}

const Project = ({ name, date, description, gitHub }: { name: string; date: string; description: string, gitHub: string }) => {
  return (
    <div className="card w-full h-full bg-base-200 shadow-xl hover:shadow-2xl transition-all duration-1000">
      <div className="card-body">
        <h2 className="card-title text-primary">{name}</h2>
        <div className="badge badge-secondary">{date}</div>
        <p className="text-base-content mt-2">{description}</p>
        <div className="card-actions justify-end mt-4">
          <button className="btn btn-primary btn-sm">Details</button>
          <button className="btn btn-ghost btn-sm">
            <a href={gitHub}>
              GitHub
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PersonalProjects