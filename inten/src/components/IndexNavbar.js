import React from 'react'

export const IndexNavbar = () => {
  return (
    <nav className="navbar-transparent navbar navbar-expand-lg">
     <div className="container-fluid">
      <a className="navbar-brand" href="/">MicroMatic</a>
       <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
      <div className="navbar-nav">
        <a className="nav-link active" aria-current="page" href="#">Inicio</a>
        <a className="nav-link" href="#">Caracteristicas</a>
        <a className="nav-link" href="#">Acerca de Nosotros</a>
      </div>
    </div>
  </div>
</nav>
  )
}