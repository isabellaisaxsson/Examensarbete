"use client"

import { addToCart } from '../components/varukorgFunction';
import { addToFavorites } from '../components/favoriterFunction'
import { useState } from "react"

const ProductModal = ({ product, onClose }) => {
  const [isZoomed, setIsZoomed] = useState(false)
  const [zoomPosition, setZoomPosition] = useState({ x: 0, y: 0 })
  const [zoomLevel, setZoomLevel] = useState(1.5)

  if (!product) return null

  //Funktion som hanterar om man zoomar in på bilden
  const toggleZoom = () => {
    setIsZoomed(!isZoomed)
  }

  const handleZoomMouseMove = (e) => {
    if (!isZoomed) return

    const imageElement = e.currentTarget
    const { left, top, width, height } = imageElement.getBoundingClientRect()

    const x = Math.max(0, Math.min(1, (e.clientX - left) / width))
    const y = Math.max(0, Math.min(1, (e.clientY - top) / height))

    setZoomPosition({ x, y })
  }

  const handleZoomTouch = (e) => {
    if (!isZoomed) return

    const touch = e.touches[0]
    const imageElement = e.currentTarget
    const { left, top, width, height } = imageElement.getBoundingClientRect()

    const x = Math.max(0, Math.min(1, (touch.clientX - left) / width))
    const y = Math.max(0, Math.min(1, (touch.clientY - top) / height))

    setZoomPosition({ x, y })
  }

  const handleZoomLevelChange = (e) => {
    setZoomLevel(Number.parseFloat(e.target.value))
  }

  //Funktion som hanterar när man lägger till en produkt i varukorgen
  const handleAddToCart = async () => {
    const success = await addToCart(product.id) 
    if (success) {
      alert("Produkten har lagts i varukorgen!")
    } else {
      alert("Något gick fel. Försök igen.")
    }
  }

  //Funktion som hanterar när man lägger till en produkt i favoriter
  const handleAddToFavorites = async () => {
    const success = await addToFavorites(product.id)
    if (success) {
      alert("Produkten har lagts i dina favoriter!")
    } else {
      alert("Något gick fel. Försök igen.")
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-button" onClick={onClose}>
          ✖
        </button>

        {isZoomed ? (
          <div className="zoom-view">
            <button className="close-zoom-button" onClick={toggleZoom}>
              ✖
            </button>

            <div className="zoom-controls">
              <span>Zoom: </span>
              <input type="range" min="1" max="3" step="0.1" value={zoomLevel} onChange={handleZoomLevelChange} />
            </div>

            <div className="zoomed-image-container" onMouseMove={handleZoomMouseMove} onTouchMove={handleZoomTouch}>
              <div
                className="zoomed-image"
                style={{
                  backgroundImage: `url(${product.bild_url})`,
                  transform: `scale(${zoomLevel})`,
                  transformOrigin: `${zoomPosition.x * 100}% ${zoomPosition.y * 100}%`,
                }}
              />
            </div>
          </div>
        ) : (
          <div className="modal-flex-container">
            <div className="modal-image-container">
              <div
                className="modal-image"
                style={{ backgroundImage: `url(${product.bild_url})` }}
                onClick={toggleZoom}
              />
              <div className="zoom-hint">
                <span>🔍 Klicka för att zooma</span>
              </div>
            </div>

            <div className="modal-details">
              <h2 className="product-title">{product.namn}</h2>

              <div className="price-container">
                <span className="product-price">{product.pris} kr</span>
                <span className="product-category">{product.målgrupp}</span>
              </div>

              <div className="product-divider"></div>

              <div className="product-description">
                <h3 className="detail-heading">Beskrivning</h3>
                <p>{product.beskrivning}</p>
              </div>

              <div className="product-specs">
                <div className="spec-item">
                  <h3 className="detail-heading">Storlek</h3>
                  <p>{product.storlek}</p>
                </div>

                <div className="spec-item">
                  <h3 className="detail-heading">Kategori</h3>
                  <p>{product.typ_av_klader}</p>
                </div>

                <div className="spec-item">
                  <h3 className="detail-heading">Skick</h3>
                  <p>{product.Begagnad === "Ja" ? "Begagnad" : product.Begagnad}</p>
                </div>
              </div>

              <div className="product-actions">
                <button className="action-button primary-button" onClick={handleAddToCart}>Lägg i kundvagn</button>
                <button className="action-button secondary-button" onClick={handleAddToFavorites}>Lägg till i önskelistan</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ProductModal

