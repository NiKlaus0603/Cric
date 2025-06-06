import React from 'react';

const ImageGallery = ({ images }) => {
  return (
    <div className="mt-6">
      <h3 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">📸 Match Gallery</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((img, i) => (
          <div key={i} className="overflow-hidden rounded-xl shadow-md bg-white dark:bg-slate-800">
            <img src={img.url} alt={img.caption} className="w-full h-52 object-cover" />
            <p className="text-sm text-gray-700 dark:text-gray-300 p-2">{img.caption}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageGallery;
