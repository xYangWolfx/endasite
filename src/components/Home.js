import React from "react";
import Map from "./Map";

import "./Home.css";
import logo from "./images/background.jpeg";

function Home({ loggedInUser, handleLogout }) {
  return (
    <div className="home-container">
      <div className="event-block">
        <div className="event-info">
          <h2>ENDA Coimbra</h2>
          <h3>– 2 e 3 de dezembro –</h3>
          <p>
            O Encontro Nacional de Direções Associativas terá início pelas 10h00
            de dia 2 de dezembro, no Auditório António Arnaut na Escola Superior
            de Tecnologia da Saúde de Coimbra, sito em São Martinho do Bispo -
            Coimbra.
          </p>
          <p>
            A Comissão Organizadora apresenta a seguinte proposta de ordem de
            trabalhos:
          </p>
          <ul>
            <li>Plenário A: Plenário Inicial;</li>
            <li>Plenário B: Ação Social e Abandono Escolar;</li>
            <li>Plenário C: Empregabilidade;</li>
            <li>Plenário D: Regime Jurídico do Associativismo Jovem;</li>
            <li>Plenário E: Internacionalização;</li>
            <li>Plenário F: Medidas Conjuntas;</li>
            <li>Plenário G: Plenário Final.</li>
          </ul>
        </div>
      </div>
      <div className="credentials-block">
        <h2>Receção aos delegados e participantes:</h2>
        <div className="credentials-info">
          <p>
            O levantamento de credenciais estará aberto nos seguintes horários:
          </p>
          <ul>
            <li>Dia 1 - 19h00 até 23h00</li>
            <li>Dia 2 - 09h00 até 21h00</li>
            <li>Dia 3 - 09h00 até 21h00</li>
          </ul>
        </div>
      </div>
      {/* <div className="map-block">
        <h2>Event Location</h2>
        <Map />
      </div> */}
    </div>
  );
}

export default Home;
