"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "../pages/style/Hem.css"

const Carousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0)
  const totalItems = 6
  const itemsPerPage = 3

  const nextSlide = () => {
    if (currentIndex < totalItems - itemsPerPage) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
    }
  }

  return (
    <div className="latest-finds">
      <h2 className="carousel-title">De senaste fynden!</h2>
      <div className="carousel-container">
        <button
          className={`carousel-arrow-btn left ${currentIndex === 0 ? "disabled" : ""}`}
          onClick={prevSlide}
          disabled={currentIndex === 0}
        >
          <ChevronLeft size={24} />
        </button>
        <div className="carousel-wrapper">
          <div className="carousel-content" style={{ transform: `translateX(-${currentIndex * 33.333}%)` }}>
            {[...Array(totalItems)].map((_, index) => (
              <div key={index} className="carousel-item">
                Product {index + 1}
              </div>
            ))}
          </div>
        </div>
        <button
          className={`carousel-arrow-btn right ${currentIndex >= totalItems - itemsPerPage ? "disabled" : ""}`}
          onClick={nextSlide}
          disabled={currentIndex >= totalItems - itemsPerPage}
        >
          <ChevronRight size={24} />
        </button>
      </div>
      <button className="view-all-btn">Se alla produkter!</button>
    </div>
  )
}

export default Carousel

