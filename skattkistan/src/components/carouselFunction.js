import { useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "../pages/style/Hem.css";

const Carousel = ({ products, setSelectedProduct }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 3;

  const totalItems = products.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  // Går till nästa sida och visar nästa grupp av produkter (cirkulerar tillbaka till början om det är slut)
  const nextSlide = () => {
    setCurrentIndex((prevIndex) => {
      const nextPage = (prevIndex + itemsPerPage) % totalItems;
      return nextPage;
    });
  };

  //Går till tidigare sida och visar gruppen av produkter som den tidigare varit på.
  const prevSlide = () => {
    setCurrentIndex((prevIndex) => {
      const newIndex = prevIndex - itemsPerPage;
      return newIndex >= 0 ? newIndex : (totalPages - 1) * itemsPerPage;
    });
  };

  return (
    <div className="latest-finds">
      <h2 className="carousel-title">De senaste fynden!</h2>
      <div className="carousel-container">
        <button
          className="carousel-arrow-btn left"
          onClick={prevSlide}
        >
          <ChevronLeft size={24} />
        </button>

        <div className="carousel-wrapper">
          <div className="carousel-content">
            {products.slice(currentIndex, currentIndex + itemsPerPage).map((product) => (
              <div key={product.id} className="carousel-item">
                <img src={product.bild_url} alt={product.namn} className="product-image" />
                <p>{product.namn}</p>
                <p>{product.pris} kr</p>
                <button
                  className="outline-button"
                  onClick={() => {
                    console.log("Selected product:", product);
                    setSelectedProduct(product);
                  }}
                >
                  Se detaljer
                </button>
              </div>
            ))}
          </div>
        </div>

        <button className="carousel-arrow-btn right" onClick={nextSlide}>
          <ChevronRight size={24} />
        </button>
      </div>

      <div className="button-container">
        <button className="view-all-btn">Se alla produkter!</button>
      </div>
    </div>
  );
};

export default Carousel;
