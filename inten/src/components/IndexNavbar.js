import React, { useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

export const IndexNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showFeatures, setShowFeatures] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const toggleFeatures = () => setShowFeatures(!showFeatures);
  const toggleAbout = () => setShowAbout(!showAbout);

  return (
    <>
    <nav className="navbar navbar-dark bg-dark">
      <div className="container-fluid">
        {/* Marca opcional (puedes quitarla si no la quieres visible) */}
        {/* <a className="navbar-brand" href="/">MicroMatic</a> */}

        {/* Botón hamburguesa siempre visible */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
          <div
            className={`collapse navbar-collapse ${isOpen ? "show" : ""}`}
            id="navbarNavAltMarkup"
          ></div>

        {/* Menú desplegable */}
        <div className="collapse navbar-collapse" id="navbarMenu">
          <div className="navbar-nav ms-auto text-center bg-dark p-3 rounded-3">
            <a className="nav-link active" aria-current="page" href="#">
              Inicio
            </a>
            <a className="nav-link" href="#" onClick={toggleFeatures}>
              Características
            </a>
            <a className="nav-link" href="#" onClick={toggleAbout}>
              Acerca de Nosotros
            </a>
          </div>
        </div>
      </div>
    </nav>
     {/* Modal: Características */}
      <Modal isOpen={showFeatures} toggle={toggleFeatures}>
        <ModalHeader toggle={toggleFeatures}>Características</ModalHeader>
        <ModalBody>
          <p>
            Esta aplicacion web esta hecha para facilitar la movilidad al tomar los taxi buses en el
            momento preciso cuando pasen cerca de nosotros. Detecta en donde estamos, las rutas
            predefinidas de algunas lineas de buses (al futuro se piensa cargar desde la pagina web)
            y la ubicacion en tiempo real de los buses actuales que estan en cada linea junto a la
            informacion de esta.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleFeatures}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
      {/* Modal: Acerca de Nosotros */}
      <Modal isOpen={showAbout} toggle={toggleAbout}>
        <ModalHeader toggle={toggleAbout}>Acerca de Nosotros</ModalHeader>
        <ModalBody>
          <p>Hecho por ingenieros informaticos de la Universidad Catolica de Temuco:</p>
          <ul className="about-list">
            <li>Cristian Angulo-Gonzalez</li>
            <li>Claudio Araya-Toro</li>
            <li>Diego Castro-Cifuentes</li>
          </ul>
          <p>Mantenedor actual: Cristian Angulo-Gonzalez</p>
          <p>
            Esta aplicacion web es open source. Cualquier idea de mejora o 
            reporte de bugs se puede contactar tanto al GitHub o a mi correo: cangulo2020@alu.uct.cl.
          </p>
        </ModalBody>
        <ModalFooter>
          <Button color="secondary" onClick={toggleAbout}>
            Cerrar
          </Button>
        </ModalFooter>
      </Modal>
    </>
  );
};
