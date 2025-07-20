import React, { useEffect, useRef, useState } from 'react';
import { ChevronDown } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const FAQ = () => {
  const sectionRef = useRef(null);
  const titleRef = useRef(null);
  const [openIndex, setOpenIndex] = useState(0);

  const Questions = [
    {
      id: 1,
      q: "How do I adopt a pet?",
      a: "To adopt, browse our available pets, choose one, and submit an adoption application. We will guide you through the process, including a meet-and-greet and completing the necessary paperwork.",
    },
    {
      id: 2,
      q: "What are the requirements for adoption?",
      a: "You must be at least 18 years old, provide proof of ID and address, and complete an adoption application. Some pets may require a home visit or interview.",
    },
    {
      id: 3,
      q: "Can I meet the pet before adopting?",
      a: "Yes, we arrange meet-and-greets to ensure compatibility between you and the pet before finalizing the adoption.",
    },
    {
      id: 4,
      q: "How long does the adoption process take?",
      a: "The process can take a few days to a week, depending on how quickly the paperwork is processed and meetings are scheduled.",
    },
    {
      id: 5,
      q: "Can I adopt more than one pet?",
      a: "Yes, if you meet the requirements and are capable of caring for multiple pets, you can adopt more than one at a time.",
    },
    {
      id: 6,
      q: "How do I know if a pet is good with children or other pets?",
      a: "Each pet is assessed for temperament, and we provide detailed information about their behavior around children and other pets.",
    },
    {
      id: 7,
      q: "Can I donate to help the animals?",
      a: "Absolutely! We rely on donations to help care for the animals. You can make a donation through our website.",
    },
    {
      id: 8,
      q: "What should I do if I can no longer care for my adopted pet?",
      a: "If you are unable to care for your pet, please contact us. We will work with you to find a suitable solution, including returning the pet or helping with rehoming.",
    },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        titleRef.current,
        { y: 100, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: titleRef.current,
            start: 'top 80%',
          },
        }
      );

      gsap.fromTo(
        '.faq-item',
        { x: -100, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 0.8,
          stagger: 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.faq-item',
            start: 'top 80%',
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);

    const answer = document.querySelector(`#faq-answer-${index}`);
    const icon = document.querySelector(`#faq-icon-${index}`);

    if (openIndex === index) {
      gsap.to(answer, { height: 0, opacity: 0, duration: 0.3, ease: 'power2.inOut' });
      gsap.to(icon, { rotation: 0, duration: 0.3, ease: 'power2.inOut' });
    } else {
      gsap.set(answer, { height: 'auto' });
      gsap.from(answer, { height: 0, duration: 0.3, ease: 'power2.inOut' });
      gsap.to(answer, { opacity: 1, duration: 0.3, ease: 'power2.inOut' });
      gsap.to(icon, { rotation: 180, duration: 0.3, ease: 'power2.inOut' });
    }
  };

  return (
    <section ref={sectionRef} className="py-20 dark:bg-black relative">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 ref={titleRef} className="text-4xl md:text-5xl font-bold text-black dark:white mb-4">
            Frequently Asked
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">
              Questions
            </span>
          </h2>
        </div>

        <div className="space-y-4">
          {Questions.map((faq, index) => (
            <div
              key={faq.id}
              className="faq-item bg-gradient-to-r from-slate-800/50 to-slate-700/30 backdrop-blur-lg border border-slate-600/30 rounded-2xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-8 py-6 text-left flex items-center justify-between hover:bg-slate-700/30 transition-colors duration-300"
              >
                <h3 className="text-lg font-semibold text-white pr-4">{faq.q}</h3>
                <ChevronDown
                  id={`faq-icon-${index}`}
                  className="w-6 h-6 text-emerald-400 flex-shrink-0 transition-transform duration-300"
                />
              </button>

              <div
                id={`faq-answer-${index}`}
                className={`px-8 pb-6 text-gray-300 leading-relaxed ${
                  openIndex === index ? 'block' : 'hidden'
                }`}
              >
                {faq.a}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
