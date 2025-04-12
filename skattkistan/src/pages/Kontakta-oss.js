import "./style/kontakta-oss.css";
import { useState } from "react";
import { supabase } from "../superbaseClient"

const KontaktaOss = () => {

  const [formData, setFormData] = useState({
    namn: "",
    epost: "",
    titel: "",
    meddelande: "",
  });
  const [isSending, setIsSending] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [validationError, setValidationError] = useState(""); 

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);
    setSuccessMessage("");
    setErrorMessage("");
    setValidationError(""); 

    // Validera att alla fält är ifyllda annars ett meddelande
    if (!formData.namn || !formData.epost || !formData.titel || !formData.meddelande) {
      setValidationError("Alla fält måste fyllas i!");
      setIsSending(false);
      return;
    }

    // Skickar formuläret till Supabase
    const { data, error } = await supabase.from("kontakt").insert([
      {
        namn: formData.namn,
        epost: formData.epost,
        titel: formData.titel,
        meddelande: formData.meddelande,
      },
    ]);

    if (error) {
      console.error("Error submitting form:", error);
      setErrorMessage("Oj, något gick fel. Försök igen senare!");
    } else {
      setSuccessMessage("Ditt meddelande har skickats!");
      setFormData({ namn: "", epost: "", titel: "", meddelande: "" }); // Töm formuläret
    }

    setIsSending(false);
  };

      return (
        <div className="page-container">
    
          
          <main className="main-content">
            <section className="intro-section">
              <div className="intro-container">
                <h1>Kontakta oss</h1>
                <p>
                  Kontakta oss gärna om du har några frågor, är intresserad av att lämna in produkter till oss eller helt enkelt ge oss feedback.
                </p>
              </div>
            </section>
    
            <div className="contact-layout">
              <section className="contact-info-section">
                <div className="info-container">
                  <h2>Kontakta oss!</h2>
    
                  <div className="info-item">
                    <div className="info-icon">📞</div>
                    <div className="info-content">
                      <h3>Telefon</h3>
                      <p>+46 123 456 789</p>
                      <p className="info-detail">Måndag - Fredag: 9:00 - 12:00</p>
                    </div>
                  </div>
    
                  <div className="info-item">
                    <div className="info-icon">✉️</div>
                    <div className="info-content">
                      <h3>E-post</h3>
                      <p>hello@skattkistan.com</p>
                      <p className="info-detail">Vi svarar inom 24 timmar</p>
                    </div>
                  </div>
    
                  <div className="info-item">
                    <div className="info-icon">📍</div>
                    <div className="info-content">
                      <h3>Plats</h3>
                      <p>Stockholm, Sverige</p>
                    </div>
                  </div>
                </div>
              </section>
    
              <section className="contact-form-section">
                <div className="form-container">
                  <h2>Skicka ett meddelande</h2>
                  <form className="contact-form" onSubmit={handleSubmit}>
                    <div className="form-group">
                      <label htmlFor="name">Namn</label>
                      <input type="text" id="name" name="namn" value={formData.namn} onChange={handleChange} placeholder="Ditt namn" required />
                    </div>
    
                    <div className="form-group">
                      <label htmlFor="email">E-post</label>
                      <input type="email" id="email" name="epost" value={formData.epost} onChange={handleChange} placeholder="Din e-post adress" required />
                    </div>
    
                    <div className="form-group">
                      <label htmlFor="subject">Titel</label>
                      <input type="text" id="subject" name="titel"  value={formData.titel} onChange={handleChange} placeholder="Vad handlar detta om?" required />
                    </div>
    
                    <div className="form-group">
                      <label htmlFor="message">Meddelande</label>
                      <textarea id="message" name="meddelande" value={formData.meddelande} onChange={handleChange} placeholder="Ditt meddelande" rows={5} required></textarea>
                    </div>
    
                    <button type="submit" className="custom-button" disabled={isSending}>
                    {isSending ? "Skickar..." : "Skicka meddelande"}
                    </button>
                  </form>
                  {successMessage && <p className="success-msg">{successMessage}</p>}
                  {errorMessage && <p className="error-msg">{errorMessage}</p>}

                </div>
              </section>
            </div>
          </main>
        </div>
      )
    };

export default KontaktaOss;

