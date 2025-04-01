export interface NavbarProps {
  pageName: routeDetailsType;
}

export interface routeDetailsType {
  name: string;
  path: string;
}

export interface NavMapType {
  home: routeDetailsType;
  about: routeDetailsType
  work: routeDetailsType
  projects: routeDetailsType
  contact: routeDetailsType;
}

export const navMap: NavMapType = {
  home: {
    name: "Home",
    path: "#Home"
  },
  about: {
    name: "About Me",
    path: "#About Me"
  },
  projects: {
    name: "GitHub Projects",
    path: "#GitHub Projects"
  },
  work: {
    name: "Professional Experience",
    path: "#Professional Experience"
  },
  contact: {
    name: "Contact",
    path: "#Contact"
  }
}