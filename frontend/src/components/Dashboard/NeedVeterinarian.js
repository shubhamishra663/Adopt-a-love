import { useEffect, useRef } from "react"
import { Stethoscope, Heart, ArrowRight, Phone, Clock, MapPin } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"

gsap.registerPlugin(ScrollTrigger)

const NeedVeterinarian = () => {
  const sectionRef = useRef(null)
  const titleRef = useRef(null)
  const buttonRef = useRef(null)
  const floatingElementsRef = useRef(null)
  const emergencyInfoRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const createFloatingElements = () => {
        const container = floatingElementsRef.current
        if (!container) return

        const icons = [Stethoscope, Heart, Phone]

        icons.forEach((Icon, index) => {
          const element = document.createElement("div")
          element.className = "absolute opacity-20 dark:opacity-30"
          element.style.left = `${20 + index * 30}%`
          element.style.top = `${20 + index * 20}%`

          const iconElement = document.createElement("div")
          iconElement.className = "w-8 h-8 text-purple-400 dark:text-emerald-400"
          element.appendChild(iconElement)
          container.appendChild(element)

          gsap.to(element, {
            y: `${Math.random() * 50 - 25}px`,
            x: `${Math.random() * 50 - 25}px`,
            rotation: 360,
            duration: 8 + index * 2,
            repeat: -1,
            ease: "none",
            delay: index * 1,
          })
        })
      }

      createFloatingElements()

      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })

      mainTimeline
        .fromTo(
          titleRef.current,
          {
            y: 100,
            opacity: 0,
            scale: 0.8,
          },
          {
            y: 0,
            opacity: 1,
            scale: 1,
            duration: 1.2,
            ease: "back.out(1.2)",
          },
        )
        .fromTo(
          emergencyInfoRef.current?.children || [],
          {
            x: -100,
            opacity: 0,
            rotationY: 90,
          },
          {
            x: 0,
            opacity: 1,
            rotationY: 0,
            duration: 0.8,
            stagger: 0.2,
            ease: "power3.out",
          },
          "-=0.5",
        )
        .fromTo(
          buttonRef.current,
          {
            scale: 0,
            opacity: 0,
            rotationY: 180,
          },
          {
            scale: 1,
            opacity: 1,
            rotationY: 0,
            duration: 1,
            ease: "back.out(1.7)",
          },
          "-=0.3",
        )

      gsap.to(".emergency-pulse", {
        scale: 1.1,
        opacity: 0.8,
        duration: 1.5,
        repeat: -1,
        yoyo: true,
        ease: "power2.inOut",
      })

      const button = buttonRef.current
      if (button) {
        const icon = button.querySelector(".arrow-icon")
        const stethoscope = button.querySelector(".stethoscope-icon")

        button.addEventListener("mouseenter", () => {
          const tl = gsap.timeline()

          tl.to(button, {
            scale: 1.05,
            y: -5,
            boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
            duration: 0.3,
            ease: "power2.out",
          })
            .to(
              icon,
              {
                x: 10,
                scale: 1.2,
                duration: 0.3,
                ease: "back.out(1.7)",
              },
              0,
            )
            .to(
              stethoscope,
              {
                rotation: 360,
                scale: 1.3,
                duration: 0.6,
                ease: "power2.out",
              },
              0,
            )
        })

        button.addEventListener("mouseleave", () => {
          const tl = gsap.timeline()

          tl.to(button, {
            scale: 1,
            y: 0,
            boxShadow: "0 10px 20px rgba(139, 92, 246, 0.2)",
            duration: 0.3,
            ease: "power2.out",
          })
            .to(
              icon,
              {
                x: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
              },
              0,
            )
            .to(
              stethoscope,
              {
                rotation: 0,
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
              },
              0,
            )
        })

        button.addEventListener("click", () => {
          gsap.to(button, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
          })
        })
      }
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="py-20">
      {/* Floating Medical Elements */}
      <div ref={floatingElementsRef} className="absolute inset-0 pointer-events-none"></div>

      {/* Emergency pulse glow */}
      <div className="emergency-pulse absolute inset-0 bg-purple-400/5 dark:bg-emerald-400/5 rounded-full blur-3xl"></div>

      <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
        <div className="inline-flex items-center space-x-2 bg-purple-500/20 dark:bg-purple-800/30 text-purple-800 dark:text-white px-4 py-2 rounded-full mb-8">
          <Heart className="w-4 h-4 animate-pulse" fill="currentColor" />
          <span className="text-sm font-semibold">Emergency Pet Care Available</span>
        </div>

        <h2 ref={titleRef} className="text-3xl md:text-5xl font-bold text-[#4B0082] dark:text-white mb-8">
          Need Assistance for{" "}
          <span className="block text-transparent bg-clip-text bg-gradient-to-r from-purple-600 to-pink-600 dark:from-emerald-400 dark:to-blue-400">
            Your Pet?
          </span>
        </h2>

        <div ref={emergencyInfoRef} className="grid md:grid-cols-3 gap-6 mb-12">
          <div className="bg-white/80 dark:bg-white/5 border border-purple-200/50 dark:border-white/10 rounded-2xl p-6 shadow-2xl">
            <Clock className="w-8 h-8 text-purple-600 dark:text-emerald-400 mx-auto mb-3" />
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">24/7 Available</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Emergency veterinary care around the clock</p>
          </div>

          <div className="bg-white/80 dark:bg-white/5 border border-purple-200/50 dark:border-white/10 rounded-2xl p-6 shadow-2xl">
            <Phone className="w-8 h-8 text-purple-600 dark:text-emerald-400 mx-auto mb-3" />
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">Instant Contact</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Direct line to certified veterinarians</p>
          </div>

          <div className="bg-white/80 dark:bg-white/5 border border-purple-200/50 dark:border-white/10 rounded-2xl p-6 shadow-2xl">
            <MapPin className="w-8 h-8 text-purple-600 dark:text-emerald-400 mx-auto mb-3" />
            <h3 className="font-bold text-gray-800 dark:text-white mb-2">Local Network</h3>
            <p className="text-gray-600 dark:text-gray-300 text-sm">Connected to nearby veterinary clinics</p>
          </div>
        </div>

        <div ref={buttonRef} className="inline-block cursor-pointer group">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 dark:from-emerald-500 dark:to-blue-500 hover:from-purple-600 hover:to-pink-600 dark:hover:from-emerald-600 dark:hover:to-blue-600 text-white px-12 py-4 rounded-full shadow-xl transition-all duration-300 transform">
            <div className="flex items-center space-x-3">
              <Stethoscope className="stethoscope-icon w-6 h-6" />
              <span className="font-bold text-lg">Need Veterinarian</span>
              <ArrowRight className="arrow-icon w-5 h-5 transition-transform duration-300" />
            </div>
          </div>
        </div>

        <p className="mt-6 text-gray-600 dark:text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Connect with certified veterinarians who understand the unique needs of rescued and adopted pets. Get
          professional medical advice and emergency care when your furry friend needs it most.
        </p>
      </div>
    </div>
  )
}

export default NeedVeterinarian
