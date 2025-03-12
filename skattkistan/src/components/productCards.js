import "../pages/style/products.css"

const ProductCard = ({ products }) => {
  return (
    <div className="products-grid">
      {products.map((product) => (
        <div key={product.id} className="product-card">
          <div
            className="product-image"
            style={{
              backgroundImage: `url(${product.bild_url || "/placeholder.svg"})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />
          <div className="product-details">
            <h3>{product.namn}</h3>
            <p>{product.beskrivning || product.sortiment}</p>
            <p>
              <strong>{product.pris} kr</strong>
            </p>
            <button className="outline-button">View Details</button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default ProductCard

