"use client"
import React from 'react'
import { TypeAnimation } from 'react-type-animation'

const AnimatedHomePage = () => {
  return (
    <section className="h-screen flex items-center justify-center text-center">
        <div>
          <h1 className="text-5xl font-bold mb-4">{"Hi, I'm Lukáš Soukup"}</h1>
          <h2 className="text-3xl mb-8">
            {"I'm a "}
            <TypeAnimation
              sequence={["Software Engineer", 2000, "Full Stack Developer", 2000, "Problem Solver", 2000]}
              wrapper="span"
              cursor={true}
              repeat={Number.POSITIVE_INFINITY}
              className="text-blue-400"
            />
          </h2>
          <a href="#projects" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition">
            View My Work
          </a>
        </div>
      </section>
  )
}

export default AnimatedHomePage