import { Experience, ProjectInterface, skillsInterface } from "../interfaces/StaticDataInterface"

export const INVERTABLE_ICONS = ["Apache Kafka", "Three.js", "Next.js"];

export const ABOUT_INTRO = `Fully committed to the philosophy of life-long learning, I'm a full stack developer with a deep
                passion for JavaScript, React and all things web development. The unique combination of creativity,
                logic, technology and never running out of new things to discover, drives my excitement and passion for
                web development. When I'm not at my computer I like to spend my time reading, keeping fit and
                playing guitar.`
                
export const skills: skillsInterface[] = [
  {
    name: "React",
    level: 4,
    image: "/icons/react.svg",
    type: "frontend",
    frequency: "Weekly",
    frequencyOrder: 2,
    purpose: "Building interactive user interfaces and web applications",
    experience: "Over 4 years of experience building production applications",
  },
  {
    name: "MongoDB",
    level: 3,
    image: "/icons/mongodb-original.svg",
    type: "backend",
    frequency: "Weekly",
    frequencyOrder: 2,
    purpose: "NoSQL database for storing application data",
    experience: "3 years working with MongoDB Atlas and local instances",
  },
  {
    name: "Git",
    level: 5,
    image: "/icons/Git.svg",
    type: "devops",
    frequency: "Daily",
    frequencyOrder: 1,
    purpose: "Version control and collaboration",
    experience: "5+ years of experience with branching strategies and workflows",
  },
  {
    name: "Apache Maven",
    level: 5,
    image: "/icons/Apache Maven.svg",
    type: "devops",
    frequency: "Daily",
    frequencyOrder: 1,
    purpose: "Build automation and dependency management for Java projects",
    experience: "4 years working with complex multi-module projects",
  },
  {
    name: "Apache Kafka",
    level: 3,
    image: "/icons/apache-kafka.svg",
    type: "backend",
    frequency: "Daily",
    frequencyOrder: 1,
    purpose: "Event streaming and message processing",
    experience: "3 years implementing event-driven architectures",
  },
  {
    name: "Argo CD",
    level: 3,
    image: "/icons/Argo CD.svg",
    type: "devops",
    frequency: "Weekly",
    frequencyOrder: 2,
    purpose: "GitOps continuous delivery for Kubernetes",
    experience: "2 years managing deployment workflows",
  },
  {
    name: "Three.js",
    level: 3,
    image: "/icons/brand-threejs.svg",
    type: "frontend",
    frequency: "Monthly",
    frequencyOrder: 3,
    purpose: "3D graphics and visualization in the browser",
    experience: "2 years creating interactive 3D experiences",
  },
  {
    name: "Kali Linux",
    level: 3,
    image: "/icons/distributor-logo-kali-linux.svg",
    type: "hacking",
    frequency: "Monthly",
    frequencyOrder: 3,
    purpose: "Security testing and penetration testing",
    experience: "2 years performing security assessments",
  },
  {
    name: "Docker",
    level: 3,
    image: "/icons/docker.svg",
    type: "devops",
    frequency: "Monthly",
    frequencyOrder: 3,
    purpose: "Containerization of applications",
    experience: "4 years containerizing microservices",
  },
  {
    name: "Electron",
    level: 2,
    image: "/icons/Electron.svg",
    type: "frontend",
    frequency: "Yearly",
    frequencyOrder: 5,
    purpose: "Building cross-platform desktop applications",
    experience: "2 years developing desktop applications",
  },
  {
    name: "Grafana",
    level: 3,
    image: "/icons/grafana.svg",
    type: "devops",
    frequency: "Weekly",
    frequencyOrder: 2,
    purpose: "Metrics visualization and monitoring",
    experience: "3 years creating dashboards and alerts",
  },
  {
    name: "Hibernate",
    level: 4,
    image: "/icons/hibernate.svg",
    type: "backend",
    frequency: "Weekly",
    frequencyOrder: 2,
    purpose: "ORM for Java applications",
    experience: "4 years mapping complex domain models",
  },
  {
    name: "IntelliJ IDEA",
    level: 5,
    image: "/icons/intellij-idea.svg",
    type: "devops",
    frequency: "Daily",
    frequencyOrder: 1,
    purpose: "Java and Kotlin development",
    experience: "5 years as primary IDE",
  },
  {
    name: "Java",
    level: 5,
    image: "/icons/java.svg",
    type: "backend",
    frequency: "Daily",
    frequencyOrder: 1,
    purpose: "Backend service development",
    experience: "6 years building enterprise applications",
  },
  {
    name: "Jenkins",
    level: 4,
    image: "/icons/jenkins-original.svg",
    type: "devops",
    frequency: "Daily",
    frequencyOrder: 1,
    purpose: "CI/CD pipeline automation",
    experience: "4 years configuring and maintaining pipelines",
  },
  {
    name: "Kibana",
    level: 4,
    image: "/icons/kibana.svg",
    type: "devops",
    frequency: "Daily",
    frequencyOrder: 1,
    purpose: "Log analysis and visualization",
    experience: "3 years creating visualizations and dashboards",
  },
  {
    name: "Kubernetes",
    level: 3,
    image: "/icons/kubernetes.svg",
    type: "devops",
    frequency: "Weekly",
    frequencyOrder: 2,
    purpose: "Container orchestration",
    experience: "3 years managing production clusters",
  },
  {
    name: "Next.js",
    level: 4,
    image: "/icons/nextjs.svg",
    type: "devops",
    frequency: "Weekly",
    frequencyOrder: 2,
    purpose: "React framework for production",
    experience: "3 years building full-stack applications",
  },
  {
    name: "Node.js",
    level: 4,
    image: "/icons/nodejs-original.svg",
    type: "backend",
    frequency: "Weekly",
    frequencyOrder: 2,
    purpose: "Backend JavaScript runtime",
    experience: "5 years developing APIs and services",
  },
  {
    name: "PostgreSQL",
    level: 4,
    image: "/icons/postgresql.svg",
    type: "backend",
    frequency: "Weekly",
    frequencyOrder: 2,
    purpose: "Relational database for structured data",
    experience: "4 years designing schemas and optimizing queries",
  },
  {
    name: "Redis",
    level: 4,
    image: "/icons/redis.svg",
    type: "backend",
    frequency: "Weekly",
    frequencyOrder: 2,
    purpose: "In-memory data store and caching",
    experience: "3 years implementing caching strategies",
  },
  {
    name: "SonarQube",
    level: 4,
    image: "/icons/SonarQube.svg",
    type: "devops",
    frequency: "Daily",
    frequencyOrder: 1,
    purpose: "Code quality and security analysis",
    experience: "3 years maintaining quality gates",
  },
  {
    name: "Spring",
    level: 5,
    image: "/icons/spring.svg",
    type: "backend",
    frequency: "Daily",
    frequencyOrder: 1,
    purpose: "Java application framework",
    experience: "5 years building microservices",
  },
  {
    name: "Tailwind CSS",
    level: 4,
    image: "/icons/tailwind-css.svg",
    type: "frontend",
    frequency: "Weekly",
    frequencyOrder: 2,
    purpose: "Utility-first CSS framework",
    experience: "3 years creating responsive designs",
  },
  {
    name: "TypeScript",
    level: 5,
    image: "/icons/typescript-icon.svg",
    type: "frontend",
    frequency: "Weekly",
    frequencyOrder: 2,
    purpose: "Static typing for JavaScript",
    experience: "4 years building type-safe applications",
  },
  {
    name: "Ubuntu",
    level: 5,
    image: "/icons/ubuntu-inverse.svg",
    type: "devops",
    frequency: "Daily",
    frequencyOrder: 1,
    purpose: "Server and development environment",
    experience: "6 years administering servers",
  },
]

