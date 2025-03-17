import "../pages/style/products.css"

const ProductCard = ({ namn, pris, beskrivning, bild_url, onClick }) => {
  return (
    <div className="product-card">
      <div className="product-image" style={{ backgroundImage: `url(${bild_url})` }} />
      <div className="product-details">
        <h3>{namn}</h3>
        <p>{beskrivning}</p>
        <p><strong>{pris} kr</strong></p>
        <button className="outline-button" onClick={onClick}>Se detaljer</button>
      </div>
    </div>
  )
}

export default ProductCard

