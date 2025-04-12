"use client"

import { useState, useEffect } from "react"
import "./style/Kassa.css"
import { supabase } from "../superbaseClient"
import { getCartItems } from "../components/varukorgFunction";


const Kassa = () => {
  const [cartItems, setCartItems] = useState([])
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
  })

  useEffect(() => {
    const fetchCart = async () => {
      const items = await getCartItems();
      setCartItems(items);
    };
    
    fetchCart();
  }, []);

  const [errors, setErrors] = useState({
    email: "",
    general: ""
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const validateForm = () => {
    let valid = true
    let emailError = ""
    let generalError = ""

    // Kontrollera om e-posten är korrekt inskriven
    if (!formData.email.includes("@") || !formData.email.includes(".")) {
      emailError = "Ange en giltig e-postadress (måste innehålla @ och en domän)"
      valid = false
    }

    // Kontrollerar att alla obligatoriska fält är ifyllda, annars visas ett error meddelande
    for (let field in formData) {
      if (formData[field] === "") {
        generalError = "Alla fält måste fyllas i!"
        valid = false
        break
      }
    }

    setErrors({ email: emailError, general: generalError })
    return valid
  }

  const clearCart = async () => {
    const sessionId = localStorage.getItem("session_id");
    
    const { error } = await supabase
      .from("varukorg")
      .delete()
      .eq("session_id", sessionId);
  
    if (error) {
      console.error("Fel vid tömning av varukorgen:", error);
    } else {
      console.log("Varukorg tömd!");
    }
  };
  
  // Anropa clearCart när beställningen är klar
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) {
      return;
    }
  
    // Skicka kundinformation till databasen
    const { error } = await supabase.from("kund").insert([
    ]);
  
    if (error) {
      console.error("Kunddata sparades inte:", error);
      alert("Något gick fel, försök igen!");
    } else {
      console.log("Kunddata sparat!");
      alert("Tack för din beställning!");
      
      //Tömmer varukorgen efter beställning
      await clearCart();
    }
  };
  
  
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + item.produkter.pris, 0);
  };

  const calculateShipping = () => 52; 

  return (
    <div className="kassa-container">
      <h1 className="kassa-title">Kassa</h1>

      <div className="kassa-content">
        <div className="kassa-form-container">
          <form onSubmit={handleSubmit} className="kassa-form">
          {errors.general && <div className="error">{errors.general}</div>}
            <section className="form-section">
              <h2>Personuppgifter</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">Förnamn *</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Efternamn *</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="email">E-post *</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && <div className="error">{errors.email}</div>}
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Telefon *</label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
            </section>

            <section className="form-section">
              <h2>Leveransadress</h2>
              <div className="form-group">
                <label htmlFor="address">Adress *</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="postalCode">Postnummer *</label>
                  <input
                    type="text"
                    id="postalCode"
                    name="postalCode"
                    value={formData.postalCode}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">Ort *</label>
                  <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
                </div>
              </div>
            </section>

            <section className="form-section">
              <h2>Betalningsmetod</h2>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="cardNumber">Kortnummer *</label>
                  <input
                    type="text"
                    id="cardNumber"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="city">Utgångsdatum *</label>
                  <input type="text" required />
                </div>
                <div className="form-group">
                  <label htmlFor="city">CVV (säkerhetskod) *</label>
                  <input type="text" required />
                </div>
              </div>
            </section>
          </form>
        </div>

        <div className="order-summary">
          <h2>Sammanfattning</h2>
          <div className="summary-item">
            <span>Beställningsvärde</span>
            <span>{calculateTotal()} kr</span>
          </div>
          <div className="summary-item">
            <span>Leveransavgift</span>
            <span>{calculateShipping()} kr</span>
          </div>
          <div className="summary-total">
            <span>SUMMA</span>
            <span>{calculateTotal() + calculateShipping()} kr</span>
          </div>

          <button
  type="button"
  className="checkout-button"
  onClick={async () => {
    const isValid = validateForm();
    if (!isValid) return;

    await handleSubmit(new Event("submit")); 
    alert("Betalningen har genomförts!");

    
  }}
>
  SLUTFÖR KÖP
</button>
        </div>
      </div>
    </div>
  )
}

export default Kassa

