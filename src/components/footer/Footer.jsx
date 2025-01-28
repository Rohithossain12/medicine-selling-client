import React from "react";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      
          <div className="space-y-4">
            <h4 className="text-lg font-bold">Company</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white"> About Us</li>
              <li className="hover:text-white">Contact</li>
              <li className="hover:text-white"> Careers</li>
              <li className="hover:text-white"> Press</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-bold">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="hover:text-white"> Shop</li>
              <li className="hover:text-white"> Categories</li>
              <li className="hover:text-white"> Offers</li>
              <li className="hover:text-white"> FAQs</li>
            </ul>
          </div>

          
          <div className="space-y-4">
            <h4 className="text-lg font-bold">Contact</h4>
            <ul className="space-y-2 text-gray-400">
              <li className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 10h1a2 2 0 002-2V4a2 2 0 00-2-2H3a2 2 0 00-2 2v4a2 2 0 002 2zM19 10h1a2 2 0 002-2V4a2 2 0 00-2-2h-1a2 2 0 00-2 2v4a2 2 0 002 2z"
                  ></path>
                </svg>
                <span>support@example.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 4H3a1 1 0 00-1 1v14a1 1 0 001 1h18a1 1 0 001-1V5a1 1 0 00-1-1z"
                  ></path>
                </svg>
                <span>+1 234 567 890</span>
              </li>
              <li className="flex items-center space-x-2">
                <svg
                  className="w-5 h-5 text-gray-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  ></path>
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M16 12v4l4-4-4-4v4H8"
                  ></path>
                </svg>
                <span>123 Medicine St, Health City, HC 45678</span>
              </li>
            </ul>
          </div>
        </div>

        
        <div className="mt-8 flex justify-center space-x-4">
          <p className="text-gray-400 hover:text-white">
            <FaFacebook size={24} />
          </p>
          <p className="text-gray-400 hover:text-white">
            <FaTwitter size={24} />
          </p>
          <p className="text-gray-400 hover:text-white">
            <FaInstagram size={24} />
          </p>
          <p className="text-gray-400 hover:text-white">
            <FaYoutube size={24} />
          </p>
        </div>

        <div className="mt-8 border-t border-gray-700 pt-4 text-center text-gray-400 text-sm">
          <p>&copy; 2025 PharmaWorld. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
