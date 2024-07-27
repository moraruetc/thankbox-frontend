import React from "react";

const ImageModal = ({ images, onSelect, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-xl w-full">
        <h2 className="text-xl font-bold mb-4">Select an Image</h2>
        <div className="grid grid-cols-2 gap-4 mb-4">
          {images.map((image, index) => (
            <div
              key={index}
              className={`${
                images.length % 2 !== 0 && index === images.length - 1
                  ? "col-span-2"
                  : ""
              }`}
            >
              <div className="w-full h-48 flex items-center justify-center overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={image.src}
                  alt={`Image ${index}`}
                  className="cursor-pointer hover:shadow-lg transition-shadow w-full h-full object-cover"
                  onClick={() => onSelect(image.src)}
                />
              </div>
            </div>
          ))}
        </div>
        <button
          className="w-full px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
          onClick={onClose}
        >
          Close
        </button>
      </div>
    </div>
  );
};

export default ImageModal;
