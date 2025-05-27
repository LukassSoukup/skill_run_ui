"use client"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { ProjectInterface, skillsInterface } from "../../interfaces/StaticDataInterface"
import { pureGitHubSVG } from "@/app/data/IconSvg"
import { projects, skills } from "@/app/data/staticDataProvider"
import { navMap } from "@/app/interfaces/NavMapInt"
import { useTheme } from "@/app/context/ThemeProvider"

interface ProjectCardProps {
  project: ProjectInterface
  skills: skillsInterface[]
}

const GitHubProjects = () => {
  return (
        <div id={navMap.projects.name}>
          <h2 className="text-2xl font-semibold mb-4">GitHub Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} skills={skills} />
            ))}
          </div>
        </div>
  );
}

function ProjectCard({ project, skills }: ProjectCardProps) {
  const { isWhiteMode } = useTheme();

  // Find the skill objects that match the project technologies
  const projectSkills = skills.filter((skill) => project.technologies.includes(skill.name))

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

  let projectImage = project.image;
  if (project.name === "HarvestGuard") {
    projectImage = isWhiteMode() ? "/icons/HarvestGuard.png" : "/icons/HarvestGuard_dark.png";
  }

  return (
    <div className="card bg-base-200 dark:bg-base-300 shadow-lg hover:shadow-xl transition-shadow">
      <figure className="px-4 pt-4">
        <Image
          src={projectImage || "/icons/placeholder.svg"}
          alt={project.name}
          width={600}
          height={300}
          className="rounded-xl h-48 w-full object-cover"
          style={{ height: 'auto' }}
        />
      </figure>
      <div className="card-body">
        <h3 className="card-title text-xl font-bold">{project.name}</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 whitespace-pre-line">{project.description}</p>

        {/* Technologies Used */}
        <div className="mb-4">
          <h4 className="text-sm font-semibold mb-2">Technologies Used:</h4>
          <div className="flex flex-wrap gap-2">
            {projectSkills.map((skill, index) => (
              <div
                key={index}
                className="flex items-center gap-1 bg-base-100 dark:bg-base-200 px-2 py-1 rounded-md text-xs cursor-pointer hover:bg-opacity-80"
                onClick={() => {
                  if (window.skillModal) {
                    window.skillModal.showModal(skill)
                  }
                }}
              >
                <div className="w-4 h-4 flex-shrink-0">
                  <Image
                    src={skill.image || "/placeholder.svg"}
                    alt={skill.name}
                    width={16}
                    height={16}
                    className="object-contain"
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </div>
                <span>{skill.name}</span>
                <span className={`ml-1 w-2 h-2 rounded-full ${getTypeBadgeClass(skill.type)}`}></span>
              </div>
            ))}
          </div>
        </div>

        {/* Links */}
        <div className="card-actions justify-end mt-auto">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-sm btn-outline gap-2 group"
          >
            {pureGitHubSVG("group-hover:invert dark:invert")}
            Code
          </a>

          {project.demoUrl && (
            <a
              href={project.demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-sm btn-primary gap-2"
            >
              <ExternalLink size={16} />
              Live Demo
            </a>
          )}
        </div>
      </div>
    </div>
  )
}

export default GitHubProjects;