"use client"

import type React from "react"
import { useState, type FormEvent, useEffect } from "react"
import { Send } from "lucide-react"
import { navMap } from "@/app/interfaces/NavMapInt"
import { useLanguage } from "@/app/context/LanguageProvider"

interface FormData {
  name: string
  email: string
  message: string
}

export default function Contact() {
  const { content } = useLanguage()
  const { ui } = content
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    success?: boolean
    message?: string
  }>({})

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      const result = await response.json()

      if (result.success) {
        setSubmitStatus({ success: true, message: ui.successMessage })
        setFormData({ name: "", email: "", message: "" })
      } else {
        throw new Error(result.message || "Failed to send message.")
      }
    } catch (error) {
      setSubmitStatus({ success: false, message: ui.errorMessage })
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (submitStatus.message) {
      const timer = setTimeout(() => {
        setSubmitStatus((prev) => ({ ...prev, message: undefined }))
      }, 12000) // 10 seconds delay + 2 seconds fade-out animation

      return () => clearTimeout(timer)
    }
  }, [submitStatus.message])

  return (
    <div id={navMap.contact.name} className="min-h-screen flex flex-col">
      <main className="container mx-auto px-4 py-16 flex-grow">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">
              {ui.getInTouch}
              <div className="absolute -bottom-2 left-0 w-full h-3 bg-primary/20 -z-10 -rotate-1"></div>
            </h1>
          </div>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto mt-6">
            {ui.contactSubheading}
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="card overflow-hidden">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full -ml-12 -mb-12"></div>

                <div className="card-body relative z-0 bg-base-200 shadow-xl rounded-xl border border-base-300">
                  <h2 className="card-title text-2xl mb-8 flex items-center">
                    <span className="relative">
                      {ui.sendMessage}
                      <span className="absolute bottom-0 left-0 w-full h-1 bg-primary"></span>
                    </span>
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">{ui.nameLabel}</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder={ui.namePlaceholder}
                        className="input input-bordered w-full bg-base-100 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">{ui.emailLabel}</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder={ui.emailPlaceholder}
                        className="input input-bordered w-full bg-base-100 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">{ui.messageLabel}</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder={ui.messagePlaceholder}
                        className="textarea textarea-bordered h-40 bg-base-100 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        required
                      ></textarea>
                    </div>

                    <div className="form-control mt-8">
                      <button
                        type="submit"
                        className={`btn btn-primary ${isSubmitting ? "loading" : ""} group relative overflow-hidden`}
                        disabled={isSubmitting}
                      >
                        <span className="relative z-10 flex items-center">
                          {isSubmitting ? ui.sending : ui.sendBtn}
                          {!isSubmitting && (
                            <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          )}
                        </span>
                        <span className="absolute inset-0 bg-primary-focus scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                      </button>
                    </div>
                  </form>

                  {submitStatus.message && (
                    <div
                      className={`alert mt-6 ${submitStatus.success ? "alert-success" : "alert-error"} animate-fadeIn fade-out`}
                    >
                      <div>
                        <span>{submitStatus.message}</span>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
      </main>
    </div>
  )
}