import Image from "next/image";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100 font-sans p-4">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 sm:px-20 text-center">
        <h1 className="text-4xl sm:text-6xl font-bold mb-8 text-indigo-600 dark:text-indigo-400">
          Welcome to Schools
        </h1>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 mt-8 w-full max-w-2xl">
          <a
            href="/addSchool"
            className="flex-1 w-full flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Add a School
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Click to add a new school to the database.
            </p>
          </a>

          <a
            href="/showSchools"
            className="flex-1 w-full flex flex-col items-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:-translate-y-1"
          >
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              View Schools
            </h2>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Browse all schools in the list.
            </p>
          </a>
        </div>
      </main>

      <footer className="flex items-center justify-center w-full h-12 mt-8 text-xs text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
        © 2024 School Manager. All rights reserved.
      </footer>
    </div>
  );
}