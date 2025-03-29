"use client"

import type React from "react"

import { useState, type FormEvent } from "react"
import { Send } from "lucide-react"
import Image from "next/image"

interface FormData {
  name: string
  email: string
  message: string
}

export default function Contact() {
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
      // This is where you would integrate with your backend or email service
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulating API call

      setSubmitStatus({
        success: true,
        message: "Thank you! Your message has been sent successfully.",
      })
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: "Oops! Something went wrong. Please try again later.",
      })
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="container mx-auto px-4 py-16 flex-grow">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="relative inline-block">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 relative z-10">
              Get In Touch
              <div className="absolute -bottom-2 left-0 w-full h-3 bg-primary/20 -z-10 transform -rotate-1"></div>
            </h1>
          </div>
          <p className="text-lg text-base-content/70 max-w-2xl mx-auto mt-6">
            I&apos;m always open to new opportunities and collaborations. Feel free to reach out if you have a question or
            just want to say hi!
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          {/* Contact Form with Profile Picture */}
          <div className="relative">
            {/* Profile Picture - Positioned independently */}
            <div className="flex justify-center mb-8 xl:mb-0 xl:absolute xl:-left-60 xl:top-1/2 xl:-translate-y-1/2 z-10">
              <div className="relative w-40 h-40 xl:w-56 xl:h-56">
                <div className="absolute inset-0 bg-gradient-to-br from-primary to-secondary rounded-full opacity-20 blur-md"></div>
                <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-base-100 shadow-xl">
                  <Image
                    src="/icons/profilePic.png"
                    alt="Profile Picture"
                    width={400}
                    height={400}
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Contact Form - Centered */}
            <div className="card overflow-hidden">
              <div className="relative">
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full -mr-16 -mt-16"></div>
                <div className="absolute bottom-0 left-0 w-24 h-24 bg-secondary/10 rounded-full -ml-12 -mb-12"></div>

                <div className="card-body relative z-0 bg-base-200 shadow-xl rounded-xl border border-base-300">
                  <h2 className="card-title text-2xl mb-8 flex items-center">
                    <span className="relative">
                      Send Me a Message
                      <span className="absolute bottom-0 left-0 w-full h-1 bg-primary"></span>
                    </span>
                  </h2>

                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Name</span>
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your name"
                        className="input input-bordered w-full bg-base-100 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Email</span>
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Your email address"
                        className="input input-bordered w-full bg-base-100 focus:border-primary focus:ring-2 focus:ring-primary/20"
                        required
                      />
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text font-medium">Message</span>
                      </label>
                      <textarea
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        placeholder="What would you like to discuss?"
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
                          {isSubmitting ? "Sending..." : "Send Message"}
                          {!isSubmitting && (
                            <Send className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                          )}
                        </span>
                        <span className="absolute inset-0 bg-primary-focus transform scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></span>
                      </button>
                    </div>
                  </form>

                  {submitStatus.message && (
                    <div
                      className={`alert mt-6 ${submitStatus.success ? "alert-success" : "alert-error"} animate-fadeIn`}
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
        </div>
      </main>
    </div>
  )
}