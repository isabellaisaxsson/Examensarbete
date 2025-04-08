"use client"
import { useState } from "react"
import "./style/Kassa.css"

const Kassa = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    postalCode: "",
    city: "",
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    // Here you would typically send the data to your backend
  }

  return (
    <div className="kassa-container">
      <h1 className="kassa-title">Kassa</h1>

      <div className="kassa-content">
        <div className="kassa-form-container">
          <form onSubmit={handleSubmit} className="kassa-form">
            <section className="form-section">
              <h2>Personuppgifter</h2>
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">Förnamn</label>
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
                  <label htmlFor="lastName">Efternamn</label>
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
                  <label htmlFor="email">E-post</label>
                  <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                </div>
                <div className="form-group">
                  <label htmlFor="phone">Telefon</label>
                  <input type="tel" id="phone" name="phone" value={formData.phone} onChange={handleChange} required />
                </div>
              </div>
            </section>

            <section className="form-section">
              <h2>Leveransadress</h2>
              <div className="form-group">
                <label htmlFor="address">Adress</label>
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
                  <label htmlFor="postalCode">Postnummer</label>
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
                  <label htmlFor="city">Ort</label>
                  <input type="text" id="city" name="city" value={formData.city} onChange={handleChange} required />
                </div>
              </div>
            </section>

            <section className="form-section">
              <h2>Betalningsmetod</h2>
            </section>
          </form>
        </div>

        <div className="order-summary">
          <h2>Sammanfattning</h2>
          <div className="summary-item">
            <span>Beställningsvärde</span>
            <span>40 kr</span>
          </div>
          <div className="summary-item">
            <span>Leveransavgift</span>
            <span>52 kr</span>
          </div>
          <div className="summary-total">
            <span>SUMMA</span>
            <span>92 kr</span>
          </div>

          <button type="submit" className="checkout-button" onClick={handleSubmit}>
            SLUTFÖR KÖP
          </button>
        </div>
      </div>
    </div>
  )
}

export default Kassa

