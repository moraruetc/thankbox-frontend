import React, { useState } from "react";
import ImageModal from "./ImageModal";
import { useNavigate } from "react-router-dom";

const AddMessage = () => {
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const images = [
    { src: "/assets/image1.jpg" },
    { src: "/assets/image2.jpg" },
    { src: "/assets/image3.jpg" },
    { src: "/assets/image4.jpg" },
    { src: "/assets/image5.jpg" },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = { name, message, image: selectedImage };
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/messages`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      });
  
      if (response.ok) {
        const data = await response.json();
        const redirectUrl = `/?id=${data.id}`;
        navigate(redirectUrl);
      } else {
        throw new Error("Failed to add message");
      }
    } catch (error) {
      alert("Error adding message: " + error.message);
    }
  };


  const handleSelectImage = (src) => {
    setSelectedImage(src);
    setShowModal(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white sm:shadow-md sm:rounded-lg mt-6">
      <h1 className="text-2xl font-bold mb-4 ">Add a message</h1>
      <p className="mb-6 text-gray-600">
        To Amanda's{" "}
        <span className="font-bold text-blue-500">Happy Birthday</span> card
      </p>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Your name <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            placeholder="Your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Your message</label>
          <textarea
            placeholder="Your message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-3 py-2 border rounded-lg min-h-[150px] focus:outline-none focus:border-blue-500"
            required
          ></textarea>
        </div>
        <div className="mb-4">
          <button
            type="button"
            onClick={() => setShowModal(true)}
            className="w-full px-3 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 focus:outline-none"
          >
            Select Image
          </button>
        </div>
        {selectedImage && (
          <div className="mb-4">
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        )}
        <div className="mb-4">
          <button
            type="submit"
            className="w-full px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none"
          >
            Post Message
          </button>
        </div>
      </form>
      {showModal && (
        <ImageModal
          images={images}
          onSelect={handleSelectImage}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
};

export default AddMessage;
