"use client"
import React from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { navMap } from '@/app/interfaces/NavMapInt'
import { DEV_PROFILE_PIC, DEV_LINKEDIN, DEV_GITHUB, DEV_NAME, DEV_TITLE } from '@/app/data/staticDataProvider'
import { LinkedInIcon, GitHubIcon } from '@/app/data/IconSvg'
import { useLanguage } from '@/app/context/LanguageProvider'

const WaveScene = dynamic(() => import('@/app/components/canvas/WaveScene'), { ssr: false })

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.13, duration: 0.55, ease: 'easeOut' },
  }),
}

const CheckIcon = () => (
  <svg className="w-3.5 h-3.5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
  </svg>
)

const AnimatedHomePage = () => {
  const { content } = useLanguage()
  const { hero, trustSignals } = content

  return (
    <section
      id={navMap.home.name}
      className="min-h-screen flex items-center relative overflow-hidden pt-16"
    >
      <div className="fixed inset-0 pointer-events-none">
        <WaveScene />
      </div>

      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-20 py-16 relative z-10">
        <div className="bg-base-100/10 backdrop-blur-sm rounded-3xl p-8 lg:p-12">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-20">

          {/* Left: text content */}
          <div className="flex-1 text-center lg:text-left order-2 lg:order-1">

            {/* Role label */}
            <motion.p
              custom={0} variants={fadeUp} initial="hidden" animate="visible"
              className="text-xs font-semibold tracking-[0.2em] uppercase text-primary mb-5"
            >
              {DEV_TITLE}
            </motion.p>

            {/* Name */}
            <motion.h1
              custom={1} variants={fadeUp} initial="hidden" animate="visible"
              className="text-5xl lg:text-6xl font-bold text-base-content mb-4 leading-tight"
            >
              {DEV_NAME}
            </motion.h1>

            {/* Value proposition */}
            <motion.p
              custom={2} variants={fadeUp} initial="hidden" animate="visible"
              className="text-xl lg:text-2xl text-base-content/70 mb-8 leading-snug"
            >
              {hero.headlinePre}{' '}
              <span className="text-primary font-semibold">{hero.headlineAccent}</span>
              {' '}{hero.headlinePost}
            </motion.p>

            {/* Service bullets */}
            <motion.ul
              custom={3} variants={fadeUp} initial="hidden" animate="visible"
              className="space-y-3 mb-8 max-w-sm mx-auto lg:mx-0 text-left"
            >
              {hero.services.map((service) => (
                <li key={service} className="flex items-center gap-3">
                  <span className="w-7 h-7 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center flex-shrink-0">
                    <CheckIcon />
                  </span>
                  <span className="text-base-content/80 text-sm lg:text-base">{service}</span>
                </li>
              ))}
            </motion.ul>

            {/* Body paragraph */}
            <motion.p
              custom={4} variants={fadeUp} initial="hidden" animate="visible"
              className="text-base text-base-content/60 leading-relaxed mb-10 max-w-md mx-auto lg:mx-0"
            >
              {hero.subheadline}
            </motion.p>

            {/* CTAs + social links */}
            <motion.div
              custom={5} variants={fadeUp} initial="hidden" animate="visible"
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center mb-8"
            >
              <a href={"#" + navMap.contact.name} className="btn btn-primary btn-lg">
                {hero.ctaPrimary}
              </a>
              <a href={"#" + navMap.about.name} className="btn btn-outline btn-lg">
                {hero.ctaSecondary}
              </a>
              <div className="flex items-center gap-1">
                <LinkedInIcon link={DEV_LINKEDIN} />
                <GitHubIcon link={DEV_GITHUB} />
              </div>
            </motion.div>

            {/* Trust signals */}
            <motion.div
              custom={6} variants={fadeUp} initial="hidden" animate="visible"
              className="flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center lg:justify-start"
            >
              {trustSignals.map((signal, idx) => (
                <span
                  key={signal.label}
                  className="flex items-center gap-2 text-sm text-base-content/50"
                >
                  {idx > 0 && <span className="hidden sm:inline text-base-content/20">·</span>}
                  <Image
                    src={signal.iconPath}
                    alt={signal.label}
                    width={14}
                    height={14}
                    className="w-3.5 h-3.5 object-contain"
                  />
                  {signal.label}
                </span>
              ))}
            </motion.div>

          </div>

          {/* Right: portrait photo */}
          <motion.div
            custom={0} variants={fadeUp} initial="hidden" animate="visible"
            className="flex-shrink-0 order-1 lg:order-2"
          >
            <div className="relative w-64 sm:w-72 lg:w-80" style={{ aspectRatio: '3/4' }}>
              <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/25 rounded-3xl blur-2xl scale-110" />
              <div className="relative w-full h-full rounded-3xl overflow-hidden shadow-2xl">
                <Image
                  src={DEV_PROFILE_PIC}
                  alt={hero.profilePicAlt}
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
            </div>
          </motion.div>

        </div>
        </div>
      </div>
    </section>
  )
}

export default AnimatedHomePage
