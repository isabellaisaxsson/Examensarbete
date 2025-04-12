import "./style/products.css"
import ProductsList from "../components/ProductList"
import { Link } from 'react-router-dom';

export default function Produkter() {
  return (
    <div className="page-container">
      <div className="hero-banner" />

      <main className="main-content">
        <section className="featured-section">
          <div className="featured-container">
            <div className="featured-content">
              <h2>Våra produkter</h2>
              <p>
              Våra produkter är noggrant utvalda second hand-varor, vilket ger dem nytt liv och minskar onödig konsumtion. Genom att välja återanvända produkter bidrar vi till en mer hållbar framtid, där miljön och återvinning står i fokus.
              </p>
              <Link to="/om-oss">
              <button className="custom-button">Läs mer!</button>
              </Link>
            </div>
          </div>
        </section>

        <section className="products-section">
          <h2>Våra produkter!</h2>
          <ProductsList />
        </section>
      </main>
    </div>
  )
}

