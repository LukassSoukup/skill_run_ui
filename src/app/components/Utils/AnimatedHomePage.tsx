"use client"
import React from 'react'
import { TypeAnimation } from 'react-type-animation'
import LightBallsScene from '../canvas/LightBallsScene';
import { navMap } from '@/app/interfaces/NavMapInt';
import { DEV_NAME } from '@/app/data/staticDataProvider';
import { getRandomColor } from './FnTools';

const AnimatedHomePage = () => {
  return (
    <section id={navMap.home.name} className="h-screen flex items-center justify-center text-center relative">
      <div className="fixed inset-0 opacity-50">
      <LightBallsScene />
      </div>
      <div className="relative z-5">
        <h1 className="text-5xl font-bold mb-4">{"Hello there!"}</h1>
        <h2 className="text-3xl mb-8">
          {"Name's "}
            <span 
            className="text-blue-400 hover:transition-all duration-300" 
            onMouseOver={(e) => {
                e.currentTarget.style.color = getRandomColor();
            }}
            >
            {DEV_NAME}
            </span>
          {" and I love working with: "}
          <TypeAnimation
          sequence={["Java", 2000, "Spring Boot", 2000, "TypeScript", 2000, "React", 2000, "NodeJS", 2000, "NextJS", 2000]}
          wrapper="div"
          cursor={true}
          repeat={Number.POSITIVE_INFINITY}
          className="text-blue-400"
          />
        </h2>
        <a href={"#"+navMap.about.name} className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded transition">
          View My Work
        </a>
      </div>
    </section>
  )
}

export default AnimatedHomePage