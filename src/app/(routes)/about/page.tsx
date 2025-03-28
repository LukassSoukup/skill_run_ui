"use client"

import { type ReactElement, useState } from "react"
import Image from "next/image"
import CommonLayout from "@/app/components/Layout"
import { navMap } from "@/app/components/Navbar"
import AnimatedBanner from "./animatedBanner"
import SkillModal from "./skillModal"
import ProjectCard from "./projectCard"
import { skillsInterface, SkillType, SortOption } from "./data/StaticDataInterface"
import { projects, skills } from "./data/staticDataProvider"
import { useTheme } from "@/app/context/ThemeProvider"
import { invertIconColor } from "@/app/components/Utils/SkillIconHelper"

export default function About(): ReactElement {
  const [sortOption, setSortOption] = useState<SortOption>("type")
  const [sortedSkills, setSortedSkills] = useState<skillsInterface[]>(
    [...skills].sort((a, b) => a.type.localeCompare(b.type)),
  )

  const handleSort = (option: SortOption) => {
    let sorted: skillsInterface[]

    switch (option) {
      case "type":
        sorted = [...skills].sort((a, b) => a.type.localeCompare(b.type))
        break
      case "level":
        sorted = [...skills].sort((a, b) => b.level - a.level)
        break
      case "name":
        sorted = [...skills].sort((a, b) => a.name.localeCompare(b.name))
        break
      case "frequency":
        sorted = [...skills].sort((a, b) => {
          // Sort by frequency order (if available)
          if (a.frequencyOrder && b.frequencyOrder) {
            return a.frequencyOrder - b.frequencyOrder
          }
          // Fallback to alphabetical sorting of frequency strings
          return (a.frequency || "").localeCompare(b.frequency || "")
        })
        break
      default:
        sorted = [...skills]
    }

    setSortOption(option)
    setSortedSkills(sorted)
  }

  return (
    <>
      <AnimatedBanner skills={skills} />
      <CommonLayout
        pageName={navMap.about}
        className="min-h-screen bg-base-200 flex items-center justify-center p-4 md:p-8"
      >
        <div className="card bg-base-100 shadow-xl max-w-5xl w-full">
          <div className="card-body p-6 md:p-8">
            {/* About Section */}
            <div className="mb-8">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">About</h1>
              <p className="text-base md:text-lg leading-relaxed">
                Fully committed to the philosophy of life-long learning, I&apos;m a full stack developer with a deep
                passion for JavaScript, React and all things web development. The unique combination of creativity,
                logic, technology and never running out of new things to discover, drives my excitement and passion for
                web development. When I&apos;m not at my computer I like to spend my time reading, keeping fit and
                playing guitar.
              </p>
            </div>

            {/* Skills Section */}
            <div className="mb-8">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
                <h2 className="text-2xl font-semibold">Technical Skills</h2>

                {/* Sort Controls */}
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-sm font-medium">Sort by:</span>
                  <div className="flex flex-wrap gap-1">
                    <button
                      onClick={() => handleSort("type")}
                      className={`btn btn-sm ${sortOption === "type" ? "btn-primary" : "btn-outline"}`}
                    >
                      Type
                    </button>
                    <button
                      onClick={() => handleSort("level")}
                      className={`btn btn-sm ${sortOption === "level" ? "btn-primary" : "btn-outline"}`}
                    >
                      Level
                    </button>
                    <button
                      onClick={() => handleSort("name")}
                      className={`btn btn-sm ${sortOption === "name" ? "btn-primary" : "btn-outline"}`}
                    >
                      Name
                    </button>
                    <button
                      onClick={() => handleSort("frequency")}
                      className={`btn btn-sm ${sortOption === "frequency" ? "btn-primary" : "btn-outline"}`}
                    >
                      Frequency
                    </button>
                  </div>
                </div>
              </div>

              {/* Skills Grid with Animation */}
              <div className="grid grid-cols-2 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {sortedSkills.map((skill) => (
                  <SkillButton key={skill.name} skill={skill} />
                ))}
              </div>
            </div>

            {/* GitHub Projects Section */}
            <div>
              <h2 className="text-2xl font-semibold mb-4">GitHub Projects</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {projects.map((project, index) => (
                  <ProjectCard key={index} project={project} skills={skills} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </CommonLayout>
      <SkillModal />
    </>
  )
}

// Skill Button Component
function SkillButton({ skill }: { skill: skillsInterface }) {
  // Get badge color based on skill type
  const { isWhiteMode } = useTheme()
  const getTypeBadgeClass = (type: SkillType) => {
    switch (type) {
      case "frontend":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "backend":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "devops":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  return (
    <button
      onClick={() => {
        if (window.skillModal) {
          window.skillModal.showModal(skill)
        }
      }}
      className="flex flex-col items-center p-3 bg-base-200 dark:bg-base-300 rounded-lg hover:shadow-md transition-all hover:scale-105 hover:bg-base-300 dark:hover:bg-base-200 cursor-pointer transform motion-safe:transition-all motion-safe:duration-300"
    >
      {/* Type Badge */}
      <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeBadgeClass(skill.type)} absolute -top-2 -right-2`}>
        {skill.type}
      </span>

      {/* Technology Image */}
      <div className="w-12 h-12 mb-2 flex items-center justify-center">
        <Image
          src={skill.image || "/placeholder.svg"}
          alt={skill.name}
          className={"w-8 h-8 object-contain " + invertIconColor(skill.name, isWhiteMode())}
          width={32}
          height={32}
        />
      </div>

      {/* Skill Name */}
      <h3 className="text-sm font-medium text-center">{skill.name}</h3>

      {/* Progress Bar */}
      <div className="w-full mt-2">
        <div className="w-full h-1.5 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-primary dark:bg-primary rounded-full"
            style={{ width: `${(skill.level / 5) * 100}%` }}
          ></div>
        </div>
        <div className="text-xs text-center mt-1 text-gray-600 dark:text-gray-400">{skill.level}/5</div>
      </div>

      {/* Frequency */}
      {skill.frequency && <div className="text-xs mt-1 text-gray-500 dark:text-gray-400">{skill.frequency}</div>}
    </button>
  )
}