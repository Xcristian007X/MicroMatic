import React from 'react'
import { IndexNavbar } from './IndexNavbar'  // importa el navbar

export const IndexHeader = () => {
  return (
    <div
      className="page-header section-dark"
      style={{
        backgroundImage: "url(" + require("../peakpx.jpg") + ")"
      }}
    >
      {/* Aquí insertamos el navbar */}
      <div className="header-navbar-container">
        <IndexNavbar />
      </div>

      <div className="filter" />
      <div className="content-center">
        <div className="container">
          <div className="title-brand">
            <h1 className="presentation-title">MicroMatic</h1>
            <div className="fog-low">
              <img alt="..." src={require("../fog-low.png")} />
            </div>
            <div className="fog-low right">
              <img alt="..." src={require("../fog-low.png")} />
            </div>
          </div>

          <h2 className="presentation-subtitle text-center">
            Empieza tu viaje ahora mismo!
          </h2>
        </div>
      </div>

      <div className="mouseSlider text-center" id="hola">
        <a href="#modals">
          <button className="btn btn-outline-light" type="button">
            Empezar
          </button>
        </a>
      </div>

      <div
        className="moving-clouds"
        style={{
          backgroundImage: "url(" + require("../clouds.png") + ")"
        }}
      />
      <h6 className="category category-absolute">
        Diseñado y codificado por informaticos audaces
        <a
          href="https://github.com/lortegacurillan/Integracion3"
          target="_blank"
          rel="noreferrer"
        ></a>
      </h6>
    </div>
  )
}
