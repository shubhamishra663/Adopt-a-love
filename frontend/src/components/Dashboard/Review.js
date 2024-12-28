import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Cat from "../../utils/cat.jpg"; // Replace with your actual image path

// Card Component
const Card = ({ name, location, message }) => (
  <div className="relative bg-white dark:bg-gray-200 shadow-lg h-80 w-72 flex flex-col items-center p-6 rounded-2xl   transform transition-transform hover:scale-105 hover:dark:bg-transparent hover:border-t-4 hover:border-b-4 hover:border-red-600">
    {/* Profile Image */}
    <div className="absolute -top-7">
      <img
        className="h-14 w-14 rounded-full border-4 border-red-600 object-cover shadow-md"
        src={Cat}
        alt="Profile"
        loading="lazy"
      />
    </div>
    {/* Content */}
    <div className="mt-14 flex flex-col items-center text-center">
      <p className="text-gray-700 text-lg font-medium leading-relaxed mb-4">
        "{message}"
      </p>
      <p className="text-gray-500 text-sm font-medium">
        <span className="font-bold text-green-500">~ {name}</span>, {location}
      </p>
    </div>
  </div>
);

// Review Component
export default function Review() {
  const cardData = [
    {
      id: 1,
      name: "Shubham Mishra",
      location: "Patna",
      message:
        "Hi, I adopted this cat 'Luci' with the reference of this site, I'm really satisfied.",
    },
    {
      id: 2,
      name: "Kumar",
      location: "Delhi",
      message:
        "Great experience adopting my furry friend! Highly recommend this portal.",
    },
    {
      id: 3,
      name: "Mishra",
      location: "Mumbai",
      message:
        "Smooth process and amazing support. Couldn't be happier with my new pet!",
    },
    {
      id: 4,
      name: "Rahul",
      location: "Bangalore",
      message:
        "Thanks to this portal, I found my perfect companion. Highly recommend it!",
    },
  ];

  const items = cardData.map((item) => (
    <div key={item.id} className="flex justify-center p-14">
      <Card
        name={item.name}
        location={item.location}
        message={item.message}
      />
    </div>
  ));

  const responsive = {
    0: { items: 1 }, // 1 card on small screens
    768: { items: 2 }, // 2 cards on medium screens
    1024: { items: 3 }, // 3 cards on larger screens
  };

  return (
    <div className="w-full py-12 bg-[#f5f5f5] dark:bg-black flex justify-center">
      <div className="w-11/12 lg:w-4/5">
        <AliceCarousel
          mouseTracking
          items={items}
          responsive={responsive}
          infinite
          autoPlay
          autoPlayInterval={3000}
          animationDuration={1000}
          disableButtonsControls
          disableDotsControls={true} // Set to `true` if you want to hide dots
        />
      </div>
    </div>
  );
}
