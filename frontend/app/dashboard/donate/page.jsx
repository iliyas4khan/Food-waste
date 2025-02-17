"use client";
import { useState, useEffect } from "react";
import { useUser } from "@/context/UserContext";
import { CiCirclePlus, CiCircleMinus } from "react-icons/ci";


export default function DonatePage() {
      const { user } = useUser();
    //   const apiUrl = process.env.NEXT_PUBLIC_API_URL;
      const apiUrl = "http://localhost:8080/api";

    // const user = {
    //     id: "sample123",
    //     name: "John Doe",
    //     email: "john@example.com",
    //     phone_number: "1234567890"
    // };
    // Log user data to check if it's being set correctly
    useEffect(() => {
        console.log("User data in DonatePage:", user);
    }, [user]);

    // Check if user is null and handle accordingly
    if (!user) {
        return <div>Please log in to donate.</div>; // Or redirect to login page
    }

    const [category, setCategory] = useState("");
    const [description, setDescription] = useState("");
    const [collectionAddress, setCollectionAddress] = useState("");
    const [items, setItems] = useState([{ item_name: "", quantity: 0 }]);

    const handleAddItem = () => {
        setItems([...items, { item_name: "", quantity: 0 }]);
    };

    const handleItemChange = (index, field, value) => {
        const newItems = [...items];
        newItems[index][field] = value;
        setItems(newItems);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const payload = {
          donor_name: user.name,
          email: user.email,
          phone_number: user.phone_number,
          user_id: user.id,
          collection_address: collectionAddress,
          category,
          description,
          items: items.filter((item) => item.item_name && item.quantity),
        };
    
        console.log("Submitting payload:", payload);
    
        try {
          const response = await fetch(
            `${apiUrl}/donations/donate`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify(payload),
            }
          );
          
          if (response.ok) {
            const responseData = await response.json();
            console.log("Response data:", responseData);
            alert("Donation submitted successfully!");
            // Reset form or redirect
          } else {
            const errorData = await response.json();
            console.error("Error response:", errorData);
            throw new Error(`Failed to submit donation: ${errorData.message || response.statusText}`);
          }
        } catch (error) {
          console.error("Error:", error);
          alert(`Failed to submit donation. ${error.message}`);
        }
      };
    return (
        <div className="container mx-auto p-4 max-w-3xl">
            <h1 className="text-3xl font-bold mb-6 text-center text-gray-800">
                Donate Items
            </h1>
            <form
                onSubmit={handleSubmit}
                className="bg-white shadow-md rounded-lg p-6"
            >
                {/* User Information */}
                <div className="mb-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="relative">
                        <input
                            type="text"
                            value={user.name}
                            readOnly
                            className="w-full p-2 border rounded bg-gray-100 text-gray-700"
                        />
                        <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                            Name
                        </label>
                    </div>
                    <div className="relative">
                        <input
                            type="email"
                            value={user.email}
                            readOnly
                            className="w-full p-2 border rounded bg-gray-100 text-gray-700"
                        />
                        <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                            Email
                        </label>
                    </div>
                    <div className="relative md:col-span-2">
                        <input
                            type="tel"
                            value={user.phone_number}
                            readOnly
                            className="w-full p-2 border rounded bg-gray-100 text-gray-700"
                        />
                        <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                            Phone
                        </label>
                    </div>
                </div>

                {/* Collection Address */}
                <div className="mb-4 relative">
                    <input
                        type="text"
                        value={collectionAddress}
                        onChange={(e) => setCollectionAddress(e.target.value)}
                        required
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                        Collection Address
                    </label>
                </div>

                {/* Category */}
                <div className="mb-4 relative">
                    <select
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none"
                    >
                        <option value="">Select category</option>
                        <option value="veg">Vegetarian</option>
                        <option value="non-veg">Non-Vegetarian</option>
                    </select>
                    <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                        Category
                    </label>
                </div>

                {/* Description */}
                <div className="mb-4 relative">
                    <textarea
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows="3"
                    ></textarea>
                    <label className="absolute -top-2 left-2 bg-white px-1 text-xs text-gray-600">
                        Description
                    </label>
                </div>

                {/* Items */}
                <div className="mb-4">
                    <div className="flex justify-between items-center mb-2 ">
                    <label className="block text-sm font-medium text-gray-700">
                        Item Name x Quantity in Kgs
                    </label>
                    <button
                        type="button"
                        onClick={handleAddItem}
                        className="mt-2 flex items-center text-blue-500 hover:text-blue-700"
                    >
                        <CiCirclePlus className="h-6 w-6" />
                        {/* <span>Add Item</span> */}
                    </button>
                    </div>
                    {items.map((item, index) => (
                        <div key={index} className="flex mb-2 items-center">
                            <input
                                type="text"
                                value={item.item_name}
                                onChange={(e) =>
                                    handleItemChange(index, "item_name", e.target.value)
                                }
                                placeholder="Item name"
                                required
                                className="flex-1 p-2 border rounded mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                            <input
                                type="number"
                                value={item.quantity}
                                onChange={(e) =>
                                    handleItemChange(index, "quantity", parseInt(e.target.value))
                                }
                                placeholder="Qty"
                                required
                                min="1"
                                className="w-20 p-2 border rounded mr-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />

                            <button
                                type="button"
                                onClick={() => {
                                    const newItems = items.filter((_, i) => i !== index);
                                    setItems(newItems);
                                }}
                                className="text-red-500 hover:text-red-700"
                            >
                                <CiCircleMinus className="h-6 w-6" />
                            </button>
                        </div>
                    ))}

                </div>

                <button
                    type="submit"
                    className="w-full px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 transition duration-200"
                >
                    Submit Donation
                </button>
            </form>
        </div>
    );
}
