import React, { useState } from "react";
import ImageUpload from "./ImageUpload";
import ImageGallery from "./ImageGallery";

import "./Endapendentes.css"

function Endapendentes() {
  const [rerender, setRerender] = useState(false);

  const handleRerender = () => {
    setRerender((prevRerender) => !prevRerender);
  }

  return (
    <div className="endapendentes-container">
      <h2>Endapendentes Page</h2>
      <ImageUpload onUpload={handleRerender}/>
      <ImageGallery onUpload={rerender}/>
    </div>
  );
}

export default Endapendentes;
