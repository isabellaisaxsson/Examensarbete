"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "../pages/style/Hem.css"

const CarouselForOneItem = ({ products = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const maxItems = 6

  // Debug: Log the products prop when it changes
  useEffect(() => {
    console.log("CarouselForOneItem received products:", products)
  }, [products])

  // Use useMemo to memoize the limitedProducts array
  const limitedProducts = useMemo(() => {
    // Make sure products is an array
    const productsArray = Array.isArray(products) ? products : []
    console.log("Products array in useMemo:", productsArray)

    const result =
      productsArray.length > 0
        ? productsArray.slice(0, maxItems)
        : [{ id: "placeholder", namn: "Placeholder", bild_url: "/placeholder.svg" }]

    console.log("Limited products for carousel:", result)
    return result
  }, [products, maxItems])

  useEffect(() => {
    // Set loaded state once we have products
    if (limitedProducts.length > 0) {
      setIsLoaded(true)
      console.log("Products loaded in carousel:", limitedProducts)
    }
  }, [limitedProducts])

  // Use useCallback to memoize the nextSlide and prevSlide functions
  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex >= limitedProducts.length - 1 ? 0 : prevIndex + 1))
  }, [limitedProducts.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? limitedProducts.length - 1 : prevIndex - 1))
  }, [limitedProducts.length])

  // Automatic image change every 3 seconds
  useEffect(() => {
    if (!isLoaded) return

    const interval = setInterval(nextSlide, 3000)
    return () => clearInterval(interval)
  }, [isLoaded, nextSlide])

  // Log the current image for debugging
  useEffect(() => {
    if (isLoaded) {
      console.log("Current carousel image:", {
        index: currentIndex,
        product: limitedProducts[currentIndex],
        imageUrl: limitedProducts[currentIndex]?.bild_url,
      })
    }
  }, [currentIndex, isLoaded, limitedProducts])

  if (limitedProducts.length === 0) {
    return <p>Inga produkter att visa</p>
  }

  // Handle image load error
  const handleImageError = (e) => {
    console.log("Image failed to load, using placeholder")
    e.target.onerror = null
    e.target.src = "/placeholder.svg"
  }

  return (
    <div className="carousel-one-item">
      <div className="carousel-one-item-container">
        <button className="carousel-arrow-btn left" onClick={prevSlide}>
          <ChevronLeft size={24} />
        </button>

        <div className="carousel-one-item-wrapper">
          {limitedProducts.map((product, index) => (
            <div
              key={product.id || index}
              className={`carousel-one-item-image ${index === currentIndex ? "active" : ""}`}
              style={{
                display: index === currentIndex ? "flex" : "none",
              }}
            >
              <img
                src={product.bild_url || "/placeholder.svg"}
                alt={product.namn || "Product"}
                className="product-image"
                onError={handleImageError}
              />
            </div>
          ))}
        </div>

        <button className="carousel-arrow-btn right" onClick={nextSlide}>
          <ChevronRight size={24} />
        </button>
      </div>
    </div>
  )
}

export default CarouselForOneItem

