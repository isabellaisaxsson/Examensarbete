import { useEffect, useState } from "react";
import { supabase } from "../superbaseClient";
import ProductCard from "./productCards";
import ProductModal from "./ProductModal";
import { FaFilter } from "react-icons/fa"; // Importera en filterikon, t.ex. från react-icons

const ProductsList = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedSortiment, setSelectedSortiment] = useState("");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [filterValues, setFilterValues] = useState({
    begagnad: false, 
    storlek: { S: false, M: false, L: false, XL: false },  
    malgrupp: { Dam: false, Herr: false }, 
    typAvKlader: {
      "Sweatshirts & Hoodies": false,
      "Shorts & Kjolar": false,
    },    
  });

  // Hämta produkter med filter
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);

        let query = supabase.from("produkter").select("*");

        if (selectedSortiment) {
          query = query.ilike("Sortiment", selectedSortiment);
        }

        //Lägger till filter
        if (filterValues.begagnad) {
          query = query.ilike("Begagnad", "Ja");
        }

        Object.keys(filterValues.storlek).forEach((size) => {
          if (filterValues.storlek[size]) {
            query = query.ilike("storlek", size);
          }
        });

        Object.keys(filterValues.malgrupp).forEach((group) => {
          if (filterValues.malgrupp[group]) {
            query = query.ilike("målgrupp", group);
          }
        });

        Object.keys(filterValues.typAvKlader).forEach((clothes) => {
          if (filterValues.typAvKlader[clothes]) {
            query = query.ilike("typ_av_klader", clothes);
          }
        });

        const { data, error } = await query;

        if (error) {
          console.error("Error fetching products:", error);
          setError(`Kunde inte hämta produkter: ${error.message}`);
        } else {
          setProducts(data || []);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
        setError("Ett oväntat fel inträffade");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [selectedSortiment, filterValues]);

  const handleFilterChange = (e) => {
    const { name, value, checked } = e.target;
    
    // Hantera checkbox ändringar
    if (name === "begagnad") {
      setFilterValues((prevState) => ({
        ...prevState,
        [name]: checked,
      }));
    } else if (name === "storlek" || name === "malgrupp" || name === "typAvKlader") {
      setFilterValues((prevState) => ({
        ...prevState,
        [name]: {
          ...prevState[name],
          [value]: checked,
        },
      }));
    }
  };

  if (loading) return <div className="loading">Laddar produkter...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="products-container">
      <div className="filters-row" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
  <div className="filter-btn-container">
    <button
      className="filter-btn"
      onClick={() => setIsFilterOpen(!isFilterOpen)}
    >
      <FaFilter /> Filter
    </button>
    {isFilterOpen && (
      <div className="filter-popup">
        <div className="filter-option">
          <label>Begagnad:</label>
          <input
            type="checkbox"
            name="begagnad"
            checked={filterValues.begagnad}
            onChange={handleFilterChange}
          />
        </div>
        <div className="filter-option">
  <label>Storlek:</label>
  <div className="checkbox-group">
    {["S", "M", "L", "XL"].map((size) => (
      <div key={size}>
        <input
          type="checkbox"
          name="storlek"
          value={size}
          checked={filterValues.storlek[size]}
          onChange={handleFilterChange}
        />
        <label>{size}</label>
      </div>
    ))}
  </div>
</div>

    {/*Produkt filtrering*/}
        <div className="filter-option">
          <label>Målgrupp:</label>
          <div className="checkbox-group">
          {["Dam", "Herr"].map((group) => (
            <div key={group}>
              <input
                type="checkbox"
                name="malgrupp"
                value={group}
                checked={filterValues.malgrupp[group]}
                onChange={handleFilterChange}
              />
              <label>{group}</label>
            </div>
          ))}
        </div>
        </div>
        <div className="filter-option">
          <label>Typ av kläder:</label>
          <div className="checkbox-group">
          {["Sweatshirts & Hoodies", "Shorts & Kjolar", "T-shirts & Toppar", "Klänningar & Jumpsuits"].map((clothes) => (
            <div key={clothes}>
              <input
                type="checkbox"
                name="typAvKlader"
                value={clothes}
                checked={filterValues.typAvKlader[clothes]}
                onChange={handleFilterChange}
              />
              <label>{clothes}</label>
            </div>
          ))}
        </div>
      </div>
      </div>
    )}
  </div>

    {/*Sortiment filter*/}
  <div className="sortiment-filter">
    <label htmlFor="sortiment">Filtrera efter sortiment:</label>
    <select
      id="sortiment"
      onChange={(e) => setSelectedSortiment(e.target.value)}
      value={selectedSortiment}
    >
      <option value="">Alla</option>
      <option value="kläder">Kläder</option>
      <option value="accessoarer">Accessoarer</option>
      <option value="möbler">Möbler</option>
    </select>
  </div>
</div>


      {/* Produkt display */}
      <div className="products-grid">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard
              key={product.id}
              {...product}
              onClick={() => setSelectedProduct(product)}
            />
          ))
        ) : (
          <div>Inga produkter matchar din filtrering.</div>
        )}
      </div>

      {/* Visar modal(mer information) om produkt är vald */}
      {selectedProduct && (
        <ProductModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />
      )}
    </div>
  );
};

export default ProductsList;
