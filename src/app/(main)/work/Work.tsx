import { experiences } from "@/app/data/staticDataProvider"
import { navMap } from "@/app/interfaces/NavMapInt"
import type { ExperienceType } from "@/app/interfaces/StaticDataInterface"
import { Briefcase, GraduationCap, Zap } from "lucide-react"

export default function Work() {
  const formatDate = (dateString?: string) => {
    if (!dateString) return "Present"
    const date = new Date(dateString)
    return date.toLocaleDateString("en-US", { year: "numeric", month: "short" })
  }

  const getIconByType = (type: ExperienceType) => {
    switch (type) {
      case "employment":
        return <Briefcase className="h-4 w-4" />
      case "certification":
        return <GraduationCap className="h-4 w-4" />
      case "hackathon":
        return <Zap className="h-4 w-4" />
      default:
        return <Briefcase className="h-4 w-4" />
    }
  }

  const sortedExperiences = [...experiences].sort((a, b) => {
    const parse = (dateString?: string) => {
      if (!dateString || dateString.toLowerCase() === 'present') return Date.now();
      return new Date(dateString).getTime();
    };
    return parse(b.endDate) - parse(a.endDate);
  })

  return (
    <div id={navMap.work.name} className="card-body p-6 md:p-8">
      <h1 className="text-3xl font-bold tracking-tight mb-10">Professional Experience</h1>
      <div className="space-y-8">
        {sortedExperiences.map((exp) => (
          <div key={exp.id} className="card bg-base-200 dark:bg-base-300 shadow-lg hover:shadow-xl transition-shadow">
            <div className="absolute left-0 top-0 flex h-7 w-7 items-center justify-center rounded-full bg-blue-600 text-white dark:invert" title={exp.type}>
              {getIconByType(exp.type)}
            </div>
            <div className="card-body rounded-lg shadow-sm p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2">
                <div>
                  <h3 className="card-title font-semibold text-lg">{exp.position}</h3>
                  <div className="text-gray-500 dark:text-gray-400">
                    {exp.company} • {exp.location}
                  </div>
                </div>
                <div className="md:ml-auto whitespace-nowrap px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                  {formatDate(exp.startDate)} - {formatDate(exp.endDate)}
                </div>
              </div>
              <p className="mt-4 whitespace-pre-line">{exp.description}</p>
              {exp.achievements.length > 0 && (
                <div className="mt-4">
                  <h4 className="font-medium text-sm mb-2">Key Achievements:</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {exp.achievements.map((achievement, i) => (
                      <li key={i} className="text-sm">
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {exp.sources && Object.keys(exp.sources).length > 0 && (
                <div className="mt-4">
                  <h4 className="text-sm font-semibold mb-2">Sources:</h4>
                  <div className="flex flex-wrap gap-2">
                    {Object.entries(exp.sources).map(([label, url], idx) => (
                      <a
                        key={idx}
                        href={url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-1 bg-base-100 dark:bg-base-200 px-2 py-1 rounded-md text-xs cursor-pointer hover:bg-opacity-80 underline"
                      >
                        {label}
                      </a>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}