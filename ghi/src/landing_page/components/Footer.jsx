import React from "react";
import { FaGithub } from "react-icons/fa";
import { AiFillLinkedin } from "react-icons/ai";

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-white to-blue-200">
      <div className="relative overflow-hidden">
        <div className="absolute top-0 bottom-0 left-0 right-0 transform skew-y-6 origin-top-right bg-blue-400"></div>
        <div className="relative container mx-auto px-4 py-10 md:py-16 flex justify-center items-center">
          <div className="w-full max-w-3xl pb-[8rem]">
            <h3 className="text-2xl font-bold text-gray-800 mb-4">
              Team Scrappy
            </h3>
            <p className="text-gray-700 mb-4">
              We are a team of developers who enjoy making cool things.
            </p>
            <p className="text-gray-700 mb-4">
              Check out our GitLab repository to learn more:
            </p>
            <a
              href="https://gitlab.com/team-scrappy/scrum-ptious"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center bg-blue-600 hover:bg-blue-700 px-4 py-2 text-white font-semibold rounded-md"
            >
              <FaGithub className="mr-2" /> GitLab
            </a>
          </div>
        </div>
      </div>
      <div className="bg-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <img
                src={
                  "https://media.licdn.com/dms/image/C4D03AQGZ74ZyBjNh4A/profile-displayphoto-shrink_400_400/0/1517434390303?e=1688601600&v=beta&t=jZUslt16KvzLDdecfGj_t9bN3Bg6l1Q5bumxfeZrxss"
                }
                alt="Kurt Loban"
                className="rounded-full w-24 h-24 mb-4"
              />
              <div className="space-x-2 scale-[2]">
                <a
                  href="https://www.linkedin.com/in/kurtloban/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-block"
                >
                  <AiFillLinkedin />
                </a>
                <a
                  href="https://gitlab.com/SFKLN011"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-block"
                >
                  <FaGithub />
                </a>
              </div>
              <p className="text-gray-700 font-medium mt-2">Kurt Loban</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={
                  "https://ca.slack-edge.com/T04576ARM1D-U04BW2FB6QH-6daba18dc779-512"
                }
                alt="Christian Felix"
                className="rounded-full w-24 h-24 mb-4"
              />
              <div className="space-x-2 scale-[2]">
                <a
                  href="https://www.linkedin.com/in/christianfelix97/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-block"
                >
                  <AiFillLinkedin />
                </a>
                <a
                  href="https://gitlab.com/1christianfelix1"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-block"
                >
                  <FaGithub />
                </a>
              </div>
              <p className="text-gray-700 font-medium mt-2">Christian Felix</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={
                  "https://media.licdn.com/dms/image/D5635AQGZ-UwaQWY5Jw/profile-framedphoto-shrink_400_400/0/1657152859275?e=1683756000&v=beta&t=cQea1hxXj38yeB8ElaKKCQJkGe4Xjt3vRnvmhrRsMJY"
                }
                alt="Brandon Moore"
                className="rounded-full w-24 h-24 mb-4"
              />
              <div className="space-x-2 scale-[2]">
                <a
                  href="https://www.linkedin.com/in/brandon-moore-a055b71b1/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-block"
                >
                  <AiFillLinkedin />
                </a>
                <a
                  href="https://gitlab.com/BMooreC0de"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-block"
                >
                  <FaGithub />
                </a>
              </div>
              <p className="text-gray-700 font-medium mt-2">Brandon Moore</p>
            </div>
            <div className="flex flex-col items-center">
              <img
                src={
                  "https://media.licdn.com/dms/image/C5635AQFclr-UV8gqIA/profile-framedphoto-shrink_400_400/0/1595910381138?e=1683756000&v=beta&t=tDKoBwIOjwN0-XxhNKv62B9M7jP-rAhN2LGVzlbVHQU"
                }
                alt="John Liu"
                className="rounded-full w-24 h-24 mb-4"
              />
              <div className="space-x-2 scale-[2]">
                <a
                  href="https://www.linkedin.com/in/john-chaohui-liu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-block"
                >
                  <AiFillLinkedin />
                </a>
                <a
                  href="https://gitlab.com/zodramleo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline inline-block"
                >
                  <FaGithub />
                </a>
              </div>
              <p className="text-gray-700 font-medium mt-2">John Liu</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-blue-600 py-4">
        <div className="container mx-auto px-4 text-center text-white">
          <p className="text-sm">
            &copy; 2023 Team Scrappy. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
