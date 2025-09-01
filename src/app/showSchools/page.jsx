"use client";
import { useEffect, useState } from "react";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);

  useEffect(() => {
    async function fetchSchools() {
      const res = await fetch("/api/getSchools");
      const data = await res.json();
      setSchools(data);
    }
    fetchSchools();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-3xl font-bold text-center mb-8">Schools Directory</h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {schools.map((school) => (
          <div
            key={school.id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition"
          >
            {/* Image */}
            {school.image ? (
              <img
                src={school.image}
                alt={school.name}
                className="w-full h-48 object-cover"
              />
            ) : (
              <div className="w-full h-48 bg-gray-300 flex items-center justify-center text-gray-600">
                No Image
              </div>
            )}

            {/* Info */}
            <div className="p-4 space-y-2">
              <h3 className="text-xl font-semibold">{school.name}</h3>
              <p className="text-gray-600">{school.address}</p>
              <p className="text-gray-500">{school.city}</p>
              <p className="text-gray-700 font-medium">📞 {school.contact}</p>
              <p className="text-blue-600 underline">✉️ {school.email_id}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
