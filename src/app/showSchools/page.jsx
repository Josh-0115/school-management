"use client";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSchool,
  faMapMarkerAlt,
} from "@fortawesome/free-solid-svg-icons";

export default function ShowSchools() {
  const [schools, setSchools] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchSchools() {
      try {
        const res = await fetch("/api/getSchools");
        if (!res.ok) {
          throw new Error("Failed to fetch schools");
        }
        const data = await res.json();
        setSchools(data);
      } catch (error) {
        console.error("Error fetching schools:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchSchools();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300">Loading...</p>
      </div>
    );
  }

  if (schools.length === 0) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <p className="text-xl text-gray-700 dark:text-gray-300">No schools found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-6 sm:p-12">
      <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-12 text-indigo-600 dark:text-indigo-400">
        <FontAwesomeIcon icon={faSchool} className="mr-4" />
        Schools Directory
      </h2>

      {/* Grid Layout */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {schools.map((school) => (
          <div
            key={school.id}
            className="bg-white dark:bg-gray-800 shadow-xl rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1"
          >
            {/* Image */}
            {school.image ? (
              <img
                src={school.image}
                alt={`Image of ${school.name}`}
                className="w-full h-56 object-cover"
              />
            ) : (
              <div className="w-full h-56 bg-gray-300 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 text-lg font-medium">
                No Image Available
              </div>
            )}

            {/* Info */}
            <div className="p-6 space-y-4">
              <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
                {school.name}
              </h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-300">
                <p className="flex items-center">
                  <FontAwesomeIcon icon={faMapMarkerAlt} className="mr-3 text-indigo-500" />
                  {school.address}, {school.city}, {school.state}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}