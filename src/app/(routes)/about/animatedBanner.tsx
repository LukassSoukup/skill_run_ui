"use client"

import { useState, useEffect } from "react"
import SkillIconHelper from "@/app/components/Utils/SkillIconHelper"
import { ChevronUp, ChevronDown } from "lucide-react"
import { skillsInterface } from "../../data/StaticDataInterface"

const AnimatedBanner = ({ skills }: { skills: skillsInterface[] }) => {
  const [isVisible, setIsVisible] = useState(true)
  const [isHovered, setIsHovered] = useState(false)

  // Auto-hide banner after 10 seconds if not interacted with
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!isHovered) {
        setIsVisible(false)
      }
    }, 10000)

    return () => clearTimeout(timer)
  }, [isHovered])

  // Get badge color based on skill type
  const getTypeBadgeClass = (type: string) => {
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
    <div className="fixed bottom-0 w-full z-20 transition-all duration-300 ease-in-out">
      {/* Toggle button */}
      <button
        onClick={() => setIsVisible(!isVisible)}
        className="absolute left-1/2 transform -translate-x-1/2 -top-8 bg-base-100 rounded-t-lg px-4 py-1 shadow-md z-30 flex items-center gap-1 text-xs"
      >
        {isVisible ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
        <span>{isVisible ? "Hide" : "Show"} Skills</span>
      </button>

      {/* Banner */}
      <div
        className={`bg-base-100 shadow-lg transition-all duration-300 ease-in-out ${
          isVisible ? "h-16 opacity-90" : "h-0 opacity-0"
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <div className="marquee h-full overflow-hidden">
          <ul className="marquee__inner flex items-center h-full">
            {skills.map((skill, index) => (
              <li
                key={`${skill.name}-${index}`}
                className="marquee__item flex items-center justify-center mx-2 tooltip"
                data-tip={skill.name}
              >
                <button
                  onClick={() => {
                    if (window.skillModal) {
                      window.skillModal.showModal(skill)
                    }
                  }}
                  className="w-10 h-10 flex items-center justify-center bg-base-200 dark:bg-base-300 rounded-full p-2 hover:bg-base-300 dark:hover:bg-base-200 transition-colors relative"
                >
                  <span
                    className={`absolute -top-1 -right-1 w-3 h-3 rounded-full ${getTypeBadgeClass(skill.type)}`}
                  ></span>
                  <SkillIconHelper skill={skill} />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

export default AnimatedBanner