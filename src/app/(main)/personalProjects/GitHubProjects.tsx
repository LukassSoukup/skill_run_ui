"use client"
import Image from "next/image"
import { ExternalLink } from "lucide-react"
import { ProjectInterface, skillsInterface } from "../../interfaces/StaticDataInterface"
import { pureGitHubSVG } from "@/app/data/IconSvg"
import { projects, skills } from "@/app/data/staticDataProvider"
import { navMap } from "@/app/interfaces/NavMapInt"
import { useTheme } from "@/app/context/ThemeProvider"
import { invertIconColor } from "@/app/components/Utils/SkillIconHelper"

interface ProjectCardProps {
  project: ProjectInterface
  skills: skillsInterface[]
}

const GitHubProjects = () => {
  return (
        <div id={navMap.projects.name}>
          <h2 className="text-2xl font-semibold mb-4">GitHub Projects</h2>
          <div className="flex flex-col gap-6 md:flex-row md:flex-wrap md:gap-6">
            {projects.map((project, index) => (
              <div key={index} className="md:w-[calc(50%-0.75rem)] w-full mb-0">
                <ProjectCard project={project} skills={skills} />
              </div>
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
  }else if (project.name === "InvoiceParser") {
    projectImage = isWhiteMode() ? "/icons/invoice-parser.jpeg" : "/icons/invoice-parser_dark.jpeg";
  }

  return (
    <div className="card bg-base-200 dark:bg-base-300 shadow-lg hover:shadow-xl transition-shadow h-auto p-0">
      <figure className="px-4 pt-2 pb-0 m-0">
        <Image
          src={projectImage || "/icons/placeholder.svg"}
          alt={project.name}
          width={600}
          height={300}
          className="rounded-xl w-full"
          style={{ height: 'auto' }}
        />
      </figure>
      <div className="card-body p-4 pb-3">
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
                    className={"object-contain " + invertIconColor(skill.name, isWhiteMode())}
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
          <GitHubLinkButton
            href={project.githubUrl}
            isDisabled={project.githubUrl === "disabled"}
          />

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

function GitHubLinkButton({ href, isDisabled }: { href: string; isDisabled: boolean }) {
  return (
    <a
      href={isDisabled ? undefined : href}
      target={isDisabled ? undefined : "_blank"}
      rel={isDisabled ? undefined : "noopener noreferrer"}
      className={
        "btn btn-sm btn-outline gap-2 group " +
        (isDisabled ? "cursor-not-allowed opacity-60" : "")
      }
      title={
        isDisabled
          ? "Other members of the project do not wish to share the repository."
          : ""
      }
      aria-disabled={isDisabled ? "true" : undefined}
      tabIndex={isDisabled ? -1 : undefined}
    >
      {pureGitHubSVG("group-hover:invert dark:invert")}
      Code
    </a>
  );
}

export default GitHubProjects;