export const projects: ProjectInterface[] = [
  {
    name: "Portfolio Website",
    description:
      "My personal portfolio website built with Next.js and Tailwind CSS. Features responsive design, dark mode, and interactive components.",
    githubUrl: "https://github.com/yourusername/portfolio",
    demoUrl: "https://yourportfolio.com",
    image: "/icons/placeholder.svg",
    technologies: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
  },
  {
    name: "E-commerce Platform",
    description:
      "A full-stack e-commerce platform with product catalog, shopping cart, user authentication, and payment processing.",
    githubUrl: "https://github.com/yourusername/ecommerce",
    demoUrl: "https://yourecommerce.com",
    image: "/icons/placeholder.svg",
    technologies: ["React", "Node.js", "MongoDB", "Express", "Redux"],
  },
  {
    name: "DevOps Dashboard",
    description:
      "A monitoring dashboard for DevOps teams to track deployments, infrastructure health, and application metrics.",
    githubUrl: "https://github.com/yourusername/devops-dashboard",
    image: "/icons/placeholder.svg",
    technologies: ["Docker", "Kubernetes", "Grafana", "Prometheus", "React"],
  },
  {
    name: "Task Management System",
    description:
      "A collaborative task management system with real-time updates, task assignments, and progress tracking.",
    githubUrl: "https://github.com/yourusername/task-manager",
    demoUrl: "https://yourtaskmanager.com",
    image: "/icons/placeholder.svg",
    technologies: ["Java", "Spring", "PostgreSQL", "Angular", "WebSockets"],
  },
]

export const experiences: Experience[] = [
    {
      id: "1",
      company: "Tech Solutions Inc.",
      position: "Senior Software Engineer",
      location: "San Francisco, CA",
      startDate: "2020-06",
      description: "Led development of the company's flagship product, a cloud-based analytics platform.",
      achievements: [
        "Architected and implemented a microservices-based backend that improved system reliability by 40%",
        "Mentored junior developers and conducted code reviews to ensure code quality",
        "Collaborated with product managers to define feature requirements and roadmap",
      ],
    },
    {
      id: "2",
      company: "Innovative Startup",
      position: "Full Stack Developer",
      location: "Austin, TX",
      startDate: "2018-03",
      endDate: "2020-05",
      description: "Worked in an agile team to develop a SaaS platform for small businesses.",
      achievements: [
        "Built responsive front-end interfaces using React and Redux",
        "Implemented RESTful APIs using Node.js and Express",
        "Reduced page load time by 60% through code optimization and lazy loading",
      ],
    },
    {
      id: "3",
      company: "Global Tech Corp",
      position: "Junior Developer",
      location: "Remote",
      startDate: "2016-09",
      endDate: "2018-02",
      description: "Contributed to the development of internal tools and customer-facing applications.",
      achievements: [
        "Developed and maintained company website and internal dashboard",
        "Implemented automated testing that caught 30% more bugs before production",
        "Participated in daily stand-ups and sprint planning meetings",
      ],
    },
  ]