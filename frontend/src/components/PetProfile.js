// PetProfile.js
import React, { useContext, useEffect, useState } from "react";
import { useLocation, Link, useParams } from "react-router-dom";
import { AuthContext } from "../context/authContext";
import petPlaceholderImage from "../utils/cat.jpg";
import { Helmet } from "react-helmet";
import { gsap, Expo } from "gsap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHourglassStart,
  faRulerCombined,
  faDog,
  faBolt,
  faPaw,
  faSyringe,
} from "@fortawesome/free-solid-svg-icons";
import { faWhatsapp } from "@fortawesome/free-brands-svg-icons";
import axios from "axios";
import SocialShare from "./SocialShare";

const mobileNumber = process.env.REACT_APP_MOBILE_NO || "+919060823275";

const approachMessage = (name, petName) => {
  console.log(`name: ${name}`);
  
  return `Hi%20${name}!%20👋%20I%20saw%20${petName}%20on%20the%20adoption%20portal,%20and%20I’m%20really%20interested!%20They%20seem%20like%20such%20a%20great%20pet,%20and%20I'd%20love%20to%20know%20a%20bit%20more%20about%20them.%20Could%20we%20chat%20for%20a%20bit%20about%20their%20personality%20and%20any%20specific%20needs?%20Thanks%20so%20much!`;
};

const Share = ({ pet }) => {
  return (
    <div className="absolute p-2 right-0 top-1/4">
      <SocialShare pet={pet} />
    </div>
  );
};

