import React, { useState } from 'react';
import Image from 'next/image';

interface PhotoData {
  src: string;
  caption: string;
}

interface PhotoCarouselProps {
  photos?: PhotoData[];
  height?: number;
}

const PhotoCarousel = ({ photos = [], height = 400 }: PhotoCarouselProps) => {
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0);

  if (photos.length === 0) {
    return null; // or return a placeholder component
  }

  const nextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const prevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  return (
    <div className="relative w-full max-w-2xl mx-auto my-8">
      <div style={{ height: `${height}px` }} className="relative">
        <Image
          src={photos[currentPhotoIndex].src}
          alt={photos[currentPhotoIndex].caption}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
        {photos.length > 1 && (
          <>
            <button
              onClick={prevPhoto}
              className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
            >
              &#8249;
            </button>
            <button
              onClick={nextPhoto}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full z-10"
            >
              &#8250;
            </button>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 bg-black bg-opacity-50 text-white px-2 py-1 rounded-full">
              {currentPhotoIndex + 1} / {photos.length}
            </div>
          </>
        )}
      </div>
      {photos[currentPhotoIndex].caption && (
        <div className="mt-2 text-center text-gray-300">
          {photos[currentPhotoIndex].caption}
        </div>
      )}
    </div>
  );
};

export default PhotoCarousel;