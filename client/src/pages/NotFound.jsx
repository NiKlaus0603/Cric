import React from 'react';

const NotFound = () => (
  <div className="flex flex-col items-center justify-center h-screen text-center">
    <h1 className="text-5xl font-bold text-red-600">404</h1>
    <p className="mt-2 text-lg text-gray-700 dark:text-white">Page not found</p>
    <a href="/" className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
      🔙 Go to Homepage
    </a>
  </div>
);

export default NotFound;
