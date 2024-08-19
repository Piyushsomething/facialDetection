import React from 'react';
import Slider from 'react-slick';
import useStore from '@/store/store';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const YouTubeSlider = () => {
  const { entries } = useStore();
  const slidesToShow = Math.min(entries.length, 3);

  const settings = {
    dots: true,
    infinite: entries.length > 3,
    speed: 500,
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: Math.min(entries.length, 3),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: Math.min(entries.length, 2),
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const handleImagePreview = (filePath) => {
    window.open(`${process.env.NEXT_PUBLIC_BACKEND_URL_v2}/${filePath}`, '_blank');
  };

  if (entries.length === 0) {
    return (
      <div className="border border-gray-200 rounded p-4">
        <h3 className="text-xl font-semibold mb-4">Previous images/video</h3>
        <p>No images or videos available.</p>
      </div>
    );
  }

  return (
    <div className=" border border-gray-200 rounded p-4">
      <h3 className="text-xl font-semibold mb-4">Previous images/video</h3>
      <Slider {...settings}>
        {entries.map((entry) => (
          <div key={entry.id} className="px-2">
            {entry.file_path.toLowerCase().endsWith('.mp4') ||
            entry.file_path.toLowerCase().endsWith('.webm') ||
            entry.file_path.toLowerCase().endsWith('.ogg') ? (
              <video
                controls
                className="block w-full h-32 bg-gray-300 rounded-lg overflow-hidden focus:outline-none"
              >
                <source src={`${process.env.NEXT_PUBLIC_BACKEND_URL_v2}/${entry.file_path}`} type="video/mp4" />
                <source src={`${process.env.NEXT_PUBLIC_BACKEND_URL_v2}/${entry.file_path}`} type="video/webm" />
                <source src={`${process.env.NEXT_PUBLIC_BACKEND_URL_v2}/${entry.file_path}`} type="video/ogg" />
                Your browser does not support the video tag.
              </video>
            ) : (
              <button
                onClick={() => handleImagePreview(entry.file_path)}
                className="block w-full h-32 bg-gray-300 rounded-lg overflow-hidden focus:outline-none"
              >
                <img
                  src={`${process.env.NEXT_PUBLIC_BACKEND_URL_v2}/${entry.file_path}`}
                  alt={entry.name}
                  className="object-cover w-full h-full"
                />
              </button>
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default YouTubeSlider;