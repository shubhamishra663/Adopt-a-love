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

const mobileNumber = process.env.REACT_APP_MOBILE_NO || "+919060823275";

export default function PetProfile() {
  const location = useLocation();
  const { petid } = useParams(); // Destructure petid from useParams
  console.log(`useParams petid: ${petid}`); // Log the petid

  const { isAuthenticated } = useContext(AuthContext);
  const [pet, setPet] = useState();
  const [counter, setCounter] = useState(0);
  const [loadingComplete, setLoadingComplete] = useState(false);

  useEffect(() => {
    const fetchPetData = async () => {
      try {
        console.log("Fetching pet profile");

        const response = await axios.get(
          `http://localhost:5000/petprofile/${petid}`
        ); // Use petid in the request
        setPet(response.data);
        console.log(`Pet profile data:`, response.data);
      } catch (error) {
        console.error(
          "Error fetching pet data:",
          error.response?.data || error.message
        );
      }
    };

    fetchPetData();
  }, [petid]); // Fetch data when petid changes

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

  return (
    <div className="bg-gray-800 flex flex-col text-white">
      <header className="bg-purple-600 flex justify-between px-2 md:px-10 p-3">
        <p className="font-semibold text-2xl">
          Adopt {pet?.petName || "Kitty"}
        </p>
        <p className="text-blue-400 text-sm">{pet?.updatedAt}</p>
      </header>

      {/* Pet image */}
      <section className="bg-black h-[60%] flex items-center justify-center p-5 md:p-14">
        <div className="bg-gray-600 h-96 w-11/12 md:w-1/2 relative rounded-lg overflow-hidden shadow-lg">
          <div className="loading-bar bg-[#121212] h-full w-full flex flex-col justify-center items-center absolute top-0 transition-all duration-700">
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
              className="rounded-lg w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      <section className="bg-black">
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
      <section className="bg-black">
        <p className="font-bold text-3xl p-3">Quick facts</p>
        <div className="flex justify-evenly p-1 md:p-3 flex-wrap gap-5">
          {facts.map(({ icon, additionalIcon, label, value }, index) => (
            <div
              key={index}
              className="flex items-center bg-gray-500 h-28 w-40 md:h-32 md:w-60 gap-3 rounded-lg shadow-xl p-3"
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

      {/* Contact Info */}
      <section className="p-3 md:p-5 bg-black">
        <div className="bg-[#0d0d0d] border-2 border-gray-500 p-5 rounded-md">
          <div>
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
              href={`https://wa.me/${pet?.mobileNo}/?text=hello:${currentURL}`}
              className="flex  items-center gap-3"
            >
              <FontAwesomeIcon
                icon={faWhatsapp}
                className="text-[#25d366] text-xl"
              />
              <p>Chat with {pet?.petName}'s owner</p>
            </a>
            <div>
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
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
