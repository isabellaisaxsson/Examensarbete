import "./style/Hem.css"
import Carousel from "../components/carouselFunction";
import movingBoxes from "../images/moving-boxes.jpg";
import CarouselForOneItem from "../components/carouselFunctionOnePiece";
import { useEffect, useState } from "react"
import { supabase } from "../superbaseClient"
import ProductModal from "../components/ProductModal"
import { Link } from 'react-router-dom';

const Hem = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedProduct, setSelectedProduct] = useState(null)

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

  return (
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
              <p>
              Välkommen till Skattkistan – din digitala skattgömma för handplockade secondhandfynd med själ och historia. Här hittar du unika plagg, vackra detaljer och hållbara val - allt med kärlek för både stil och planet.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="section-2">
        {!loading && products.length > 0 && (
          <div className="section-carousel">
              <Carousel products={products} setSelectedProduct={setSelectedProduct} />
          </div>
        )}
      </div>

    <div className="section-3">
        <h1>Våra mål med skattkistan</h1>
        <p>Våra mål med Skattkistan är enkla men viktiga: att göra secondhand till ett självklart val för dig som vill shoppa med omtanke. Vi vill inspirera till återbruk, minska onödig konsumtion och ge nytt liv till vackra saker som förtjänar en andra chans. Genom att handla hos oss bidrar du till en mer hållbar framtid – och hittar samtidigt precis det där unika du letat efter.</p>
    </div>

    <div className="section-4">
            <h1>Vi tar även emot saker du inte använder längre!</h1>
        <div className="donation-flex">
            <p>Har du saker hemma som inte längre kommer till användning? På Skattkistan tror vi på att ge nytt liv åt det som annars riskerar att glömmas bort. Genom att skänka kläder, inredning eller andra produkter till oss bidrar du till en mer hållbar konsumtion och hjälper oss att skapa ett sortiment som är både unikt och medvetet.
Vi letar ständigt efter fina, välbevarade föremål som förtjänar en andra chans samtidigt som vi gör det enkelt för dig att rensa och göra plats för det som verkligen betyder något.
Vill du skänka något eller veta mer om vad vi tar emot?
<Link className="link" to="/kontakta-oss"> Klicka här för att kontakta oss.</Link> Vi ser fram emot att höra från dig. </p>
            <img className="donation-image" src={movingBoxes} alt="Moving boxes" />;
        </div>
    </div>
    {selectedProduct && <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
</div>
    );
    
};

export default Hem;
