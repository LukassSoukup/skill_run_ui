"use client";

import Link from "next/link";
import StylesWrapper from "./Utils/ThemeWrapper";
import { useState, useEffect } from "react";
import { navMap, NavbarProps, routeDetailsType } from "@/app/interfaces/NavMapInt";

const Navbar: React.FC<NavbarProps> = ({ pageName }) => {
  if (!pageName || !Object.values(navMap).some(route => route.name === pageName.name)) {
    throw new Error(`Invalid page name: ${JSON.stringify(pageName)}`);
  }

  const [activeSection, setActiveSection] = useState(pageName.name);

  useEffect(() => {
    const sections = Object.values(navMap).map((route) => document.getElementById(route.name));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            window.history.replaceState(null, "", `#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.8 }
    );

    sections.forEach((section) => {
      if (section) observer.observe(section);
    });

    return () => {
      sections.forEach((section) => {
        if (section) observer.unobserve(section);
      });
    };
  }, []);

  return (
    <StylesWrapper className="navbar bg-base-100 fixed w-full top-0 z-10 duration-200">
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
            <p className="text-xl">{activeSection}</p>
          </div>
          <ul
            tabIndex={0}
            className="dropdown-content menu bg-base-100 z-[1] w-52 p-2 shadow-lg"
          >
            {Object.entries(navMap).map(([, value]: [string, routeDetailsType]) => (
              <li
                key={value.name}
                className={`menu-item p-1 ${value.name === activeSection ? "active" : ""}`}
              >
                <Link href={value.path} className="btn btn-secondary">
                  {value.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </StylesWrapper>
  );
};

export default Navbar;