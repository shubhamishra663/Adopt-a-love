import React, { useState } from "react";

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState(null);

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

  const toggleActive = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="bg-yellow-500 dark:bg-black pb-3 pt-3">
      <div className="p-5">
        <p className="text-center text-xl font-bold md:text-3xl text-white">Frequently Asked Questions</p>
      </div>
      <div className="flex flex-col items-center w-full py-4 font-Poppins">
        {Questions.map(({ id, q, a }, index) => (
          <div key={id} className="w-[80%] mb-3">
            <div
              onClick={() => toggleActive(index)}
              className="bg-[#f5f0ff] dark:bg-[#333] border-2 border-[#444] flex justify-between items-center rounded-md cursor-pointer p-3"
            >
              <h1 className="md:text-lg dark:text-white">{q}</h1>
              <h1 className="text-2xl font-medium">
                {activeIndex === index ? "-" : "+"}
              </h1>
            </div>
            {activeIndex === index && (
              <div className="bg-gray-100 dark:bg-[#444] rounded-md p-2 pt-5 pb-5">
                <p className="md:text-sm text-xs md:font-medium dark:text-white">{a}</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQs;
