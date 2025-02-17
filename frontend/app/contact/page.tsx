"use client"

import React, { useState } from 'react';
import Image from 'next/image';
import contactImage from '@/components/assets/login.jpg'; 

interface ContactFormData {
  name: string;
  email: string;
  message: string;
}

const ContactUs: React.FC = () => {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Log the form data (you can remove this in production)
    console.log('Form submitted:', formData);
    // Show an alert
    alert('Query submitted successfully!');
    // Reset the form
    setFormData({ name: '', email: '', message: '' });
  };

  return (
    <div className="flex justify-center items-center h-screen w-full pt-16">
      <div className="flex w-full h-full md:w-[95vw] lg:w-[75vw] md:h-[80vh] md:rounded-xl md:overflow-hidden md:shadow-xl">
        <div className="w-1/2 md:flex flex-col justify-center items-center hidden">
          <Image
            src={contactImage}
            alt="Contact Us"
            height={400}
            width={400}
            className="h-full w-full object-cover"
          />
        </div>
        <div className="md:w-1/2 flex justify-center items-center bg-[#a0ca82] w-full">
          <div className="md:bg-[#ffffff20] md:backdrop-blur-xl rounded-lg md:shadow-lg md:p-8 md:w-96 w-72">
            <h1 className="text-2xl font-bold mb-6 text-center">Contact Us</h1>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
                />
              </div>
              <div className="mb-6">
                <label
                  htmlFor="message"
                  className="block text-gray-700 text-sm font-semibold mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-green-500"
                  required
                ></textarea>
              </div>
              <button
                type="submit"
                className="w-full bg-[#2c5048] text-white font-bold py-2 px-4 rounded-md hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactUs;