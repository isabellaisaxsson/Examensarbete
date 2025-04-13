import { Link } from "react-router-dom"
import "./style/Header.css"
import { FaShoppingCart, FaHeart, FaBars } from "react-icons/fa"

import { useState } from "react";

const Header = () => {

  const [menuOpen, setMenuOpen] = useState(false);

  // Funktion för att toggla hamburgar menyn
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className="header">
      <Link to="/" className="header-logo">
        Skattkistan
      </Link>
      
      <div className="burger-icon" onClick={toggleMenu}>
        <FaBars />
      </div>

      <nav>
        <ul className={`nav-list ${menuOpen ? 'show' : ''}`}>
          <li>
            <Link to="/" className="nav-link">
              Hem
            </Link>
          </li>
          <li>
            <Link to="/produkter" className="nav-link">
              Produkter
            </Link>
          </li>
          <li>
            <Link to="/om-oss" className="nav-link">
              Om oss
            </Link>
          </li>
          <li>
            <Link to="/kontakta-oss" className="nav-link">
              Kontakta oss
            </Link>
          </li>
          <li>
            <Link to="/favoriter" className="nav-link">
              <FaHeart className="favorite-icon" />
            </Link>
          </li>
          <li>
            <Link to="/varukorg" className="nav-link">
              <FaShoppingCart className="cart-icon" />
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Header

