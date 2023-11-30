import React, { useState, useEffect } from "react";
import axios from "axios";

import "./Plenarios.css";

const plenarioNames = {
  plenarioA: "Plenário A: Plenário Inicial",
  plenarioB: "Plenário B: Ação Social e Abandono Escolar",
  plenarioC: "Plenário C: Empregabilidade",
  plenarioD: "Plenário D: Internacionalização",
  plenarioE: "Plenário E: Regime Jurídico do Associativismo Jovem",
  plenarioF: "Plenário F: Medidas Conjuntas",
  plenarioG: "Plenário G: Plenário Final",
};

function Plenarios({ userInfo }) {
  const [selectedPlenario, setSelectedPlenario] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [showUploadSection, setShowUploadSection] = useState(false);
  const [allFiles, setAllFiles] = useState([]);
  const [rerender, setRerender] = useState(false); // New state variable

  const handleAddFileClick = (plenarioKey) => {
    setShowUploadSection(true);
    handlePlenarioChange(plenarioKey);
  };

  const handleCancelClick = () => {
    setShowUploadSection(false);
    setSelectedFile(null); // Clear selected file
  };

  const handlePlenarioChange = (plenarioKey) => {
    setSelectedPlenario(plenarioKey);
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    // Check if a file is selected
    if (!selectedFile) {
      console.warn("Please select a file.");
      return;
    }

    // Check if the selected file is a PDF
    if (selectedFile.type !== "application/pdf") {
      console.warn("Please select a PDF file.");
      // Clear the selected file input
      event.target.value = null;
      return;
    }

    // Update the selected file state
    setSelectedFile(selectedFile);
  };

  const handleUpload = async (plenarioKey) => {
    if (selectedFile) {
      // TODO: Implement file upload logic here
      console.log(`nome do ficheiro: ${selectedFile.name}`);
      console.log(`Uploading file for ${selectedPlenario}:`, selectedFile);

      const formData = new FormData();
      const plenarioKeyAsString = String(selectedPlenario);
      formData.append("plenarioKey", plenarioKeyAsString);
      formData.append("file", selectedFile);

      try {
        const response = await axios.post(
          "https://api.enda.aeisec.pt/uploadMocoes",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        console.log("Upload successful!", response.data);

        // Add logic to handle the response data as needed.
        setRerender((prevRerender) => !prevRerender);
      } catch (error) {
        console.error("Upload failed:", error);
      }

      // Clear selected file after upload
      setSelectedFile(null);
      // Hide the upload section after upload
      setShowUploadSection(false);
    } else {
      console.warn("Please select a file before uploading.");
    }
  };

  useEffect(() => {
    // Fetch all files for all plenarios
    axios
      .get("https://api.enda.aeisec.pt/listAllFiles")
      .then((response) => {
        setAllFiles(response.data);
      })
      .catch((error) => {
        console.error("Error fetching files:", error);
      });
  }, [rerender]);

  return (
    <div className="plenarios-container">
      <h2>Plenarios</h2>
      <ul className="plenarios-list">
        {Object.entries(plenarioNames).map(([plenarioKey, plenarioLabel]) => (
          <li className="plenario-item" key={plenarioKey}>
            <div>
              <strong>{plenarioLabel}</strong>
              {userInfo && userInfo.userType === "admin" && (
                <button
                  className="add-file-button"
                  onClick={() => handleAddFileClick(plenarioKey)}
                >
                  Add New File
                </button>
              )}
              {showUploadSection && selectedPlenario === plenarioKey && (
                <div>
                  <input type="file" onChange={handleFileChange} />
                  <button className="upload-button" onClick={handleUpload}>
                    Upload File
                  </button>

                  <div>
                    <button
                      className="cancel-button"
                      onClick={() => handleCancelClick()}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              )}
              <div>
                <ul className="file-list">
                  {allFiles
                    .filter((file) => file.plenarioKey === plenarioKey)
                    .map((file) => (
                      <li className="file-item" key={file.filename}>
                        {file.filename}
                        <button
                          className="action-button"
                          onClick={() =>
                            window.open(
                              `https://api.enda.aeisec.pt/plenarios/${plenarioKey}/${file.filename}`,
                              "_blank"
                            )
                          }
                        >
                          Open
                        </button>
                        <button
                          className="action-button"
                          onClick={() => {
                            const link = document.createElement("a");
                            link.href = `https://api.enda.aeisec.pt/plenarios/${plenarioKey}/${file.filename}`;
                            link.download = file.filename;
                            link.click();
                          }}
                        >
                          Download
                        </button>
                      </li>
                    ))}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Plenarios;
