import React from 'react'
import { Link } from 'gatsby'
import githubIcon from '../img/github-icon.svg'
import discordIcon from '../img/discord-icon.svg'
import logo from '../img/logo.svg'

const Navbar = class extends React.Component {

  componentDidMount() {
    // Get all "navbar-burger" elements
   const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
    // Check if there are any navbar burgers
   if ($navbarBurgers.length > 0) {

     // Add a click event on each of them
     $navbarBurgers.forEach( el => {
       el.addEventListener('click', () => {

         // Get the target from the "data-target" attribute
         const target = el.dataset.target;
         const $target = document.getElementById(target);

         // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
         el.classList.toggle('is-active');
         $target.classList.toggle('is-active');

       });
     });
   }
 }

 render() {
   return (

  <nav className="navbar is-transparent" role="navigation" aria-label="main-navigation">
    <div className="container">
      <div className="navbar-brand">
        <Link to="/" className="navbar-item" title="Logo">
          <img src={logo} alt="DApps Dev Club" style={{ width: '88px' }} />
        </Link>
        {/* Hamburger menu */}
        <div className="navbar-burger burger" data-target="navMenu">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>
      <div id="navMenu" className="navbar-menu">
      <div className="navbar-start has-text-centered">
        <Link className="navbar-item" to="/start">
          Start here!
        </Link>
      </div>
      <div className="navbar-start has-text-centered">
        <Link className="navbar-item" to="/sessions">
          Sessions
        </Link>
      </div>
      <div className="navbar-start has-text-centered">
        <Link className="navbar-item" to="/sponsors">
          Sponsors
        </Link>
      </div>
      <div className="navbar-start has-text-centered">
        <Link className="navbar-item" to="/cert">
          Certificates
        </Link>
      </div>
      <div className="navbar-end has-text-centered">
        <a
          className="navbar-item"
          href="https://github.com/dapps-dev-club"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon">
            <img src={githubIcon} alt="Github" />
          </span>
        </a>
      </div>
      <div className="navbar-end has-text-centered">
        <a
          className="navbar-item"
          href="https://discordapp.com/invite/RTup7Ba"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span className="icon">
            <img src={discordIcon} alt="Discord" />
          </span>
        </a>
      </div>
      </div>
    </div>
  </nav>
  )}
}

export default Navbar
