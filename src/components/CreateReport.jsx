import React, { useState } from "react";

export default function CreateReport() {
  const [formData, setFormData] = useState({
    description: "",
    address: "",
    category: "",
    name: "",
    email: "",
    updates: true,
    photo: null,
  });

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox" ? checked : type === "file" ? files[0] : value,
    });
  };

  const useCurrentLocation = () => {
    navigator.geolocation.getCurrentPosition(async (position) => {
      const { latitude, longitude } = position.coords;

      try {
        const res = await fetch(
          `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`
        );
        const data = await res.json();
        const address = data.display_name;

        setFormData({
          ...formData,
          address,
        });
      } catch (error) {
        console.error("Error fetching address:", error);
      }
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="mt-12 flex justify-between px-52 gap-10">
      <div className="w-[500px] rounded-xl p-6">
        <form>
          <h1 className="font-medium text-4xl mb-4">Report an issue</h1>
          <textarea
            name="description"
            placeholder="Describe the issue (required)"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full mt-10 p-3 border border-gray-600 rounded-lg h-[150px]"
          />
          <input
            type="text"
            name="address"
            placeholder="Address (required)"
            value={formData.address}
            onChange={handleChange}
            required
            className="w-full mt-10 p-3 border border-gray-600 rounded-lg"
          />

          <button
            type="button"
            onClick={useCurrentLocation}
            className="px-4 py-2 mt-10 bg-gray-100 border rounded-md hover:bg-gray-200"
          >
            Use my current location
          </button>
          <div className="flex justify-between gap-5">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full mt-10 p-3 border border-gray-600 rounded-lg"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full p-3 border border-gray-600 rounded-lg mt-10"
            />
          </div>
        </form>
      </div>

      <div className="w-[600px] rounded-xl flex flex-col h-auto p-4">


        <div className="flex gap-3 mt-auto">
          <button className="w-full bg-blue-500 text-white py-2 px-4 rounded-xl">
            Submit
          </button>
          <button className="w-full border border-gray-500 py-2 px-4 rounded-xl">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
