"use client"
import React from 'react'
import { TypeAnimation } from 'react-type-animation'
import LightBallsScene from '../canvas/LightBallsScene';

const AnimatedHomePage = () => {
  return (
    <section className="h-screen flex items-center justify-center text-center relative">
      <div className="absolute inset-0 opacity-30">
      <LightBallsScene />
      </div>
      <div className="relative z-10">
        <h1 className="text-5xl font-bold mb-4">{"Hi, I'm Lukáš Soukup"}</h1>
        <h2 className="text-3xl mb-8">
          {"I'm a "}
          <TypeAnimation
          sequence={["Java", 2000, "TypeScript", 2000, "BackEnd", 2000, "FrontEnd", 2000, "Full-Stack", 2000, "React", 2000, "NodeJS", 2000, "Spring Boot", 2000, "NextJS", 2000]}
          wrapper="span"
          cursor={true}
          repeat={Number.POSITIVE_INFINITY}
          className="text-blue-400"
          />
          {" Software Engineer"}
        </h2>
        <a href="/projects" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition">
          View My Work
        </a>
      </div>
    </section>
  )
}

export default AnimatedHomePage