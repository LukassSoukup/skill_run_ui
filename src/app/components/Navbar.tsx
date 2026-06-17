"use client";

import Link from "next/link";
import StylesWrapper from "./Utils/ThemeWrapper";
import { useState, useEffect } from "react";
import { navMap, NavbarProps, routeDetailsType } from "@/app/interfaces/NavMapInt";
import { useTheme } from "@/app/context/ThemeProvider";
import { useLanguage } from "@/app/context/LanguageProvider";
import { Sun, Moon, Menu, X } from "lucide-react";

const DARK_MODE = process.env.NEXT_PUBLIC_THEME_DARK_MODE || "business";
const WHITE_MODE = process.env.NEXT_PUBLIC_THEME_LIGHT_MODE || "nord";

const Navbar: React.FC<NavbarProps> = ({ pageName }) => {
  if (!pageName || !Object.values(navMap).some(route => route.name === pageName.name)) {
    throw new Error(`Invalid page name: ${JSON.stringify(pageName)}`);
  }

  const isHomePage = pageName.name === navMap.home.name;
  const navLinks = isHomePage
    ? Object.values(navMap).filter((route: routeDetailsType) =>
        route.name !== navMap.goHome.name && route.name !== navMap.home.name
      )
    : Object.values(navMap).filter((route: routeDetailsType) =>
        route.name !== navMap.home.name
      );

  const [activeSection, setActiveSection] = useState(pageName.name);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { theme, setTheme } = useTheme();
  const { language, setLanguage, content } = useLanguage();

  const isDark = theme === DARK_MODE;
  const toggleTheme = () => setTheme(isDark ? WHITE_MODE : DARK_MODE);

  const getNavLabel = (route: routeDetailsType): string => {
    const ui = content.ui;
    switch (route.name) {
      case navMap.about.name: return ui.navAbout;
      case navMap.projects.name: return ui.navProjects;
      case navMap.work.name: return ui.navWork;
      case navMap.contact.name: return ui.navContact;
      case navMap.goHome.name: return ui.navHome;
      default: return route.label ?? route.name;
    }
  };

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const sections = Object.values(navMap).map(route => document.getElementById(route.name));
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
            window.history.replaceState(null, "", `#${entry.target.id}`);
          }
        });
      },
      { threshold: 0.6 }
    );
    sections.forEach(section => { if (section) observer.observe(section); });
    return () => { sections.forEach(section => { if (section) observer.unobserve(section); }); };
  }, []);

  return (
    <StylesWrapper
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        scrolled ? "bg-base-100/90 backdrop-blur-md shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className="font-semibold text-base tracking-tight hover:text-primary transition-colors duration-200"
        >
          Lukáš Soukup
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-7">
          {navLinks.map((route: routeDetailsType) => (
            <Link
              key={route.name}
              href={route.path}
              className={`text-sm font-medium transition-colors duration-200 relative pb-0.5
                after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1.5px]
                after:bg-primary after:transition-transform after:duration-200 after:origin-left
                ${activeSection === route.name
                  ? "text-primary after:scale-x-100"
                  : "text-base-content/65 hover:text-base-content after:scale-x-0 hover:after:scale-x-100"
                }`}
            >
              {getNavLabel(route)}
            </Link>
          ))}

          {/* Theme toggle */}
          <button
            data-theme={isDark ? WHITE_MODE : DARK_MODE}
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-base-200 transition-colors duration-200 text-base-content/65 hover:text-base-content"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>

          {/* Language toggle */}
          <div className="flex items-center gap-1">
            <button
              onClick={() => setLanguage('en')}
              className={`text-xl leading-none transition-opacity duration-200 ${language === 'en' ? 'opacity-100' : 'opacity-30 hover:opacity-70'}`}
              aria-label="Switch to English"
            >🇺🇸</button>
            <button
              onClick={() => setLanguage('cs')}
              className={`text-xl leading-none transition-opacity duration-200 ${language === 'cs' ? 'opacity-100' : 'opacity-30 hover:opacity-70'}`}
              aria-label="Switch to Czech"
            >🇨🇿</button>
          </div>
        </nav>

        {/* Mobile: theme + hamburger */}
        <div className="md:hidden flex items-center gap-1">
          <button
            data-theme={isDark ? WHITE_MODE : DARK_MODE}
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-base-200 transition-colors duration-200"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={17} /> : <Moon size={17} />}
          </button>
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="p-2 rounded-full hover:bg-base-200 transition-colors duration-200"
            aria-label="Toggle menu"
            >
            {isMenuOpen ? <X size={19} /> : <Menu size={19} />}
          </button>
        {/* Mobile language toggle */}
          <div className="flex items-center gap-1 px-1">
            <button
              onClick={() => setLanguage('en')}
              className={`text-lg leading-none transition-opacity duration-200 ${language === 'en' ? 'opacity-100' : 'opacity-30'}`}
              aria-label="Switch to English"
            >🇺🇸</button>
            <button
              onClick={() => setLanguage('cs')}
              className={`text-lg leading-none transition-opacity duration-200 ${language === 'cs' ? 'opacity-100' : 'opacity-30'}`}
              aria-label="Switch to Czech"
            >🇨🇿</button>
          </div>
        </div>
      </div>

      {/* Mobile dropdown */}
      {isMenuOpen && (
        <div className="md:hidden bg-base-100 border-t border-base-200 px-6 py-4">
          <nav className="flex flex-col gap-1">
            {navLinks.map((route: routeDetailsType) => (
              <Link
                key={route.name}
                href={route.path}
                onClick={() => setIsMenuOpen(false)}
                className={`text-sm font-medium py-2.5 border-b border-base-200 last:border-0 transition-colors duration-200 ${
                  activeSection === route.name
                    ? "text-primary"
                    : "text-base-content/65 hover:text-primary"
                }`}
              >
                {getNavLabel(route)}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </StylesWrapper>
  );
};

export default Navbar;
