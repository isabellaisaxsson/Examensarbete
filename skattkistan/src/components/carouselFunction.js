import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import "../pages/style/Hem.css"


const Carousel = ({ products, setSelectedProduct  }) => { // Tar emot produkter som prop
  const [currentIndex, setCurrentIndex] = useState(0)
  const itemsPerPage = 3
  const maxItems = 6

  const limitedProducts = products.slice(0, maxItems)

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex >= limitedProducts.length - itemsPerPage ? 0 : prevIndex + 1
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? products.length - itemsPerPage : prevIndex - 1
    );
  };

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
            {products.slice(currentIndex, currentIndex + itemsPerPage).map((product) => (
              <div key={product.id} className="carousel-item">
                <img src={product.bild_url} alt={product.namn} className="product-image" />
                <p>{product.namn}</p>
                <p>{product.pris} kr</p>
                <button className="outline-button" onClick={() => {
                    console.log("Selected product:", product); // Lägg till denna rad för att kolla om produkten verkligen väljs
                    setSelectedProduct(product);
                    }}>Se detaljer</button>
              </div>
            ))}
          </div>
        </div>
        <button className="carousel-arrow-btn right" onClick={nextSlide}>
          <ChevronRight size={24} />
        </button>
      </div>

    <div className="button-container">
      <button className="view-all-btn" >Se alla produkter!</button>
    </div>
    </div>
  )
}

export default Carousel
