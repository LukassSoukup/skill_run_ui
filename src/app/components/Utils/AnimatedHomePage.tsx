"use client"
import React from 'react'
import dynamic from 'next/dynamic'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { navMap } from '@/app/interfaces/NavMapInt'
import { DEV_PROFILE_PIC } from '@/app/data/staticDataProvider'
import { useLanguage } from '@/app/context/LanguageProvider'

const WaveScene = dynamic(() => import('@/app/components/canvas/WaveScene'), { ssr: false })

const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.13, duration: 0.55, ease: "easeOut" },
  }),
}

const AnimatedHomePage = () => {
  const { content } = useLanguage()
  const { hero, trustSignals } = content

  return (
    <section
      id={navMap.home.name}
      className="min-h-screen flex items-center relative overflow-hidden pt-16"
    >
      {/* Three.js wave background */}
      <div className="fixed inset-0 pointer-events-none">
        <WaveScene />
      </div>

      {/* Background gradient blobs */}
      <div className="absolute top-1/4 -left-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-32 w-80 h-80 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-6 lg:px-16 py-16 relative z-10">

        {/* ── Hero card ── */}
        <motion.div
          variants={fadeUp} initial="hidden" animate="visible"
          className="bg-base-100/70 rounded-3xl p-8 lg:p-12"
        >
            <div className="flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-16">

              {/* ── Left: text content ── */}
              <div className="flex-1 max-w-xl text-center lg:text-left order-2 lg:order-1">

                {/* Available badge */}
                <motion.div
                  custom={1} variants={fadeUp} initial="hidden" animate="visible"
                  className="inline-flex items-center gap-2 bg-success/15 text-success text-xs font-semibold tracking-wide uppercase px-4 py-1.5 rounded-full mb-7 border border-success/20"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-success animate-pulse" />
                  {hero.availableBadge}
                </motion.div>

                {/* Headline */}
                <motion.h1
                  custom={2} variants={fadeUp} initial="hidden" animate="visible"
                  className="text-4xl lg:text-[3.5rem] font-bold leading-tight mb-6 tracking-tight"
                >
                  {hero.headlinePre}{" "}
                  <span className="text-primary">{hero.headlineAccent}</span>
                  <br />{hero.headlinePost}
                </motion.h1>

                {/* Subheadline */}
                <motion.p
                  custom={3} variants={fadeUp} initial="hidden" animate="visible"
                  className="text-base lg:text-lg text-base-content/80 leading-relaxed mb-9"
                >
                  {hero.subheadline}
                </motion.p>

                {/* CTAs */}
                <motion.div
                  custom={4} variants={fadeUp} initial="hidden" animate="visible"
                  className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-10"
                >
                  <a
                    href={"#" + navMap.contact.name}
                    className="btn btn-primary btn-lg"
                  >
                    {hero.ctaPrimary}
                  </a>
                  <a
                    href={"#" + navMap.about.name}
                    className="btn btn-outline btn-lg"
                  >
                    {hero.ctaSecondary}
                  </a>
                </motion.div>

                {/* Trust signals */}
                <motion.div
                  custom={5} variants={fadeUp} initial="hidden" animate="visible"
                  className="flex flex-col sm:flex-row sm:flex-wrap gap-3 justify-center lg:justify-start"
                >
                  {trustSignals.map((signal, idx) => (
                    <span
                      key={signal.label}
                      className="flex items-center gap-2 text-sm text-base-content/70"
                    >
                      {idx > 0 && (
                        <span className="hidden sm:inline text-base-content/30">·</span>
                      )}
                      <span className="text-primary/80 text-xs">{signal.icon}</span>
                      {signal.label}
                    </span>
                  ))}
                </motion.div>
              </div>

              {/* ── Right: profile picture ── */}
              <motion.div
                custom={1} variants={fadeUp} initial="hidden" animate="visible"
                className="flex-shrink-0 order-1 lg:order-2"
              >
                <div className="relative w-56 h-56 sm:w-64 sm:h-64 lg:w-80 lg:h-80">
                  {/* Glow ring */}
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/40 to-secondary/25 rounded-full blur-2xl scale-110" />
                  {/* Photo */}
                  <div className="relative w-full h-full rounded-full overflow-hidden shadow-2xl">
                    <Image
                      src={DEV_PROFILE_PIC}
                      alt={hero.profilePicAlt}
                      width={400}
                      height={400}
                      className="object-cover w-full h-full"
                      priority
                    />
                  </div>
                </div>
              </motion.div>

            </div>
        </motion.div>

      </div>
    </section>
  )
}

export default AnimatedHomePage
