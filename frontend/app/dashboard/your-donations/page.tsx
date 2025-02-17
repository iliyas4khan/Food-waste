"use client";

import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import veg from "@/components/assets/login.jpg";
import nonVeg from "@/components/assets/register.jpg";
import Image from "next/image";

interface Donation {
  id: number;
  donor_name: string;
  email: string;
  phone_number: string;
  collection_address: string;
  category: string;
  description: string;
  created_at: string;
}

export default function YourDonations() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useUser();

  // const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const apiUrl = "http://localhost:8080/api";

  useEffect(() => {
    const fetchDonations = async () => {
      if (user?.id) {
        try {
          const response = await fetch(
            `${apiUrl}/donations/my-donations/${user.id}`
          );
          const data = await response.json();
          if (data.message === "Donations fetched successfully") {
            setDonations(data.donations);
          }
        } catch (error) {
          console.error("Error fetching donations:", error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDonations();
  }, [user]);

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
    <h1 className="text-3xl font-bold mb-6">Your Donations</h1>
    {donations.length === 0 ? (
      <p className="text-center text-gray-600">You haven't made any donations yet.</p>
    ) : (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {donations.map((donation) => (
          <div key={donation.id} className="bg-white rounded-2xl shadow-md overflow-hidden w-full">
            <div className="relative h-40">
            <Image
                src={donation.category === 'veg' ? veg.src : nonVeg.src}
                alt={donation.category}
                fill
                objectFit="cover"
              />
              <div className="absolute -bottom-5 right-5 bg-white rounded-full p-2 shadow-md">
               <h1 className="text-xl font-bold">{donation.category}</h1>
              </div>
            </div>
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold">{donation.donor_name}</h2>
                <span className="text-sm text-gray-500">
                  {new Date(donation.created_at).toLocaleDateString()}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-100 p-3 rounded">
                  <p className="text-gray-600 text-sm"><strong>Email:</strong></p>
                  <p className="text-gray-800">{donation.email}</p>
                </div>
                <div className="bg-gray-100 p-3 rounded">
                  <p className="text-gray-600 text-sm"><strong>Phone:</strong></p>
                  <p className="text-gray-800">{donation.phone_number}</p>
                </div>
                <div className="bg-gray-100 p-3 rounded col-span-2">
                  <p className="text-gray-600 text-sm"><strong>Address:</strong></p>
                  <p className="text-gray-800">{donation.collection_address}</p>
                </div>
                <div className="bg-gray-100 p-3 rounded col-span-2">
                  <p className="text-gray-600 text-sm"><strong>Description:</strong></p>
                  <p className="text-gray-800">{donation.description}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>
  );
}
