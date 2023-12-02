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