export default function PetProfile() {
  const location = useLocation();
  const { petid } = useParams(); // Destructure petid from useParams

  // const petData = location.state;
  console.log(`useParams petid: ${petid}`); // Log the petid

  const { isAuthenticated } = useContext(AuthContext);
  const [pet, setPet] = useState();
  const [counter, setCounter] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  // useEffect(() => {
  //   setPet(petData)
  // }, [])

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        console.log("fetching");

        const isLostPet = location.pathname.includes("lostpetprofile"); // Check if the route is for lost pets
        const url = `https://adopt-a-love-backend.vercel.app/${
          isLostPet ? "lostpetprofile" : "petprofile"
        }/${petid}`;

        console.log(`Fetching ${isLostPet ? "lost pet" : "pet"} profile`);
        const response = await axios.get(url);
        setPet(response.data);
        console.log(`Profile data:`, response.data);
      } catch (error) {
        console.error(
          "Error fetching profile data:",
          error.response?.data || error.message
        );
      }
    };

    fetchPetData();
  }, [petid, location.pathname]); // Refetch if petid or route changes

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCounter((prev) => {
        if (prev < 100) return prev + 1;
        clearInterval(intervalId);
        setLoadingComplete(true);
        return 100;
      });
    }, 25);

    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    if (loadingComplete) {
      gsap
        .timeline()
        .to(".loader", { height: "100%", duration: 1.2, ease: Expo.easeInOut })
        .to(".count", { display: "none" })
        .to(".content", { opacity: 1, duration: 0 });
    }
  }, [loadingComplete]);

  const facts = [
    { icon: faPaw, label: "Breed", value: pet?.breed || "Unknown" },
    {
      icon: faHourglassStart,
      label: "Age",
      value: pet?.age ? `${pet.age} yrs` : "Unknown",
    },
    {
      icon: faRulerCombined,
      additionalIcon: faDog,
      label: "Size",
      value: pet?.size || "Unknown",
    },
    { icon: faBolt, label: "Energy", value: pet?.energy || "Unknown" },
    {
      icon: faSyringe,
      label: "Vaccine",
      value: pet?.vaccinated ? "Vaccinated" : "Not Vaccinated" || "Unknown",
    },
  ];

  const currentURL = `${window.location.origin}${location.pathname}${location.search}${location.hash}`;
  const facebookShareURL = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
    currentURL
  )}`;

  const date = pet?.updatedAt;
  let formattedDate;
  if (date) {
    formattedDate = new Date(date).toLocaleString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
    });

    console.log(formattedDate);
  } else {
    console.log("Date not available.");
  }

  return (
    <div className="bg-[#f5f0ff] dark:bg-black flex flex-col dark:text-white">
      <header className="bg-purple-600 flex justify-between px-2 md:px-10 p-3">
        <p className="font-semibold text-2xl">
          {!pet ? "Loading..." : pet?.type === "pet" ? "Adopt" : "Help"}{" "}
          {pet?.petName}{" "}
        </p>
        <p className="text-blue-400 text-sm w-2/4 md:w-fit">{formattedDate}</p>
      </header>

      {/* Pet image */}
      <section className="dark:bg-black w-full h-[60%] flex items-center justify-center p-1 md:p-14">
        <div className="bg-gray-600 h-96 w-full md:w-1/2 relative rounded-lg overflow-hidden shadow-lg">
          <div className="loading-bar bg-[#f5f5f5] dark:bg-[#121212] h-full w-full flex flex-col justify-center items-center absolute top-0 transition-all duration-700">
            <div
              className="loader absolute left-0 h-[4px] bg-green-500"
              style={{ width: `${counter}%` }}
            ></div>
            <div className="count absolute text-xl font-bold">{counter}%</div>
          </div>
          <div className="content absolute top-0 left-0 w-full h-full flex justify-center items-center opacity-0 transition-opacity duration-700">
            <img
              src={pet?.image || petPlaceholderImage}
              alt="Pet"
              className="rounded-lg w-full h-full object-center"
            />
          </div>
        </div>
      </section>

      <section className="">
        <div className="">
          <div>
            <p className="font-bold text-3xl p-3">About Myself</p>
          </div>
          <div className="py-3 px-8 text-lg ">
            <p className="font-xl font-bold">
              {pet?.petName} ({pet?.breed})
            </p>

            <p>
              Species : <span>{pet?.species}</span>
            </p>
            <p>
              Color : <span>{pet?.color}</span>
            </p>
            <p>
              Gender : <span>{pet?.gender}</span>
            </p>
            <p>
              Weight : <span>{pet?.weight} kg</span>
            </p>
          </div>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="">
        <p className="font-bold text-3xl p-3">Quick facts</p>
        <div className="flex justify-between p-1 md:p-3 flex-wrap gap-5">
          {facts.map(({ icon, additionalIcon, label, value }, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-500 h-28 w-[47%] md:h-32 md:w-60 gap-3 rounded-lg shadow-xl p-3"
            >
              <div className="flex flex-col items-center w-16 md:w-24">
                <div className="bg-gray-400 h-12 w-12 md:w-16 md:h-16 rounded-full flex items-center justify-center">
                  <FontAwesomeIcon icon={icon} className="h-6 text-gray-800" />
                  {additionalIcon && (
                    <FontAwesomeIcon
                      icon={additionalIcon}
                      className="h-5 text-gray-800"
                    />
                  )}
                </div>
                <p className="text-center text-sm md:text-base mt-1">{label}</p>
              </div>
              <div className="font-bold text-lg md:text-xl flex-grow text-center">
                {value}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Message */}
      <section>
        <div className="p-3  md:p-5">
          <p className="font-bold text-3xl">Message</p>
          <p className="p-5 font-light  text-lg">{pet?.description}</p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="p-3 md:p-5 ">
        <div className="border-2 border-gray-500 p-5 rounded-md dark:text-white">
          <div className="dark:text-white">
            <p className="text-3xl font-bold">Contact Info</p>
          </div>
          <div className="p-3 md:p-5 leading-5">
            <p className="text-lg w-fit">
              <span className="font-medium text-xl">Name</span>{" "}
              {pet?.ownerName || "Shubham Mishra"}
            </p>
            <p className="text-lg w-fit">
              <span className="font-medium text-xl">Address</span>{" "}
              {`${pet?.city || "Unknown"}, ${pet?.state || "Unknown"}`}
            </p>
            <div className="flex gap-8 flex-wrap">
              <p className="text-lg w-fit">
                <span className="font-medium text-xl">Phone </span>
                {isAuthenticated ? (
                  pet?.mobileNo || "not found"
                ) : (
                  <Link
                    to="/login"
                    state={{ from: location }}
                    className="bg-blue-500 font-semibold"
                  >
                    See Now
                  </Link>
                )}
              </p>
              <p className="text-lg w-fit">
                <span className="font-medium text-xl">Email</span>{" "}
                {pet?.email || "not found"}
              </p>
            </div>
            <a
              aria-label="Chat on WhatsApp"
              href={`https://wa.me/${pet?.mobileNo}/?text=${approachMessage(
                pet?.ownerName,
                pet?.petName
              )}`}
              className="flex  items-center gap-3"
            >
              <FontAwesomeIcon
                icon={faWhatsapp}
                className="text-[#25d366] text-xl"
              />
              <p>Chat with {pet?.petName}'s owner</p>
            </a>

            {/* <div>
              <Helmet>
                <title>{pet?.name || "Pet Profile"}</title>
                <meta
                  property="og:title"
                  content={`Adopt ${pet?.name || "Pet"}`}
                />
                <meta
                  property="og:description"
                  content={`Meet ${
                    pet?.name || "this lovely pet"
                  } available for adoption!`}
                />
                <meta
                  property="og:image"
                  content={pet?.image || petPlaceholderImage}
                />
                <meta property="og:url" content={window.location.href} />
                <meta property="og:type" content="website" />
              </Helmet>
            </div> */}
          </div>
        </div>
      </section>

      <Share pet={pet} />
    </div>
  );
}
