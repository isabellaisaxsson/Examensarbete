"use client"

import { useState, useEffect, useMemo, useCallback } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "../pages/style/Hem.css"

const CarouselForOneItem = ({ products = [] }) => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const maxItems = 6

  useEffect(() => {
    console.log("CarouselForOneItem received products:", products)
  }, [products])

  const limitedProducts = useMemo(() => {
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
    if (limitedProducts.length > 0) {
      setIsLoaded(true)
      console.log("Products loaded in carousel:", limitedProducts)
    }
  }, [limitedProducts])


  const nextSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex >= limitedProducts.length - 1 ? 0 : prevIndex + 1))
  }, [limitedProducts.length])

  const prevSlide = useCallback(() => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? limitedProducts.length - 1 : prevIndex - 1))
  }, [limitedProducts.length])

  //Skapar en automatisk slideshow som bläddrar mellan produkterna var 3:e sekund
  useEffect(() => {
    if (!isLoaded) return

    const interval = setInterval(nextSlide, 3000)
    return () => clearInterval(interval)
  }, [isLoaded, nextSlide])


  // Loggar aktuell produkt i carouseln när index eller produkter ändras, efter att allt laddats
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

//Om det skulle bli error med bild ska det skrivas i konsollen
  const handleImageError = (e) => {
    console.log("Image failed to load, using placeholder")
    e.target.onerror = null
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
                src={product.bild_url || "Product"}
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

