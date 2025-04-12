import { supabase } from "../superbaseClient"

// Funktion för att skapa session ID (om det inte redan finns)
const getSessionId = () => {
  let sessionId = localStorage.getItem("session_id")
  if (!sessionId) {
    sessionId = crypto.randomUUID() /
    localStorage.setItem("session_id", sessionId) 
  }
  return sessionId
}

// Lägg till produkt till favoriter
export const addToFavorites = async (produkt_id) => {
  const sessionId = getSessionId() 

  const { data, error } = await supabase.from("favoriter").insert([{ session_id: sessionId, produkt_id }])

  if (error) {
    console.error("Fel vid tilläggning till favoriter:", error)
    alert(`Fel: ${error.message}`)
    return false
  }

  console.log("Produkt tillagd till favoriter:", data)
  return true
}

// Hämta alla favoriter för den aktuella sessionen
export const getFavorites = async () => {
  const sessionId = getSessionId() 

  const { data, error } = await supabase
    .from("favoriter")
    .select(`
      id,
      produkter:produkt_id (namn, pris, bild_url, storlek, typ_av_klader)
    `)
    .eq("session_id", sessionId)

  if (error) {
    console.error("Fel vid hämtning av favoriter:", error)
    return []
  }

  return data 
}

// Ta bort produkt från favoriter
export const removeFromFavorites = async (favorit_id) => {
  const sessionId = getSessionId(); // Hämta session ID

  console.log("Försöker ta bort favorit med id:", favorit_id);
  
  const { data, error } = await supabase
    .from("favoriter")
    .delete()
    .eq("session_id", sessionId) 
    .eq("id", favorit_id); 

  if (error) {
    console.error("Fel vid borttagning från favoriter:", error);
    return false;
  }

  console.log("Favorit borttagen från favoriter!");
  return true;
}




