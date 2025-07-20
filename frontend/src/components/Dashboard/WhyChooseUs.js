import { useEffect, useRef } from "react"
import { Heart, Dog, Shield, Users, Search, Award } from "lucide-react"
import gsap from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import adoptme from "../../utils/adoptMe.png"

gsap.registerPlugin(ScrollTrigger)

const WhyChooseUs = () => {
  const sectionRef = useRef(null)
  const imageRef = useRef(null)
  const titleRef = useRef(null)
  const contentRef = useRef(null)

  const features = [
    {
      icon: Heart,
      title: "Adopt with Confidence",
      description: "We ensure every pet is thoroughly vetted for a healthy and loving companionship.",
      color: "from-red-500 to-pink-500",
      bgColor: "bg-white/80 dark:bg-gray-800/80",
      borderColor: "border-red-500/30",
      iconBg: "bg-red-500",
    },
    {
      icon: Dog,
      title: "Wide Variety of Pets",
      description:
        "From playful puppies to loyal adult dogs, and cuddly kittens to wise older cats, we offer a diverse range of pets ready for adoption.",
      color: "from-orange-500 to-amber-500",
      bgColor: "bg-white/80 dark:bg-gray-800/80",
      borderColor: "border-orange-500/30",
      iconBg: "bg-orange-500",
    },
    {
      icon: Shield,
      title: "Safe & Secure Adoption Process",
      description: "We guide you through a transparent adoption process, ensuring safety for both pets and adopters.",
      color: "from-emerald-500 to-green-500",
      bgColor: "bg-white/80 dark:bg-gray-800/80",
      borderColor: "border-emerald-500/30",
      iconBg: "bg-emerald-500",
    },
    {
      icon: Users,
      title: "Support for Pet Rescuers",
      description: "Empowering pet rescuers with the tools they need to find homes for pets in need.",
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-white/80 dark:bg-gray-800/80",
      borderColor: "border-blue-500/30",
      iconBg: "bg-blue-500",
    },
    {
      icon: Search,
      title: "Comprehensive Pet Profiles",
      description:
        "Detailed pet profiles, including temperament and medical history, help you make informed decisions.",
      color: "from-purple-500 to-violet-500",
      bgColor: "bg-white/80 dark:bg-gray-800/80",
      borderColor: "border-purple-500/30",
      iconBg: "bg-purple-500",
    },
    {
      icon: Award,
      title: "Lifetime Support",
      description: "Once adopted, you're part of our community! Continuous support for your new furry friend.",
      color: "from-pink-500 to-rose-500",
      bgColor: "bg-white/80 dark:bg-gray-800/80",
      borderColor: "border-pink-500/30",
      iconBg: "bg-pink-500",
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Main timeline for section entrance
      const mainTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      })

      // Image entrance with morphing effect
      mainTimeline
        .fromTo(
          imageRef.current,
          {
            scale: 0.5,
            rotation: -15,
            opacity: 0,
            filter: "blur(20px)",
          },
          {
            scale: 1,
            rotation: 0,
            opacity: 1,
            filter: "blur(0px)",
            duration: 1.5,
            ease: "back.out(1.2)",
          },
        )
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
            ease: "power3.out",
          },
          "-=1",
        )

      // Feature cards staggered animation
      gsap.fromTo(
        ".feature-card",
        {
          x: 200,
          opacity: 0,
          rotationY: 90,
          scale: 0.8,
        },
        {
          x: 0,
          opacity: 1,
          rotationY: 0,
          scale: 1,
          duration: 1,
          stagger: 0.15,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: contentRef.current,
            start: "top 80%",
            end: "bottom 20%",
          },
        },
      )

      // Advanced hover interactions for feature cards
      const cards = gsap.utils.toArray(".feature-card")
      cards.forEach((card, index) => {
        const icon = card.querySelector(".feature-icon")
        const iconBg = card.querySelector(".icon-bg")
        const content = card.querySelector(".feature-content")
        const border = card.querySelector(".card-border")

        // Continuous floating animation
        gsap.to(card, {
          y: -10,
          duration: 2 + index * 0.3,
          repeat: -1,
          yoyo: true,
          ease: "power2.inOut",
          delay: index * 0.2,
        })

        card.addEventListener("mouseenter", () => {
          const tl = gsap.timeline()

          tl.to(card, {
            scale: 1.05,
            y: -20,
            rotationY: 5,
            duration: 0.4,
            ease: "power2.out",
          })
            .to(
              icon,
              {
                scale: 1.3,
                rotation: 360,
                duration: 0.6,
                ease: "back.out(1.7)",
              },
              0,
            )
            .to(
              iconBg,
              {
                scale: 1.2,
                boxShadow: "0 20px 40px rgba(0,0,0,0.2)",
                duration: 0.4,
                ease: "power2.out",
              },
              0,
            )
            .to(
              content,
              {
                y: -5,
                duration: 0.4,
                ease: "power2.out",
              },
              0,
            )
            .to(
              border,
              {
                opacity: 1,
                scale: 1.02,
                duration: 0.4,
                ease: "power2.out",
              },
              0,
            )
        })

        card.addEventListener("mouseleave", () => {
          const tl = gsap.timeline()

          tl.to(card, {
            scale: 1,
            y: -10,
            rotationY: 0,
            duration: 0.4,
            ease: "power2.out",
          })
            .to(
              icon,
              {
                scale: 1,
                rotation: 0,
                duration: 0.4,
                ease: "power2.out",
              },
              0,
            )
            .to(
              iconBg,
              {
                scale: 1,
                boxShadow: "0 10px 20px rgba(0,0,0,0.1)",
                duration: 0.4,
                ease: "power2.out",
              },
              0,
            )
            .to(
              content,
              {
                y: 0,
                duration: 0.4,
                ease: "power2.out",
              },
              0,
            )
            .to(
              border,
              {
                opacity: 0.3,
                scale: 1,
                duration: 0.4,
                ease: "power2.out",
              },
              0,
            )
        })

        // Click animation
        card.addEventListener("click", () => {
          gsap.to(card, {
            scale: 0.95,
            duration: 0.1,
            yoyo: true,
            repeat: 1,
            ease: "power2.inOut",
          })
        })
      })

      // Image parallax effect
      gsap.to(imageRef.current, {
        y: -30,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 1,
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <div ref={sectionRef} className="min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row min-h-screen">
          {/* Left Section: Image */}
          <div className="lg:w-1/2 relative flex items-center justify-center p-8">
            <div
              ref={imageRef}
              className="relative w-full max-w-lg aspect-square rounded-3xl overflow-hidden shadow-2xl"
            >
              <img
                className="w-full h-full object-cover"
                src={adoptme}
                alt="Happy pets waiting for adoption"
                loading="lazy"
              />

              <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 to-pink-500/20 dark:from-emerald-500/20 dark:to-purple-500/20"></div>

              {/* Floating elements around image */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-purple-400 dark:bg-emerald-400 rounded-full animate-pulse"></div>
              <div
                className="absolute -bottom-4 -left-4 w-6 h-6 bg-pink-400 dark:bg-orange-400 rounded-full animate-pulse"
                style={{ animationDelay: "1s" }}
              ></div>
              <div
                className="absolute top-1/4 -left-6 w-4 h-4 bg-indigo-400 dark:bg-purple-400 rounded-full animate-pulse"
                style={{ animationDelay: "2s" }}
              ></div>
            </div>
          </div>

          {/* Right Section: Content */}
          <div className="lg:w-1/2 p-8 flex flex-col justify-center">
            <h2
              ref={titleRef}
              className="text-5xl lg:text-6xl font-bold text-[#4B0082] dark:text-transparent dark:bg-clip-text dark:bg-gradient-to-r dark:from-emerald-400 dark:via-blue-400 dark:to-purple-400 mb-12 text-center lg:text-left"
            >
              Why Choose Us?
            </h2>

            <div ref={contentRef} className="space-y-6">
              {features.map((feature, index) => (
                <div key={index} className="feature-card relative cursor-pointer group">
                  {/* Animated border */}
                  <div
                    className={`card-border absolute inset-0 rounded-2xl bg-gradient-to-r ${feature.color} opacity-20 dark:opacity-30 blur-sm`}
                  ></div>

                  <div
                    className={`relative flex flex-col md:flex-row items-center ${feature.bgColor} backdrop-blur-lg border-2 ${feature.borderColor} p-6 rounded-2xl shadow-xl space-y-4 md:space-x-6 md:space-y-0 transition-all duration-300`}
                  >
                    <div
                      className={`icon-bg w-16 h-16 ${feature.iconBg} flex items-center justify-center rounded-full shadow-lg`}
                    >
                      <feature.icon className="feature-icon w-8 h-8 text-white" />
                    </div>
                    <div className="feature-content text-center md:text-left">
                      <h3 className="text-xl font-bold text-gray-800 dark:text-white mb-2">{feature.title}</h3>
                      <p className="text-gray-600 dark:text-gray-300 leading-relaxed">{feature.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Call to Action */}
            <div className="mt-12 text-center lg:text-left">
              <button className="group bg-gradient-to-r from-purple-500 to-pink-500 dark:from-emerald-500 dark:to-blue-500 hover:from-purple-600 hover:to-pink-600 dark:hover:from-emerald-600 dark:hover:to-blue-600 text-white px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl">
                <span className="mr-2">Start Your Journey</span>
                <Heart className="inline w-5 h-5 transition-transform duration-300 group-hover:scale-110" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default WhyChooseUs
