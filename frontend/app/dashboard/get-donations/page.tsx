"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import veg from "@/components/assets/login.jpg";
import nonVeg from "@/components/assets/register.jpg";

interface DonationItem {
  item_name: string;
  quantity: number;
}

interface Donation {
  donation_id: number;
  donor_name: string;
  email: string;
  phone_number: string;
  collection_address: string;
  category: string;
  description: string;
  created_at: string;
  items: DonationItem[];
}

export default function GetDonations() {
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedDonation, setExpandedDonation] = useState<number | null>(null);

  const apiUrl = "http://localhost:8080/api";

  useEffect(() => {
    const fetchDonations = async () => {
      try {
        const response = await fetch(`${apiUrl}/donations/all-donations`);
        const data = await response.json();
        if (data.message === "Donations fetched successfully") {
          setDonations(data.donations);
        }
      } catch (error) {
        console.error("Error fetching donations:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchDonations();
  }, []);

  const toggleExpand = (donationId: number) => {
    setExpandedDonation(expandedDonation === donationId ? null : donationId);
  };

  if (loading) {
    return <div className="text-center py-8">Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Available Donations</h1>
      {donations.length === 0 ? (
        <p className="text-center text-gray-600">No donations available at the moment.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {donations.map((donation) => (
            <div key={donation.donation_id} className="bg-white rounded-2xl shadow-md overflow-hidden w-full flex flex-col">
              <div className="relative h-40">
                <Image
                  src={donation.category === 'veg' ? veg.src : nonVeg.src}
                  alt={donation.category}
                  fill
                  objectFit="cover"
                />
                <div className={`absolute -bottom-5 right-5 rounded-full p-2 shadow-md text-white ${
  donation.category === 'non-veg' ? 'bg-red-500' : 'bg-green-500'
}`}>
                  <h1 className="text-xl font-bold">{donation.category}</h1>
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl font-semibold">{donation.donor_name}</h2>
                  <span className="text-sm text-gray-500">
                    {new Date(donation.created_at).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex-grow">
                  {expandedDonation === donation.donation_id ? (
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Donation Items:</h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                        {donation.items.map((item, index) => (
                          <div key={index} className="bg-gray-100 p-3 rounded">
                            <p className="text-gray-600 text-sm"><strong>{item.item_name}</strong></p>
                            <p className="text-gray-800">Quantity: {item.quantity}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                      {/* <div className="bg-gray-100 p-3 rounded">
                        <p className="text-gray-600 text-sm"><strong>Email:</strong></p>
                        <p className="text-gray-800">{donation.email}</p>
                      </div> */}
                      <div className="bg-gray-100 p-3 rounded col-span-full">
                        <p className="text-gray-600 text-sm"><strong>Phone:</strong></p>
                        <p className="text-gray-800">{`+91`} {donation.phone_number}</p>
                      </div>
                      <div className="bg-gray-100 p-3 rounded col-span-full">
                        <p className="text-gray-600 text-sm"><strong>Address:</strong></p>
                        <p className="text-gray-800">{donation.collection_address}</p>
                      </div>
                      <div className="bg-gray-100 p-3 rounded col-span-full">
                        <p className="text-gray-600 text-sm"><strong>Description:</strong></p>
                        <p className="text-gray-800">{donation.description}</p>
                      </div>
                    </div>
                  )}
                </div>
                <button
                  onClick={() => toggleExpand(donation.donation_id)}
                  className={`w-full ${
                    expandedDonation === donation.donation_id
                      ? "bg-blue-500 hover:bg-blue-600"
                      : "bg-green-500 hover:bg-green-600"
                  } text-white px-4 py-2 rounded transition-colors`}
                >
                  {expandedDonation === donation.donation_id ? "Contact" : "View Items"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}