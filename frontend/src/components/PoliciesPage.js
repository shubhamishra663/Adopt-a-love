import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet';

const PoliciesPage = () => {
  const location = useLocation();

  // Handle anchor navigation
  useEffect(() => {
    const scrollToSection = () => {
      if (location.hash) {
        const element = document.getElementById(location.hash.substring(1));
        if (element) {
          // Small timeout to ensure DOM is ready
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth' });
            // Add focus for accessibility
            element.setAttribute('tabIndex', '-1');
            element.focus();
          }, 100);
        }
      } else {
        // Scroll to top if no hash
        window.scrollTo(0, 0);
      }
    };

    scrollToSection();
  }, [location]);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <Helmet>
        <title>Adopt-a-Love - Policies</title>
        <meta name="description" content="Our privacy, refund, cancellation policies and terms of service" />
      </Helmet>

      <h1 className="text-3xl font-bold text-center text-blue-800 mb-8">Adopt-a-Love Policies</h1>

      <div className="mb-6 flex flex-wrap gap-2 justify-center">
        <a href="#privacy-policy" className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition">
          Privacy Policy
        </a>
        <a href="#refund-policy" className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition">
          Refund Policy
        </a>
        <a href="#cancellation-policy" className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition">
          Cancellation Policy
        </a>
        <a href="#terms" className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full hover:bg-blue-200 transition">
          Terms & Conditions
        </a>
      </div>

      <div className="space-y-12">
        {/* Privacy Policy Section */}
        <section id="privacy-policy" className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Privacy Policy</h2>
          <p className="mb-4 text-gray-600">Last Updated: {new Date().toLocaleDateString('en-IN')}</p>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium text-blue-600 mb-2">1. Information We Collect</h3>
              <p className="text-gray-700">We collect personal information when you register on our platform, including:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2 text-gray-700">
                <li>Name, email address, and contact details</li>
                <li>Demographic information (age, gender, location)</li>
                <li>Pet preferences and adoption history</li>
                <li>Payment information for donations (processed securely via Razorpay/PayU)</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-blue-600 mb-2">2. How We Use Your Information</h3>
              <p className="text-gray-700">Under the Information Technology Act, 2000 and Rules thereunder, we use your data to:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2 text-gray-700">
                <li>Process adoption applications</li>
                <li>Improve our services</li>
                <li>Send updates about pets and adoption events</li>
                <li>Comply with legal requirements</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-blue-600 mb-2">3. Data Protection</h3>
              <p className="text-gray-700">We implement reasonable security practices as required by Indian law to protect your personal information.</p>
            </div>
          </div>
        </section>

        {/* Refund Policy Section */}
        <section id="refund-policy" className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Refund Policy</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium text-blue-600 mb-2">1. Donations</h3>
              <p className="text-gray-700">As per Indian tax laws and RBI guidelines:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2 text-gray-700">
                <li>Donations to registered NGOs through our platform are generally non-refundable</li>
                <li>In case of duplicate or erroneous transactions, refund requests must be made within 7 days</li>
                <li>Refunds will be processed within 14 working days as per RBI guidelines</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-blue-600 mb-2">2. Adoption Fees</h3>
              <p className="text-gray-700">Refunds for adoption fees are handled as per Indian consumer protection laws:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2 text-gray-700">
                <li>If an adoption falls through before completion, 80% refund will be processed within 10 working days</li>
                <li>No refunds after successful adoption except in cases of fraud</li>
                <li>All refunds are subject to verification by our team</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Cancellation Policy Section */}
        <section id="cancellation-policy" className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Cancellation Policy</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium text-blue-600 mb-2">1. Adoption Applications</h3>
              <p className="text-gray-700">As per Indian Contract Act, 1872, you may cancel your adoption application:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2 text-gray-700">
                <li>Before approval: Full cancellation possible without charges</li>
                <li>After approval but before meeting the pet: 50% of fees retained as processing charges</li>
                <li>After meeting the pet: No cancellation allowed except in exceptional circumstances</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-blue-600 mb-2">2. Events and Services</h3>
              <p className="text-gray-700">Cancellation of paid events/services as per Indian consumer laws:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2 text-gray-700">
                <li>More than 7 days before: Full refund within 5 working days</li>
                <li>3-7 days before: 50% refund within 7 working days</li>
                <li>Less than 3 days: No refund but transfer to another event may be possible</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-blue-600 mb-2">3. How to Cancel</h3>
              <p className="text-gray-700">To cancel any service:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2 text-gray-700">
                <li>Email us at cancellations@adoptalove.in with your request</li>
                <li>Include your registered mobile number for verification</li>
                <li>Cancellation will be confirmed within 24 working hours</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Terms and Conditions Section */}
        <section id="terms" className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-2xl font-semibold text-blue-700 mb-4">Terms and Conditions</h2>
          
          <div className="space-y-6">
            <div>
              <h3 className="text-xl font-medium text-blue-600 mb-2">1. General Terms</h3>
              <p className="text-gray-700">By using Adopt-a-Love, you agree to:</p>
              <ul className="list-disc pl-6 space-y-1 mt-2 text-gray-700">
                <li>Provide accurate information as per Indian legal requirements</li>
                <li>Not use the platform for illegal activities under Indian law</li>
                <li>Comply with all animal welfare laws including the Prevention of Cruelty to Animals Act, 1960</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-blue-600 mb-2">2. Adoption Process</h3>
              <ul className="list-disc pl-6 space-y-1 mt-2 text-gray-700">
                <li>All adoptions subject to home checks and verification</li>
                <li>Adopters must be 21+ years as per Indian contract law</li>
                <li>No commercial breeding of adopted pets allowed</li>
                <li>Adoption fees are non-negotiable and include vaccinations as per Indian animal welfare standards</li>
              </ul>
            </div>

            <div>
              <h3 className="text-xl font-medium text-blue-600 mb-2">3. Governing Law</h3>
              <p className="text-gray-700">These terms shall be governed by and construed in accordance with the laws of India. Any disputes shall be subject to the exclusive jurisdiction of the courts in Mumbai, Maharashtra.</p>
            </div>
          </div>
        </section>
      </div>

      <div className="mt-12 text-center">
        <Link 
          to="/contactus" 
          className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
        >
          Contact Us for Policy Questions
        </Link>
      </div>
    </div>
  );
};

export default PoliciesPage;