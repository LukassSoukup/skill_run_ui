export type SkillType = "frontend" | "backend" | "devops" | "hacking"
export type SortOption = "type" | "level" | "name" | "frequency"

export interface skillsInterface {
  name: string
  level: number
  image: string
  type: SkillType
  frequency?: string // How often used
  frequencyOrder?: number // Numeric value for sorting (1: Daily, 2: Weekly, etc.)
  purpose?: string // What it's used for
  experience?: string // Experience level description
}

export interface ProjectInterface {
  name: string
  description: string
  githubUrl: string
  demoUrl?: string
  image?: string
  technologies: string[] // Names of technologies used
}

export interface Experience {
  id: string
  company: string
  position: string
  location: string
  startDate: string
  endDate?: string
  description: string
  achievements: string[]
}