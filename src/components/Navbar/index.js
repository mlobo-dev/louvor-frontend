import React from 'react';
import { Link } from 'react-router-dom';
import './navbar.css';
import logo from '../../img/logo-sheknah.jpg';

function Navbar() {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light ">
        <img className="img-logo" src={logo} />
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <Link className="nav-item active ml-2" to="/musicas">
            Músicas
          </Link>
          <Link className="nav-item active ml-2" to="/repertorios">
            Repertórios
          </Link>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
