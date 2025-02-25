import Link from "next/link"
import StylesWrapper from "./Utils/ThemeWrapper";

const Navbar: React.FC<NavbarProps> = ({ pageName }) => {
  if(Object.values(navMap).includes(pageName) === false) {
    throw new Error(`Invalid page name: ${pageName}`)
  }
  return (
    <StylesWrapper className="navbar bg-base-100 fixed w-full top-0 z-10">
      <div className="navbar-start">
        <div className="dropdown dropdown-hover">
          <div tabIndex={0} role="button" className="btn btn-ghost btn-square display-inline-block w-full pl-2 pr-2">
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          <p key={pageName.name} className="text-xl">{pageName.name}</p>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow-lg">
            {Object.entries(navMap).map(([, value]: [string, routeDetailsType]) => (
              <li key={value.name} className="menu menu-title">
                <Link 
                  key={value.name}
                  href={value.path}
                  className="btn btn-secondary"
                >
                  {value.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </StylesWrapper>
  )
}

export default Navbar;

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
    path: "/"
  },
  about: {
    name: "About Me",
    path: "/about"
  },
  work: {
    name: "Work",
    path: "/work"
  },
  projects: {
    name: "Personal Projects",
    path: "/projects"
  },
  contact: {
    name: "Contact",
    path: "/contact"
  }
}