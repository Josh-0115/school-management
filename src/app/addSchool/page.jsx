"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faSchool, faEnvelope, faPhone, faMapMarkerAlt, faImage } from "@fortawesome/free-solid-svg-icons";

export default function AddSchool() {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const [message, setMessage] = useState("");

  const onSubmit = async (data) => {
    const formData = new FormData();

    // append all fields normally
    formData.append("name", data.name);
    formData.append("address", data.address);
    formData.append("city", data.city);
    formData.append("state", data.state);
    formData.append("contact", data.contact);
    formData.append("email_id", data.email_id);

    // handle file correctly
    if (data.image && data.image[0]) {
      formData.append("image", data.image[0]); // take the first file from FileList
    }

    const res = await fetch("/api/addSchool", {
      method: "POST",
      body: formData,
    });

    if (res.ok) {
      setMessage("✅ School added successfully!");
      reset();
    } else {
      setMessage("❌ Error adding school.");
    }
  };


  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white dark:bg-gray-800 shadow-2xl rounded-3xl p-8 w-full max-w-lg space-y-4"
        action="/api/addSchool" method="POST" encType="multipart/form-data"
      >
        <h2 className="text-3xl font-extrabold mb-6 text-center text-gray-800 dark:text-gray-100">
          <FontAwesomeIcon icon={faPlus} className="mr-3 text-indigo-500" />
          Add a New School
        </h2>

        {/* School Name */}
        <div className="relative">
          <FontAwesomeIcon icon={faSchool} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="School Name"
            {...register("name", { required: true })}
            className="w-full border p-3 pl-10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>
        {errors.name && <p className="text-red-500 text-sm mt-1">School name is required</p>}

        {/* Address */}
        <div className="relative">
          <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Address"
            {...register("address", { required: true })}
            className="w-full border p-3 pl-10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>
        {errors.address && <p className="text-red-500 text-sm mt-1">Address is required</p>}

        {/* City and State */}
        <div className="flex gap-4">
          <div className="relative flex-1">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="City"
              {...register("city", { required: true })}
              className="w-full border p-3 pl-10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>
          <div className="relative flex-1">
            <FontAwesomeIcon icon={faMapMarkerAlt} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="State"
              {...register("state", { required: true })}
              className="w-full border p-3 pl-10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
            />
          </div>
        </div>
        {(errors.city || errors.state) && (
          <p className="text-red-500 text-sm mt-1">City and state are required</p>
        )}

        {/* Contact */}
        <div className="relative">
          <FontAwesomeIcon icon={faPhone} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="number"
            placeholder="Contact Number"
            {...register("contact", {
              required: true,
              pattern: /^[0-9]{10}$/,
            })}
            className="w-full border p-3 pl-10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>
        {errors.contact && (
          <p className="text-red-500 text-sm mt-1">Enter a valid 10-digit number</p>
        )}

        {/* Email */}
        <div className="relative">
          <FontAwesomeIcon icon={faEnvelope} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          <input
            type="email"
            placeholder="Email"
            {...register("email_id", {
              required: true,
              pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            })}
            className="w-full border p-3 pl-10 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-gray-100"
          />
        </div>
        {errors.email_id && (
          <p className="text-red-500 text-sm mt-1">Enter a valid email</p>
        )}

        {/* Image */}
        <div className="relative flex items-center border p-3 rounded-lg dark:bg-gray-700 dark:border-gray-600">
          <FontAwesomeIcon icon={faImage} className="mr-3 text-gray-400" />
          <span className="text-gray-500 dark:text-gray-400 mr-2">Upload Image</span>
          <input
            type="file"
            accept="image/*"
            {...register("image", { required: true })}
            className="w-full text-gray-500 dark:text-gray-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100"
          />
        </div>
        {errors.image && <p className="text-red-500 text-sm mt-1">Image is required</p>}


        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 mt-4 rounded-lg font-bold hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg"
        >
          Add School
        </button>

        {message && <p className={`mt-4 text-center font-semibold ${message.startsWith("✅") ? "text-green-500" : "text-red-500"}`}>{message}</p>}
      </form>
    </div>
  );
}