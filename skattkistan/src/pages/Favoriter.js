import { useState, useEffect } from "react";
import { getFavorites, removeFromFavorites } from "../components/favoriterFunction";
import { Heart } from "lucide-react"
import "./style/favoriter.css"

const Favoriter = () => {
  const [favorites, setFavorites] = useState([]);
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchFavorites = async () => {
      const favoritesData = await getFavorites();
      setFavorites(favoritesData);
    };

    fetchFavorites();
  }, []);

  
  const handleRemoveFavorite = async (favorit_id) => {
    try {
      setIsLoading(true);
      console.log("Försöker ta bort favorit med id:", favorit_id);
    
      const success = await removeFromFavorites(favorit_id);
    
      if (success) {
        console.log("Borttagning lyckades");
        setFavorites(favorites.filter((fav) => fav.id !== favorit_id)); // Filtrera bort favoriten baserat på id
      } else {
        console.error("Borttagning misslyckades");
        alert("Det gick inte att ta bort produkten från favoriter. Försök igen.");
      }
    } catch (error) {
      console.error("Fel vid borttagning:", error);
      alert("Ett fel uppstod: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }
  


  return (
    <div className="favoriter-page">
      <div className="favoriter-section">
    <h1>Dina favoriter</h1>
    <div className="favorites-grid">
      {favorites.map((fav) => (
        <div className="favorite-card" key={fav.id}>
            <button
              className="wishlist-btn"
              onClick={() => handleRemoveFavorite(fav.id)} // Ändrat till korrekt ID
              aria-label="Ta bort från favoriter"
              >
              <Heart className="heart-icon" />
            </button>
          <img src={fav.produkter.bild_url || "/placeholder.svg"} alt={fav.produkter.namn} />
          <div className="product-name">{fav.produkter.namn}</div>
          <div className="product-price">{fav.produkter.pris} kr</div>
         </div>
      ))}
    </div>
    </div>
  </div>
  );
};

export default Favoriter;
