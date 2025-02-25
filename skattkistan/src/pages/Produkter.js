import "./style/products.css"

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
              <button className="custom-button">Läs mer!</button>
            </div>
          </div>
        </section>

        <section className="products-section">
          <h2>Våra produkter!</h2>
          <div className="products-grid">
            {/* Product cards */}
            {[1, 2, 3].map((item) => (
              <div key={item} className="product-card">
                <div className="product-image" />
                <div className="product-details">
                  <h3>Eco Product {item}</h3>
                  <p>Sustainable and environmentally friendly product made from natural materials.</p>
                  <button className="outline-button">View Details</button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  )
}

