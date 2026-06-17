export interface NavbarProps {
  pageName: routeDetailsType;
}

export interface routeDetailsType {
  name: string;
  path: string;
  label?: string;
}

export interface NavMapType {
  goHome: routeDetailsType;
  home: routeDetailsType;
  about: routeDetailsType
  work: routeDetailsType
  projects: routeDetailsType
  contact: routeDetailsType;
}

export const navMap: NavMapType = {
  goHome: {
    name: "Home",
    path: "/",
    label: "Home",
  },
  home: {
    name: "Home",
    path: "#Home",
    label: "Home",
  },
  about: {
    name: "About Me",
    path: "#About Me",
    label: "About",
  },
  projects: {
    name: "GitHub Projects",
    path: "#GitHub Projects",
    label: "Projects",
  },
  work: {
    name: "Professional Experience",
    path: "#Professional Experience",
    label: "Experience",
  },
  contact: {
    name: "Contact",
    path: "#Contact",
    label: "Hire Me",
  },
}