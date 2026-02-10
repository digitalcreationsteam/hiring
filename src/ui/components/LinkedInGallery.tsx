import React, { useState } from 'react';

const ImageGallery: React.FC = () => {
  const [images] = useState([
    { id: 1, src: '/1stScreenShot.jpeg', alt: 'Image 1' },
    { id: 2, src: '/2ndScreenShot.jpeg', alt: 'Image 2' },
    { id: 3, src: '/3rdScreenShot.jpeg', alt: 'Image 3' },
    { id: 4, src: '/4thScreenShot.jpeg', alt: 'Image 4' },
    { id: 5, src: '/5thScreenShot.jpeg', alt: 'Image 5' },
    { id: 6, src: '/6thScreenShot.jpeg', alt: 'Image 6' },
    { id: 7, src: '/7thScreenShot.jpeg', alt: 'Image 7' },
    { id: 8, src: '/8thScreenShot.jpeg', alt: 'Image 8' },
  ]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12">Viral Screenshot</h1>
        
        {/* Masonry Grid */}
        <div className="masonry-grid columns-1 sm:columns-2 lg:columns-3 gap-6">
          {images.map((image) => (
            <div
              key={image.id}
              className="break-inside-avoid mb-6 overflow-hidden rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-auto object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ImageGallery;