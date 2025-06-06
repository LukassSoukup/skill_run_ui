'use client';
import { skillsInterface } from "@/app/interfaces/StaticDataInterface";
import { INVERTABLE_ICONS } from "@/app/data/staticDataProvider";
import { useTheme } from "@/app/context/ThemeProvider";
import Image from "next/image";

import React from 'react'

export const SkillIconHelper = ({skill}: {skill: skillsInterface}) => {
    const {isWhiteMode} = useTheme();
  return <Image
            src={skill.image}
            alt={skill.name}
            width={10}
            height={10}
            className={"w-full h-full object-contain img " + invertIconColor(skill.name, isWhiteMode())}
            style={{ width: 'auto', height: 'auto' }}
        />
    }

export default SkillIconHelper

export function invertIconColor(skillName: string, isWhiteMode: boolean) {
  return (!isWhiteMode && INVERTABLE_ICONS.includes(skillName) ? "invert" : "")
}