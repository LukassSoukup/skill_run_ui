"use client"

import { GitHubIcon, LinkedInIcon } from '@/app/data/IconSvg'
import { DEV_NAME } from '@/app/data/staticDataProvider'
import { useLanguage } from '@/app/context/LanguageProvider'

export default function Footer() {
  const { content } = useLanguage()
  return (
    <footer className="mt-auto py-8 bg-base-200 w-full backdrop-blur-lg bg-opacity-70">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center text-center">
          <div className="flex items-center gap-4">
            <span className="text-base-content/70 mr-2">{content.ui.connect}</span>
            <LinkedInIcon />
            <GitHubIcon />
          </div>
          <p className="text-base-content/70 mb-4">© {new Date().getFullYear()} {DEV_NAME}. {content.ui.rights}</p>
        </div>
      </div>
    </footer>
  )
}
