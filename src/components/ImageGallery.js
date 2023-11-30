import React, { useState, useEffect } from "react";
import axios from "axios";

import "./ImageGallery.css";

function ImageGallery({ onUpload }) {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  const fetchImages = () => {
    // Make an HTTP GET request to fetch the list of images from your server
    axios
      .get("https://api.enda.aeisec.pt/listEndapendentes")
      .then((response) => {
        // Update the state with the fetched images
        setImages(response.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  };

  useEffect(() => {
    fetchImages();
  }, []); // Empty dependency array means this effect runs once, like componentDidMount

  useEffect(() => {
    fetchImages();
  }, [onUpload]);

  const openPreview = (image) => {
    setSelectedImage(image);
  };

  const closePreview = () => {
    setSelectedImage(null);
  };

  const closeImagePreview = () => {
    setSelectedImage(null);
  };

  return (
    <div>
      <h2>Uploaded Images</h2>
      <div
        className="image-container"
        style={{ display: "flex", flexWrap: "wrap" }}
      >
        {images.map((image, index) => (
          <div
            key={index}
            className="image-item"
            style={{
              width: "25%",
              margin: "5px 0",
              height: "200px",
              marginBottom: "5px",
            }}
            onClick={() => openPreview(image)}
          >
            <img
              src={`https://api.enda.aeisec.pt/endapendentes/${image.filename}`}
              alt={`Image ${index}`}
              style={{
                maxWidth: "100%",
                maxHeight: "100%",
                objectFit: "cover",
              }}
            />
          </div>
        ))}
      </div>
      {selectedImage && (
        <div className="image-preview-overlay" onClick={closeImagePreview}>
          <div className="modal-content">
            <button onClick={closeImagePreview}>Close</button>
            <br/>
            <img
              src={`https://api.enda.aeisec.pt/endapendentes/${selectedImage.filename}`}
              alt={`Image Preview`}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageGallery;
