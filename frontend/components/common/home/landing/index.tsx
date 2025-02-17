import React from 'react';
import Image from 'next/image';
import { LANDING_CONTENT } from '@/constants';
import { FaArrowRight, FaUsers, FaLightbulb, FaRocket, FaHeart } from 'react-icons/fa';
import loginImage from "@/components/assets/login.jpg";
import teamImage from "@/components/assets/register.jpg";
const Landing: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-100">
      <header className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24 lg:py-32">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-gray-900 leading-tight">
          We help online businesses<br />
          grow. <span className="text-purple-600 animate-pulse">Together.</span>
        </h1>
        <p className="text-xl text-gray-600 mb-8 max-w-2xl">
          Empowering your business with innovative solutions and expert guidance to achieve sustainable growth in the digital landscape.
        </p>
        <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
          See Open Roles <FaArrowRight className="inline-block ml-2" />
        </button>
      </header>

      <main>
        <section className="bg-gray-900 text-white rounded-t-3xl p-8 sm:p-12 lg:p-16">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center">Our Culture</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="col-span-2">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                {LANDING_CONTENT.cultureItems.map((item, index) => (
                  <div key={index} className="flex items-start bg-gray-800 p-6 rounded-lg transition duration-300 ease-in-out transform hover:scale-105">
                    <div className="bg-green-500 p-3 rounded-full mr-4">
                      {index === 0 && <FaUsers className="text-xl" />}
                      {index === 1 && <FaLightbulb className="text-xl" />}
                      {index === 2 && <FaRocket className="text-xl" />}
                      {index === 3 && <FaHeart className="text-xl" />}
                    </div>
                    <div>
                      <h3 className="font-semibold text-xl mb-2">{item.title}</h3>
                      <p className="text-gray-300">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button className="bg-green-500 hover:bg-green-600 text-white font-semibold py-3 px-8 rounded-full mt-12 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50">
                Join Our Team <FaArrowRight className="inline-block ml-2" />
              </button>
            </div>
            <div className="hidden md:block">
              <Image
                src={loginImage}
                alt="Team culture"
                width={400}
                height={400}
                className="rounded-lg object-cover h-full w-full"
              />
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 sm:px-6 lg:px-8 py-16 sm:py-24">
          <h2 className="text-3xl sm:text-4xl font-bold mb-12 text-center text-gray-900">Our Teams</h2>
          <div className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0 md:space-x-12">
            <div className="w-full md:w-1/2">
              <h3 className="text-2xl font-bold mb-4 text-gray-800">Product, Design & Development</h3>
              <p className="text-gray-600 mb-6">
                We build and deliver talent and people programs to invest, develop, and grow our employees. Our goal is to make Refersion a place that provides a long-term, stable, and gratifying career journey for all team members.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Collaborative work environment</li>
                <li>Cutting-edge technologies</li>
                <li>Continuous learning and growth</li>
                <li>Impactful projects</li>
              </ul>
            </div>
            <div className="w-full md:w-1/2">
              <Image
                src={teamImage}
                alt="Product, Design & Development team"
                width={600}
                height={400}
                className="rounded-lg shadow-lg object-cover w-full h-64 sm:h-80"
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Landing;