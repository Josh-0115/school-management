"use client";
import { useForm } from "react-hook-form";
import { useState } from "react";

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
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-lg rounded-xl p-6 w-full max-w-lg"
        action="/api/addSchool" method="POST" encType="multipart/form-data"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Add School</h2>

        {/* School Name */}
        <input
          type="text"
          placeholder="School Name"
          {...register("name", { required: true })}
          className="w-full border p-2 mb-2 rounded"
        />
        {errors.name && <p className="text-red-500">Name is required</p>}

        {/* Address */}
        <input
          type="text"
          placeholder="Address"
          {...register("address", { required: true })}
          className="w-full border p-2 mb-2 rounded"
        />

        {/* City */}
        <input
          type="text"
          placeholder="City"
          {...register("city", { required: true })}
          className="w-full border p-2 mb-2 rounded"
        />

        {/* State */}
        <input
          type="text"
          placeholder="State"
          {...register("state", { required: true })}
          className="w-full border p-2 mb-2 rounded"
        />

        {/* Contact */}
        <input
          type="number"
          placeholder="Contact Number"
          {...register("contact", {
            required: true,
            pattern: /^[0-9]{10}$/,
          })}
          className="w-full border p-2 mb-2 rounded"
        />
        {errors.contact && (
          <p className="text-red-500">Enter a valid 10-digit number</p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          {...register("email_id", {
            required: true,
            pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          })}
          className="w-full border p-2 mb-2 rounded"
        />
        {errors.email_id && (
          <p className="text-red-500">Enter a valid email</p>
        )}

        {/* Image */}
        <input
          type="file"
          accept="image/*"
          {...register("image", { required: true })}
          className="w-full border p-2 mb-4 rounded"
        />

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Submit
        </button>

        {message && <p className="mt-4 text-center">{message}</p>}
      </form>
    </div>
  );
}
