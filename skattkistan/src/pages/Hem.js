import "./style/Hem.css"
import Carousel from "../components/carouselFunction";
import movingBoxes from "../images/moving-boxes.jpg";
import CarouselForOneItem from "../components/carouselFunctionOnePiece";
import { useEffect, useState } from "react"
import { supabase } from "../superbaseClient"

const Hem = () => {

  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data, error } = await supabase.from("produkter").select("*")

        if (error) {
          console.error("Fel vid hämtning av produkter:", error)
        } else {
          console.log("Produkter hämtade för carousel:", data)
          setProducts(data || [])
        }
      } catch (err) {
        console.error("Oväntat fel:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [])

    return(
<div>
    <div className="section-1">
        <div className="background-box">
            <div className="flex-hero">
                <div className="product-display">
                <div className="box">
                {loading ? (
                  <p>Loading products...</p>
                ) : products.length === 0 ? (
                  <p>No products available</p>
                ) : (
                  <>
                    <p className="product-count" aria-hidden="true">
                      <span className="visually-hidden">Products available: {products.length}</span>
                    </p>
                    <CarouselForOneItem products={products} />
                  </>
                )}
              </div>
                </div>
                <div className="title-text">
                    <h1>Skattkistan - Secondhand med hjärta</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
                </div>
            </div>
        </div>
    </div>

    <div className="section-2">
    {!loading && products.length > 0 && (
        <div className="section-carousel">
          <Carousel products={products} />
        </div>
      )}
      </div>

    <div className="section-3">
        <h1>Våra mål med skattkistan</h1>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. voluptate velit esse cillum dolore eu fugiat nulla pariatur ore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut lorem ipsum </p>
    </div>

    <div className="section-4">
            <h1>Vi tar även emot saker du inte använder längre!</h1>
        <div className="donation-flex">
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. voluptate velit esse cillum dolore eu fugiat nulla pariatur ore magna aliqua. </p>
            <img className="donation-image" src={movingBoxes} alt="Moving boxes" />;
        </div>
    </div>
</div>
    );
    
};

export default Hem;
