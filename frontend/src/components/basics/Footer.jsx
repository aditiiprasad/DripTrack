import React from "react";
import logo from "./assets/logo.png";

const Footer = () => {
  return (
    <footer className="bg-zinc-800 h-auto flex flex-col text-white py-8 px-4">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center">
      
        <div className="mb-6 md:mb-0">
          <img
            src={logo}
            alt="DripTrack Logo"
            className="h-32 md:h-44 transform rotate-6 mx-auto md:mx-0"
          />
        </div>

        <div className="flex flex-col font-extrabold md:flex-row space-y-6 md:space-y-0 md:space-x-16 text-center md:text-left">
          {/* Social Links */}
          <div>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.linkedin.com/in/aditiiprasad/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline hover:text-custom-pink"
                >
                  LinkedIn
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/aditiiprasad"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline hover:text-custom-pink"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://leetcode.com/u/aditiiprasad/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline hover:text-custom-pink"
                >
                  LeetCode
                </a>
              </li>
            </ul>
          </div>

          {/* Other Links */}
          <div>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://github.com/aditiiprasad/DripTrack"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline hover:text-custom-pink"
                >
                  Source Code
                </a>
              </li>
              <li>
                <a
                  href="https://drive.google.com/file/d/1OHYxSqpoLQldASjrWlkpdA4ZpoV89Rsh/view?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="no-underline hover:text-custom-pink"
                >
                  Resume
                </a>
              </li>
              <li>
                <a
                  href="mailto:aditi03prasad@gmail.com"
                  className="no-underline hover:text-custom-pink"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Tagline and Copyright */}
      <div className="mt-6 text-center text-sm font-medium">
        <p className="text-custom-pink">See What You Own, </p>
        <p className="text-custom-blue">Wear What You Love,</p>
        <p className="text-custom-pink">Organize with Ease, </p>
        <p className="text-custom-blue"> Waste Less,</p>
        <p className="text-custom-pink"> Live Sustainably.</p>

        <p className="mt-2">&copy; {new Date().getFullYear()} DripTrack. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
