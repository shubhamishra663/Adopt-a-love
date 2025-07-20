import { useEffect, useRef } from "react"
import gsap from "gsap"
import WhyChooseUs from "./WhyChooseUs"
import NeedVeterinarian from "./NeedVeterinarian"

const SectionWrapper = ({ children, className = "" }) => {
  const wrapperRef = useRef(null)
  const particlesRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Create floating particles
      const createParticles = () => {
        const particles = particlesRef.current
        if (!particles) return

        for (let i = 0; i < 20; i++) {
          const particle = document.createElement("div")
          particle.className =
            "absolute w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-400 dark:from-emerald-400 dark:to-blue-400 rounded-full opacity-20 dark:opacity-30"
          particle.style.left = `${Math.random() * 100}%`
          particle.style.top = `${Math.random() * 100}%`
          particles.appendChild(particle)

          // Animate particles
          gsap.to(particle, {
            x: `${Math.random() * 200 - 100}px`,
            y: `${Math.random() * 200 - 100}px`,
            scale: Math.random() * 2 + 0.5,
            opacity: Math.random() * 0.6 + 0.1,
            duration: Math.random() * 10 + 5,
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: Math.random() * 2,
          })
        }
      }

      createParticles()

      // Background morphing animation
      gsap.to(".bg-pattern", {
        backgroundPosition: "200% center",
        duration: 30,
        repeat: -1,
        ease: "none",
      })
    }, wrapperRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={wrapperRef}
      className={`relative bg-[#f5f0ff] dark:bg-black overflow-hidden transition-colors duration-300 ${className}`}
    >
      {/* Animated Background Pattern */}
      <div
        className="bg-pattern absolute inset-0 opacity-30 dark:opacity-20"
        style={{
          backgroundImage: `radial-gradient(circle at 25% 25%, rgba(139, 92, 246, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 75% 75%, rgba(236, 72, 153, 0.1) 0%, transparent 50%),
                            radial-gradient(circle at 50% 50%, rgba(16, 185, 129, 0.05) 0%, transparent 50%)`,
          backgroundSize: "200% 200%",
        }}
      ></div>

      {/* Floating Particles */}
      <div ref={particlesRef} className="absolute inset-0 pointer-events-none"></div>

      {/* Background Decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-purple-500/10 dark:bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-pink-500/10 dark:bg-purple-500/5 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-indigo-500/5 dark:bg-orange-500/5 rounded-full blur-3xl"></div>
      </div>

      {/* Content with relative positioning */}
      <div className="relative z-10">
        <WhyChooseUs/>
        <NeedVeterinarian/>
      </div>
    </section>
  )
}

export default SectionWrapper
