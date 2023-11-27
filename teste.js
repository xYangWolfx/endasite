import React from 'react';

function Motions() {
  const events = [
    { name: 'plenarioA', motions: ['Ata do ENDA Castelo Branco 2023.pdf', 'Relatório CC A3ES.pdf'] },
    { name: 'plenarioB', motions: ['(AAL) Por uma Habitação Acessivel e Justa.pdf', '(FAL) Manifesto da Habitação Estudantil.pdf'] },
    // Add more events and motions as needed
  ];

  const openPdfInNewWindow = (eventName, pdfName) => {
    window.open(`http://localhost:3001/mocoes/${eventName}/${pdfName}`, '_blank');
  };

  const downloadPdf = (eventName, pdfName) => {
    fetch(`http://localhost:3001/mocoes/${eventName}/${pdfName}`, { responseType: 'blob' })
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = pdfName;
        a.target = '_self'; // Prevents opening in a new tab
        a.click();
      });
  };

  return (
    <div>
      <h2>Motions</h2>
      {events.map((event) => (
        <div key={event.name}>
          <h3>{event.name}</h3>
          <ul>
            {event.motions.map((motion) => (
              <li key={motion}>
                {motion} &nbsp;
                <button onClick={() => openPdfInNewWindow(event.name, motion)}>Open PDF</button>
                &nbsp;
                <button onClick={() => downloadPdf(event.name, motion)}>Download PDF</button>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

export default Motions;