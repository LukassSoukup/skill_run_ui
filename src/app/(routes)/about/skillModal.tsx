"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { X } from "lucide-react"
import { skillsInterface } from "./data/StaticDataInterface"
import { useTheme } from "@/app/context/ThemeProvider"
import { invertIconColor } from "@/app/components/Utils/SkillIconHelper"

// Extend window interface to include our modal
declare global {
  interface Window {
    skillModal: {
      showModal: (skill: skillsInterface) => void
      close: () => void
    }
  }
}

export default function SkillModal() {
  const {isWhiteMode} = useTheme();
  const [selectedSkill, setSelectedSkill] = useState<skillsInterface | null>(null)
  const modalRef = useRef<HTMLDialogElement>(null)
  const initialized = useRef(false)

  useEffect(() => {
    // Initialize the modal immediately when component mounts
    if (!initialized.current) {
      window.skillModal = {
        showModal: (skill: skillsInterface) => {
          setSelectedSkill(skill)
          if (modalRef.current) {
            modalRef.current.showModal()
          }
        },
        close: () => {
          if (modalRef.current) {
            modalRef.current.close()
          }
        },
      }
      initialized.current = true
    }

    // Cleanup function
    return () => {
      // Clean up the global reference when component unmounts
      if (window.skillModal) {
        window.skillModal = {
          showModal: () => {},
          close: () => {},
        }
      }
    }
  }, [])

  // Get badge color based on skill type
  const getTypeBadgeClass = (type: string) => {
    switch (type) {
      case "frontend":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "backend":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "devops":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-300"
    }
  }

  return (
    <dialog id="skill-modal" ref={modalRef} className="modal modal-bottom sm:modal-middle">
      <div className="modal-box bg-base-100 dark:bg-base-300">
        {selectedSkill && (
          <>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 mr-4 bg-base-200 dark:bg-base-100 rounded-full p-2 flex items-center justify-center">
                <Image
                  src={selectedSkill.image || "/placeholder.svg"}
                  alt={selectedSkill.name}
                  width={32}
                  height={32}
                  className={"object-contain " + invertIconColor(selectedSkill.name, isWhiteMode())}
                />
              </div>
              <div>
                <h3 className="font-bold text-lg">{selectedSkill.name}</h3>
                <span className={`text-xs px-2 py-0.5 rounded-full ${getTypeBadgeClass(selectedSkill.type)}`}>
                  {selectedSkill.type}
                </span>
              </div>
              <button
                onClick={() => window.skillModal.close()}
                className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mb-4">
              <div className="flex justify-between items-center mb-1">
                <span className="text-sm font-medium">Proficiency</span>
                <span className="text-sm font-medium">{selectedSkill.level}/5</span>
              </div>
              <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                <div
                  className="h-full bg-primary dark:bg-primary rounded-full"
                  style={{ width: `${(selectedSkill.level / 5) * 100}%` }}
                ></div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Usage Frequency
                </h4>
                <p className="mt-1">{selectedSkill.frequency || "Not specified"}</p>
              </div>

              <div>
                <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Purpose
                </h4>
                <p className="mt-1">{selectedSkill.purpose || "Not specified"}</p>
              </div>

              <div>
                <h4 className="font-semibold text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400">
                  Experience
                </h4>
                <p className="mt-1">{selectedSkill.experience || "Not specified"}</p>
              </div>
            </div>

            <div className="modal-action">
              <form method="dialog">
                <button className="btn">Close</button>
              </form>
            </div>
          </>
        )}
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  )
}