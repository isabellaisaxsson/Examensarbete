import { supabase } from '../superbaseClient'; 

const getSessionId = () => {
    let sessionId = localStorage.getItem("session_id");
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("session_id", sessionId);
    }
    return sessionId;
  };


// Lägg till produkt i varukorgen
export const addToCart = async (produkt_id) => {
    const sessionId = getSessionId()
  
    const { data, error } = await supabase.from("varukorg").insert([{ session_id: sessionId, produkt_id }])
  
    if (error) {
      console.error("Fel vid tilläggning i varukorgen:", error)
      alert(`Fel: ${error.message}`)  // Visar mer detaljerad felmeddelande
      return false
    }

    console.log("Produkt tillagd i varukorgen:", data)
  
    return true
  }

// Hämta produkter i varukorgen
export const getCartItems = async () => {
  const sessionId = getSessionId()

  const { data, error } = await supabase
    .from("varukorg")
    .select(`
      id,
      produkter:produkt_id (namn, pris, bild_url, storlek, typ_av_klader)
    `)
    .eq("session_id", sessionId)

  if (error) {
    console.error("Fel vid hämtning av varukorgen:", error)
    return []
  }

  return data
}

export const addToWishlist = async (id) => {
  const sessionId = getSessionId();

  // Hämta varukorgsprodukten
  const { data: cartItem, error } = await supabase
    .from("varukorg")
    .select("produkt_id")
    .eq("id", id)
    .single(); // .single() eftersom det ska vara en rad per id

  if (error || !cartItem) {
    console.error("Fel vid hämtning av varukorgsobjekt:", error);
    return false;
  }

  // Kontrollera om varukorg_id existerar i varukorg-tabellen
  const { data: validCartItem, error: cartItemError } = await supabase
    .from("varukorg")
    .select("id")
    .eq("id", id)
    .single();

  if (cartItemError || !validCartItem) {
    console.error("Fel vid validering av varukorg_id:", cartItemError);
    alert("Varukorgsposten existerar inte.");
    return false;
  }

  // Lägg till i favoriter
  const { data, error: insertError } = await supabase
    .from("favoriter")
    .insert([{ session_id: sessionId, produkt_id: cartItem.produkt_id, varukorg_id: validCartItem.id }]);

  if (insertError) {
    console.error("Fel vid tilläggning till favoriter:", insertError);
    alert(`Fel: ${insertError.message}`);
    return false;
  }

  // Ta bort produkten från varukorgen om den var där
  await removeFromCart(id);

  console.log("Produkt flyttad till favoriter:", data);
  return true;
};


// Ta bort produkt från varukorgen
export const removeFromCart = async (id) => {
  const { error } = await supabase.from("varukorg").delete().eq("id", id)

  if (error) {
    console.error("Fel vid borttagning från varukorgen:", error)
    return false
  }

  return true
}
