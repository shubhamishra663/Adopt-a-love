import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faFacebook } from "@fortawesome/free-brands-svg-icons";

function Footer() {
  return (
    <div className="pt-5 pb-5 flex bg-[#18273C] dark:bg-[#040c18] text-white justify-around font-Poppins font-[200] flex-wrap">
      {/* Quick Links Section */}
      <div className="mb-4 md:mb-0">
        <h1 className="pt-3 pb-2 font-Poppins font-normal  text-lg">
          Quick Links
        </h1>
        <ul>
          <li>
            <a href="/" className="hover:underline">
              Home
            </a>
          </li>
          <li>
            <a href="/adopt" className="hover:underline">
              Adopt a Pet
            </a>
          </li>
          <li>
            <a href="#foster" className="hover:underline">
              Foster a Pet
            </a>
          </li>
          <li>
            <a href="#donate" className="hover:underline">
              Donate
            </a>
          </li>
          <li>
            <a href="/faq" className="hover:underline">
              FAQs
            </a>
          </li>
        </ul>
      </div>

      {/* Contacts Section */}
      <div className="mb-4 md:mb-0">
        <h1 className="pt-3 pb-2 font-Poppins font-normal text-lg">Contacts</h1>
        <ul>
          <li>
            Email:{" "}
            <a
              href="mailto:adoptalove@yahoo.com"
              className="hover:underline"
            >
              adoptalove@yahoo.com
            </a>
          </li>
          <li>
            Phone:{" "}
            <a href="tel:+919876543210" className="hover:underline">
              +91 9876543210
            </a>
          </li>
          <li>Address: Patna, Bihar, 801105</li>
          <li>Business Hours: 9 AM - 6 PM</li>
        </ul>
      </div>

      {/* Policy Section */}
      <div className="mb-4 md:mb-0">
        <h1 className="pt-3 pb-2 font-Poppins font-normal text-lg">Policy</h1>
        <ul>
          <li>
            <a href="#privacy-policy" className="hover:underline">
              Privacy Policy
            </a>
          </li>
          <li>
            <a href="#refund-policy" className="hover:underline">
              Refund Policy
            </a>
          </li>
          <li>
            <a href="#cancellation-policy" className="hover:underline">
              Cancellation Policy
            </a>
          </li>
          <li>
            <a href="#terms-conditions" className="hover:underline">
              Terms and Conditions
            </a>
          </li>
        </ul>
      </div>

      {/* Support and Follow Us Section */}
      <div className="flex flex-col items-start">
        <h1 className="pt-3 pb-2 font-Poppins font-normal text-lg">
          Support Us
        </h1>
        <h1 className="pt-3 pb-2 font-Poppins font-[100] text-lg">Follow Us</h1>
        <div className="flex gap-4">
          <FontAwesomeIcon
            icon={faInstagram}
            size="lg"
            className="text-white hover:text-[#E4405F]"
          />
          <a
            href="https://www.facebook.com/shubhamishra663"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon
              icon={faFacebook}
              size="lg"
              className="text-white hover:text-[#1877F2]"
            />
          </a>
        </div>
      </div>
    </div>
  );
}

export default Footer;
