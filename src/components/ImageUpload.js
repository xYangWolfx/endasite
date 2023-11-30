import React, { useState } from "react";
import axios from "axios";

import "./ImageUpload.css"

function ImageUpload({ onUpload }) {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      return;
    }

    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const response = await axios.post(
        "https://api.enda.aeisec.pt/uploadEndapendentes",
        formData
      );
      console.log("Upload successful!", response.data);

      // Add logic to handle the response data as needed.
      onUpload();
    } catch (error) {
      console.error("Upload failed:", error);
    }
  };

  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button className="upload-button" onClick={handleUpload}>
        Upload
      </button>
    </div>
  );
}

export default ImageUpload;
