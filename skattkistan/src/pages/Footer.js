import { Link } from "react-router-dom"
import "./style/Footer.css"
import { FaFacebook, FaInstagram } from "react-icons/fa"

const Footer = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-branding">
          <h3>Skattkistan</h3>
        </div>

        <div className="footer-links">
          <Link to="/kontakta-oss" className="contact-link">
            Kontakta oss
          </Link>
        </div>

        <div className="social-icons">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
            <FaFacebook />
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
            <FaInstagram />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; {currentYear} Skattkistan</p>
      </div>
    </footer>
  )
}

export default Footer
